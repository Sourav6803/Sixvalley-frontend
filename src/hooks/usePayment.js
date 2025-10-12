import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {server} from "../server"
import { usePaymentValidation } from './usePaymentValidation';
import { usePaymentEncryption } from './usePaymentEncryption';
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export const usePayment = () => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { validateOrderData, validateUPIId } = usePaymentValidation();
  const { encryptPaymentData } = usePaymentEncryption();

  const processOrder = useCallback(async (order, paymentInfo, successMessage) => {
    try {
      setPaymentProcessing(true);
      setError(null);

      const title = `New Order  Received`
      const content = `You have received a new order with the following items: ${order?.cart?.map(item => item.name).join(', ')}. Please prepare the order for shipping.`;
      const imageUrl = order?.cart?.map(item => item?.images[0].url)

      // Validate order data
      const validationError = validateOrderData(order);
      if (validationError) {
        throw new Error(validationError);
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-Token': await getCSRFToken(),
        },
      };

      // Encrypt sensitive payment data
      const encryptedOrder = {
        ...order,
        // paymentInfo: await encryptPaymentData(paymentInfo),
        paymentInfo: paymentInfo,
      };

      const response = await axios.post(
        `${server}/order/create-order`,
        encryptedOrder,
        config
      );

      // Clear local storage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('latestOrder');

        socketId.emit("notification", {
          title,
          content,
          imageUrl
        });

      toast.success(successMessage);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Payment failed';
      setError(message);
      toast.error(message);
      throw error;
    } finally {
      setPaymentProcessing(false);
    }
  }, [validateOrderData, encryptPaymentData]);

  const getCSRFToken = useCallback(async () => {
    try {
      const response = await axios.get(`${server}/csrf-token`);
      return response.data.csrfToken;
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      return null;
    }
  }, []);

  return {
    paymentProcessing,
    error,
    processOrder,
    setPaymentProcessing,
  };
};