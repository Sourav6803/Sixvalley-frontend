import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { useSelector, dis, useDispatch } from "react-redux";
import { getAllProductsShop } from "../../../redux/actions/product";
import { BiArrowBack } from "react-icons/bi";
import { formatMongoDate } from "../../../utils/common-utils";
import Loader from "../../../pages/Loader";
import { FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ParticipateDeal = ({ open }) => {
  const { products } = useSelector((state) => state?.products);
  const { id } = useParams(); // Extracting the ID from the URL
  const dispatch = useDispatch();
  const [deal, setDeal] = useState({}); // Initializing the Deal
  const [loading, setLoading] = useState(false); // Initializing the loading state
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const { seller } = useSelector((state) => state.seller);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTearm, setSearchTearm] = useState("");
  const [searchType, setSearchType] = useState("SKU ID");
  const [placeholder, setPlaceholder] = useState("Enter SKU ID");
  const [searchData, setSearchData] = useState([]);
  const [discounts, setDiscounts] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller?._id]);

  useEffect(() => {
    const fetchParticipateDeal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/deal/get-deal/${id}`);
        setTimeout(() => {
          setDeal(response?.data?.deals || null);
        }, 1000);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch deal");
      } finally {
        setLoading(false); // Ensures loading is set to false regardless of success or error
      }
    };

    fetchParticipateDeal();
  }, [id]);

  useEffect(() => {
    if (!products || !deal) return;

    let filtered = [];

    // Extract and parse category eligibility correctly
    let eligibleCategories = deal?.eligibility?.categories
      ?.map((cat) => {
        try {
          return JSON.parse(cat); // Ensure it's parsed correctly
        } catch {
          return cat; // Fallback if it's already a string
        }
      })
      .flat(); // Flatten in case of nested arrays

    if (deal?.eligibility?.allCategories) {
      // Show all products but sorted
      filtered = [...products];
    } else if (eligibleCategories?.length) {
      console.log("Filtering by categories:", eligibleCategories);

      // Filter products that belong to the selected categories
      filtered = products.filter((product) =>
        eligibleCategories.includes(product.category)
      );
    }

    // Sort products based on ratings, orders, or views
    filtered.sort(
      (a, b) =>
        b.ratings - a.ratings ||
        b.sold_out - a.sold_out ||
        b.viewCount - a.viewCount
    );

    setFilteredProducts(filtered);
  }, [products, deal]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = (
    searchData?.length > 0
      ? searchData
      : filteredProducts?.length > 0
      ? filteredProducts
      : products
  )?.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(
    (products || filteredProducts)?.length / itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchTypeChange = (e) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);

    switch (selectedType) {
      case "Product ID":
        setPlaceholder("Enter Product ID");
        break;
      case "Customer Name":
        setPlaceholder("Enter Customer Name");
        break;
      default:
        setPlaceholder("Enter SKU ID");
    }
  };

  useEffect(() => {
    if (searchTearm) {
      const filterProduct = filteredProducts?.filter((product) =>
        product?.name?.toLowerCase().includes(searchTearm.toLowerCase())
      );
      setSearchData(filterProduct);
    } else {
      setSearchData(null);
    }
  }, [searchTearm, filteredProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredProducts?.filter((product) => {
      return (
        product?._id?.toString().includes(searchTearm) ||
        product?.sku.includes(searchTearm)
      );
    });

    setFilteredProducts(filtered); // Update the table data
  };

  // const handleSelectAll = (event) => {
  //   if (event.target.checked) {
  //     const allProducts = currentData?.map((product) => ({
  //       _id: product?._id,
  //       discount: discounts[product?._id] || deal.minDiscount, // Use existing discount or minimum discount
  //     }));
  //     setSelectedProducts(allProducts);
  //   } else {
  //     setSelectedProducts([]);
  //   }
  // };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProducts = currentData.map((product) => {
        const isParticipated = participatedProducts.some(
          (p) => p._id === product._id
        );

        return {
          _id: product._id,
          discount: isParticipated
            ? participatedProducts.find((p) => p._id === product._id).discount // Keep existing discount
            : discounts[product._id] || deal.minDiscount, // Otherwise, use the new discount
        };
      });

      setSelectedProducts(allProducts);
    } else {
      // ❗ Don't remove already participated products
      setSelectedProducts(
        participatedProducts.map((p) => ({
          _id: p._id,
          discount: p.discount, // Keep original discount
        }))
      );
    }
  };

  // const handleSelectProduct = (product) => {
  //   setSelectedProducts((prev) => {
  //     const alreadySelected = prev.some((p) => p._id === product._id);
  //     if (alreadySelected) {
  //       return prev.filter((p) => p._id !== product._id); // Deselect product
  //     } else {
  //       return [
  //         ...prev,
  //         {
  //           _id: product._id,
  //           discount: discounts[product._id] || deal.minDiscount, // Set the discount if any, else use deal.minDiscount
  //         },
  //       ];
  //     }
  //   });
  // };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => {
      const isParticipated = participatedProducts.some(
        (p) => p._id === product._id
      );
      const alreadySelected = prev.some((p) => p._id === product._id);

      if (alreadySelected) {
        // ❗ Prevent unselecting participated products
        if (isParticipated) return prev;

        return prev.filter((p) => p._id !== product._id); // Deselect only new selections
      } else {
        return [
          ...prev,
          {
            _id: product._id,
            discount: isParticipated
              ? participatedProducts.find((p) => p._id === product._id).discount // Keep existing discount
              : discounts[product._id] || deal.minDiscount, // Use new discount
          },
        ];
      }
    });
  };

  // const handleDiscountChange = (productId, value) => {
  //   // Update the discounts state
  //   setDiscounts((prev) => ({
  //     ...prev,
  //     [productId]: Math.max(deal.minDiscount, Number(value)), // Ensure the discount is not less than minDiscount
  //   }));

  //   // Also update the selectedProducts array to reflect the changed discount
  //   setSelectedProducts((prev) =>
  //     prev.map((product) =>
  //       product._id === productId
  //         ? { ...product, discount: Math.max(deal.minDiscount, Number(value)) }
  //         : product
  //     )
  //   );
  // };

  const handleDiscountChange = (productId, value) => {
    const newDiscount = Math.max(deal.minDiscount, Number(value)); // Prevents lower discount

    // Check if product is participated
    const isParticipated = participatedProducts.some(
      (p) => p._id === productId
    );
    if (isParticipated) return; // ❗ Block discount changes for participated products

    // Update discount state
    setDiscounts((prev) => ({
      ...prev,
      [productId]: newDiscount,
    }));

    // Update selected products with new discount
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product._id === productId
          ? { ...product, discount: newDiscount }
          : product
      )
    );
  };

  const handleSubmit = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    try {
      setLoading(true);
      // Prepare data for participating sellers
      const productData = selectedProducts.map((product) => ({
        productId: product._id,
        discount: discounts[product._id] || deal.minDiscount, // Use assigned discount or min discount
      }));

      const payload = {
        dealId: deal?._id,
        participatingSellers: [
          {
            sellerId: seller?._id, // Include sellerId
            products: productData, // Products with discount
          },
        ],
      };

      const response = await axios.post(
        `${server}/deal/participate-in-deal`,
        payload
      );

      toast.success(
        response.data.message || "Successfully participated in the deal!"
      );

      setSelectedProducts([]); // Reset selection after submission
      setDiscounts({}); // Reset discounts after submission
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to participate in deal"
      );
    } finally {
      setLoading(false);
    }
  };

  const [participatedProducts, setParticipatedProducts] = useState([]);
  const location = useLocation();

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const dealtype = queryParams.get("dealType"); // Get the value of 'TAB'

  useEffect(() => {
    const fetchSellerParticipation = async () => {
      try {
        if (!seller?._id) return; // Avoid unnecessary API calls if sellerId is undefined

        const response = await axios.get(
          `${server}/deal/participation/${seller?._id}${dealtype ? `?dealType=${dealtype}` : ''}`
        );
        setParticipatedProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching seller participation:", error);
        toast.error("Error fetching seller participation")
      }
    };

    fetchSellerParticipation();

    return () => {
      setParticipatedProducts([]); // Cleanup to prevent stale state if sellerId changes
    };
  }, [seller?._id]);

  return (
    <div
      className={`w-full bg-white ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] overflow-y-auto p-4 md:p-4`}
    >
      <div className="bg-white  rounded-lg ">
        <div className="flex items-center gap-2 mb-4">
          <BiArrowBack
            size={20}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-[16px] md:text-[20px] font-semibold text-gray-700">
            {deal?.title}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-2 border border-gray-300">
          <div className="flex flex-1 items-center gap-4 p-4  rounded-md shadow-sm h-full">
            <img
              src={deal?.image?.url}
              alt="Dhamaka Deals"
              className="w-16 md:w-20 rounded-md h-[60px] object-cover"
            />
            <div className="text-start ">
              <p className="text-sm font-semibold text-gray-600">
                Event Duration
              </p>
              <p className="text-xs text-gray-500">
                {formatMongoDate(new Date(deal?.duration?.startDate))} -{" "}
                {formatMongoDate(new Date(deal?.duration?.endDate))}
              </p>
              <p className="text-xs text-gray-500">
                Start from {deal?.duration?.startTime}
              </p>
            </div>
            <div className="text-start gap-y-2">
              <p className="text-sm font-semibold text-gray-600">
                Participate Before
              </p>
              <p className="text-xs text-gray-500">
                {formatMongoDate(new Date(deal?.eligibility?.minJoinDate))}
              </p>
              <p className="text-xs text-gray-400">11:59 PM</p>
            </div>
            <div className="text-center gap-y-2">
              <p className="text-sm font-semibold text-gray-600">
                Eligible Products
              </p>
              <p className="text-xs font-bold text-blue-600">
                {filteredProducts?.length}
              </p>
              <p className="text-xs text-gray-500">
                Minimum Discount: {deal?.minDiscount}%
              </p>
            </div>
          </div>

          <div className="flex-1 p-4   rounded-md shadow-sm h-full flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-600">
              Estimated Increase in Product Visibility
              <span className="text-xs text-gray-500">
                {" "}
                / Based on past sale events
              </span>
            </p>
            <div className="flex items-center justify-between mt-1">
              {/* 1st div (Wider) */}
              <div className="flex-[2] pr-4 border-r border-gray-300 border-dashed">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-gray-500">Give discount</p>
                  <p className="text-[12px] text-gray-500">Up to 5%</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-gray-500">
                    Increase visibility by up to
                  </p>
                  <p className="text-[12px] text-gray-500">50%</p>
                </div>
              </div>

              {/* 2nd div (6% and above) */}
              <div className="flex-1 px-4 border-r border-gray-300 border-dashed">
                <p className="text-[12px] text-gray-500">6% and above</p>
                <p className="text-[12px] text-gray-500">Up to 100%</p>
              </div>

              {/* 3rd div (10% and above) */}
              <div className="flex-1 px-4">
                <p className="text-[12px] text-gray-500">10% and above</p>
                <p className="text-[12px] text-gray-500">Up to 200%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-3">
          <div className="md:w-[35%] w-full flex items-end border rounded-md overflow-hidden shadow-sm text-[12px] focus:ring-blue-500 focus:ring-1 cursor-pointer focus:border-blue-500">
            <select
              className="w-[40%] p-2 border-r border-gray-300 text-sm cursor-pointer"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="SKU ID">SKU ID</option>
              <option value="Product ID">Product ID</option>
            </select>
            <input
              type="text"
              placeholder={placeholder}
              className="w-2/3 p-2 text-[12px] focus:outline-none"
              onChange={(e) => setSearchTearm(e.target.value)}
            />
            <button type="submit" onClick={handleSearch} className="p-2   ">
              <FaSearch size={20} color="blue" />
            </button>
          </div>
        </div>

        {participatedProducts.length > 0 && (
          <div className="p-3 mt-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 mb-4">
            <p>
              You have already added{" "}
              <strong>{participatedProducts.length}</strong> products in this
              deal.
            </p>
          </div>
        )}

        <div className="overflow-x-auto mt-2">
          {loading ? (
            <div className="w-full h-screen flex items-center justify-center ">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col mt-2">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg p-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-2">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={
                                selectedProducts.length > 0 &&
                                selectedProducts.length === currentData?.length
                              }
                            />
                          </th>
                          <th className="py-2 px-2 md:px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                            Products
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                            {" "}
                            Selling Price
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                            {" "}
                            MRP
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            {" "}
                            Discount %
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            Flash Discount %
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            After Discount
                          </th>
                        </tr>
                      </thead>
                      

                      <tbody>
                        {currentData?.length > 0 ? (
                          currentData.map((product) => {
                            const isParticipated = participatedProducts.some(
                              (p) => p.productId === product._id
                            );
                            console.log("isParticipated-->", isParticipated);
                            const existingDiscount = isParticipated
                              ? participatedProducts.find(
                                  (p) => p.productId === product._id
                                )?.discount
                              : null;

                            const isSelected =
                              isParticipated ||
                              selectedProducts.some(
                                (p) => p._id === product._id
                              );

                              console.log("pddd->", product.variants)

                            return (
                              <tr
                                key={product._id}
                                className={`${
                                  isParticipated ? "bg-gray-100" : "bg-white"
                                } border-t border-gray-300`}
                              >
                                {/* ✅ Checkbox - Pre-selected & disabled if already participated */}
                                <td className="p-2">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    disabled={isParticipated}
                                    onChange={() =>
                                      handleSelectProduct(product)
                                    }
                                    className="mr-2"
                                  />
                                </td>

                                {/* ✅ Product Info */}
                                <td className="p-2 flex items-center">
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="w-12 h-12 object-cover rounded-md"
                                      src={product?.images[0]?.url}
                                      alt="Product"
                                    />
                                    <div>
                                      <h2 className="text-sm font-semibold text-gray-800">
                                        {product?.name?.length > 30
                                          ? product.name.slice(0, 30) + "..."
                                          : product.name}
                                      </h2>
                                      <p className="text-xs text-gray-500">
                                        ID: {product?._id}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        SKU: {product?.sku}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                {/* ✅ Pricing Details */}
                                <td className="p-2 text-center">
                                  ₹{Math.floor(product.variants.length > 0 ? product.variants[0].afterDiscountPrice : product.afterDiscountPrice)}
                                </td>
                                <td className="p-2 text-center">
                                  ₹{product.variants.length > 0 ? product.variants[0].originalPrice : product.originalPrice}
                                </td>
                                {/* <td className="p-2 text-center">
                                  {product?.dicountType === "Flat" ? (
                                    <p>Flat ₹{product?.discountAmount} off</p>
                                  ) : (
                                    <p>{product?.discountAmount}% off</p>
                                  )}
                                </td> */}

                                <td className="p-2 text-center">
                                  {product.variants.length > 0 ? (
                                    product.variants[0].discountType === "Flat" ? (
                                      <p>Flat ₹{product.variants[0].discountAmount} off</p>
                                    ) : (
                                      <p>{product.variants[0].discountAmount}% off</p>
                                    )
                                  ) : (
                                    product.discountType === "Flat" ? (
                                      <p>Flat ₹{product.discountAmount} off</p>
                                    ) : (
                                      <p>{product.discountAmount}% off</p>
                                    )
                                  )}
                                </td>

                                {/* ✅ Discount Section - Show existing discount for participated products */}
                                <td className="p-2 text-center">
                                  <div
                                    className={`relative flex items-center justify-between gap-2 border rounded-lg px-3 py-2 border-gray-300 bg-white shadow-sm
                                      ${
                                        isSelected
                                          ? "hover:shadow-md transition-all duration-200"
                                          : "opacity-50 cursor-not-allowed"
                                      }`}
                                  >
                                    <span className="absolute text-[10px] top-[-8px] left-3 bg-white px-2">
                                      Discount
                                    </span>

                                    <input
                                      type="number"
                                      className="w-16 text-center border-none focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md bg-gray-100 px-2 py-1 disabled:bg-gray-200"
                                      value={
                                        existingDiscount ||
                                        discounts[product._id] ||
                                        deal.minDiscount
                                      }
                                      disabled={isParticipated} // ❗ Disable input for participated products
                                      onChange={(e) =>
                                        handleDiscountChange(
                                          product._id,
                                          e.target.value
                                        )
                                      }
                                    />

                                    <button
                                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                                      disabled={isParticipated} // ❗ Disable edit button for participated products
                                      title="Edit Discount"
                                    >
                                      <MdEdit size={20} />
                                    </button>
                                  </div>
                                </td>

                                {/* ✅ Final Price After Discount */}
                                {/* <td className="p-2 text-center">
                                  ₹
                                  {Math.floor(
                                    product.afterDiscountPrice -
                                      ((existingDiscount || deal.minDiscount) /
                                        100) *
                                        product.afterDiscountPrice
                                  )}
                                </td> */}

<td className="p-2 text-center">
  ₹
  {(() => {
    const selectedItem = product.variants.length > 0 ? product.variants[0] : product;
    const basePrice = selectedItem.afterDiscountPrice;
    const discountType = selectedItem.discountType;
    
    const userDiscount =
      existingDiscount || discounts[product._id] || deal.minDiscount;

    if (discountType === "Flat") {
      const flat = Math.max(userDiscount, 50); // Min ₹50
      return Math.max(0, Math.floor(basePrice - flat));
    } else {
      const percent = Math.max(userDiscount, 12); // Min 12%
      const discounted = basePrice - (percent / 100) * basePrice;
      return Math.floor(discounted);
    }
  })()}
</td>

                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center py-4 text-gray-500"
                            >
                              No Products Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {currentData?.length > 9 && (
                      <div className="flex  justify-end items-center my-2 mx-2 ">
                        {/* Previous Button */}
                        <button
                          className={`px-4 py-2 rounded-md text-white font-semibold ${
                            currentPage === 1
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                          }`}
                          onClick={handlePrevious}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>

                        {/* Display current page and total pages */}
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          Page {currentPage} of {totalPages}
                        </span>

                        {/* Next Button */}
                        <button
                          className={`px-4 py-2 rounded-md text-white font-semibold ${
                            currentPage === totalPages
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                          }`}
                          onClick={handleNext}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedProducts?.length > 0 && (
          <div className="w-full h-[50px] bg-gray-100 rounded-md shadow-md fixed bottom-0 left-0 z-1 flex items-center md:justify-end justify-between p-3  gap-x-4 b">
            <div className="text-center">
              <p className="text-[14px]">
                {`${selectedProducts?.length} / ${selectedProducts?.length}  Products selected`}{" "}
              </p>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Add Products to Sale
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipateDeal;
