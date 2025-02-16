import React from "react";


import { useState } from "react";
import Brand from "../../../components/Admin/Brand";
import DemoSideBar from "../../../components/Shop/Layout/DemoSidebar";
import DashboardHeader from "../../../components/Shop/Layout/DashboardHeader";

const BrandPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <DemoSideBar open={open} setOpen={setOpen} />

      <Brand sidebarOpen={open} setOpen={setOpen}  />
    </div>
  );
};

export default BrandPage;
