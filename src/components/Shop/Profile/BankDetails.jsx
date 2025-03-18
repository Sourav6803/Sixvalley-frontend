import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqList = [
  {
    question: "How do I update my bank details?",
    answer:
      "To update your bank details, navigate to the 'Seller Dashboard', select 'Bank Details', and click 'Edit'. Make sure to verify your changes.",
  },
  {
    question: "When will I receive payments?",
    answer:
      "Payments are processed within 3-5 business days after order delivery. Ensure your bank details are correct to avoid delays.",
  },
  {
    question: "What documents are required for bank verification?",
    answer:
      "You need to upload a copy of your bank passbook or a cancelled cheque with clearly visible account details.",
  },
  {
    question: "Can I link multiple bank accounts?",
    answer:
      "Currently, you can link only one bank account. However, you can change your account details at any time through the dashboard.",
  },
];
const BankDetails = ({ completedSteps, onNext, onPrevious, onDataUpdate }) => {
  const [isValid, setIsValid] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaqVisibility = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // State for storing bank details
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    bankAddress: "",
    country: "India",
    isPrimary: false,
  });

  const validBankNames = [
    "State Bank of India (SBI)",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank (PNB)",
    "Kotak Mahindra Bank",
    "IndusInd Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "IDFC First Bank",
    "Indian Bank",
    "Yes Bank",
    "IDBI Bank",
    "Central Bank of India",
    "UCO Bank",
    "Bank of India (BOI)",
    "Indian Overseas Bank",
    "Punjab & Sind Bank",
    "RBL Bank",
    "Federal Bank",
    "South Indian Bank",
    "Karur Vysya Bank",
    "Tamilnad Mercantile Bank",
    "Bandhan Bank",
    "Dhanlaxmi Bank",
    "Jammu & Kashmir Bank",
    "Karnataka Bank",
    "City Union Bank",
    "Lakshmi Vilas Bank",
    "Suryoday Small Finance Bank",
    "Ujjivan Small Finance Bank",
    "AU Small Finance Bank",
    "Equitas Small Finance Bank",
    "ESAF Small Finance Bank",
    "Fincare Small Finance Bank",
    "Jana Small Finance Bank",
    "North East Small Finance Bank",
    "Capital Small Finance Bank",
  ];

  const steps = [
    { title: "Pickup Address", icon: "📦" },
    { title: "Bank Details", icon: "🏦" },
    { title: "Supplier Details", icon: "🏷️" },
    { title: "TAX Details", icon: "🧾" },
  ];


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: type === "checkbox" ? checked : value,
    });

    const allFieldsFilled = Object.values({
      ...bankDetails,
      [name]: type === "checkbox" ? checked : value,
    }).every((field) => {
      if (typeof field === "string") {
        return field.trim() !== "";
      }
      return field !== null && field !== undefined;
    });

    setIsValid(allFieldsFilled);
  };

  // Validation
  const isFormValid =
    bankDetails.bankName &&
    bankDetails.accountHolder &&
    /^[0-9]{9,18}$/.test(bankDetails.accountNumber) &&
    /^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifsc) &&
    bankDetails.bankAddress &&
    bankDetails.country;

  const handleBankNmaeChange = (e) => {
    const bankName = e.target.value;

    setBankDetails((prevData) => ({ ...prevData, bankName: bankName }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.alert("Please fill all fields correctly!");
      return;
    }

    onDataUpdate(bankDetails);
    onNext();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      {/* Header section */}
      <div className="flex items-center gap-5 mb-6">
        <h1 className="lg:text-xl text-lg font-semibold text-gray-600">
          Complete Account Details
        </h1>
      </div>

      <div className="mt-6 lg:w-[50%] ">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 text-slate-600">
        <div className=" bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Bank Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bank Name */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !bankDetails.bankName && "border-red-500"
                }`}
              />
              {!bankDetails.bankName && (
                <p className="text-sm text-red-500 mt-1">
                  Bank name is required.
                </p>
              )}
            </div> */}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Bank Name
              </label>
              <select
                // value={bankDetails?.bankName}
                onChange={handleBankNmaeChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !bankDetails.bankName && "border-red-500"
                }`}
                required
              >
                <option value="" disabled>
                  Select Bank
                </option>
                {validBankNames.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              {!bankDetails.bankName && (
                <p className="text-sm text-red-500 mt-1">
                  Bank name is required.
                </p>
              )}
            </div>

            {/* Account Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <input
                type="text"
                name="accountHolder"
                value={bankDetails.accountHolder}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !bankDetails.accountHolder && "border-red-500"
                }`}
                required
              />
              {!bankDetails.accountHolder && (
                <p className="text-sm text-red-500 mt-1">
                  Account holder name is required.
                </p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !/^[0-9]{9,18}$/.test(bankDetails.accountNumber) &&
                  "border-red-500"
                }`}
                required
              />
              {!/^[0-9]{9,18}$/.test(bankDetails.accountNumber) && (
                <p className="text-sm text-red-500 mt-1">
                  Enter a valid account number (9-18 digits).
                </p>
              )}
            </div>

            {/* IFSC Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc"
                value={bankDetails.ifsc}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifsc) &&
                  "border-red-500"
                }`}
                required
              />
              {!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifsc) && (
                <p className="text-sm text-red-500 mt-1">
                  Invalid IFSC code format.
                </p>
              )}
            </div>

            {/* Bank Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Address
              </label>
              <input
                type="text"
                name="bankAddress"
                value={bankDetails.bankAddress}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !bankDetails.bankAddress && "border-red-500"
                }`}
                required
              />
              {!bankDetails.bankAddress && (
                <p className="text-sm text-red-500 mt-1">
                  Bank address is required.
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                defaultValue={bankDetails.country}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !bankDetails.country && "border-red-500"
                }`}
                required
              />
              {!bankDetails.country && (
                <p className="text-sm text-red-500 mt-1">
                  Country is required.
                </p>
              )}
            </div>

            {/* Primary Account Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPrimary"
                checked={bankDetails.isPrimary}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Set as Primary Account
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-2">
              <button
                className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  isValid
                    ? "bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                    : "bg-gray-300 cursor-not-allowed opacity-70"
                }`}
                onClick={onPrevious}
                disabled={!isValid}
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
                onClick={handleSubmit}
                disabled={!isValid}
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-xl">
          <div className="flex items-center mb-8">
            <FaQuestionCircle className="text-blue-500 text-4xl mr-4" />
            <h2 className="text-3xl font-bold">Seller Bank Details - FAQ</h2>
          </div>

          <ul className="space-y-6">
            {faqList.map((faq, index) => (
              <li
                key={index}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <button
                  className="w-full flex justify-between items-center text-[16px] font-semibold focus:outline-none"
                  onClick={() => toggleFaqVisibility(index)}
                >
                  {faq.question}
                  {openIndex === index ? (
                    <FaChevronUp className="text-blue-500" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-gray-700 leading-relaxed text-[14px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
