

import React from "react";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-50">
      <div className="flex items-center justify-between w-full max-w-4xl">
        {/* Step 1: Address */}
        <div className="flex items-center flex-1 justify-center">
          <div
            className={`${
              active >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
          >
            Address
          </div>
          <div
            className={`h-2 flex-grow mx-2 rounded-full ${
              active >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        </div>

        {/* Step 2: Payment */}
        <div className="flex items-center flex-1 justify-center">
          <div
            className={`${
              active >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
          >
            Payment
          </div>
          <div
            className={`h-2 flex-grow mx-2 rounded-full ${
              active >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        </div>

        {/* Step 3: Success */}
        <div className="flex items-center flex-1 justify-center">
          <div
            className={`${
              active >= 3 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
          >
            Success
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;


