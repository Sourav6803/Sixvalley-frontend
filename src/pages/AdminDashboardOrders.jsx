import React, { useEffect, useState } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const [navOpen, setNavOpen] = useState(false);

  const { adminOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });
  return (
    // <div>
    //   <AdminHeader />
    //   <div className="w-full flex">
    //     <div className="flex items-start justify-between w-full">
    //       <div className="w-[80px] 800px:w-[330px]">
    //         <AdminSideBar active={2} />
    //       </div>

    //       <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
    //         <div className="w-[97%] flex justify-center">
    //           <DataGrid
    //             rows={row}
    //             columns={columns}
    //             pageSize={4}
    //             disableSelectionOnClick
    //             autoHeight
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <main className="relative ">
      <AdminHeader navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="flex w-full  ">

        <AdminSideBar active={14} navOpen={navOpen} setNavOpen={setNavOpen} />

        <section className='flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0 '>
          <div className="w-full ">
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardOrders;
