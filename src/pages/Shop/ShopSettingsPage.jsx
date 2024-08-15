import React, { useState } from "react";
import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DemoSideBar from "../../components/Shop/Layout/DemoSidebar";

const ShopSettingsPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    // <div>
    //   <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen} />
    //   <div className="flex items-center w-full">
    //     <div className="">
    //       <DemoSideBar active={11}  navOpen = {navOpen} setNavOpen= {setNavOpen}/>
    //     </div>
    //     <ShopSettings />
    //   </div>

    // </div>

    <main className='relative'>
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className='flex  w-full'>

        <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <ShopSettings />
          </div>

        </section>
      </div>
    </main>
  );
};

export default ShopSettingsPage;
