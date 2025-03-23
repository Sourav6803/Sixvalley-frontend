// import React from "react";

// const PayoutOrderDetails = ({ payout, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[80vh] overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Order Details for {payout.sellerId.sellerName}</h2>

//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Order No</th>
//               <th className="p-3 text-left">SKU</th>
//               <th className="p-3 text-left">Sub Order Contribution</th>
//               <th className="p-3 text-left">Order Amount</th>
//               <th className="p-3 text-left">Claims & Compensations</th>
//               <th className="p-3 text-left">Recoveries & Charges</th>
//               <th className="p-3 text-left">Net Order Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payout.orderIds.map((order) => (
//               <tr key={order._id} className="border-t">
//                 <td className="p-3">{order.orderNo}</td>
//                 <td className="p-3">{order.sku}</td>
//                 <td className="p-3">₹{order.subOrderContribution || "0"}</td>
//                 <td className="p-3">₹{order.totalAmount}</td>
//                 <td className="p-3">₹{order.claimsCompensations || "0"}</td>
//                 <td className="p-3">₹{order.recoveriesCharges || "0"}</td>
//                 <td className="p-3 font-semibold">₹{order.netOrderAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PayoutOrderDetails;



import React from "react";

const PayoutOrderDetails = ({ payout, onClose }) => {

  console.log("payots----------->", payout)
  // Calculate seller's growth percentage
  const previousPayout = payout?.previousPayout || 0;
  const growthPercentage =
    previousPayout > 0
      ? (((payout.finalPayoutAmount - previousPayout) / previousPayout) * 100).toFixed(2)
      : "N/A";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Payout Details for {payout.sellerId.sellerName}
        </h2>

        {/* Seller Info */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>Seller Name:</strong> {payout.sellerId.sellerName}
          </p>
          <p className="text-gray-700">
            <strong>Seller ID:</strong> {payout.sellerId._id}
          </p>
          <p className="text-gray-700">
            <strong>Last Payment:</strong> ₹{payout.previousPayout?.toFixed(2) || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Growth Rate:</strong>{" "}
            <span className={growthPercentage >= 0 ? "text-green-600" : "text-red-600"}>
              {growthPercentage}%
            </span>
          </p>
        </div>

        {/* Orders Table */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Orders Included in Payout</h3>
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Order Id</th>
              <th className="p-3 text-left">SKU</th>
              
              <th className="p-3 text-left">Order Amount</th>
              <th className="p-3 text-left">Commission Fees</th>
              <th className="p-3 text-left">Claims & Compensations</th>
              <th className="p-3 text-left">Recoveries & Charges</th>
              <th className="p-3 text-left">Net Order Amount</th>
            </tr>
          </thead>
          <tbody>
            {payout.orderIds.map((order) => (
              order.cart.map((product)=> (
                <tr key={product._id} className="border-t bg-gray-50 hover:bg-gray-100">
                <td className="p-3">{order?._id }</td>
                <td className="p-3">{product.sku}</td>
                
                <td className="p-3">₹{order.totalPrice}</td>
                <td className="p-3">₹{order.commissionFees || "0"}</td>
                <td className="p-3">₹{order.claimsCompensations || "0"}</td>
                <td className="p-3">₹{order.recoveriesCharges || "0"}</td>
                <td className="p-3 font-semibold text-green-700">₹{order.finalPayoutAmount}</td>
              </tr>
              ))
            )
              
            )}
          </tbody>
        </table>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Total Payout Amount</h3>
            <p className="text-2xl font-bold text-green-700">₹{payout.finalPayoutAmount.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Pending Payouts</h3>
            <p className="text-2xl font-bold text-yellow-600">₹{payout?.pendingPayoutAmount?.toFixed(2) || 0}</p>
          </div>
        </div>

        {/* Security & Payment Disclaimer */}
        <div className="mt-6 p-4 bg-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Security & Payment Notice</h3>
          <p className="text-gray-700 text-sm">
            All payments are processed securely through encrypted transactions. Ensure that all payout
            details are correct before confirming the transfer. In case of any discrepancies, please contact
            support within 24 hours.
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutOrderDetails;

