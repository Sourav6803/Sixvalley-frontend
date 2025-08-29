import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import ImageModal from "../../../utils/ImageModal";

import EditModal from "./EditModal";

const ActiveProducts = ({ products, updateProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All stock");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTearm, setSearchTearm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
 

  const tabs = [
    {
      id: 1,
      name: "All stock",
      count: products?.length || 0,
    },
    {
      id: 2,
      name: "Out of Stock",
      count: products?.filter((p) => p.stock === 0).length || 0,
    },
    {
      id: 3,
      name: "Low Stock",
      count: products?.filter((p) => p.stock < 5).length || 0,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
    setModalOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filterProduct = products?.filter(
      (product) =>
        product?.name?.toLowerCase().includes(searchTearm.toLowerCase()) ||
        product?._id?.toLowerCase().includes(searchTearm.toLowerCase()) ||
        product?.sku?.toLowerCase().includes(searchTearm.toLowerCase())
    );
    setFilteredProducts(filterProduct);
  };

  const handleEditClick = (product, variant = null) => {
    setSelectedProduct(product );
    setCurrentVariant(variant);
    setIsEditModalOpen(true);
  };

  const handleSaveVariant = (updatedVariant) => {
    updateProduct(updatedVariant);
  };


  // const openEditModal = (product, variant = null) => {
  //   setSelectedProduct(product);
  //   setSelectedVariant(variant); // If variant is null, it's a non-variant product
  //   setIsEditModalOpen(true);
  // };

  return (
    <div className=" h-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Tabs Section */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 py-2 text-[14px] font-semibold focus:outline-none transition-all 
          ${
            activeTab === tab.name
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name} ({tab.count})
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left - Product List */}
          <div className="w-full md:w-1/3 border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Active Products
            </h2>

            {/* Search Input */}
            <div className="relative w-full mb-4 flex">
              {/* Search Input with Icon */}
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Products..."
                  onChange={(e) => setSearchTearm(e.target.value)}
                  value={searchTearm}
                  className="w-full border rounded-md py-2 pl-10 pr-4 text-sm bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={(e) => handleSearch(e)} // Call a search function when clicked
                className="ml-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>

            {/* Product List */}
            <ul>
              {filteredProducts?.length > 0
                ? filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      className={`p-3 my-1 flex items-center space-x-3 cursor-pointer rounded-md transition-all 
            ${
              selectedProduct?._id === product._id
                ? "bg-gray-100 border border-blue-500"
                : "hover:bg-gray-200 border"
            }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product?.images?.[0]?.url || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-xs font-medium text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {product?._id}
                        </p>
                      </div>
                    </li>
                  ))
                : products?.map((product) => (
                    <li
                      key={product._id}
                      className={`p-3 my-1 flex items-center space-x-3 cursor-pointer rounded-md transition-all 
            ${
              selectedProduct?._id === product._id
                ? "bg-gray-100 border border-blue-500"
                : "hover:bg-gray-200 border"
            }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product?.images?.[0]?.url || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-xs font-medium text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {product?._id}
                        </p>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>

          <div className="w-full md:w-2/3 p-4 overflow-y-auto">
            {selectedProduct ? (
              <div>
                {/* Catalog Title */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  Catalog ID: {selectedProduct._id} | Category:{" "}
                  {selectedProduct.category}
                </p>

                {/* Product Table */}
                <div className="border rounded-md bg-white shadow-sm overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-2 px-3 text-left">
                          <input type="checkbox" className="cursor-pointer" />
                        </th>
                        <th className="py-2 text-xs sm:text-sm text-gray-500 px-3 text-left">
                          Variant
                        </th>
                        <th className="py-2 px-3 text-xs sm:text-sm text-gray-500 text-center">
                          Est. Orders/Day
                        </th>
                        <th className="py-2 text-xs sm:text-sm text-gray-500 px-3 text-center">
                          Days to Stockout
                        </th>
                        <th className="py-2 px-3 text-xs sm:text-sm text-gray-500 text-center">
                          Stock
                        </th>
                        <th className="py-2 px-3 text-xs sm:text-sm text-gray-500 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.variants &&
                      selectedProduct.variants.length > 0 ? (
                        selectedProduct.variants.map((variant, index) => (
                          <tr key={variant._id || index} className="border-b">
                            {/* Checkbox */}
                            <td className="py-2 px-3">
                              <input
                                type="checkbox"
                                className="cursor-pointer"
                              />
                            </td>

                            {/* Product Image & Variant Details */}
                            <td className="py-2 px-3 flex items-center space-x-3">
                              <img
                                src={
                                  variant.images[0]?.url || "/placeholder.jpg"
                                }
                                alt={variant.title || selectedProduct.title}
                                onClick={() =>
                                  handleImageClick(variant.images[0]?.url)
                                }
                                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md cursor-pointer"
                              />
                              <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-700">
                                  {selectedProduct.name}
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500">
                                  {variant.attributes?.length > 0
                                    ? variant.attributes.map((attr, i) => (
                                        <span key={i}>
                                          {attr.key}: {attr.value}
                                          {i < variant.attributes.length - 1
                                            ? " | "
                                            : ""}
                                        </span>
                                      ))
                                    : "No attributes"}
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500">
                                  Price: ₹{variant.afterDiscountPrice}
                                </p>
                              </div>
                            </td>

                            {/* Estimated Orders Per Day */}
                            <td className="py-2 px-2 text-center text-gray-700 text-xs sm:text-sm">
                              {variant.estimatedOrders || "-"}
                            </td>

                            {/* Days to Stockout */}
                            <td className="py-2 px-3 text-center text-gray-700 text-xs sm:text-sm">
                              {variant.daysToStockout || "N/A"}
                            </td>

                            {/* Editable Stock Input */}
                            <td className="py-2 px-3 text-center">
                              <input
                                type="number"
                                defaultValue={variant.stock}
                                className="w-14 sm:w-16 p-1 border rounded text-center text-xs sm:text-sm"
                              />
                            </td>

                            {/* Actions */}
                            <td className="py-2 px-3 text-center">
                              <button
                                onClick={() => handleEditClick(selectedProduct,variant)}
                                className="text-blue-600 hover:underline text-xs sm:text-sm"
                              >
                                Edit
                              </button>
                              {/* <MoreActions
                                variant={variant}
                                onPaused={() => console.log("Paused", variant)}
                                addVariant={() =>
                                  console.log("Add Variant", variant)
                                }
                              /> */}
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* No Variants Case */
                        <tr key={selectedProduct?._id} className="border-b">
                          <td className="py-2 px-3">
                            <input type="checkbox" className="cursor-pointer" />
                          </td>

                          {/* Product Details */}
                          <td className="py-2 px-3 flex items-center space-x-3">
                            <img
                              src={
                                selectedProduct.images[0]?.url ||
                                "/placeholder.jpg"
                              }
                              alt={selectedProduct.title}
                              onClick={() =>
                                handleImageClick(selectedProduct.images[0]?.url)
                              }
                              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md cursor-pointer"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-700">
                                {selectedProduct.name}
                              </p>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Price: ₹{selectedProduct.afterDiscountPrice}
                              </p>
                            </div>
                          </td>

                          {/* Estimated Orders Per Day */}
                          <td className="py-2 px-2 text-center text-gray-700 text-xs sm:text-sm">
                            {selectedProduct?.estimatedOrders || "-"}
                          </td>

                          {/* Days to Stockout */}
                          <td className="py-2 px-3 text-center text-gray-700 text-xs sm:text-sm">
                            {selectedProduct?.daysToStockout || "N/A"}
                          </td>

                          {/* Editable Stock Input */}
                          <td className="py-2 px-3 text-center">
                            <input
                              type="number"
                              defaultValue={selectedProduct.stock}
                              className="w-14 sm:w-16 p-1 border rounded text-center text-xs sm:text-sm"
                            />
                          </td>

                          {/* Actions */}
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => handleEditClick(selectedProduct, null)}
                              className="text-blue-600 hover:underline text-xs sm:text-sm"
                            >
                              Edit
                            </button>
                            {/* <MoreActions
                              variant={""}
                              onPaused={() => console.log("Paused")}
                            /> */}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Select a product to view details
              </p>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <ImageModal
          open={open}
          onClose={() => setOpen(false)}
          image={selectedImage}
        />
      )}

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {setIsEditModalOpen(false) ; setSelectedProduct(null) ; setCurrentVariant(null)} }
        variant={currentVariant}
        onSave={handleSaveVariant}
        product={selectedProduct}
        setProduct={setSelectedProduct}

      />
    </div>
  );
};

export default ActiveProducts;
