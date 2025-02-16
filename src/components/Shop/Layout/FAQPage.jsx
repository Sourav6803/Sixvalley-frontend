import React, { useState } from "react";

const FAQPage = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // FAQ data based on the image
  const faqData = [
    { question: "What are the documents required to start selling on Jamalpur Bazar ?", answer: "To start selling on Jamalpur Bazar , you need documents such as a GSTIN, bank account details, and a PAN card." },
    { question: "What are the prerequisites for listing & cataloging your products to get onboarded with Jamalpur Bazar ?", answer: "Ensure high-quality product images and accurate descriptions are available before onboarding." },
    { question: "How much time does it take to get onboarded on Jamalpur Bazar ?", answer: "It typically takes 7-10 working days to complete the onboarding process." },
    { question: "What is the payment cycle at Jamalpur Bazar ?", answer: "Payments are processed every 14 days for all completed orders." },
    { question: "Does Jamalpur Bazar provide its own order management system?", answer: "Yes, Jamalpur Bazar provides a dedicated order management system for sellers." },
    { question: "What are the fulfillment channels at Jamalpur Bazar ?", answer: "Jamalpur Bazar supports self-fulfillment and warehouse-fulfillment channels." },
    { question: "What are the growth tools provided by Jamalpur Bazar ?", answer: "Jamalpur Bazar offers tools like promotional campaigns and analytics to help sellers grow." },
    { question: "How much have the sellers grown by using Jamalpur Bazar 's growth tools?", answer: "Sellers have reported growth of up to 300% using Jamalpur Bazar ’s growth tools." },
    { question: "Do I have to pay a registration charge to start selling on Jamalpur Bazar ?", answer: "No, there is no registration charge for selling on Jamalpur Bazar ." },
  ];

  // Handler to toggle FAQ item
  const toggleFAQ = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Limit the number of FAQs shown initially
  const visibleFAQs = showAll ? faqData : faqData.slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen p-4 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <div>
          {visibleFAQs.map((faq, index) => (
            <div key={index} className="border-b last:border-none">
              <button
                className="w-full text-left py-4 flex justify-between items-center group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-500 group-hover:text-gray-800">
                  <svg
                    className={`w-6 h-6 transition-transform transform ${
                      expandedIndexes.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </button>
              {expandedIndexes.includes(index) && (
                <div className="pl-4 pr-4 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Show More / Show Less */}
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
