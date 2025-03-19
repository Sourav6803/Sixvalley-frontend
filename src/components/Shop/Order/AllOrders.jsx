import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrdersOfShop } from "../../../redux/actions/order";

import Loader from "../../../pages/Loader";
import productImage from "../icon/package-box.png";

import { GoAlert } from "react-icons/go";
import { FcUnlock } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const [searchTearm, setSearchTearm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [activeTab, setActiveTab] = useState("Pending");

  const [searchType, setSearchType] = useState("SKU ID");
  const [placeholder, setPlaceholder] = useState("Enter SKU ID");

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allOrderIds = orders?.map((order) => order.id);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  // const handleCheckboxChange = (orderId) => {
  //   if (selectedOrders.includes(orderId)) {
  //     setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
  //   } else {
  //     setSelectedOrders([...selectedOrders, orderId]);
  //   }
  // };

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  function formatMongoDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${daySuffix(day)} ${month}, ${year}`;
  }

  function extractTimeFromDate(mongoDate) {
    if (!(mongoDate instanceof Date)) {
      throw new Error(
        "Invalid date. Please provide a valid MongoDB Date object."
      );
    }

    // Extract hours and minutes
    let hours = mongoDate.getHours();
    const minutes = String(mongoDate.getMinutes()).padStart(2, "0");

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format the time as hh:mm AM/PM
    const formattedTime = `${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;
    return formattedTime;
  }

  useEffect(() => {
    if (searchTearm) {
      const filterProduct = orders?.filter((order) =>
        order?.name?.toLowerCase().includes(searchTearm.toLowerCase())
      );
      setSearchData(filterProduct);
    } else {
      setSearchData(null);
    }
  }, [searchTearm, orders]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterProduct = orders?.filter((order) =>
      order?.name?.toLowerCase().includes(searchTearm.toLowerCase())
    );
    setSearchData(filterProduct);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (searchData || orders)?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil((searchData || orders)?.length / itemsPerPage);

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

  const tabs = [
    // { name: "On Hold", count: 0 },
    { name: "Pending", count: 5 },
    { name: "Confirmed", count: 6 },
    { name: "Shipped", count: 0 },
    { name: "Cancelled", count: 0 },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full p-2 md:p-5 bg-gray-200">
          <div className="flex items-center gap-2">
            <img src={productImage} alt="layout" className="h-8" />
            <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">
              Order List: {orders?.length}
            </h3>
          </div>

          <div className="w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded-md shadow-md">
              <div className="flex flex-wrap gap-2 items-center">
                {/* Icon, Heading, and Button in One Row */}
                <div className="flex items-center flex-1">
                  <GoAlert className="h-6 w-6 text-yellow-500 mr-3 shrink-0" />
                  <h2 className="text-sm sm:text-[14px] font-semibold text-yellow-900 flex-1">
                    Alert: Mandatory Barcoded Packaging Policy Update!
                  </h2>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-xs px-3 py-1 sm:px-4 sm:py-2 rounded-md shrink-0">
                    View Policy
                  </button>
                </div>
                {/* Paragraph on a New Row */}
                <p className="text-xs sm:text-[12px] text-yellow-800  w-full">
                  Starting February 9th, 2024, sellers must use transparent
                  barcoded packaging for their products, as per the policy.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm gap-4">
              <div className="flex items-start flex-1">
                <FcUnlock className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                <p className="text-[12px] sm:text-[12px] text-gray-700">
                  Unlock added protection for shipments with barcoded packets
                  and enjoy up to{" "}
                  <span className="text-green-600 font-semibold">
                    100% approval
                  </span>{" "}
                  on valid RTO claims subject to internal policy!
                </p>
              </div>
              <div className="flex md:flex-wrap  gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-[12px] sm:text-[14px] px-3 py-2 rounded-md">
                  Buy Branded Packets
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[12px] sm:text-[14px] px-3 py-2 rounded-md">
                  Scan Branded Packets
                </button>
              </div>
            </div>

            <div className="p-2">
              {/* Tabs Section */}
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={`px-1 py-2 text-[12px] font-normal focus:outline-none ${
                      activeTab === tab.name
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </div>

              <div className="bg-white shadow-md rounded-lg p-2 flex flex-col md:flex-row items-center gap-2">
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full">
                  <div className="flex  items-center gap-4 w-full overflow-x-auto">
                    <h2 className="text-sm font-medium text-gray-700 ">
                      Filter by:
                    </h2>
                    <div className="">
                      <select className=" p-2 mt-1 border rounded-md focus:outline-none  focus:ring-blue-500 text-[12px] focus:ring-1 cursor-pointer">
                        <option className="text-[12px]">Shipment Type</option>
                        <option className="text-[12px]">Standard</option>
                        <option className="text-[12px]">Same Day</option>
                      </select>
                    </div>

                    <div className="">
                      <select className=" p-2 mt-1 border rounded-md focus:outline-none  focus:ring-blue-500 text-[12px] focus:ring-1 cursor-pointer">
                        <option className="text-[12px]">SLA Status</option>
                        <option value="On Track">On Track</option>
                        <option value="At Risk">At Risk</option>
                        <option value="Breached">Breached</option>
                      </select>
                    </div>

                    <div className="">
                      <select className=" p-2 mt-1 border rounded-md focus:outline-none text-[12px]  cursor-pointer focus:ring-1 focus:ring-blue-500">
                        <option className="text-[12px]">Dispatch Date</option>
                        <option className="text-[12px]">Today</option>
                        <option className="text-[12px]">Last 3 Days</option>
                      </select>
                    </div>

                    <div className="">
                      <select className=" p-2 mt-1 border rounded-md focus:outline-none text-[12px] focus:ring-blue-500 focus:ring-1 cursor-pointer">
                        <option className="text-[12px]"> Order Date</option>
                        <option className="text-[12px]">Today</option>
                        <option className="text-[12px]">Newest First</option>
                        <option className="text-[12px]">Oldest First</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:w-[35%] flex items-end border rounded-md overflow-hidden shadow-sm text-[12px] focus:ring-blue-500 focus:ring-1 cursor-pointer focus:border-blue-500">
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
                      onChange={(e) => setSearchTearm(e.target.value)}
                    />
                    <button
                      type="submit"
                      // onClick={handleSearch}
                      className="p-2   "
                    >
                      <FaSearch size={20} color="blue" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full  bg-white ">
              <section className="container px-4 mt-2 ">
                <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                <input
                                  type="checkbox"
                                  onChange={handleSelectAll}
                                  checked={
                                    selectedOrders.length === orders?.length
                                  }
                                />
                              </th>
                              <th className="py-2 px-10 md:px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                                Product Details
                              </th>
                              <th
                                scope="col"
                                className="py-2 px-8 text-sm font-normal text-center text-gray-500 whitespace-nowrap"
                              >
                                Order Date
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Customer
                                <br />
                                Info
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Total
                                <br />
                                Amount
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Payment
                                <br />
                                Method
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Quantity
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Size
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                SKU Id
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Dispatch
                                <br />
                                Date
                              </th>
                              <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                                Actions
                              </th>
                            </tr>
                          </thead>

                          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {currentData?.length > 0 ? (
                              currentData?.map((order, index) => (
                                <tr key={index}>
                                  <td className="px-2 py-4 text-sm font-medium  ">
                                    <div className="text-center">
                                      <input type="checkbox" />
                                    </div>
                                  </td>

                                  <td className="px-2 py-4 text-sm   ">
                                    {order?.cart?.map((product, index) => (
                                      <div
                                        key={index}
                                        className="w-full flex items-center gap-x-1 justify-between "
                                      >
                                        <div className="w-[30%] h-full flex items-center justify-center">
                                          <img
                                            className="object-cover w-[50px] h-[50px] rounded-md"
                                            src={product?.images[0]?.url}
                                            alt="Imag"
                                          />
                                        </div>
                                        <div className=" h-full w-full">
                                          <h2 className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                            {product?.name?.length > 30
                                              ? product.name.slice(0, 30) +
                                                "..."
                                              : product?.name}
                                          </h2>
                                          <p className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                            <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                              Category:
                                            </span>{" "}
                                            {product?.category}
                                          </p>
                                          <p className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                            <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                              Sub Category:{" "}
                                            </span>
                                            {product?.subCategory}
                                          </p>
                                          {/* <p className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                            <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                              Brand:{" "}
                                            </span>
                                            {product?.brand}
                                          </p> */}
                                        </div>
                                      </div>
                                    ))}
                                  </td>

                                  <td className="px-4  py-2 w-[50px]  ">
                                    <div className="w-full gap-x-1 flex flex-col">
                                      <h2 className="font-medium text-gray-600 text-[12px] ">
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

                                  <td className="px-2 py-2 text-[12px]  ">
                                    <div className="text-center flex flex-col gap-x-2">
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        {order?.user?.name?.length > 9
                                          ? order?.user?.name.slice(0, 9) +
                                            "..."
                                          : order?.user?.name}
                                      </h4>
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        {order?.user?.phoneNumber}
                                      </h4>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 w-[50px]  text-sm ">
                                    <div className="text-center  flex flex-col gap-x-2 ">
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        ₹{order?.totalPrice}
                                      </h4>
                                      <p>
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
                                      </p>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 text-[12px]  whitespace-nowrap ">
                                    <h4 className="text-gray-700 text-center dark:text-gray-200">
                                      {order?.paymentInfo?.type ===
                                      "Cash On Delivery"
                                        ? "COD"
                                        : order?.paymentInfo?.type}
                                    </h4>
                                  </td>

                                  <td className="px-4 py-4 text-[12px]  whitespace-nowrap ">
                                    {order?.cart.map((product) => (
                                      <h4 className="text-gray-700 text-center dark:text-gray-200">
                                        {product?.qty}
                                      </h4>
                                    ))}
                                  </td>

                                  <td className="px-4 py-4 text-[12px]  whitespace-nowrap ">
                                    {order?.cart.map((product) => (
                                      <h4 className="text-gray-700 text-center dark:text-gray-200">
                                        {product?.size
                                          ? product?.size
                                          : "Free Size"}
                                      </h4>
                                    ))}
                                  </td>

                                  <td className="px-2 py-4   whitespace-nowrap w-[80px] text-[12px]  ">
                                    {order?.cart?.map((product) => (
                                      <span
                                        key={product?._id}
                                        className="text-gray-700 text-center dark:text-gray-200 rounded-md"
                                      >
                                        {product?.sku}
                                      </span>
                                    ))}
                                  </td>

                                  <td className="px-4 py-4 text-[12px]  whitespace-nowrap ">
                                    <h4 className="text-gray-700 text-center dark:text-gray-200">
                                      2nd Jan
                                    </h4>
                                  </td>

                                  <td className="px-4 py-4 text-sm ">
                                    <div className="flex flex-col gap-2 ">
                                      <button
                                        // onClick={() => {
                                        //   setApprovedModalOpen(true);
                                        //   setOrderId(order?._id);
                                        // }}
                                        className=" bg-blue-600 hover:bg-blue-700 shadow-md text-white px-3 py-1 rounded-md"
                                      >
                                        Approved
                                      </button>
                                      <button
                                        // onClick={() => {
                                        //   setRejectedMoalOpen(true);
                                        //   setOrderId(order?._id);
                                        // }}
                                        className=" px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 shadow-md text-white"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="5"
                                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                                >
                                  No Order found
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
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
