import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentsTable = ({open}) => {
    const navigate = useNavigate()
  return (
    <div
      className={`w-full ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] p-2 md:p-4 bg-white overflow-y-auto`}
    >
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Payments &gt; Payments to Date
      </div>
      
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={()=> navigate(-1)} className="mr-2 text-gray-600 hover:text-gray-800">
          &#8592;
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Payments to Date</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Net Order Amount</p>
          <p className="text-lg font-semibold">₹79,371.99</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Net Ads Cost</p>
          <p className="text-lg font-semibold">₹23,549.25</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Net Referral Earning</p>
          <p className="text-lg font-semibold">₹0</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-lg font-semibold">₹126,361.61</p>
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-3 border">Payment Date</th>
              <th className="p-3 border">Order Amount</th>
              <th className="p-3 border">Ads Cost</th>
              <th className="p-3 border">Referrals</th>
              <th className="p-3 border">Net Amount</th>
              <th className="p-3 border">Payment Details</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(7)].map((_, index) => (
              <tr key={index} className="text-gray-700 border">
                <td className="p-3 border">5 Mar 2025</td>
                <td className="p-3 border">₹4,086.12</td>
                <td className="p-3 border">-₹1538.87</td>
                <td className="p-3 border">₹0</td>
                <td className="p-3 border">₹3,547.25</td>
                <td className="p-3 border">SCBLN5202503085042371</td>
                <td className="p-3 border">
                  <button onClick={()=> navigate('/dashboard/payout/upcoming-payment/payment-details')} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;
