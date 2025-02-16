import React from "react";
import Hero from "./hero.jpg";

import Navbar from "./Navbar";
import BenefitsCard from "../BenifitsCard";

import FAQPage from "./FAQPage";
import Slider from "./Slider";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import UploadCatalogSection from "../welcome/UploadCatalogSection";



const SellerHero = () => {
  const navigate = useNavigate()
  return (
    <div className="font-sans bg-gray-50 relative mt-10">
      <Navbar />

      {/* Hero Section */}

      <div className="relative bg-gray-50 overflow-hidden">
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
                <button onClick={()=> navigate("/shop-create")} className="bg-pink-500 text-white px-6 py-2 font-medium hover:bg-pink-600 transition">
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

      <UploadCatalogSection />

      {/* Features Section */}

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

      <Slider />

      {/* <Testimonials /> */}

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 bg-gray-50 rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold mb-4">
              1
            </div>
            <h3 className="font-bold text-lg mb-2">Create Account</h3>
            <p className="text-gray-500 text-sm">
              All you need is:
              <br />
              <span className="text-pink-500">• GSTIN</span> or Enrolment ID /
              UIN <br />
              <span className="text-pink-500">• Bank Account</span>
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold mb-4">
              2
            </div>
            <h3 className="font-bold text-lg mb-2">List Products</h3>
            <p className="text-gray-500 text-sm">
              List the products you want to sell in your supplier panel.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold mb-4">
              3
            </div>
            <h3 className="font-bold text-lg mb-2">Get Orders</h3>
            <p className="text-gray-500 text-sm">
              Start getting orders from crores of Indians actively shopping on
              our platform.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold mb-4">
              4
            </div>
            <h3 className="font-bold text-lg mb-2">Lowest Cost Shipping</h3>
            <p className="text-gray-500 text-sm">
              Products are shipped to customers at lowest costs.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold mb-4">
              5
            </div>
            <h3 className="font-bold text-lg mb-2">Receive Payments</h3>
            <p className="text-gray-500 text-sm">
              Payments are deposited directly to your bank account following a
              7-day payment cycle.
            </p>
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

      <FAQPage />

      <Footer />
    </div>
  );
};

export const  features = [
  {
    icon: "🚀",
    title: "0% Commission",
    description: "Sell at zero commission and maximize your profit.",
  },
  {
    icon: "🛡️",
    title: "Secure Payments",
    description: "Receive payments within 7 days securely.",
  },
  {
    icon: "📈",
    title: "45+ Crore Reach",
    description: "Tap into a massive customer base nationwide.",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "Get support anytime you need it.",
  },
  {
    icon: "💼",
    title: "Easy Onboarding",
    description: "Get started without GST or heavy documentation.",
  },
  {
    icon: "🎉",
    title: "Access Sales Events",
    description: "Participate in exclusive sale days to boost your sales.",
  },
];

export default SellerHero;
