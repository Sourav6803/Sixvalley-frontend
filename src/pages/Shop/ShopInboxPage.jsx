import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardMessages from "../../components/Shop/DashboardMessages";
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar';

const ShopInboxPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div>
    <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen}/>
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DemoSideBar active={8} navOpen = {navOpen} setNavOpen= {setNavOpen} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default ShopInboxPage