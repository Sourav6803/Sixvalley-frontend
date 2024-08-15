import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";
import Category from "../../components/Admin/Category";
import { useState } from "react";
import SubCategory from "../../components/Admin/SubCategory";

const SubCategoryPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <main className="relative ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full  ">
        <AdminSideBar active={15} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className="flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0 ">
          <div className="w-full ">
            <SubCategory />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SubCategoryPage;
