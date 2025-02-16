import React from "react";

const CampaignOverview = ({metricsData}) => {
  
  return (
    <div className=" flex flex-col items-center py-4">
      <div className="w-full  bg-white shadow-lg rounded-lg p-2">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center gap-x-3 mb-6">
          {/* Heading */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center md:text-left">
            Campaings Overview
          </h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 md:gap-4 gap-2 min-w-max overflow-x-auto">
          {/* Metric Cards */}
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">Ad Spends</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              ₹{metricsData?.totalAdSpend}
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">ROI</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              {metricsData?.roi}
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">Views</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              {metricsData?.totalImpressions}
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">Clicks</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              {metricsData?.totalClicks}
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">CTR</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              {metricsData?.ctr}%
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">Total Sold</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              {metricsData?.totalSold}
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">CVR</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              {metricsData?.cvr}%
            </h3>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 sm:p-4">
            <p className="text-gray-600 text-xs sm:text-sm">Revenue</p>
            <h3 className="text-sm sm:text-xl font-semibold text-teal-600">
              ₹{metricsData?.totalRevenue}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignOverview;
