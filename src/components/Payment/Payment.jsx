// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { useEffect } from "react";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { RxCross1 } from "react-icons/rx";
// import { FaPaypal, FaCcMastercard, FaWallet } from "react-icons/fa6";

// import { PiBankDuotone } from "react-icons/pi";
// import { FaCreditCard } from 'react-icons/fa';
// import socketIO from "socket.io-client";

// const ENDPOINT = "http://localhost:4000";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// const Payment = () => {
//   const [orderData, setOrderData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentMethod, setPaymentMethod] = useState()
//   const [payementProcessing, setPaymentProcessing] = useState(false)

//   useEffect(() => {
//     const orderData = JSON.parse(localStorage.getItem("latestOrder"));
//     setOrderData(orderData);
//   }, []);

//   const createOrder = (data, actions) => {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             description: "Sunflower",
//             amount: {
//               currency_code: "USD",
//               value: orderData?.totalPrice,
//             },
//           },
//         ],
//         // not needed if a shipping address is actually needed
//         application_context: {
//           shipping_preference: "NO_SHIPPING",
//         },
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   };

//   const order = {
//     cart: orderData?.cart,
//     shippingAddress: orderData?.shippingAddress,
//     user: user && user,
//     totalPrice: orderData?.totalCartPrice,
//     couponCode: orderData?.couponCode,
//     couponAmount: orderData?.couponAmount,

//     // taxAmount: 10,
//     deliveryCharge: orderData?.deliverCharge
//   };


//   const title = `New Order  Received`
//   const content = `You have received a new order with the following items: ${order?.cart?.map(item => item.name).join(', ')}. Please prepare the order for shipping.`;
//   const imageUrl = order?.cart?.map(item => item?.images[0].url)


//   const onApprove = async (data, actions) => {
//     return actions.order.capture().then(function (details) {
//       const { payer } = details;

//       let paymentInfo = payer;

//       if (paymentInfo !== undefined) {
//         paypalPaymentHandler(paymentInfo);
//       }
//     });
//   };


//   const paypalPaymentHandler = async (paymentInfo) => {
   

//     try {
//       // Set the loading state
//       setPaymentProcessing(true);

//       // Prepare payment info to be added to the order
//       order.paymentInfo = {
//         id: paymentInfo.payer_id,
//         status: "succeeded",
//         type: "Paypal",
//       };



//       // If successful, proceed with order completion actions
//       setOpen(false);
//       toast.success("Order successful!");

//       // Clear cart and order data from localStorage
//       localStorage.setItem("cartItems", JSON.stringify([]));
//       localStorage.setItem("latestOrder", JSON.stringify([]));

//       // Navigate to order success page
//       navigate("/order/success");
//     } catch (error) {
//       // Handle errors, show an error toast, or any other error UI
//       console.error("Payment failed: ", error);
//       toast.error("Payment failed. Please try again.");
//     } finally {
//       // Always reset the loading state
//       setPaymentProcessing(false);
//     }
//   };


//   const paymentData = {
//     amount: Math.round(orderData?.totalPrice * 100),
//   };

//   const paymentHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };


//       const { data } = await axios.post(
//         `${server}/payment/process`,
//         paymentData,
//         config
//       );

//       const client_secret = data.client_secret;

//       if (!stripe || !elements) return;
//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           order.paymnentInfo = {
//             id: result.paymentIntent.id,
//             status: result.paymentIntent.status,
//             type: "Credit Card",
//           };

//           setPaymentProcessing(true)

//           await axios
//             .post(`${server}/order/create-order`, order, config)
//             .then((res) => {
//               setOpen(false);
//               navigate("/order/success");
//               toast.success("Order successful!");
//               localStorage.setItem("cartItems", JSON.stringify([]));
//               localStorage.setItem("latestOrder", JSON.stringify([]));
//               window.location.reload();
//             });
//         }
//       }
//     } catch (error) {
//       toast.error(error);
//     }
//     finally {
//       setPaymentProcessing(false); // Hide loading modal
//     }
//   };


//   const cashOnDeliveryHandler = async (e) => {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // Add payment info for Cash on Delivery
//     const updatedOrder = {
//       ...order,
//       paymentInfo: {
//         type: "Cash On Delivery",
//       },
//     };

//     setPaymentProcessing(true); // Start the loading state

//     try {
//       // Make the API request to create the order
//       const response = await axios.post(`${server}/order/create-order`, updatedOrder, config);

//       if (response.status === 201) {
//         // Order successful
//         toast.success("Order successful!");

//         const orders = response?.data?.orders
//         console.log("orders : ", orders)

//         // Clear local storage items related to the order and cart
//         localStorage.setItem("cartItems", JSON.stringify([]));
//         localStorage.setItem("latestOrder", JSON.stringify([]));

//         socketId.emit("notification", {
//           title,
//           content,
//           imageUrl
//         });

     

//         // Close modal if any and redirect to success page
//         setOpen(false);
//         navigate("/order/success", { state: { orders} });

//         // Optional: Reload page if necessary to reset the state
//         // window.location.reload();
//       } else {
//         throw new Error("Something went wrong with the order.");
//       }
//     } catch (error) {
//       // Display the error message to the user
//       console.log(error.message)
//       toast.error(error?.response?.data?.message || "Failed to create the order, please try again.");
//     } finally {
//       // Always stop the loading spinner, success or failure
//       setPaymentProcessing(false);
//     }
//   };


