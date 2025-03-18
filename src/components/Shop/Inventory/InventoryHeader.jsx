import { AiFillYoutube } from "react-icons/ai";
import { SearchIcon, Upload, X } from "lucide-react";
import { useState } from "react";

const InventoryHeader = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-white shadow-md px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left - Inventory Title */}
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Inventory</h1>

        <div className="flex items-center gap-x-4">
            {/* Center - How it Works & Search Bar */}
        <div className="flex items-center space-x-4 md:space-x-6 flex-1 justify-center">
          {/* How it Works Button - Hidden on Small Screens */}
          <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition">
            <AiFillYoutube size={22} className="text-red-600" />
            <span className="text-base lg:text-lg font-medium">How it Works?</span>
          </button>

          {/* Search Bar - Shown on Large Screens */}
          <div className="hidden md:block relative w-80 lg:w-96">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Product ID/SKU ID"
              className="w-full border rounded-lg py-2 pl-10 pr-4 text-sm md:text-base bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Search Icon - Visible on Small Screens */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 transition"
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Right - Catalog Upload */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base lg:text-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Catalog Upload</span>
        </button>
        </div>
      </div>
      {/* Search Bar for Small Screens - Appears Below Header Without Overlapping */}
      {showSearch && (
        <div className="mt-3 w-full flex items-center space-x-3">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Product ID/SKU ID"
              className="w-full border rounded-lg py-2 pl-10 pr-4 text-sm bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setShowSearch(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryHeader;
