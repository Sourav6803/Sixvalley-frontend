// import { useState } from "react";

// const ProductHighlights = ({ highlights }) => {
//   const [showHighlights, setShowHighlights] = useState(false);
//   const hasHighlights = highlights?.length > 0;

//   return hasHighlights ? (
//     <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
//       {/* AI-Powered Insights Badge & Toggle Button */}
//       <div className="flex justify-between items-center mb-3">
//         <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-md">
//           ✨ AI-Generated Product Key Points
//         </span>

//         {/* Toggle Button  */}
//         <button
//           onClick={() => setShowHighlights(!showHighlights)}
//           className="relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition duration-300"
//         >
//           <div
//             className={`w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition duration-300 ${
//               showHighlights ? "translate-x-6" : "translate-x-0"
//             }`}
//           ></div>
//         </button>
//       </div>

//       {/* Highlights List (Visible when toggled) */}
//       {showHighlights && (
//         <div className="mt-2 bg-white dark:bg-gray-900 p-3 rounded-md shadow-sm transition-all duration-300">
//           <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
//             🔍 Smart Product Highlights
//           </h4>
//           <ul className="space-y-2 text-gray-700 dark:text-gray-300">
//             {highlights.map((item, index) => (
//               <li key={index} className="flex items-start">
//                 <span className="text-blue-500 font-medium mr-2">✔</span>
//                 <span>
//                   <strong>{item.key}:</strong> {item.value}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   ) : null;
// };

// export default ProductHighlights;



// import { useState } from "react";

// const ProductHighlights = ({ highlights }) => {
//   const [showHighlights, setShowHighlights] = useState(false);
//   const hasHighlights = highlights?.length > 0;

//   return hasHighlights ? (
//     <div className="mt-5 p-1 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//       {/* AI-Powered Insights Header */}
//       <div className="flex justify-between items-center mb-3">
        
//         <div className="flex items-start gap-3 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md max-w-xl">
            
//           <div>
//             <p className="text-sm font-semibold text-blue-900">
//             ✨ AI-Powered Product Insights
//             </p>
//             <p className="text-xs text-blue-700 mt-1">
//             These highlights are generated using advanced AI algorithms to help
//             you quickly understand key product features.
//             </p>
//           </div>
//         </div>

//         {/* Toggle Button */}
//         <button
//           onClick={() => setShowHighlights(!showHighlights)}
//           className={`relative w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
//             showHighlights
//               ? "bg-green-500 dark:bg-green-400"
//               : "bg-gray-300 dark:bg-gray-600"
//           }`}
//         >
//           <div
//             className={`w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition duration-300 ${
//               showHighlights ? "translate-x-7" : "translate-x-0"
//             }`}
//           ></div>
//         </button>
//       </div>

//       {/* Highlights Section */}
//       {showHighlights && (
//         <div className="mt-3 bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm transition-all duration-300">
//           <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
//             🔍 Key Product Highlights
//           </h4>
//           <ul className="space-y-2 text-gray-700 dark:text-gray-300">
//             {highlights.map((item, index) => (
//               <li key={index} className="flex items-start">
//                 <span className="text-green-500 font-medium mr-2">✔</span>
//                 <span>
//                   <strong>{item.key}:</strong> {item.value}
//                 </span>
//               </li>
//             ))}
//           </ul>

//           {/* Additional Info Section */}
//           <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
//             <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//               🛍 Why These Highlights Matter?
//             </h5>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               AI-generated insights help you make informed purchase decisions by
//               summarizing key features efficiently.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   ) : null;
// };

// export default ProductHighlights;


import { useState } from "react";

const ProductHighlights = ({ highlights }) => {
  const [showHighlights, setShowHighlights] = useState(false);
  const hasHighlights = highlights?.length > 0;

  return hasHighlights ? (
    <div className="mt-5 p-1 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {/* AI-Powered Insights Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-start gap-3 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md max-w-xl">
          <div>
            <p className="text-sm font-semibold text-blue-900">
              ✨ AI-Powered Product Insights
            </p>
            <p className="text-xs text-blue-700 mt-1">
              These highlights are generated using advanced AI algorithms to help
              you quickly understand key product features.
            </p>
          </div>
        </div>

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className={`hidden sm:flex relative w-14 h-7 items-center rounded-full p-1 transition duration-300 ${
            showHighlights ? "bg-green-500 dark:bg-green-400" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition duration-300 ${
              showHighlights ? "translate-x-7" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile Friendly UI */}
      <div className="sm:hidden flex flex-col items-center text-center p-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          📌 Do you want to see the AI-Generated Highlights?
        </p>
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          {showHighlights ? "Hide Highlights" : "Show Highlights"}
        </button>
      </div>

      {/* Highlights Section */}
      {showHighlights && (
        <div className="mt-3 bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm transition-all duration-300">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            🔍 Key Product Highlights
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 font-medium mr-2">✔</span>
                <span>
                  <strong>{item.key}:</strong> {item.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Additional Info Section */}
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              🛍 Why These Highlights Matter?
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              AI-generated insights help you make informed purchase decisions by
              summarizing key features efficiently.
            </p>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default ProductHighlights;


