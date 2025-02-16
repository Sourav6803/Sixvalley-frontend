import React from 'react'
import PricingCommission from '../../components/Shop/welcome/PricingCommission'
import Navbar from '../../components/Shop/Layout/Navbar'
import Footer from '../../components/Shop/Layout/Footer'

const ShopCommissionPage = () => {
  return (
    <main className='relative'>

   
      <Navbar/>
      <div className='flex'>
        
        <section className='flex min-h-screen flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0'>
          <div className='w-full'>
            <PricingCommission />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default ShopCommissionPage