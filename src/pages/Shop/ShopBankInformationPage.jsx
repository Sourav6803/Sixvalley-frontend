import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";
import ShopBankInformation from "../../components/Shop/ShopBankInformation";

const ShopBankInformationPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <ShopBankInformation sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopBankInformationPage;
