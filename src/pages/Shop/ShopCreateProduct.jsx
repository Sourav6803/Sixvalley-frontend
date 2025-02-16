import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";
import CreateProduct from "../../components/Shop/CreateProduct";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ShopCreateProduct = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />

      <CreateProduct sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopCreateProduct;
