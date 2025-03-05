

// const AttributeInputs = ({ attributes, handleAttributeChange, selectedCategory, handleInputChange , errors}) => {
//   console.log("attributes-->", attributes)
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
//               className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors[`attribute_${index}`] ? "border-red-500" : "border-gray-300"}"`}
//               placeholder={`Enter ${attr.name}`}
//               value={attr.value}
//               onChange={(e) => handleAttributeChange(e, index)}
//             />
//           ) : attr.type === "boolean" ? (
//             <div className="mt-2 flex items-center">
//               <span className="mr-2 text-xs text-gray-600">No</span>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={attr.value}
//                   onChange={(e) => handleAttributeChange(e, index)}
//                 />
//                 <div className="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
//               </label>
//               <span className="ml-2 text-xs text-gray-600">Yes</span>
//             </div>
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
//             {/* Show error message */}
//     {errors[`attribute_${index}`] && (
//       <p className="text-red-500 text-xs mt-1">{errors[`attribute_${index}`]}</p>
//     )}
//         </div>
//       ))}
//     </div>
//   );
// };




const AttributeInputs = ({ attributesBySection, handleAttributeChange, selectedCategory, errors }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      {selectedCategory.attributeSections.map((section) => (
        <div key={section.sectionName} className="mb-6">
          {/* Section Name */}
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            {section.sectionName}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
            {(attributesBySection[section.sectionName] || []).map((attr, index) => (
              <div key={attr.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {attr.name} {attr.unit && `(${attr.unit})`} <span className="text-red-500">*</span>
                </label>

                {attr.type === "text" || attr.type === "number" ? (
                  <input
                    type={attr.type}
                    className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors[`${section.sectionName}_${attr.name}`] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Enter ${attr.name}`}
                    value={attr.value }
                    onChange={(e) => handleAttributeChange(e, section.sectionName, index)}
                  />
                ) : attr.type === "boolean" ? (
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 text-xs text-gray-600">No</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={attr.value}
                        onChange={(e) => handleAttributeChange(e, section.sectionName, index)}
                      />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                    <span className="ml-2 text-xs text-gray-600">Yes</span>
                  </div>
                ) : attr.type === "select" ? (
                  <select
                    className="mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={attr.value}
                    onChange={(e) => handleAttributeChange(e, section.sectionName, index)}
                  >
                    <option value="">Select</option>
                    {attr.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )) || []}
                  </select>
                ) : null}

                {/* Show error message */}
                {errors[`${section.sectionName}_${attr.name}`] && (
                  <p className="text-red-500 text-xs mt-1">{errors[`${section.sectionName}_${attr.name}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default AttributeInputs;
