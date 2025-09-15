// import React, { useEffect, useMemo, useState } from "react";
// import { BsFillBagFill } from "react-icons/bs";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "../styles/styles";
// import { getAllOrdersOfUser } from "../redux/actions/order";
// import { backend_url, server } from "../server";
// import { RxCross1 } from "react-icons/rx";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import axios from "axios";
// import { toast } from "react-toastify";
// import socketIO from "socket.io-client";
// import ReviewPopup from "./Review/ReviewPopup";

// const ENDPOINT = "http://localhost:4000";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


// const UserOrderDetails = () => {
//     const { orders } = useSelector((state) => state.order);
//     const { user } = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);
//     const [comment, setComment] = useState("");
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [rating, setRating] = useState(1);
//     const [returnReason, setReturnReason] = useState('');
//     const [showReturnModal, setShowReturnModal] = useState(false);
//      const [images, setImages] = useState([]);
//      const [loading, setLoading] = useState(false);

//     const { id } = useParams();

//     useEffect(() => {
//         dispatch(getAllOrdersOfUser(user?._id));
//     }, [dispatch, user?._id]);

//     const data = useMemo(() => orders?.find((item) => item?._id === id), [orders, id]);

//     console.log("data--", data)
   

//     const reviewHandler = async (e) => {
//         //if (loading) return; // Prevent multiple submissions
    
//         const formData = new FormData();
//         formData.append("rating", rating);
//         formData.append("comment", comment);
//         formData.append("productId", selectedItem?._id);
//         formData.append("orderId", id);
    
//         // Append images if available
//         if (images && images.length > 0) {
//             images.forEach((image) => formData.append("images", image));
//         }
    
//         setLoading(true); // Start loading
    
//         try {
//             const res = await axios.put(`${server}/product/create-new-review`, formData, {
//                 withCredentials: true,
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
    
//             toast.success(res.data.message);
//             dispatch(getAllOrdersOfUser(user._id));
    
//             // Reset fields after successful submission
//             setComment("");
//             setRating(null);
//             setImages([]);
//             setOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to submit review");
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };
    

//     const refundHandler = async () => {

//         await axios.put(`${server}/order/order-refund/${id}`, {
//             status: "Processing refund", returnReason: returnReason
//         }).then((res) => {
//             toast.success(res.data.message);
//             dispatch(getAllOrdersOfUser(user._id));
//             socketId.emit("notification", {
//                 title: "New return request" ,
//                 content: `Refund request for Order ${id}`,
//                 image: data?.cart[0]?.images[0]?.url,
//                 users: [{ userId: data?.cart?.map((item)=>item?.shopId) }]
//             });
//         }).catch((error) => {
//             toast.error(error?.response?.data?.message);
//         })
//     };


//     const handleReturn = async () => {
//         if (!returnReason) {
//             toast.error("Please select a return reason");
//             return;
//         }
//         await refundHandler(); // Existing function

//         setShowReturnModal(false);
//     };


//     function formatMongoDate(date) {
//         const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//         const day = date.getDate();
//         const month = months[date.getMonth()];
//         const year = date.getFullYear();

//         // Adding the appropriate suffix to the day
//         const daySuffix = (day) => {
//             if (day > 3 && day < 21) return 'th'; // For 11th, 12th, 13th, etc.
//             switch (day % 10) {
//                 case 1: return 'st';
//                 case 2: return 'nd';
//                 case 3: return 'rd';
//                 default: return 'th';
//             }
//         };

//         return `${day}${daySuffix(day)} ${month}, ${year}`;
//     }

//     const isReturnEligible = (deliveryDate) => {
//         const today = new Date();
//         const delivery = new Date(deliveryDate);
//         const diffTime = Math.abs(today - delivery);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays <= 7;
//     };

//     const status = data?.status
//     const createdAt = data?.createdAt
//     const outForDeliveryAt = data?.outForDeliveryAt
//     const shippedAt = data?.shippedAt
//     const deliveredAt = data?.deliveredAt

//     const statuses = [
//         { label: 'Order Confirmed', date: createdAt, key: 'Confirmed' },
//         { label: 'Shipped', date: shippedAt, key: 'Shipped' },
//         { label: 'Out For Delivery', date: outForDeliveryAt, key: 'Out for delivery' },
//         { label: 'Delivery', date: deliveredAt, key: 'Delivered' },
//     ];

//     const getStatusDate = (date) => {
//         return date ? new Date(date).toDateString() : 'Expected';
//     };


