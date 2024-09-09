// import React, { useEffect, useState } from "react";
// import styles from "../../styles/styles";
// import { BsFillBagFill } from "react-icons/bs";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfShop } from "../../redux/actions/order";
// import { backend_url, server } from "../../server";
// import axios from "axios";
// import { toast } from "react-toastify";


// const OrderDetails = () => {
//     const { orders, isLoading } = useSelector((state) => state.order);
//     const { seller } = useSelector((state) => state.seller);
//     const dispatch = useDispatch();
//     const [status, setStatus] = useState("");
//     const navigate = useNavigate();

//     const { id } = useParams();

//     useEffect(() => {
//         dispatch(getAllOrdersOfShop(seller._id));
//     }, [dispatch, seller?._id]);

//     const data = orders && orders.find((item) => item._id === id);

//     console.log(data)

//     const orderUpdateHandler = async (e) => {
//         await axios
//             .put(
//                 `${server}/order/update-order-status/${id}`,
//                 {
//                     status,
//                 },
//                 { withCredentials: true }
//             )
//             .then((res) => {
//                 toast.success("Order updated!");
//                 navigate("/dashboard-orders");
//             })
//             .catch((error) => {
//                 toast.error(error.response.data.message);
//             });
//     };

//     const refundOrderUpdateHandler = async (e) => {
//         await axios
//             .put(
//                 `${server}/order/order-refund-success/${id}`,
//                 {
//                     status,
//                 },
//                 { withCredentials: true }
//             )
//             .then((res) => {
//                 toast.success("Order updated!");
//                 dispatch(getAllOrdersOfShop(seller._id));
//             })
//             .catch((error) => {
//                 toast.error(error.response.data.message);
//             });
//     }




//     return (
//         <div className={`p-2 min-h-screen  !w-full ${styles.section}`}>
//             <div className="w-full flex items-center justify-between ">
//                 <div className="flex items-center">
//                     <BsFillBagFill size={30} color="crimson" />
//                     <h1 className="pl-2 text-[25px]">Order Details</h1>
//                 </div>
//                 <Link to="/dashboard-orders">
//                     <div
//                         className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
//                     >
//                         Order List
//                     </div>
//                 </Link>
//             </div>

//             <div className="w-full flex items-center justify-between pt-6">
//                 <h5 className="text-[#00000084]">
//                     Order ID: <span>#{data?._id?.slice(0, 8)}</span>
//                 </h5>
//                 <h5 className="text-[#00000084]">
//                     Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
//                 </h5>
//             </div>

//             {/* order items */}
//             <br />
//             <br />
//             {data &&
//                 data?.cart.map((item, index) => (

//                     <div className="w-full flex items-start mb-5">
//                         <img
//                             // src={`${item?.images[0]?.url}`}
//                             src={`${item?.images[0]}`}
//                             alt=""
//                             className="w-[80x] h-[80px]"
//                         />
//                         <div className="w-full">
//                             <h5 className="pl-3 text-[20px]">{item.name}</h5>
//                             <h5 className="pl-3 text-[20px] text-[#00000091]">
//                                 <span className="text-green-600">₹</span>{item.discountPrice} x {item.qty}
//                             </h5>
//                         </div>
//                     </div>
//                 ))}

//             <div className="border-t w-full text-right">
//                 <h5 className="pt-3 text-[18px]">
//                     Total Price: <strong><span className="text-green-600">₹</span>{data?.totalPrice}</strong>
//                 </h5>
//             </div>
//             <br />
//             <br />
//             <div className="w-full 800px:flex items-center">
//                 <div className="w-full 800px:w-[60%]">
//                     <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
//                     <h4 className="pt-3 text-[20px]">
//                         {data?.shippingAddress.address1 +
//                             " " +
//                             data?.shippingAddress.address2}
//                     </h4>
//                     <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
//                     <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
//                     <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
//                 </div>
//                 <div className="w-full 800px:w-[40%]">
//                     <h4 className="pt-3 text-[20px]">Payment Info:</h4>
//                     <h4>
//                         Status:{" "}
//                         {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
//                     </h4>
//                 </div>
//             </div>
//             <br />
//             <br />
//             <h4 className="pt-3 text-[20px] font-[600] ">Order Status:</h4>
//             {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
//                 <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
//                 >
//                     {[
//                         "Processing",
//                         "Transferred to delivery partner",
//                         "Shipped",
//                         "Received",
//                         "On the way",
//                         "Out for delivery",
//                         "Delivered",
//                         "Cancled",
//                         "Failed To Delivery",
//                         "Returned"
//                     ]
//                         .slice(
//                             [
//                                 "Processing",
//                                 "Transferred to delivery partner",
//                                 "Shipped",
//                                 "Received",
//                                 "On the way",
//                                 "Out for delivery",
//                                 "Delivered",
//                                 "Cancled",
//                                 "Failed To Delivery",
//                                 "Returned"
//                             ].indexOf(data?.status)
//                         )
//                         .map((option, index) => (
//                             <option value={option} key={index}>
//                                 {option}
//                             </option>
//                         ))}
//                 </select>
//             )}
//             {
//                 data?.status === "Processing refund" || data?.status === "Refund Success" ? (
//                     <select value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                         className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
//                     >
//                         {[
//                             "Processing refund",
//                             "Refund Success",
//                         ]
//                             .slice(
//                                 [
//                                     "Processing refund",
//                                     "Refund Success",
//                                 ].indexOf(data?.status)
//                             )
//                             .map((option, index) => (
//                                 <option value={option} key={index}>
//                                     {option}
//                                 </option>
//                             ))}
//                     </select>
//                 ) : null
//             }

//             <div
//                 className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
//                 onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
//             >
//                 Update Status
//             </div>
//         </div>
//     );
// };

// export default OrderDetails;


















import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles"; // Ensure the styles are updated accordingly

const OrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (seller?._id) {
            dispatch(getAllOrdersOfShop(seller._id));
        }
    }, [dispatch, seller?._id]);

    const data = orders?.find((item) => item._id === id);
    // console.log(data)

    const orderUpdateHandler = async () => {
        try {
            await axios.put(`${server}/order/update-order-status/${id}`, { status }, { withCredentials: true });
            toast.success("Order status updated successfully!");
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

                {/* Shipping & Payment info */}
                <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0 ">


                    <div className="lg:w-2/3 bg-slate-50 p-2 rounded-md">

                        <h4 className="font-semibold text-lg ">Product Basic Info:</h4>
                        {
                            data?.cart?.map((product) => (
                                <>
                                    <p>Brand :  {product?.brand}</p>
                                    <p>Product Type : {product?.productType}</p>
                                    <p>SKU :  {product?.sku}</p>
                                    <p>Unit : {product?.unit}</p>
                                    

                                    
                                </>
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
                                    <br />

                                    <h1 className="font-bold text-xl text-slate-700">You have pay ₹{data?.totalPrice} rupees included shipping cost</h1>
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
                                "Processing", "Transferred to delivery partner", "Shipped", "Received", "On the way",
                                "Out for delivery", "Delivered", "Canceled", "Failed to Deliver", "Returned"
                            ]
                                .slice(
                                    [
                                        "Processing", "Transferred to delivery partner", "Shipped", "Received", "On the way",
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
                            {["Processing refund", "Refund Success"]
                                .slice(
                                    ["Processing refund", "Refund Success"].indexOf(data?.status)
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

