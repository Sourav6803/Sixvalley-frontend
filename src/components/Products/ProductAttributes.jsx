import React from "react";


const ProductAttributes = ({ attributeSection }) => {
  return (
    <div className="bg-white mt-3">
      <h2 className="text-slate-600 font-[450] mt-2 text-lg">
        Product Details
      </h2>
      {attributeSection?.map((section, index) => (
        <div key={index} className="py-2">
          <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
            {section.sectionName}
          </h3>
          <div className="grid grid-cols-1 gap-y-2">
            {section.attributes.map((attr, i) => (
              <div key={i} className="flex items-start py-0.5  border-gray-200">
                {/* Fixed width for name */}
                <span className="text-gray-600 text-sm w-48 min-w-[150px]">
                  {attr.name}
                </span>
                {/* Flexible value to keep alignment */}
                <span className="font-medium text-gray-900 text-sm flex-1">
                  {attr.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default ProductAttributes;



