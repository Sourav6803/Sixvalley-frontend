import React from "react";

const UnusedBudgetAction = ({selectedOption, setSelectedOption}) => {
  // Options for unused budget actions
  const unusedBudgetOptions = [
    { label: "Roll Over to Next Day", value: "roll_over" },
    { label: "Redistribute to Tomorrow's Budget (Smart Bidding)", value: "redistribute" },
    { label: "Extend Hours Fully Spent", value: "extend_hours" },
  ];

  // Handle checkbox selection
  const handleOptionChange = (value) => {
    setSelectedOption(value); // Only one option can be selected at a time
  };

  return (
    <div className="mb-6 mt-5">
      <h3 className="text-lg font-medium text-gray-700 mb-3">
        Unused Budget Action
      </h3>
      <div className="space-y-1 ml-3 w-fit">
        {unusedBudgetOptions.map((option) => (
          <label
            key={option.value}
            className={`flex items-center space-x-3   rounded-md cursor-pointer`}
          >
            <input
              type="checkbox"
              name="unusedBudgetAction"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionChange(option.value)}
              className="w-4 h-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-700 text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      
    </div>
  );
};

export default UnusedBudgetAction;
