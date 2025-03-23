import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";

import AllProducts from "../../components/Shop/AllProducts";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ShopAllProducts = () => {
  const [navOpen, setNavOpen] = useState(false);
    const [open, setOpen] = useState(true)
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <AllProducts opens={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopAllProducts;
