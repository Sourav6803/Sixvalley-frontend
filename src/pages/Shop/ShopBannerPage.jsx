import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";
import ShopBanner from "../../components/Shop/ShopBanner";

const ShopBannerPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <ShopBanner sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopBannerPage;

