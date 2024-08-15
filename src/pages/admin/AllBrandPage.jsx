import React from 'react'
import AdminHeader from '../../components/Layout/AdminHeader'
import AdminSideBar from '../../components/Admin/Layout/AdminSidebar'

import { useState } from 'react'

import AllBrand from '../../components/Admin/AllBrand'

const AllBrandPage = () => {

  const [navOpen, setNavOpen] = useState(false);
  return (
    <main className="relative ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full  ">

        <AdminSideBar active={14} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0 '>
          <div className="w-full ">
            <AllBrand />
          </div>
        </section>
      </div>
    </main>
  )
}

export default AllBrandPage