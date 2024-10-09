import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { FaPaypal, FaCcMastercard, FaWallet } from "react-icons/fa6";

import { PiBankDuotone } from "react-icons/pi";
import { FaCreditCard } from 'react-icons/fa';
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState()
  const [payementProcessing, setPaymentProcessing] = useState(false)

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalCartPrice,
    couponCode: orderData?.couponCode,
    couponAmount: orderData?.couponAmount,

    // taxAmount: 10,
    deliveryCharge: orderData?.deliverCharge
  };


  const title = `New Order  Received`
  const content = `You have received a new order with the following items: ${order?.cart?.map(item => item.name).join(', ')}. Please prepare the order for shipping.`;
  const imageUrl = order?.cart?.map(item => item?.images[0].url)


  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };


  const paypalPaymentHandler = async (paymentInfo) => {
   

    try {
      // Set the loading state
      setPaymentProcessing(true);

      // Prepare payment info to be added to the order
      order.paymentInfo = {
        id: paymentInfo.payer_id,
        status: "succeeded",
        type: "Paypal",
      };



      // If successful, proceed with order completion actions
      setOpen(false);
      toast.success("Order successful!");

      // Clear cart and order data from localStorage
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));

      // Navigate to order success page
      navigate("/order/success");
    } catch (error) {
      // Handle errors, show an error toast, or any other error UI
      console.error("Payment failed: ", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      // Always reset the loading state
      setPaymentProcessing(false);
    }
  };


  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };


      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          setPaymentProcessing(true)

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
    finally {
      setPaymentProcessing(false); // Hide loading modal
    }
  };


  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add payment info for Cash on Delivery
    const updatedOrder = {
      ...order,
      paymentInfo: {
        type: "Cash On Delivery",
      },
    };

    setPaymentProcessing(true); // Start the loading state

    try {
      // Make the API request to create the order
      const response = await axios.post(`${server}/order/create-order`, updatedOrder, config);

      if (response.status === 201) {
        // Order successful
        toast.success("Order successful!");

        // Clear local storage items related to the order and cart
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));

        socketId.emit("notification", {
          title,
          content,
          imageUrl
        });

        // Close modal if any and redirect to success page
        setOpen(false);
        navigate("/order/success", { state: { order } });

        // Optional: Reload page if necessary to reset the state
        window.location.reload();
      } else {
        throw new Error("Something went wrong with the order.");
      }
    } catch (error) {
      // Display the error message to the user
      console.log(error.message)
      toast.error(error?.response?.data?.message || "Failed to create the order, please try again.");
    } finally {
      // Always stop the loading spinner, success or failure
      setPaymentProcessing(false);
    }
  };


  return (
    <div className="w-full flex flex-col items-center py-3">
      <LoadingModal loading={payementProcessing} />
      <div className="w-full 1000px:w-[70%] block 800px:flex p-1">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            orderData={orderData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

      </div>

      <footer className="bg-gray-800 text-white py-4 text-center w-full p-1">
        <p>© 2024 Your Company. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Us</span>
        </div>
      </footer>
    </div>
  );
};