//   return (
//     <div className="w-full flex flex-col items-center py-3">
//       <LoadingModal loading={payementProcessing} />
//       <div className="w-full 1000px:w-[70%] block 800px:flex p-1">
//         <div className="w-full 800px:w-[65%]">
//           <PaymentInfo
//             user={user}
//             open={open}
//             setOpen={setOpen}
//             onApprove={onApprove}
//             createOrder={createOrder}
//             paymentHandler={paymentHandler}
//             cashOnDeliveryHandler={cashOnDeliveryHandler}
//             orderData={orderData}
//             paymentMethod={paymentMethod}
//             setPaymentMethod={setPaymentMethod}
//           />
//         </div>

//       </div>

//       <footer className="bg-gray-800 text-white py-4 text-center w-full p-1">
//         <p>© 2024 Your Company. All rights reserved.</p>
//         <div className="flex justify-center space-x-4 mt-2">
//           <span>Privacy Policy</span>
//           <span>Terms of Service</span>
//           <span>Contact Us</span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const PaymentInfo = ({ orderData, user,
//   open,
//   setOpen,
//   onApprove,
//   createOrder,
//   paymentHandler,
//   cashOnDeliveryHandler,
//   paymentMethod,
//   setPaymentMethod }) => {

//   const [showPaymentOptions, setShowPaymentOptions] = useState({
//     savedOptions: false,
//     card: false,
//     netBanking: false,
//     wallet: false,
//     upi: false,
//     cod: false,
//   });

//   const toggleOption = (option) => {
//     setShowPaymentOptions((prevOptions) => ({
//       ...prevOptions,
//       [option]: !prevOptions[option],
//     }));
//   };

//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [open]);


//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold">Step 3 of 3: Payments</h2>
//         <span className="text-xs text-gray-600">100% Secure</span>
//       </div>

//       <div className="bg-blue-50 p-4 rounded-lg mb-4 cursor-pointer" onClick={() => toggleOption("totalAmount")}>
//         <div className="flex justify-between" >
//           <span className="text-blue-600 font-medium">Total Amount</span>

//           <span className="font-semibold text-xl">₹{orderData?.totalCartPrice}</span>
//         </div>

//         {showPaymentOptions.totalAmount && (
//           <div className="w-full   rounded-md relative">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Details</h2>

//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Price ({orderData?.length} items)</p>
//                 <p className="font-semibold text-gray-900">₹{orderData.totalOriginalPrice}</p>
//               </div>

//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Discount</p>
//                 <p className="font-semibold text-green-600">-₹{orderData.totalDiscountPrice}</p>
//               </div>

//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Coupons Applied</p>
//                 <p className="font-semibold text-green-600">-₹{orderData.couponAmount}</p>
//               </div>

//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Delivery Charges</p>
//                 <p className="text-gray-900">
//                   {orderData.deliverCharge === 0 ? "Free" : `₹${orderData.deliverCharge}`}
//                 </p>
//               </div>
//             </div>

//             <hr className="my-4" />

//             <div className="flex justify-between items-center font-semibold text-lg">
//               <p>Total Amount</p>
//               <p>₹{orderData?.totalCartPrice}</p>
//             </div>


//           </div>
//         )}
//         {!showPaymentOptions.totalAmount && <span className="">Tap here to see details </span>}
//         <p className="text-green-600 text-sm mt-1">5% Cashback on payments</p>
//       </div>

//       {/* Credit/Debit/ATM Card Section */}
//       <div className="border-b py-2">
//         <div className="flex">
//           <span className="mr-2 mt-2">
//             <FaCcMastercard />
//           </span>
//           <button
//             onClick={() => toggleOption("card")}
//             className="flex justify-between w-full text-gray-700 font-medium"
//           >
//             Credit / Debit / ATM Card
//             <span>{showPaymentOptions.card ? "▲" : "▼"}</span>
//           </button>
//         </div>
//         <p className="text-gray-500 text-[10px] mr-10 ">Add and secure cards as per RBI guidelines</p>

//         {showPaymentOptions.card && (
//           <div className="pl-4 py-2">
//             <p className="text-sm text-gray-600">Add your card details</p>
//             {/* Card Form */}
//             <div className="mt-2">
              
//               <CardNumberElement
//                 className={`w-full p-2 mb-2 border rounded-lg`}
//                 placeholder="Card Number"
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: "14px",
//                       lineHeight: 1.5,

//                     },
//                     empty: {
//                       color: "#3a120a",
//                       backgroundColor: "transparent",

//                     },
//                   },
//                 }}
//               />

//               <CardExpiryElement
//                 className={`w-full p-2 mb-2 border rounded-lg`}
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: "14px",
//                       lineHeight: 1.5,
//                       // color: "#444",
//                     },
//                     empty: {
//                       color: "#3a120a",
//                       backgroundColor: "transparent",
//                       "::placeholder": {
//                         // color: "#444",
//                         fontSize: "14px",
//                       },
//                     },
//                   },
//                 }}
//               />

//               <CardCvcElement
//                 className={`w-full p-2 border rounded-lg`}
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: "14px",
//                       lineHeight: 1.5,
//                       // color: "#444",
//                     },
//                     empty: {
//                       color: "#3a120a",
//                       backgroundColor: "transparent",
//                       "::placeholder": {
//                         // color: "#444",
//                       },
//                     },
//                   },
//                 }}
//               />
//             </div>


