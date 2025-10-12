import { useCallback } from 'react';

export const usePaymentValidation = () => {
  const validateOrderData = useCallback((orderData) => {
    if (!orderData) return 'No order data found';
    if (!orderData.cart || orderData.cart.length === 0) return 'Cart is empty';
    if (!orderData.shippingAddress) return 'Shipping address is required';
    if (!orderData.totalPrice || orderData.totalPrice <= 0) return 'Invalid total price';
    return null;
  }, []);

  const validateUPIId = useCallback((upiId) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upiId) return 'UPI ID is required';
    if (!upiRegex.test(upiId)) return 'Invalid UPI ID format';
    return null;
  }, []);

  const validateCardDetails = useCallback((cardElements) => {
    if (!cardElements.number || !cardElements.expiry || !cardElements.cvc) {
      return 'All card details are required';
    }
    return null;
  }, []);

  const sanitizeInput = useCallback((input) => {
    if (typeof input !== 'string') return input;
    
    // Basic XSS protection
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }, []);

  return {
    validateOrderData,
    validateUPIId,
    validateCardDetails,
    sanitizeInput,
  };
};