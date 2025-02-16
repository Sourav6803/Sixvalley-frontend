import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { toast } from "react-toastify";
import { server } from "../../../server";
import Loader from "../../../pages/Loader";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../../redux/actions/product";
import { FaSearch } from "react-icons/fa";

const data = [
  { label: "Total Views", value: "10.7L", change: "24.4%", increase: true },
  { label: "Total Clicks", value: "37,487", change: "10.8%", increase: true },
  { label: "Total Orders", value: "554", change: "7.8%", increase: true },
  { label: "Conversion Rate", value: "0.1%", change: "0.0%", increase: false },
  { label: "Total Sales", value: "₹2,54,533", change: "5.6%", increase: true },
  {
    label: "Return Percentage",
    value: "8.5%",
    change: "2.9%",
    increase: false,
  },
];

const Dashboard = ({ open }) => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state?.products);
  const [timeFilter, setTimeFilter] = useState(
    "?rangeType=months&rangeCount=12"
  );
  const [analyticData, setAnalyticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overview, setOverview] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTearm, setSearchTearm] = useState("");
  const [searchType, setSearchType] = useState("SKU ID");
  const [placeholder, setPlaceholder] = useState("Enter SKU ID");
  const [searchData, setSearchData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller?._id]);

  const tabs = [
    // { name: "On Hold", count: 0 },
    { name: "All", count: 5 },
    { name: "Low Orders", count: 6 },
    { name: "Low Views", count: 0 },
    { name: "Low Convertion rate", count: 6 },
    { name: "High Returns ", count: 6 },
    { name: "Low Ratings", count: 0 },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  useEffect(() => {
    let sortedProducts = [...(products || [])]; // Clone the array to avoid mutations
  
    if (activeTab === "Low Orders") {
      sortedProducts.sort((a, b) => a.sold_out - b.sold_out); // Ascending order (Lowest Orders First)
    } else if (activeTab === "Low Views") {
      sortedProducts.sort((a, b) => (a.viewCount + (a?.adMetrics?.views || 0)) - b.viewCount + (a?.adMetrics?.views || 0)); // Ascending order (Lowest Views First)
    } else if (activeTab === "Low Convertion rate") {
      sortedProducts.sort((a, b) => {
        const conversionRateA =
          a.clickCount > 0 ? (a.sold_out / a.clickCount) * 100 : 0;
        const conversionRateB =
          b.clickCount > 0 ? (b.sold_out / b.clickCount) * 100 : 0;
        return conversionRateA - conversionRateB; // Ascending order (Lowest Conversion Rate First)
      });
   
    } else if (activeTab === "High Returns ") {
      sortedProducts.sort((a, b) => b.returnRate - a.returnRate); // Descending order (Highest Returns First)
    } else if (activeTab === "Low Ratings") {
      sortedProducts.sort((a, b) => a.ratings - b.ratings); // Ascending order (Lowest Ratings First)
    }
  
    setFilteredProducts(sortedProducts);
    setCurrentPage(1); // Reset to first page when tab changes
  }, [activeTab, products]);

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

  useEffect(() => {
    const fetchAnalyticData = async () => {
      try {
        const res = await axios.get(`${server}/analytic/${seller?._id}`);
        if (res.data) {
          setOverview(res.data);
        }
      } catch (err) {
        console.error("Error ftching seller overview analytics", err?.message);
      }
    };
    fetchAnalyticData();
  }, [seller?._id]);

  const [series, setSeries] = useState([
    {
      name: "Total Price",
      type: "column",
      data: [],
    },
    {
      name: "Total Orders",
      type: "line",
      data: [],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false, // Hide toolbar (removes +, -, and menu)
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    stroke: {
      width: [1, 1],
    },
    xaxis: {
      categories: [],
    },
    yaxis: [
      {
        seriesName: "Total Price",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#1E90FF",
        },
        labels: {
          style: {
            colors: "#1E90FF",
          },
          formatter: (value) => `${value / 1000}k`,
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        opposite: true,
        seriesName: "Total Orders",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#28C76F",
        },
        labels: {
          style: {
            colors: "#28C76F",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      position: "top", // Move legend to the top
      horizontalAlign: "right", // Align it to the right
      fontSize: "14px",
      fontWeight: "bold",
      markers: {
        radius: 12, // Circular markers
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    colors: ["#1E90FF", "#28C76F"], // Change bar and line colors
  });

  useEffect(() => {
    const fetchAnalyticData = async () => {
      try {
        setLoading(true);
        const sellerId = seller && seller?._id;
        const response = await axios.get(
          `${server}/analytic/seller-full-analytic/${sellerId}${timeFilter}`,
          { withCredentials: true }
        );
        setAnalyticData(response?.data?.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching analytic data:", error);
        setError("Failed to fetch analytic data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticData();
  }, [timeFilter, seller?._id]);

  useEffect(() => {
    if (analyticData && analyticData.length > 0) {
      const periods = analyticData.map((item) => item.period || "Unknown");
      const totalPrices = analyticData.map(
        (item) => Number(item.totalPrice) || 0
      );
      const totalOrders = analyticData.map(
        (item) => Number(item.totalOrders) || 0
      );

      if (totalPrices.some(isNaN) || totalOrders.some(isNaN)) {
        toast.error("Invalid data found in series.");
        return;
      }

      // Update chart options and series together
      setSeries([
        { name: "Total Price", type: "column", data: totalPrices },
        { name: "Total Orders", type: "line", data: totalOrders },
      ]);

      setOptions((prev) => ({
        ...prev,
        xaxis: { categories: periods },
      }));
    }
  }, [analyticData]);

  return (
    <div
      className={`w-full  ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] overflow-y-auto p-1 md:p-3`}
    >
      <div className="p-2 sm:p-2  ">
        {/* Business Dashboard Heading */}
        <div className="shadow-lg rounded-md bg-white p-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Business Dashboard
          </h2>
        </div>

        <div className="w-full flex items-center justify-center bg-slate-100 rounded-md  mt-3">
          <div className="w-full bg-white rounded-md h-[60vh] md:h-[70vh] py-3 ">
            <div className="flex flex-col sm:flex-row items-center justify-between p-2 gap-4">
              {/* Title */}
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-base sm:text-lg font-medium text-gray-700">
                  Business Overview
                </p>
              </div>

              {/* Time Filter Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                {[
                  {
                    label: "This Year",
                    query: "?rangeType=months&rangeCount=12",
                  },
                  {
                    label: "This Month",
                    query: "?rangeType=months&rangeCount=1",
                  },
                  { label: "This Week", query: "?rangeType=days&rangeCount=7" },
                ].map((filter) => (
                  <button
                    key={filter.query}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold shadow-md ${
                      timeFilter === filter.query
                        ? "bg-blue-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                    onClick={() => setTimeFilter(filter.query)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {loading === true ? (
              <div className="flex items-center justify-center h-screen relative">
                <Loader />
              </div>
            ) : (
              <div id="chart">
                <ReactApexChart
                  key={JSON.stringify(series)} // Unique key to force re-render
                  options={options}
                  series={series}
                  type="line"
                  height={350}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-3 bg-gray-100 rounded-lg shadow-md">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white p-2 rounded-lg shadow flex flex-col items-center justify-center"
              >
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-600">
                    {item.label}
                  </h3>
                  <Info size={16} className="text-gray-400 cursor-pointer" />
                </div>

                <div className="flex items-center gap-2 text-sm mt-1 mb-2">
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {item.value}
                  </p>
                  <div className="flex items-center">
                    {item.increase ? (
                      <ArrowUpRight size={16} className="text-green-500" />
                    ) : (
                      <ArrowDownRight size={16} className="text-red-500" />
                    )}
                    <span
                      className={` ${
                        item.increase ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-2 bg-white rounded-md">
        <div className="flex items-center justify-between mt-3">
          <div>
            <h2 className="text-gray-600 font-semibold">Product Performance</h2>
          </div>
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
                          <th className="py-2 px-2 md:px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                            Products
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                            {" "}
                            Clicks
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500 whitespace-nowrap">
                            {" "}
                            Views
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            {" "}
                            Orders
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            Conversions
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            Sales
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            Returns
                          </th>
                          <th className="py-2 px-2 text-sm font-normal text-center text-gray-500">
                            Ratings
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentData?.length > 0 ? (
                          currentData.map((product) => {
                            return (
                              <tr
                                key={product._id}
                                className="border-t border-gray-300"
                              >
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

                                <td className="p-2 text-center">
                                  {product?.clickCount + product?.adMetrics.clicks}
                                </td>
                                <td className="p-2 text-center">
                                  {product?.viewCount + product?.adMetrics.views}
                                </td>
                                <td className="p-2 text-center">
                                  {product?.sold_out }
                                </td>

                                <td className="p-2 text-center">
                                  {product?.cliclCount > 0 ? (product?.sold_out / product?.cliclCount) * 100 : 0} %
                                </td>

                                {/* ✅ Final Price After Discount */}
                                <td className="p-2 text-center">₹ {product?.afterDiscountPrice * product.sold_out || 0}</td>
                                <td className="p-2 text-center">{product?.returnRate || 0}</td>
                                <td className="p-2 text-center"> {product?.ratings || 0}</td>
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

                    {totalPages > 1 && currentData.length > 1 && (
                      <div className="flex  justify-end items-center my-2 mx-2 ">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