//             <button onClick={paymentHandler} className="w-full mt-3 py-2 bg-blue-600 text-white rounded-md">
//               Pay ₹{orderData?.totalCartPrice}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* paypal */}
//       <div className="border-b py-2">
//         <div className="flex item-center justify-center">
//           <span className="mr-2 mt-2">
//             <FaPaypal />
//           </span>

//           <button
//             onClick={() => toggleOption("paypal")}
//             aria-expanded={showPaymentOptions.paypal}
//             aria-controls="paypal-options"
//             className="flex justify-between w-full text-gray-700 font-medium"
//           >

//             Paypal
//             <span>{showPaymentOptions.paypal ? "▲" : "▼"}</span>
//           </button>
//         </div>

//         {showPaymentOptions.paypal && (
//           <div className="w-full flex border-b" id="paypal-options">
//             <div
//               className="bg-yellow-400 flex items-center justify-center w-full mt-3 text-[#090909] h-[38px] rounded-[5px] cursor-pointer text-[16px] font-[600]"
//               onClick={() => setOpen(true)}
//             >
//               Pay Now
//             </div>

//             {open && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
//                 {/* Modal Background */}
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setOpen(false)} // Close modal when clicking outside
//                 />

//                 {/* Modal Content */}
//                 <div
//                   className="relative bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl p-6 z-20"
//                   style={{ maxHeight: '90vh' }}
//                 >
//                   {/* Close Button */}
//                   <button
//                     className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
//                     onClick={() => setOpen(false)}
//                   >
//                     <RxCross1 size={24} />
//                   </button>

//                   {/* Modal Header */}
//                   <h2 className="text-xl font-semibold text-center mb-4">Complete Your Payment</h2>

//                   {/* PayPal Buttons */}
//                   <div className="w-full">
//                     <PayPalScriptProvider
//                       options={{
//                         "client-id":
//                           "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
//                       }}
//                     >
//                       <PayPalButtons
//                         style={{ layout: "vertical" }}
//                         onApprove={onApprove}
//                         createOrder={createOrder}
//                       />
//                     </PayPalScriptProvider>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>


//       {/* Wallets */}
//       <div className="border-b py-2">
//         <div className="flex">
//           <span className="mr-2 mt-2">
//             <FaWallet />
//           </span>
//           <button
//             onClick={() => toggleOption("wallet")}
//             className="flex justify-between w-full text-gray-700 font-medium"
//           >
//             Wallets
//             <span>{showPaymentOptions.wallet ? "▲" : "▼"}</span>
//           </button>
//         </div>
//         {showPaymentOptions.wallet && (
//           <div className="pl-4 py-2 text-sm text-gray-600">No wallet options available</div>
//         )}
//       </div>

//       {/* UPI */}
//       <div className="border-b py-2">
//         <div className="flex">
//           <span className="mt-2 mr-2">
//             <FaCreditCard />
//           </span>
//           <button
//             onClick={() => toggleOption("upi")}
//             className="flex justify-between w-full text-gray-700 font-medium"
//           >
//             UPI
//             <span>{showPaymentOptions.upi ? "▲" : "▼"}</span>
//           </button>
//         </div>

//         {showPaymentOptions.upi && (
//           <div className="pl-4 py-2 text-sm text-gray-600">Enter your UPI ID</div>
//         )}
//       </div>

//       {/* Cash on Delivery */}
//       <div className="py-2">
//         <div className="flex">
//           <span className="mt-2 mr-2">
//             <PiBankDuotone />
//           </span>
//           <button
//             onClick={() => toggleOption("cod")}
//             className="flex justify-between w-full text-gray-700 font-medium"
//           >
//             Cash on Delivery
//             <span>{showPaymentOptions.cod ? "▲" : "▼"}</span>
//           </button>
//         </div>

//         {showPaymentOptions.cod && (

//           (
//             <div className="w-full flex">
//               <form className="w-full" onSubmit={cashOnDeliveryHandler}>
//                 <p className="text-sm text-gray-600">Pay when your order arrives.</p>
//                 <input
//                   type="submit"
//                   value="Place Order with COD"
//                   className={` bg-yellow-400 w-full mt-3 text-[#090909] h-[38px] rounded-[5px] cursor-pointer text-[16px] font-[600]`}
//                 />
//               </form>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { RxCross1 } from "react-icons/rx";
// import {
//   FaPaypal,
//   FaCcMastercard,
//   FaWallet,
//   FaCreditCard,
//   FaMoneyBillWave,
// } from "react-icons/fa";
// import { PiBankDuotone } from "react-icons/pi";
// import socketIO from "socket.io-client";

// const ENDPOINT = "http://localhost:4000";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// // Loading Modal Component
// const LoadingModal = ({ loading, message = "Processing your payment..." }) => {
//   if (!loading) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 flex flex-col items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
//         <p className="text-gray-700">{message}</p>
//       </div>
//     </div>
//   );
// };

// const Payment = () => {
//   const [orderData, setOrderData] = useState(null);
//   const [openPaypal, setOpenPaypal] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
//   const [savedCards, setSavedCards] = useState([]);
//   const [selectedCard, setSelectedCard] = useState(null);

//   useEffect(() => {
//     const orderData = JSON.parse(localStorage.getItem("latestOrder"));
//     if (!orderData) {
//       toast.error("No order data found. Please try again.");
//       navigate("/checkout");
//       return;
//     }
//     setOrderData(orderData);
    
