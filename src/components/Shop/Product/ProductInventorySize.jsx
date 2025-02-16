import Select from "react-select";

const ProductInventorySize = ({
  name,
  setName,
  weight,
  setWeight,
  styleCode,
  setStyleCode,
  size,
  setSize,
  sizeOptions,
  showColor,
  color,
  setColor,
  colorOptions,
  sku,
  generateSKU,
}) => {
  return (
    <div>
      <h2 className="text-lg text-slate-700 font-semibold mb-4 mt-5">
        Product, Inventory, & Size
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-2 p-6 bg-white rounded-lg shadow-lg">
        {/* Product Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="mt-2 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Product Weight */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product Weight <span className="text-gray-500">(gm)</span>
          </label>
          <input
            type="text"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in gm"
            className="mt-2 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Style Code */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Style Code <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="styleCode"
            value={styleCode}
            onChange={(e) => setStyleCode(e.target.value)}
            placeholder="Enter style-code or ID"
            className="mt-2 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Size Selection */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Size <span className="text-red-500">*</span>
          </label>
          <Select
            isMulti
            options={sizeOptions}
            value={sizeOptions.filter((option) => size.includes(option.value))}
            onChange={(selected) => setSize(selected.map((s) => s.value))}
            placeholder="Select Size"
            className="mt-2"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#D1D5DB",
                borderRadius: "6px",
                padding: "4px",
                fontSize: "14px",
              }),
            }}
          />
        </div>

        {/* Color Selection (Conditional) */}
        {showColor && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              Color <span className="text-red-500">*</span>
            </label>
            <Select
              isMulti
              options={colorOptions}
              value={colorOptions.filter((option) =>
                color.includes(option.value)
              )}
              onChange={(selected) => setColor(selected.map((c) => c.value))}
              placeholder="Select Color"
              className="mt-2"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#D1D5DB",
                  borderRadius: "6px",
                  padding: "4px",
                  fontSize: "14px",
                }),
              }}
            />
          </div>
        )}

        {/* SKU */}
        <div>
          <label className="flex items-center justify-between mx-2 text-slate-700 font-medium text-md">
            <div>SKU</div>
            <div
              className="text-blue-500 cursor-pointer text-sm hover:text-blue-600"
              onClick={generateSKU}
            >
              Generate SKU
            </div>
          </label>
          <input
            type="text"
            name="sku"
            defaultValue={sku}
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex: 254677"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInventorySize;
