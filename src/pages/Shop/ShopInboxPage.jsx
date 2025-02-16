import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardMessages from "../../components/Shop/DashboardMessages";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ShopInboxPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar navOpen={navOpen} setNavOpen={setNavOpen} open={open} setOpen={setOpen}  />
      <DashboardMessages sidebarOpen={open} setOpen={setOpen}  />
    </div>
  );
};

export default ShopInboxPage;

