import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import AllProducts from '../../components/Shop/AllProducts'
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar'

const ShopAllProducts = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    // <div>
    //   <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen} />
    //   <div className='flex  justify-between w-full'>
    //     <div className='w-[80px] 800px:w-[330px]'>
    //       <DemoSideBar active={3} navOpen = {navOpen} setNavOpen= {setNavOpen} />
    //     </div>
    //     <div className='w-full justify-center flex'>
    //       <AllProducts />
    //     </div>
    //   </div>
    // </div>

    <main className='relative'>
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className='flex  w-full'>

        <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <AllProducts />
          </div>

        </section>
      </div>
    </main>



  )
}

export default ShopAllProducts