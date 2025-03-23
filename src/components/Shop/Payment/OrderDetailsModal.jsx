import { useState } from "react";
import { X } from "lucide-react";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="flex items-start gap-4 py-4">
          <img src={order.image} alt={order.name} className="w-16 h-16 object-cover rounded" />
          <div>
            <h3 className="text-sm font-semibold">{order.name}</h3>
            <p className="text-xs text-gray-500">Sub Order ID: {order.subOrderId}</p>
            <p className="text-xs text-gray-500">SKU Code: {order.sku}</p>
            <p className="text-xs text-gray-500">HSN Code: {order.hsnCode}</p>
            <p className="text-xs text-gray-500">Quantity: {order.quantity}</p>
          </div>
        </div>
        
        {/* Sale Details */}
        <div className="py-4 border-t">
          <h3 className="text-sm font-semibold">Sale Details</h3>
          <div className="text-xs text-gray-700">
            <p>Total Revenue (Incl. GST): <span className="font-medium">₹{order.totalRevenue}</span></p>
            <p>Shipping Revenue: ₹{order.shippingRevenue}</p>
            <p>Marketplace Fee: ₹{order.marketplaceFee}</p>
            <p>Shipping Charge: ₹{order.shippingCharge}</p>
            <p>Compensation/Recovery: ₹{order.recovery}</p>
            <p>Net Settlement: <span className="font-medium">₹{order.netSettlement}</span></p>
          </div>
        </div>
        
        {/* Payment Status */}
        <div className="py-4 border-t">
          <h3 className="text-sm font-semibold">Payment Status</h3>
          <ul className="text-xs text-gray-700">
            {order.paymentStatus.map((status, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{status.label} - {status.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
