import React from "react";
import { useNavigate } from "react-router-dom";

const OutstandingPayment = ({ open }) => {
   const navigate = useNavigate()
  const payments = [
    {
      date: "5 Mar 2025",
      orderAmount: "₹4,086.50",
      adsCost: "-₹138.87",
      referrals: "₹0",
      netAmount: "₹3,547.63",
      paymentDetails: "SCBLNS2025030508082471",
    },
    {
      date: "4 Mar 2025",
      orderAmount: "₹4,086.12",
      adsCost: "₹0",
      referrals: "₹0",
      netAmount: "₹4,086.12",
      paymentDetails: "SCBLNS20250304080491371",
    },
    {
      date: "3 Mar 2025",
      orderAmount: "₹8,087.25",
      adsCost: "-₹1,006.08",
      referrals: "₹0",
      netAmount: "₹7,181.65",
      paymentDetails: "SCBLNS202503030780511",
    },
    {
      date: "28 Feb 2025",
      orderAmount: "₹2,413.94",
      adsCost: "-₹354.21",
      referrals: "₹0",
      netAmount: "₹2,209.73",
      paymentDetails: "SCBLNS2025022806025334",
    },
    {
      date: "27 Feb 2025",
      orderAmount: "₹5,637.92",
      adsCost: "-₹709.23",
      referrals: "₹0",
      netAmount: "₹4,912.69",
      paymentDetails: "SCBLNS2025022709204059",
    },
    {
      date: "25 Feb 2025",
      orderAmount: "₹1,095.75",
      adsCost: "-₹138.87",
      referrals: "₹0",
      netAmount: "₹1,025.38",
      paymentDetails: "SCBLNS202502250809413",
    },
    {
      date: "24 Feb 2025",
      orderAmount: "₹7,414.50",
      adsCost: "-₹531.21",
      referrals: "₹0",
      netAmount: "₹6,991.77",
      paymentDetails: "SCBLNS202502240804933",
    },
    {
      date: "21 Feb 2025",
      orderAmount: "₹2,316.20",
      adsCost: "-₹354.21",
      referrals: "₹0",
      netAmount: "₹2,263.81",
      paymentDetails: "SCBLNS2025022100783609",
    },
  ];
  return (
    <div
    className={`w-full ${
      open ? "md:ml-72" : "md:ml-20"
    } mt-20 h-[calc(100vh-80px)] p-2 md:p-4 bg-white overflow-y-auto`}
  >
    {/* Breadcrumb */}
    <div className="text-sm text-gray-500 mb-4">
      Payments &gt; Outstanding Payments
    </div>
    
    {/* Header with Back Button */}
    <div className="flex items-center mb-6">
      <button onClick={()=> navigate(-1)} className="mr-2 text-gray-600 hover:text-gray-800">
        &#8592;
      </button>
      <h2 className="text-xl font-semibold text-gray-800">Outstanding Payments</h2>
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

export default OutstandingPayment;
