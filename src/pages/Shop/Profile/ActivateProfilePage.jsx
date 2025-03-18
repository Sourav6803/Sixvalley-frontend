import React, { useState } from "react";
import DashboardHeader from "../../../components/Shop/Layout/DashboardHeader";
import TaxDetails from "../../../components/Shop/Profile/TaxDetails";
import PickupDetails from "../../../components/Shop/Profile/PickupDetails";
import BankDetails from "../../../components/Shop/Profile/BankDetails";
import SupplierDetails from "../../../components/Shop/Profile/SupplierDetails";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ActivateProfilePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(1);

  const { seller } = useSelector((state) => state.seller);
  const shopId = seller?._id

  const navigate = useNavigate()
  
  const [sellerData, setSellerData] = useState({
    pickupAddress: {},
    bankInfo: [],
    supplierDetails:{},
    sellerDocuments: {},
  });

   // Update seller data
   const handleDataUpdate = (stepKey, data) => {
    setSellerData((prevData) => ({
      ...prevData,
      [stepKey]: data,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${server}/shop/update-details`, {
        shopId,
        ...sellerData,
      });
  
      if (response.status === 200) {
        toast.success("Seller data updated successfully!");
        navigate("/dashboard")
      } else {
        toast.error("Failed to update seller data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating seller data:", error);
      toast.error("An error occurred while updating seller data.");
    }
  };

  const handleNextStep = () => {
    setCompletedSteps((prev) => Math.min(prev + 1, 4)); // Ensure the value doesn't exceed 4
  };

  const handlePreviousStep = () => {
    setCompletedSteps((prev) => Math.max(prev - 1, 1)); // Ensure the value doesn't go below 1
  };

  console.log("sellerData", sellerData);

   // Render components based on the current step
   const renderStep = () => {
    switch (completedSteps)  {
      case 1:
        return <PickupDetails onNext={handleNextStep} completedSteps={1} onDataUpdate={(data) => handleDataUpdate("pickupAddress", data)} />;
      case 2:
        return <BankDetails onNext={handleNextStep} onPrevious={handlePreviousStep} completedSteps={2} onDataUpdate={(data) => handleDataUpdate("bankInfo", data)} />;
      case 3:
        return <SupplierDetails onNext={handleNextStep} onPrevious={handlePreviousStep} completedSteps={3}  onDataUpdate={(data) => handleDataUpdate("supplierDetails", data)}  />;
      case 4:
        return <TaxDetails onNext={handleNextStep} onPrevious={handlePreviousStep} completedSteps={4} onDataUpdate={(data) => handleDataUpdate("sellerDocuments", data)} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
  };
  
  return (
    <main className="relative">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <div className="flex">
        
        <section className="flex min-h-screen flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
          <div className="w-full">
          {renderStep()}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ActivateProfilePage;
