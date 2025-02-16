import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ShopWithDrawMoneyPage = () => {
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

      <WithdrawMoney sidebarOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default ShopWithDrawMoneyPage;
