import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

import Dashboard from "../../components/Shop/BusinessDashboard/Dashboard";

const BusinessDashboardPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <Dashboard open={open} setOpen={setOpen} />
    </div>
  );
};

export default BusinessDashboardPage;