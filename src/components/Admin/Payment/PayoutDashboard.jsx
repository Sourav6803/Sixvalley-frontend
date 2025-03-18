import { useState, useEffect } from "react";
import axios from "axios";

const PayoutDashboard = () => {
    const [payouts, setPayouts] = useState([
        {
          _id: "123",
          seller: { name: "John's Store" },
          orders: [
            { _id: "A1", amount: 500 },
            { _id: "A2", amount: 1200 }
          ],
          totalOrderAmount: 1700,
          finalPayoutAmount: 1500,
          status: "Pending"
        },
        {
          _id: "124",
          seller: { name: "Emma's Boutique" },
          orders: [
            { _id: "B1", amount: 800 },
            { _id: "B2", amount: 1100 }
          ],
          totalOrderAmount: 1900,
          finalPayoutAmount: 1700,
          status: "Completed"
        },
        {
          _id: "125",
          seller: { name: "Tech Haven" },
          orders: [
            { _id: "C1", amount: 300 },
            { _id: "C2", amount: 700 },
            { _id: "C3", amount: 500 }
          ],
          totalOrderAmount: 1500,
          finalPayoutAmount: 1300,
          status: "Processing"
        },
        {
          _id: "126",
          seller: { name: "Luxury Watches" },
          orders: [
            { _id: "D1", amount: 2000 }
          ],
          totalOrderAmount: 2000,
          finalPayoutAmount: 1800,
          status: "Pending"
        },
        {
          _id: "127",
          seller: { name: "Gaming Hub" },
          orders: [
            { _id: "E1", amount: 1500 },
            { _id: "E2", amount: 2300 }
          ],
          totalOrderAmount: 3800,
          finalPayoutAmount: 3500,
          status: "Completed"
        },
        {
          _id: "128",
          seller: { name: "Fashion Street" },
          orders: [
            { _id: "F1", amount: 900 },
            { _id: "F2", amount: 600 },
            { _id: "F3", amount: 1200 }
          ],
          totalOrderAmount: 2700,
          finalPayoutAmount: 2400,
          status: "Processing"
        },
        {
          _id: "129",
          seller: { name: "Kitchen Essentials" },
          orders: [
            { _id: "G1", amount: 500 },
            { _id: "G2", amount: 800 }
          ],
          totalOrderAmount: 1300,
          finalPayoutAmount: 1100,
          status: "Pending"
        },
        {
          _id: "130",
          seller: { name: "Bookworm Paradise" },
          orders: [
            { _id: "H1", amount: 450 },
            { _id: "H2", amount: 750 },
            { _id: "H3", amount: 1100 }
          ],
          totalOrderAmount: 2300,
          finalPayoutAmount: 2000,
          status: "Completed"
        },
        {
          _id: "131",
          seller: { name: "Fitness World" },
          orders: [
            { _id: "I1", amount: 1700 },
            { _id: "I2", amount: 900 }
          ],
          totalOrderAmount: 2600,
          finalPayoutAmount: 2300,
          status: "Processing"
        },
        {
          _id: "132",
          seller: { name: "Gadget Planet" },
          orders: [
            { _id: "J1", amount: 1300 },
            { _id: "J2", amount: 2500 },
            { _id: "J3", amount: 1000 }
          ],
          totalOrderAmount: 4800,
          finalPayoutAmount: 4500,
          status: "Pending"
        }
      ]);
      
  const [loading, setLoading] = useState(true);
  const [selectedPayout, setSelectedPayout] = useState(null);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    try {
      const res = await axios.get("/api/admin/payouts"); // Fetch payouts from API
      setPayouts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payouts:", error);
      setLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.post(`/api/admin/payouts/${id}/markPaid`);
      setPayouts(payouts.map((p) => (p._id === id ? { ...p, status: "Paid" } : p)));
    } catch (error) {
      console.error("Error marking payout as paid:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-[60px]">
      <h2 className="text-2xl font-bold mb-6">Payout Management</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-gray-600">Total Pending</p>
          <h3 className="text-lg font-semibold">₹{payouts.filter(p => p.status === "Pending").reduce((acc, p) => acc + p.finalPayoutAmount, 0)}</h3>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-gray-600">Total Paid</p>
          <h3 className="text-lg font-semibold">₹{payouts.filter(p => p.status === "Paid").reduce((acc, p) => acc + p.finalPayoutAmount, 0)}</h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-gray-600">Scheduled Payouts</p>
          <h3 className="text-lg font-semibold">{payouts.length}</h3>
        </div>
      </div>

      {/* Payout Table */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Add Cost</th>
              <th className="p-3 text-left">Refferals</th>
              <th className="p-3 text-left">Net Payable</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-4">Loading...</td>
              </tr>
            ) : payouts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">No Payouts Available</td>
              </tr>
            ) : (
              payouts.map((payout) => (
                <tr key={payout._id} className="border-t">
                  <td className="p-3">{payout.seller.name}</td>
                  <td className="p-3">{payout.orders.length}</td>
                  <td className="p-3">₹{payout.totalOrderAmount}</td>
                  <td className="p-3 font-semibold">₹{payout.finalPayoutAmount}</td>
                  <td className={`p-3 font-medium ${payout.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                    {payout.status}
                  </td>
                  <td className="p-3">
                    <button onClick={() => setSelectedPayout(payout)} className="text-blue-600 underline">
                      View Details
                    </button>
                    {payout.status === "Pending" && (
                      <button onClick={() => markAsPaid(payout._id)} className="ml-3 px-4 py-2 bg-green-500 text-white rounded">
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

      {/* Payout Details Modal */}
      {selectedPayout && <PayoutDetailsModal payout={selectedPayout} onClose={() => setSelectedPayout(null)} />}
    </div>
  );
};

// Payout Details Modal
const PayoutDetailsModal = ({ payout, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Payout Details</h2>
        <p><strong>Seller:</strong> {payout.seller.name}</p>
        <p><strong>Payment Status:</strong> {payout.status}</p>
        <p><strong>Orders Included:</strong></p>
        <ul className="list-disc pl-5 mb-4">
          {payout.orders.map(order => (
            <li key={order._id}>#{order._id} - ₹{order.amount}</li>
          ))}
        </ul>
        <p><strong>Final Payout:</strong> ₹{payout.finalPayoutAmount}</p>

        <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PayoutDashboard;