//     return (
//       <div className={`py-4 min-h-screen ${styles.section}`}>
//         {/* Header: Order Details */}
//         <div className="w-full flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <BsFillBagFill size={30} color="crimson" />
//             <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="w-full flex items-center justify-between py-4 bg-gray-100 rounded-md p-2">
//           <div>
//             <h5 className="text-[#00000084]">
//               Order ID: <span className="font-semibold">#{data?._id}</span>
//             </h5>
//             <h5 className="text-[#00000084]">
//               Placed on:{" "}
//               <span className="font-semibold">
//                 {formatMongoDate(new Date(data?.createdAt))}
//               </span>
//             </h5>
//           </div>
//           {/* <div>
//                     <h5 className="text-[#00000084]">
//                         Estimated Delivery: <span className="font-semibold">{data?.estimatedDelivery}</span>
//                     </h5>
//                 </div> */}
//         </div>

//         {/* Order Status and Tracking */}

//         <div className="w-full p-2 mt-6 bg-white rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Order Status
//           </h3>
//           <div className="relative flex justify-between items-center w-full mt-4">
//             <div className="absolute w-full h-1 bg-gray-300 top-10 left-0">
//               <div
//                 className={`h-1 bg-green-500 transition-all duration-300`}
//                 style={{
//                   width: `${
//                     (statuses.findIndex((s) => s.key === status) + 1) * 25
//                   }%`,
//                 }}
//               />
//             </div>

//             {statuses.map((item, index) => (
//               <div key={index} className="relative z-10 w-[24%] text-center">
//                 <div
//                   className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-all duration-300 
//                                                 ${
//                                                   status === item.key ||
//                                                   statuses.findIndex(
//                                                     (s) => s.key === status
//                                                   ) > index
//                                                     ? "bg-green-500 text-white"
//                                                     : "bg-gray-300 text-gray-500"
//                                                 }`}
//                 >
//                   {status === item.key ||
//                   statuses.findIndex((s) => s.key === status) > index ? (
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   )}
//                 </div>
//                 <p className="mt-3 font-medium text-xs">{item.label}</p>
//                 <p className="text-xs text-gray-400">
//                   {getStatusDate(item.date)}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Order Items */}
//         <h3 className="text-[22px] font-semibold py-4 text-slate-600">
//           Items Ordered
//         </h3>

//         {data?.cart.map((item, index) => {
//           // Use currentVariant data if available
//           const variant = item.currentVariant || item;
//           const variantAttributes = variant?.attributes || [];

//           return (
//             <div className="flex items-start border-b pb-4 mb-4" key={index}>
//               <img
//                 src={variant.images?.[0]?.url || item.images?.[0]?.url}
//                 alt=""
//                 className="w-[100px] h-[130px] object-cover rounded-md"
//               />
//               <div className="pl-4 w-full">
//                 <h4 className="text-[16px] text-slate-700 font-semibold">
//                   {item?.name?.length > 30
//                     ? item?.name?.slice(0, 30) + "..."
//                     : item?.name}
//                 </h4>
//                 <p className="text-[#00000084] text-[16px]">
//                   Price:{" "}
//                   <span className="text-green-600 font-semibold">
//                     ₹{variant.afterDiscountPrice}
//                   </span>{" "}
//                   x {item.qty}
//                 </p>
//                 <p className="text-[16px] font-semibold">
//                   Subtotal: ₹{variant.afterDiscountPrice * item.qty}
//                 </p>

//                 {/* Render Attributes (Both for main item and variant) */}
//                 {[...(item?.attributes || []), ...variantAttributes].map(
//                   (attribute, idx) => (
//                     <div key={idx}>
//                       {attribute?.key === "Color" ? (
//                         <p
//                           style={{
//                             backgroundColor: attribute?.value?.toLowerCase(),
//                           }}
//                           className="px-2 py-1 w-fit rounded-md text-white"
//                         >
//                           {attribute?.key}: {attribute?.value}
//                         </p>
//                       ) : (
//                         <p className=" w-fit ">
//                           {attribute?.key}: {attribute?.value}
//                         </p>
//                       )}
//                     </div>
//                   )
//                 )}
//               </div>

//               { data?.status === "Delivered" && (
//                 <button
//                   className="relative flex items-center gap-2 px-5 py-2 text-white font-semibold rounded-full 
//         bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md 
//         hover:scale-105 transition-all duration-300"
//                   onClick={() => {
//                     setOpen(true);
//                     setSelectedItem(item);
//                   }}
//                 >
//                   <svg
//                     className="w-5 h-5 text-yellow-400"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M10 15l-5.878 3.09 1.123-6.545L1 7.236l6.564-.954L10 1l2.436 5.282L19 7.236l-4.245 4.309 1.123 6.545z"></path>
//                   </svg>
//                   Write a Review
//                 </button>
//               )}
//             </div>
//           );
//         })}

//         {/* Review Popup */}
//         {/* {open && (
//           <div className="w-full fixed top-2 md:top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
//             <div className="md:w-[50%] w-[90%] h-min bg-white shadow-lg rounded-md p-4">
//               <div className="flex justify-end">
//                 <RxCross1
//                   size={30}
//                   onClick={() => setOpen(false)}
//                   className="cursor-pointer"
//                 />
//               </div>
//               <h2 className="text-[24px] font-semibold text-center">
//                 Give a Review
//               </h2>
//               <div className="w-full flex mt-4">
//                 <img
//                   src={`${backend_url}${selectedItem?.images[0].url}`}
//                   alt=""
//                   className="w-[80px] h-[80px]"
//                 />
//                 <div className="pl-3">
//                   <div className="text-[20px]">{selectedItem?.name}</div>
//                   <h4 className="text-[20px] text-green-600">
//                     ₹{selectedItem?.discountPrice} x {selectedItem?.qty}
//                   </h4>
//                 </div>
//               </div>
              
//               <div className="mt-4">
//                 <h5 className="text-[18px] font-semibold">Rating</h5>
//                 <div className="flex mt-2">
//                   {[1, 2, 3, 4, 5].map((i) =>
//                     rating >= i ? (
//                       <AiFillStar
//                         key={i}
//                         className="mr-1 cursor-pointer"
//                         color="rgb(54,206,16)"
//                         size={25}
//                         onClick={() => setRating(i)}
//                       />
//                     ) : (
//                       <AiOutlineStar
//                         key={i}
//                         className="mr-1 cursor-pointer"
//                         color="rgb(246,186,0)"
//                         size={25}
//                         onClick={() => setRating(i)}
//                       />
//                     )
//                   )}
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <label className="block text-[16px] font-semibold">
//                   Write a Comment (optional)
//                 </label>
//                 <textarea
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   placeholder="Share your thoughts"
//                   className="w-full mt-2 p-2 border rounded-md outline-none"
//                   rows="5"
//                 />
//               </div>
//               <div
//                 className={`${styles.button} text-white text-[20px] mt-4`}
//                 onClick={rating > 1 ? reviewHandler : null}
//               >
//                 Submit
//               </div>
//             </div>
//           </div>
//         )} */}

//         <ReviewPopup loading={loading} open={open} setOpen={setOpen} reviewHandler={reviewHandler} selectedItem={selectedItem} rating={rating} setRating={setRating} comment={comment} setComment={setComment} images={images} setImages={setImages} />

//         {data?.cart.map((item, index) => {
//           // Use currentVariant data if available
//           const variant = item.currentVariant || item;

//           return (
//             <div key={index}>
//               <div className="mb-2 mt-2">
//                 <h1 className="text-gray-700 text-xl font-medium">
//                   Price Details
//                 </h1>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <p className="text-gray-700 font-medium">Original price</p>
//                 <p className="text-gray-700 font-medium">
//                   ₹{variant?.originalPrice}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <p className="text-gray-700 font-medium">Discount</p>
//                 <p className="text-green-700 font-medium">
//                   {variant.discountType === "Flat" && "-₹"}{" "}
//                   {variant?.discountAmount}
//                   {variant?.dicountType === "Percent" && "% Off"}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <p className="text-gray-600 font-medium">Applied Coupon</p>
//                 <p className="text-gray-600 font-medium">
//                   {data?.couponAmount === undefined || data?.couponAmount === 0
//                     ? "Not applied"
//                     : "-₹" + data?.couponAmount}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <p className="text-gray-600 font-medium">Delivery charges</p>
//                 <h1 className="text-gray-600 font-medium flex items-center gap-2">
//                   {item?.shippingCost === 0 ? (
//                     <span className="text-green-600">Free</span>
//                   ) : (
//                     "₹" + item?.shippingCost
//                   )}
//                 </h1>
//               </div>

//               <hr className="mt-4" />

//               <div className="flex justify-between items-center my-4">
//                 <p className="text-gray-900 font-medium">Total Amount</p>
//                 <p className="text-gray-900 font-medium">₹{data?.totalPrice}</p>
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-green-700 font-medium">
//                   You will save ₹
//                   {variant.originalPrice - variant.afterDiscountPrice} on this
//                   order.
//                 </p>
//               </div>
//             </div>
//           );
//         })}

//         {/* Shipping and Payment Information */}
//         <div className="w-full flex flex-wrap justify-between py-4">
//           <div className="w-full md:w-[60%] bg-gray-100 rounded-md p-2">
//             <h4 className="text-[20px] font-semibold">Shipping Address:</h4>
//             <p>{`${data?.shippingAddress?.address1}`}</p>
//             <p>{data?.shippingAddress?.address2}</p>
//             <p>{data?.shippingAddress?.city}</p>
//             <p>{data?.shippingAddress?.country}</p>

//             <p>{`Phone: ${data?.user?.phoneNumber}`}</p>
//           </div>
//           <div className="w-full md:w-[35%] mt-3 bg-gray-100 rounded-md p-2">
//             <h4 className="text-[20px] font-semibold">Payment Info:</h4>
//             <p>Status: {data?.paymentInfo?.status || "Not Paid"}</p>
//             <p>Payment Method: {data?.paymentInfo?.type || "Unknown"}</p>
//             {data?.status === "Delivered" &&
//               isReturnEligible(data?.deliveredAt) && (
//                 <div
//                   className={`bg-red-500 text-white flex justify-center items-center  py-2 px-6 rounded-lg text-lg font-medium hover:bg-red-600 transition-all mt-4`}
//                   onClick={() => setShowReturnModal(true)}
//                 >
//                   Return
//                 </div>
//               )}

//             {showReturnModal && (
//               <div className="modal-container">
//                 <div className="modal-content relative">
//                   <RxCross1
//                     size={20}
//                     className="absolute right-4 top-2 cursor-pointer"
//                     onClick={() => setShowReturnModal(false)}
//                   />
//                   <h2 className="text-xl font-semibold text-center mb-4">
//                     Choose a Return Reason
//                   </h2>
//                   <select
//                     className="w-full border border-gray-300 rounded p-2 mb-4"
//                     value={returnReason}
//                     onChange={(e) => setReturnReason(e.target.value)}
//                   >
//                     <option value="">Select a reason</option>
//                     <option value="Damaged item">Damaged item</option>
//                     <option value="Wrong item received">
//                       Wrong item received
//                     </option>
//                     <option value="Quality not satisfactory">
//                       Quality not satisfactory
//                     </option>
//                     <option value="Brand not match">Brand not match</option>
//                     <option value="Product not match as per image">
//                       Product not match as per image
//                     </option>
//                     <option value="Find an better deal">
//                       Find an better deal
//                     </option>
//                     <option value="To much late delivery date">
//                       To much late delivery date
//                     </option>
//                   </select>
//                   <button
//                     className="bg-green-500 text-white py-2 px-6 rounded-lg w-full text-lg font-medium hover:bg-green-600 transition-all"
//                     onClick={handleReturn}
//                   >
//                     Confirm Return
//                   </button>
//                 </div>
//               </div>
//             )}

//             {!isReturnEligible(data?.deliveredAt) &&
//               data?.status === "Delivered" && (
//                 <p className="text-red-500 text-sm">Return period expired</p>
//               )}

//             {data?.status === "Delivered" && (
//               <div className="text-center bg-green-100 text-green-600 py-2 rounded-lg mt-4">
//                 Your product Delivered on{" "}
//                 {formatMongoDate(new Date(data?.deliveredAt))}.
//               </div>
//             )}

//             {data?.status === "Processing refund" && (
//               <div className="text-center bg-yellow-100 text-yellow-600 py-2 rounded-lg mt-4">
//                 Your return request accepted on{" "}
//                 {formatMongoDate(new Date(data?.returnRequestedAt))}.
//               </div>
//             )}

//             {data?.status === "Refund Success" && (
//               <div className="text-center bg-yellow-100 text-yellow-600 py-2 rounded-lg mt-4">
//                 Refund Success
//               </div>
//             )}

//             {data?.status === "Rejected" && (
//               <div className="text-center bg-yellow-100 text-yellow-600 py-2 rounded-lg mt-4">
//                 Refund rejected
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Help Section */}
//         <div className="w-full py-6 mt-4 bg-gray-100 rounded-md text-center p-2">
//           <h4 className="text-[20px] font-semibold">Need Help?</h4>
//           <p>
//             If you have any issues, feel free to{" "}
//             <span className="text-blue-600 cursor-pointer">
//               Contact Support
//             </span>{" "}
//             or view our{" "}
//             <span className="text-blue-600 cursor-pointer">
//               <Link to={"/faq"}>FAQs</Link>
//             </span>
//             .
//           </p>
//         </div>
//       </div>
//     );
// };

