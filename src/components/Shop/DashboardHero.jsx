import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { IoDiamondSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../../pages/Loader";
import analytics from "./icon/Analytics .png"
import pendingImg from "./icon/time.png"
import confirmedImg from "./icon/shopping-bag.png"
import packagingImg from "./icon/package-box.png"
import outForDeliveryImh from "./icon/delivery-bike.png"
import delivredImg from "./icon/products.png"
import returnedImg from "./icon/cancel.png"
import rejectedImg from "./icon/rejected.png"
import cancledImg from "./icon/cancelled.png"
import adminWalletImg from "./icon/wallet.png"
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import TopImg from "./icon/badge.png"
import popularImg from "./icon/fire.png"



const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const { products } = useSelector((state) => state.products);

  const popularProduct = Array.isArray(products) ? [...products].sort((a, b) => b?.ratings - a?.ratings).slice(0, 6) : [];
  const topSellingProduct = Array.isArray(products) ? [...products].sort((a, b) => b?.sold_out - a?.sold_out).slice(0, 5) : [];

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));

  }, [dispatch, seller?._id]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller]);

  const [timeFilter, setTimeFilter] = useState('?rangeType=months&rangeCount=12');
  const [analyticData, setAnalyticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  const [series, setSeries] = useState([
    {
      name: 'Total Price',
      type: 'column',
      data: []
    },
    {
      name: 'Total Orders',
      type: 'line',
      data: []
    }
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
      text: 'Order Statistics',
      align: 'left',
      offsetX: 110
    },
    xaxis: {
      categories: [],
    },
    yaxis: [
      {
        seriesName: 'Total Price',
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
        opposite: true,
        seriesName: 'Total Orders',
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
      }
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft',
        offsetY: 30,
        offsetX: 60
      }
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  });

  useEffect(() => {
    const fetchAnalyticData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/analytic/order-analytic${timeFilter}`, { withCredentials: true });
        setAnalyticData(response?.data?.data?.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching analytic data:", error);
        setError("Failed to fetch analytic data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticData();
  }, [timeFilter]);

  useEffect(() => {
    if (analyticData && analyticData.length > 0) {

      const periods = analyticData.map(item => item.period || 'Unknown');
      const totalPrices = analyticData?.map(item => Number(item.totalPrice) || 0);
      const totalOrders = analyticData?.map(item => Number(item.totalOrders) || 0);

      // Check for NaN or undefined values
      if (totalPrices.includes(NaN) || totalOrders.includes(NaN)) {
        toast.error('Invalid data found in series.');
        return;
      }

      // Update chart series and categories
      setSeries([
        {
          name: 'Total Price',
          type: 'column',
          data: totalPrices || [] // Handle empty data gracefully
        },
        {
          name: 'Total Orders',
          type: 'line',
          data: totalOrders || [] // Handle empty data gracefully
        }
      ]);

      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          categories: periods || [] // Handle empty categories gracefully
        }
      }));
    }
  }, [analyticData]);




  return (
    <section className="relative">
      <div className="w-full p-2 bg-white ">
        <div className="flex md:items-center items-start justify-between  mb-5 flex-col md:flex-row">
          <div>
            <h3 className="text-[20px] text-slate-700 font-Poppins pb-1 font-semibold ">Welcome  {seller?.userName ? seller?.userName : "Sourav Bhukta"}</h3>
            <h3 className="text-[17px] text-slate-600 pb-3">Monitor your business analytics and statistics.</h3>
          </div>

          <Link to={"/dashboard-products"}>
            <div className="border text-white rounded-md bg-[#2A52BE] min-w-fit px-3 py-1 flex items-center  justify-center">
              <IoDiamondSharp size={20} className="mr-2" />
              <p>Products</p>
            </div>
          </Link>
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







          <div className="w-full  p-2 mt-1">
            <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-2">
              <div onClick={() => navigate('/dashboard/confirmed/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img src={pendingImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Pending</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div onClick={() => navigate('/dashboard/confirmed/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img src={confirmedImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Confirmed</h2>
                </div>
                <div className="font-medium text-lg mr-3 text-green-400">20</div>
              </div>

              <div onClick={() => navigate('/dashboard/packaging/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img src={packagingImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Packaging</h2>
                </div>
                <div className="text-yellow-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div onClick={() => navigate('/dashboard/delivered/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img src={delivredImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg  text-slate-600 font-medium">Delivered</h2>
                </div>
                <div className="text-green-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div onClick={() => navigate('/dashboard/out-for-delivery/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img src={outForDeliveryImh} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">Out For Delivery</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>


              <div onClick={() => navigate('/dashboard/returned/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img src={returnedImg} alt="" className="h-7 ml-3" />
                  <h2 className="text-lg text-slate-600 font-medium">Returned</h2>
                </div>
                <div className="text-blue-400 font-semibold text-xl mr-3">20</div>
              </div>

              <div onClick={() => navigate('/dashboard/cancled/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img src={cancledImg} alt="" className="h-7 ml-3" />
                  <h2 className="font-medium text-slate-600 text-lg">Cancled</h2>
                </div>
                <div className="text-red-400 font-semibold text-xl mr-3">20</div>
              </div>


              <div onClick={() => navigate('/dashboard/failedToDeliver/order')} className="border min-h-[12vh] bg-slate-200 rounded-lg flex items-center justify-between">
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


          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 w-full" >

            <div className="lg:col-span-1">
              <div className="card h-full flex justify-center items-center bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col items-center gap-4">
                  <img width="48" className="mb-2" src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw.png" alt="" />
                  <h3 className="text-2xl font-bold mb-0">₹{seller?.availableBalance.toFixed(2)}</h3>
                  <div className="font-bold capitalize mb-6 text-center">Withdrawable balance</div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md" data-toggle="modal" data-target="#balance-modal">Withdraw</button>
                </div>
              </div>
            </div>


            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">₹{seller?.pendingWithdraw}</h3>
                    <div className="capitalize mb-0">Pending Withdraw</div>
                  </div>
                  <img width="40" className="mb-2" src="https://6valley.6amtech.com/public/assets/back-end/img/pw.png" alt="" />
                </div>
              </div>

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">₹{seller?.totalCommission}</h3>
                    <div className="capitalize mb-0">Total Commission Given</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/tcg.png" alt="" />
                </div>
              </div>

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">₹{seller?.totalWithdraw}</h3>
                    <div className="capitalize mb-0">Already Withdrawn</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/aw.png" alt="" />
                </div>
              </div>

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">₹{seller?.totalDeliveryCharge}</h3>
                    <div className="capitalize mb-0">Total Delivery Charge Earned</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/tdce.png" alt="" />
                </div>
              </div>

              {/* <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">$2,519.00</h3>
                    <div className="capitalize mb-0">Total Tax Given</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/ttg.png" alt="" />
                </div>
              </div> */}

              <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-1">₹{seller?.collectedCash}</h3>
                    <div className="capitalize mb-0">Collected Cash</div>
                  </div>
                  <img width="40" src="https://6valley.6amtech.com/public/assets/back-end/img/cc.png" alt="" />
                </div>
              </div>
            </div>
          </div>



        </div>


        <div className="w-full flex items-center justify-center bg-slate-100 rounded-md p-3 mt-3">
          <div className="w-full bg-white rounded-md h-[60vh] md:h-[70vh] py-3">
            <div className="flex justify-end space-x-4 mb-4  ">
              <button
                className={`px-4 rounded-md py-2 ${timeFilter === '?rangeType=months&rangeCount=12' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTimeFilter('?rangeType=months&rangeCount=12')}
              >
                This Year
              </button>
              <button
                className={`px-4 rounded-md py-2 ${timeFilter === '?rangeType=months&rangeCount=3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTimeFilter('?rangeType=months&rangeCount=3')}
              >
                This Month
              </button>
              <button
                className={`px-4 rounded-md py-2 ${timeFilter === '?rangeType=days&rangeCount=7' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTimeFilter('?rangeType=days&rangeCount=7')}
              >
                This Week
              </button>
            </div>
            {
              loading === true ? (
                <div className="flex items-center justify-center h-screen relative">
                  <Loader />
                </div>
              ) : (
                <div id="chart">
                  <ReactApexChart options={options} series={series} type="line" height={400} />
                </div>
              )
            }
          </div>
        </div>

        <div className="w-full flex items-start justify-between bg-slate-100 rounded-md mt-3 p-2">
          <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 rounded-md bg-white p-2">

            {/* Popular Products Section */}
            <div className="bg-white rounded-md flex flex-col border-2 shadow-md p-2">
              <div className="flex items-center justify-center mb-4 p-2 bg-white rounded-md border-b">
                <img src={popularImg} alt="Popular Products" className="h-10 mr-2" />
                <h2 className="text-gray-500 font-bold text-lg">Popular Products</h2>
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                {popularProduct?.map((product) => (
                  <div key={product?.id} className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={product?.images[0].url}
                      alt={product?.name}
                      className="h-20 w-20 object-contain mb-2"
                    />
                    <p className="text-center text-[14px] font-medium mb-1">
                      {product?.name}
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      <AiFillStar color="red" />
                      <p className="text-center text-[12px]">
                        {product?.ratings} ({product?.reviews?.length} Reviews)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Products Section */}
            <div className="bg-white rounded-md flex flex-col border-2 shadow-md overflow-y-auto">
              <div className="flex items-center justify-center mb-4 p-2 bg-white rounded-md border-b">
                <img src={TopImg} alt="Top Selling Products" className="h-10 mr-2" />
                <h2 className="text-gray-500 font-bold text-lg">Top Selling Products</h2>
              </div>

              <div className="w-full flex flex-col gap-4 p-2">
                {topSellingProduct?.map((product) => (
                  <div key={product?.id} className="flex items-center justify-between gap-2 border rounded-md p-2">
                    <img src={product?.images[0].url} alt={product?.name} className="h-20 w-20 object-contain" />
                    <p className="flex-1 text-sm">{product?.name}</p>
                    <div className="border border-blue-400 p-1 rounded-md text-sm">
                      Sold: {product?.sold_out}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>

      </div>
    </section>
  );
};

export default DashboardHero;
