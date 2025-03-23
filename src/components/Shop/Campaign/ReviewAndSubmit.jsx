// import React, { useState } from "react";

// import { MdCancel, MdInfo } from "react-icons/md";
// import { FaChevronLeft } from "react-icons/fa";
// import { FcIdea } from "react-icons/fc";

// const ReviewAndSubmit = ({ campaignData, open }) => {
//   const [errors, setErrors] = useState({});
//   const [error, setError] = useState(null);

//   console.log("campaign data-", campaignData);

//   // Validate required fields
//   // const validate = () => {
//   //   const validationErrors = {};

//   //   if (!campaignDetails.campaignName.trim()) {
//   //     validationErrors.campaignName = "Campaign Name is required";
//   //   }
//   //   if (!campaignDetails.budget) {
//   //     validationErrors.budget = "Budget is required";
//   //   }
//   //   if (!campaignDetails.startDate || !campaignDetails.endDate) {
//   //     validationErrors.duration = "Campaign duration is required";
//   //   }
//   //   if (catalogs.length === 0) {
//   //     validationErrors.catalogs = "At least one catalog must be selected";
//   //   }

//   //   setErrors(validationErrors);
//   //   return Object.keys(validationErrors).length === 0;
//   // };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v2/campaign/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(campaignData),
//         }
//       );

//       if (response) {
//         console.log("Campaign created successfully:", response);
//         // Redirect to another page or show success message
//       } else {
//         setError(response.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error creating campaign:", error);
//       setError("An error occurred while submitting the campaign.");
//     }
//   };

//   const handleSubmitCampaign = async () => {
//     // Validate form data
//     //   if (!campaignName || !category || !selectedCampaign || !selectedProducts  ) {
//     //    setError("Please fill in all required fields.");
//     //    return;
//     //  }

//     console.log("campaign data--", campaignData);

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v2/campaign/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(campaignData),
//         }
//       );

//       if (response) {
//         console.log("Campaign created successfully:", response);
//         // Redirect to another page or show success message
//       } else {
//         setError(response.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error creating campaign:", error);
//       setError("An error occurred while submitting the campaign.");
//     }
//   };

//   return (
//     <div className={` absolute top-20 inset-0 bg-white flex flex-col items-center justify-center z-50 p-2 ${
//         open ? "md:ml-72" : "md:ml-20"
//       }`}>
//       <div className="flex items-center justify-between mb-4 w-[80%]">
//         <div className="flex items-center gap-1">
//           <FaChevronLeft />
//           <h2 className="text-lg font-semibold ">Review & Submit</h2>
//         </div>

//         <div className="flex items-center gap-1">
//           <MdCancel />
//           <h2 className="text-lg font-semibold"> Discard Campaign</h2>
//         </div>
//       </div>
//       <div className="review-section mb-4 flex items-center justify-between w-[80%]">
//         <div>
//           <h3 className="text-md font-medium">Campaign Details</h3>
//           <div className="review-item">
//             <span>Campaign Type:</span>
//             <span>{campaignData.campaignType}</span>
//           </div>
//           <div className="review-item">
//             <span>Campaign Name:</span>
//             <span>{campaignData.campaignName || "-"}</span>
//             {errors.campaignName && (
//               <p className="text-red-500 text-sm">{errors.campaignName}</p>
//             )}
//           </div>
//           <div className="review-item">
//             <span>Budget:</span>
//             <span>{campaignData?.bidStrategy?.dailyBudget.amount || "-"}</span>
//             {errors.budget && (
//               <p className="text-red-500 text-sm">{errors.budget}</p>
//             )}
//           </div>
//           <div className="review-item">
//             <span>Duration:</span>
//             <span>
//               {campaignData.schedule.startDate && campaignData.schedule.endDate
//                 ? `${campaignData.schedule.startDate}, ${campaignData.schedule.startTime} to ${campaignData.schedule.endDate}, ${campaignData.schedule.endTime}`
//                 : "-"}
//             </span>
//             {errors.duration && (
//               <p className="text-red-500 text-sm">{errors.duration}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col ">
//           <div className="flex items-center gap-2">
//             <FcIdea />
//             <h1>TIP</h1>
//           </div>

//           <h2 className="text-sm font-semibold">
//             Run atleast 3 days to get upto 2x more orders
//           </h2>

//           <p className="text-gray-500 text-xs">
//             Campaign that runs for more days are viewed by more buyers. This
//             increase the chance of getting more orders.
//           </p>
//         </div>
//       </div>

