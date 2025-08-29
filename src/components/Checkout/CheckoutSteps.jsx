

// import React from "react";

// const CheckoutSteps = ({ active }) => {
//   return (
//     <div className="flex flex-col items-center w-full p-6 bg-gray-50">
//       <div className="flex items-center justify-between w-full max-w-4xl">
//         {/* Step 1: Address */}
//         <div className="flex items-center flex-1 justify-center">
//           <div
//             className={`${
//               active >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
//             } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
//           >
//             Address
//           </div>
//           <div
//             className={`h-2 flex-grow mx-2 rounded-full ${
//               active >= 2 ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//         </div>

//         {/* Step 2: Payment */}
//         <div className="flex items-center flex-1 justify-center">
//           <div
//             className={`${
//               active >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
//             } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
//           >
//             Payment
//           </div>
//           <div
//             className={`h-2 flex-grow mx-2 rounded-full ${
//               active >= 3 ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//         </div>

//         {/* Step 3: Success */}
//         <div className="flex items-center flex-1 justify-center">
//           <div
//             className={`${
//               active >= 3 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
//             } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
//           >
//             Success
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSteps;


import React from "react";
import { FaCheck } from "react-icons/fa";

const CheckoutSteps = ({ active }) => {
  const steps = [
    { id: 1, name: "Shipping", description: "Add delivery address" },
    { id: 2, name: "Payment", description: "Select payment method" },
    { id: 3, name: "Confirmation", description: "Review your order" },
  ];

  return (
    <div className="w-full bg-white py-4 px-6 shadow-sm">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{
                width: `${((active - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Step indicator */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  active >= step.id
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-gray-300"
                } transition-colors duration-300`}
              >
                {active > step.id ? (
                  <FaCheck className="text-white text-xs" />
                ) : (
                  <span
                    className={`text-xs font-medium ${
                      active >= step.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </div>

              {/* Step label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-medium ${
                    active >= step.id ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;