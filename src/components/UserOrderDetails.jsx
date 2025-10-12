
import { useEffect, useMemo, useState } from "react";
import { BsFillBagFill, BsArrowLeft, BsTruck, BsArrowRepeat } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { TbReplace } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import socketIO from "socket.io-client";
import ReviewPopup from "./Review/ReviewPopup";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [returnReason, setReturnReason] = useState("");
  const [replacementReason, setReplacementReason] = useState("");
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [returnType, setReturnType] = useState("return"); // "return" or "replacement"
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("items");
  const [productReturnReasons, setProductReturnReasons] = useState([''])

  const [selectedItemId, setSelectedItemId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user?._id]);

  const data = useMemo(
    () => orders?.find((item) => item?._id === id),
    [orders, id]
  );

  const reviewHandler = async (e) => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", selectedItem?._id);
    formData.append("orderId", id);

    if (images && images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `${server}/product/create-new-review`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data.message);
      dispatch(getAllOrdersOfUser(user._id));
      setComment("");
      setRating(1);
      setImages([]);
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  // Enhanced return/replacement handler
  const handleReturnRequest = async (cartItemId, type, reason, notes = "") => {
    if (!reason) {
      toast.error(`Please select a ${type} reason`);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${server}/order/${id}/cart-item/${cartItemId}/return`,
        {
          type: type, // "return" or "replacement"
          reason: reason,
          notes: notes,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // Refresh order data
      dispatch(getAllOrdersOfUser(user._id));

      // Notify seller
      const item = data?.cart.find((item) => item._id === cartItemId);
      socketId.emit("notification", {
        title: `New ${type} request`,
        content: `${type.charAt(0).toUpperCase() + type.slice(1)} request for ${item?.name}`,
        image: item?.images?.[0]?.url,
        users: [{ userId: item?.shopId }],
      });

      // Close modals
      setShowReturnModal(false);
      setShowReplacementModal(false);
      setReturnReason("");
      setReplacementReason("");
    } catch (error) {
      toast.error(error?.response?.data?.message || `${type} request failed`);
    } finally {
      setLoading(false);
    }
  };

  // Check if item is eligible for return/replacement
  const isItemReturnEligible = (item, order) => {
    if (!order.deliveredAt) return false;
    if (!item.returnAllowed) return false;
    
    const returnWindowDays = item.returnPolicy?.returnWindowDays || 7;
    const today = new Date();
    const deliveryDate = new Date(order.deliveredAt);
    const returnDeadline = new Date(deliveryDate);
    returnDeadline.setDate(returnDeadline.getDate() + returnWindowDays);
    
    return today <= returnDeadline;
  };

  // Check if replacement is allowed for the item
  const isReplacementAllowed = (item) => {
    return item.returnPolicy?.isReplaceable !== false;
  };

  function formatMongoDate(date) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month}, ${year}`;
  }

  const status = data?.status;

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Return Requested": return "bg-yellow-100 text-yellow-800";
      case "Replacement Requested": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Processing refund": return "bg-yellow-100 text-yellow-800";
      case "Refund Success": return "bg-teal-100 text-teal-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    // switch (status) {
    //   case "Delivered": return "✅";
    //   case "Processing": return "🔄";
    //   case "Shipped": return "🚚";
    //   case "Processing refund": return "↩️";
    //   case "Refund Success": return "💸";
    //   case "Rejected": return "❌";
    //   default: return "📦";
    // }
    switch (status) {
        case "Delivered": return "✅";
        case "Return Requested": return "↩️";
        case "Replacement Requested": return "🔄";
        case "Processing refund": return "⏳";
        case "Refund Success": return "💸";
        case "Rejected": return "❌";
        default: return "📦";
    }
  };

  // Common return reasons
  const returnReasons = [
    "Damaged item",
    "Wrong item received",
    "Quality not satisfactory",
    "Item defective/Not working",
    "Size too small",
    "Size too large",
    "Product not as described",
    "Wrong color received",
    "Missing parts/Accessories",
    "Changed my mind"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <BsArrowLeft className="mr-2" /> Back
          </button>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <BsFillBagFill size={24} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-gray-500 text-sm">Order ID</p>
              <p className="font-semibold text-gray-900">
                #{data?._id?.slice(-8)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">Placed on</p>
              <p className="font-semibold text-gray-900">
                {formatMongoDate(new Date(data?.createdAt))}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  status
                )}`}
              >
                {getStatusIcon(status)} <span className="ml-1">{status}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-4 font-medium text-sm ${
              activeTab === "items"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("items")}
          >
            Order Items
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm ${
              activeTab === "status"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("status")}
          >
            Order Status
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm ${
              activeTab === "payment"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment & Shipping
          </button>
        </div>

        {/* Order Items Section */}
        {activeTab === "items" && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Items Ordered
            </h3>
            {data?.cart?.map((item, index) => {
              const variant = item.currentVariant || item;
              const variantAttributes = variant?.attributes || [];
              const isEligible = isItemReturnEligible(item, data);
              // const hasPendingRequest = hasPendingReturnRequest(item);
              const canReplace = isReplacementAllowed(item);
              // const hasPendingRequest = hasPendingReturnRequest(item);

              // ✅ Correct hasPendingRequest function
              const hasPendingRequest = (item) => {
                if (!item?.refund) return false;
                
                const activeStatuses = ["pending", "qc_pending", "approved"];
                return activeStatuses.includes(item.refund.status);
              };

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0"
                >
                  <img
                    src={variant.images?.[0]?.url || item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full sm:w-24 h-32 object-cover rounded-lg mb-4 sm:mb-0"
                  />
                  <div className="sm:ml-5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {[
                            ...(item?.attributes || []),
                            ...variantAttributes,
                          ].map((attribute, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {attribute.key}: {attribute.value}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center">
                          <p className="text-gray-600">
                            ₹{variant.afterDiscountPrice} × {item.qty}
                          </p>
                          <p className="font-semibold ml-2">
                            ₹{variant.afterDiscountPrice * item.qty}
                          </p>
                        </div>

                        {console.log("item--->", item)}

                        {/* Return/Replacement Status */}

                        {item?.refund && (
                          <div className="mt-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                // Safe status access with fallback
                                (item.refund.status === "pending" &&
                                  "bg-yellow-100 text-yellow-800") ||
                                (item.refund.status === "approved" &&
                                  "bg-blue-100 text-blue-800") ||
                                (item.refund.status === "rejected" &&
                                  "bg-red-100 text-red-800") ||
                                (item.refund.status === "processed" &&
                                  "bg-green-100 text-green-800") ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {/* ✅ Completely safe approach */}
                              {(() => {
                                const type = item.refund.type || "return"; // Default to 'return'
                                const icon = type === "return" ? "↩️" : "🔄";
                                const formattedType =
                                  type.charAt(0).toUpperCase() + type.slice(1);
                                const status = item.refund.status || "pending";

                                return `${icon} ${formattedType} ${status}`;
                              })()}
                            </span>

                            {/* ✅ Safe reason display */}
                            {item.refund.reason && (
                              <p className="text-xs text-gray-600 mt-1">
                                Reason: {item.refund.reason}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 mt-3 sm:mt-0 sm:ml-4">
                        {data?.status === "Delivered" && (
                          <button
                            className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors min-w-[120px]"
                            onClick={() => {
                              setOpen(true);
                              setSelectedItem(item);
                            }}
                          >
                            <AiFillStar className="text-yellow-300" />
                            Write Review
                          </button>
                        )}

                        {/* Return/Replacement Actions */}
                        {isEligible && !hasPendingRequest(item) && (
                          <div className="flex gap-2">
                            <button
                              className="flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 transition-colors flex-1"
                              onClick={() => {
                                setSelectedItemId(item._id);
                                setReturnType("return");
                                setShowReturnModal(true);
                                setProductReturnReasons(
                                  item?.returnPolicy?.returnReason
                                );
                              }}
                            >
                              <BsArrowRepeat className="text-red-600" />
                              Return
                            </button>
                            {canReplace && (
                              <button
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors flex-1"
                                onClick={() => {
                                  setSelectedItemId(item._id);
                                  setReturnType("replacement");
                                  setShowReplacementModal(true);
                                  setProductReturnReasons(
                                    item?.returnPolicy?.returnReason
                                  );
                                }}
                              >
                                <TbReplace className="text-blue-600" />
                                Replace
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Payment & Shipping Section */}
        {activeTab === "payment" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BsTruck className="w-5 h-5 mr-2 text-gray-500" />
                Shipping Address
              </h3>
              <div className="text-gray-700">
                <p className="font-medium">{data?.shippingAddress?.address1}</p>
                {data?.shippingAddress?.address2 && (
                  <p>{data?.shippingAddress?.address2}</p>
                )}
                <p>
                  {data?.shippingAddress?.city},{" "}
                  {data?.shippingAddress?.country}
                </p>
                <p className="mt-2">Phone: {data?.user?.phoneNumber}</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                Payment Information
              </h3>
              <div className="text-gray-700 mb-4">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {data?.paymentInfo?.status || "Not Paid"}
                </p>
                <p>
                  <span className="font-medium">Method:</span>{" "}
                  {data?.paymentInfo?.method || "Unknown"}
                </p>
              </div>

              {/* Return Eligibility Info */}
              {data?.status === "Delivered" && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
                  <p className="text-sm text-gray-600">
                    {data.cart.some(item => isItemReturnEligible(item, data)) 
                      ? "You can return or replace items within the return window"
                      : "Return period has ended for all items"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rest of the components remain the same... */}
        {/* Price Summary */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Price Details
          </h3>
          {/* ... price details code ... */}

                     {data?.cart?.map((item, index) => {
             const variant = item.currentVariant || item;
             return (
               <div key={index} className="space-y-3">
                 <div className="flex justify-between">
                   <span className="text-gray-600">Original Price</span>
                   <span className="font-medium">₹{variant?.originalPrice}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Discount</span>
                   <span className="text-green-600 font-medium">
                     {variant.discountType === "Flat" ? "-₹" : ""}
                     {variant?.discountAmount}
                     {variant.discountType === "Percent" ? "% Off" : ""}
                   </span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Coupon Discount</span>
                   <span className="text-green-600 font-medium">
                     {data?.couponAmount
                       ? `-₹${data.couponAmount}`
                       : "Not applied"}
                   </span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Delivery Charges</span>
                   <span className="font-medium">
                     {item?.shippingCost === 0
                       ? "Free"
                       : `₹${item.shippingCost}`}
                   </span>
                 </div>
                 <hr className="my-4" />
                 <div className="flex justify-between text-lg font-semibold">
                   <span>Total Amount</span>
                   <span>₹{data?.totalPrice}</span>
                 </div>
                 <div className="text-green-600 font-medium text-sm">
                   You saved ₹
                   {variant.originalPrice - variant.afterDiscountPrice} on this
                   order
                 </div>
               </div>
             );
           })}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#"
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </a>
            <Link
              to="/faq"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowReturnModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <RxCross1 size={20} />
            </button>
            <div className="flex items-center mb-4">
              <BsArrowRepeat className="text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Return Item
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Please select the reason for returning this item. We'll process your refund once we receive the item.
            </p>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
            >
              <option value="">Choose a return reason</option>
              {productReturnReasons.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={() => setShowReturnModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                onClick={() => handleReturnRequest(selectedItemId, "return", returnReason)}
                disabled={!returnReason || loading}
              >
                {loading ? "Processing..." : "Request Return"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replacement Modal */}
      {showReplacementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowReplacementModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <RxCross1 size={20} />
            </button>
            <div className="flex items-center mb-4">
              <TbReplace className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Replace Item
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Please select the reason for replacement. We'll ship a new item once we receive the returned one.
            </p>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={replacementReason}
              onChange={(e) => setReplacementReason(e.target.value)}
            >
              <option value="">Choose a replacement reason</option>
              {productReturnReasons.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={() => setShowReplacementModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                onClick={() => handleReturnRequest(selectedItemId, "replacement", replacementReason)}
                disabled={!replacementReason || loading}
              >
                {loading ? "Processing..." : "Request Replacement"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Popup */}
      <ReviewPopup
        loading={loading}
        open={open}
        setOpen={setOpen}
        reviewHandler={reviewHandler}
        selectedItem={selectedItem}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default UserOrderDetails;