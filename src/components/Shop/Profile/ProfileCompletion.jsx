import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCompletion = ({ completedSteps }) => {
  const steps = [
    { title: "Pickup Address", icon: "📦" },
    { title: "Bank Details", icon: "🏦" },
    { title: "Supplier Details", icon: "🏷️" },
    { title: "TAX Details", icon: "🧾" },
  ];

  const navigate = useNavigate()

  return (
    <div className="bg-orange-50 p-6 rounded-md shadow-lg max-w-full mx-auto mt-4 border border-orange-200">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap ">
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center">
          <div className="text-orange-600 font-bold">
            <span>⚠️ Your Profile is incomplete</span>
          </div>
          <div className="text-gray-600 text-sm">
            These details are required to sell product on Jabalpur Bazar
          </div>
        </div>
        <button onClick={()=> navigate('/shop/activate-profile')} className="text-orange-600 border text-center mt-2 md:mt-0 text-sm  border-orange-600 px-2 py-2 rounded-md hover:bg-orange-600 hover:text-white transition">
          Complete Now
        </button>
      </div>

      {/* Progress Section */}
      <div className="mt-6 lg:w-[50%]">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`md:w-10 w-8 md:h-10 h-8 flex items-center justify-center rounded-full ${
                  index < completedSteps
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <span className="mt-2 text-[10px] md:text-[12px]">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative flex items-center">
          <div className="absolute inset-0 bg-gray-200 h-1 rounded"></div>
          <div
            className="absolute top-0 h-1 bg-orange-500 rounded"
            style={{
              width: `${(completedSteps / steps.length) * 100}%`,
            }}
          ></div>
          {steps.map((_, index) => (
            <div
              key={index}
              className="w-5 h-5 bg-white border-2 border-orange-500 rounded-full absolute"
              style={{
                left: `${(index / (steps.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
