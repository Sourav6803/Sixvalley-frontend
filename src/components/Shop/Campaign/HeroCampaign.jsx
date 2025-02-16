import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignOverview from "./CampaignOverview";
import CampaignListing from "./CampaignListing";
import axios from "axios";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const HeroCampaign = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);

  const [allCampaigns , setAllCampaings] = useState([])
  const [metricsData, setMetricsData] = useState()

  useEffect(() => {
    if (!seller?._id) {
      console.log("Seller ID is missing, skipping API call");
      return;
    }

    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${server}/campaign/campaigns?sellerId=${seller._id}`);
        if (res?.data) {
          setAllCampaings(res.data?.campaigns);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        toast.error(err?.response?.data?.message || "Failed to fetch campaigns");
      }
    };

    fetchCampaigns();

    // Cleanup function (if needed for aborting fetch)
    return () => {
      console.log("Cleanup function executed");
    };
  }, [seller?._id]); // Only re-run if seller ID changes

  useEffect(() => {
    if (!seller?._id) {
      console.log("Seller ID is missing, skipping API call");
      return;
    }

    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${server}/campaign/metrics/overall?sellerId=${seller._id}`);
        if (res?.data) {
          setMetricsData(res.data?.metrics);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        toast.error(err?.response?.data?.message || "Failed to fetch campaigns");
      }
    };

    fetchMetrics();

    // Cleanup function (if needed for aborting fetch)
    return () => {
      console.log("Cleanup function executed");
    };
  }, [seller?._id]); // Only re-run if seller ID changes

  return (
    <div
      className={`w-full ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] p-3 md:p-2 bg-gray-100 overflow-y-auto`}
    >
      <div className="max-w-7xl mx-auto  ">
        {/* Header Buttons */}
        <div className="flex items-center justify-between  pt-1 md:mt-5 md:p-5 p-2 bg-white">
          <div className="font-semibold text-slate-700">Advertisement</div>

          <div className="md:gap-x-5 gap-x-2  items-center flex">
            <button className="text-purple-600 font-medium underline hidden md:block hover:text-purple-800">
              FAQs
            </button>
            <button
              onClick={() => navigate("/dashboard-create-campaign")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 md:text-[14px] text-[12px] md:px-6 px-2 rounded-lg shadow-md"
            >
              + Create New Campaign
            </button>
          </div>
        </div>

        {metricsData && <CampaignOverview metricsData={metricsData} />}
        {allCampaigns && <CampaignListing allCampaigns={allCampaigns} />}

        <div className="flex flex-col md:flex-row items-center justify-between p-5 gap-x-5 mt-2 bg-white">
          {/* Left Section */}
          <div className="text-start md:text-left space-y-6">
            <h2 className="text-lg md:text-lg font-bold text-gray-700">
              Increase your orders & profits through Meesho Ads
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">🚀</span>
                <span className="text-gray-700 text-sm">
                  Boost visibility of your catalogs by reaching the right
                  customers.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">💳</span>
                <span className="text-gray-700 text-sm">
                  No upfront payment. You will be charged only when customers
                  click on your ad.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="relative mt-10 md:mt-0">
            <div className="bg-purple-900 text-white rounded-lg p-6 lg:p-10 shadow-lg space-y-4">
              <h3 className="text-xl font-semibold">
                With Ads, your catalogs will be shown on top slots!
              </h3>
              <div className="relative">
                <img
                  src="https://static.meeshosupply.com/supplier-new/increase_visibility.svg" // Replace with your image path
                  alt="Ad Preview"
                  className="rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-2xl font-bold text-gray-700 mb-6">
              How do Ads help grow your orders?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-2">
              {/* Card 1 */}
              <div className="flex md:flex-col flex-row bg-white shadow-md rounded-lg md:p-6 p-2 hover:shadow-lg transition">
                <div className="flex items-center justify-center md:mb-4 mb-0">
                  <img
                    src="https://static.meeshosupply.com/supplier-new/increase_visibility.svg"
                    alt="Visibility Icon"
                    className="h-[18vh] w-[20vw] md:h-12 md:w-12"
                    // className="w-12 h-12"
                  />
                </div>
                <div className="flex flex-col md:items-center md:flex-col items-start ml-3 md:ml-0">
                  <h3 className="md:text-lg text-[16px]  font-semibold text-gray-800 mb-2 ">
                    Increase visibility of your catalogs
                  </h3>
                  <p className="text-gray-600 md:text-sm text-[12px] text-start md:text-center ">
                    Your catalogs will be shown on top slots when a customer
                    searches or browses for products on Meesho.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex md:flex-col flex-row bg-white shadow-md rounded-lg md:p-6 p-2 hover:shadow-lg transition">
                <div className="flex items-center justify-center md:mb-4 mb-0">
                  <img
                    src="https://static.meeshosupply.com/supplier-new/reach_right_customer.svg"
                    alt="Reach Customers Icon"
                    className="h-[18vh] w-[20vw] md:h-12 md:w-12"
                  />
                </div>
                <div className="flex flex-col md:items-center md:flex-col items-start ml-3 md:ml-0 text-start md:text-center">
                  <h3 className="md:text-lg text-[16px]  font-semibold text-gray-800 mb-2">
                    Reach the right customers for your catalogs
                  </h3>
                  <p className="text-gray-600 md:text-sm text-[12px] text-start md:text-center">
                    Ads can help you grow your sales by reaching customers who
                    are looking for products like yours.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex md:flex-col flex-row bg-white shadow-md rounded-lg md:p-6 p-2 hover:shadow-lg transition">
                <div className="flex items-center justify-center md:mb-4 mb-0">
                  <img
                    src="https://static.meeshosupply.com/supplier-new/track_order.svg"
                    alt="Track Orders Icon"
                    className="h-[18vh] w-[20vw] md:h-12 md:w-12"
                  />
                </div>

                <div className="flex flex-col md:items-center md:flex-col items-start ml-3 md:ml-0 text-start md:text-center">
                  <h3 className="md:text-lg text-[16px]  font-semibold text-gray-800 mb-2">
                    Track the orders you get from Meesho ads
                  </h3>
                  <p className="text-gray-600 md:text-sm text-[12px] text-start md:text-center">
                    Meesho provides detailed performance metrics around orders &
                    cost to help you measure the impact of ads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="  flex flex-col items-center justify-center py-2">
          <h1 className="text-xl md:text-xl font-semibold text-gray-700 mb-6 text-center">
            3 simple steps to create & manage Ads
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl w-full space-y-6 md:space-y-0 md:space-x-6">
            {/* Step 1 */}
            <div className="flex md:flex-col items-center text-center">
              <div className="w-16 h-16 bg-pink-100 flex items-center justify-center rounded-full mb-4">
                <img
                  src="https://static.meeshosupply.com/supplier-new/select_catalog.svg" // Replace with your icon URL
                  alt="Select Catalog"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[16px] font-medium text-gray-700">
                Select the catalogs you wish to advertise
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16  flex items-center justify-center rounded-full mb-4">
                <img
                  src="https://static.meeshosupply.com/supplier-new/arrow_dot.svg" // Replace with your icon URL
                  alt="Select Catalog"
                  width={100}
                  height={100}
                  // className="w-8 h-8"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex  items-center text-center">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-pink-100 flex items-center justify-center rounded-full mb-4">
                  <img
                    src="https://static.meeshosupply.com/supplier-new/budget_campaign_icon.svg" // Replace with your icon URL
                    alt="Set Budget"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-[16px] font-medium text-gray-700">
                  Set the budget for your campaign
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16  flex items-center justify-center rounded-full mb-4">
                  <img
                    src="https://static.meeshosupply.com/supplier-new/arrow_dot.svg" // Replace with your icon URL
                    alt="Select Catalog"
                    width={100}
                    height={100}
                    // className="w-8 h-8"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-pink-100 flex items-center justify-center rounded-full mb-4">
                <img
                  src="https://static.meeshosupply.com/supplier-new/launch_campaign_icon.svg" // Replace with your icon URL
                  alt="Launch Campaign"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[16px] font-medium text-gray-700">
                Launch your campaign & manage performance
              </p>
            </div>
          </div>
          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => navigate("/dashboard-create-campaign")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-normal py-2 px-6 rounded-lg shadow-lg transition duration-300"
            >
              + Create New Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCampaign;
