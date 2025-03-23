import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { server } from "../../../server";
import { useLocation, useNavigate } from "react-router-dom";
import PayoutOrderDetails from "./PayoutOrderDetaills";
import SechduledPayment from "./SechduledPayment";
import PaidPayment from "./PaidPayment";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";

// ✅ Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PayoutDashboard = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedPaymentTable, setSelectedPaymentTable] = useState("Scheduled");

  console.log("selected-payout -->", selectedPayout)

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab") || "Scheduled";
    setSelectedPaymentTable(tab);
  }, [location.search]);

  useEffect(() => {
    if (selectedPaymentTable) {
      navigate(`/admin/dashboard/payment-dashboard?tab=${selectedPaymentTable}`);
    }
  }, [selectedPaymentTable, navigate]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchPayouts = async () => {
      try {
        const endpoint =
          selectedPaymentTable === "Paid"
            ? `${server}/payment/admin/paid-payments`
            : `${server}/payment/admin/scheduled-payments`;

        const { data } = await axios.get(endpoint);
        if (isMounted) setPayouts(data?.payments || []);
      } catch (error) {
        console.error("Error fetching payouts:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPayouts();
    return () => (isMounted = false);
  }, [selectedPaymentTable]);

  // const markAsPaid = async (id) => {
  //   try {
  //     await axios.post(`${server}/payment/admin/payouts/${id}/markPaid`);
  //     setPayouts((prev) =>
  //       prev.map((p) => (p._id === id ? { ...p, paymentStatus: "Paid" } : p))
  //     );
  //   } catch (error) {
  //     console.error("Error marking payout as paid:", error);
  //   }
  // };


  const markAsPaid = async (id) => {
    try {
      await axios.post(`${server}/payment/admin/payouts/${id}/markPaid`, {
        paymentId: id,
      });
      setPayouts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, paymentStatus: "Paid" } : p))
      );
    } catch (error) {
      console.error("Error marking payout as paid:", error.response?.data || error.message);
    }
  };


  const totalPaid = payouts.reduce(
    (acc, p) => acc + (p.paymentStatus === "Paid" ? p.finalPayoutAmount || 0 : 0),
    0
  );
  const totalPending = payouts.reduce(
    (acc, p) => acc + (p.paymentStatus !== "Paid" ? p.finalPayoutAmount || 0 : 0),
    0
  );
  const lastPayment = payouts.find((p) => p.paymentStatus === "Paid");

  // 📊 Chart Data
  const chartData = {
    labels: payouts.map((p) => p.sellerName || "Unknown"),
    datasets: [
      {
        label: "Payout Amount",
        data: payouts.map((p) => p.finalPayoutAmount || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const exportToExcel = useCallback(() => {
    const ws = XLSX.utils.json_to_sheet(payouts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payout Report");
    XLSX.writeFile(wb, "Payout_Report.xlsx");
  }, [payouts]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-[60px]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Payout Management</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <p className="text-gray-600">Total Payments To Date</p>
          <h3 className="text-2xl font-semibold">₹{totalPaid.toFixed(2)}</h3>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <p className="text-gray-600">Pending Payments</p>
          <h3 className="text-2xl font-semibold">₹{totalPending.toFixed(2)}</h3>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <p className="text-gray-600">Last Payment</p>
          <h3 className="text-xl font-semibold">
            {lastPayment ? `₹${lastPayment.finalPayoutAmount.toFixed(2)}` : "N/A"}
          </h3>
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex gap-4 mb-6">
        {["Scheduled", "Paid"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              selectedPaymentTable === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedPaymentTable(tab)}
          >
            {tab} Payments
          </button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payouts Overview</h3>
        <div className="w-full md:w-3/4 mx-auto">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Export Button */}
      <div className="mb-6">
        <button
          onClick={exportToExcel}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Export Report (Excel)
        </button>
      </div>

      {/* Payment Tables */}
      {selectedPaymentTable === "Scheduled" ? (
        <SechduledPayment
          payouts={payouts}
          loading={loading}
          setSelectedPayout={setSelectedPayout}
          setShowOrderDetails={setShowOrderDetails}
          markAsPaid={markAsPaid}
        />
      ) : (
        <PaidPayment
          payouts={payouts}
          loading={loading}
          setSelectedPayout={setSelectedPayout}
          setShowOrderDetails={setShowOrderDetails}
          markAsPaid={markAsPaid}
        />
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedPayout && (
        <PayoutOrderDetails payout={selectedPayout} onClose={() => setShowOrderDetails(false)} />
      )}
    </div>
  );
};

export default PayoutDashboard;
