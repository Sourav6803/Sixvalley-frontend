import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";

import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";
import analytics from "./icon/Analytics .png"
import orderImg from "./icon/order.png";
import storeImg from "./icon/store.png";
import productImg from "./icon/products.png"
import customerImg from "./icon/rating.png"
import pendingImg from "./icon/time.png"
import confirmedImg from "./icon/shopping-bag.png"
import packagingImg from "./icon/package-box.png"
import outForDeliveryImh from "./icon/delivery-bike.png"
import delivredImg from "./icon/products.png"
import returnedImg from "./icon/cancel.png"
import rejectedImg from "./icon/rejected.png"
import cancledImg from "./icon/cancelled.png"
import adminWalletImg from "./icon/wallet.png"
import earningImg from "./icon/earnings.png"
import deliveryChargeImg from "./icon/electric-truck.png"
import totalTaskImg from "./icon/tax.png"
import TopImg from "./icon/badge.png"
import popularImg from "./icon/fire.png"
import pendingPaymentImg from "./icon/payment-authentication.png"
import inHouseEarningImg from "./icon/dollar-symbol.png"
import ReactApexChart from 'react-apexcharts';
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";


const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);



 
  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: "₹" + item?.totalPrice,
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  const [series, setSeries] = useState([
    {
      name: 'Inhouse',
      type: 'column',
      data: [11000, 23000, 25800, 33000, 35000, 38900, 41100, 42300]
    },
    {
      name: 'Vendor',
      type: 'column',
      data: [12000, 21000, 27800, 35000, 38000, 40900, 41900, 46300]
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1]
    },
    title: {
      text: 'Order Stastic',
      align: 'left',
      offsetX: 110
    },
    xaxis: {
      categories: ["Jan", "Feb", "March", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    },
    yaxis: [
      {
        min: 0,
        seriesName: 'Inhouse',
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB'
        },
        labels: {
          style: {
            colors: '#008FFB',
          }
        },

        tooltip: {
          enabled: true
        }
      },
      {
        min: 0,
        seriesName: 'vendor',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396'
        },
        labels: {
          style: {
            colors: '#00E396',
          }
        },

      },

    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  });

  const [pieSeries, setPieSeries] = useState([44, 55, 41]);
  const [pieOptions, setPieOptions] = useState({
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,

        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  });

  return (
    <>
      {
        adminOrderLoading ? (
          <Loader />
        ) : (
          <div className="w-full p-2 bg-white ">
            <h3 className="text-[22px] font-Poppins pb-2">Welcome Admin</h3>
            <h2 className="text-[16px] font-Poppins pb-2 text-gray-700 font-light">Monitor your business analytics and statistics.</h2>

            {/* Business Analatics */}
            <div className="w-full block 800px:flex items-center 1000px:justify-around flex-col bg-slate-100 rounded-md">


              <div className="w-full flex items-center justify-between m-1 ">
                <div className=" flex items-center justify-center gap-2 p-2  ">
                  {/* <GrAnalytics color="#fff" size={25} className="text-red-500" /> */}
                  <img src={analytics} alt="Analytics" className="h-5" />
                  <h2 className="text-[22px] font-Poppins ">Business Analytics</h2>
                </div>
                <div className="border rounded-md flex items-center justify-center gap-2 p-2 my-2 mr-3">

                  Overall Statistics
                  <IoIosArrowDown className="cursor-pointer" />
                </div>

              </div>

              <div className="w-full  p-2  ">
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-2 p-2  ">

                  <div className=" mb-4 bg-[#e1e1e2]  p-2 min-h-[18vh]  shadow-md hover:shadow-lg border rounded px-2 py-5">
                    <div className="flex items-center gap-3 md:gap-6 mx-auto  justify-center">
                      <img src={productImg} alt="Analytics" className="h-7" />
                      <h3
                        className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                      >
                        All Product
                      </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-center">{sellers && sellers.length}</h5>
                    <Link to="/admin-product" className="text-center b">
                      <h5 className="pt-4 pl-2 text-blue-800 font-bold">View Product</h5>
                    </Link>
                  </div>

                  <div className=" mb-4  p-2 min-h-[18vh] bg-[#e1e1e2] shadow-md hover:shadow-lg border rounded px-2 py-5 ">
                    <div className="flex items-center gap-3 justify-center">
                      <img src={orderImg} alt="Analytics" className="h-7" />
                      <h3
                        className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                      >
                        Total Orders
                      </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-center text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
                    <Link to="/admin-orders">
                      <h5 className="pt-4 pl-2 text-blue-800 font-bold text-center">View Orders</h5>
                    </Link>
                  </div>

                  <div className=" mb-4  p-2 min-h-[18vh] bg-[#e1e1e2] shadow-md hover:shadow-lg border rounded px-2 py-5">
                    <div className="flex items-center gap-3 justify-center">
                      <img src={storeImg} alt="Analytics" className="h-7" />
                      <h3
                        className={`${styles.productTitle} text-center !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                      >
                        Store
                      </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] text-center font-[500]">{sellers && sellers.length}</h5>
                    <Link to="/admin-sellers">
                      <h5 className="pt-4 pl-2 text-center text-blue-800 font-bold">View Store</h5>
                    </Link>
                  </div>

                  <div className=" mb-4  p-2 min-h-[18vh] bg-[#e1e1e2] shadow-md hover:shadow-lg border rounded px-2 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <img src={customerImg} className="h-7" alt="customer" />
                      <h3
                        className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                      >
                        All Customer
                      </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-center">{adminOrders && adminOrders.length}</h5>
                    <Link to="/admin-orders">
                      <h5 className="pt-4 pl-2 text-center font-bold text-blue-800">View Customer</h5>
                    </Link>
                  </div>

                </div>
              </div>



              <div className="w-full  p-2 mt-1">
                <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-2">
                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={pendingImg} alt="" className="h-7 ml-3" />
                      <h2 className="text-lg font-medium">Pending</h2>
                    </div>
                    <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={confirmedImg} alt="" className="h-7 ml-3" />
                      <h2 className="text-lg font-medium">Confirmed</h2>
                    </div>
                    <div className="font-medium text-lg mr-3 text-green-400">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={packagingImg} alt="" className="h-7 ml-3" />
                      <h2 className="text-lg font-medium">Packaging</h2>
                    </div>
                    <div className="text-yellow-400 font-semibold text-xl mr-3">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={delivredImg} alt="" className="h-7 ml-3" />
                      <h2 className="text-lg font-medium">Delivered</h2>
                    </div>
                    <div className="text-green-400 font-semibold text-xl mr-3">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={outForDeliveryImh} alt="" className="h-7 ml-3" />
                      <h2 className="font-medium text-lg">Out For Delivery</h2>
                    </div>
                    <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={returnedImg} alt="" className="h-7 ml-3" />
                      <h2 className="text-lg font-medium">Returned</h2>
                    </div>
                    <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={cancledImg} alt="" className="h-7 ml-3" />
                      <h2 className="font-medium text-lg">Cancled</h2>
                    </div>
                    <div className="text-red-400 font-semibold text-xl mr-3">20</div>
                  </div>

                  <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <img src={rejectedImg} alt="" className="h-7 ml-3" />
                      <h2 className="font-medium text-lg">Failed To Delivery</h2>
                    </div>
                    <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
                  </div>
                </div>
              </div>

            </div>

            {/*  Admin wallet */}

            <div className="w-full block 800px:flex items-center 1000px:justify-between flex-col bg-slate-100 rounded-md mt-3">


              <div className="w-full flex items-center justify-between m-1 ">
                <div className=" flex items-center justify-center gap-2 p-2  ">
                  <img src={adminWalletImg} alt="Analytics" className="h-5" />
                  <h2 className="text-[22px] font-Poppins ">Admin Wallet</h2>
                </div>

              </div>

              <div className="w-full  p-3 ">
                <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-2  ">
                  <div className="w-full mb-4 bg-white  p-2 h-[26vh]  shadow-md hover:shadow-lg border rounded-md px-2 py-5">
                    <div className="flex items-center justify-center flex-col gap-2">
                      <img src={inHouseEarningImg} alt="dollar" className="h-[10vh]" />
                      <h1 className="text-xl text-slate-800 font-bold">₹ 78,478</h1>
                      <h2 className="text-slate-600">In House Earnings</h2>
                    </div>
                  </div>

                  <div className="w-full  bg-white flex flex-col items-center justify-center gap-2  h-[26vh]  shadow-md hover:shadow-lg  rounded-md ">
                    <div className="flex items-center justify-between  rounded-md   w-full">
                      <div className="flex flex-col m-2">
                        <h1 className="text-xl text-slate-800 font-bold">₹ 78,478</h1>
                        <h3 className="font-semibold text-gray-500">Commison Earned</h3>
                      </div>
                      <div className="mr-3">
                        <img src={earningImg} className="h-[5vh]" alt="earning" />
                      </div>
                    </div>


                    <div className="flex items-center justify-between rounded-md  w-full   ">
                      <div className="flex flex-col m-2">
                        <h1 className="text-xl text-slate-800 font-bold">₹ 78,478</h1>
                        <h3 className="font-semibold text-gray-500">Total Tax Collected</h3>
                      </div>
                      <div className="mr-3">
                        <img src={totalTaskImg} className="h-[5vh]" alt="earning" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full  bg-white flex flex-col items-center justify-center gap-2  h-[26vh]  shadow-md hover:shadow-lg  rounded-md ">
                    <div className="flex items-center justify-between  rounded-md   w-full">
                      <div className="flex flex-col m-2">
                        <h1 className="text-xl text-slate-800 font-bold">₹ 78,478</h1>
                        <h3 className="font-semibold text-gray-500">Delivery Charge Earned</h3>
                      </div>
                      <div className="mr-3">
                        <img src={deliveryChargeImg} className="h-[5vh]" alt="earning" />
                      </div>
                    </div>


                    <div className="flex items-center justify-between rounded-md  w-full   ">
                      <div className="flex flex-col m-2">
                        <h1 className="text-xl text-slate-800 font-bold">₹ 78,478</h1>
                        <h3 className="font-semibold text-gray-500">Pending Amount</h3>
                      </div>
                      <div className="mr-3">
                        <img src={pendingPaymentImg} className="h-[5vh]" alt="earning" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>


            {/* Statisic 1 */}
            <div className="w-full  800px:flex items-center 1000px:justify-between  bg-slate-100 rounded-md p-3 mt-3 gap-2 grid lg:grid-cols-2 md:grid-cols-1 ">
              <div className=" w-full md:w-[60%] bg-white rounded-md h-[55vh] md:h-[60vh]  ">
                <div>
                  <div id="chart">
                    <ReactApexChart options={options} series={series} type="line" height={400} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>


              <div className=" w-full md:w-[40%]  bg-white rounded-md h-[40vh] md:h-[60vh]  ">
                <div className="">
                  <h2 className="text-center m-2 text-xl font-bold">User Overview</h2>
                  <div id="chart" className="  min-h-[50vh] flex items-center justify-center">
                    <ReactApexChart options={pieOptions} series={pieSeries} type="donut" />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>

            {/* Statisic 2 */}

            <div className="w-full 800px:flex flex-col items-center  bg-slate-200 rounded-md p-3 mt-3">
              <h2 className="text-xl text-center font-semibold">Earning Statistics</h2>
              <div className=" w-full bg-white rounded-md md:h-[56vh] h-[45vh] mt-3 ">
                <div>
                  <div id="chart">
                    <ReactApexChart options={options} series={series} type="line" height={350} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>

            {/* popular product, store, customer */}


            <div className="w-full flex items-center 1000px:justify-between  bg-slate-100 rounded-md mt-3 p-2">

              <div className="w-full grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-2 rounded-md bg-white p-1">

                <div className="bg-white rounded-md h-[90vh] md:h-[70vh]  flex flex-col items-center gap-2 md:gap-1 border-2 ">
                  <div className="flex items-center justify-center mx-auto p-2 h-10 bg-white w-full rounded-md ">
                    <img src={popularImg} alt="top" className="h-10" />
                    <h2 className="text-gray-500 font-bold text-lg">Popular Product</h2>
                  </div>

                  <div className="bg-white w-full h-full md:px-5 p-2 flex items-center justify-between gap-2 ">
                    <div className="border rounded-md md:pl-4  flex flex-col items-center justify-center p-2  h-[20vh] w-[45vw] md:h-[15vh] md:w-[12vw]">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png" alt="" className="h-[50px]" />
                      <p className="text-center text-[12px] ">Printed T-Shirt</p>
                      <div className="flex items-center justify-center">
                        <AiFillStar color="red" />
                        <p className="text-center text-[12px]">4.4 (5 Reviews)</p>
                      </div>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center hover:shadow-lg p-2 md:pr-4 h-[20vh] w-[45vw] md:h-[15vh] md:w-[12vw]">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png" alt="" className="h-[50px]" />
                      <p className="text-center text-[12px]">Printed T-Shirt </p>
                      <div className="flex items-center justify-center">
                        <AiFillStar color="red" />
                        <p>4.4 (5 Reviews)</p>
                      </div>
                    </div>

                  </div>

                  <div className="bg-white w-full h-full md:px-5 p-2 flex items-center justify-between gap-2 ">
                    <div className="border rounded-md md:pl-4  flex flex-col items-center justify-center p-2  h-[20vh] w-[45vw] md:h-[15vh] md:w-[12vw]">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png" alt="" className="h-[50px]" />
                      <p className="text-center text-[12px] ">Printed T-Shirt</p>
                      <div className="flex items-center justify-center">
                        <AiFillStar color="red" />
                        <p className="text-center text-[12px]">4.4 (5 Reviews)</p>
                      </div>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center hover:shadow-lg p-2 md:pr-4 h-[20vh] w-[45vw] md:h-[15vh] md:w-[12vw]">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png" alt="" className="h-[50px]" />
                      <p className="text-center text-[12px]">Printed T-Shirt </p>
                      <div className="flex items-center justify-center">
                        <AiFillStar color="red" />
                        <p>4.4 (5 Reviews)</p>
                      </div>
                    </div>

                  </div>

                  <div className="bg-white w-full h-full md:px-5 p-2 flex items-center justify-between gap-2 ">
                    <div className="border rounded-md md:pl-4  flex flex-col items-center justify-center p-2  h-[20vh] w-[45vw] md:h-[15vh] md:w-[12vw]">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png" alt="" className="h-[50px]" />
                      <p className="text-center text-[12px] ">Printed T-Shirt</p>
                      <div className="flex items-center justify-center">
                        <AiFillStar color="red" />
                        <p className="text-center text-[12px]">4.4 (5 Reviews)</p>
                      </div>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center hover:shadow-lg p-2 md:pr-4 h-[20vh] w-[45vw] md:h-[15vh] md:w-[12vw]">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png" alt="" className="h-[50px]" />
                      <p className="text-center text-[12px]">Printed T-Shirt </p>
                      <div className="flex items-center justify-center">
                        <AiFillStar color="red" />
                        <p>4.4 (5 Reviews)</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* <div className="bg-white rounded-md h-[70vh] flex flex-col items-center p-2 border-2 ">
                  <div className="flex items-center justify-center mx-auto p-2 h-10 bg-white w-full rounded-md ">
                    <img src={TopImg} alt="top" className="h-10" />
                    <h2 className="text-gray-500 font-bold text-lg">Top Delivery Man</h2>
                  </div>

                  <div className="bg-white w-full p-2 cursor-pointer shadow-md grid lg:grid-cols-2 md:grid-cols-2 400px:grid-cols-2 gap-2  ">
                    <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                      <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                      <p className="text-center font-semibold text-[14px]">Jhon Doe</p>
                      <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                      <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                      <p className="text-center font-semibold text-[14px]">Roy</p>
                      <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                      <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                      <p className="text-center font-semibold text-[14px]">Roy</p>
                      <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                      <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                      <p className="text-center font-semibold text-[14px]">Roy</p>
                      <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                    </div>

                    <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                      <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                      <p className="text-center font-semibold text-[14px]">Roy</p>
                      <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                    </div>
                  </div>
                </div> */}

                <div className="bg-white rounded-md h-[70vh] lex flex-col items-center p-2 relative border-2  overflow-y-scroll">
                  <div className="flex items-center justify-center mx-auto p-2 h-10 bg-white w-full rounded-md ">
                    <img src={TopImg} alt="top" className="h-10" />
                    <h2 className="text-gray-500 font-bold text-lg">Top Selling Product</h2>
                  </div>

                  <div className="w-full   rounded-md gap-2 md:gap-3 mt-0 flex items-center flex-col p-2  ">
                    <div className="flex items-center justify-between gap-2 h-[10vh] md:h-[9vh] border w-full px-3 rounded-md">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png" alt="" className="h-[50px]" />

                      <p>Movile cover</p>
                      <div className="border border-blue-400 p-1 rounded-md">
                        Sold: 28
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 h-[10vh] md:h-[9vh] border w-full px-3 rounded-md">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png" alt="" className="h-[50px]" />

                      <p>Movile cover</p>
                      <div className="border border-blue-400 p-1 rounded-md">
                        Sold: 28
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 h-[10vh] md:h-[9vh] border w-full px-3 rounded-md">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png" alt="" className="h-[50px]" />

                      <p>Movile cover</p>
                      <div className="border border-blue-400 p-1 rounded-md">
                        Sold: 28
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 h-[10vh] md:h-[9vh] border w-full px-3 rounded-md">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png" alt="" className="h-[50px]" />

                      <p>Movile cover</p>
                      <div className="border border-blue-400 p-1 rounded-md">
                        Sold: 28
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 h-[10vh] md:h-[9vh] border w-full px-3 rounded-md">
                      <img src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png" alt="" className="h-[50px]" />

                      <p>Movile cover</p>
                      <div className="border border-blue-400 p-1 rounded-md">
                        Sold: 28
                      </div>
                    </div>

                  </div>
                </div>


              </div>

            </div>


            <div className="w-full block 800px:flex items-center 1000px:justify-between  bg-slate-100 rounded-md mt-3 p-2">
              <div className="w-full ">
                <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-2 rounded-md bg-slate-200">

                  <div className="bg-white rounded-md h-[60vh] lex flex-col items-center p-2 ">
                    <div className="flex items-center justify-center mx-auto p-2 h-10 bg-white w-full rounded-md ">
                      <img src={TopImg} alt="top" className="h-10" />
                      <h2 className="text-gray-500 font-bold text-lg">Top Customer</h2>
                    </div>



                    <div className="bg-white w-full p-2 cursor-pointer shadow-md grid lg:grid-cols-2 md:grid-cols-2 400px:grid-cols-2 gap-2  ">
                      <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                        <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                        <p className="text-center font-semibold text-[14px]">Jhon Doe</p>
                        <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                      </div>

                      <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                        <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                        <p className="text-center font-semibold text-[14px]">Roy</p>
                        <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                      </div>

                      <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                        <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                        <p className="text-center font-semibold text-[14px]">Roy</p>
                        <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                      </div>

                      <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                        <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                        <p className="text-center font-semibold text-[14px]">Roy</p>
                        <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                      </div>

                      <div className="border rounded-md flex flex-col items-center justify-center p-2 h-[15vh] w-full ">
                        <img src="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd45662c830.png" alt="" className="h-[50px]" />
                        <p className="text-center font-semibold text-[14px]">Roy</p>
                        <p className="text-center text-[12px] py-[2px] px-1 rounded-md border border-blue-400">Order Delivered : 7</p>
                      </div>
                    </div>



                  </div>

                  <div className="bg-white rounded-md h-[60vh] lex flex-col items-center p-2 relative">
                    <div className="flex items-center justify-center mx-auto p-2 h-10 bg-white w-full rounded-md ">
                      <img src={popularImg} alt="top" className="h-10" />
                      <h2 className="text-gray-500 font-bold text-lg">Top Selling Store</h2>
                    </div>

                    <div className="w-full bg-white  rounded-md gap-2 mt-0 flex items-center flex-col p-2  ">
                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">₹ 28999</p>
                          <BiShoppingBag color="red" size={20} className="mt-[3px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">₹ 28999</p>
                          <BiShoppingBag color="red" size={20} className="mt-[3px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">₹ 28999</p>
                          <BiShoppingBag color="red" size={20} className="mt-[3px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">₹ 28999</p>
                          <BiShoppingBag color="red" size={20} className="mt-[3px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">₹ 28999</p>
                          <BiShoppingBag color="red" size={20} className="mt-[3px]" />
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="bg-white rounded-md h-[60vh] lex flex-col items-center p-2 relative">
                    <div className="flex items-center justify-center mx-auto p-2 h-10 bg-white w-full rounded-md ">
                      <img src={popularImg} alt="top" className="h-10" />
                      <h2 className="text-gray-500 font-bold text-lg">Most Popular Store</h2>
                    </div>

                    <div className="w-full bg-white  rounded-md gap-2 mt-0 flex items-center flex-col p-2  ">
                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">28</p>
                          <AiFillHeart color="red" className="mt-[5px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">28</p>
                          <AiFillHeart color="red" className="mt-[5px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">28</p>
                          <AiFillHeart color="red" className="mt-[5px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">28</p>
                          <AiFillHeart color="red" className="mt-[5px]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 h-[9vh] border w-full px-3 rounded-md cursor-pointer hover:shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <img src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png" alt="" className="h-[50px]" />
                          <p>Nandi Printings</p>
                        </div>
                        <div className="p-1 rounded-md flex items-center justify-center gap-1">

                          <p className="text-red-400 font-bold">28</p>
                          <AiFillHeart color="red" className="mt-[5px]" />
                        </div>
                      </div>

                    </div>
                  </div>



                </div>
              </div>
            </div>

            <div className="text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>

            {/* <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div> */}
          </div>
        )
      }
    </>
  );
};

export default AdminDashboardMain;
