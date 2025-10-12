import React, { memo, useState } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const CardPayment = memo(({ 
  onSubmit, 
  orderTotal, 
  savedCards = [], 
  selectedCard, 
  onCardSelect,
  isLoading 
}) => {
  const [saveCard, setSaveCard] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    // Add client-side validation logic
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ saveCard });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm text-blue-600 mb-4">
        <FaLock className="mr-2" />
        <span>Your card details are secure and encrypted</span>
      </div>

      {savedCards.length > 0 && (
        <SavedCardsSection 
          savedCards={savedCards}
          selectedCard={selectedCard}
          onCardSelect={onCardSelect}
        />
      )}

      {!selectedCard && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                    },
                  },
                }}
              />
            </div>
            {formErrors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
                <CardExpiryElement />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <div className="border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
                <CardCvcElement />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
              Save card for future payments
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Processing...' : `Pay ₹${orderTotal}`}
          </button>
        </form>
      )}
    </div>
  );
});

const SavedCardsSection = memo(({ savedCards, selectedCard, onCardSelect }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Saved Cards
    </label>
    <div className="space-y-2">
      {savedCards.map((card) => (
        <div
          key={card.id}
          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
            selectedCard?.id === card.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onCardSelect(card)}
        >
          <div className="flex items-center">
            <FaCreditCard className="text-gray-500 mr-2" />
            <span className="font-medium">
              {card.brand} ending in {card.last4}
            </span>
            <span className="ml-auto text-sm text-gray-500">
              Expires {card.expiry}
            </span>
          </div>
        </div>
      ))}
      <div
        className="border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer text-center text-blue-600 hover:bg-blue-50 transition-colors"
        onClick={() => onCardSelect(null)}
      >
        + Use a new card
      </div>
    </div>
  </div>
));

export default CardPayment;