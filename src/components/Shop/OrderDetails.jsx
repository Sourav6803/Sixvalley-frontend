
import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles"; // Ensure the styles are updated accordingly
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const OrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (seller?._id) {
            dispatch(getAllOrdersOfShop(seller?._id));
        }
    }, [dispatch, seller?._id]);

    const data = orders?.find((item) => item._id === id);

    const orderUpdateHandler = async () => {
        try {
            // Update order status in the backend
            await axios.put(`${server}/order/update-order-status/${id}`, { status }, { withCredentials: true });
            toast.success("Order status updated successfully!");
    
            // Define a function to map order status to notification details
            const getNotificationDetails = (status) => {
                switch (status) {
                    case "Shipped":
                        return {
                            title: "Your Order has been Shipped",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} has been shipped. It will reach you soon!`,
                            image: data?.cart[0]?.images[0]?.url || "/default-shipped-image.jpg", // Replace with a default image if none is available
                        };
                    case "Out for delivery":
                        return {
                            title: "Your Order is Out for Delivery",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} is out for delivery. Please be available to receive it.`,
                            image: data?.cart[0]?.images[0]?.url || "/default-out-for-delivery-image.jpg",
                        };
                    case "Delivered":
                        return {
                            title: "Your Order has been Delivered",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} has been delivered. We hope you enjoy your purchase!`,
                            image: data?.cart[0]?.images[0]?.url || "/default-delivered-image.jpg",
                        };
                    case "Returned":
                        return {
                            title: "Your Order has been Returned",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} has been successfully returned.`,
                            image: data?.cart[0]?.images[0]?.url || "/default-returned-image.jpg",
                        };
                    case "Canceled":
                        return {
                            title: "Your Order has been Canceled",
                            content: `Your order with ID #${data?._id?.slice(0, 8)} has been canceled.`,
                            image: data?.cart[0]?.images[0]?.url || "/default-canceled-image.jpg",
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
            toast.error(error.response?.data?.message || "Failed to update order status");
        }
    };
    

    const refundOrderUpdateHandler = async () => {
        try {
            await axios.put(`${server}/order/order-refund-success/${id}`, { status }, { withCredentials: true });
            toast.success("Refund process updated successfully!");
            dispatch(getAllOrdersOfShop(seller._id));
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
                    <button className={` bg-pink-100 text-pink-600 h-[45px] text-[18px] px-5 rounded-md`}>
                        Back to Orders
                    </button>
                </Link>
            </div>

            <div className="w-full py-4 flex flex-col space-y-4">
                <div className="flex justify-between">
                    <h5 className="text-gray-500">Order ID: <span className="font-semibold">#{data?._id?.slice(0, 8)}</span></h5>
                    <h5 className="text-gray-500">Placed on: <span className="font-semibold">{data?.createdAt?.slice(0, 10)}</span></h5>
                </div>

                {/* Order items */}
                <div className="bg-white shadow-sm rounded-lg p-4">
                    {data?.cart.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 mb-5">
                            <img src={item?.images[0]?.url} alt={item.name} className="w-[80px] h-[80px] object-cover rounded-lg" />
                            <div className="flex-1">
                                <h5 className="text-md text-slate-600 font-medium">{item?.name}</h5>
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
                                    <p>Brand :  {product?.brand}</p>
                                    <p>Category :  {product?.category}</p>
                                    <p>Sub category : {product?.subCategory}</p>
                                    <p>Product Type : {product?.productType}</p>
                                    <p>SKU :  {product?.sku}</p>
                                    <p>Unit : {product?.unit}</p>
                                </div>
                            ))
                        }

                    </div>

                    <div className="lg:w-2/3 bg-slate-50 p-2 rounded-md">

                        <h4 className="font-semibold text-lg ">Pricing Info:</h4>
                        {
                            data?.cart?.map((product) => (
                                <>
                                    <p>Original Price : ₹ {product?.originalPrice}</p>
                                    <p>Discount amount : {product?.dicountType === "Percent" ? product?.discountAmount + "% Off" : "₹ " + product?.discountAmount}</p>
                                    <p>After discount price : ₹ {product?.afterDiscountPrice}</p>
                                    <p>Delivery Charge : {product?.shippingCost === 0 ? "Free" : "₹" + product?.shippingCost}</p>
                                    <p>Coupon  : {data?.appliedCoupon === null ? "No coupon used" : data?.couponAmount}</p>
                                </>
                            ))
                        }

                    </div>

                    <div className="lg:w-2/3 bg-slate-50 p-2 rounded-md">

                        <h4 className="font-semibold text-lg ">Shipping Address:</h4>
                        <p>{data?.shippingAddress?.address1}</p>
                        <p> {data?.shippingAddress?.address2}</p>
                        <p>{data?.shippingAddress?.city}, {data?.shippingAddress?.country}</p>
                        <p>Phone: {data?.user?.phoneNumber}</p>
                    </div>

                    <div className="lg:w-1/3 bg-slate-50 p-2 rounded-md">
                        <h4 className="font-semibold text-lg">Payment Info:</h4>
                        <p className="">Method : {data?.paymentInfo?.type || "Not Paid"}</p>
                        <p className="">Status : {data?.paymentInfo?.status || "Not Paid"}</p>
                    </div>
                </div>

                {/* Total price */}
                <div className="text-right border-t pt-4">
                    <h5 className="text-lg font-medium">Total Price: ₹{data?.totalPrice}</h5>
                </div>

                {/* Order Status Update */}
                <div>
                    <h4 className="font-semibold text-lg">Order Status:</h4>
                    {data?.status !== "Processing refund" && data?.status !== "Refund Success" ? (
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full max-w-xs border rounded-md p-2 mt-2"
                        >
                            {[
                                 "Confirmed", "Packaging",  "Shipped", "On the way",
                                "Out for delivery", "Delivered", "Canceled", "Failed to Deliver", "Returned"
                            ]
                                .slice(
                                    [
                                         "Confirmed", "Packaging",  "Shipped", "On the way",
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
                </div>



                {/* Update button */}
                <button
                    className="bg-red-500 text-white font-semibold py-2 px-6 rounded-md mt-4"
                    onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
                >
                    Update Status
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;

