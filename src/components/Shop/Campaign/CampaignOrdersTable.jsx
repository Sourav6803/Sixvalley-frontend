import React, { useState, useEffect, useMemo } from "react";
import { GiProgression } from "react-icons/gi";
import {
  MdEdit,
  MdInfo,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { server } from "../../../server";


const CampaignOrdersTable = ({ shopId, onSelectedProductsChange }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [autoOptimizeCPC, setAutoOptimizeCPC] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [viewSelected, setViewSelected] = useState(false);
  const [productCPC, setProductCPC] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCriteria, setFilterCriteria] = useState(""); // For "Top Ratings" or "Most Sold"
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 5;


  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${server}/product/get-all-products-shop/${shopId}`
        );
        const data = await response.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []); // Show all products initially
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [shopId]);

  // Apply search and filters dynamically when user interacts
  useEffect(() => {
    if (!searchQuery && !filterCategory && !filterCriteria) {
      setFilteredProducts(products); // Show all products by default
    } else {
      let filtered = [...products];

      // Filter by category
      if (filterCategory) {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );
      }

      // Filter by top ratings or most sold
      if (filterCriteria === "Top Ratings") {
        filtered = filtered.sort((a, b) => b.ratings.totalRating - a.ratings.totalRating);
      } else if (filterCriteria === "Most Sold") {
        filtered = filtered.sort((a, b) => b.sold_out - a.sold_out);
      }

      // Search by Product ID or SKU
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product._id.includes(searchQuery) ||
            (product.sku && product.sku.includes(searchQuery))
        );
      }

      setFilteredProducts(filtered);
    }
  }, [products, searchQuery, filterCategory, filterCriteria]);

  // Mock CPC data per category
  const categoryCPC = {
    Electronics: { min: 0.23, max: 5, recommended: 0.34 },
    Fashion: { min: 0.25, max: 5, recommended: 0.36 },
    "Home Appliances": { min: 0.2, max: 5, recommended: 0.32 },
    Grocery: { min: 0.15, max: 5, recommended: 0.36 },
    Furniture: { min: 0.25, max: 5, recommended: 0.36 },
    "Books, Toys & Kids": { min: 0.22, max: 5, recommended: 0.38 },
    "Paintings & Crafts": { min: 0.05, max: 5, recommended: 0.16 },
    "Beauty & Welness": { min: 0.18, max: 5, recommended: 0.26 },
  };

  const handleCPCChange = (productId, value) => {
    setProductCPC((prevCPC) => ({
      ...prevCPC,
      [productId]: parseFloat(value),
    }));
  };

  // Pagination logic
  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / productsPerPage),
    [filteredProducts]
  );
  
  const startIndex = (currentPage - 1) * productsPerPage;
  
  const currentProducts = useMemo(() => {
    if (viewSelected) {
      // When viewSelected is true, show selected products
      return selectedProducts.map((id) => filteredProducts.find((p) => p._id === id)); 
    } else {
      // Show the filtered products with pagination applied
      return filteredProducts.slice(startIndex, startIndex + productsPerPage);
    }
  }, [filteredProducts, viewSelected, selectedProducts, startIndex, productsPerPage]);

  // Handle product selection
  const handleSelectProduct = (productId) => {
    setShowWarning(false);
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      }
      if (prevSelected.length >= 4) {
        setShowWarning(true);
        return prevSelected;
      }
      return [...prevSelected, productId];
    });
  };

  // Render pagination buttons
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 3; // Maximum visible page buttons
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Add the first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`px-3 py-1 border ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }

    // Add the visible page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 border ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    // Add the last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={`px-3 py-1 border ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Return the pagination with Previous/Next buttons
    return (
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button
            className="px-3 py-1  bg-white text-blue-500"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <MdOutlineNavigateBefore size={25} />
          </button>
        )}
        {pages}
        {currentPage < totalPages && (
          <button
            className="px-3 py-1  bg-white text-blue-500"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <MdOutlineNavigateNext size={25} />
          </button>
        )}
      </div>
    );
  };

  // // Send selected products data to parent
  useEffect(() => {
    // Memoize the formatting function to avoid unnecessary re-renders
    const formatSelectedProducts = () =>
      selectedProducts.map((productId) => {
        const product = products.find((product) => product._id === productId);
        const cpcValue = productCPC[productId] || 0.23; // Default CPC value if not set
        return {
          productId, // Product ID
          cpc: cpcValue, // CPC value
          cpcType: autoOptimizeCPC ? "Auto" : "Manual", // CPC type (Auto/Manual)
          product: product,
        };
      });

    // Check if the required dependencies are available before updating
    if (selectedProducts.length > 0 && products.length > 0) {
      const formattedData = formatSelectedProducts();
      onSelectedProductsChange(formattedData); // Pass data to parent component
    }
  }, [
    selectedProducts,
    productCPC,
    autoOptimizeCPC,
    products,
    onSelectedProductsChange,
  ]);

  return (
    <div className="w-full">
      {/* Filters and Search Section */}
      {!viewSelected && (
        <div className="flex flex-wrap w-full items-center justify-between gap-4 mb-4">
          {/* Filter and Sort Section */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-3/5">
            {/* Filter By */}
            <div className="flex items-center gap-2 text-sm w-full md:w-auto">
              <label className="text-gray-700 font-medium whitespace-nowrap">
                Filter by:
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border px-3 py-2 rounded w-full md:w-40 text-gray-600"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Grocery">Grocery</option>
                <option value="Furniture">Furniture</option>
                <option value="Books, Toys & Kids">Books, Toys & Kids</option>
                <option value="Paintings & Crafts">Paintings & Crafts</option>
                <option value="Beauty & Welness">Beauty & Welness</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2 text-sm w-full md:w-auto">
              <label className="text-gray-700 font-medium whitespace-nowrap">
                Sort by:
              </label>
              <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="border px-3 py-2 rounded w-full md:w-40 text-gray-600"
              >
                <option value="">None</option>
                <option value="Top Ratings">Top Ratings</option>
                <option value="Most Sold">Most Sold</option>
              </select>
            </div>
          </div>

          {/* Search Section */}
          <div className="w-full md:w-[30%] relative">
            <input
              type="text"
              placeholder="Search by Product ID or SKU"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-2 pl-10 rounded w-full text-sm text-gray-600"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.11 3.482l4.4 4.4a1 1 0 01-1.415 1.414l-4.4-4.4A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      )}

      {/* Auto Optimize CPC Section */}
      {viewSelected && (
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <GiProgression /> Auto Optimize CPC (Cost Per Click)
            </label>
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={autoOptimizeCPC}
              onChange={() => setAutoOptimizeCPC(!autoOptimizeCPC)}
            />
          </div>
          <p className="text-gray-500 text-xs">
            Jamaplpur Bazar will manage CPC of your catalogs to get more orders.
          </p>
        </div>
      )}

      {showWarning && (
        <div className="text-red-500 text-sm mb-2">
          You can select a maximum of 4 products.
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 mt-3">
          <thead className="bg-gray-100 text-slate-700 text-[16px] font-[400]">
            <tr>
              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500"></th>
              <th className="border px-4 py-2 text-left w-[50%] sm:w-[60%]">
                Product
              </th>
              <th className="border px-4 py-2 text-center w-[15%]">Rating</th>
              <th className="border px-4 py-2 text-center w-[15%]">Orders</th>
              <th className="border px-4 py-2 text-center w-[15%]">Price</th>
              <th className="border px-4 py-2 text-center w-[15%]">Stock</th>
              {viewSelected && (
                <th className="border px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    CPC (Cost Per Click)
                    <MdInfo />
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="text-slate-600 text-sm divide-y divide-gray-200">
            {currentProducts.map((product) => {
              const cpcData = categoryCPC[product.category] || {};
              const cpc = productCPC[product._id] || cpcData.recommended;
              const firstVariants = product?.variants[0]
              console.log("first variants-->", firstVariants)

              return (
                <tr key={product._id}>
                  {/* Checkbox for Selection */}
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleSelectProduct(product._id)}
                    />
                  </td>

                  {/* Product Details */}
                  <td className="border px-4 py-2 text-left w-[60%] break-words">
                    <div className="flex items-center gap-2">
                      <img
                        className="object-cover w-[50px] h-[50px] rounded-md"
                        src={product?.images[0]?.url}
                        alt="Product"
                      />
                      <div>
                        <h2 className="font-normal text-gray-800 text-[12px]  w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {product?.name?.length > 50
                            ? product.name.slice(0, 50) + "..."
                            : product?.name}
                        </h2>
                        <p className="font-normal text-gray-800 text-[12px] break-words">
                          <span className="font-bold">Category:</span>{" "}
                          {product?.category}
                        </p>
                        <p className="font-normal text-gray-800 text-[12px] break-words truncate w-[250px]">
                          ID : {product?._id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Product Ratings */}
                  <td className="border px-6 py-2 text-center">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                      {product?.ratings?.totalRating}
                      </p>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                      <a
                        href="#"
                        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                      >
                        {product?.reviews?.length} reviews
                      </a>
                    </div>
                    
                  </td>

                  {/* Product Sold Out */}
                  <td className="border px-4 py-2 text-center">
                    {firstVariants?.sold_out
                      ? firstVariants?.sold_out
                      : product?.sold_out}
                  </td>

                  {/* Product Price */}
                  <td className="border px-4 py-2 text-center">
                    ₹
                    {firstVariants?.afterDiscountPrice
                      ? firstVariants?.afterDiscountPrice
                      : product?.afterDiscountPrice}
                  </td>

                  {/* Product Stock */}
                  <td className="border px-4 py-2 text-center">
                    {firstVariants?.stock
                      ? firstVariants?.stock
                      : product?.stock}
                  </td>

                  {/* CPC Management */}
                  {viewSelected && (
                    <td className="border px-4 py-2">
                      {autoOptimizeCPC ? (
                        <span className="text-gray-500 flex items-center gap-2">
                          <GrLineChart /> Auto <MdInfo />
                        </span>
                      ) : (
                        <div className="flex flex-col items-start">
                          <div
                            className={`flex items-center gap-2 border rounded-md px-3 ${
                              cpc < cpcData.min || cpc > cpcData.max
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="number"
                              className="rounded px-2 py-1 w-25"
                              value={cpc}
                              min={0}
                              onChange={(e) =>
                                handleCPCChange(product._id, e.target.value)
                              }
                            />
                            <button className="text-blue-500">
                              <MdEdit />
                            </button>
                          </div>
                          {cpc < cpcData.min || cpc > cpcData.max ? (
                            <p className="text-red-500 text-xs">
                              CPC should be between ₹{cpcData.min} - ₹
                              {cpcData.max}
                            </p>
                          ) : (
                            <p className="text-green-500 text-xs">
                              Recommended CPC: ₹{cpcData.recommended}
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex md:justify-end justify-center items-center">
        {!viewSelected && renderPagination()}
      </div>

      {!viewSelected && (
        <div className="mt-3">
          {selectedProducts.length > 0 && (
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setSelectedProducts([])}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => setViewSelected(true)}
              >
                Add Selected Products ({selectedProducts.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignOrdersTable;
