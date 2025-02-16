import React, { useState } from "react";
import DashboardHeader from "../../../components/Shop/Layout/DashboardHeader";
import DemoSideBar from "../../../components/Shop/Layout/DemoSidebar";
import ParticipateDeal from "../../../components/Shop/Promotions/Participate-deal";

const ParticipateDealPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <ParticipateDeal open={open} setOpen={setOpen}/>
    </div>
  );
};

export default ParticipateDealPage;