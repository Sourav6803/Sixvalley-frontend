import React, { useCallback, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import CampaignOrdersTable from "./CampaignOrdersTable";
import { useSelector } from "react-redux";
import UnusedBudgetAction from "./UnusedBudgetAction";
import { catalogOptions } from "../../../static/data";
import axios from "axios";
import { server } from "../../../server";
import { BiLike } from "react-icons/bi";
import ReviewAndSubmit from "./ReviewAndSubmit";
import { toast } from "react-toastify";


const ManualCampaign = ({
  onSelectCatalog,
  budgetOption,
  onBudgetChange,
  open,
  selectedCampaign,
}) => {
  const { seller } = useSelector((state) => state.seller);
  const [campaignName, setCampaignName] = useState("2435339 - 22:26");
  const [selectedCatalog, setSelectedCatalog] = useState("orders");
  const [budget, setBudget] = useState();
  const [budgetType, setBudgetType] = useState("");
  const [clicks, setClicks] = useState(null);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState(
    `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(
      2,
      "0"
    )}`
  );
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState("");
  const [noEndDate, setNoEndDate] = useState(false);
  const [category, setCategory] = useState("Jeans");
  const [reviewSubmitOpen, setReviewSubmitOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate());
  const minStartDate = tomorrow.toISOString().split("T")[0]; // ISO format for HTML date input

  // Validation for Start Date
  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    // if (selectedDate < tomorrow) {
    //   alert("Start date must be tomorrow or later.");
    //   return;
    // }
    setStartDate(e.target.value);
  };

  // Validation for End Date
  const handleEndDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedStartDate = new Date(startDate);
    if (selectedDate <= selectedStartDate) {
      toast.warning("End date must be later than the start date.");
      return;
    }
    setEndDate(e.target.value);
  };

  const handleSelectedProductsChange = useCallback((newSelectedProducts) => {
    setSelectedProducts(newSelectedProducts);
  }, []);

  const handleCatalogSelect = (id) => {
    setSelectedCatalog(id);
    onSelectCatalog(id);
  };

  const handleBudgetTypeChange = (e) => {
    setBudgetType(e.target.value);
    onBudgetChange(e.target.value);
  };

  const handleBudgetChange = async (e) => {
    const inputBudget = e.target.value;
    setBudget(inputBudget);

    try {
      const response = await axios.post(`${server}/campaign/calculate-clicks`, {
        budget: inputBudget,
      });
      setClicks(response?.data);
    } catch (err) {
      console.error("error calculated clicks", err);
    }
  };

  const handleNoEndDateChange = () => {
    setNoEndDate(!noEndDate);
    if (!noEndDate) {
      setEndDate(null);
      setEndTime("");
    } else {
      setEndDate(new Date());
      setEndTime(
        `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(
          2,
          "0"
        )}`
      );
    }
  };

  // Ensure the date is valid before converting to ISO format
  const isoStartDate =
    startDate && !isNaN(new Date(startDate))
      ? new Date(startDate).toISOString()
      : null;

  const isoEndDate =
    endDate && !isNaN(new Date(endDate))
      ? new Date(endDate).toISOString()
      : null;

  const campaignData = {
    sellerId: seller?._id, // Replace with the actual seller ID from your app's state or session
    campaignName: campaignName,
    campaignType: selectedCampaign,
    status: "Active", // Set to Active by default
    category: category,
    totalBudget: budget, 
    selectedProducts: selectedProducts,
    unusedBudgetAction: selectedOption,
    bidStrategy: {
      bidAmount: 1.0, // Example value for max CPC
      bidType: "Fixed", // Example value for bid type
      dailyBudget: {
        amount: budget,
        budgetType: budgetType,
      },
    },
    schedule: {
      startDate: isoStartDate,
      endDate: isoEndDate,
      startTime: startTime,
      endTime: endTime,
    },
  };

   // Reset campaignData to its initial state
   const emptyCampaignData = {
    sellerId: "", // Clear seller ID
    campaignName: "",
    campaignType: "",
    status: "Active", // Retain "Active" if required, or make it empty if needed
    category: "",
    selectedProducts: [],
    unusedBudgetAction: "",
    bidStrategy: {
      bidAmount: 0, // Default value for max CPC
      bidType: "", // Default or empty value for bid type
      dailyBudget: {
        amount: 0,
        budgetType: "",
      },
    },
    schedule: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
  };

  const resetForm = () => {
    
    setCampaignName("");
    setSelectedCatalog("");
    setBudget("");
    setStartDate("");
    setEndDate("");
    setClicks(null);
    setNoEndDate(false);
  };

  return (
    <div className="mt-5 bg-gray-50 min-h-screen rounded-md">
      <div className="w-full mx-auto bg-white shadow-lg rounded-lg md:p-6 p-2">
        {/* Campaign Name */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-[60%] border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-1 focus:ring-purple-500 outline-none"
            placeholder="Enter Campaign Name"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter a descriptive & meaningful name for the campaign.
          </p>
        </div>

        {/* Select Catalogs */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Select Catalogs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {catalogOptions.map((catalog) => (
              <div
                key={catalog.id}
                className={`p-4 border rounded-lg ${
                  selectedCatalog === catalog.id
                    ? "border-purple-600"
                    : "border-gray-300"
                } ${
                  catalog.isAvailable
                    ? "hover:shadow-lg cursor-pointer"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center justify-between text-gray-700 text-[14px] font-semibold ${
                    catalog.isAvailable ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={catalog?.image}
                      className="h-8 w-8"
                      alt="catalog"
                    />
                    {catalog.recomended && (
                      <span className="flex items-center text-xs text-slate-600 px-3 py-2 bg-yellow-100 rounded-md">
                        {" "}
                        <AiFillLike
                          size={15}
                          className="mr-2 text-yellow-500"
                        />{" "}
                        Recomended
                      </span>
                    )}
                  </div>

                  {!catalog.isAvailable && (
                    <span className="text-xs text-gray-500">
                      Currently <br /> Unavailable
                    </span>
                  )}
                  {catalog?.button && (
                    <button
                      onClick={() => {
                        catalog.isAvailable && handleCatalogSelect(catalog.id);
                      }}
                      className={`  ${
                        selectedCatalog === catalog.id
                          ? "bg-blue-600 text-white"
                          : " text-blue-600  border border-blue-500"
                      } border py-2 px-3 rounded-md text-sm`}
                    >
                      {selectedCatalog === catalog.id ? "Selected" : "Select"}
                    </button>
                  )}
                </div>
                <h3 className="text-[14px] text-slate-700 mt-2">
                  {catalog.title}
                </h3>
                <p
                  className={`mt-2 text-xs ${
                    catalog.isAvailable ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {catalog.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <CampaignOrdersTable
          shopId={seller?._id}
          onSelectedProductsChange={handleSelectedProductsChange}
        />

        {/* Add Daily Budget */}

        <div className="mb-6 mt-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add Daily Budget
          </h3>

          <div className="space-y-4 ml-5">
            {/* Budget Option - Predefined */}
            <label className="w-fit flex items-center space-x-3">
              <input
                type="radio"
                name="budgetOption"
                value="option"
                checked={budgetOption === "option"}
                onChange={handleBudgetTypeChange}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-gray-800 text-sm cursor-pointer">
                Select a budget option
              </span>
            </label>

            {budgetOption === "option" && (
              <div className="space-y-3 ml-6">
                {/* Predefined Budget Options */}
                {[2590, 2890].map((amount, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-gray-300 px-5 py-3 max-w-md hover:shadow-lg transition duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        ₹{amount.toLocaleString()}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Get {index === 0 ? "2125 - 2675" : "2525 - 2980"} clicks
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Budget Option - Manual */}
            <label className="w-fit flex items-center space-x-3">
              <input
                type="radio"
                name="budgetOption"
                value="manual"
                checked={budgetOption === "manual"}
                onChange={handleBudgetTypeChange}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-gray-800 text-sm cursor-pointer">
                Select budget manually
              </span>
            </label>

            {budgetOption === "manual" && (
              <div className="rounded-md border border-gray-300 px-5 py-2 max-w-md relative mt-4 hover:shadow-lg transition duration-200">
                <label
                  htmlFor="dailyBudget"
                  className="absolute md:top-[-9px] top-[-8px] left-4 px-1 bg-white text-xs text-gray-600"
                >
                  Daily Budget Amount
                </label>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium">₹</span>
                  <input
                    id="dailyBudget"
                    type="number"
                    name="budget"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full ml-2 text-gray-800 text-sm px-2 py-1 border-none focus:outline-none focus:ring-0"
                    placeholder="Enter your budget"
                    min={0}
                  />
                </div>
              </div>
            )}

            {clicks && budget > 1 && (
              <div className="border rounded-md text-gray-600 flex items-center gap-2 bg-green-200 text-sm w-fit px-3 py-2 ">
                <BiLike />
                <p>
                  Recomended Estimated clicks : {clicks?.minClicks} -{" "}
                  {clicks?.maxClicks}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Select Duration */}
        <div className="w-full p-3 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            Select Duration
            <span
              className="ml-2 text-gray-500 text-sm"
              title="Select the start and end date/time for your duration."
            >
              ⓘ
            </span>
          </h2>

          {/* Start Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Start Date */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <input
                type="date"
                className="w-full text-gray-700 outline-none border-none"
                // value={startDate}
                // onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                onChange={handleStartDateChange}
                min={minStartDate} // Start date must be tomorrow or later
              />
            </div>

            {/* Start Time */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <input
                type="time"
                className="w-full text-gray-700 outline-none border-none"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          {/* End Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* End Date */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <input
                type="date"
                className="w-full text-gray-700 outline-none border-none"
                // value={endDate}
                // onChange={(e) => setEndDate(e.target.value)}
                // disabled={noEndDate}

                value={endDate}
                onChange={handleEndDateChange}
                disabled={noEndDate}
                min={startDate} // End date must be later than start date
              />
            </div>

            {/* End Time */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <input
                type="time"
                className="w-full text-gray-700 outline-none border-none"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={noEndDate}
              />
            </div>
          </div>

          {/* No End Date */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="no-end-date"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded"
              checked={noEndDate}
              onChange={handleNoEndDateChange}
            />
            <label
              htmlFor="no-end-date"
              className="ml-2 text-gray-700 text-sm cursor-pointer"
            >
              No end date
            </label>
          </div>
        </div>

        <UnusedBudgetAction
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <div className="bg-white rounded-lg shadow-md w-full mt-5 p-4 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
            {/* Image and Text */}
            <div className="flex items-center justify-center space-x-4">
              <div className="p-4 rounded-lg flex-shrink-0">
                <img
                  src="https://static.meeshosupply.com/supplier-new/budget_consent.svg"
                  alt="Daily Budget Over"
                  className="h-20 w-20 md:h-30 md:w-30 object-contain"
                />
              </div>
            </div>

            {/* Checkbox Details */}
            <div className="mt-4 md:mt-0 md:ml-6 space-y-4">
              {/* Header Section */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 text-center md:text-left">
                  Your catalogs lose over
                  <span className="text-red-500 font-bold">
                    {" "}
                    10k+ customer searches{" "}
                  </span>
                  as{" "}
                  <span className="text-red-500 font-bold">
                    daily budget gets over early
                  </span>
                </h3>
              </div>

              {/* Topup Budget Details */}
              <div>
                <h5 className="text-sm md:text-md font-semibold text-gray-700 mb-2">
                  Topup Budget Details:
                </h5>

                {/* Topup Options */}
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Option 1 */}
                  <div className="flex items-start text-gray-600 text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 md:w-5 md:h-5 text-purple-600 focus:ring-purple-500 rounded"
                      defaultChecked
                    />
                    <span>
                      It will be used only when the daily budget of ₹0 is over &
                      ROI is higher than 5
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block h-16 border-l border-gray-300"></div>

                  {/* Option 2 */}
                  <div className="flex items-start text-gray-600 text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 md:w-5 md:h-5 text-purple-600 focus:ring-purple-500 rounded"
                      defaultChecked
                    />
                    <span>
                      It can be{" "}
                      <span className="font-semibold text-blue-600">
                        turned off anytime
                      </span>{" "}
                      from the campaign details page
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center text-center w-full md:w-auto">
            <h4 className="text-xs md:text-sm text-gray-500 font-medium">
              Top up Budget
            </h4>
            <p className="text-lg md:text-xl font-bold text-gray-800 mt-1">
              ₹100
            </p>
            <p className="text-gray-500 text-xs md:text-sm mb-3">
              Used only on high traffic days
            </p>
            <button className="bg-purple-600 text-white text-xs md:text-sm px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none">
              Accept Top Up
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 w-full flex items-center md:justify-start justify-center ">
          <button
            onClick={() => setReviewSubmitOpen(true)}
            className="w-fit text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none px-3"
          >
            Continue to Submit
          </button>
        </div>

        {/* Review and Submit Modal */}
        {reviewSubmitOpen && (
          <ReviewAndSubmit
            campaignData={campaignData}
            open={open}
            setReviewSubmitOpen={setReviewSubmitOpen}
            resetForm={resetForm}
          />
        )}
      </div>
    </div>
  );
};

export default ManualCampaign;
