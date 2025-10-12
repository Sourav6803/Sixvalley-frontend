import React, { memo, useState } from 'react';
import { FaMoneyBillWave, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CashOnDelivery = memo(({ onSubmit, orderTotal, isLoading }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const codCharges = orderTotal > 500 ? 0 : 50; // Free COD above ₹500
  const finalAmount = orderTotal + codCharges;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (!isConfirmed) {
      toast.error('Please confirm your order');
      return;
    }

    onSubmit({ codCharges, finalAmount });
  };

  const codTerms = [
    'Exact cash amount must be provided at the time of delivery',
    'A valid government ID may be required for verification',
    'Order may be refused if payment cannot be made',
    'Change will not be provided - please have exact amount ready',
    'Digital payment options available if you change your mind',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <FaMoneyBillWave className="text-green-600 mr-2 text-lg" />
          <h3 className="font-semibold text-green-800">Cash on Delivery</h3>
        </div>
        <p className="text-sm text-green-700">
          Pay with cash when your order is delivered to your doorstep.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Payment Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Order Amount:</span>
            <span>₹{orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>COD Charges:</span>
            <span className={codCharges > 0 ? 'text-red-600' : 'text-green-600'}>
              {codCharges > 0 ? `+ ₹${codCharges}` : 'FREE'}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Amount to Pay:</span>
            <span className="text-lg">₹{finalAmount.toFixed(2)}</span>
          </div>
          {codCharges === 0 && (
            <p className="text-green-600 text-xs mt-1">
              🎉 Congratulations! COD charges are waived for orders above ₹500
            </p>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
        <div className="flex items-center mb-3">
          <FaExclamationCircle className="text-orange-500 mr-2" />
          <h4 className="font-medium text-orange-800">Important Terms</h4>
        </div>
        <ul className="text-sm text-orange-700 space-y-2">
          {codTerms.map((term, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Checkboxes */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start mb-3">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
              I understand and accept the Cash on Delivery terms and conditions. 
              I agree to pay <strong>₹{finalAmount.toFixed(2)}</strong> in cash when the order is delivered.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="orderConfirmed"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="orderConfirmed" className="ml-2 block text-sm text-gray-700">
              I confirm that my shipping address is correct and I will be available to receive the order.
            </label>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <FaCheckCircle className="text-blue-500 mr-2" />
            <span className="font-medium text-blue-800">Why Choose COD?</span>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Pay only when you receive your order</li>
            <li>• No online payment required</li>
            <li>• 100% payment security</li>
            <li>• Easy returns if not satisfied</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !termsAccepted || !isConfirmed}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Placing Order...
            </>
          ) : (
            <>
              <FaCheckCircle className="mr-2" />
              Cash on Delivery
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By confirming, you agree to our terms of service and privacy policy. 
          Your order will be processed immediately.
        </p>
      </form>

      {/* Support Information */}
      <div className="border-t pt-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{' '}
            <a href="tel:+911234567890" className="text-blue-600 hover:underline">
              +91 12345 67890
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Available 24/7 for order assistance
          </p>
        </div>
      </div>
    </div>
  );
});

export default CashOnDelivery;