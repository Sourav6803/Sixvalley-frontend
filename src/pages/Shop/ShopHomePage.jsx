import React, { useState } from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import VendorSidebar from '../../components/Shop/Layout/VendorSidebar';
import DemoSideBar from '../../components/Shop/Layout/DemoSidebar';

const ShopHomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen} />

      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>  

    // <main className='relative'>
    //   <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

    //   <div className='flex  w-full'>

    //     <DemoSideBar active={5} navOpen={navOpen} setNavOpen={setNavOpen} />

    //     <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
    //       <div className='w-full'>
    //         < />
    //       </div>

    //     </section>
    //   </div>
    // </main>

  )
}

export default ShopHomePage