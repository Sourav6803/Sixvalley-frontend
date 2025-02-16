import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";

import OrderReport from "../../components/Shop/OrderReport";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const OrderReportPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <DemoSideBar
        active={4}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        open={open}
        setOpen={setOpen}
      />

      <OrderReport sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default OrderReportPage;
