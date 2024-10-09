
import React, { useEffect } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import {  server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles"; // Ensure the styles are updated accordingly
import socketIO from "socket.io-client";
import { formatMongoDate, formatTime } from "../../utils/common-utils";


const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const RefundDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (seller?._id) {
            dispatch(getAllOrdersOfShop(seller?._id));
        }
    }, [dispatch, seller?._id]);

    const data = orders?.find((item) => item._id === id);

    const refundOrderUpdateHandler = async (status) => {
        try {
            await axios.put(`${server}/order/order-refund-success/${id}`, { status }, { withCredentials: true });
            toast.success("Refund approved successfully!");
            dispatch(getAllOrdersOfShop(seller?._id));

            const getNotificationDetails = (status) => {
                switch (status) {
                    case "Refund Success":
                        return {
                            title: "Your Retuen Approved",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} has been approved. It will reach you soon!`,
                            image: data?.cart[0]?.images[0]?.url || "/default-shipped-image.jpg", // Replace with a default image if none is available
                        };
                    case "Rejected":
                        return {
                            title: "Your return rejected",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} rejected. `,
                            image: data?.cart[0]?.images[0]?.url || "/default-out-for-delivery-image.jpg",
                        };
                    default:
                        return {
                            title: "Order Status Updated",
                            content: `The status of your order with ID #${data?._id?.slice(0, 8)} has been updated to "${status}".`,
                            image: data?.cart[0]?.images[0]?.url || "/default-status-updated-image.jpg",
                        };
                }
            };

            // Get the notification details based on the new order status
            const { title, content, image } = getNotificationDetails(status);

            // Emit the notification using Socket.IO
            socketId.emit("notification", {
                title,
                content,
                image
            });

            // Redirect to the orders page
            navigate("/dashboard-orders");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update refund status");
        }
    };

    return (
        <div className={`p-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                    <BsFillBagFill size={25} color="crimson" />
                    <h1 className="pl-3 text-[20px] text-slate-700 font-semibold">Order Details</h1>
                </div>
                <Link to="/dashboard-orders">
                    <button className={` bg-pink-100 text-pink-600 h-[40px] text-[18px] px-5 rounded-md`}>
                        Back to Orders
                    </button>
                </Link>
            </div>

            <div className="w-full py-4 flex flex-col space-y-4">
                <div className="flex flex-col">
                    <h5 className="text-gray-500">Order ID: <span className="font-semibold">#{data?._id}</span></h5>
                    <h5 className="text-gray-500">Placed on: <span className="font-semibold">{formatMongoDate(new Date(data?.createdAt))} {formatTime(data?.createdAt)}</span></h5>
                    <p className="text-gray-500">Order Status : <span className={`${data?.status === "Processing refund" || "Approved" || "Refund Success" ? 'text-pink-600 font-bold' : "text-gray-500"}`}>{data?.status}</span></p>
                </div>

                <div className="lg:w-1/3 bg-slate-50 p-2 rounded-md">
                    <h4 className="font-semibold text-lg">Payment Info</h4>
                    <p className="text-gray-500">Method : {data?.paymentInfo?.type || "Not Paid"}</p>
                    <p className="text-gray-500">Payment Status : <span className={`${data?.paymentInfo?.status === "Succeeded" ? 'text-green-600 font-bold' : 'text-red-400 font-semibold'}`}>{data?.paymentInfo?.status || "Not Paid"}</span></p>

                </div>

                {data?.deliveredAt && (
                    <div className="text-center bg-green-100 text-green-700 py-2 rounded-lg mt-4 font-semibold">
                        Your product Delivered on {formatMongoDate(new Date(data?.deliveredAt))}.
                    </div>
                )}

                {data?.returnRequestedAt && (
                    <div className="text-center bg-yellow-100 text-yellow-700 py-2 rounded-lg mt-4 font-semibold">
                        Your return request accepted on {formatMongoDate(new Date(data?.returnRequestedAt))} {formatTime(data?.createdAt)}.
                    </div>
                )}

                {data?.returnRequestedAt && data.returnReason && (
                    <div className=" p-2 rounded-lg mt-4 border   ">
                        <h1 className="text-slate-900 text-xl font-bold">Refund reason by customer</h1>
                        <p className="text-slate-700 mt-3">{data?.returnReason}</p>
                    </div>
                )}

                {/* Order items */}
                <div className="bg-white shadow-sm rounded-lg p-4">
                    {data?.cart.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 mb-5">
                            <img src={item?.images[0]?.url} alt={item.name} className="w-[80px] h-[80px] object-cover rounded-lg" />
                            <div className="flex-1">
                                <h5 className="text-md text-slate-600 font-medium">{item?.name?.length > 50 ? item?.name?.slice(0, 50) : item?.name}</h5>
                                <p className="text-gray-500">₹{item.afterDiscountPrice} x {item.qty}</p>
                                {
                                    item?.attributes && item?.attributes?.map((attribute, index) => (
                                        <div key={index}>
                                            <p>{attribute?.key} : {attribute?.value}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <h1 className="font-bold text-xl text-slate-700">You have pay ₹{data?.totalPrice} rupees included shipping cost</h1>
                </div>

                {/* Shipping & Payment info */}
                <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0 ">

                    <div className="lg:w-2/3 bg-slate-50 p-2 rounded-md">

                        <h4 className="font-semibold text-lg ">Product Basic Info:</h4>
                        {
                            data?.cart?.map((product, index) => (
                                <div key={index}>
                                    <p className="text-gray-500">Brand :  {product?.brand}</p>
                                    <p className="text-gray-500">Category :  {product?.category}</p>
                                    <p className="text-gray-500">Sub category : {product?.subCategory}</p>
                                    <p className="text-gray-500">Product Type : {product?.productType}</p>
                                    <p className="text-gray-500">SKU :  {product?.sku}</p>
                                    <p className="text-gray-500">Unit : {product?.unit}</p>
                                </div>
                            ))
                        }

                    </div>

                    <div className="lg:w-2/3 bg-slate-50 p-2 rounded-md">

                        <h4 className="font-semibold text-lg ">Pricing Info:</h4>
                        {
                            data?.cart?.map((product) => (
                                <>
                                    <p className="text-gray-500">Original Price : ₹ {product?.originalPrice}</p>
                                    <p className="text-gray-500">Discount amount : {product?.dicountType === "Percent" ? product?.discountAmount + "% Off" : "₹ " + product?.discountAmount}</p>
                                    <p className="text-gray-500">After discount price : ₹ {product?.afterDiscountPrice}</p>
                                    <p className="text-gray-500">Delivery Charge : {product?.shippingCost === 0 ? "Free" : "₹" + product?.shippingCost}</p>
                                    <p className="text-gray-500">Coupon  : {data?.appliedCoupon === null ? "No coupon used" : data?.couponAmount}</p>
                                </>
                            ))
                        }

                    </div>

                    <div className="lg:w-2/3 bg-slate-50 p-2 rounded-md">

                        <h4 className="font-semibold text-lg ">Shipping Address:</h4>
                        <p className="text-gray-500">{data?.shippingAddress?.address1}</p>
                        <p className="text-gray-500"> {data?.shippingAddress?.address2}</p>
                        <p className="text-gray-500">{data?.shippingAddress?.city}, {data?.shippingAddress?.country}</p>
                        <p className="text-gray-500">Phone: {data?.user?.phoneNumber}</p>
                    </div>


                </div>

                {/* Total price */}
                <div className="text-right border-t pt-4">
                    <h5 className="text-lg font-medium">Total Price: ₹{data?.totalPrice}</h5>
                </div>

                {/* Order Status Update */}
                {/* <div>
                    <h4 className="font-semibold text-lg">Order Status:</h4>
                    {data?.status !== "Processing refund" && data?.status !== "Refund Success" ? (
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full max-w-xs border rounded-md p-2 mt-2"
                        >
                            {[
                                "Confirmed", "Packaging", "Shipped", "On the way",
                                "Out for delivery", "Delivered", "Canceled", "Failed to Deliver", "Returned"
                            ]
                                .slice(
                                    [
                                        "Confirmed", "Packaging", "Shipped", "On the way",
                                        "Out for delivery", "Delivered", "Canceled", "Failed to Deliver", "Returned"
                                    ].indexOf(data?.status)
                                )
                                .map((option, index) => (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    ) : (
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full max-w-xs border rounded-md p-2 mt-2"
                        >
                            {["Processing refund", "Approved", "Refund Success", "Rejected"]
                                .slice(
                                    ["Processing refund", "Approved", "Refund Success", "Rejected"].indexOf(data?.status)
                                )
                                .map((option, index) => (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    )}
                </div> */}


                <div className="flex gap-4 mt-2">
                    <button
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
                        onClick={() => refundOrderUpdateHandler("Refund Success")}
                    >
                        Approve Refund
                    </button>
                    <button
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
                        onClick={() => refundOrderUpdateHandler("Rejected")}
                    >
                        Reject Refund
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RefundDetails;

