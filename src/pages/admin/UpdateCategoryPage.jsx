import React from 'react'
import AdminHeader from '../../components/Layout/AdminHeader'
import AdminSideBar from '../../components/Admin/Layout/AdminSidebar'
import Category from '../../components/Admin/Category'
import { useState } from 'react'
import UpdateCategory from '../../components/Admin/UpdateCategory'

const UpdateCategoryPage = () => {

    const [navOpen, setNavOpen] = useState(false);
  return (
    <main className="relative  ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full ">

        <AdminSideBar active={14} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full  flex-1 flex-col px-0  max-md:pb-14 sm:px-0 '>
          <div className="w-full ">
            <UpdateCategory />
          </div>
        </section>
      </div>
    </main>
  )
}

export default UpdateCategoryPage