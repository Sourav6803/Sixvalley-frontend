// import React from 'react'
// import AdminHeader from '../../../components/Layout/AdminHeader'
// import AdminSideBar from '../../../components/Admin/Layout/AdminSidebar'
// // import Category from '../../../components/Admin/Category'
// import Category from '../../../components/Admin/Category/Category'
// import { useState } from 'react'

// const CategoryPage = () => {

//     const [navOpen, setNavOpen] = useState(false);
//   return (
//     <main className="relative ">
//       <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

//       <div className="flex w-full  ">

//         <AdminSideBar active={14} navOpen={navOpen} setNavOpen={setNavOpen} />

//         <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0 '>
//           <div className="w-full ">
//             <Category />
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }

// export default CategoryPage

import React, { useEffect } from "react";
import AdminHeader from "../../../components/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSidebar";
// import Category from '../../../components/Admin/Category'
import Category from "../../../components/Admin/Category/Category";
import { useState } from "react";
import { getCategoryHierarchy } from "../../../api/categoryApi";
import CategoryForm from "../../../components/Admin/Category/CategoryForm";
import CategoryTable from "../../../components/Admin/Category/CategoryTable";

const CategoryPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryHierarchy();
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    fetchCategories();
    setSelectedCategory(null);
  };
  return (
    <main className="relative ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full  ">
        <AdminSideBar active={14} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className="flex w-full min-h-screen  flex-1 flex-col  max-md:pb-14  md:p-5 p-1">
          <div className="w-full ">
            <div className="my-3">
              <h1 className="text-center text-lg font-bold">Category Management</h1>
              <CategoryForm
                onCategoryAdded={handleCategoryAdded}
                parentCategory={selectedCategory}
              />
              <CategoryTable
                categories={categories}
                onSelect={(category) => setSelectedCategory(category)}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
