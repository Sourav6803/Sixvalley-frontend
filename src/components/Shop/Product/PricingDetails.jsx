const PricingDetails = ({
    originalPrice,
    setOriginalPrice,
    discountType,
    setDiscountType,
    discountPrice,
    setDiscountPrice,
    afterDiscountPrice,
    stock,
    setStock,
  }) => {
    return (
      <>
        <h2 className="text-lg text-slate-700 font-semibold mb-4 mt-5">
          Pricing Details
        </h2>
  
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
          {/* Original Price */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              MRP <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={originalPrice}
              min={0}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter your product price..."
            />
          </div>
  
          {/* Discount Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] text-slate-600 rounded-[5px]"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="">Choose a type</option>
              <option value="Flat">Flat</option>
              <option value="Percent">Percent</option>
            </select>
          </div>
  
          {/* Discount Amount */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount Amount ({discountType === "Flat" ? "₹" : "%"}){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              value={discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter discount amount..."
            />
          </div>
  
          {/* Price After Discount (Read Only) */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Price After Discount
            </label>
            <input
              type="number"
              min={0}
              value={afterDiscountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              readOnly
              placeholder="Ex: 300"
            />
          </div>
  
          {/* Product Stock */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              value={stock}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setStock(e.target.value)}
              placeholder="ex: 10"
            />
          </div>
        </div>
      </>
    );
  };
  
  export default PricingDetails;
  