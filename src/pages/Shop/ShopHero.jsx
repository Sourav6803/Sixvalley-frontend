import React from 'react'


import SellerHero from '../../components/Shop/Layout/SellerHero';

const ShopHeroPage = () => {
 
  return (
    <main className='relative'>

      {/* <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} /> */}
      <div className='flex'>
        
        <section className='flex min-h-screen flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <SellerHero />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ShopHeroPage