//     // In a real app, you would fetch saved payment methods from your backend
//     const mockSavedCards = [
//       { id: 1, last4: "4242", brand: "Visa", expiry: "12/25" },
//       { id: 2, last4: "5555", brand: "Mastercard", expiry: "08/24" },
//     ];
//     setSavedCards(mockSavedCards);
//   }, [navigate]);

//   const createOrder = (data, actions) => {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             description: "Your order from Our Store",
//             amount: {
//               currency_code: "USD",
//               value: orderData?.totalPrice,
//             },
//           },
//         ],
//         application_context: {
//           shipping_preference: "NO_SHIPPING",
//         },
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   };

//   const order = {
//     cart: orderData?.cart,
//     shippingAddress: orderData?.shippingAddress,
//     user: user && user,
//     totalPrice: orderData?.totalPrice,
//     couponCode: orderData?.couponCode,
//     couponAmount: orderData?.couponAmount,
//     deliveryCharge: orderData?.deliveryCharge,
//   };

//   const title = `New Order Received`;
//   const content = `You have received a new order with the following items: ${order?.cart
//     ?.map((item) => item.name)
//     .join(", ")}. Please prepare the order for shipping.`;
//   const imageUrl = order?.cart?.map((item) => item?.images[0]?.url);

//   const onApprove = async (data, actions) => {
//     return actions.order.capture().then(function (details) {
//       const { payer } = details;
//       paypalPaymentHandler(payer);
//     });
//   };

//   const paypalPaymentHandler = async (paymentInfo) => {
//     try {
//       setPaymentProcessing(true);
      
//       // order.paymentInfo = {
//       //   id: paymentInfo.payer_id,
//       //   status: "succeeded",
//       //   type: "PayPal",
//       // };

//        // PayPal payer contains payer_id and payer info; use a provider-specific id here
//       order.paymentInfo = {
//         provider: "PayPal",
//         id: paymentInfo.payer_id || paymentInfo.payerID || "", // PayPal provided payer id
//         status: "succeeded",
//         method: "paypal", // you can also add "paypal" to enum if you prefer
//         transactionFee: 0,
//         refundedAmount: 0,
//       };

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       await axios.post(`${server}/order/create-order`, order, config);
      
//       setOpenPaypal(false);
//       toast.success("Order successful!");
      
//       // Clear cart and order data
//       localStorage.removeItem("cartItems");
//       localStorage.removeItem("latestOrder");
      
//       // Send notification
//       socketId.emit("notification", {
//         title,
//         content,
//         imageUrl,
//         users: order.cart.map(item => ({ userId: item.shopId }))
//       });
      
