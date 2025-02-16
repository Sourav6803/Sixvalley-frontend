import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardHero from "../../components/Shop/DashboardHero";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ShopDashboardPage = ({ active }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <DashboardHero open={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopDashboardPage;
