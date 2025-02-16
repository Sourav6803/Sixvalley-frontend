import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: 1,
    title: "Get Enrolment ID/UIN",
    description:
      "Get Enrolment ID/UIN from here if you don’t have GSTIN. Otherwise, use your Composition GSTIN.",
    linkText: "here",
  },
  {
    id: 2,
    title: "Sign up for free",
    description:
      "Register as a Jamalpur Bazar Seller. All you need is an active bank account and Enrolment ID / UIN (for sellers without GSTIN) or GSTIN (for GSTIN sellers).",
    linkText: "Register",
  },
  {
    id: 3,
    title: "Upload your product & catalog",
    description:
      "After completing the registration, upload your product catalog on the Jamalpur Bazar Supplier Panel.",
  },
  {
    id: 4,
    title: "Receive & Ship Orders",
    description: "Jamalpur Bazar charges the lowest shipping cost for deliveries.",
  },
  {
    id: 5,
    title: "Receive Payments",
    description:
      "Payment is securely deposited directly to your bank account on Jamalpur Bazar following a 7-day payment cycle from order delivery, including Cash on Delivery orders.",
  },
];

const ShippingReturn = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const faqs = [
    {
      question: "I have a Composition GSTIN. Can I sell on Jamalpur Bazar?",
      answer: "Yes, you can sell on Jamalpur Bazar with a Composition GSTIN.",
    },
    {
      question:
        "I don’t have a GSTIN but I want to sell on Jamalpur Bazar. How do I register?",
      answer:
        "You can register on Jamalpur Bazar without a GSTIN, but it may be required for certain categories or products.",
    },
    {
      question: "How do I get my Enrolment ID or UIN?",
      answer:
        "You can obtain your Enrolment ID or UIN by applying through your local tax office or online GST portal.",
    },
    {
      question:
        "In which states can I sell without GSTIN or with Composition GSTIN?",
      answer:
        "The rules vary by state. Please check your state’s GST regulations to confirm eligibility.",
    },
    {
      question:
        "What are the turnover restrictions for Enrolment ID / UIN and Composition GSTIN sellers?",
      answer:
        "Turnover restrictions depend on the GST composition scheme rules. Generally, it is for businesses with turnover under ₹1.5 crores.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <>
      <section className="bg-gray-50 py-16 mt-[50px] ">
        <div className="lg:w-[90%] container mx-auto px-10 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              <span className="text-pink-600 font-semibold">No GSTIN?</span> No
              Worries!
            </h1>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              <span className="text-pink-600 font-semibold">
                Composition GSTIN?
              </span>{" "}
              No Worries!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              Whether you're a big business or a small one, now sell to millions
              in your state,{" "}
              <span className="text-pink-600 font-semibold">
                without a Regular GSTIN
              </span>{" "}
            </p>

            <div className="flex items-center mt-10 text-[18px] gap-x-8 ">
              <div  onClick={() => navigate("/shop-create")}>
                <button
                 
                  className="rounded-md p-3 bg-pink-500 text-white"
                >
                  Register Now
                </button>
              </div>

              <div>Start Selling</div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <img
              src="https://supplier.meesho.com/images/non_gst_banner.png"
              alt="0% Commission"
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:ml-auto"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-pink-50 -z-10 transform rotate-6 rounded-full"></div>
          </div>
        </div>
      </section>
      

      <div className="bg-gray-50 py-10 px-5 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Opportunity for Sellers without a GSTIN or having a Composition
            GSTIN
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            Jamalpur Bazar welcomes sellers without a GSTIN or having a
            Composition GSTIN to sign up and begin selling to lakhs of customers
            within their own state.
          </p>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            For sellers not registered under GST, it's necessary to possess an
            enrollment ID or UIN for the registration process. If you haven't
            obtained your Enrolment ID or UIN yet, you can apply for it{" "}
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              here
            </a>{" "}
            and proceed to{" "}
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              register
            </a>{" "}
            on Jamalpur Bazar .
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-10 px-5 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Suppliers Love Jamalpur Bazar
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-6">
              All the benefits that come with selling on Jamalpur Bazar are designed to
              help you sell more, and make it easier to grow your business.
            </p>
            <button  onClick={() => navigate("/shop-create")} className="bg-pink-500 text-white text-lg font-medium py-3 px-6 rounded-lg shadow-md hover:bg-pink-600 transition">
              Register Now
            </button>
            <span className="ml-3 text-gray-700 text-lg">
              and Start Selling
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/?size=100&id=IdpWzz5JaWwu&format=png&color=000000"
                    alt="0% Commission Fee"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    0% Commission Fee
                  </h3>
                  <p className="text-gray-600">
                    Suppliers selling on Jamalpur Bazar keep 100% of their profit by not
                    paying any commission.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Fine-law-and-order-smashingstocks-flat-smashing-stocks.png"
                    alt="0 Penalty Charges"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    0 Penalty Charges
                  </h3>
                  <p className="text-gray-600">
                    Sell online without the fear of order cancellation charges
                    with 0 penalty for late dispatch or cancellations.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/pulsar-gradient/48/growth.png"
                    alt="Growth for Every Supplier"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Growth for Every Supplier
                  </h3>
                  <p className="text-gray-600">
                    From small to large and unbranded to branded, all suppliers
                    have grown their businesses on Jamalpur Bazar.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/color-glass/48/device-shop.png"
                    alt="Ease of Doing Business"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Ease of Doing Business
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>Easy Product Listing</li>
                    <li>Lowest Cost Shipping</li>
                    <li>7-Day Payment Cycle from the delivery date</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Become a Seller on Jamalpur Bazar in simple steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-pink-500 font-bold text-3xl mb-4">
                  {step.id}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">
                  {step.description.split(step.linkText).map((text, index) => (
                    <React.Fragment key={index}>
                      {text}
                      {index <
                        step.description.split(step.linkText).length - 1 && (
                        <a
                          href="#"
                          className="text-pink-500 underline hover:text-pink-600"
                        >
                          {step.linkText}
                        </a>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Commonly Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 bg-white text-left focus:outline-none hover:bg-gray-100 transition duration-300"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-600 transform transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    activeIndex === index
                      ? "max-h-screen p-4 bg-gray-50"
                      : "max-h-0"
                  } overflow-hidden`}
                >
                  <p className="text-gray-700 text-base">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingReturn;
