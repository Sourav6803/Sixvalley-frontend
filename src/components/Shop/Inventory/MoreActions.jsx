import React, { useState, useRef, useEffect } from "react";

const MoreActions = ({ variant, onPaused, addVariant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* More Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-gray-200"
      >
        ⋮
      </button>

      {/* Dropdown Menu (Fixed Visibility) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50000">
          {/* <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            View Performance
          </button> */}
          <button
            onClick={() => {
              onPaused(variant);
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Paused Product
          </button>
          <button
            onClick={() => {
              addVariant(variant);
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Add Variant
          </button>
          
        </div>
      )}
    </div>
  );
};

export default MoreActions;
