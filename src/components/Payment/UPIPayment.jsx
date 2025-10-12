import React, { memo, useState } from 'react';
import { FaMobileAlt, FaQrcode } from 'react-icons/fa';


const UPIPayment = memo(({ onSubmit, orderTotal, isLoading }) => {
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});

  const validateUPI = (id) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!id) return 'UPI ID is required';
    if (!upiRegex.test(id)) return 'Invalid UPI ID format (e.g., name@upi)';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateUPI(upiId);
    
    if (error) {
      setErrors({ upiId: error });
      return;
    }

    setErrors({});
    onSubmit({ upiId });
  };

  const popularUPIApps = [
    { name: 'Google Pay', icon: '💰' },
    { name: 'PhonePe', icon: '📱' },
    { name: 'Paytm', icon: '💳' },
    { name: 'BHIM UPI', icon: '🏦' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <FaMobileAlt className="text-blue-600 mr-2" />
          <h3 className="font-semibold text-blue-800">How UPI Payment Works</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Enter your UPI ID (e.g., name@oksbi)</li>
          <li>• You'll receive a payment request on your UPI app</li>
          <li>• Approve the payment to complete your order</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value.toLowerCase())}
            placeholder="yourname@upi"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.upiId && (
            <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-3">Supported UPI Apps:</p>
          <div className="grid grid-cols-2 gap-2">
            {popularUPIApps.map((app) => (
              <div key={app.name} className="flex items-center p-2 border rounded-lg">
                <span className="text-lg mr-2">{app.icon}</span>
                <span className="text-sm font-medium">{app.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !upiId}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Sending Payment Request...' : `Pay via UPI - ₹${orderTotal}`}
        </button>
      </form>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Alternative: QR Code Payment</span>
          <button
            type="button"
            className="flex items-center text-blue-600 text-sm"
            onClick={() => {/* Show QR code */}}
          >
            <FaQrcode className="mr-1" />
            Show QR Code
          </button>
        </div>
      </div>
    </div>
  );
});

export default UPIPayment;