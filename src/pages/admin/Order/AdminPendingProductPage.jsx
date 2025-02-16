import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../../../redux/actions/order";
import AdminPendingOrder from "../../../components/Admin/Order/AdminPendingProduct";
import DashboardSideBar from "../../../components/Shop/Layout/DashboardSidebar";
import { getAllOrdersOfAdmin } from "../../../redux/actions/order";

const AdminPendingOrderPage = () => {
  const dispatch = useDispatch();

  const [navOpen, setNavOpen] = useState(false);

  const { adminOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  
  return (
    <main className="relative">
      <DashboardHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex  w-full">
        <DashboardSideBar
          active={4}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
        />

        <section className="flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
          <div className="w-full">
            <AdminPendingOrder />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminPendingOrderPage;
