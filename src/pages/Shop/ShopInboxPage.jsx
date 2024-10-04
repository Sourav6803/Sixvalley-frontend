import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardMessages from "../../components/Shop/DashboardMessages";
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar';

const ShopInboxPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    

    <main className='relative'>

      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <div className='flex'>
        <DemoSideBar navOpen={navOpen} setNavOpen={setNavOpen} />
        <section className='flex min-h-screen flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <DashboardMessages />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ShopInboxPage