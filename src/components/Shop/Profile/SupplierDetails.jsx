import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SupplierDetails = ({ completedSteps, onNext, onPrevious, onDataUpdate }) => {
  const [formData, setFormData] = useState({
    shopName: "",
    sellerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const steps = [
    { title: "Pickup Address", icon: "📦" },
    { title: "Bank Details", icon: "🏦" },
    { title: "Supplier Details", icon: "🏷️" },
    { title: "TAX Details", icon: "🧾" },
  ];

  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation: Ensure all fields are filled out and pincode is numeric
    const allFieldsFilled = Object.values({
      ...formData,
      [name]: value,
    }).every((field) => field.trim() !== "");

    setIsValid(allFieldsFilled );
  };

  const [faqs, setFaqs] = useState([
    {
      question: "What is a Supplier Name?",
      answer:
        "Supplier Name refers to the name of the supplier or the person responsible for managing the store's supply chain.",
      isOpen: false,
    },
    {
      question: "Why is Store Name important?",
      answer:
        "Store Name helps in identifying and managing the suppliers associated with the respective store in the database.",
      isOpen: false,
    },
  ]);

  const toggleFaq = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  console.log("formData--", formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Supplier Details Submitted:", formData);
    onDataUpdate(formData)

    onNext()
    // Add form submission logic or API integration here
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <div className="flex items-center gap-5 mb-6">
        <h1 className="lg:text-xl text-lg font-semibold text-gray-600">
          Complete Account Details
        </h1>
      </div>

      {/* Steps Section */}
      <div className="mt-6 lg:w-[50%]">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`md:w-10 w-8 md:h-10 h-8 flex items-center justify-center rounded-full ${
                  index < completedSteps
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <span className="mt-2 text-[10px] md:text-[12px]">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative flex items-center w-[90%] mx-auto">
          <div className="absolute inset-0 bg-gray-200 h-1 rounded"></div>
          <div
            className="absolute top-0 h-1 bg-orange-500 rounded"
            style={{
              width: `${(completedSteps / steps.length) * 100}%`,
            }}
          ></div>
          {steps.map((_, index) => (
            <div
              key={index}
              className="w-5 h-5 bg-white border-2 border-orange-500 rounded-full absolute"
              style={{
                left: `${(index / (steps.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Supplier Details Form */}
        <div className="lg:col-span-2">
          <h2 className="lg:text-xl text-lg font-semibold mb-6 text-gray-700">
            Supplier Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="storeName"
                  className="block text-sm font-medium mb-1"
                >
                  Store Name
                </label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md "
                  placeholder="Enter store name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="supplierName"
                  className="block text-sm font-medium mb-1"
                >
                  Supplier Name
                </label>
                <input
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md "
                  placeholder="Enter supplier name"
                  required
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8 flex justify-end gap-2">
              <button
                className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                    
                `}
                onClick={onPrevious}
                
              >
                <FaArrowLeft />
                Prev
              </button>
              <button
                className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  isValid
                    ? "bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                    : "bg-gray-300 cursor-not-allowed opacity-70"
                }`}
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            FAQs about Supplier Details
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="  rounded-md p-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      faq.isOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
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
                {faq.isOpen && (
                  <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
