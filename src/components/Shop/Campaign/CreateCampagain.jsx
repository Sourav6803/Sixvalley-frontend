import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import ManualCampaign from "./ManualCampaign";
import SmartCampaign from "./SmartCampaign";
import NewCatalogBooster from "./NewCatalogBooster";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const CreateCampaign = ({ open }) => {
  const [selectedCampaign, setSelectedCampaign] = useState("manual"); // Default to Manual Campaign
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [budgetOption, setBudgetOption] = useState("");
  const location = useLocation(); 
 
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab") || "manual";
    setSelectedCampaign(tab);
  }, [location.search]);

  useEffect(() => {
    if (selectedCampaign) {
      navigate(`/dashboard-create-campaign?tab=${selectedCampaign}`);
    }
  }, [selectedCampaign, navigate])

 

  const campaigns = [
    {
      id: "manual",
      title: "Manual Campaign",
      description: "Only the catalogs selected by you are advertised",
      image: "https://img.icons8.com/color/48/spiral-bound-booklet.png",
      isNew: false,
      isDisabled: false,
    },
    {
      id: "smart",
      title: "Smart Campaign",
      description: "Automatically selects and manages catalogs",
      image: "https://img.icons8.com/color/48/sparkling.png",
      isNew: false,
      isDisabled: false,
    },
    {
      id: "booster",
      title: "New Catalog Booster",
      description: "Make your new catalogs successful",
      image: "https://img.icons8.com/office/40/rocket.png",
      isNew: true,
      isDisabled: false,
    },
    {
      id: "top",
      title: "Top Catalogs Campaign",
      description: "No eligible catalogs",
      image: "https://img.icons8.com/clouds/100/trophy--v1.png",
      isNew: false,
      isDisabled: true,
    },
  ];

  const handleSelect = (id) => {
    if (!campaigns.find((campaign) => campaign.id === id).isDisabled) {
      setSelectedCampaign(id);
    }
  };

  const handleSelectCatalog = (id) => {
    setSelectedCatalog(id);
  };

  const handleBudgetChange = (option) => {
    setBudgetOption(option);
  };

  const renderSelectedCampaign = () => {
    switch (selectedCampaign) {
      case "manual":
        return (
          <ManualCampaign
            selectedCampaign={selectedCampaign}
            selectedCatalog={selectedCatalog}
            onSelectCatalog={handleSelectCatalog}
            budgetOption={budgetOption}
            onBudgetChange={handleBudgetChange}
            open={open}
          />
        );
      case "smart":
        return <SmartCampaign />;
      case "booster":
        return <NewCatalogBooster />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] transition-all duration-300 overflow-y-auto p-0 md:p-2`}
    >
      <div className="w-full mx-auto shadow-lg rounded-lg p-2">
        {/* Header */}
        <div className="flex bg-white justify-between items-center mb-6 p-3 rounded-md">
          <h2 className="md:text-xl text-md font-semibold text-gray-700">
            Create New Campaign
          </h2>
          <button className="text-sm text-red-600 font-medium hover:underline flex items-center gap-1">
            <CiCircleRemove /> Discard Campaign
          </button>
        </div>

        {/* Campaign Type Selection */}
        <div className="bg-white p-3 rounded-md">
          <h3 className="text-md font-medium text-gray-700 mb-4">
            Choose a campaign type
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 relative">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => handleSelect(campaign.id)}
                className={`p-4 border rounded-lg cursor-pointer relative ${
                  selectedCampaign === campaign.id
                    ? "border-purple-600"
                    : "border-gray-300"
                } ${
                  campaign.isDisabled
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:shadow-lg"
                }`}
              >
                {/* Selected Indicator */}
                {selectedCampaign === campaign.id && (
                  <span className="absolute top-[-8px] right-[-8px] bg-white rounded-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 21a9 9 0 100-18 9 9 0 000 18zm5.53-11.47a.75.75 0 00-1.06-1.06L11 13.94l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l6-6z"
                        fill="#3C29B7"
                      ></path>
                    </svg>
                  </span>
                )}

                {/* Campaign Content */}
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src={campaign.image}
                      alt={`${campaign.title} icon`}
                      className={`w-8 h-8 mb-2 ${
                        campaign.isDisabled ? "opacity-50" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`flex ml-2 flex-col text-sm font-semibold ${
                      campaign.isDisabled ? "text-gray-400" : "text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {campaign.title}
                      {campaign.isNew && (
                        <span className="ml-2 text-sm text-green-600 bg-green-100 rounded-full px-2 py-1">
                          NEW
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        campaign.isDisabled
                          ? "text-gray-400"
                          : "text-gray-500 font-light"
                      }`}
                    >
                      {campaign.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render Selected Campaign */}
      <div className="mt-6">{renderSelectedCampaign()}</div>

      
    </div>
  );
};

export default CreateCampaign;
