import React from "react";
import { RiHistoryFill } from "react-icons/ri";
import saree from "./saree.png";

const SearchPage = ({
  results,
  query,
  setQuery,
  showSuggestions,
  setShowSuggestions,
  suggestions,
}) => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 ">
      {showSuggestions && (
        <div className="  mt-1 rounded-lg w-full">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
                className="py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              >
                <span className="material-icons text-gray-500">
                  <RiHistoryFill />
                </span>
                <span>{suggestion}</span>
              </div>
            ))
          ) : (
            <div className=" py-2 text-gray-500">No suggestions found</div>
          )}
        </div>
      )}

      {/* Search Results */}
      {
        <div className="mt-4">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                className="border-b border-gray-200 py-2 flex items-center gap-2"
              >
                <span className="material-icons text-gray-500">
                  <RiHistoryFill />
                </span>
                <span>{result._source.name}</span>
              </li>
            ))}
          </ul>
        </div>
      }

      {/* Recent Searches */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Your Recent Searches
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-gray-600">
            <span className="material-icons text-gray-500">
              <RiHistoryFill />
            </span>
            <span>Bluetooth Headphones</span>
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <span className="material-icons text-gray-500">
              <RiHistoryFill />
            </span>
            <span>T-shirt</span>
          </li>
        </ul>
      </div>

      {/* Popular Searches */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Saree",
            "Shoes",
            "Kurti",
            "Sweater for Women",
            "Watch",
            "Earring",
            "Jacket",
            "T-shirt",
            "Women Shoes",
            "Top for Women",
            "Lehenga",
            "Top",
          ].map((item, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className=" p-4 md:p-6 rounded-md shadow-md flex items-center gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-indigo-600 mb-1">
            Jhumka Bareilly ka ya Saree Banarasi
          </h3>
          <p className="text-gray-600">Shop what you ❤️</p>
        </div>
        <div>
          <img src={saree} alt="Illustration" className="h-20 md:h-[170px]" />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
