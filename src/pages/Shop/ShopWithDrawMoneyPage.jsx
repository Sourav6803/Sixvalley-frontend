import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar';
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar';

const ShopWithDrawMoneyPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    //   <div>
    //   <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen} />
    //   <div className="flex items-center w-full">

    //       <DemoSideBar active={7} navOpen = {navOpen} setNavOpen= {setNavOpen} />

    //      <WithdrawMoney />
    //   </div>
    // </div>

    <main className='relative'>
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className='flex  w-full'>

        <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <WithdrawMoney />
          </div>

        </section>
      </div>
    </main>
  )
}

export default ShopWithDrawMoneyPage