import { useCallback } from 'react';
import CryptoJS from 'crypto-js';

export const usePaymentEncryption = () => {
  const encryptPaymentData = useCallback(async (paymentInfo) => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY || 'fallback-key';
    
    try {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(paymentInfo),
        encryptionKey
      ).toString();

      return {
        encrypted: true,
        data: encryptedData,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      return paymentInfo; // Fallback to unencrypted
    }
  }, []);

  return { encryptPaymentData };
};