//       <div className=" mb-4 w-[80%]">
//         <h3 className="text-md font-medium">
//           Products : {campaignData.selectedProducts.length}{" "}
//         </h3>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 border border-gray-200 mt-3">
//             <thead className="text-slate-700 text-[16px] font-[400]">
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-2 text-sm font-normal text-center text-gray-500"></th>
//                 <th className="border px-4 py-2">Product</th>
//                 <th className="border px-4 py-2">Rating</th>
//                 <th className="border px-4 py-2">Orders</th>
//                 <th className="border px-4 py-2">Price</th>
//                 <th className="border px-4 py-2">Stock</th>
//                 <th className="border px-4 py-2 flex items-center">
//                   CPC (Cost Per Click)
//                   <MdInfo className="ml-2" />
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="text-slate-600 text-sm divide-y divide-gray-200">
//               {campaignData?.selectedProducts?.map((product) => {
//                 return (
//                   <tr key={product._id}>
//                     {/* Product Details */}
//                     <td className="border px-4 py-2">
//                       <div className="flex items-center gap-x-2">
//                         <img
//                           className="object-cover w-[50px] h-[50px] rounded-md"
//                           src={product.product?.images[0]?.url}
//                           alt="Product"
//                         />
//                         <div>
//                           <h2 className="font-normal text-gray-800 text-[12px]">
//                             {product.product?.name?.length > 30
//                               ? product.product.name.slice(0, 30) + "..."
//                               : product.product?.name}
//                           </h2>
//                           <p className="font-normal text-gray-800 text-[12px]">
//                             <span className="font-bold">Category:</span>{" "}
//                             {product?.product?.category}
//                           </p>
//                           <p className="font-normal text-gray-800 text-[12px]">
//                             <span className="font-bold">ID:</span>{" "}
//                             {product?.product?._id}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Product Ratings */}
//                     <td className="border px-6 py-2 text-center">
//                       {product?.product?.ratings}
//                     </td>

//                     {/* Product Sold Out */}
//                     <td className="border px-4 py-2 text-center">
//                       {product?.product?.sold_out}
//                     </td>

//                     {/* Product Stock */}
//                     <td className="border px-4 py-2 text-center">
//                       {product?.product?.stock}
//                     </td>
//                     {/* Product Price */}
//                     <td className="border px-4 py-2 text-center">
//                       ₹{product?.product?.afterDiscountPrice}
//                     </td>

//                     <td className="border px-4 py-2 text-cente">
//                       {product?.product?.stock}
//                     </td>

//                     <td className="border px-4 py-2">{product?.cpc}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="actions flex justify-end gap-4">
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewAndSubmit;


import React, { useState } from "react";
import { MdCancel, } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { toast } from "react-toastify";
import { server } from "../../../server";


const ReviewAndSubmit = ({ campaignData,  onDiscard , open , setReviewSubmitOpen, resetForm}) => {
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${server}/campaign/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campaignData),
        }
      );

      if (response.ok) {
        toast.success("Campaign created successfully");
        setReviewSubmitOpen(false)
        
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
            onClick={()=> setReviewSubmitOpen(false)}
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
            setTimeout(()=>{window.location.reload()}, 1000)
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
              ₹{campaignData?.bidStrategy?.dailyBudget?.amount || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Duration:</span>
            <span className="text-gray-800 font-medium text-xs md:text-[14px]">
              {campaignData.schedule.startDate && campaignData.schedule.endDate
                ? `${formatMongoDate(new Date(campaignData.schedule.startDate))}, ${campaignData.schedule.startTime} to ${formatMongoDate(new Date(campaignData.schedule.endDate))}, ${campaignData.schedule.endTime}`
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
                  <td className="px-4 py-2">{product?.product?.ratings.totalRating || "-"}</td>
                  <td className="px-4 py-2">{product?.product?.sold_out ? product?.product?.sold_out : product?.product?.sold_out || "-"}</td>
                  <td className="px-4 py-2">
                    ₹{product?.product?.afterDiscountPrice ? product?.product?.afterDiscountPrice : product?.product?.afterDiscountPrice || "-"}
                  </td>
                  <td className="px-4 py-2">{product?.product?.stock ? product?.product?.stock : product?.product?.stock || "-"}</td>
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
      {error && (
        <div className="mt-4 text-red-600 font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default ReviewAndSubmit;

