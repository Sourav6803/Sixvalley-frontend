

import React, { useState } from "react";
import { formatMongoDate } from "../../../utils/common-utils";

const CampaignListing = ({ allCampaigns }) => {
  const [activeTab, setActiveTab] = useState("All"); // State to track the active tab

  // Filtering campaigns based on their status
  const filteredCampaigns =
    activeTab === "All"
      ? allCampaigns
      : allCampaigns?.filter((campaign) => {
          if (activeTab === "Live") return campaign.status === "Active";
          if (activeTab === "Paused") return campaign.status === "Paused";
          if (activeTab === "Upcoming") return campaign.status === "Pending";
        });

  // Function to convert 24-hour time to 12-hour time
  function convertTo12Hour(time) {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 or 12 to 12 for 12-hour clock
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg md:p-6 p-2">
        {/* Header */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
          Campaign Listing
        </h2>

        {/* Tabs */}
        <div className="flex space-x-4 text-sm md:text-base mb-4">
          <button
            onClick={() => setActiveTab("All")}
            className={`${
              activeTab === "All"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            ALL ({allCampaigns?.length})
          </button>
          <button
            onClick={() => setActiveTab("Live")}
            className={`${
              activeTab === "Live"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            LIVE ({allCampaigns?.filter((c) => c.status === "Active").length})
          </button>
          <button
            onClick={() => setActiveTab("Paused")}
            className={`${
              activeTab === "Paused"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            PAUSED ({allCampaigns?.filter((c) => c.status === "Paused").length})
          </button>
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`${
              activeTab === "Upcoming"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            UPCOMING (
            {allCampaigns?.filter((c) => c.status === "Pending").length})
          </button>
        </div>

        {/* Campaign Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm uppercase text-left border">
                <th className="py-3 px-4">Campaign</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">remaining Budget</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Revenue</th>
                <th className="py-3 px-4">ROI</th>
                <th className="py-3 px-4">Insights/Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredCampaigns?.map((campaign, index) => (
                <tr
                  key={campaign?.id}
                  className={`text-gray-700 border text-xs sm:text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {campaign.catalogs}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          {campaign?.campaignName}
                        </p>
                        <p className="text-gray-500 text-[10px] sm:text-xs">
                          ID {campaign._id}
                        </p>
                        <p
                          className={`text-[10px] sm:text-xs font-medium ${
                            campaign.status === "Active"
                              ? "text-green-500"
                              : campaign.status === "Paused"
                              ? "text-red-500"
                              : "text-orange-500"
                          }`}
                        >
                          {campaign.status}
                        </p>
                        {campaign.insights && (
                          <p className="text-gray-500 text-[10px] sm:text-xs">
                            {campaign.insights}
                          </p>
                        )}
                        {campaign?.schedule.startDate && (
                          <p className="text-gray-500 text-[10px] sm:text-xs">
                            {formatMongoDate(
                              new Date(campaign.schedule.startDate)
                            )}{" "}
                            {convertTo12Hour(campaign.schedule?.startTime)} to{" "}
                            <br />{" "}
                            {campaign.schedule.endDate &&
                              formatMongoDate(
                                new Date(campaign.schedule.endDate)
                              )}{" "}
                            {campaign.schedule?.endTime &&
                              convertTo12Hour(campaign.schedule?.endTime)}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm">
                    ₹{campaign?.totalBudget ? campaign?.totalBudget : 0}{" "}
                    {campaign?.bidStrategy && "Daily"}{" "}
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm text-center">
                    {/* ₹{campaign?.totalBudget || 0 - campaign.adMetrics?.adSpend}{" "} */}
                    ₹{campaign?.bidStrategy?.dailyBudget?.amount.toFixed(2)}{" "}
                    for today
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm">
                    {campaign.adMetrics?.impressions}
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm">
                    {campaign.adMetrics?.totalClicks}
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm">
                    {campaign.adMetrics?.orders}
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm">
                    {campaign.adMetrics?.revenue}
                  </td>
                  <td className="py-3 px-4 text-[10px] sm:text-sm">
                    {campaign.adMetrics?.ROI.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2 sm:space-x-4">
                      <button className="bg-gray-100 text-gray-700 text-[10px] sm:text-sm px-2 sm:px-3 py-1 rounded-md hover:bg-gray-200">
                        Restart
                      </button>
                      <button className="text-blue-600 text-[10px] sm:text-sm font-medium hover:underline">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCampaigns?.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500 py-4">
                    No campaigns found for {activeTab} status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignListing;
