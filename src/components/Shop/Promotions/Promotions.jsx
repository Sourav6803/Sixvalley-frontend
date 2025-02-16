import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { formatMongoDate } from "../../../utils/common-utils";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { FaCheckCircle, FaCalendarAlt, FaClock } from "react-icons/fa";
import dealImage from "../../../Assests/dl2.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Promotions = ({ open }) => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [activeTab, setActiveTab] = useState("Sale Events");
  const [subTab, setSubTab] = useState("Upcoming");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const [participatedProducts, setParticipatedProducts] = useState([]);

  const tabMapping = {
    "Sale Events": "saleEvent",
    "Daily Deals": "dailyDeal",
    "Flash Events": "flashSale",
  };

  // Update Active Tab based on URL Params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("TAB") || "Sale Events";
    setActiveTab(tab);
  }, [location.search]);

  // Fetch Promotions Data
  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const backendType = tabMapping[activeTab];
        const { data } = await axios.get(
          `${server}/deal/get-deal?type=${backendType}`
        );
        setPromotions(data?.deals || []);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [activeTab,]);

  // Filter Promotions based on Sub-Tab
  useEffect(() => {
    const filtered = promotions.filter((promo) => {
      if (subTab === "Upcoming") return promo.status === "pending";
      if (subTab === "Live") return promo.status === "active";
      if (subTab === "Expired") return promo.status === "expired";
      return true;
    });

    setFilteredPromotions(filtered);
  }, [subTab, promotions]);

  // Handle Tab Change
  const handleTabChange = (tab) => {
    navigate(`/dashboard/promotion?TAB=${tab}`);
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchSellerParticipation = async () => {
      try {
        if (!seller?._id) return; // Avoid unnecessary API calls if sellerId is undefined

        const response = await axios.get(
          `${server}/deal/participation/${seller?._id}`
        );
        setParticipatedProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching seller participation:", error);
        toast.error("Error fetching seller participation");
      }
    };

    fetchSellerParticipation();

    return () => {
      setParticipatedProducts([]); // Cleanup to prevent stale state if sellerId changes
    };
  }, [seller?._id]);

  return (
    <div
      className={`w-full bg-white ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] overflow-y-auto p-4 md:p-6`}
    >
      <h1 className="text-xl md:text-2xl font-bold mb-4">Promotions</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Sale Events", "Daily Deals", "Flash Events"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-2 text-sm md:text-base rounded transition-all duration-300 ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Daily Deals" && (
        <div className="w-full p-6 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={dealImage}
              alt="Daily Deal"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-md"
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Get top visibility in the app with daily deals
            </h2>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaCheckCircle className="text-blue-600 text-lg" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    Enjoy top slot
                  </span>{" "}
                  for your deals when they go live.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <FaCalendarAlt className="text-blue-600 text-lg" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    Participate for up to 5 days/month
                  </span>{" "}
                  for each product.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <FaClock className="text-blue-600 text-lg" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    Meesho schedules deals
                  </span>{" "}
                  to drive maximum buyers.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm md:text-base font-medium transition-all shadow-md">
              How it works?
            </button>
          </div>
        </div>
      )}

      {/* Sub-Tabs */}
      <div className="flex flex-wrap gap-2 mt-3">
        {["Upcoming", "Live", "Expired"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-4 py-2 text-sm md:text-base bg-gray-200 font-medium transition-all duration-300 rounded-tl-lg rounded-tr-lg border ${
              subTab === tab
                ? "text-purple-500  bg-purple-100"
                : "text-gray-700 border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-x-2"></div>

      {/* <div className="bg-white shadow-md rounded-lg mt-6"> */}
      {loading ? (
        <div className="p-4 text-center flex items-center justify-center">
          <div className="flex-col">
            <div className="loader"></div>
            <div>Loading...</div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-300">
                <th className="text-left p-2 md:p-4 font-medium text-sm md:text-base text-gray-700">
                  Event
                </th>
                <th className="text-left p-2 md:p-4 font-medium text-sm md:text-base text-gray-700">
                  Estimated Benefits
                </th>
                <th className="text-left p-2 md:p-4 font-medium text-sm md:text-base text-gray-700">
                  Participation Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions?.length > 0 ? (
                filteredPromotions?.map((promo) => (
                  <tr
                    key={promo?._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 md:p-4 text-sm md:text-base">
                      <div className="flex items-center gap-3">
                        <img
                          src={promo?.image?.url}
                          alt="Promo"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-xs md:text-sm">
                            {promo?.title}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {formatMongoDate(
                              new Date(promo?.duration?.startDate)
                            )}{" "}
                            -{" "}
                            {formatMongoDate(
                              new Date(promo?.duration?.endDate)
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 md:p-4 text-sm md:text-base">
                      <div>
                        <p className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                          <HiArrowTrendingUp
                            className="text-green-500"
                            size={16}
                          />
                          Upto {promo?.estimated_benefits?.orders_multiplier}x
                          orders
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                          <AiOutlineEye className="text-[#894040]" size={16} />
                          Upto {promo?.estimated_benefits?.views_multiplier}x
                          views
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                          <CiUser size={16} />
                          Upto {
                            promo?.estimated_benefits?.expected_customers
                          }{" "}
                          customers
                        </p>
                      </div>
                    </td>
                    <td className="p-2 md:p-4 text-sm md:text-base">
                      {promo.eligibility.minJoinDate ? (
                        (() => {
                          const today = new Date();
                          const minJoinDate = new Date(
                            promo.eligibility.minJoinDate
                          );
                          if (minJoinDate <= today) {
                            return (
                              <div>
                                {participatedProducts?.length > 0 ? (
                                  <div>
                                    <p className="text-green-600 font-medium text-xs md:text-sm flex gap-2 items-center">
                                    <FaCheckCircle /> Participation Confirmed
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-500 ">
                                      Deals will be sechdule as sonn as possible.
                                    </p>
                                    {
                                      participatedProducts?.length > 0 && (
                                        <p className="text-xs md:text-sm text-gray-500">You have already added {participatedProducts?.length} products.</p>
                                      )
                                    }
                                    <button
                                      onClick={() => {
                                        const queryParams = new URLSearchParams(
                                          location.search
                                        );
                                        const tabValue = queryParams.get("TAB"); // Get the current TAB value
                                        const dealType = tabMapping[tabValue]; // Default to original if not found
                                        navigate(
                                          `/dashboard/participate-deal/${promo?._id}?dealType=${dealType}`
                                        );
                                      }}
                                      className="mt-2 px-3 py-2 bg-blue-500 text-white rounded text-xs md:text-sm"
                                    >
                                      Add More
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="text-green-600 font-medium text-xs md:text-sm">
                                      Open for participation
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-500 ">
                                      Last day: {formatMongoDate(minJoinDate)}
                                    </p>
                                    <button
                                      onClick={() => {
                                        const queryParams = new URLSearchParams(
                                          location.search
                                        );
                                        const tabValue = queryParams.get("TAB"); // Get the current TAB value
                                        const dealType = tabMapping[tabValue]; // Default to original if not found
                                        navigate(
                                          `/dashboard/participate-deal/${promo?._id}?dealType=${dealType}`
                                        );
                                      }}
                                      className="mt-2 px-3 py-2 bg-blue-500 text-white rounded text-xs md:text-sm"
                                    >
                                      Participate
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          } else {
                            return (
                              <div>
                                <p className="text-red-600 font-medium text-xs md:text-sm">
                                  Closed for participation
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 ">
                                  Contact us to participate
                                </p>
                              </div>
                            );
                          }
                        })()
                      ) : (
                        <div>
                          <p className="text-red-600 font-medium">
                            Closed for participation
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            Contact us to participate
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-4 text-center text-gray-500 font-medium text-sm md:text-base"
                  >
                    No Deal available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Promotions;
