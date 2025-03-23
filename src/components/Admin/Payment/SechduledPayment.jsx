import React from "react";

const SechduledPayment = ({ payouts, markAsPaid, loading, setSelectedPayout, setShowOrderDetails }) => {
    console.log("paymmmmmmmmmmmmmmmm-->", payouts.length)
  return (
    <div>
      <div className="bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Seller</th>
              <th className="p-4 text-left">Orders</th>
              <th className="p-4 text-left">Total Amount</th>
              <th className="p-4 text-left">Ad Cost</th>
              <th className="p-4 text-left">Net Payable</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : payouts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  No Payouts Available from schdiled
                </td>
              </tr>
            ) : (
              payouts.map((payout) => (
                <tr key={payout._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    {payout.sellerId?.sellerName || "Unknown Seller"}
                  </td>
                  <td className="p-4">{payout.orderIds?.length || 0}</td>
                  <td className="p-4">₹{payout.totalOrderAmount.toFixed(2)}</td>
                  <td className="p-4">
                    ₹{payout.adCostDetails?.[0]?.totalSpent?.toFixed(2) || 0}
                  </td>
                  <td className="p-4 font-semibold">
                    ₹{payout.finalPayoutAmount.toFixed(2)}
                  </td>
                  <td
                    className={`p-4 font-medium ${
                      payout.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {payout.paymentStatus}
                  </td>
                  <td className="p-4 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedPayout(payout);
                        setShowOrderDetails(true);
                      }}
                      className="text-blue-600 underline"
                    >
                      View Details
                    </button>
                    {payout.paymentStatus === "Scheduled" && (
                      <button
                        onClick={() => markAsPaid(payout._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Mark as Paid
                      </button>
                    )}

                    
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SechduledPayment;
