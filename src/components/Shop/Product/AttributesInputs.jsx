

// const AttributeInputs = ({ attributes, handleAttributeChange, selectedCategory, handleInputChange }) => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
//       {attributes.map((attr, index) => (
//         <div key={attr.name}>
//           <label className="block text-sm font-medium text-gray-700">
//             {attr.name} {attr.unit && `(${attr.unit})`} <span className="text-red-500">*</span>
//           </label>

//           {attr.type === "text" || attr.type === "number" ? (
//             <input
//               type={attr.type}
//               className="mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               placeholder={`Enter ${attr.name}`}
//               value={attr.value}
//               onChange={(e) => handleAttributeChange(e, index)}
//             />
//           ) : attr.type === "boolean" ? (
//               <input
//                  type="checkbox"
//                  checked={attr.value}
//                  className="mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                  onChange={(e) => handleAttributeChange(e, index)}
//                />
//           ) : attr.type === "select" ? (
//             <select
//               className="mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               value={attr.value}
//               onChange={(e) => handleAttributeChange(e, index)}
//             >
//               <option value="">Select</option>
//               {selectedCategory.attributes
//                 .find((a) => a.name === attr.name)
//                 ?.options?.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//             </select>
//           ) : null}
//         </div>
//       ))}
//     </div>
//   );
// };


const AttributeInputs = ({ attributes, handleAttributeChange, selectedCategory, handleInputChange , errors}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
      {attributes.map((attr, index) => (
        <div key={attr.name}>
          <label className="block text-sm font-medium text-gray-700">
            {attr.name} {attr.unit && `(${attr.unit})`} <span className="text-red-500">*</span>
          </label>

          {attr.type === "text" || attr.type === "number" ? (
            <input
              type={attr.type}
              className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors[`attribute_${index}`] ? "border-red-500" : "border-gray-300"}"`}
              placeholder={`Enter ${attr.name}`}
              value={attr.value}
              onChange={(e) => handleAttributeChange(e, index)}
            />
          ) : attr.type === "boolean" ? (
            <div className="mt-2 flex items-center">
              <span className="mr-2 text-xs text-gray-600">No</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={attr.value}
                  onChange={(e) => handleAttributeChange(e, index)}
                />
                <div className="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
              <span className="ml-2 text-xs text-gray-600">Yes</span>
            </div>
          ) : attr.type === "select" ? (
            <select
              className="mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={attr.value}
              onChange={(e) => handleAttributeChange(e, index)}
            >
              <option value="">Select</option>
              {selectedCategory.attributes
                .find((a) => a.name === attr.name)
                ?.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          ) : null}
            {/* Show error message */}
    {errors[`attribute_${index}`] && (
      <p className="text-red-500 text-xs mt-1">{errors[`attribute_${index}`]}</p>
    )}
        </div>
      ))}
    </div>
  );
};




export default AttributeInputs;
