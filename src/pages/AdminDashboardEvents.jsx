import React, { useState } from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSidebar'
import AllEvents from '../components/Admin/AllEvents';

const AdminDashboardEvents = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
  //   <div>
  //   <AdminHeader />
  //   <div className="w-full flex">
  //     <div className="flex items-start justify-between w-full">
  //       <div className="w-[80px] 800px:w-[330px]">
  //         <AdminSideBar active={6} />
  //       </div>
  //       <AllEvents />
  //     </div>
  //   </div>
  // </div>

  <main className="relative ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full  ">

        <AdminSideBar active={14} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0 '>
          <div className="w-full ">
            <AllEvents />
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboardEvents