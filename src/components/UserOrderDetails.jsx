import React, { useEffect, useMemo, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const UserOrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1);
    const [returnReason, setReturnReason] = useState('');
    const [showReturnModal, setShowReturnModal] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user?._id));
    }, [dispatch, user?._id]);

    const data = useMemo(() => orders?.find((item) => item?._id === id), [orders, id]);
   

    const reviewHandler = async (e) => {
        await axios
            .put(
                `${server}/product/create-new-review`,
                {
                    user,
                    rating,
                    comment,
                    productId: selectedItem?._id,
                    orderId: id,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success(res.data.message);
                dispatch(getAllOrdersOfUser(user._id));
                setComment("");
                setRating(null);
                setOpen(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const refundHandler = async () => {

        await axios.put(`${server}/order/order-refund/${id}`, {
            status: "Processing refund", returnReason: returnReason
        }).then((res) => {
            toast.success(res.data.message);
            dispatch(getAllOrdersOfUser(user._id));
            socketId.emit("notification", {
                title: "New return request" ,
                content: `Refund request for Order ${id}`,
                image: data?.cart[0]?.images[0]?.url,
                users: [{ userId: data?.cart?.map((item)=>item?.shopId) }]
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
        await refundHandler(); // Existing function

        setShowReturnModal(false);
    };


    function formatMongoDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Adding the appropriate suffix to the day
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // For 11th, 12th, 13th, etc.
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
        const today = new Date();
        const delivery = new Date(deliveryDate);
        const diffTime = Math.abs(today - delivery);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    const status = data?.status
    const createdAt = data?.createdAt
    const outForDeliveryAt = data?.outForDeliveryAt
    const shippedAt = data?.shippedAt
    const deliveredAt = data?.deliveredAt

    const statuses = [
        { label: 'Order Confirmed', date: createdAt, key: 'Confirmed' },
        { label: 'Shipped', date: shippedAt, key: 'Shipped' },
        { label: 'Out For Delivery', date: outForDeliveryAt, key: 'Out for delivery' },
        { label: 'Delivery', date: deliveredAt, key: 'Delivered' },
    ];

    const getStatusDate = (date) => {
        return date ? new Date(date).toDateString() : 'Expected';
    };


    return (

        <div className={`py-4 min-h-screen ${styles.section}`}>
            {/* Header: Order Details */}
            <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <BsFillBagFill size={30} color="crimson" />
                    <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
                </div>
            </div>

            {/* Order Summary */}
            <div className="w-full flex items-center justify-between py-4 bg-gray-100 rounded-md p-2">
                <div>
                    <h5 className="text-[#00000084]">
                        Order ID: <span className="font-semibold">#{data?._id}</span>
                    </h5>
                    <h5 className="text-[#00000084]">
                        Placed on: <span className="font-semibold">{formatMongoDate(new Date(data?.createdAt))}</span>
                    </h5>
                </div>
                {/* <div>
                    <h5 className="text-[#00000084]">
                        Estimated Delivery: <span className="font-semibold">{data?.estimatedDelivery}</span>
                    </h5>
                </div> */}
            </div>



            {/* Order Status and Tracking */}


            <div className="w-full p-4 mt-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
                <div className="relative flex justify-between items-center w-full mt-4">
                    
                    <div className="absolute w-full h-1 bg-gray-300 top-10 left-0">
                        <div
                            className={`h-1 bg-green-500 transition-all duration-300`}
                            style={{ width: `${(statuses.findIndex((s) => s.key === status) + 1) * 25}%` }}
                        />
                    </div>

                    {statuses.map((item, index) => (
                        <div key={index} className="relative z-10 w-[24%] text-center">
                            <div
                                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-all duration-300 
                ${status === item.key || statuses.findIndex((s) => s.key === status) > index
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-500'
                                    }`}
                            >
                                {status === item.key || statuses.findIndex((s) => s.key === status) > index ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </div>
                            <p className="mt-3 font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-gray-400">{getStatusDate(item.date)}</p>
                        </div>
                    ))}
                </div>
            </div>



            {/* Order Items */}
            <h3 className="text-[22px] font-semibold py-4 text-slate-600">Items Ordered</h3>
            {data?.cart.map((item, index) => (
                <>

                    <div className="flex items-start border-b pb-4 mb-4" key={index}>
                        <img
                            src={item.images[0].url}
                            alt=""
                            className="w-[80px] h-[80px] object-cover rounded-md"
                        />
                        <div className="pl-4 w-full">
                            <h4 className="text-[16px] text-slate-700 font-semibold">{item?.name?.length > 30 ? item?.name?.slice(0, 30) + "..." : item?.name}</h4>
                            <p className="text-[#00000084] text-[16px]">
                                Price: <span className="text-green-600 font-semibold">₹{item.afterDiscountPrice}</span> x {item.qty}
                            </p>
                            <p className="text-[16px] font-semibold">Subtotal: ₹{item.afterDiscountPrice * item.qty}</p>
                            {
                                item?.attributes && item?.attributes?.map((attribute, index) => (
                                    <div key={index}>
                                        {attribute?.key === "Color" ? (
                                            <p
                                                style={{ backgroundColor: attribute?.value?.toLowerCase() }}
                                                className="px-2 py-1 w-fit rounded-md text-white">
                                                {attribute?.key} : {attribute?.value}
                                            </p>
                                        ) : (
                                            <p className="px-2 py-1 w-fit rounded-md bg-gray-200">
                                                {attribute?.key} : {attribute?.value}
                                            </p>
                                        )}
                                    </div>
                                ))
                            }
                        </div>

                    </div>



                    {!item.isReviewed && data?.status === "Delivered" ? (
                        <div
                            className={`${styles.button} !py-0 text-[#fff]`}
                            onClick={() => setOpen(true) || setSelectedItem(item)}
                        >
                            Write a Review
                        </div>
                    ) : null}
                </>

            ))}

            {/* Review Popup */}
            {open && (
                <div className="w-full fixed top-2 md:top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
                    <div className="md:w-[50%] w-[90%] h-min bg-white shadow-lg rounded-md p-4">
                        <div className="flex justify-end">
                            <RxCross1
                                size={30}
                                onClick={() => setOpen(false)}
                                className="cursor-pointer"
                            />
                        </div>
                        <h2 className="text-[24px] font-semibold text-center">Give a Review</h2>
                        <div className="w-full flex mt-4">
                            <img src={`${backend_url}${selectedItem?.images[0].url}`} alt="" className="w-[80px] h-[80px]" />
                            <div className="pl-3">
                                <div className="text-[20px]">{selectedItem?.name}</div>
                                <h4 className="text-[20px] text-green-600">
                                    ₹{selectedItem?.discountPrice} x {selectedItem?.qty}
                                </h4>
                            </div>
                        </div>
                        {/* Rating & Comment Section */}
                        <div className="mt-4">
                            <h5 className="text-[18px] font-semibold">Rating</h5>
                            <div className="flex mt-2">
                                {[1, 2, 3, 4, 5].map((i) =>
                                    rating >= i ? (
                                        <AiFillStar
                                            key={i}
                                            className="mr-1 cursor-pointer"
                                            color="rgb(54,206,16)"
                                            size={25}
                                            onClick={() => setRating(i)}
                                        />
                                    ) : (
                                        <AiOutlineStar
                                            key={i}
                                            className="mr-1 cursor-pointer"
                                            color="rgb(246,186,0)"
                                            size={25}
                                            onClick={() => setRating(i)}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-[16px] font-semibold">Write a Comment (optional)</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts"
                                className="w-full mt-2 p-2 border rounded-md outline-none"
                                rows="5"
                            />
                        </div>
                        <div
                            className={`${styles.button} text-white text-[20px] mt-4`}
                            onClick={rating > 1 ? reviewHandler : null}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            )}


            {
                data?.cart.map((item, index) => (
                    <>
                        
                        <div className="mb-2 mt-2" key={index} >
                            <h1 className="text-gray-700 text-xl font-medium">Price Details</h1>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-700 font-medium">Original price</p>
                            <p className="text-gray-700 font-medium">₹{item?.originalPrice}</p>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-700 font-medium">Discount</p>
                            <p className="text-green-700 font-medium">{item.dicountType === "Amount" && "-₹"} {item?.discountAmount}{item?.dicountType === "Percent" && "% Off"}</p>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-600 font-medium">Applied Cupon</p>
                            <p className="text-gray-600 font-medium">{data?.couponAmount === undefined || 0 ? "Not applied" : "-₹" + data?.couponAmount}</p>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-600 font-medium">Delivery charges</p>
                            <h1 className="text-gray-600 font-medium flex items-center gap-2">
                                {item?.shippingCost === 0 ? <span className="text-green-600">Free</span> : "₹" + item?.shippingCost}
                            </h1>
                        </div>

                        <hr className="mt-4" />

                        <div className="flex justify-between items-center my-4">
                            <p className="text-gray-900 font-medium">Total Amount</p>
                            <p className="text-gray-900 font-medium">₹{data?.totalPrice}</p>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <p className="text-green-700 font-medium">You will save ₹{item.originalPrice - item.afterDiscountPrice} on this order.</p>
                        </div>
                    </>
                ))
            }



            {/* Shipping and Payment Information */}
            <div className="w-full flex flex-wrap justify-between py-4">
                <div className="w-full md:w-[60%] bg-gray-100 rounded-md p-2">
                    <h4 className="text-[20px] font-semibold">Shipping Address:</h4>
                    <p>{`${data?.shippingAddress?.address1}`}</p>
                    <p>{data?.shippingAddress?.address2}</p>
                    <p>{data?.shippingAddress?.city}</p>
                    <p>{data?.shippingAddress?.country}</p>

                    <p>{`Phone: ${data?.user?.phoneNumber}`}</p>
                </div>
                <div className="w-full md:w-[35%] mt-3 bg-gray-100 rounded-md p-2">
                    <h4 className="text-[20px] font-semibold">Payment Info:</h4>
                    <p>Status: {data?.paymentInfo?.status || "Not Paid"}</p>
                    <p>Payment Method: {data?.paymentInfo?.type || "Unknown"}</p>
                    {data?.status === "Delivered" && isReturnEligible(data?.deliveredAt) && (
                        <div
                            className={`bg-red-500 text-white flex justify-center items-center  py-2 px-6 rounded-lg text-lg font-medium hover:bg-red-600 transition-all mt-4`}
                            onClick={() => setShowReturnModal(true)}
                        >
                            Return
                        </div>
                    )}

                    {showReturnModal && (
                        <div className="modal-container">
                            <div className="modal-content relative">
                                <RxCross1 size={20} className="absolute right-4 top-2 cursor-pointer" onClick={() => setShowReturnModal(false)} />
                                <h2 className="text-xl font-semibold text-center mb-4">Choose a Return Reason</h2>
                                <select
                                    className="w-full border border-gray-300 rounded p-2 mb-4"
                                    value={returnReason}
                                    onChange={(e) => setReturnReason(e.target.value)}
                                >
                                    <option value="">Select a reason</option>
                                    <option value="Damaged item">Damaged item</option>
                                    <option value="Wrong item received">Wrong item received</option>
                                    <option value="Quality not satisfactory">Quality not satisfactory</option>
                                    <option value="Brand not match">Brand not match</option>
                                    <option value="Product not match as per image">Product not match as per image</option>
                                    <option value="Find an better deal">Find an better deal</option>
                                    <option value="To much late delivery date">To much late delivery date</option>
                                </select>
                                <button
                                    className="bg-green-500 text-white py-2 px-6 rounded-lg w-full text-lg font-medium hover:bg-green-600 transition-all"
                                    onClick={handleReturn}
                                >
                                    Confirm Return
                                </button>
                            </div>
                        </div>
                    )}


                    {!isReturnEligible(data?.deliveredAt) && data?.status === "Delivered" && (
                        <p className="text-red-500 text-sm">Return period expired</p>
                    )}

                    {data?.status === "Delivered" && (
                        <div className="text-center bg-green-100 text-green-600 py-2 rounded-lg mt-4">
                            Your product Delivered on {formatMongoDate(new Date(data?.deliveredAt))}.
                        </div>
                    )}

                    {data?.status === "Processing refund" && (
                        <div className="text-center bg-yellow-100 text-yellow-600 py-2 rounded-lg mt-4">
                            Your return request accepted on {formatMongoDate(new Date(data?.returnRequestedAt))}.
                        </div>
                    )}

                    {data?.status === "Refund Success" && (
                        <div className="text-center bg-yellow-100 text-yellow-600 py-2 rounded-lg mt-4">
                            Refund Success 
                        </div>
                    )}

                    {data?.status === "Rejected" && (
                        <div className="text-center bg-yellow-100 text-yellow-600 py-2 rounded-lg mt-4">
                            Refund rejected
                        </div>
                    )}
                   


                </div>


            </div>



            {/* Help Section */}
            <div className="w-full py-6 mt-4 bg-gray-100 rounded-md text-center p-2">
                <h4 className="text-[20px] font-semibold">Need Help?</h4>
                <p>If you have any issues, feel free to <span className="text-blue-600 cursor-pointer">Contact Support</span> or view our <span className="text-blue-600 cursor-pointer"><Link to={"/faq"}>FAQs</Link></span>.</p>
            </div>
        </div>

    );
};

export default UserOrderDetails;


