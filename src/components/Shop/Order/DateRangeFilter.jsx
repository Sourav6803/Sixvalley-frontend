import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import useOutsideClick from "../../../utils/use-outside-click";
// import useOutsideClick from "../hooks/useOutsideClick";

const DateRangeFilter = ({ label, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const ref = useRef();



  // Close dropdown if clicked outside
  useOutsideClick(ref, () => setIsOpen(false));

  const handleApply = () => {
    if (onApply) {
      onApply(startDate, endDate);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    if (onApply) {
      onApply(null, null);
    }
  };

  console.log("open--", isOpen)

  return (
    <div className="relative w-40 mt-1" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 border rounded-md cursor-pointer"
      >
        <span className="text-[12px]">{label}</span>
        <FaCalendarAlt className="text-[12px]"  />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-100 mt-2 w-full  bg-white border  rounded-lg shadow-md p-4">
          <div className="flex flex-col gap-4">
            {/* Start Date Picker */}
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholderText="Select Start Date"
              />
            </div>

            {/* End Date Picker */}
            <div>
              <label className="text-sm font-medium">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholderText="Select End Date"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleClear}
                className="text-blue-600 text-sm hover:underline"
              >
                Clear Filter
              </button>
              <button
                onClick={handleApply}
                disabled={!startDate || !endDate}
                className={`px-4 py-2 rounded-md ${
                  startDate && endDate
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
