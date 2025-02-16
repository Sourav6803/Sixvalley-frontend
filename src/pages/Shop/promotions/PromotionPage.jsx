import React, { useState } from "react";
import DashboardHeader from "../../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../../components/Shop/Layout/DemoSidebar";
import HeroCampaign from "../../../components/Shop/Campaign/HeroCampaign";
import Promotions from "../../../components/Shop/Promotions/Promotions";

const PromotionPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      {/* <HeroCampaign open={open} setOpen={setOpen} /> */}
      <Promotions open={open} setOpen={setOpen}/>
    </div>
  );
};

export default PromotionPage;
