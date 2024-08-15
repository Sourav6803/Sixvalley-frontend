import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar';
import ShopBanner from '../../components/Shop/ShopBanner';



const ShopBannerPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    

    <main className='relative'>
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className='flex  w-full'>

        <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <ShopBanner />
          </div>

        </section>
      </div>
    </main>
  )
}

export default ShopBannerPage