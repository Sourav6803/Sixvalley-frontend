import React, { useEffect, useState } from "react";
import { server, serverTwo } from "../../../server";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";

const CreateDeal = () => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    image: null,
    expected_customers: "",
    orders_multiplier: "",
    views_multiplier: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    minJoinDate: "",
    allCategories: false,
    categories: [],
    minDiscount: "",
  });

  const [allCategory, setAllCategory] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverTwo}/category/all-main-cat`);

        console.log("data-->", response.data)
        if (response?.data) {
          // Extract only the category names
          const categoryNames = response.data.mainCategories.map(category => category.name);
          setAllCategory(categoryNames);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      categories: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 5);
  const minStartDate = startDate.toISOString().split("T")[0]; // ISO format for HTML date input

  // Calculate the minimum end date based on the selected start date
  const minEndDate =
    formData.startDate &&
    new Date(new Date(formData.startDate).getTime() + 24 * 60 * 60 * 1000) // Add 1 day to startDate
      .toISOString()
      .split("T")[0]; // Format as 'YYYY-MM-DD'

  const minJoinDate =
    formData.startDate &&
    new Date(new Date(formData.startDate).getTime() - 72 * 60 * 60 * 1000) // Add 1 day to startDate
      .toISOString()
      .split("T")[0]; // Format as 'YYYY-MM-DD'

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0].slice(0, 5); // Format as 'HH:mm'
  };

  useEffect(() => {
    // Validate form fields
    const validateForm = () => {
      const {
        type,
        title,
        description,
        image,
        startDate,
        endDate,
        minJoinDate,
        minDiscount,
      } = formData;

      // Check if all required fields are filled
      const isValid =
        type &&
        title.trim() &&
        description.trim() &&
        image &&
        startDate &&
        endDate &&
        minJoinDate &&
        minDiscount >= 1 &&
        minDiscount <= 90 &&
        (!formData.allCategories ? formData.categories.length > 0 : true); // Ensure categories are selected if allCategories is false

      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dealData = new FormData();
    dealData.append("type", formData.type);
    dealData.append("title", formData.title);
    dealData.append("description", formData.description);
    dealData.append("image", formData.image);
    dealData.append("duration[startDate]", formData.startDate);
    dealData.append("duration[endDate]", formData.endDate);
    dealData.append("duration[startTime]", formData.startTime);
    dealData.append("duration[endTime]", formData.endTime);
    dealData.append("eligibility[allCategories]", formData.allCategories);
    dealData.append(
      "eligibility[categories]",
      JSON.stringify(formData.categories)
    );
    dealData.append("eligibility[minJoinDate]", formData.minJoinDate);
    dealData.append("minDiscount", formData.minDiscount);
    dealData.append("estimated_benefits[expected_customers]",formData.expected_customers);
    dealData.append("estimated_benefits[orders_multiplier]",formData.orders_multiplier);
    dealData.append("estimated_benefits[views_multiplier]",formData.views_multiplier);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        `${server}/deal/create-deal`,
        dealData,
        config
      );
      if (response?.data) {
        toast.success("Deal created succssfully");
      }
    } catch (error) {
      console.error("Error creating deal:", error);
      toast.error("Deal creating error", error?.response?.data?.message);
    }
  };

  return (
    <div className=" bg-gray-50 py-4 px-2 md:px-8 lg:px-4">
      <div className="w-full mx-auto  shadow-lg rounded-lg p-6 md:p-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create a New Deal
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Deal Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Deal Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="dailyDeal">Daily Deal</option>
                  <option value="flashSale">Flash Sale</option>
                  <option value="saleEvent">Sale Event</option>
                  <option value="customPromotion">Custom Promotion</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Deal Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter deal title"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter deal description"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                ></textarea>
              </div>

              {/* Upload Image */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Banner Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-group bshadow-md p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-6 text-gray-800">
                  <span className="flex items-center gap-2">
                    📊 <span>Estimated Benefits</span>
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Orders Multiplier */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="ordersMultiplier"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      <span className="flex items-center gap-2 text-xs">
                        🛒 Orders Multiplier{" "}
                        <span className="text-sm text-gray-500">
                          (e.g., 3x)
                        </span>
                      </span>
                    </label>
                    <div className="relative ">
                      <input
                        type="number"
                        id="ordersMultiplier"
                        name="orders_multiplier"
                        min="1"
                        step="0.1"
                        value={formData.orders_multiplier || ""}
                        onChange={handleInputChange}
                        className="form-input mt-1 px-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        x
                      </span>
                    </div>
                    {/* <p className="text-xs text-gray-500 mt-1">
                      Up to 3x more orders!
                    </p> */}
                  </div>

                  {/* Views Multiplier */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="viewsMultiplier"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      <span className="flex items-center text-xs gap-2">
                        👀 Views Multiplier{" "}
                        <span className="text-sm text-gray-500">
                          (e.g., 2x)
                        </span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="viewsMultiplier"
                        name="views_multiplier"
                        min="1"
                        step="0.1"
                        value={formData.views_multiplier || ""}
                        onChange={handleInputChange}
                        className="form-input mt-1 px-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        x
                      </span>
                    </div>
                    {/* <p className="text-sm text-gray-500 mt-1">
                      Up to 3x more views!
                    </p> */}
                  </div>

                  {/* Expected Customers */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="expectedCustomers"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      <span className="flex items-center gap-2 text-xs">
                        🌍 Expected Customers{" "}
                        <span className="text-sm text-gray-500">
                          (e.g., 10 crores)
                        </span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="expectedCustomers"
                        name="expected_customers"
                        min="0"
                        value={formData.expected_customers || ""}
                        onChange={handleInputChange}
                        className="form-input mt-1 px-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        cr
                      </span>
                    </div>
                    {/* <p className="text-sm text-gray-500 mt-1">
                      10 crores customers expected!
                    </p> */}
                  </div>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    min={minStartDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Start Time (Optional)
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime }
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  />
                </div>
              </div>

              {/* Start and End Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    min={minEndDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    End Time (Optional)
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  />
                </div>
              </div>

              {/* Minimum Join Date */}
              <div>
                <label
                  htmlFor="minJoinDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Join Date
                </label>
                <input
                  type="date"
                  id="minJoinDate"
                  name="minJoinDate"
                  value={formData.minJoinDate}
                  onChange={handleInputChange}
                  max={minJoinDate}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Categories */}
              <div>
                <label className="flex items-center text-sm text-gray-700 mb-2">
                  <input
                    type="checkbox"
                    name="allCategories"
                    checked={formData.allCategories}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Apply to All Categories
                </label>
              </div>
              {!formData.allCategories && (
                <div>
                  <label
                    htmlFor="categories"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Eligible Categories
                  </label>
                  <Select
                    isMulti
                    name="categories"
                    options={allCategory.map((cat) => ({
                      label: cat,
                      value: cat,
                    }))}
                    value={formData.categories.map((cat) => ({
                      label: cat,
                      value: cat,
                    }))}
                    onChange={handleCategoryChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              )}

              {/* Discount */}
              <div>
                <label
                  htmlFor="minDiscount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Discount (%)
                </label>
                <input
                  type="number"
                  id="minDiscount"
                  name="minDiscount"
                  value={formData.minDiscount}
                  onChange={handleInputChange}
                  placeholder="Enter minimum discount"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min={1}
                  max={90}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3 rounded-md text-lg font-semibold transition ${
                  isFormValid
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Create Deal
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Deal Preview
            </h2>
            <div className="w-full h-60 md:h-72 lg:h-96 border rounded-md overflow-hidden">
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Banner Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
                  alt="Placeholder"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeal;
