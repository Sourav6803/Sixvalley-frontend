import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaArrowRight,
  FaInfoCircle,
  FaSearchLocation,
  FaChevronUp,
  FaChevronDown,
  FaBoxOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Country, City, State } from "country-state-city";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import districtData from "../../../static/india-districts.json";


const faqData = [
  {
    question: "How does product pickup work?",
    answer:
      "Once you place an order, you can schedule a pickup from your nearest store. You will receive a notification once the product is ready.",
  },
  {
    question: "What documents are required for pickup?",
    answer:
      "Bring a valid government ID and the order confirmation receipt to collect your product.",
  },
  {
    question: "Can someone else pick up my order?",
    answer:
      "Yes, you can authorize someone else. They will need to show their ID along with the order receipt.",
  },
  {
    question: "Is pickup available in all locations?",
    answer:
      "Pickup is available at select locations. Please check availability during checkout.",
  },
];

const PickupDetails = ({ onNext, completedSteps, onDataUpdate }) => {
  const [pickupData, setPickupData] = useState({
    roomNumber: "",
    address: "",
    state: "",
    district: "",
    city: "",
    street: "",
    landmark: "",
    zipCode: "",
    location: {
      type: "Point",
      coordinates: [],
    },
  });

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const defaultCountry = {
    name: "India",
    isoCode: "IN",
  };
  const [states, setStates] = useState([]);
  const [dist, setDistrict] = useState([]);
  const [cities, setCities] = useState([]);


  const countries = Country.getAllCountries();
  const selectedCountry = countries.find((c) => c.isoCode === "IN") || null;

  const [selectedState, setSelectedState] = useState(null);

  // Load states of India on component mount 
  useEffect(() => {
    const initialStates = State.getStatesOfCountry(defaultCountry.isoCode);
    setStates(initialStates);
  }, []);

  const handleStateChange = async(state) => {
    setSelectedState(state);
    setPickupData((prevData) => ({ ...prevData, state: state.name }));

    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
    
    fetchDistrictsByState(state.name); // fetch districts from local JSON
  };

  const fetchDistrictsByState = (stateName) => {
    const districts = districtData[stateName] || [];
    setDistrict(districts);
  };


  const handleCityChange = (e) => {
    const city = e.target.value;
    setPickupData((prevData) => ({ ...prevData, city: city }));
  };

  const [isValid, setIsValid] = useState(false);

  const steps = [
    { title: "Pickup Address", icon: "📦" },
    { title: "Bank Details", icon: "🏦" },
    { title: "Supplier Details", icon: "🏷️" },
    { title: "TAX Details", icon: "🧾" },
  ];

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPickupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation: Ensure all fields are filled out and pincode is numeric
    const allFieldsFilled = Object.values({
      ...pickupData,
      [name]: value,
    }).every((field) => field.trim() !== "");

    console.log("allFieldsFilled", allFieldsFilled);

    setIsValid(allFieldsFilled);
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(pickupData).every(
      (field) => field.trim() !== ""
    );
    setIsValid(allFieldsFilled);
  }, [pickupData]);

  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                latlng: `${latitude},${longitude}`,
                key: "AIzaSyDNPTUEqkU9hOC-ivPIUnDZBcZp9VPHAS8",
              },
            }
          );

          const add = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          console.log("add-->", add)

          if (response.data.results.length > 0) {
            const addressComponents =
              response.data.results[0].address_components;

            const formattedAddress = response.data.results[0].formatted_address;

            console.log("formattedAddress--",response.data.results );

            const stateName = addressComponents.find((c) =>
              c.types.includes("administrative_area_level_1")
            )?.long_name;
            const cityName = addressComponents.find((c) =>
              c.types.includes("locality")
            )?.long_name;
            const zipCode = addressComponents.find((c) =>
              c.types.includes("postal_code")
            )?.long_name;

            // Extract street and landmark
            const street = addressComponents.find((c) =>
              c.types.includes("premise")
            )?.long_name;

            const landmark = addressComponents.find(
              (c) =>
                c.types.includes("point_of_interest") ||
                c.types.includes("sublocality_level_1") // fallback to sublocality
            )?.long_name;

            setPickupData((prevData) => ({
              ...prevData,
              address: formattedAddress,
              city: cityName || "",
              state: stateName || "",
              zipCode: zipCode || "",
              street: street  || "",
              landmark: landmark || "",
            }));

            // Programmatically trigger state dropdown update
            const selectedState = states.find((s) => s.name === stateName);

            console.log("selectedState--", selectedState);

            if (selectedState) {
              handleStateChange(selectedState); // Trigger state selection
            }
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to fetch location. Please enable location services.");
      }
    );
  };

  const geocodeAddress = async (addressData) => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: `${addressData.address1}, ${addressData.city}, ${addressData.state}, ${addressData.country}, ${addressData.zipCode}`,
            key: "505c278939b94c40b75291402921ffb0",
            limit: 1,
          },
        }
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return {
          type: "Point",
          coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
        };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a copy of pickupData to modify
      const submissionData = { ...pickupData };

      // If location coordinates are empty, try to geocode the address
      if (!submissionData.location.coordinates.length) {
        const geocodedLocation = await geocodeAddress({
          address1: submissionData.address,
          city: submissionData.city,
          state: submissionData.state,
          country: "India", // Assuming India as default
          zipCode: submissionData.zipCode,
        });

        if (geocodedLocation) {
          submissionData.location = geocodedLocation;
        } else {
          console.warn("Could not determine location coordinates");
          // Continue without coordinates if geocoding fails
        
        }
      }


      // Call onDataUpdate with the complete data
      onDataUpdate(submissionData);

      // Move to the next step
      onNext();
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (show toast, etc.)
    }
  };

  console.log("pickupData-->", pickupData);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <FaChevronLeft
          className="lg:text-xl text-md cursor-pointer"
          onClick={handleBack}
        />

        <h1 className="lg:text-xl text-lg font-semibold text-gray-600">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 ">
        {/* Left Section */}
        <div className="">
          <h2 className="lg:text-xl text-lg font-semibold mb-6 text-gray-700">
            Enter Your Pickup Address
          </h2>

          <div className="w-full rounded-md bg-yellow-200 p-2 text-[12px] md:text-[14px] mb-3 flex items-center">
            <FaInfoCircle className="mr-2" />
            Product will be picked up from tis location
          </div>

          <button
            onClick={fetchLocation}
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md mb-6 flex items-center gap-2"
          >
            <FaSearchLocation />
            Use Current Location
          </button>

          {/* Address Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <input
                type="text"
                name="roomNumber"
                placeholder="Room/Floor/Building No."
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={pickupData.roomNumber}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={pickupData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street/Locality"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={pickupData.street}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={pickupData.landmark}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="zipCode"
                placeholder="Pincode"
                className="w-full border border-gray-300 rounded-md px-4 py-2 h-[42px]"
                value={pickupData.zipCode}
                maxLength={6} // Restrict length to 6
                onChange={(e) => {
                  const regex = /^[0-9]*$/; // Only allow numbers
                  if (
                    regex.test(e.target.value) &&
                    e.target.value.length <= 6
                  ) {
                    handleInputChange(e); // Update pickupData only for valid input
                  }
                }}
              />

              <div className="w-full pb-2">
                <select
                  disabled={!selectedCountry}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  onChange={(e) =>
                    handleStateChange(
                      states.find((s) => s.isoCode === e.target.value)
                    )
                  }
                >
                  <option value="">
                    {pickupData?.state ? pickupData?.state : "Select State"}
                  </option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full pb-2">
                <select
                  disabled={!selectedState || !selectedCountry}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 "
                  onChange={handleCityChange}
                >
                  <option value="">
                    {pickupData?.city ? pickupData?.city : "Select City"}
                  </option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button
              className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isValid
                  ? "bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                  : "bg-gray-300 cursor-not-allowed opacity-70"
              }`}
              onClick={handleSubmit}
              // disabled={!isValid}
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="hidden  lg:block bg-gray-100 p-6 rounded-lg shadow-md">
          

          <div className="flex items-center mb-6">
            <FaBoxOpen className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-slate-700">Pickup Product FAQ</h2>
          </div>

          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 text-slate-600">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full py-4 text-lg font-medium focus:outline-none"
              >
                {item.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="py-4 text-gray-700">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickupDetails;
