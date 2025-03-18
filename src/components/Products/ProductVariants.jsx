import { Tooltip } from "react-tooltip";

const ProductVariations = ({ data, attributeKeys, selectedAttributes, handleAttributeChange }) => {
  return (
    <div className="mt-4">
      {attributeKeys.map((key) => (
        <div key={key} className="mb-5">
          <label className="block text-lg text-slate-700 font-semibold mb-3">
            {key}:
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              ...new Set(
                data?.variants.map(
                  (variant) =>
                    variant.attributes.find((attr) => attr.key === key)?.value
                )
              ),
            ]
              .filter(Boolean)
              .map((value) => {
                // Find the corresponding variant stock
                const matchedVariant = data?.variants.find((variant) =>
                  variant.attributes.every((attr) =>
                    selectedAttributes[attr.key]
                      ? selectedAttributes[attr.key] === attr.value
                      : true
                  )
                );

                const stock = matchedVariant?.stock || 0;
                const isOutOfStock = stock === 0;
                const isLowStock = stock > 0 && stock < 5;

                console.log("stock-->", stock)

                return (
                  <div key={value} className="relative">
                    <button
                      onClick={() =>
                        !isOutOfStock && handleAttributeChange(key, value)
                      }
                      className={`py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer border font-medium text-sm transition-all duration-200
                        ${
                          selectedAttributes[key] === value
                            ? "bg-blue-700 text-white border-blue-700 shadow-md"
                            : "border-gray-300 bg-gray-100 hover:border-gray-400"
                        }
                        ${isOutOfStock ? "opacity-50 cursor-not-allowed bg-gray-200" : ""}
                        ${isLowStock ? "border-yellow-500 bg-yellow-100" : ""}
                      `}
                      disabled={isOutOfStock}
                      data-tooltip-id={`tooltip-${key}-${value}`}
                      data-tooltip-content={
                        isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : ""
                      }
                    >
                      
                      {value}
                    </button>

                    {/* Tooltip for Stock Status */}
                    {(isLowStock || isOutOfStock) && (
                      <Tooltip
                        id={`tooltip-${key}-${value}`}
                        place="top"
                        effect="solid"
                        className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md"
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariations;
