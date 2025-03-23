import React, { useState } from "react";
//  import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";



import SettingsPage from "../../../components/Shop/Settings/Settings";
import DemoSideBar from "../../../components/Shop/Layout/DemoSidebar";
import DashboardHeader from "../../../components/Shop/Layout/DashboardHeader";

const ShopSettingsPage = () => {
  const [navOpen, setNavOpen] = useState(false);
   const [open, setOpen] = useState(true)
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <DemoSideBar open={open} setOpen={setOpen}  />

      <SettingsPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopSettingsPage;
