import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import CreateEvent from "../../components/Shop/CreateEvent";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar';
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar';



const ShopCreateEvents = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    // <div>
    //   <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen} />
    //   <div className="flex items-center justify-between w-full">
    //     <div className="w-[80px] 800px:w-[300px]">
    //       <DemoSideBar active={6} navOpen = {navOpen} setNavOpen= {setNavOpen} />
    //     </div>
    //     <div className="w-full justify-center flex">
    //       <CreateEvent />
    //     </div>
    //   </div>
    // </div>

    <main className='relative'>
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className='flex  w-full'>

        <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <CreateEvent />
          </div>

        </section>
      </div>
    </main>
  )
}

export default ShopCreateEvents