import React, { useEffect, useState } from 'react'
import Loader from '../../pages/Loader'
import productImage from "./icon/package-box.png"
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Chart } from "react-google-charts";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/actions/order';
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai';

const OrderReport = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchDateType, setSearchDateType] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const [timeFilter, setTimeFilter] = useState('?rangeType=months&rangeCount=12');
    const [analyticData, setAnalyticData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller?._id));

    }, [dispatch, seller?._id]);




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
            offsetX: 80
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

    const totalCashPayment = seller?.collectedCash



    const data = [
        ["Cash Payment", "Hours per Day"],
        ["Cash Payment", totalCashPayment],
        ["Total Delivery Charge", seller?.totalDeliveryCharge],
        ["Wallet", seller?.availableBalance],
        ["Commission", seller?.totalCommission],

    ];

    const pieOptions = {
        title: "Payment Staistic",
        is3D: true,
    };

    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [selectedUser, setSelectedUser] = useState("")



    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller?._id));
    }, [dispatch, seller?._id]);



    function formatMongoDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        return `${day}${daySuffix(day)} ${month}, ${year}`;

    }

    function extractTimeFromDate(mongoDate) {
        if (!(mongoDate instanceof Date)) {
            throw new Error("Invalid date. Please provide a valid MongoDB Date object.");
        }

        // Extract hours and minutes
        let hours = mongoDate.getHours();
        const minutes = String(mongoDate.getMinutes()).padStart(2, '0');

        // Determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Format the time as hh:mm AM/PM
        const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
        return formattedTime;

    }

    useEffect(() => {
        if (searchTearm) {
            const filterProduct = orders?.filter((order) =>
                order.name.toLowerCase().includes(searchTearm.toLowerCase())
            );
            setSearchData(filterProduct);
        } else {
            setSearchData(null);
        }
    }, [searchTearm, orders]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filterProduct = orders.filter((order) =>
            order.name.toLowerCase().includes(searchTearm.toLowerCase())
        );
        setSearchData(filterProduct);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get the data for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = (searchData || orders)?.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil((searchData || orders)?.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const cancledProduct = orders?.filter((order)=>order?.status === "Cancled")
    const ongoingProduct = orders?.filter((order)=>order?.status !== "Cancled" || "Delivered")
    const completeProduct = orders?.filter((order)=>order?.status === "Delivered")


    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen"><Loader /></div>
            ) : (


                <div className='w-full p-2 md:p-5 bg-gray-200'>

                    <div className='flex items-center gap-2'>
                        <img src={productImage} alt='layout' className='h-8' />
                        <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Order Report;</h3>
                    </div>

                    <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
                        <div className="p-2 rounded-md ">
                            <h2 className='my-1 text-[20px] text-gray-600 font-medium'>Filter Order </h2>
                            <form className='items-center justify-around grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 '>


                                <div className="flex mb-2 md:mb-4 flex-col">

                                    <select
                                        id="main_category_select"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={searchDateType}
                                        onChange={(e) => setSearchDateType(e.target.value)}
                                    >
                                        <option value="" disabled>Select  type</option>
                                        {["These year", "This month", "This week"].map(type => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </form>
                        </div>


                        <div className='mt-1 flex items-center justify-end'>
                            <button type="submit" className={`text-white w-[15vw] bg-blue-600 hover:bg-blue-800 font-semibold text-center border rounded-md py-1 px-5 flex items-center justify-center ${isDisabled && isSubmitting && "cursor-not-allowed"}`}>
                                {isSubmitting ? <Loader /> : "Filter"}
                            </button>
                        </div>
                    </div>

                    <div className="w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md">
                        <div className='flex w-full flex-wrap gap-2  bg-slate-100 p-2'>
                            <div className="w-full sm:w-[50%] md:w-[29%]  space-y-6 ">
                                {/* Total Orders Card */}
                                <div className="left-content-card p-4 bg-white rounded-lg shadow-md w-full ">
                                    <div className='flex items-center justify-center gap-2 '>
                                        <img
                                            src="https://6valley.6amtech.com/public/assets/back-end/img/cart.svg"
                                            alt="Cart"
                                            className="w-10 h-10"
                                        />
                                        <div className="info mt-1 flex flex-col items-center justify-center p-2 ">
                                            <h4 className="subtitle text-lg font-semibold">{orders?.length}</h4>
                                            <h6 className="subtext text-gray-500">Total Orders</h6>
                                        </div>
                                    </div>

                                    <div className="coupon__discount w-full text-right flex justify-between gap-4 mt-4">
                                        {/* Canceled */}
                                        <div className="text-center">
                                            <strong className="text-red-500 text-lg">{cancledProduct?.length}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Canceled</span>
                                                <span className="tooltip ml-2" data-tooltip="This count is the summation of Failed to deliver, Canceled, And Returned orders">
                                                    <img
                                                        className="info-img w-4 h-4"
                                                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                                                        alt="Info"
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Ongoing */}
                                        <div className="text-center">
                                            <strong className="text-blue-500 text-lg">{ongoingProduct?.length}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Ongoing</span>
                                                <span className="tooltip ml-2" data-tooltip="This count is the summation of Pending, Confirmed, Packaging, Out for delivery orders">
                                                    <img
                                                        className="info-img w-4 h-4"
                                                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                                                        alt="Info"
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Completed */}
                                        <div className="text-center">
                                            <strong className="text-green-500 text-lg">{completeProduct?.length}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Completed</span>
                                                <span className="tooltip ml-2" data-tooltip="This count is the summation of delivered orders">
                                                    <img
                                                        className="info-img w-4 h-4"
                                                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                                                        alt="Info"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Order Amount Card */}
                                <div className="left-content-card p-4 bg-white rounded-lg shadow-md w-full">
                                    <div className='flex items-center justify-center gap-2'>
                                        <img
                                            src="https://6valley.6amtech.com/public/assets/back-end/img/products.svg"
                                            alt="Products"
                                            className="w-12 h-12"
                                        />
                                        <div className="info mt-1">
                                            <h4 className="subtitle text-lg font-semibold">₹{seller?.availableBalance + seller?.totalWithdraw}</h4>
                                            <h6 className="subtext text-gray-500">Total Order Amount</h6>
                                        </div>
                                    </div>

                                    <div className="coupon__discount w-full text-right flex justify-between mt-4">
                                        {/* Due Amount */}
                                        <div className="text-center">
                                            <strong className="text-red-500 text-lg">₹{seller?.pendingWithdraw}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Due Amount</span>
                                                <span className="tooltip ml-2" data-tooltip="The ongoing order amount will be shown here">
                                                    <img
                                                        className="w-4 h-4"
                                                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                                                        alt="Info"
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Already Settled */}
                                        <div className="text-center">
                                            <strong className="text-green-500 text-lg">₹{seller?.totalWithdraw}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Already Settled</span>
                                                <span className="tooltip ml-2" data-tooltip="After the order is delivered total order amount will be shown here">
                                                    <img
                                                        className="w-4 h-4"
                                                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                                                        alt="Info"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" w-full sm:w-[50%] md:w-[40%] shadow-md flex h-full items-center justify-center  rounded-md ">
                                <div className=" w-full bg-white rounded-md h-[72vh] md:h-[53vh] ">

                                    {
                                        loading === true ? (
                                            <div className="flex items-center justify-center h-screen ">
                                                <Loader />
                                            </div>
                                        ) : (
                                            <div id="chart" cl>
                                                <ReactApexChart options={options} series={series} type="line" height={360} />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className=' w-full md:w-[29%] bg-white shadow-md rounded-md space-y-6 '>
                                <div className='w-full bg-white rounded-md h-[55vh] md:h-[53vh]'>
                                    <Chart
                                        chartType="PieChart"
                                        data={data}
                                        options={pieOptions}
                                        width={"100%"}
                                        height={"280px"}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>



                    <div className="w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md">
                        <div className='flex items-center justify-between  flex-col md:flex-row gap-2 md:gap-0'>
                            <div className='flex items-center    '>
                                <div className=' rounded-md px-3 py-1 flex items-center justify-center gap-1 cursor-pointer' onClick={() => navigate("/dashboard-create-product")}>

                                    <div className=''>Total Order : <span className='px-2  rounded-md bg-slate-200'>{orders?.length}</span></div>
                                </div>
                            </div>

                            <div className='mt-2 flex items-center justify-center'>
                                <div className="w-120 bg-white  shadow-lg ">
                                    <form className="flex items-center justify-center p-2">
                                        <input
                                            type="text"
                                            placeholder="Search order by name"
                                            value={searchTearm}
                                            onChange={(e) => setSearchTearm(e.target.value)}
                                            className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                        />
                                        <button type="submit" onClick={handleSearch}
                                            className="bg-blue-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                                            Search
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>


                        <div className='w-full  bg-white '>
                            <section className="container px-4 mt-2 ">

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700">
                                                    <thead className="bg-gray-50 ">
                                                        <tr>
                                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                SL
                                                            </th>

                                                            <th scope="col" className="pl-6 pr-6 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Order Id
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Order Date
                                                            </th>

                                                            <th scope="col" className="pl-6 pr-6 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Customr Info
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Total amount
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Payment Method
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                                                Order Status
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                                                Shipping Charge
                                                            </th>

                                                            

                                                            

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                                                Coupon
                                                            </th>



                                                        </tr>
                                                    </thead>

                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                        {currentData?.length > 0 ? currentData?.map((order, index) => (
                                                            <tr key={index}>

                                                                <td className="px-2 py-4 text-sm font-medium  ">
                                                                    <div className='text-center'>
                                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                                                    </div>
                                                                </td>

                                                                <td className="px-2 py-4 text-sm w-[50px]  ">
                                                                    <div className='text-center'>
                                                                        <h4 className="text-gray-700 dark:text-gray-200">{order?._id}</h4>
                                                                    </div>
                                                                </td>

                                                                <td className="px-4  py-2 w-[50px]  ">
                                                                    <div className="w-full gap-x-1 flex flex-col">


                                                                        <h2 className="font-medium text-gray-600 dark:text-white ">{formatMongoDate(new Date(order?.createdAt))}</h2>
                                                                        <h2 className="text-gray-600">{extractTimeFromDate(new Date(order?.createdAt))}</h2>
                                                                    </div>
                                                                </td>



                                                                <td className="px-4 py-2 text-sm w-[50px]  ">
                                                                    <div className='text-center flex flex-col gap-x-2'>
                                                                        <h4 className="text-gray-700 dark:text-gray-200">{order?.user?.name?.length > 9 ? order?.user?.name.slice(0, 9) + "..." : order?.user?.name}</h4>
                                                                        <h4 className="text-gray-700 dark:text-gray-200">{order?.user?.phoneNumber}</h4>
                                                                    </div>
                                                                </td>

                                                                <td className="px-4 py-4 w-[50px]  text-sm ">
                                                                    <div className='text-center  flex flex-col gap-x-2 '>
                                                                        <h4 className="text-gray-700 dark:text-gray-200">₹{order?.totalPrice}</h4>
                                                                        <p>{order?.paymentInfo?.type === "Cash On Delivery" ? <span className="px-1 bg-red-100 py-[1px] font-[600] border rounded-md border-red-200 text-red-500 text-[10px]">Unpaid</span> : <span className="px-1 py-[1px] bg-green-100 rounded-md border border-green-200 text-green-500 text-[10px]">paid</span>}</p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200">{order?.paymentInfo?.type}</h4>
                                                                </td>

                                                                <td className="px-2 py-4  text-sm whitespace-nowrap w-[80px] ">
                                                                    <span className={`text-gray-700 text-center dark:text-gray-200 rounded-md 
                                                                            ${(order?.status === "Returned" ||
                                                                            order?.status === "Cancled" ||
                                                                            order?.status === "Failed To Delivery" ||
                                                                            order?.status === "Refund Success"
                                                                        )
                                                                            ? "border border-red-500 bg-red-100  text-red-500 font-semibold rounded-md px-2 py-[1px]"
                                                                            : "border border-green-500 px-2 bg-green-100 font-semibold rounded-md text-green-500"}`}>{order?.status}</span>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200"> ₹{order?.deliveryCharge}</h4>

                                                                </td>

                                                                

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200"> {order?.couponAmount === 0 ? <span className='text-slate-600 '>Not Used</span> : "₹"+order?.couponAmount }</h4>

                                                                </td>

                                                            </tr>
                                                        )) : (
                                                            <tr>
                                                                <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No Order found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>



                                                {
                                                    currentData?.length > 9 && (
                                                        <div className="flex  justify-end items-center my-2 mx-2 ">
                                                            {/* Previous Button */}
                                                            <button
                                                                className={`px-4 py-2 rounded-md text-white font-semibold ${currentPage === 1
                                                                    ? "bg-gray-400 cursor-not-allowed"
                                                                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                                                    }`}
                                                                onClick={handlePrevious}
                                                                disabled={currentPage === 1}
                                                            >
                                                                Previous
                                                            </button>

                                                            {/* Display current page and total pages */}
                                                            <span className="text-gray-600 dark:text-gray-300 mx-2">
                                                                Page {currentPage} of {totalPages}
                                                            </span>

                                                            {/* Next Button */}
                                                            <button
                                                                className={`px-4 py-2 rounded-md text-white font-semibold ${currentPage === totalPages
                                                                    ? "bg-gray-400 cursor-not-allowed"
                                                                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                                                    }`}
                                                                onClick={handleNext}
                                                                disabled={currentPage === totalPages}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>


        // <>
        //     {isLoading ? (
        //         <div className="flex items-center justify-center h-screen">
        //             <Loader />
        //         </div>
        //     ) : (
        //         <div className="w-full p-4 md:p-6 bg-gray-100 min-h-screen">
        //             {/* Header */}
        //             <div className="flex items-center gap-2 mb-4">
        //                 <img src={productImage} alt="layout" className="h-10" />
        //                 <h3 className="text-2xl text-gray-700 font-bold">Order Report</h3>
        //             </div>

        //             {/* Filter Section */}
        //             <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        //                 <h2 className="text-xl text-gray-600 font-medium mb-2">Filter Order</h2>
        //                 <form className="grid grid-cols-2 md:grid-cols-4 gap-4">
        //                     <div className="flex flex-col">
        //                         <select
        //                             id="main_category_select"
        //                             className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        //                             value={searchDateType}
        //                             onChange={(e) => setSearchDateType(e.target.value)}
        //                         >
        //                             <option value="" disabled>
        //                                 Select type
        //                             </option>
        //                             {["This year", "This month", "This week"].map((type) => (
        //                                 <option key={type} value={type}>
        //                                     {type}
        //                                 </option>
        //                             ))}
        //                         </select>
        //                     </div>
        //                     <button
        //                         type="submit"
        //                         className={`text-white bg-blue-600 hover:bg-blue-800 font-semibold text-center py-2 px-4 rounded-md col-span-2 md:col-span-1 ${isDisabled && isSubmitting && "cursor-not-allowed"}`}
        //                     >
        //                         {isSubmitting ? <Loader /> : "Filter"}
        //                     </button>
        //                 </form>
        //             </div>

        //             {/* Main Content Section */}
        //             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        //                 {/* Order Data & Stats */}
        //                 <div className="lg:col-span-4 space-y-6">
        //                     {/* Total Orders Card */}
        //                     <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col justify-between">
        //                         <div className="flex items-center gap-4">
        //                             <img src="https://6valley.6amtech.com/public/assets/back-end/img/cart.svg" alt="Cart" className="w-12 h-12" />
        //                             <div>
        //                                 <h4 className="text-2xl font-bold">24</h4>
        //                                 <p className="text-gray-500">Total Orders</p>
        //                             </div>
        //                         </div>
        //                         <div className="grid grid-cols-3 gap-4 mt-4">
        //                             <div className="text-center">
        //                                 <strong className="text-red-500 text-lg">4</strong>
        //                                 <p className="text-sm text-gray-500">Canceled</p>
        //                             </div>
        //                             <div className="text-center">
        //                                 <strong className="text-blue-500 text-lg">10</strong>
        //                                 <p className="text-sm text-gray-500">Ongoing</p>
        //                             </div>
        //                             <div className="text-center">
        //                                 <strong className="text-green-500 text-lg">10</strong>
        //                                 <p className="text-sm text-gray-500">Completed</p>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     {/* Total Order Amount Card */}
        //                     <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col justify-between">
        //                         <div className="flex items-center gap-4">
        //                             <img src="https://6valley.6amtech.com/public/assets/back-end/img/products.svg" alt="Products" className="w-12 h-12" />
        //                             <div>
        //                                 <h4 className="text-2xl font-bold">$93,453.80</h4>
        //                                 <p className="text-gray-500">Total Order Amount</p>
        //                             </div>
        //                         </div>
        //                         <div className="grid grid-cols-2 gap-4 mt-4">
        //                             <div className="text-center">
        //                                 <strong className="text-red-500 text-lg">$41,153.00</strong>
        //                                 <p className="text-sm text-gray-500">Due Amount</p>
        //                             </div>
        //                             <div className="text-center">
        //                                 <strong className="text-green-500 text-lg">$52,300.80</strong>
        //                                 <p className="text-sm text-gray-500">Settled</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 {/* Chart Section */}
        //                 <div className="lg:col-span-8 space-y-6">
        //                     <div className="bg-white rounded-lg p-6 shadow-md h-[70vh] flex items-center justify-center">
        //                         {loading ? (
        //                             <div className="flex items-center justify-center">
        //                                 <Loader />
        //                             </div>
        //                         ) : (
        //                             <div id="chart">
        //                                 <ReactApexChart options={options} series={series} type="line" height="100%" />
        //                             </div>
        //                         )}
        //                     </div>

        //                     <div className="bg-white rounded-lg p-6 shadow-md h-[55vh]">
        //                         <Chart chartType="PieChart" data={data} options={pieOptions} width="100%" height="100%" />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        // </>

    )
}

export default OrderReport