//       navigate("/order/success");
//     } catch (error) {
//       console.error("Payment failed: ", error);
//       toast.error(error.response?.data?.message || "Payment failed. Please try again.");
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   const paymentData = {
//     amount: Math.round(orderData?.totalPrice * 100),
//   };

//   const handleCardPayment = async (e) => {
//     e.preventDefault();
    
//     if (!stripe || !elements) {
//       toast.error("Payment system not ready. Please try again.");
//       return;
//     }

//     try {
//       setPaymentProcessing(true);
      
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         `${server}/payment/process`,
//         paymentData,
//         config
//       );

//       const client_secret = data.client_secret;
//       const serverTransactionFee = data.transactionFee || 0; // optional

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//         return;
//       }

//       if (result.paymentIntent.status === "succeeded") {
//         // Map Stripe's paymentIntent -> unified paymentInfo schema
//       const pi = result.paymentIntent;
//       const pmDetails =  result.paymentIntent.payment_method_details?.card || {} ;

//         // order.paymentInfo = {
//         //   id: result.paymentIntent.id,
//         //   status: result.paymentIntent.status,
//         //   type: "Credit Card",
//         // };

//         order.paymentInfo = {
//           provider: "Stripe",
//           id: pi.id,
//           status: pi.status, // "succeeded"
//           method: "card",
//           card: {
//             brand: pmDetails.brand || undefined,
//             last4: pmDetails.last4 || undefined,
//             expMonth: pmDetails.exp_month || undefined,
//             expYear: pmDetails.exp_year || undefined,
//             network: pmDetails.network || undefined,
//           },
//           transactionFee: serverTransactionFee,
//           refundedAmount: 0,
//         };

//         const response = await axios.post(
//           `${server}/order/create-order`,
//           order,
//           config
//         );
        
//         toast.success("Order successful!");
        
//         localStorage.removeItem("cartItems");
//         localStorage.removeItem("latestOrder");
        
//         socketId.emit("notification", {
//           title,
//           content,
//           imageUrl,
//           users: order.cart.map(item => ({ userId: item.shopId }))
//         });
        
//         navigate("/order/success", { state: { orders: response.data.orders } });
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(error.response?.data?.message || "Payment failed. Please try again.");
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   const cashOnDeliveryHandler = async (e) => {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const updatedOrder = {
//       ...order,
//       // paymentInfo: {
//       //   type: "Cash On Delivery",
//       //   status: "pending",
//       // },
//       paymentInfo: {
//         provider: "Other", // or "Offline"
//         id: `cod_${Date.now()}`, // optional local id
//         status: "pending",
//         method: "cod",
//         refundedAmount: 0,
//       },
//     };

//     setPaymentProcessing(true);

//     try {
//       const response = await axios.post(
//         `${server}/order/create-order`,
//         updatedOrder,
//         config
//       );

//       toast.success("Order placed successfully!");

//       localStorage.removeItem("cartItems");
//       localStorage.removeItem("latestOrder");

//       socketId.emit("notification", {
//         title,
//         content,
//         imageUrl,
//         users: order.cart.map(item => ({ userId: item.shopId }))
//       });

//       setOpenPaypal(false);
//       navigate("/order/success", { state: { orders: response.data.orders } });
//     } catch (error) {
//       console.error("Order error:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to create the order. Please try again."
//       );
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   if (!orderData) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <LoadingModal loading={paymentProcessing} />
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Payment</h1>
//           <p className="text-gray-600">Secure payment processed with encryption</p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full lg:w-7/12">
//             <PaymentInfo
//               orderData={orderData}
//               user={user}
//               openPaypal={openPaypal}
//               setOpenPaypal={setOpenPaypal}
//               onApprove={onApprove}
//               createOrder={createOrder}
//               handleCardPayment={handleCardPayment}
//               cashOnDeliveryHandler={cashOnDeliveryHandler}
//               paymentMethod={paymentMethod}
//               setPaymentMethod={setPaymentMethod}
//               savedCards={savedCards}
//               selectedCard={selectedCard}
//               setSelectedCard={setSelectedCard}
//             />
//           </div>
          
//           <div className="w-full lg:w-5/12">
//             <OrderSummary orderData={orderData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentInfo = ({
//   orderData,
//   openPaypal,
//   setOpenPaypal,
//   onApprove,
//   createOrder,
//   handleCardPayment,
//   cashOnDeliveryHandler,
//   savedCards,
//   selectedCard,
//   setSelectedCard,
// }) => {
//   const [activePaymentMethod, setActivePaymentMethod] = useState("card");
//   const [saveCard, setSaveCard] = useState(false);

//   const paymentMethods = [
//     {
//       id: "card",
//       name: "Credit/Debit Card",
//       icon: <FaCreditCard className="text-blue-500" />,
//       description: "Pay securely with your card",
//     },
//     {
//       id: "paypal",
//       name: "PayPal",
//       icon: <FaPaypal className="text-blue-500" />,
//       description: "Pay with your PayPal account",
//     },
//     {
//       id: "cod",
//       name: "Cash on Delivery",
//       icon: <FaMoneyBillWave className="text-blue-500" />,
//       description: "Pay when you receive your order",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
      
//       {/* Payment Method Selection */}
//       <div className="grid grid-cols-1 gap-3 mb-6">
//         {paymentMethods.map((method) => (
//           <div
//             key={method.id}
//             className={`border rounded-lg p-4 cursor-pointer transition-all ${
//               activePaymentMethod === method.id
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-200 hover:border-gray-300"
//             }`}
//             onClick={() => setActivePaymentMethod(method.id)}
//           >
//             <div className="flex items-center">
//               <div className="mr-3">{method.icon}</div>
//               <div className="flex-1">
//                 <h3 className="font-medium text-gray-800">{method.name}</h3>
//                 <p className="text-sm text-gray-600">{method.description}</p>
//               </div>
//               <div
//                 className={`w-5 h-5 rounded-full border-2 ${
//                   activePaymentMethod === method.id
//                     ? "border-blue-500 bg-blue-500"
//                     : "border-gray-300"
//                 }`}
//               >
//                 {activePaymentMethod === method.id && (
//                   <div className="w-2 h-2 bg-white rounded-full m-auto mt-1.5"></div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Card Payment Form */}
//       {activePaymentMethod === "card" && (
//         <div className="mb-6">
//           <h3 className="font-medium text-gray-800 mb-4">Card Details</h3>
          
//           {/* Saved Cards */}
//           {savedCards.length > 0 && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select a saved card
//               </label>
//               <div className="grid grid-cols-1 gap-2">
//                 {savedCards.map((card) => (
//                   <div
//                     key={card.id}
//                     className={`border rounded-lg p-3 cursor-pointer ${
//                       selectedCard?.id === card.id
//                         ? "border-blue-500 bg-blue-50"
//                         : "border-gray-200"
//                     }`}
//                     onClick={() => setSelectedCard(card)}
//                   >
//                     <div className="flex items-center">
//                       <FaCreditCard className="text-gray-500 mr-2" />
//                       <span className="font-medium">
//                         {card.brand} ending in {card.last4}
//                       </span>
//                       <span className="ml-auto text-sm text-gray-500">
//                         Expires {card.expiry}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//                 <div
//                   className="border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer text-center text-blue-600 hover:bg-blue-50"
//                   onClick={() => setSelectedCard(null)}
//                 >
//                   + Use a new card
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* New Card Form */}
//           {!selectedCard && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Card Number
//                 </label>
//                 <div className="border border-gray-300 rounded-lg p-3">
//                   <CardNumberElement
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "16px",
//                           color: "#424770",
//                           "::placeholder": {
//                             color: "#aab7c4",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Expiration Date
//                   </label>
//                   <div className="border border-gray-300 rounded-lg p-3">
//                     <CardExpiryElement
//                       options={{
//                         style: {
//                           base: {
//                             fontSize: "16px",
//                             color: "#424770",
//                             "::placeholder": {
//                               color: "#aab7c4",
//                             },
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     CVC
//                   </label>
//                   <div className="border border-gray-300 rounded-lg p-3">
//                     <CardCvcElement
//                       options={{
//                         style: {
//                           base: {
//                             fontSize: "16px",
//                             color: "#424770",
//                             "::placeholder": {
//                               color: "#aab7c4",
//                             },
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="saveCard"
//                   checked={saveCard}
//                   onChange={(e) => setSaveCard(e.target.checked)}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
//                   Save card for future payments
//                 </label>
//               </div>
//             </div>
//           )}
          
//           <button
//             onClick={handleCardPayment}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
//           >
//             Pay ₹{orderData?.totalPrice}
//           </button>
//         </div>
//       )}

//       {/* PayPal Payment */}
//       {activePaymentMethod === "paypal" && (
//         <div className="mb-6">
//           <div className="bg-gray-50 p-4 rounded-lg mb-4">
//             <p className="text-sm text-gray-600">
//               You will be redirected to PayPal to complete your payment securely.
//             </p>
//           </div>
          
//           <div className="w-full">
//             <PayPalScriptProvider
//               options={{
//                 "client-id": "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
//                 components: "buttons",
//               }}
//             >
//               <PayPalButtons
//                 style={{ layout: "vertical", height: 45 }}
//                 onApprove={onApprove}
//                 createOrder={createOrder}
//                 onError={(err) => {
//                   console.error("PayPal error:", err);
//                   toast.error("Failed to initialize PayPal. Please try another method.");
//                 }}
//               />
//             </PayPalScriptProvider>
//           </div>
//         </div>
//       )}

//       {/* Cash on Delivery */}
//       {activePaymentMethod === "cod" && (
//         <div className="mb-6">
//           <div className="bg-gray-50 p-4 rounded-lg mb-4">
//             <p className="text-sm text-gray-600">
//               Pay with cash when your order is delivered. An additional ₹50 processing fee may apply.
//             </p>
//           </div>
          
//           <button
//             onClick={cashOnDeliveryHandler}
//             className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
//           >
//             Confirm Cash on Delivery Order
//           </button>
//         </div>
//       )}

//       {/* Security Notice */}
//       <div className="border-t pt-4 mt-6">
//         <div className="flex items-center text-sm text-gray-500">
//           <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//             <path
//               fillRule="evenodd"
//               d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>Your payment details are encrypted and secure</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderSummary = ({ orderData }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
      
//       <div className="space-y-4">
//         <div className="flex justify-between">
//           <span className="text-gray-600">Items ({orderData?.cart?.length})</span>
//           <span className="font-medium">₹{orderData?.totalOriginalPrice}</span>
//         </div>
        
//         <div className="flex justify-between text-green-600">
//           <span>Discount</span>
//           <span>-₹{orderData?.totalDiscountPrice}</span>
//         </div>
        
//         {orderData?.couponAmount > 0 && (
//           <div className="flex justify-between text-green-600">
//             <span>Coupon Discount</span>
//             <span>-₹{orderData?.couponAmount}</span>
//           </div>
//         )}
        
//         <div className="flex justify-between">
//           <span>Delivery</span>
//           <span>{orderData?.deliveryCharge === 0 ? "Free" : `₹${orderData?.deliveryCharge}`}</span>
//         </div>
        
//         <hr className="my-4" />
        
//         <div className="flex justify-between text-lg font-semibold">
//           <span>Total</span>
//           <span>₹{orderData?.totalPrice}</span>
//         </div>
        
//         <div className="text-green-600 text-sm">
//           You save ₹{orderData?.totalDiscountPrice + (orderData?.couponAmount || 0)}
//         </div>
//       </div>
      
//       <div className="mt-6 pt-4 border-t">
//         <h3 className="font-medium text-gray-800 mb-2">Delivery Address</h3>
//         <p className="text-sm text-gray-600">
//           {orderData?.shippingAddress?.address1}, {orderData?.shippingAddress?.city}, {orderData?.shippingAddress?.country}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Payment;














import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


// Lazy load components
// const CardPayment = lazy(() => import('./payment/CardPayment'));
// const UPIPayment = lazy(() => import('./payment/UPIPayment'));
// const PayPalPayment = lazy(() => import('./payment/PayPalPayment'));
// const CashOnDelivery = lazy(() => import('./payment/CashOnDelivery'));
// const OrderSummary = lazy(() => import('./OrderSummary'));
// const LoadingModal = lazy(() => import('./LoadingModal'));
// const ErrorBoundary = lazy(() => import('./ErrorBoundary'));

// Custom hooks
// import { usePayment } from '../hooks/usePayment';
// import { usePaymentValidation } from '../hooks/usePaymentValidation';
import CardPayment from './CardPayment';
import UPIPayment from './UPIPayment';
import { usePayment } from '../../hooks/usePayment';
import { usePaymentValidation } from '../../hooks/usePaymentValidation';
import PayPalPayment from './PaypalPayment';
import CashOnDelivery from './CashOnDelivery';
import axios from 'axios';
import { server } from '../../server';
import ErrorBoundary from '../ErrorBoundary';
// import ErrorBoundary from '../ErrorBoundary';

const Payment = () => {
  const [orderData, setOrderData] = useState(null);
  const [activePaymentMethod, setActivePaymentMethod] = useState('card');
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

    const [showPaymentOptions, setShowPaymentOptions] = useState({
      savedOptions: false,
      card: false,
      netBanking: false,
      wallet: false,
      upi: false,
      cod: false,
    });
  
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const { paymentProcessing, error, processOrder } = usePayment();
  const { validateOrderData, sanitizeInput } = usePaymentValidation();

  // Memoized order data to prevent unnecessary re-renders
  const memoizedOrderData = useMemo(() => {
    if (!orderData) return null;
    
    return {
      cart: orderData.cart?.map(item => ({
        ...item,
        name: sanitizeInput(item.name),
        description: sanitizeInput(item.description),
      })),
      shippingAddress: {
        ...orderData.shippingAddress,
        address1: sanitizeInput(orderData.shippingAddress?.address1),
        city: sanitizeInput(orderData.shippingAddress?.city),
      },
      totalPrice: orderData.totalPrice,
      couponCode: sanitizeInput(orderData.couponCode),
      couponAmount: orderData.couponAmount,
      deliveryCharge: orderData.deliveryCharge,
    };
  }, [orderData, sanitizeInput]);

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const orderData = JSON.parse(localStorage.getItem('latestOrder'));
        
        if (!orderData) {
          toast.error('No order data found. Please try again.');
          navigate('/checkout');
          return;
        }

        const validationError = validateOrderData(orderData);
        if (validationError) {
          toast.error(validationError);
          navigate('/checkout');
          return;
        }

        setOrderData(orderData);
        
        // Fetch saved payment methods
        const savedPaymentMethods = await fetchSavedPaymentMethods();
        setSavedCards(savedPaymentMethods);
      } catch (error) {
        console.error('Error loading order data:', error);
        toast.error('Failed to load order data');
        navigate('/checkout');
      }
    };

    loadOrderData();
  }, [navigate, validateOrderData]);

  console.log("order data-->", orderData)

  const fetchSavedPaymentMethods = async () => {
    try {
      // Implement actual API call to fetch saved payment methods
      return [
        { id: 1, last4: '4242', brand: 'Visa', expiry: '12/25' } ,
        { id: 2, last4: '5555', brand: 'Mastercard', expiry: '08/24' },
      ];
    } catch (error) {
      console.error('Error fetching saved payment methods:', error);
      return [];
    }
  };

  const paymentHandlers = useMemo(
    () => ({
      card: async (paymentData) => {
        if (!stripe || !elements) {
          throw new Error("Payment system not ready");
        }

        const config = {
          headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
          `${server}/payment/process`,
          { amount: Math.round(orderData.totalPrice * 100) },
          config
        );

        const result = await stripe.confirmCardPayment(data.client_secret, {
          payment_method: { card: elements.getElement(CardNumberElement) },
        });

        if (result.error) throw new Error(result.error.message);

        return {
          provider: "Stripe",
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          method: "card",
          transactionFee: data.transactionFee || 0,
        };
      },

      // upi: async (paymentData) => {
      //   // Implement UPI payment processing
      //   const response = await axios.post(`${server}/payment/process-upi`, {
      //     upiId: paymentData.upiId,
      //     amount: orderData.totalPrice,
      //   });

      //   if (!response.data.success) {
      //     throw new Error('UPI payment failed');
      //   }

      //   return {
      //     provider: 'UPI',
      //     id: response.data.transactionId,
      //     status: 'pending',
      //     method: 'upi',
      //     upiId: paymentData.upiId,
      //   };
      // },

      upi: async (paymentData) => {
        const response = await axios.post(`${server}/payment/process-upi`, {
          upiId: paymentData.upiId,
          amount: orderData.totalPrice,
        });

        if (!response.data.success) {
          throw new Error("UPI payment failed");
        }

        // Stripe.js will prompt the user to authorize via their UPI app
        const result = await stripe.confirmPayment({
          clientSecret: response.data.client_secret,
          payment_method: {
            type: "upi",
          },
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        return {
          provider: "Stripe",
          id: result.paymentIntent.id,
          status: result.paymentIntent.status, // "succeeded" or "processing"
          method: "upi",
          upiId: paymentData.upiId,
          upi: {
            vpa: paymentData.upiId, // test@upi
            txnId: result.paymentIntent.id // UPI transaction id
          },
        };
      },

      paypal: async (paymentData) => ({
        provider: "PayPal",
        id: paymentData.payerID,
        status: "succeeded",
        method: "paypal",
      }),

      cod: async () => ({
        provider: "Offline",
        id: `cod_${Date.now()}`,
        status: "pending",
        method: "cod",
      }),
    }),
    [stripe, elements, orderData]
  );

  const handlePayment = async (paymentMethod, paymentData = {}) => {
    try {
      console.log("paymentMethod", paymentMethod)
      const paymentInfo = await paymentHandlers[paymentMethod](paymentData);

      console.log("paymentInfo", paymentInfo)
      
      const order = {
        cart: memoizedOrderData.cart,
        shippingAddress: memoizedOrderData.shippingAddress,
        user: user && { _id: user._id, email: sanitizeInput(user.email), phoneNumber: sanitizeInput(user.phoneNumber) },
        totalPrice: memoizedOrderData.totalPrice,
        paymentInfo,
      };

      const orderResponse = await processOrder(order, paymentInfo, 'Payment successful!');

      console.log("order data", orderResponse)
      
      // Navigate to success page
      navigate('/order/success', { state: { orders: orderResponse.orders } });
    } catch (error) {
      console.error('Payment error:', error);
      // Error is handled in the processOrder function
    }
  };

  const paymentMethods = useMemo(() => [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Pay securely with your card',
      component: CardPayment,
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: '📱',
      description: 'Fast and secure UPI payment',
      component: UPIPayment,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🌐',
      description: 'Pay with your PayPal account',
      component: PayPalPayment,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💰',
      description: 'Pay when you receive your order',
      component: CashOnDelivery,
    },
  ], []);

    const toggleOption = (option) => {
    setShowPaymentOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  if (!memoizedOrderData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const ActivePaymentComponent = paymentMethods.find(
    method => method.id === activePaymentMethod
  )?.component;

  // Loading Modal Component
const LoadingModal = ({ loading, message = "Processing your payment..." }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<LoadingModal loading={true} />}>
          <LoadingModal 
            loading={paymentProcessing} 
            message={`Processing your ${activePaymentMethod} payment...`} 
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Complete Your Payment
              </h1>
              <p className="text-gray-600">Secure payment processed with encryption</p>
            </div>


                 <div className="bg-blue-50 p-4 rounded-lg mb-4 cursor-pointer" onClick={() => toggleOption("totalAmount")}>
         <div className="flex justify-between" >
           <span className="text-blue-600 font-medium">Total Amount</span>

           <span className="font-semibold text-xl">₹{orderData?.totalCartPrice}</span>
         </div>

         {showPaymentOptions.totalAmount && (
           <div className="w-full   rounded-md relative">
             <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Details</h2>

             <div className="space-y-3">               <div className="flex justify-between items-center">
                 <p className="text-gray-600">Price ({orderData?.length} items)</p>
                 <p className="font-semibold text-gray-900">₹{orderData.totalOriginalPrice}</p>
               </div>

               <div className="flex justify-between items-center">
                 <p className="text-gray-600">Discount</p>
                 <p className="font-semibold text-green-600">-₹{orderData.totalDiscountPrice}</p>
               </div>

               <div className="flex justify-between items-center">
                 <p className="text-gray-600">Coupons Applied</p>
                 <p className="font-semibold text-green-600">-₹{orderData.couponAmount}</p>
               </div>

               <div className="flex justify-between items-center">
                 <p className="text-gray-600">Delivery Charges</p>
                 <p className="text-gray-900">
                   {orderData.deliverCharge === 0 ? "Free" : `₹${orderData.deliverCharge}`}
                 </p>
               </div>
             </div>

             <hr className="my-4" />

             <div className="flex justify-between items-center font-semibold text-lg">
               <p>Total Amount</p>
               <p>₹{orderData?.totalCartPrice}</p>
             </div>


           </div>
         )}
         {!showPaymentOptions.totalAmount && <span className="">Tap here to see details </span>}
         <p className="text-green-600 text-sm mt-1">5% Cashback on payments</p>
       </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-7/12">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Payment Method
                  </h2>
                  
                  <PaymentMethodSelector
                    methods={paymentMethods}
                    activeMethod={activePaymentMethod}
                    onMethodChange={setActivePaymentMethod}
                  />

                  {ActivePaymentComponent && (
                    <div className="mt-6">
                      <Suspense fallback={<div>Loading payment method...</div>}>
                        <ActivePaymentComponent
                          onSubmit={(data) => handlePayment(activePaymentMethod, data)}
                          orderTotal={memoizedOrderData.totalPrice}
                          savedCards={savedCards}
                          selectedCard={selectedCard}
                          onCardSelect={setSelectedCard}
                          isLoading={paymentProcessing}
                        />
                      </Suspense>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full lg:w-5/12">
                <OrderSummary orderData={memoizedOrderData} />
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

// Memoized selector component
const PaymentMethodSelector = React.memo(({ methods, activeMethod, onMethodChange }) => (
  <div className="grid grid-cols-1 gap-3 mb-6">
    {methods.map((method) => (
      <div
        key={method.id}
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          activeMethod === method.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onMethodChange(method.id)}
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">{method.icon}</span>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{method.name}</h3>
            <p className="text-sm text-gray-600">{method.description}</p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              activeMethod === method.id
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}
          >
            {activeMethod === method.id && (
              <div className="w-2 h-2 bg-white rounded-full m-auto mt-1.5"></div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
));

const OrderSummary = ({ orderData }) => {
  console.log("order summarryyyyy-<", orderData)
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({orderData?.cart?.length})</span>
          <span className="font-medium">₹{orderData?.totalOriginalPrice}</span>
        </div>
        
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-₹{orderData?.totalDiscountPrice}</span>
        </div>
        
        {orderData?.couponAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Discount</span>
            <span>-₹{orderData?.couponAmount}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{orderData?.deliveryCharge === 0 ? "Free" : `₹${orderData?.deliveryCharge}`}</span>
        </div>
        
        <hr className="my-4" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{orderData?.totalPrice}</span>
        </div>
        
        <div className="text-green-600 text-sm">
          You save ₹{orderData?.totalDiscountPrice + (orderData?.couponAmount || 0)}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <h3 className="font-medium text-gray-800 mb-2">Delivery Address</h3>
        <p className="text-sm text-gray-600">
          {orderData?.shippingAddress?.address1}, {orderData?.shippingAddress?.city}, {orderData?.shippingAddress?.country}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Payment);



