import React from "react";
import { RiFileExcel2Fill } from "react-icons/ri";
import PaymentChart from "./PaymentChart";
import CompensationAdsCost from "./CompensationAdsCost";
import { useNavigate } from "react-router-dom";

const Payment = ({ open }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`w-full ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] p-2 md:p-2 bg-gray-100 overflow-y-auto`}
    >
      <div className="p-2 bg-gray-50  flex flex-col items-center">
        <div className="w-full  bg-white shadow-lg rounded-2xl p-2">
          <div className="flex flex-col md:flex-row justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                <RiFileExcel2Fill />
                Download
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Order / Sub Order No."
                  className="border rounded-lg px-3 py-2 text-sm text-gray-700 pl-10"
                />
                <svg
                  className="absolute left-3 top-2.5 w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
                  />
                </svg>
              </div>
              
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payments to Date */}
            <div className="bg-white border rounded-2xl p-3 shadow-sm flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-500 text-sm">Payments to Date</h3>
                <button onClick={()=> navigate('/dashboard/payout/previous-payment')} className="text-purple-700 text-sm font-medium hover:underline border-purple-700 border-2 rounded-md px-3 py-1">
                  View Details
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">₹126,361</p>
              <p className="text-sm text-gray-600">
                Last Payment:{" "}
                <span className="font-medium text-gray-900">₹4,086</span>{" "}
                <span className="text-green-600 font-medium">
                  ✓ Paid on 4 Mar
                </span>
              </p>
            </div>

            {/* Total Outstanding Payment */}
            <div className="bg-white border rounded-2xl p-3 shadow-sm flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-500 text-sm">
                  Total Outstanding Payment
                </h3>
                <button onClick={()=> navigate('/dashboard/payout/upcoming-payment')} className="text-purple-700 text-sm font-medium hover:underline border-purple-700 border-2 rounded-md px-3 py-1">
                  View Details
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">₹51,152</p>
              <p className="text-sm text-gray-600">
                Next Payment:{" "}
                <span className="font-medium text-gray-900">₹3,547</span>{" "}
                <span className="text-red-600 font-medium">Due on 5 Mar</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentChart />

      <CompensationAdsCost />
    </div>
  );
};

export default Payment;
