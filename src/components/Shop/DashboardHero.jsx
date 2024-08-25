import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
// import { Button } from "@material-ui/core";
import Button from '@mui/material/Button'
import { DataGrid } from "@material-ui/data-grid";
import { IoDiamondSharp } from "react-icons/io5";

// import { Button } from "@material-ui/core";

import { IoIosArrowDown } from "react-icons/io";
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
import ApexCharts from 'apexcharts'
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import moneyPrinter from "./icon/printer.png"
const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);



  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller]);



  const availableBalance = seller?.availableBalance?.toFixed(2);

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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
      total: "₹ " + item?.totalPrice,
      status: item.status,
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
    <section className="relative">
      <div className="w-full p-2 bg-white ">
        <div className="flex md:items-center items-start justify-between  mb-5 flex-col md:flex-row">
          <div>
            <h3 className="text-[20px] text-slate-700 font-Poppins pb-1 font-semibold ">Welcome  {seller?.userName ? seller?.userName : "Sourav Bhukta"}</h3>
            <h3 className="text-[17px] text-slate-600 pb-3">Monitor your business analytics and statistics.</h3>
          </div>

          <div className="border text-white rounded-xl bg-[#2A52BE] min-w-fit p-3 flex items-center  justify-center">
            <IoDiamondSharp size={20} className="mr-2" />
            <p>Products</p>
          </div>
        </div>

        {/* Business Analatics */}
        <div className="w-full block 800px:flex items-center 1000px:justify-around flex-col bg-slate-100 rounded-md">


          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between m-1 ml-2  ">
            <div className=" flex items-center justify-center gap-2 p-2  ">
              <img src={analytics} alt="Analytics" className="h-5" />
              <h2 className="text-[18px] text-gray-600 font-Poppins ">Order Analytics</h2>
            </div>

            <div className="border border-gray-500 rounded-md flex gap-2 items-center justify-center ml-3 md:gap-2 px-2 py-1 my-2 ">

              Overall Statistics
              <IoIosArrowDown className="cursor-pointer " />
            </div>

          </div>



          {/* <div className="w-full  p-2  ">
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
                
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-center">0</h5>
                <Link to="/admin-product" className="text-center b">
                  <h5 className="pt-4 pl-2 text-blue-800 font-bold">View Product</h5>
                </Link>
              </div>

              <div className=" mb-4  p-2 min-h-[18vh] bg-[#e1e1e2] shadow-md hover:shadow-lg border rounded  py-5 ">
                <div className="flex items-center gap-3 justify-center">
                  <img src={orderImg} alt="Analytics" className="h-7" />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    Total Orders
                  </h3>
                </div>
                
                <h5 className="pt-2 pl-[36px] text-center text-[22px] font-[500]">00</h5>
                <Link to="/admin-orders">
                  <h5 className="pt-4 pl-2 text-blue-800 font-bold text-center">View Orders</h5>
                </Link>
              </div>

            </div>
          </div> */}



          <div className="w-full  p-2 mt-1">
            <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-2">
              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={pendingImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Pending</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={confirmedImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Confirmed</h2>
                </div>
                <div className="font-medium text-lg mr-3 text-green-400">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={packagingImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Packaging</h2>
                </div>
                <div className="text-yellow-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={delivredImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg  text-slate-600 font-medium">Delivered</h2>
                </div>
                <div className="text-green-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={outForDeliveryImh} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">Out For Delivery</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={returnedImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Returned</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={cancledImg} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">Cancled</h2>
                </div>
                <div className="text-red-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={rejectedImg} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">Failed To Delivery</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>
            </div>
          </div>

        </div>


        {/* vendor wallet */}

        <div className="w-full block 800px:flex items-center 1000px:justify-around flex-col bg-slate-100 rounded-md mt-2 p-2">
          <div className=" flex items-center justify-center gap-2 p-2  ">
            <img src={adminWalletImg} alt="Analytics" className="h-5" />
            <h2 className="text-[18px] text-gray-600 font-Poppins ">Seller wallet</h2>
          </div>


          <div class="grid grid-cols-1 gap-2 lg:grid-cols-3 w-full" >

            <div class="lg:col-span-1">
              <div class="card h-full flex justify-center items-center bg-white shadow-md rounded-lg p-6">
                <div class="flex flex-col items-center gap-4">
                  <img width="48" class="mb-2" src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw.png" alt="" />
                  <h3 class="text-2xl font-bold mb-0">$10,023.50</h3>
                  <div class="font-bold capitalize mb-6 text-center">Withdrawable balance</div>
                  <button class="bg-blue-500 text-white px-4 py-2 rounded-md" data-toggle="modal" data-target="#balance-modal">Withdraw</button>
                </div>
              </div>
            </div>


            <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">

              <div class="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold mb-1">$500.00</h3>
                    <div class="capitalize mb-0">Pending Withdraw</div>
                  </div>
                  <img width="40" class="mb-2" src="https://6valley.6amtech.com/public/assets/back-end/img/pw.png" alt="" />
                </div>
              </div>

              <div class="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold mb-1">$6,394.47</h3>
                    <div class="capitalize mb-0">Total Commission Given</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/tcg.png" alt="" />
                </div>
              </div>

              <div class="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold mb-1">$600.00</h3>
                    <div class="capitalize mb-0">Already Withdrawn</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/aw.png" alt="" />
                </div>
              </div>

              <div class="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold mb-1">$822.00</h3>
                    <div class="capitalize mb-0">Total Delivery Charge Earned</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/tdce.png" alt="" />
                </div>
              </div>

              <div class="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold mb-1">$2,519.00</h3>
                    <div class="capitalize mb-0">Total Tax Given</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/ttg.png" alt="" />
                </div>
              </div>

              <div class="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold mb-1">$25,756.80</h3>
                    <div class="capitalize mb-0">Collected Cash</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/cc.png" alt="" />
                </div>
              </div>
            </div>
          </div>



        </div>

        {/* statistic */}
        <div className="w-full flex items-center justify-center  bg-slate-100 rounded-md p-3 mt-3    ">
          <div className=" w-full  bg-white rounded-md h-[50vh] md:h-[60vh] py-3 ">
            <div>
              <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={400} />
              </div>
              <div id="html-dist"></div>
            </div>
          </div>



        </div>



        <div className="w-full flex items-center 1000px:justify-between  bg-slate-100 rounded-md mt-3 p-2">

              <div className="w-full grid md:grid-cols-2 sm:grid-cols-2   gap-2 rounded-md bg-white p-1">

                <div className="bg-white rounded-md h-[80vh] md:h-[70vh]  flex flex-col items-center  md:gap-1 border-2 ">
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


        <div className="w-full block 800px:flex items-center justify-between gap-2">
          <div className="w-full mb-4 800px:w-[70%] min-h-[20vh]  shadow rounded px-2 py-5 bg-white">
            <div className="flex items-center ">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                Account Balance{" "}
                <span className="text-[16px]">(with 10% service charge)</span>
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">₹{availableBalance}</h5>
            <Link to="/dashboard-withdraw-money">
              <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
            </Link>
          </div>

          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
            <Link to="/dashboard-orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>

          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Products
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
            <Link to="/dashboard-products">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
            </Link>
          </div>
        </div>

        <br />

        <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
