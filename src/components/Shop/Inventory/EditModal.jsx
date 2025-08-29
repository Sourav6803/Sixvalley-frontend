import React, { useEffect, useState } from "react";
import { FaPlus, FaChartBar, FaTimes } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";
import UpdateVariations from "./ProductVariations";

const EditModal = ({
  isOpen,
  onClose,
  variant,
  onSave,
  product,
  setProduct,
}) => {
  const [updatedStock, setUpdatedStock] = useState();
  const [updatedPrice, setUpdatedPrice] = useState();
  const [editPrice, setEditPrice] = useState(false);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const newproduct = JSON.parse(JSON.stringify(product));

  const [newVariation, setNewVariation] = useState({
    _id: "",
    attributes: [],
    originalPrice: "",
    discountType: "",
    discountAmount: "",
    afterDiscountPrice: "",
    stock: "",
    sku: "",
    images: [],
  });

  // Handle changes for new variation
  const handleNewVariationChange = (key, value) => {
    setNewVariation((prev) => {
      const updated = { ...prev, [key]: value };
      if (
        key === "originalPrice" ||
        key === "discountAmount" ||
        key === "discountType"
      ) {
        updated.afterDiscountPrice =
          updated.discountType === "Flat"
            ? Math.round(updated.originalPrice - updated.discountAmount)
            : Math.round(
                updated.originalPrice -
                  (updated.originalPrice * updated.discountAmount) / 100
              );
      }
      return updated;
    });
  };

  const extractAttributeKeys = (variations) => {
    const keys = new Set();

    variations.forEach((variant) => {
        variant.attributes.forEach((attr) => {
            keys.add(attr.key);
        });
    });

    return Array.from(keys); // Convert Set to Array
};


  // Add new variation to the product
  const addVariation = () => {
    if (newVariation.originalPrice && newVariation.stock) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        variants: [...prevProduct.variants, newVariation],
      }));

      setNewVariation({
        _id: uuidv4(),
        attributes: [],
        originalPrice: "",
        discountType: "",
        discountAmount: "",
        afterDiscountPrice: "",
        stock: "",
        sku: `SKU-${uuidv4().slice(0, 8)}`,
        images: [],
      });

      newproduct.variants = [...newproduct.variants, newVariation];
      setShowVariantForm(false);
    }
  };

  useEffect(() => {
    if (variant && typeof variant.stock !== "undefined") {
      setUpdatedStock(variant.stock);
    } else if (product && typeof product.stock !== "undefined") {
      setUpdatedStock(product.stock);
    }

    if (variant && typeof variant.afterDiscountPrice !== "undefined") {
      setUpdatedPrice(variant.afterDiscountPrice);
    } else if (product && typeof product.afterDiscountPrice !== "undefined") {
      setUpdatedPrice(product.afterDiscountPrice);
    }
  }, [variant, product]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setNewVariation((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 3),
    }));
  };

  useEffect(() => {
    setNewVariation((prev) => ({
      ...prev,
      afterDiscountPrice:
        prev.discountType === "Flat"
          ? Math.round(prev.originalPrice - prev.discountAmount)
          : Math.round(
              prev.originalPrice -
                (prev.originalPrice * prev.discountAmount) / 100
            ),
    }));
  }, [
    newVariation.originalPrice,
    newVariation.discountAmount,
    newVariation.discountType,
  ]);

  // console.log("new  varaition-->", newVariation);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Product Variant
        </h2>

        {/* Stock Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          type="number"
          value={updatedStock}
          onChange={(e) => setUpdatedStock(e.target.value)}
          className="w-full border p-2 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Price Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <div className="flex items-center space-x-3 mb-2">
          <p className="text-gray-700 font-medium">₹{updatedPrice}</p>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={editPrice}
              onChange={() => setEditPrice(!editPrice)}
            />
            <span className="text-sm text-blue-600">Edit Price</span>
          </label>
        </div>

        {editPrice && (
          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          {variant && (
            <button
              className="flex items-center px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
              onClick={() => {
                setShowVariantForm(true);
                addVariation();
              }}
            >
              <FaPlus className="mr-2" /> Add Variants
            </button>
          )}

          <button
            className="flex items-center px-4 py-2 text-sm text-white bg-gray-700 rounded-lg hover:bg-gray-800"
            onClick={() => setShowPerformance(true)}
          >
            <FaChartBar className="mr-2" /> View Performance
          </button>
        </div>

        {/* Save & Close */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ ...variant, stock: updatedStock, price: updatedPrice });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {showVariantForm && (
        <div className="fixed inset-0 top-20 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-300 w-full max-w-5xl p-6 rounded-lg shadow-lg h-[70vh] overflow-y-scroll">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Variant</h3>
              <FaTimes
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setShowVariantForm(false)}
              />
            </div>

            <div className="bg-white w-full  p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Manage Variants</h3>
                <FaTimes
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => setShowVariantForm(false)}
                />
              </div>

              {/* Variants Table */}
              {newproduct?.variants.length > 0 && (
                <div className="border-2 mt-3 w-full rounded-md overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                      <tr>
                        {/* Dynamically generate unique attribute headers */}
                        {Array.from(
                          new Set(
                            newproduct?.variants?.flatMap((variant) =>
                              variant.attributes.map((attr) => attr.key)
                            )
                          )
                        ).map((attributeKey) => (
                          <th key={attributeKey} className="border px-3 py-3">
                            {attributeKey}
                          </th>
                        ))}

                        <th className="border px-3 py-3">Original Price</th>
                        <th className="border px-3 py-3">Discount Type</th>
                        <th className="border px-3 py-3">Discount Amount</th>
                        <th className="border px-3 py-3">Final Price</th>
                        <th className="border px-3 py-3">Stock</th>
                        <th className="border px-3 py-3">SKU</th>
                        <th className="border px-3 py-3">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newproduct?.variants.map((variation, index) => (
                        <tr
                          key={index}
                          className="border bg-white hover:bg-gray-50"
                        >
                          {variation.attributes.map((attr, index) => (
                            <td key={index} className="border px-3 py-2">
                              {attr.value}
                            </td>
                          ))}

                          <td className="border px-3 py-2">
                            {variation.originalPrice}
                          </td>
                          <td className="border px-3 py-2">
                            {variation.discountType}
                          </td>
                          <td className="border px-3 py-2">
                            {variation.discountAmount}
                          </td>
                          <td className="border px-3 py-2">
                            {variation.afterDiscountPrice}
                          </td>
                          <td className="border px-3 py-2">
                            {variation.stock}
                          </td>
                          <td className="border px-3 py-2">{variation.sku}</td>
                          <td className="border px-3 py-2">
                            {variation.images.length > 0 ? (
                              <img
                                src={variation.images[0].url}
                                alt="Variant"
                                className="w-12 h-12 object-cover"
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Add New Variation Button */}
              <div className="flex items-center justify-end">
                <button
                  className="mt-4 w-fit px-3 bg-blue-600 text-white py-2 rounded cursor-pointer"
                  // onClick={() => setShowVariantForm(true)}
                  onClick={addVariation}
                >
                  Add More Variants
                </button>
              </div>

              {/* Show Empty Form for Adding New Variation */}
              {showVariantForm && (
                <div className="mt-4 border p-4 rounded-md bg-gray-50">
                  <h3 className="text-md font-semibold mb-2">
                    Add New Variation
                  </h3>

                  <input
                    type="number"
                    className="border w-full p-2 rounded mb-2"
                    placeholder="Original Price"
                    value={newVariation.originalPrice}
                    onChange={(e) =>
                      handleNewVariationChange("originalPrice", e.target.value)
                    }
                  />

                  <select
                    className="border w-full p-2 rounded mb-2"
                    value={newVariation.discountType}
                    onChange={(e) =>
                      handleNewVariationChange("discountType", e.target.value)
                    }
                  >
                    <option value="">Choose Discount Type</option>
                    <option value="Flat">Flat</option>
                    <option value="Percent">Percentage</option>
                  </select>

                  <input
                    type="number"
                    className="border w-full p-2 rounded mb-2"
                    placeholder="Discount Amount"
                    value={newVariation.discountAmount}
                    onChange={(e) =>
                      handleNewVariationChange("discountAmount", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="border w-full p-2 rounded mb-2 bg-gray-100"
                    placeholder="Final Price"
                    value={
                      newVariation.originalPrice -
                        newVariation.discountAmount || ""
                    }
                    readOnly
                  />

                  <input
                    type="number"
                    className="border w-full p-2 rounded mb-2"
                    placeholder="Stock"
                    value={newVariation.stock}
                    onChange={(e) =>
                      handleNewVariationChange("stock", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    className="border w-full p-2 rounded mb-2"
                    placeholder="SKU"
                    value={newVariation.sku}
                    onChange={(e) =>
                      handleNewVariationChange("sku", e.target.value)
                    }
                  />

                  {/* Image Upload */}
                  <div className="flex flex-col items-center gap-2 p-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="fileInput"
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="text-3xl cursor-pointer"
                    >
                      <FcAddImage />
                    </button>
                  </div>

                  <div className="mt-2 w-full overflow-x-auto flex gap-2">
                            {newVariation.images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <img
                                  src={URL.createObjectURL(img)} // ✅ Use stored `url` instead of creating a new one
                                  alt="Uploaded"
                                  className="w-12 cursor-pointer h-12 md:w-16 md:h-16 object-cover border rounded-md shadow-sm"
                                 
                                />
                                <button
                                  // onClick={() =>
                                  //   removeVariationImage(
                                  //     ?._id,
                                  //     imgIndex
                                  //   )
                                  // }
                                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
                                >
                                  X
                                </button>
                              </div>
                            ))}
                          </div>

                  {/* <button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded"
              onClick={addVariation}
            >
              Save Variation
            </button> */}

                  <button
                    disabled={
                      !newVariation.originalPrice ||
                      !newVariation.stock ||
                      !newVariation.sku
                    }
                    className={`mt-4 w-full py-2 rounded ${
                      !newVariation.originalPrice ||
                      !newVariation.stock ||
                      !newVariation.sku
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    onClick={addVariation}
                  >
                    Save Variation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* <UpdateVariations 
          variations={product.variations} 
          attributeKeys={extractAttributeKeys(product?.variants)} 
          onUpdate={(updatedVariations) => setProduct({ ...product, variations: updatedVariations })}
          product={product}
      /> */}


      {/* Performance Analytics */}
      {showPerformance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Product Performance</h3>
              <FaTimes
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setShowPerformance(false)}
              />
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Total Sales:</span>{" "}
                {variant?.sales || 0}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Ratings:</span>{" "}
                {variant?.rating || "N/A"} ⭐
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Reviews:</span>{" "}
                {variant?.reviews || 0}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Return Percentage:</span>{" "}
                {variant?.returnPercentage || "0%"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Return Reasons:</span>{" "}
                {variant?.returnReasons?.length
                  ? variant.returnReasons.join(", ")
                  : "No major issues"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;

