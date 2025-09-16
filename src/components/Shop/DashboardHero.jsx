import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../../pages/Loader";
import analytics from "./icon/Analytics .png";
import pendingImg from "./icon/time.png";
import confirmedImg from "./icon/shopping-bag.png";
import packagingImg from "./icon/package-box.png";
import outForDeliveryImh from "./icon/delivery-bike.png";
import delivredImg from "./icon/products.png";
import returnedImg from "./icon/cancel.png";
import rejectedImg from "./icon/rejected.png";
import cancledImg from "./icon/cancelled.png";
import adminWalletImg from "./icon/wallet.png";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import TopImg from "./icon/badge.png";
import popularImg from "./icon/fire.png";
import ProfileCompletion from "./Profile/ProfileCompletion";
import OrderAnalytic from "./Analytic/OrderAnalytic";
import SalesChart from "./Analytic/SalesChart";
import { FaBox, FaComments, FaGift, FaTag } from "react-icons/fa";

const DashboardHero = ({open}) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const { products } = useSelector((state) => state.products);

  const popularProduct = Array.isArray(products)
    ? [...products].sort((a, b) => b?.ratings.totalRating - a?.ratings.totalRating).slice(0, 6)
    : [];
  const topSellingProduct = Array.isArray(products)
    ? [...products].sort((a, b) => b?.sold_out - a?.sold_out).slice(0, 5)
    : [];

  const cancledProduct = orders?.filter(
    (order) => order?.status === "Canceled"
  );
  const confirmedProduct = orders?.filter(
    (order) => order?.status === "Confirmed"
  );
  const completeProduct = orders?.filter(
    (order) => order?.status === "Delivered"
  );
  const shippedProducts = orders?.filter(
    (order) => order?.status === "Shipped"
  );
  const packagingProduct = orders?.filter(
    (order) => order?.status === "Packaging"
  );
  const outForDeliveryProduct = orders?.filter(
    (order) => order?.status === "Out for delivery"
  );
  const returnedProduct = orders?.filter(
    (order) => order?.status === "Returned"
  );
  const failedToDeliver = orders?.filter(
    (order) => order?.status === "Failed to Deliver"
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller]);

  const [timeFilter, setTimeFilter] = useState(
    "?rangeType=months&rangeCount=12"
  );
  const [analyticData, setAnalyticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",  // Adjust this value to reduce or increase the column width
      },
    },
    stroke: {
      width: [1, 1],
      curve: "smooth",
    },
   
    title: {
      text: "Order Statistics",
      align: "left",
      offsetX: 90,
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
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
            
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
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
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
      horizontalAlign: "left",
      offsetX: 40,
    },
  });

  useEffect(() => {
    const fetchAnalyticData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${server}/analytic/order-analytic${timeFilter}`,
          { withCredentials: true }
        );
        setAnalyticData(response?.data?.data?.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching analytic data:", error);
        setError("Failed to fetch analytic data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticData();
  }, [timeFilter]);

  useEffect(() => {
    if (analyticData && analyticData.length > 0) {
      const periods = analyticData.map((item) => item.period || "Unknown");
      const totalPrices = analyticData?.map(
        (item) => Number(item.totalPrice) || 0
      );
      const totalOrders = analyticData?.map(
        (item) => Number(item.totalOrders) || 0
      );

      // Check for NaN or undefined values
      if (totalPrices.includes(NaN) || totalOrders.includes(NaN)) {
        toast.error("Invalid data found in series.");
        return;
      }

      // Update chart series and categories
      setSeries([
        {
          name: "Total Price",
          type: "column",
          data: totalPrices || [], // Handle empty data gracefully
        },
        {
          name: "Total Orders",
          type: "line",
          data: totalOrders || [], // Handle empty data gracefully
        },
      ]);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: periods || [], // Handle empty categories gracefully
        },
      }));
    }
  }, [analyticData]);

  const stats = [
    {
      title: "Views (18 Dec)",
      value: "45,874",
      change: "-15.30%",
      changeType: "down", // down indicates negative change
    },
    {
      title: "Orders (18 Dec)",
      value: "16",
      change: "-40.74%",
      changeType: "down",
    },
    {
      title: "In Stock Listings",
      value: "64",
    },
    {
      title: "Payments",
      value: "₹31,295.66",
      change: "11.99%",
      changeType: "up", // up indicates positive change
    },
  ];

  return (
    
      <div className={`w-full  bg-white ${open ? "md:ml-72" : "md:ml-20"} mt-20 h-[calc(100vh-80px)] overflow-y-auto  p-0 md:p-2`}>
        <ProfileCompletion completedSteps={1} />

        <div className="flex md:items-center items-start justify-between my-5 flex-col md:flex-row p-2">
          <div>
            <h3 className="text-[20px] text-slate-700 font-Poppins pb-1 font-semibold ">
              Welcome{" "}
              {seller?.sellerName ? seller?.sellerName : "Sourav Bhukta"}
            </h3>
            <h3 className="text-[17px] text-slate-600 pb-3">
              Monitor your business analytics and statistics.
            </h3>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-2 ">
          <div className="w-full md:w-[68%] ">
            <OrderAnalytic />

            <div className="mt-3 w-full flex flex-col  md:flex-row items-center gap-2 border p-2">
              <div className="md:w-[60%] w-full h-full  ">
                <SalesChart />
              </div>

              <div className=" w-full md:w-[50%]  h-full grid grid-cols-2 md:grid-cols-2 gap-2 p-2  rounded-lg shadow-lg">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-between bg-gray-100 px-2 py-4 rounded-lg border border-gray-200"
                  >
                    <div className="text-gray-600 font-medium text-[14px] truncate">
                      {stat.title}
                    </div>

                    <div className="flex items-center justify-center  gap-2 ">
                      <div className="text-[14px] font-normal text-gray-800">
                        {stat.value}
                      </div>
                      {stat.change && (
                        <div
                          className={`text-[12px] flex items-center  ${
                            stat.changeType === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.changeType === "up" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-4 h-4 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-4 h-4 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                          {stat.change}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[32%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-y-2 ">
            {/* Customer Feedback Insights */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <FaComments className="mr-2 text-orange-500" /> Customer
                  Feedback Insights
                </h2>
                <span className="bg-orange-100 text-orange-700 text-sm px-2 py-1 rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                8 Listings received complaints about: <br />
                <span className="font-medium text-red-500">
                  Poor Fabric Quality, Stitching & Finishing Issues, Stained
                  Torn Product Received
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                GMV loss due to Quality Issues:{" "}
                <span className="font-medium">&#8377;270</span>
              </p>
              <a href="#" className="text-blue-600 hover:underline text-sm">
                View Insights & Recommendations
              </a>
            </div>

            {/* Price Recommendations */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <FaTag className="mr-2 text-green-500" /> Price
                  Recommendations
                </h2>
                <span className="bg-orange-100 text-orange-700 text-sm px-2 py-1 rounded">
                  New
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>Get 'Top Discount Of Sale Tag' on your listings</li>
                <li>Get 'Big Saving Deal Tag' on your listings</li>
                <li>Get 'Lowest In Year Tag' on your listings</li>
              </ul>
              <a
                href="#"
                className="text-blue-600 hover:underline text-sm mt-4 block"
              >
                View all recommendations
              </a>
            </div>

            {/* Returns Reduction Insights */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold flex items-center mb-4">
                <FaBox className="mr-2 text-blue-500" /> Returns Reduction
                Insights
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  Check Size Chart{" "}
                  <span className="text-green-500 ml-2">
                    Save up to &#8377;28.8k
                  </span>
                </li>
                <li>
                  Improve Quality{" "}
                  <span className="text-green-500 ml-2">
                    Save up to &#8377;270.5
                  </span>
                </li>
                <li>
                  Check Mis-shipment{" "}
                  <span className="text-green-500 ml-2">
                    Save up to &#8377;72.1k
                  </span>
                </li>
              </ul>
            </div>

            {/* Festive Offers */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold flex items-center mb-4">
                <FaGift className="mr-2 text-purple-500" /> Festive Offers
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  Festive offer - 20% discount{" "}
                  <span className="text-green-500 ml-2">Up to 5x growth</span>
                </li>
                <li>
                  Festive offer - 15% discount{" "}
                  <span className="text-green-500 ml-2">Up to 2x sales</span>
                </li>
                <li>
                  Festive offer - 12% discount{" "}
                  <span className="text-green-500 ml-2">Boost visibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

       

        {/* Business Analatics */}
        <div className="w-full block mt-3 800px:flex items-center 1000px:justify-around flex-col bg-slate-100 rounded-md">
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between m-1 ml-2  ">
            <div className=" flex items-center justify-center gap-2 p-2  ">
              <img src={analytics} alt="Analytics" className="h-5" />
              <h2 className="text-[18px] text-gray-600 font-Poppins ">
                Order Analytics
              </h2>
            </div>

            <div className="border border-gray-500 rounded-md flex gap-2 items-center justify-center ml-3 md:gap-2 px-2 py-1 my-2 ">
              Overall Statistics
              <IoIosArrowDown className="cursor-pointer " />
            </div>
          </div>

          <div className="w-full  p-2 mt-1">
            <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-2">
              <div
                onClick={() => navigate("/dashboard/shipped/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 ">
                  <img src={confirmedImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">
                    Confirmed
                  </h2>
                </div>
                <div className="font-medium text-lg mr-3 text-green-400">
                  {confirmedProduct?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/packaging/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 ">
                  <img src={packagingImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">
                    Packaging
                  </h2>
                </div>
                <div className="text-yellow-400 font-semibold text-xl mr-3">
                  {packagingProduct?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/shipped/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 ">
                  <img src={pendingImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">
                    Shipped order
                  </h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">
                  {shippedProducts?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/out-for-delivery/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 ">
                  <img src={outForDeliveryImh} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">
                    Out For Delivery
                  </h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">
                  {outForDeliveryProduct?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/delivered/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 ">
                  <img src={delivredImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg  text-slate-600 font-medium">
                    Delivered
                  </h2>
                </div>
                <div className="text-green-400 font-semibold text-xl mr-3">
                  {completeProduct?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/returned/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 ">
                  <img src={returnedImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">
                    Returned
                  </h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">
                  {returnedProduct?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/cancled/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3 ">
                  <img src={cancledImg} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">
                    Cancled
                  </h2>
                </div>
                <div className="text-red-400 font-semibold text-xl mr-3">
                  {cancledProduct?.length}
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/failedToDeliver/order")}
                className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3 ">
                  <img src={rejectedImg} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">
                    Failed To Delivery
                  </h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">
                  {failedToDeliver?.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* vendor wallet */}

        <div className="w-full block 800px:flex items-center 1000px:justify-around flex-col bg-slate-100 rounded-md mt-2 p-2">
          <div className=" flex items-center justify-center gap-2 p-2  ">
            <img src={adminWalletImg} alt="Analytics" className="h-5" />
            <h2 className="text-[18px] text-gray-600 font-Poppins ">
              Seller wallet
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 w-full">
            <div className="lg:col-span-1">
              <div className="card h-full flex justify-center items-center bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col items-center gap-4">
                  <img
                    width="48"
                    className="mb-2"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw.png"
                    alt=""
                  />
                  <h3 className="text-2xl font-bold mb-0">
                    ₹{seller?.availableBalance?.toFixed(2)}
                  </h3>
                  <div className="font-bold capitalize mb-6 text-center">
                    Withdrawable balance
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    data-toggle="modal"
                    data-target="#balance-modal"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">
                      ₹{seller?.pendingWithdraw}
                    </h3>
                    <div className="capitalize mb-0">Pending Withdraw</div>
                  </div>
                  <img
                    width="40"
                    className="mb-2"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/pw.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">
                      ₹{seller?.totalCommission?.toFixed(2)}
                    </h3>
                    <div className="capitalize mb-0">
                      Total Commission Given
                    </div>
                  </div>
                  <img
                    width="40"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/tcg.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">
                      ₹{seller?.totalWithdraw}
                    </h3>
                    <div className="capitalize mb-0">Already Withdrawn</div>
                  </div>
                  <img
                    width="40"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/aw.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">
                      ₹{seller?.totalDeliveryCharge}
                    </h3>
                    <div className="capitalize mb-0">
                      Total Delivery Charge Earned
                    </div>
                  </div>
                  <img
                    width="40"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/tdce.png"
                    alt=""
                  />
                </div>
              </div>

              

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">
                      ₹{seller?.collectedCash}
                    </h3>
                    <div className="capitalize mb-0">Collected Cash</div>
                  </div>
                  <img
                    width="40"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/cc.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center bg-slate-100 rounded-md p-3 mt-3">
          <div className="w-full bg-white rounded-md h-[60vh] md:h-[70vh] py-3">
            <div className="flex justify-end space-x-4 mb-4  ">
              <button
                className={`px-4 rounded-md py-2 ${
                  timeFilter === "?rangeType=months&rangeCount=12"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setTimeFilter("?rangeType=months&rangeCount=12")}
              >
                This Year
              </button>
              <button
                className={`px-4 rounded-md py-2 ${
                  timeFilter === "?rangeType=months&rangeCount=3"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setTimeFilter("?rangeType=months&rangeCount=3")}
              >
                This Month
              </button>
              <button
                className={`px-4 rounded-md py-2 ${
                  timeFilter === "?rangeType=days&rangeCount=7"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setTimeFilter("?rangeType=days&rangeCount=7")}
              >
                This Week
              </button>
            </div>
            {loading === true ? (
              <div className="flex items-center justify-center h-screen relative">
                <Loader />
              </div>
            ) : (
              <div id="chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="line"
                  height={400}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex items-start justify-between bg-slate-100 rounded-md mt-3 p-2">
          <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 rounded-md bg-white p-2">
            {/* Popular Products Section */}
            <div className="bg-white rounded-md flex flex-col border-2 shadow-md p-2">
              <div className="flex items-center justify-center mb-4 p-2 bg-white rounded-md border-b">
                <img
                  src={popularImg}
                  alt="Popular Products"
                  className="h-10 mr-2"
                />
                <h2 className="text-gray-500 font-bold text-lg">
                  Popular Products
                </h2>
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                {popularProduct?.map((product) => (
                  <div
                    key={product?._id}
                    className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={product?.images[0].url}
                      alt={product?.name}
                      className="h-20 w-20 object-contain mb-2"
                    />
                    <p className="text-center text-[14px] font-medium mb-1">
                      {product?.name}
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      <AiFillStar color="red" />
                      <p className="text-center text-[12px]">
                        {product?.ratings?.totalRating} ({product?.reviews?.length} Reviews)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Products Section */}
            <div className="bg-white rounded-md flex flex-col border-2 shadow-md overflow-y-auto">
              <div className="flex items-center justify-center mb-4 p-2 bg-white rounded-md border-b">
                <img
                  src={TopImg}
                  alt="Top Selling Products"
                  className="h-10 mr-2"
                />
                <h2 className="text-gray-500 font-bold text-lg">
                  Top Selling Products
                </h2>
              </div>

              <div className="w-full flex flex-col gap-4 p-2">
                {topSellingProduct?.map((product, index) => (
                  <div
                    key={product?.id || index}
                    className="flex items-center justify-between gap-2 border rounded-md p-2"
                  >
                    <img
                      src={product?.images[0].url}
                      alt={product?.name}
                      className="h-20 w-20 object-contain"
                    />
                    <p className="flex-1 text-sm">{product?.name}</p>
                    <div className="border border-blue-400 p-1 rounded-md text-sm">
                      Sold: {product?.sold_out}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-lg font-semibold mt-3">
          Jamalpur Bazar. Copyright sourav@2024
        </div>
      </div>
    
  );
};

export default DashboardHero;
