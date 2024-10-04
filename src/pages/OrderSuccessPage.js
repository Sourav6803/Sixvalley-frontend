import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/Animation/animation_lnb4mz5t.json";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Header />
      <div className="flex-grow">
        <Success />
      </div>
      <Footer />
    </div>
  );
};

const Success = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Get the order data from location state

  const address = order?.shippingAddress;
  const user = order?.user;
  const orderDate = new Date().toLocaleDateString(); // Example order date
  const deliveryDate = calculateExpectedDelivery(); // Placeholder function for expected delivery

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-10 px-5">
      {/* Animation */}
      <div className="mb-8">
        <Lottie options={defaultOptions} width={250} height={250} />
      </div>

      {/* Success Message */}
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Your order is successful! 🎉
      </h1>
      <p className="text-center text-lg text-gray-600 mb-6">
        Thank you for shopping with us! Your order will be processed within the next 24 hours. You will receive an email confirmation once your order is shipped.
      </p>

      {/* Order Details */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
        <p className="text-gray-700">
          <strong>Order Date:</strong> {orderDate}
        </p>
        <p className="text-gray-700">
          <strong>Expected Delivery:</strong> {deliveryDate}
        </p>
        <div className="mb-4 mt-4">
          <p className="text-gray-700">
            <strong>Deliver to:</strong> {user?.name}
          </p>
          <p className="text-gray-500">
            {address?.address1}, {address?.address2}, {address?.city}
          </p>
          <p className="text-gray-500">Pincode: {address?.zipCode}</p>
          <p className="text-gray-500">
            Phone Number: {user?.phoneNumber || "7908104000"}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        {/* Map through order items (assuming array of items exists) */}
        {/* <ul className="space-y-4">
          {order?.items?.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-700">
              <span>{item.name} (x{item.qty})</span>
              <span>₹{item.price * item.afterDiscountPrice}</span>
            </li>
          ))}
        </ul> */}
        <div className="border-t border-gray-300 mt-4 pt-4 text-lg">
          <p className="flex justify-between text-gray-800">
            <strong>Total:</strong> <span>₹{order?.totalPrice || 0}</span>
          </p>
        </div>
      </div>

      {/* Security & Info */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Security & Order Tracking
        </h2>
        <p className="text-gray-600">
          We value your privacy and security. All transactions are encrypted for your safety. You can track your order through the order tracking link sent to your email.
        </p>
      </div>

      {/* Customer Support */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-left mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Need Help?
        </h2>
        <p className="text-gray-600">
          If you have any questions or need further assistance, feel free to reach out to our customer support team at{" "}
          <a
            href="mailto:support@store.com"
            className="text-blue-600 hover:underline"
          >
            support@store.com
          </a>{" "}
          or call us at{" "}
          <a href="tel:1234567890" className="text-blue-600 hover:underline">
            +1 234 567 890
          </a>.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex space-x-4 mt-8">
        <button onClick={()=>navigate("/")} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
          Continue Shopping
        </button>
        <button onClick={()=>navigate("/user/order")} className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300">
          View Order
        </button>
      </div>
    </div>
  );
};

// Placeholder function for expected delivery date calculation
function calculateExpectedDelivery() {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7); // Assuming a 5-day delivery window
  return deliveryDate.toLocaleDateString();
}

export default OrderSuccessPage;
