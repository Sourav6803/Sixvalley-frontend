import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ProductReport from "../../components/Shop/ProductReport";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ProductReortPage = () => {
  const [navOpen, setNavOpen] = useState(false);
   const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar active={4} navOpen={navOpen} setNavOpen={setNavOpen} open={open} setOpen={setOpen} />

      <ProductReport sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default ProductReortPage;
