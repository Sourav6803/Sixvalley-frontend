

import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { toast } from "react-toastify";
import { server } from "../../../server";


const ReviewAndSubmit = ({
  campaignData,
  onDiscard,
  open,
  setReviewSubmitOpen,
  resetForm,
}) => {
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${server}/campaign/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      if (response.ok) {
        toast.success("Campaign created successfully");
        setReviewSubmitOpen(false);
      } else {
        toast.error("Something went wrong. Please try again.");
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      setError("An error occurred while submitting the campaign.");
    }
  };

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

  return (
    <div
      className={`absolute top-20 left-0  inset-0 bg-white h-screen flex flex-col items-center justify-start p-4 overflow-y-auto transition-all duration-300 ${
        open ? "md:ml-72" : "md:ml-20"
      }`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-6">
        <div className="flex items-center gap-2 ">
          <FaChevronLeft
            className="text-blue-600 cursor-pointer md:text-lg text-[14px] "
            onClick={() => setReviewSubmitOpen(false)}
          />
          <h2 className="text-[16px] md:text-2xl font-semibold text-gray-800">
            Review & Submit
          </h2>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700"
          onClick={() => {
            setReviewSubmitOpen(false);
            resetForm();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        >
          <MdCancel className="text-lg" />
          <span className="text-sm md:text-base font-medium">
            Discard Campaign
          </span>
        </div>
      </div>

      {/* Campaign Details Section */}
      <div className="bg-gray-100 p-4 md:p-6 rounded-lg w-full max-w-5xl mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Campaign Details
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Campaign Type:</span>
            <span className="text-gray-800 font-medium">
              {campaignData.campaignType || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Campaign Name:</span>
            <span className="text-gray-800 font-medium">
              {campaignData.campaignName || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Budget:</span>
            <span className="text-gray-800 font-medium">
              <span className="text-green-600 font-semibold">₹</span>{campaignData?.bidStrategy?.dailyBudget?.amount || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Duration:</span>
            <span className="text-gray-800 font-medium text-xs md:text-[14px]">
              {campaignData.schedule.startDate && campaignData.schedule.endDate
                ? `${formatMongoDate(
                    new Date(campaignData.schedule.startDate)
                  )}, ${campaignData.schedule.startTime} to ${formatMongoDate(
                    new Date(campaignData.schedule.endDate)
                  )}, ${campaignData.schedule.endTime}`
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Tip Section */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-lg w-full max-w-5xl mb-6 flex items-center gap-4">
        <FcIdea className="text-3xl" />
        <div>
          <h4 className="text-gray-800 font-semibold text-lg">
            Tip: Run at least 3 days to get up to 2x more orders
          </h4>
          <p className="text-sm text-gray-600">
            Campaigns running for more days are seen by more buyers, increasing
            the chance of getting more orders.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-100 p-4 md:p-6 rounded-lg w-full max-w-5xl mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Products ({campaignData?.selectedProducts?.length || 0})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Orders</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">CPC</th>
              </tr>
            </thead>
            <tbody>
              {campaignData?.selectedProducts?.map((product) => (
                <tr key={product._id} className="border-t">
                  {console.log(product)}
                  <td className="px-4 py-2 flex items-center gap-4">
                    <img
                      src={product.product?.images[0]?.url}
                      alt="Product"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {product.product?.name?.length > 30
                          ? `${product.product.name.slice(0, 30)}...`
                          : product.product?.name || "-"}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        ID: {product?.product?._id || "-"}
                      </p>
                    </div>
                  </td>
                  
                  
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                        {product?.product?.ratings?.totalRating || 1}
                      </p>
                      
                    </div>
                  </td>
                  <td className="px-4 py-2 items-center">
                    {product?.product?.sold_out
                      ? product?.product?.sold_out
                      : product?.product?.sold_out || 0}
                  </td>
                  

                  <td className="px-4 py-2">
                    <span className="text-green-600 font-semibold">₹</span>
                    {product?.product?.variants[0]?.afterDiscountPrice ? product?.product?.variants[0]?.afterDiscountPrice : product?.product?.afterDiscountPrice}
                  </td>
                  
                  <td className="px-4 py-2">
                    {product?.product?.variants[0]?.stock ? product?.product?.variants[0]?.stock : product?.product?.stock}
                  </td>
                  <td className="px-4 py-2">{product?.cpc || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-5xl flex justify-end gap-4 mb-4  ">
        <button
          onClick={onDiscard}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Discard
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
    </div>
  );
};

export default ReviewAndSubmit;
