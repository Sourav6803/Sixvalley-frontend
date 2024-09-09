import React, { useEffect, useState } from "react";
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

const UserOrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1);


    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user?._id));
    }, [dispatch, user?._id]);

    const data = orders && orders.find((item) => item?._id === id);
   

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
            status: "Processing refund"
        }).then((res) => {
            toast.success(res.data.message);
            dispatch(getAllOrdersOfUser(user._id));
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
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

    const statuses = ['Ordered', 'Shipped', 'Out for delivery', 'Delivered']


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
            <div className="w-full py-6 mt-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl text-slate-800 font-semibold border-b pb-3">Order Status</h3>
                <div className="flex justify-between items-center w-full mt-4 relative">
                    {/* Progress Line */}
                    <div className="absolute w-full h-1 bg-gray-200 left-0 top-10 z-0">
                        <div className={`h-1 bg-green-600`} style={{ width: `${(statuses.indexOf(data?.status) + 1) * 25}%` }}></div>
                    </div>
                    {/* Status icons and labels */}
                    {['Ordered', 'Shipped', 'Out for delivery', 'Delivered'].map((status, i) => (
                        <div key={i} className="relative z-10 w-[24%] text-center">
                            <div
                                className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full transition-all duration-300 
                    ${data?.status === status || statuses.indexOf(data?.status) > i
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-300 text-gray-500'
                                    }`}
                            >
                                {/* Use appropriate icons */}
                                {data?.status === status || statuses.indexOf(data?.status) > i ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </div>
                            <p className={`mt-3 font-medium text-sm ${data?.status === status ? 'text-green-600 font-bold' : 'text-gray-500'}`}>{status}</p>
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
                <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
                    <div className="w-[50%] h-min bg-white shadow-lg rounded-md p-4">
                        <div className="flex justify-end">
                            <RxCross1
                                size={30}
                                onClick={() => setOpen(false)}
                                className="cursor-pointer"
                            />
                        </div>
                        <h2 className="text-[24px] font-semibold text-center">Give a Review</h2>
                        <div className="w-full flex mt-4">
                            <img src={`${backend_url}${selectedItem?.images[0]}`} alt="" className="w-[80px] h-[80px]" />
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
                    { console.log(item)}
                        <div className="mb-2 mt-2" >
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
                    {data?.status === "Delivered" && (
                        <div
                            className={`${styles.button} text-white mt-2`}
                            onClick={refundHandler}
                        >
                            Request Refund
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
