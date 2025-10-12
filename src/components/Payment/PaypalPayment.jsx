import React, { memo, useState, useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { FaPaypal, FaExclamationTriangle } from 'react-icons/fa';

const PayPalPayment = memo(({ onSubmit, orderTotal, isLoading }) => {
  const [paypalError, setPaypalError] = useState('');
  const [isSdkReady, setIsSdkReady] = useState(false);

  useEffect(() => {
    // Check if PayPal SDK is loaded
    if (window.paypal) {
      setIsSdkReady(true);
    } else {
      // Fallback: Set ready after a timeout to handle SDK loading issues
      const timer = setTimeout(() => setIsSdkReady(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: `Order from Our Store - ${new Date().toLocaleDateString()}`,
            amount: {
              currency_code: 'USD',
              value: orderTotal.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: orderTotal.toFixed(2),
                },
              },
            },
            items: [
              {
                name: 'Online Purchase',
                description: 'Store order items',
                quantity: '1',
                unit_amount: {
                  currency_code: 'USD',
                  value: orderTotal.toFixed(2),
                },
              },
            ],
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          brand_name: 'Our Store',
          locale: 'en-US',
        },
      })
      .then((orderID) => {
        console.log('PayPal order created:', orderID);
        return orderID;
      })
      .catch((error) => {
        console.error('PayPal order creation error:', error);
        setPaypalError('Failed to create PayPal order. Please try again.');
        throw error;
      });
  };

  const onApprove = async (data, actions) => {
    try {
      setPaypalError('');
      
      const details = await actions.order.capture();
      console.log('PayPal payment approved:', details);

      // Validate the payment details
      if (details.status !== 'COMPLETED') {
        throw new Error(`Payment status: ${details.status}`);
      }

      // Extract relevant payment information
      const paymentData = {
        payerID: details.payer.payer_id,
        paymentID: details.id,
        email: details.payer.email_address,
        status: details.status,
        amount: details.purchase_units[0]?.amount.value,
      };

      onSubmit(paymentData);
    } catch (error) {
      console.error('PayPal payment error:', error);
      setPaypalError(
        error.message.includes('funding')
          ? 'Please try a different payment method. PayPal balance might be insufficient.'
          : 'Payment failed. Please try again or use another method.'
      );
    }
  };

  const onError = (err) => {
    console.error('PayPal SDK error:', err);
    setPaypalError(
      err.message?.includes('popup')
        ? 'Payment window was closed. Please try again.'
        : 'Failed to initialize PayPal. Please try another payment method.'
    );
  };

  const onCancel = (data) => {
    console.log('PayPal payment cancelled:', data);
    setPaypalError('Payment was cancelled. Please complete the payment to place your order.');
  };

  const handleRetry = () => {
    setPaypalError('');
  };

  if (!isSdkReady) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading PayPal...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <FaPaypal className="text-blue-600 mr-2 text-lg" />
          <h3 className="font-semibold text-blue-800">Secure PayPal Payment</h3>
        </div>
        <p className="text-sm text-blue-700">
          You will be redirected to PayPal to complete your payment securely. 
          No PayPal account required - you can pay with your credit card through PayPal.
        </p>
      </div>

      {paypalError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <span className="text-red-800 font-medium">Payment Error</span>
          </div>
          <p className="text-red-700 text-sm mb-3">{paypalError}</p>
          <button
            onClick={handleRetry}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Order Total:</span>
          <span className="font-semibold text-lg">${orderTotal.toFixed(2)} USD</span>
        </div>

        <div className="paypal-buttons-container">
          <PayPalButtons
            style={{
              layout: 'vertical',
              height: 48,
              shape: 'rect',
              color: 'blue',
              label: 'paypal',
              tagline: false,
            }}
            disabled={isLoading}
            //fundingSource: 'paypal' // Force PayPal only, remove for all options
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onCancel={onCancel}
          />
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
            onClick={() => {
              // Optional: Show alternative funding options
              window.open('https://www.paypal.com/us/webapps/mpp/account-selection', '_blank');
            }}
          >
            Don't have a PayPal account?
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>PayPal protects your financial information with encryption</span>
        </div>
      </div>
    </div>
  );
});

export default PayPalPayment;