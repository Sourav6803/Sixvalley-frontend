

import React from "react";
import { RiCustomerServiceFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs"; // Import checkmark icon

const TabSection = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center md:gap-4 gap-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 pb-1 ${
              activeStep === step.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {/* Show checkmark if step is completed */}
            <span
              className={`border rounded-full px-2 py-0.5 text-xs flex items-center justify-center w-6 h-6 ${
                activeStep > step.id
                  ? "bg-green-500 text-white"
                  : activeStep === step.id
                  ? "bg-blue-100 text-blue-500"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {activeStep > step.id ? <BsCheckCircleFill size={20} /> : step.id}
            </span>
            <span className="text-xs">{step.label}</span>
          </div>
        ))}
      </div>

      <div className="border hidden  rounded-md px-2 py-0.5 md:flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition">
        <RiCustomerServiceFill className="text-gray-600" />
        <span className="text-gray-600 text-sm">Need Help?</span>
      </div>
    </div>
  );
};

export default TabSection;
