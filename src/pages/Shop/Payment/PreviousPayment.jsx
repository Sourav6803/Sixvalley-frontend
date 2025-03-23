import React, { useState } from 'react'
import DashboardHeader from '../../../components/Shop/Layout/DashboardHeader'
import DemoSideBar from '../../../components/Shop/Layout/DemoSidebar';
import PaymentsToDate from '../../../components/Shop/Payment/PaymentsToDate';

const PreviousPaymentPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(true)

  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <DemoSideBar open={open} setOpen={setOpen} />
      <PaymentsToDate open={open} setOpen={setOpen}/>
    </div>
  )
}

export default PreviousPaymentPage