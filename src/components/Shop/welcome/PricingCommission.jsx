import React from "react";
import { motion } from "framer-motion";
import calender from "./3d-calendar.png";
import payment from "./secure-payment.png";
import { useNavigate } from "react-router-dom";

const PricingCommission = () => {
  const navigate = useNavigate();
  const features = [
    {
      id: 1,
      icon: "https://supplier.meesho.com/images/icon-14.svg", // Update with actual icon path
      title: "No Registration Fee",
      description:
        "Registering as a Jamalpur Bazar seller is free — no cost for creating your account or getting your products listed.",
    },
    {
      id: 2,
      icon: "https://supplier.meesho.com/images/icon-15.svg", // Update with actual icon path
      title: "No Collection Fee",
      description:
        "You keep 100% of the sale price with no charges on both payment gateway or cash-on-delivery orders on Jamalpur Bazar.",
    },
    {
      id: 3,
      icon: "https://supplier.meesho.com/images/icon-16.svg", // Update with actual icon path
      title: "No Penalty",
      description:
        "Sell on Jamalpur Bazar stress-free without the fear of penalties for order cancellations.",
    },
  ];
  return (
    <>
      <section className="bg-gray-50 py-16 mt-[40px] ">
        <div className="lg:w-[90%] container mx-auto px-10 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Pricing & Commission
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              Jamalpur Bazar offers{" "}
              <span className="text-pink-600 font-semibold">0% Commission</span>{" "}
              across all categories, making it the most profitable platform for
              you to sell online.
            </p>
            <div className="bg-pink-100 inline-block text-pink-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              New!
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Don't have a GSTIN or have a Composition GSTIN? You can still sell
              on Jamalpur Bazar. Click{" "}
              <a href="#" className="text-pink-600 font-semibold underline">
                here
              </a>{" "}
              to know more.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1">
                <label htmlFor="mobile" className="sr-only">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="mobile"
                    placeholder="Enter Your Mobile Number"
                    className="w-full border border-gray-300 rounded-md py-2 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
                    +91
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/shop-create")}
                className="bg-pink-600 text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-pink-700 transition duration-300 w-full sm:w-auto"
              >
                Start Selling
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <img
              src="https://supplier.meesho.com/images/banner-4-p-800.png"
              alt="0% Commission"
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:ml-auto"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-pink-50 -z-10 transform rotate-6 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Jamalpur Bazar?
            </h2>
            <p className="text-gray-600 text-lg">
              Empowering sellers with a transparent, hassle-free, and rewarding
              experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container md:w-[90%] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-3 items-center">
            {/* Left Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Payment Cycle
              </h2>
              <p className="text-gray-600 text-lg">
                The settlement amount is securely deposited directly into your
                bank account following a 7-day payment cycle from order
                delivery, including cash on delivery orders. You can view your
                deposited balance and the upcoming payments on the Jamalpur
                Bazar Supplier Panel.
              </p>
            </div>

            {/* grid sm:grid-cols-3 gap-6  shadow-lg rounded-lg p-6 w-full max-w-md */}

            {/* Right Card Section */}
            <div className="flex justify-center py-8">
              <div className="flex items-center justify-between border gap-3 shadow-lg rounded-lg p-4  w-full max-w-md bg-gradient-to-r from-gray-50 via-white to-gray-50">
                {/* Card 1 */}
                <div className="flex flex-col items-center w-1/2 h-full border border-gray-300 shadow-md  p-3 rounded-lg transition-transform transform hover:scale-105">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full mb-4 shadow-md">
                    <img
                      src={calender}
                      alt="7-day payment cycle"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    7-day payment cycle
                  </h3>
                </div>

                {/* Vertical Divider */}
                <div className="flex items-center justify-center">
                  <div className="w-1 h-full bg-gradient-to-b from-red-400 to-red-600 border border-slate-500 rounded-full"></div>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col items-center w-1/2 h-full border border-gray-200 shadow-md p-3 rounded-lg transition-transform transform hover:scale-105">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full mb-4 shadow-md">
                    <img
                      src={payment}
                      alt="Secured payment"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Secured payment in your account
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-10 px-5 md:px-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Quick Facts on Shipping & Delivery
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Learn about our seamless shipping, return policies, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Shipping Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="https://supplier.meesho.com/images/fact-1-p-500.png"
              alt="Shipping"
              className="w-48 h-48 object-contain mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Shipping
            </h2>
            <p className="text-gray-600 text-center">
              Jamalpur Bazar's shipping service allows you to focus on selling, while we
              take care of the delivery. You can sell your products to crores of
              customers and schedule delivery with local couriers.
            </p>
          </motion.div>

          {/* Return to Origin Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="https://supplier.meesho.com/images/Return.png"
              alt="Return to Origin"
              className="w-48 h-48 object-contain mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Return to Origin
            </h2>
            <p className="text-gray-600 text-center">
              The shipping partner will try three times to reach the customer.
              If the customer does not accept the product, it will be returned
              to you. Meesho does not charge a return shipping fee for any RTOs.
            </p>
          </motion.div>

          {/* Return Policy Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="https://supplier.meesho.com/images/fact-2.png"
              alt="Return Policy"
              className="w-48 h-48 object-contain mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Meesho Return Policy
            </h2>
            <p className="text-gray-600 text-center">
              The Jamalpur Bazar's Supplier Panel provides visibility for returns in real-
              time. Manage your returns effectively to reduce costs and ensure
              customer satisfaction.
            </p>
          </motion.div>

          {/* Cancellation Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="	https://supplier.meesho.com/images/Return.png"
              alt="Cancellation"
              className="w-48 h-48 object-contain mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cancellation Policy
            </h2>
            <p className="text-gray-600 text-center">
            Jamalpur Bazar's charges 0 penalties for supplier cancellations and auto
              cancellations. Focus on your business without worrying about
              penalties.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PricingCommission;
