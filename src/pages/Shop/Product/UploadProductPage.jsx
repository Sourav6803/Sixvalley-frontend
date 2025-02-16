import React, { useState } from "react";


import UploadProduct from "../../../components/Shop/Product/UploadProduct";
import DashboardHeader from "../../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../../components/Shop/Layout/DemoSidebar";

const UploadProductPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <DemoSideBar
        active={5}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        open={open}
        setOpen={setOpen}
      />

      <UploadProduct sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default UploadProductPage;
