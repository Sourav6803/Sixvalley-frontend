import React from "react";
import Hero from "../Layout/hero.jpg";
import BenefitsCard from "../BenifitsCard";
import { features } from "../Layout/SellerHero";
import Footer from "../Layout/Footer";


const SellOnline = () => {
  return (
    <>
      <div className="relative mt-5 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 py-16">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            {/* Text Section */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight animate-fade-in">
                Learn How to Sell Online
              </h1>
              <p className="mt-4 text-gray-600 lg:text-lg">
                Become a Jamalpur Bazar seller to start{" "}
                <span className="text-pink-500 font-semibold">
                  selling your products online at 0% commission
                </span>
                . Whether you have a GSTIN or not, we’ve got you covered. Start
                selling today with our seamless onboarding process!
              </p>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="bg-pink-100 text-pink-600 rounded-full px-4 py-1 text-sm font-medium">
                  New!
                </div>
                <p className="text-sm text-gray-500">
                  Don’t have a GSTIN? You can still sell on Jamalpur Bazar.{" "}
                  <a href="#learn-more" className="text-pink-500 underline">
                    Learn more
                  </a>
                </p>
              </div>
              <div className="mt-8 flex items-center border rounded-lg overflow-hidden shadow-md">
                <div className="flex items-center bg-gray-100 px-4">
                  <span className="text-gray-500 font-medium">+91</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Your Mobile Number"
                  className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
                />
                <button className="bg-pink-500 text-white px-6 py-2 font-medium hover:bg-pink-600 transition">
                  Start Selling
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative animate-slide-up">
              <img
                src={Hero}
                alt="Meesho Seller"
                className="w-full max-w-md lg:max-w-lg mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-pink-100 rounded-full blur-lg opacity-50 animate-bounce-slow"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-200 rounded-full blur-lg opacity-50 animate-bounce-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Start Selling In 4 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-pink-100 rounded-lg shadow-md p-6 text-center">
            <img
              src="https://myntrascmuistatic.myntassets.com/partner-assets/partners/images/landingpage/compressed/Register.png"
              alt="Register"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Register</h3>
            <p className="text-gray-700">
              Find all the onboarding requirements to create your account here.
            </p>
            {/* <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mt-4">
              Watch Video
            </button> */}
          </div>
          <div className="bg-yellow-100 rounded-lg shadow-md p-6 text-center">
            <img
              src="https://myntrascmuistatic.myntassets.com/partner-assets/partners/images/landingpage/compressed/Sell.png"
              alt="Sell"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Sell</h3>
            <p className="text-gray-700">
              Learn all about fulfillment models, platform integration &
              prerequisites for operational readiness here.
            </p>
            {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mt-4">
              Read More
            </button> */}
          </div>
          <div className="bg-green-100 rounded-lg shadow-md p-6 text-center ">
            <img
              src="https://myntrascmuistatic.myntassets.com/partner-assets/partners/images/landingpage/compressed/Earn.png"
              alt="Market"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Market</h3>
            <p className="text-gray-700">
              Discover effective marketing strategies to reach your target
              audience.
            </p>
            {/* <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-4">
              Explore Tips
            </button> */}
          </div>
          <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center">
            <img
              src="https://myntrascmuistatic.myntassets.com/partner-assets/partners/images/landingpage/compressed/Grow.png"
              alt="Support"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-gray-700">
              Get assistance and support to ensure your success on the platform.
            </p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4">
              Contact Us
            </button> */}
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Join thousands of satisfied sellers and start your journey today!
          </p>
        </div>
      </div>

      

      <section className="w-full mx-auto  mt-5 px-4 py-16 ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Why Sell on Jamalpur Bazar?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-primary text-5xl mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg text-gray-700 font-semibold mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BenefitsCard />

      <section className="bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
            How to Sell on Our Platform
          </h2>
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Register as a Seller
                </h3>
                <p className="text-gray-600">
                  Create an account and list the products you want to sell
                  online. All you need is an active bank account and your GSTIN
                  or UIN (if applicable). Once registered, access the supplier
                  panel to start selling to millions of customers.
                </p>
                <p className="text-gray-600 mt-2">
                  Enjoy a seamless registration process and join thousands of
                  sellers on our platform.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://truongnamlogistics.com/wp-content/uploads/2023/06/van-chuyen-seller-own-fleet-6.jpg"
                  alt="Register as a Seller"
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. Upload Catalog and Receive Orders
                </h3>
                <p className="text-gray-600">
                  Upload your product catalog to the supplier panel. You can
                  upload single or bulk catalogs. Once approved, your catalog
                  will go live within 72 hours, enabling you to receive orders
                  from customers across the country.
                </p>
                <p className="text-gray-600 mt-2">
                  Keep your catalog updated with the latest products to attract
                  more buyers.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://www.tmogroup.asia/wp-content/uploads/2023/08/Lack-of-Detailed-Product-Information1.png"
                  alt="Upload Catalog"
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. Shipping and Order Delivery
                </h3>
                <p className="text-gray-600">
                  We offer stress-free delivery services. Once you receive an
                  order, our logistics partner picks up the product from your
                  location and delivers it to the customer. Track your order
                  status on the supplier panel.
                </p>
                <p className="text-gray-600 mt-2">
                  Enjoy the lowest shipping costs and timely deliveries across
                  the country.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/013/795/093/non_2x/illustration-of-an-order-delivery-courier-handing-a-client-s-order-suitable-for-landing-page-flyers-infographics-and-other-graphic-related-assets-vector.jpg"
                  alt="Shipping"
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. Receive Payments
                </h3>
                <p className="text-gray-600">
                  Payments are securely deposited into your bank account every 7
                  days, including for Cash on Delivery orders. Monitor your
                  earnings and upcoming payments through the supplier panel.
                </p>
                <p className="text-gray-600 mt-2">
                  Transparency and security in payments ensure you can focus on
                  growing your business.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/images/group_1000001236.webp"
                  alt="Payments"
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 py-10 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              Jamalpur Bazar Supplier Support{" "}
              <span className="text-pink-500">Available 24/7</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Jamalpur Bazar supplier support is available to solve all your
              doubts and issues before and after you start your online selling
              business.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-pink-100 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 7.5L12 13.5m9.75-6v9a3 3 0 01-3 3H4.5a3 3 0 01-3-3v-9m20.25 0l-9.75 6m0 0L2.25 7.5m9.75 6V21"
                />
              </svg>
            </div>
            <p className="text-gray-600 mt-2 text-center md:text-left">
              You can reach out to{" "}
              <a
                href="mailto:sell@meesho.com"
                className="text-pink-500 font-semibold"
              >
                sell@jamalpurbazar.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SellOnline;
