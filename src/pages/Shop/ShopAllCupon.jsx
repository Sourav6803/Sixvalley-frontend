import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";
import Coupon from "../../components/Admin/Coupon";

const ShopAllCupoun = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} open={open} setOpen={setOpen} />
      <Coupon sidebarOpen={open} setSidebarOpen={setOpen}  />
    </div>
  );
};

export default ShopAllCupoun;