// export default UserOrderDetails;




import React, { useEffect, useMemo, useState } from "react";
import { BsFillBagFill, BsArrowLeft } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
    const [returnReason, setReturnReason] = useState('');
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("items");

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user?._id));
    }, [dispatch, user?._id]);

    const data = useMemo(() => orders?.find((item) => item?._id === id), [orders, id]);

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
            const res = await axios.put(`${server}/product/create-new-review`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

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

    const refundHandler = async () => {
        await axios.put(`${server}/order/order-refund/${id}`, {
            status: "Processing refund", returnReason: returnReason
        }).then((res) => {
            toast.success(res.data.message);
            dispatch(getAllOrdersOfUser(user._id));
            socketId.emit("notification", {
                title: "New return request",
                content: `Refund request for Order ${id}`,
                image: data?.cart[0]?.images[0]?.url,
                users: [{ userId: data?.cart?.map((item) => item?.shopId) }]
            });
        }).catch((error) => {
            toast.error(error?.response?.data?.message);
        })
    };

    const handleReturn = async () => {
        if (!returnReason) {
            toast.error("Please select a return reason");
            return;
        }
        await refundHandler();
        setShowReturnModal(false);
    };

    function formatMongoDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        
        return `${day}${daySuffix(day)} ${month}, ${year}`;
    }

    const isReturnEligible = (deliveryDate) => {
        if (!deliveryDate) return false;
        const today = new Date();
        const delivery = new Date(deliveryDate);
        const diffTime = Math.abs(today - delivery);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    const status = data?.status;
    const createdAt = data?.createdAt;
    const outForDeliveryAt = data?.outForDeliveryAt;
    const shippedAt = data?.shippedAt;
    const deliveredAt = data?.deliveredAt;

    const statuses = [
        { label: 'Order Confirmed', date: createdAt, key: 'Confirmed' },
        { label: 'Shipped', date: shippedAt, key: 'Shipped' },
        { label: 'Out For Delivery', date: outForDeliveryAt, key: 'Out for delivery' },
        { label: 'Delivery', date: deliveredAt, key: 'Delivered' },
    ];

    const getStatusDate = (date) => {
        return date ? formatMongoDate(new Date(date)) : 'Pending';
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-purple-100 text-purple-800';
            case 'Processing refund': return 'bg-yellow-100 text-yellow-800';
            case 'Refund Success': return 'bg-teal-100 text-teal-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Delivered': return '✅';
            case 'Processing': return '🔄';
            case 'Shipped': return '🚚';
            case 'Processing refund': return '↩️';
            case 'Refund Success': return '💸';
            case 'Rejected': return '❌';
            default: return '📦';
        }
    };

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
                            <p className="font-semibold text-gray-900">#{data?._id?.slice(-8)}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <p className="text-gray-500 text-sm">Placed on</p>
                            <p className="font-semibold text-gray-900">{formatMongoDate(new Date(data?.createdAt))}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                                {getStatusIcon(status)} <span className="ml-1">{status}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`py-3 px-4 font-medium text-sm ${activeTab === "items" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("items")}
                    >
                        Order Items
                    </button>
                    <button
                        className={`py-3 px-4 font-medium text-sm ${activeTab === "status" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("status")}
                    >
                        Order Status
                    </button>
                    <button
                        className={`py-3 px-4 font-medium text-sm ${activeTab === "payment" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("payment")}
                    >
                        Payment & Shipping
                    </button>
                </div>

                {/* Order Status Section */}
                {activeTab === "status" && (
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
                        <div className="relative">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                            {statuses.map((item, index) => (
                                <div key={index} className="relative pl-10 pb-6 last:pb-0">
                                    <div className={`absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 
                                        ${status === item.key || statuses.findIndex(s => s.key === status) > index 
                                            ? "bg-blue-600 text-white" 
                                            : "bg-gray-200 text-gray-500"}`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{getStatusDate(item.date)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Order Items Section */}
                {activeTab === "items" && (
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
                        {data?.cart?.map((item, index) => {
                            const variant = item.currentVariant || item;
                            const variantAttributes = variant?.attributes || [];

                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-start border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0">
                                    <img
                                        src={variant.images?.[0]?.url || item.images?.[0]?.url}
                                        alt={item.name}
                                        className="w-full sm:w-24 h-32 object-cover rounded-lg mb-4 sm:mb-0"
                                    />
                                    <div className="sm:ml-5 flex-1">
                                        <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {[...(item?.attributes || []), ...variantAttributes].map((attribute, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {attribute.key}: {attribute.value}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-600">₹{variant.afterDiscountPrice} × {item.qty}</p>
                                                <p className="font-semibold">₹{variant.afterDiscountPrice * item.qty}</p>
                                            </div>
                                            {data?.status === "Delivered" && (
                                                <button
                                                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setSelectedItem(item);
                                                    }}
                                                >
                                                    <AiFillStar className="text-yellow-300" />
                                                    Write Review
                                                </button>
                                            )}
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
                                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Shipping Address
                            </h3>
                            <div className="text-gray-700">
                                <p className="font-medium">{data?.shippingAddress?.address1}</p>
                                {data?.shippingAddress?.address2 && <p>{data?.shippingAddress?.address2}</p>}
                                <p>{data?.shippingAddress?.city}, {data?.shippingAddress?.country}</p>
                                <p className="mt-2">Phone: {data?.user?.phoneNumber}</p>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                                Payment Information
                            </h3>
                            <div className="text-gray-700 mb-4">
                                <p><span className="font-medium">Status:</span> {data?.paymentInfo?.status || "Not Paid"}</p>
                                <p><span className="font-medium">Method:</span> {data?.paymentInfo?.type || "Unknown"}</p>
                            </div>

                            {/* Return Button */}
                            {data?.status === "Delivered" && isReturnEligible(data?.deliveredAt) && (
                                <button
                                    className="w-full py-2 px-4 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
                                    onClick={() => setShowReturnModal(true)}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                    Return Item
                                </button>
                            )}

                            {/* Status Messages */}
                            {!isReturnEligible(data?.deliveredAt) && data?.status === "Delivered" && (
                                <p className="text-sm text-red-500 mt-2">Return period has expired</p>
                            )}

                            {data?.status === "Delivered" && (
                                <p className="text-sm text-green-600 mt-2 bg-green-50 p-2 rounded">
                                    Delivered on {formatMongoDate(new Date(data?.deliveredAt))}
                                </p>
                            )}

                            {data?.status === "Processing refund" && (
                                <p className="text-sm text-yellow-600 mt-2 bg-yellow-50 p-2 rounded">
                                    Return requested on {formatMongoDate(new Date(data?.returnRequestedAt))}
                                </p>
                            )}

                            {data?.status === "Refund Success" && (
                                <p className="text-sm text-teal-600 mt-2 bg-teal-50 p-2 rounded">
                                    Refund successfully processed
                                </p>
                            )}

                            {data?.status === "Rejected" && (
                                <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                                    Refund request was rejected
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Price Summary */}
                <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h3>
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
                                        {variant.discountType === "Flat" ? "-₹" : ""}{variant?.discountAmount}
                                        {variant.discountType === "Percent" ? "% Off" : ""}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Coupon Discount</span>
                                    <span className="text-green-600 font-medium">
                                        {data?.couponAmount ? `-₹${data.couponAmount}` : "Not applied"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Charges</span>
                                    <span className="font-medium">
                                        {item?.shippingCost === 0 ? "Free" : `₹${item.shippingCost}`}
                                    </span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total Amount</span>
                                    <span>₹{data?.totalPrice}</span>
                                </div>
                                <div className="text-green-600 font-medium text-sm">
                                    You saved ₹{variant.originalPrice - variant.afterDiscountPrice} on this order
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Help Section */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-gray-600 mb-4">If you have any questions about your order, we're here to help.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a href="#" className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors">
                            Contact Support
                        </a>
                        <Link to="/faq" className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors">
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
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Return Reason</h2>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                        >
                            <option value="">Choose a reason</option>
                            <option value="Damaged item">Damaged item</option>
                            <option value="Wrong item received">Wrong item received</option>
                            <option value="Quality not satisfactory">Quality not satisfactory</option>
                            <option value="Brand not match">Brand not match</option>
                            <option value="Product not match as per image">Product not match as per image</option>
                            <option value="Find an better deal">Found a better deal</option>
                            <option value="To much late delivery date">Late delivery</option>
                        </select>
                        <div className="flex gap-3">
                            <button
                                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                onClick={() => setShowReturnModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                onClick={handleReturn}
                            >
                                Confirm Return
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