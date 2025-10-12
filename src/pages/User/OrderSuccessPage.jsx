// import React from "react";
// import Footer from "../../components/Layout/Footer";
// import Header from "../../components/Layout/Header";
// import Lottie from "react-lottie";
// import animationData from "../../Assests/Animation/animation_lnb4mz5t.json";
// import { useLocation, useNavigate } from "react-router-dom";

// const OrderSuccessPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-50">
//       <Header />
//       <div className="flex-grow">
//         <Success />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// const Success = () => {



//   const { state } = useLocation();
//   const orders = state.orders;

//   const address = orders[0]?.shippingAddress;
//   const user = orders[0]?.user;
//   const orderDate = new Date().toLocaleDateString(); // Example order date
//   const deliveryDate = calculateExpectedDelivery(); // Placeholder function for expected delivery

//   const defaultOptions = {
//     loop: false,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   const navigate = useNavigate()

//   return (
//     <div className="flex flex-col items-center justify-center py-10 px-5">
//       {/* Animation */}
//       <div className="mb-8">
//         <Lottie options={defaultOptions} width={250} height={250} />
//       </div>

//       {/* Success Message */}
//       <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
//         Your order is successful! 🎉
//       </h1>
//       <p className="text-center  text-gray-600 mb-6">
//         Thank you for shopping with us! Your order will be processed within the next 24 hours. You will receive an email confirmation once your order is shipped.
//       </p>

//       {/* Order Details */}
//       {
//         orders?.map((order) => (
//           <div key={order?._id} className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
//             {console.log(order)}
//             <p className="text-gray-700">
//               <strong>Order Date:</strong> {order.createdAt}
//             </p>
//             <p className="text-gray-700">
//               <strong>Expected Delivery:</strong> {deliveryDate}
//             </p>
//             <div className="mb-4 mt-4">
//               <p className="text-gray-700">
//                 <strong>Deliver to:</strong> {user?.name}
//               </p>
//               <p className="text-gray-500">
//                 {address?.address1}, {address?.address2}, {address?.city}
//               </p>
//               <p className="text-gray-500">Pincode: {address?.zipCode}</p>
//               <p className="text-gray-500">
//                 Phone Number: {user?.phoneNumber || "7908104000"}
//               </p>
//             </div>
//           </div>
//         ))
//       }
//       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
//         <p className="text-gray-700">
//           <strong>Order Date:</strong> {orderDate}
//         </p>
//         <p className="text-gray-700">
//           <strong>Expected Delivery:</strong> {deliveryDate}
//         </p>
//         <div className="mb-4 mt-4">
//           <p className="text-gray-700">
//             <strong>Deliver to:</strong> {user?.name}
//           </p>
//           <p className="text-gray-500">
//             {address?.address1}, {address?.address2}, {address?.city}
//           </p>
//           <p className="text-gray-500">Pincode: {address?.zipCode}</p>
//           <p className="text-gray-500">
//             Phone Number: {user?.phoneNumber || "7908104000"}
//           </p>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
//         {/* Map through order items (assuming array of items exists) */}
//         {/* <ul className="space-y-4">
//           {order?.items?.map((item, index) => (
//             <li key={index} className="flex justify-between text-gray-700">
//               <span>{item.name} (x{item.qty})</span>
//               <span>₹{item.price * item.afterDiscountPrice}</span>
//             </li>
//           ))}
//         </ul> */}
//         <div className="border-t border-gray-300 mt-4 pt-4 text-lg">
//           <p className="flex justify-between text-gray-800">
//             <strong>Total:</strong> <span>₹{orders?.totalPrice || 0}</span>
//           </p>
//         </div>
//       </div>

//       {/* Security & Info */}
//       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Security & Order Tracking
//         </h2>
//         <p className="text-gray-600">
//           We value your privacy and security. All transactions are encrypted for your safety. You can track your order through the order tracking link sent to your email.
//         </p>
//       </div>

//       {/* Customer Support */}
//       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Need Help?
//         </h2>
//         <p className="text-gray-600">
//           If you have any questions or need further assistance, feel free to reach out to our customer support team at{" "}
//           <a
//             href="mailto:support@store.com"
//             className="text-blue-600 hover:underline"
//           >
//             support@store.com
//           </a>{" "}
//           or call us at{" "}
//           <a href="tel:1234567890" className="text-blue-600 hover:underline">
//             +1 234 567 890
//           </a>.
//         </p>
//       </div>

