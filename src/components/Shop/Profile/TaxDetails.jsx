import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";

const TaxDetails = ({ completedSteps, onNext, handleSubmit, onDataUpdate }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [provideLater, setProvideLater] = useState(false); // Checkbox state
  const [sellerDocuments, setSellerDocuments] = useState({
    enrolementId: "",
    GSTINno: "",
    UINno: "",
    panCard: "",
    documentVerified: false,
    documentVerifiedAt: null,
    businessDetails: {
      businessName: "",
      businessType: [],
      businessAddress: "",
    },
  });

  const steps = [
    { title: "Pickup Address", icon: "📦" },
    { title: "Bank Details", icon: "🏦" },
    { title: "Supplier Details", icon: "🏷️" },
    { title: "TAX Details", icon: "🧾" },
  ];

  // Handle validation dynamically
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Validation: GSTIN or UIN number should be alphanumeric and at least 10 characters
    if (value.length >= 10 && /^[a-zA-Z0-9]+$/.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleCheckboxChange = () => {
    setProvideLater(!provideLater);
    if (!provideLater) {
      setSelectedOption(null);
      setInputValue("");
      setIsValid(true); // Allow proceeding without validation
    } else {
      setIsValid(false); // Revert to validation if the checkbox is unchecked
    }
  };

  const gstVerify = async () => {
    const gstNumber = inputValue.trim(); // Get the GST number from input

    if (!gstNumber) {
      toast.alert("Please enter a valid GST number");
      return;
    }

    try {
      const response = await axios.get(
        `${server}/shop/verify-gst?gstnumber=${gstNumber}`
      );

      if (response.data.success) {
        const gstDetails = response.data.data;

        setSellerDocuments((prevState) => ({
          ...prevState,
          GSTINno: gstDetails.gstNumber || "",
          documentVerified: true,
          documentVerifiedAt: new Date(),
          businessDetails: {
            ...prevState.businessDetails, // Preserve existing data
            businessName: gstDetails.businessName || "",
            businessType: gstDetails.businessType || [], // Ensure it's an array
            businessAddress: gstDetails.businessAddress || "",
          },
        }));

        
      }
    } catch (error) {
      console.error(
        "Error verifying GST:",
        error.response?.data || error.message
      );
      toast.error("Failed to verify GST. Please try again.");
    }
  };

  console.log("sellerDocuments", sellerDocuments);

  useEffect(() => {
    onDataUpdate(sellerDocuments);
  }, [sellerDocuments]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // onDataUpdate(sellerDocuments);
    handleSubmit();
    onNext();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 mt-[80px]">
      {/* Header */}
      <div className=" flex items-center gap-5  mb-6">
        <FaChevronLeft
          className="lg:text-xl text-md cursor-pointer"
          onClick={handleBack}
        />

        <h1 className="lg:text-xl text-lg font-semibold  text-gray-600">
          Complete Account Details
        </h1>
      </div>

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
        <div className="relative flex items-center w-[90%]  mx-auto">
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
        {/* Left Section */}
        <div className="lg:col-span-2">
          <h2 className="lg:text-xl text-lg font-semibold mb-6 text-gray-700">
            Choose Your Tax Option
          </h2>

          {/* Tax Options */}
          <div className="space-y-6">
            {/* Non-GST Seller */}
            <div
              className={`p-4 border rounded-lg cursor-pointer  hover:shadow-md transition`}
              onClick={() => {
                setSelectedOption("nonGST");
                setInputValue("");
                setIsValid(false);
              }}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="nonGST"
                  name="taxOption"
                  className="md:h-5 md:w-5 h-4 w-4 accent-orange-600"
                  checked={selectedOption === "nonGST"}
                  onChange={() => setSelectedOption("nonGST")}
                />
                <label
                  htmlFor="nonGST"
                  className="font-medium text-gray-700 md:text-[16px] text-[14px]"
                >
                  Enrolment ID / UIN (for Non-GST Sellers)
                </label>
              </div>
              <p className="ml-9 mt-2 text-xs lg:text-md text-gray-500">
                Register with Enrolment ID / UIN and sell locally in your
                registered state without GST.
              </p>
              {selectedOption === "nonGST" && (
                <div className="ml-9 mt-4">
                  <div className="flex items-center  gap-2">
                    <input
                      type="text"
                      placeholder="Enter Enrolment ID / UIN"
                      className="w-full sm:w-2/4 border text-[14px] border-gray-300 rounded-md px-4 py-2 focus:outline-none  "
                      value={inputValue}
                      onChange={handleInputChange}
                    />

                    <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
                      Verify
                    </button>
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-blue-600 cursor-pointer">
                    Don’t have Enrolment ID / UIN?{" "}
                    <span className="underline">Apply Now</span>
                  </p>
                </div>
              )}
            </div>

            {/* GST Seller */}
            <div
              className={`p-4 border rounded-lg cursor-pointer  hover:shadow-md transition`}
              onClick={() => {
                setSelectedOption("gst");
                setInputValue("");
                setIsValid(false);
              }}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="gst"
                  name="taxOption"
                  className="h-4 w-4 lg:w-5 lg:h-5 accent-orange-600"
                  checked={selectedOption === "gst"}
                  onChange={() => setSelectedOption("gst")}
                />
                <label
                  htmlFor="gst"
                  className="font-medium text-gray-700 text-[14px] lg:text-[16px]"
                >
                  GSTIN Number
                </label>
              </div>
              <p className="ml-9 mt-2 lg:text-sm text-xs text-gray-500">
                For Regular and Composition GST sellers.
              </p>
              {selectedOption === "gst" && (
                <div className="ml-9 mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter GSTIN Number"
                      className="w-3/4 text-[14px] sm:w-2/4 border border-gray-300 rounded-md px-4 py-2"
                      value={inputValue}
                      onChange={handleInputChange}
                    />

                    <button
                      className={`px-4 py-2 rounded-md transition ${
                        isValid
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isValid}
                      onClick={gstVerify}
                    >
                      Verify
                    </button>
                  </div>

                  {
                    sellerDocuments.documentVerified && (
                      <div className="flex items-center gap-2">
                    <MdVerified className="text-green-600" />
                    <span className="text-green-600 font-semibold">
                      GST Verified
                    </span>
                  </div>
                    )
                  }
                </div>
              )}
            </div>
          </div>

          {/* Checkbox */}
          <div className="mt-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-orange-600"
                checked={provideLater}
                onChange={handleCheckboxChange}
              />
              <span className="text-gray-600 text-sm">
                I will provide these details later.
              </span>
            </label>
          </div>

          {sellerDocuments.documentVerified ? (
            <div className="mt-4 p-4 border rounded-lg bg-green-100">
              <div className="flex items-center gap-2">
                <MdVerified className="text-green-600" />
                <span className="text-green-600 font-semibold">
                  GST Verified
                </span>
              </div>
              <p className="mt-2 font-medium">
                Business Name: {sellerDocuments.businessDetails.businessName}
              </p>
              <p className="text-gray-600">
                Address: {sellerDocuments.businessDetails.businessAddress}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Business Type(s):</span>{" "}
                {sellerDocuments.businessDetails.businessType.join(", ")}
              </p>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-red-500">
              <MdVerified />
              <span>GST Not Verified</span>
            </div>
          )}

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button
              className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isValid
                  ? "bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                  : "bg-gray-300 cursor-not-allowed opacity-70"
              }`}
              // disabled={!isValid}
              onClick={onSubmit}
            >
              Continue
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="hidden lg:block bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">FAQs</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>What is GST and why do I need it?</li>
            <li>How can I apply for an Enrolment ID / UIN?</li>
            <li>What is the difference between Regular and Composition GST?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaxDetails;
