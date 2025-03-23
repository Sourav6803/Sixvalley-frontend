import React, { useState } from 'react'
import OrderDetailsModal from './OrderDetailsModal';
import { MdDownload } from 'react-icons/md';

const PreviosPaymentDetails = ({open}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const dummyOrders = [
        {
          image: "https://via.placeholder.com/60",
          name: "Kids Cutiepie Fancy Printed Boys & Girls T-shirts Pack of 4",
          subOrderId: "124812069916099224_1",
          sku: "2131352095",
          hsnCode: "6104",
          quantity: 1,
          totalRevenue: 289,
          shippingRevenue: 47,
          marketplaceFee: 0,
          shippingCharge: -52.82,
          recovery: -11.56,
          netSettlement: 209.70,
          paymentStatus: [
            { label: "Ordered", date: "22 Feb, 25" },
            { label: "Shipped", date: "24 Feb, 25" },
            { label: "Delivered", date: "25 Feb, 25" },
            { label: "Payment Paid", date: "5 Mar, 25" },
          ],
        },
      ];

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
      };
  return (
    <div
      className={`w-full ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] p-2 md:p-4 bg-white overflow-y-auto`}
    >
      {/* Breadcrumb and Header */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <span>Payments</span>
        <span className="mx-2">&gt;</span>
        <span>Payments to Date</span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900 font-semibold">5 Mar 2025</span>
      </div>

      {/* Title and Action Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">5 Mar 2025</h2>
        <button className="bg-purple-600 flex items-center justify-center gap-x-2 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
            <MdDownload />
          Payment Excel
        </button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="border p-4 rounded-lg text-sm">
          <p className="text-gray-600">NEFT/UTR</p>
          <p className="font-semibold text-gray-900">SCBLN5202530500824371</p>
        </div>
        <div className="border p-4 rounded-lg text-sm">
          <p className="text-gray-600">Total Net Order Amount</p>
          <p className="font-semibold text-gray-900">₹4,086.50</p>
        </div>
        <div className="border p-4 rounded-lg text-sm">
          <p className="text-gray-600">Total Net Ads Cost</p>
          <p className="font-semibold text-gray-900">-₹538.87</p>
        </div>
        <div className="border p-4 rounded-lg text-sm">
          <p className="text-gray-600">Total Net Referral Earning</p>
          <p className="font-semibold text-gray-900">₹0</p>
        </div>
        <div className="border p-4 rounded-lg text-sm col-span-1 md:col-span-4">
          <p className="text-gray-600">Total Amount</p>
          <p className="font-semibold text-gray-900 text-lg">₹3,547.63</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4">
        <div className="flex space-x-4 text-sm font-medium">
          <button className="border-b-2 border-blue-600 text-blue-600 px-4 py-2">Order Details (25)</button>
          <button className="text-gray-600 px-4 py-2">Ad Cost (1)</button>
          <button className="text-gray-600 px-4 py-2">Referral (0)</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Order No.</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Sub Order No.</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">SKU</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Sub Order Contribution</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Order Amount</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Claims & Compensations</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Recoveries & Charges</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Net Order Amount</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-3 text-sm">12592126789878145</td>
                <td className="p-3 text-sm">12592126789878145_1</td>
                <td className="p-3 text-sm">460944078</td>
                <td className="p-3 text-sm">RTO</td>
                <td className="p-3 text-sm">₹0</td>
                <td className="p-3 text-sm">₹0</td>
                <td className="p-3 text-sm">₹-111.56</td>
                <td className="p-3 text-sm font-semibold">₹269.70</td>
                <td className="p-3 text-sm">
                  <button onClick={() => openModal(dummyOrders[0])} className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        isModalOpen && <OrderDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} order={selectedOrder} />

      }
    </div>
  )
}

export default PreviosPaymentDetails