const PaymentInfo = ({ orderData, user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
  paymentMethod,
  setPaymentMethod }) => {

  const [showPaymentOptions, setShowPaymentOptions] = useState({
    savedOptions: false,
    card: false,
    netBanking: false,
    wallet: false,
    upi: false,
    cod: false,
  });

  const toggleOption = (option) => {
    setShowPaymentOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Step 3 of 3: Payments</h2>
        <span className="text-xs text-gray-600">100% Secure</span>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-4 cursor-pointer" onClick={() => toggleOption("totalAmount")}>
        <div className="flex justify-between" >
          <span className="text-blue-600 font-medium">Total Amount</span>

          <span className="font-semibold text-xl">₹{orderData?.totalCartPrice}</span>
        </div>

        {showPaymentOptions.totalAmount && (
          <div className="w-full   rounded-md relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
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


      {/* Saved Payment Options */}
      {/* <div className="border-b py-2">
        <div className="flex">
          <span className="mr-2 mt-2"><IoTimerOutline /></span>
          <button
            onClick={() => toggleOption("savedOptions")}
            className="flex justify-between w-full text-gray-700 font-medium"
          >
            Saved Payment Options
            <span>{showPaymentOptions.savedOptions ? "▲" : "▼"}</span>
          </button>
        </div>
        {showPaymentOptions.savedOptions && (
          <div className="pl-4 py-2 text-sm text-gray-600">No saved payment options</div>
        )}
      </div> */}

      {/* Credit/Debit/ATM Card Section */}
      <div className="border-b py-2">
        <div className="flex">
          <span className="mr-2 mt-2">
            <FaCcMastercard />
          </span>
          <button
            onClick={() => toggleOption("card")}
            className="flex justify-between w-full text-gray-700 font-medium"
          >
            Credit / Debit / ATM Card
            <span>{showPaymentOptions.card ? "▲" : "▼"}</span>
          </button>
        </div>
        <p className="text-gray-500 text-[10px] mr-10 ">Add and secure cards as per RBI guidelines</p>

        {showPaymentOptions.card && (
          <div className="pl-4 py-2">
            <p className="text-sm text-gray-600">Add your card details</p>
            {/* Card Form */}
            <div className="mt-2">
              
              <CardNumberElement
                className={`w-full p-2 mb-2 border rounded-lg`}
                placeholder="Card Number"
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      lineHeight: 1.5,

                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",

                    },
                  },
                }}
              />

              <CardExpiryElement
                className={`w-full p-2 mb-2 border rounded-lg`}
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      lineHeight: 1.5,
                      // color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        // color: "#444",
                        fontSize: "14px",
                      },
                    },
                  },
                }}
              />

              <CardCvcElement
                className={`w-full p-2 border rounded-lg`}
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      lineHeight: 1.5,
                      // color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        // color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>


            <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-md">
              Pay ₹{orderData?.totalCartPrice}
            </button>
          </div>
        )}
      </div>

      {/* paypal */}
      <div className="border-b py-2">
        <div className="flex item-center justify-center">
          <span className="mr-2 mt-2">
            <FaPaypal />
          </span>

          <button
            onClick={() => toggleOption("paypal")}
            aria-expanded={showPaymentOptions.paypal}
            aria-controls="paypal-options"
            className="flex justify-between w-full text-gray-700 font-medium"
          >

            Paypal
            <span>{showPaymentOptions.paypal ? "▲" : "▼"}</span>
          </button>
        </div>

        {showPaymentOptions.paypal && (
          <div className="w-full flex border-b" id="paypal-options">
            <div
              className="bg-yellow-400 flex items-center justify-center w-full mt-3 text-[#090909] h-[38px] rounded-[5px] cursor-pointer text-[16px] font-[600]"
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>

            {open && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                {/* Modal Background */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpen(false)} // Close modal when clicking outside
                />

                {/* Modal Content */}
                <div
                  className="relative bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl p-6 z-20"
                  style={{ maxHeight: '90vh' }}
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross1 size={24} />
                  </button>

                  {/* Modal Header */}
                  <h2 className="text-xl font-semibold text-center mb-4">Complete Your Payment</h2>

                  {/* PayPal Buttons */}
                  <div className="w-full">
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>


      {/* Wallets */}
      <div className="border-b py-2">
        <div className="flex">
          <span className="mr-2 mt-2">
            <FaWallet />
          </span>
          <button
            onClick={() => toggleOption("wallet")}
            className="flex justify-between w-full text-gray-700 font-medium"
          >
            Wallets
            <span>{showPaymentOptions.wallet ? "▲" : "▼"}</span>
          </button>
        </div>
        {showPaymentOptions.wallet && (
          <div className="pl-4 py-2 text-sm text-gray-600">No wallet options available</div>
        )}
      </div>

      {/* UPI */}
      <div className="border-b py-2">
        <div className="flex">
          <span className="mt-2 mr-2">
            <FaCreditCard />
          </span>
          <button
            onClick={() => toggleOption("upi")}
            className="flex justify-between w-full text-gray-700 font-medium"
          >
            UPI
            <span>{showPaymentOptions.upi ? "▲" : "▼"}</span>
          </button>
        </div>

        {showPaymentOptions.upi && (
          <div className="pl-4 py-2 text-sm text-gray-600">Enter your UPI ID</div>
        )}
      </div>

      {/* Cash on Delivery */}
      <div className="py-2">
        <div className="flex">
          <span className="mt-2 mr-2">
            <PiBankDuotone />
          </span>
          <button
            onClick={() => toggleOption("cod")}
            className="flex justify-between w-full text-gray-700 font-medium"
          >
            Cash on Delivery
            <span>{showPaymentOptions.cod ? "▲" : "▼"}</span>
          </button>
        </div>

        {showPaymentOptions.cod && (

          (
            <div className="w-full flex">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <p className="text-sm text-gray-600">Pay when your order arrives.</p>
                <input
                  type="submit"
                  value="Place Order with COD"
                  className={` bg-yellow-400 w-full mt-3 text-[#090909] h-[38px] rounded-[5px] cursor-pointer text-[16px] font-[600]`}
                />
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Payment;

const LoadingModal = ({ loading }) => {
  if (!loading) return null; // Return null when loading is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
            ></path>
          </svg>
          <p className="text-gray-700 text-lg font-semibold">Processing your order...</p>
        </div>
      </div>
    </div>
  );
};






// const PaymentInfo = ({
//   user,
//   open,
//   setOpen,
//   onApprove,
//   createOrder,
//   paymentHandler,
//   cashOnDeliveryHandler,
//   orderData,
//   paymentMethod,
//   setPaymentMethod

// }) => {
//   const [select, setSelect] = useState(null);

//   return (


//     <div className="w-full 800px:w-[100%%] bg-[#fff] rounded-md py-4 px-4 pb-2">
//       {/* select buttons */}
//       <div>



//         <div className="w-full 800px:w-[95%] bg-[#e8e4e4] rounded-md p-5 pb-2">
//           <div className="flex items-center justify-between ">
//             <h5 className="text-[18px] font-[500]">Shipping Address</h5>

//           </div>


//           {orderData?.shippingAddress ? (
//             <div className="flex items-center justify-between gap-1 mt-2">
//               <div>
//                 <p>Deliver to: {orderData.user?.name?.length > 8 ? orderData.user?.name?.slice(0, 8) : orderData.user.name}, {orderData.shippingAddress.zipCode}</p>
//                 <p className="text-slate-500">
//                   {orderData.shippingAddress.address1}, {orderData.shippingAddress.address2}, {orderData.shippingAddress.city}
//                 </p>
//                 <p>{orderData.user?.phoneNumber ? orderData.user?.phoneNumber : "7908104000 "} </p>
//               </div>


//             </div>
//           ) : (
//             <p className="text-red-600">No addresses found. Please add a new address.</p>
//           )}
//         </div>

//         <div className="flex  w-full pb-5 border-b mb-2 mt-5">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(1)}
//           >
//             {select === 1 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[16px] pl-4 font-[600] text-[#000000b1]">
//             Pay with Debit/credit card
//           </h4>
//         </div>

//         {/* pay with card */}
//         {select === 1 ? (
//           <div className="w-full flex border-b ">
//             <form className="w-full" onSubmit={paymentHandler}>
//               <div className="w-full flex pb-3">
//                 <div className="w-[50%]">
//                   <label className="block pb-2">Name On Card</label>
//                   <input
//                     required
//                     placeholder={user && user.name}
//                     className={`${styles.input} !w-[95%] text-[#605f5f] text-[16px]`}
//                     value={user && user.name}
//                   />
//                 </div>
//                 <div className="w-[50%]">
//                   <label className="block pb-2">Exp Date</label>
//                   <CardExpiryElement
//                     className={`${styles.input}`}
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "16px",
//                           lineHeight: 1.5,
//                           color: "#444",
//                         },
//                         empty: {
//                           color: "#3a120a",
//                           backgroundColor: "transparent",
//                           "::placeholder": {
//                             color: "#444",
//                             fontSize: "16px",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="w-full flex pb-3">
//                 <div className="w-[50%]">
//                   <label className="block pb-2">Card Number</label>
//                   <CardNumberElement
//                     className={`${styles.input} !h-[35px] !w-[95%]`}
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "14px",
//                           lineHeight: 1.5,
//                           color: "#444",
//                         },
//                         empty: {
//                           color: "#3a120a",
//                           backgroundColor: "transparent",
//                           "::placeholder": {
//                             color: "#444",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//                 <div className="w-[50%]">
//                   <label className="block pb-2">CVV</label>
//                   <CardCvcElement
//                     className={`${styles.input} !h-[35px]`}
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "14px",
//                           lineHeight: 1.5,
//                           color: "#444",
//                         },
//                         empty: {
//                           color: "#3a120a",
//                           backgroundColor: "transparent",
//                           "::placeholder": {
//                             color: "#444",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
//               <input
//                 type="submit"
//                 value="Pay Now"
//                 className={`${styles.button} !bg-[#f63b60] mb-3 text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               />
//             </form>

//           </div>
//         ) : null}
//       </div>


//       {/* paypal payment */}
//       <div>
//         <div className="flex w-full pb-5 border-b mt-2 mb-2">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(2)}
//           >
//             {select === 2 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[16px] pl-4 font-[600] text-[#000000b1]">
//             Pay with Paypal
//           </h4>
//         </div>

//         {/* pay with payement */}
//         {select === 2 ? (
//           <div className="w-full flex border-b">
//             <div
//               className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               onClick={() => setOpen(true)}
//             >
//               Pay Now
//             </div>
//             {open && (
//               <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
//                 <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
//                   <div className="w-full flex justify-end p-3">
//                     <RxCross1
//                       size={30}
//                       className="cursor-pointer absolute top-3 right-3"
//                       onClick={() => setOpen(false)}
//                     />
//                   </div>
//                   <PayPalScriptProvider
//                     options={{
//                       "client-id":
//                         "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
//                     }}
//                   >
//                     <PayPalButtons
//                       style={{ layout: "vertical" }}
//                       onApprove={onApprove}
//                       createOrder={createOrder}
//                     />
//                   </PayPalScriptProvider>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : null}
//       </div>


//       {/* cash on delivery */}
//       <div>
//         <div className="flex w-full pb-5 border-b mb-2">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(3)}
//           >
//             {select === 3 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[16px] pl-4 font-[600] text-[#000000b1]">
//             Cash on Delivery
//           </h4>
//         </div>

//         {/* cash on delivery */}
//         {select === 3 ? (
//           <div className="w-full flex">
//             <form className="w-full" onSubmit={cashOnDeliveryHandler}>
//               <input
//                 type="submit"
//                 value="Confirm"
//                 className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               />
//             </form>
//           </div>
//         ) : null}
//       </div>
//     </div>

//   );
// };
