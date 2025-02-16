import React from "react";
import analytics from "./Asset/dashboard.png";
import PendingOrderIcon from "./Asset/box.png";

const OrderAnalytic = () => {
  return (
    <div className="w-full block 800px:flex items-center 1000px:justify-around flex-col bg-slate-50 rounded-md">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between m-1 ml-2 ">
        <div className=" flex items-center justify-center gap-2 p-2 ">
          <img src={analytics} alt="Analytics" className="h-12 w-12" />
          <h2 className="text-[18px] text-gray-600 font-Poppins ">
            Your Dashboard{" "}
          </h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 mt-4 bg-gray-50 rounded-lg shadow-md">
        {/* Individual Card 1 */}
        <div className="h-[10vh] md:h-[13vh]  w-full rounded-md border p-2 gap-2 flex flex-col items-center cursor-pointer">
          <div className="flex items-center">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/stencil/32/data-pending.png"
              alt="data-pending"
            />
          </div>
          <div className="flex flex-col w-full items-center text-center ">
            <p className="text-[12px] truncate max-w-[98%]">Pending Orders</p>
            <p>12</p>
          </div>
        </div>

        {/* Individual Card 2 */}
        <div className="h-[10vh] md:h-[13vh] w-full rounded-md border p-2 gap-2 flex flex-col items-center cursor-pointer">
          <div className="flex items-center">
            <img
              src={PendingOrderIcon}
              className="h-8 w-8"
              alt="pending order"
            />
          </div>
          <div className="flex flex-col text-center w-full items-center">
            <p className="text-[12px] truncate max-w-[98%]">Download Labels</p>
            <p>12</p>
          </div>
        </div>

        {/* Individual Card 3 */}
        <div className="h-[10vh] md:h-[13vh]  w-full rounded-md border p-2 gap-2 flex flex-col items-center cursor-pointer ">
          <div className="flex items-center">
          <img width="40" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/external-out-of-stock-logistics-victoruler-flat-victoruler.png" className="h-8" alt="external-out-of-stock-logistics-victoruler-flat-victoruler"/>
          </div>
          <div className="flex flex-col text-center w-full items-center">
            <p className="text-[12px]">Out of stock</p>
            <p>12</p>
          </div>
        </div>

        {/* Individual Card 4 */}
        <div className="h-[10vh] md:h-[13vh]  w-full rounded-md border p-2 gap-2 flex flex-col items-center cursor-pointer">
          <div className="flex items-center">
          <img width="50" src="https://img.icons8.com/fluency/48/low-price.png" alt="low-price" className="h-8"/>
          </div>
          <div className="flex flex-col w-full items-center text-center">
            <p className="text-[12px]">Low stock</p>
            <p>12</p>
          </div>
        </div>
      </div>

      <h2 className="mt-3 font-semibold text-slate-500">Todays Overview</h2>

      <div className="w-full grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-x-2 p-1 mt-4 bg-gray-50 rounded-lg shadow-md">
        {/* Individual Card 1 */}

       
        <div className="h-[13vh] md:h-[10vh] w-full rounded-md border p-2 gap-x-1 flex flex-col md:flex-row items-center cursor-pointer">
          <div className="flex items-center ">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-sold-auction-house-flaticons-flat-flat-icons.png"
              alt="external-sold-auction-house-flaticons-flat-flat-icons"
            />
          </div>

          <div className="flex flex-col w-full items-center text-center ">
            <p className="text-[12px]">Unit Sold</p>
            <p>12</p>
          </div>
        </div>

        {/* Individual Card 2 */}
        <div className="h-[13vh] md:h-[10vh] w-full rounded-md border p-2  gap-x-1 flex flex-col md:flex-row items-center cursor-pointer">
          <div className="flex items-center ">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/color/48/sales-performance.png"
              alt="sales-performance"
            />
          </div>

          <div className="flex flex-col w-full items-center text-center ">
            <p className="text-[12px]">Sales</p>
            <p>12</p>
          </div>
        </div>

        {/* Individual Card 3 */}
        <div className="h-[13vh] md:h-[10vh] w-full rounded-md border p-2  gap-x-0 flex flex-col md:flex-row items-center cursor-pointer">
          <div className="flex items-center ">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/external-logistics-shipping-delivery-kmg-design-flat-kmg-design-2.png"
              alt="external-logistics-shipping-delivery-kmg-design-flat-kmg-design-2"
            />
          </div>

          <div className="flex flex-col w-full items-center text-center  ">
            <p className="text-[12px]">New Orders</p>
            <p>12</p>
          </div>
        </div>

        {/* Individual Card 4 */}
        <div className="h-[13vh] md:h-[10vh] w-full rounded-md border p-2  gap-x-1 flex flex-col md:flex-row items-center cursor-pointer">
          <div className="flex items-center ">
          <img width="50" height="50" src="https://img.icons8.com/dusk/50/list.png" alt="list"/>
          </div>

          <div className="flex flex-col w-full items-center text-center ">
            <p className="text-[12px] truncate">Active product</p>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAnalytic;