//       {/* CTA Buttons */}
//       <div className="flex space-x-4 mt-8">
//         <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
//           Continue Shopping
//         </button>
//         <button onClick={() => navigate("/user/order")} className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300">
//           View Order
//         </button>
//       </div>
//     </div>
//   );
// };

// // Placeholder function for expected delivery date calculation
// function calculateExpectedDelivery() {
//   const deliveryDate = new Date();
//   deliveryDate.setDate(deliveryDate.getDate() + 7); // Assuming a 5-day delivery window
//   return deliveryDate.toLocaleDateString();
// }

// export default OrderSuccessPage;



import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../../Assests/Animation/animation_lnb4mz5t.json";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaBox, FaShippingFast, FaHeadset, FaShieldAlt, FaHome, FaListAlt } from "react-icons/fa";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="flex-grow">
        <Success />
      </div>
      <Footer />
    </div>
  );
};

const Success = () => {
  const { state } = useLocation();
  const orders = state?.orders || [];
  console.log("orders", orders)
  
  // Fallback data in case state isn't passed
  const address = orders[0]?.shippingAddress || {
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    zipCode: "10001"
  };
  
  const user = orders[0]?.user || {
    name: "John Doe",
    phoneNumber: "7908104000"
  };
  
  const orderDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const deliveryDate = calculateExpectedDelivery();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <FaCheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Thank you for your purchase! We're preparing your order and will notify you when it's on its way.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaBox className="mr-2" /> Order Summary
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order?._id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order?._id?.substring(0, 8) || "N/A"}</p>
                          <p className="text-sm text-gray-500">Placed on {orderDate}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          Processing
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Items</p>
                          <p className="text-gray-900">{order?.items?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Amount</p>
                          <p className="text-lg font-bold text-blue-600">₹{order?.totalPrice || 0}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No order details available</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    ₹{orders.reduce((total, order) => total + (order?.totalPrice || 0), 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaShippingFast className="mr-2" /> Delivery Information
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-gray-700 mt-1">
                      {address?.address1}, {address?.address2}
                    </p>
                    <p className="text-gray-700">{address?.city}, {address?.zipCode}</p>
                    <p className="text-gray-700 mt-2">
                      <strong>Phone:</strong> {user?.phoneNumber || "7908104000"}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Timeline</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Order Placed</span>
                      <span className="text-sm text-gray-500">{orderDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Expected Delivery</span>
                      <span className="text-sm font-medium text-green-600">{deliveryDate}</span>
                    </div>
                    
                    <div className="mt-4 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Order processed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Support & Actions */}
        <div className="space-y-6">
          {/* Support Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaHeadset className="mr-2" /> Need Help?
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Our customer support team is here to help with any questions about your order.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
                    <FaHeadset className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Call Support</p>
                    <p className="text-sm text-gray-500">+1 234 567 890</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-500">support@store.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
                    <FaShieldAlt className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Safe & Secure</p>
                    <p className="text-sm text-gray-500">SSL Encrypted Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Next Steps</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Check your email</p>
                    <p className="text-sm text-gray-500">We've sent your order confirmation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Track your order</p>
                    <p className="text-sm text-gray-500">Monitor delivery status in real-time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Enjoy your products</p>
                    <p className="text-sm text-gray-500">Let us know about your experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-6xl">
        <button 
          onClick={() => navigate("/")}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
        >
          <FaHome className="mr-2" /> Continue Shopping
        </button>
        <button 
          onClick={() => navigate("/user/order")}
          className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-4 rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
        >
          <FaListAlt className="mr-2" /> View Orders
        </button>
      </div>

      {/* Additional Information */}
      <div className="w-full max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaShieldAlt className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
          </div>
          <p className="text-gray-600">
            Your payment information is processed securely. We do not store your credit card details.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaShippingFast className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
          </div>
          <p className="text-gray-600">
            We partner with trusted logistics providers to ensure your order arrives on time.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaHeadset className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Easy Returns</h3>
          </div>
          <p className="text-gray-600">
            Not satisfied? We offer a 30-day return policy for most items in original condition.
          </p>
        </div>
      </div>
    </div>
  );
};

// Calculate expected delivery date
function calculateExpectedDelivery() {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  return deliveryDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default OrderSuccessPage;