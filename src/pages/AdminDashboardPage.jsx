import React, { useState } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <main className="relative ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full  ">

        <AdminSidebar active={1} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0 '>
          <div className="w-full ">
            <AdminDashboardMain />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardPage;