import  { useEffect, useState } from "react";
import Loader from "../../../pages/Loader";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";
import {
  extractTimeFromDate,
  formatMongoDate,
} from "../../../utils/common-utils";

const ReadyForPickupOrderTable = ({ readyForPickupOrder, isLoading }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [filterOrders, setFilterOrders] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchType, setSearchType] = useState("SKU ID");
  const [placeholder, setPlaceholder] = useState("Enter SKU ID");
  const [filters, setFilters] = useState({
    shipmentType: "",
    slaStatus: "",
    searchType: "",
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    try {
      const response = await axios.get(`${server}/order/filter/orders`, {
        params: { ...updatedFilters, status: "Confirmed" }, // Filter for confirmed orders ready for pickup
      });
      setFilterOrders(response.data.data);
      if (response.data.data?.length === 0) {
        toast.info(`No orders found for ${value}`);
      }
    } catch (error) {
      console.error("Error filtering orders:", error);
      toast.error("Failed to filter orders.");
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allOrderIds = readyForPickupOrder?.map((order) => order?._id);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  useEffect(() => {
    setIsDisabled(selectedOrders.length > 0);
  }, [selectedOrders?.length]);

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSearchTypeChange = (e) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);

    switch (selectedType) {
      case "Order ID":
        setPlaceholder("Enter Order ID");
        break;
      case "Customer Name":
        setPlaceholder("Enter Customer Name");
        break;
      default:
        setPlaceholder("Enter SKU ID");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filterProduct = readyForPickupOrder?.filter((order) =>
        order?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchData(filterProduct);
    } else {
      setSearchData(null);
    }
  }, [searchTerm, readyForPickupOrder]);

  const handleSearch = (e) => {
    e.preventDefault();

    const filterProduct = readyForPickupOrder?.filter((order) => {
      // Check if the order's ID matches the search term
      const orderIdMatch = order?._id?.toString().includes(searchTerm);

      // Check if any cart item's name or SKU matches the search term
      const cartMatch = order?.cart?.some(
        (cartItem) =>
          cartItem?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cartItem?.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Return true if either order ID or cart match
      return orderIdMatch || cartMatch;
    });

    setSearchData(filterProduct);
  };

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = (
    filterOrders !== null ? filterOrders : searchData !== null ? searchData : readyForPickupOrder
  )?.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(
    (readyForPickupOrder || filterOrders)?.length / itemsPerPage
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


  return (
    <>
      {isLoading ? (
        <div className="flex w-full items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full bg-slate-50">
          <div className="w-full mt-2 bg-white p-1 rounded-md gap-2">
            <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row items-center gap-2">
              <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full">
                <div className="flex items-center gap-4 w-full overflow-x-auto relative">
                  <h2 className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Filter by:
                  </h2>
                  <div className="">
                    <select
                      name="shipmentType"
                      onChange={handleFilterChange}
                      className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 text-[12px] focus:ring-1 cursor-pointer"
                    >
                      <option className="text-[12px]" value="">
                        Shipment Type
                      </option>
                      <option className="text-[12px]" value="standard">
                        Standard
                      </option>
                      <option className="text-[12px]" value="same_day">
                        Same Day
                      </option>
                    </select>
                  </div>

                  {/* SLA Status Filter */}
                  <div className="">
                    <select
                      name="slaStatus"
                      onChange={handleFilterChange}
                      className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 text-[12px] focus:ring-1 cursor-pointer"
                    >
                      <option className="text-[12px]" value="">
                        SLA Status
                      </option>
                      <option value="On Track">On Track</option>
                      <option value="At Risk">At Risk</option>
                      <option value="Breached">Breached</option>
                    </select>
                  </div>
                </div>

                <div className="md:w-[35%] w-full flex items-end border rounded-md overflow-hidden shadow-sm text-[12px] focus:ring-blue-500 focus:ring-1 cursor-pointer focus:border-blue-500">
                  <select
                    className="w-[40%] p-2 border-r border-gray-300 text-sm cursor-pointer"
                    value={searchType}
                    onChange={handleSearchTypeChange}
                  >
                    <option value="SKU ID">SKU ID</option>
                    <option value="Order ID">Order ID</option>
                    <option value="Customer Name">Customer Name</option>
                  </select>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-2/3 p-2 text-[12px] focus:outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="p-2"
                  >
                    <FaSearch size={20} color="blue" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full bg-white p-2">
              <section className="container mt-2">
                <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg p-2">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-2">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                <input
                                  type="checkbox"
                                  onChange={handleSelectAll}
                                  checked={
                                    selectedOrders.length ===
                                    readyForPickupOrder?.length
                                  }
                                />
                              </th>
                              <th className="py-2 px-2 md:px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                                Product Details
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                                Order Date
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Customer Info
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Total Amount
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Payment Method
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Quantity
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Attribute
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Size
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                SKU Id
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Dispatch Date/SLA
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Pickup Code
                              </th>
                            </tr>
                          </thead>

                          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {currentData?.length > 0 ? (
                              currentData?.map((order, index) => (
                                <tr key={index}>
                                  <td className="px-2 py-4 text-sm font-medium">
                                    <div className="text-center">
                                      <input
                                        type="checkbox"
                                        checked={selectedOrders.includes(
                                          order._id
                                        )}
                                        // onChange={() =>
                                        //   handleCheckboxChange(order._id)
                                        // }
                                      />
                                    </div>
                                  </td>

                                  <td className="px-2 py-4 text-sm">
                                    {order?.cart?.map((product, index) => (
                                      <div
                                        key={index}
                                        className="w-full flex items-center gap-x-1 justify-between"
                                      >
                                        <div className="w-[30%] h-full flex items-center justify-center">
                                          <img
                                            className="object-cover w-[50px] h-[50px] rounded-md"
                                            src={product?.images[0]?.url}
                                            alt="Product"
                                          />
                                        </div>
                                        <div className="h-full w-full">
                                          <h2 className="font-normal text-gray-800 dark:text-white text-[12px]">
                                            {product?.name?.length > 30
                                              ? product.name.slice(0, 30) + "..."
                                              : product?.name}
                                          </h2>
                                          <p className="font-normal text-gray-800 dark:text-white text-[12px]">
                                            <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                              Category:
                                            </span>{" "}
                                            {product?.category}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </td>

                                  <td className="px-4 py-2 w-[50px]">
                                    <div className="w-full gap-x-1 flex flex-col">
                                      <h2 className="font-medium text-gray-600 text-[12px]">
                                        {formatMongoDate(
                                          new Date(order?.createdAt)
                                        )}
                                      </h2>
                                      <h2 className="text-gray-600 text-[12px]">
                                        {extractTimeFromDate(
                                          new Date(order?.createdAt)
                                        )}
                                      </h2>
                                    </div>
                                  </td>

                                  <td className="px-2 py-2 text-[12px]">
                                    <div className="text-center flex flex-col gap-x-2">
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        {order?.user?.name?.length > 9
                                          ? order?.user?.name.slice(0, 9) + "..."
                                          : order?.user?.name}
                                      </h4>
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        {order?.user?.phoneNumber}
                                      </h4>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 w-[50px] text-sm">
                                    <div className="text-center flex flex-col gap-x-2">
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        ₹{order?.totalPrice}
                                      </h4>
                                      {/* <p>
                                        {order?.paymentInfo?.status ===
                                        "Succeeded" ? (
                                          <span className="px-1 py-[1px] bg-green-100 rounded-md border border-green-200 text-green-500 text-[10px]">
                                            Paid
                                          </span>
                                        ) : (
                                          <span className="px-1 bg-red-100 py-[1px] font-[600] border rounded-md border-red-200 text-red-500 text-[10px]">
                                            Unpaid
                                          </span>
                                        )}
                                      </p> */}

                                      <p>
                                        {order?.paymentInfo?.status || order?.paymentInfo?.status !== "succeeded"===
                                        "Succeeded" ? (
                                          <span className="px-1 py-[1px] bg-green-100 rounded-md border border-green-200 text-green-500 text-[10px]">
                                            Paid
                                          </span>
                                        ) : (
                                          <span className="px-1 bg-red-100 py-[1px] font-[600] border rounded-md border-red-200 text-red-500 text-[10px]">
                                            Unpaid
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 text-[12px] whitespace-nowrap">
                                    <h4 className="text-gray-700 text-center dark:text-gray-200">
                                      {order?.paymentInfo?.type ===
                                      "Cash On Delivery"
                                        ? "COD"
                                        : order?.paymentInfo?.type}
                                    </h4>
                                  </td>

                                  <td className="px-4 py-4 text-[12px] whitespace-nowrap">
                                    {order?.cart.map((product, index) => (
                                      <h4
                                        key={index}
                                        className="text-gray-700 text-center dark:text-gray-200"
                                      >
                                        {product?.qty}
                                      </h4>
                                    ))}
                                  </td>

                                  <td className="px-4 py-4 text-[12px] whitespace-nowrap">
                                    {order?.cart.map((product, index) => (
                                      <div
                                        key={index}
                                        className="text-gray-700 text-center dark:text-gray-200"
                                      >
                                        {product?.attributes?.length > 0 ? (
                                          product.attributes.map(
                                            (attr, idx) => (
                                              <p key={idx}>
                                                <span className="font-semibold">
                                                  {attr.key}:
                                                </span>{" "}
                                                {attr.value}
                                              </p>
                                            )
                                          )
                                        ) : (
                                          <p className="text-gray-500">N/A</p>
                                        )}
                                      </div>
                                    ))}
                                  </td>

                                  <td className="px-4 py-4 text-[12px] whitespace-nowrap">
                                    {order?.cart.map((product, index) => (
                                      <h4
                                        key={index}
                                        className="text-gray-700 text-center dark:text-gray-200"
                                      >
                                        {product?.size
                                          ? product?.size
                                          : "Free Size"}
                                      </h4>
                                    ))}
                                  </td>

                                  <td className="px-2 py-4 whitespace-nowrap w-[80px] text-[12px]">
                                    {order?.cart?.map((product) => (
                                      <ul
                                        key={product?._id}
                                        className="text-gray-700 text-center dark:text-gray-200 rounded-md"
                                      >
                                        {product?.sku}
                                      </ul>
                                    ))}
                                  </td>

                                  <td className="px-4 py-4 text-[12px] whitespace-nowrap">
                                    <h4 className="text-gray-700 text-center dark:text-gray-200">
                                      {order?.dispatchDate &&
                                        formatMongoDate(
                                          new Date(order?.dispatchDate)
                                        )}
                                    </h4>
                                    <p className="text-gray-700 text-center dark:text-gray-200">
                                      {order?.slaStatus}
                                    </p>
                                  </td>

                                  <td className="px-4 py-4 text-sm">
                                    {/* <div className="flex flex-col gap-2">
                                      <button
                                        onClick={() => {
                                          setAssignPickupModalOpen(true);
                                          setOrderId(order?._id);
                                        }}
                                        disabled={isDisabled}
                                        className={`px-3 py-1 rounded-md shadow-md ${
                                          isDisabled
                                            ? "cursor-not-allowed bg-gray-500 hover:bg-gray-600 text-gray-400"
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                      >
                                        Assign for Pickup
                                      </button>
                                    </div> */}

                                    {console.log('fggf', order.deliveryInfo[0].deliveryId.pickupCode.value)}

                                     {/* NEW: Pickup Code Column */}
                                  <td className="px-4 py-4 text-[12px] whitespace-nowrap">
                                    <div className="text-center">
                                      { order.deliveryInfo[0].deliveryId.pickupCode.value ? (
                                        <div className="bg-blue-50 border border-blue-200 rounded-md p-1">
                                          <span className="font-mono font-bold text-blue-700">
                                            {order.deliveryInfo[0].deliveryId.pickupCode.value}
                                          </span>
                                          
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">Not assigned</span>
                                      )}
                                    </div>
                                  </td>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="12"
                                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                                >
                                  No orders ready for pickup
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {currentData?.length > 9 && (
                          <div className="flex justify-end items-center my-2 mx-2">
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

                            <span className="text-gray-600 dark:text-gray-300 mx-2">
                              Page {currentPage} of {totalPages}
                            </span>

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
              </section>
            </div>


          </div>

        </div>
      )}
    </>
  );
};

export default ReadyForPickupOrderTable;