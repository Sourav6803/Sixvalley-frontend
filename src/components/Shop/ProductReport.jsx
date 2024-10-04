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
import { AiFillDelete, AiOutlineDownload, AiOutlineEye, AiOutlinePlus } from 'react-icons/ai';
import { getAllProductsShop } from '../../redux/actions/product';
import { Switch } from '@mui/material';


const ProductReport = () => {
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
    const { products } = useSelector((state) => state.products);

    const [productId, setProductId] = useState("")
    const [isActive, setIsActive] = useState("")

    const [isActiveModalOpen, setIsActiveModalOpen] = useState(false)
    const [isActiveModalTwoOpen, setIsActiveModalTwoOpen] = useState(false)
    const [categoryId, setCategoryId] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller?._id));

    }, [dispatch, seller?._id]);
    useEffect(() => {
        dispatch(getAllProductsShop(seller?._id));

    }, [dispatch, seller?._id]);




    const [series, setSeries] = useState([

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
            text: 'Product Statistics',
            align: 'left',
            offsetX: 80
        },
        xaxis: {
            categories: [],
        },
        yaxis: [
            {
                seriesName: 'Count',
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
            // {
            //     opposite: true,
            //     seriesName: 'Total Orders',
            //     axisTicks: {
            //         show: true,
            //     },
            //     axisBorder: {
            //         show: true,
            //         color: '#00E396'
            //     },
            //     labels: {
            //         style: {
            //             colors: '#00E396',
            //         }
            //     },
            // }
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
                const response = await axios.get(`${server}/analytic/product-analytic${timeFilter}`, { withCredentials: true });
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
            const totalProduct = analyticData?.map(item => Number(item.count) || 0);

            // Update chart series and categories
            setSeries([
                {
                    name: 'Total product',
                    type: 'column',
                    data: totalProduct || [] // Handle empty data gracefully
                },

            ]);

            setOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    categories: periods || [] // Handle empty categories gracefully
                }
            }));
        }
    }, [analyticData]);


    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller?._id));
    }, [dispatch, seller?._id]);

    const activeProduct = products?.filter(product => product?.isActive === true )
    const approvedProduct = products?.filter(product => product?.approved === "Approved") 
    const pendingProduct = products?.filter(product => product?.approved === "Pending")
    

    useEffect(() => {
        if (searchTearm) {
            const filterProduct = products?.filter((order) =>
                order.name.toLowerCase().includes(searchTearm.toLowerCase())
            );
            setSearchData(filterProduct);
        } else {
            setSearchData(null);
        }
    }, [searchTearm, products]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filterProduct = products?.filter((order) =>
            order.name.toLowerCase().includes(searchTearm.toLowerCase())
        );
        setSearchData(filterProduct);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get the data for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = (searchData || products)?.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil((searchData || products)?.length / itemsPerPage);

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

    const completeProduct = orders?.filter((order) => order?.status === "Delivered")

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen"><Loader /></div>
            ) : (
                <div className='w-full p-2 md:p-5 bg-gray-200'>

                    <div className='flex items-center gap-2'>
                        <img src={productImage} alt='layout' className='h-8' />
                        <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Product Report;</h3>
                    </div>

                    <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
                        <div className="p-2 rounded-md ">
                            <h2 className='my-1 text-[20px] text-gray-600 font-medium'>Filter Product </h2>
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
                            <div className="w-full sm:w-[50%] md:w-[38%]  space-y-6 ">                                {/* Total Orders Card */}
                                <div className="left-content-card p-4 bg-white rounded-lg shadow-md w-full ">
                                    <div className='flex items-center justify-center gap-2 '>
                                        <img
                                            src="https://6valley.6amtech.com/public/assets/back-end/img/cart.svg"
                                            alt="Cart"
                                            className="w-10 h-10"
                                        />
                                        <div className="info mt-1 flex flex-col items-center justify-center p-2 ">
                                            <h4 className="subtitle text-lg font-semibold">{products?.length}</h4>
                                            <h6 className="subtext text-gray-500">Total products</h6>
                                        </div>
                                    </div>

                                    <div className="coupon__discount w-full text-right flex justify-between gap-4 mt-4">
                                        {/* Canceled */}
                                        <div className="text-center">
                                            <strong className="text-red-500 text-lg">{ activeProduct && activeProduct.length}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Active</span>
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
                                            <strong className="text-blue-500 text-lg">{approvedProduct && approvedProduct?.length}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Approved</span>
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
                                            <strong className="text-green-500 text-lg">{ pendingProduct && pendingProduct?.length}</strong>
                                            <div className="mt-2 flex items-center justify-center space-x-2">
                                                <span>Pending</span>
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
                                <div className="left-content-card py-14 px-6 bg-white rounded-lg shadow-md w-full">
                                    <div className='flex items-center justify-center gap-2'>
                                        <img
                                            src="https://6valley.6amtech.com/public/assets/back-end/img/products.svg"
                                            alt="Products"
                                            className="w-12 h-12"
                                        />
                                        <div className="info mt-1 flex items-center justify-center flex-col">
                                            <h4 className="subtitle text-lg font-semibold">{completeProduct?.length}</h4>
                                            <h6 className="subtext text-gray-500">Total product sale</h6>
                                        </div>
                                    </div>

                                </div>

                                
                            </div>

                            {/* Chart */}

                            <div className=" w-full sm:w-[50%] md:w-[60%] shadow-md flex h-full items-center justify-center  rounded-md ">
                                <div className=" w-full bg-white rounded-md h-[60vh] md:h-[53vh] ">

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


                        </div>
                    </div>



                    <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md'>
                        <div className='flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0'>
                            <div className='flex items-center text-white   '>
                                <div className='bg-blue-700 rounded-md px-3 py-1 flex items-center justify-center gap-1 cursor-pointer' onClick={() => navigate("/dashboard-create-product")}>
                                    <AiOutlinePlus />
                                    <div className=' '>Add new product</div>
                                </div>
                            </div>

                            <div className='mt-2 flex items-center justify-center'>
                                <div className="w-120 bg-white  shadow-lg ">
                                    <form className="flex items-center justify-center p-2">
                                        <input
                                            type="text"
                                            placeholder="Search product by name"
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
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                    <thead className="bg-gray-50 ">
                                                        <tr>
                                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                SL
                                                            </th>

                                                            <th scope="col" className="pl-8 pr-8 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Product Name
                                                            </th>

                                                            <th scope="col" className="pl-6 pr-6 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Image
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Price
                                                            </th>

                                                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                                                Brand
                                                            </th>

                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500  whitespace-nowrap">
                                                                Category
                                                            </th>

                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500  whitespace-nowrap">
                                                                Sub Category
                                                            </th>

                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 whitespace-nowrap">
                                                                Stock
                                                            </th>

                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500  whitespace-nowrap">
                                                                Sold Out
                                                            </th>

                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                                                Verify Status
                                                            </th>

                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                                Active Status
                                                            </th>

                                                            <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                                                <span className="">Actions</span>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                        {currentData?.length > 0 ? currentData?.map((product, index) => (
                                                            <tr key={index}>

                                                                <td className="px-2 py-4 text-sm font-medium  ">
                                                                    <div className='text-center'>
                                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4  py-2 fw-full ">
                                                                    <div className="w-full flex items-center justify-center  gap-x-3">

                                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{product?.name?.length > 15 ? product.name.slice(0, 15) + "..." : product?.name}</h2>
                                                                    </div>
                                                                </td>

                                                                <td className="px-2  py-2 w-full ">
                                                                    <div className="w-full flex items-center justify-center  gap-x-3">
                                                                        <img className="object-cover w-10 h-10 rounded-full" src={product?.images[0]?.url} alt="Imag" />
                                                                    </div>
                                                                </td>

                                                                <td className="px-2 py-4 text-sm w-[50px]  ">
                                                                    <div className='text-center'>
                                                                        <h4 className="text-gray-700 dark:text-gray-200">{product?.afterDiscountPrice}</h4>
                                                                    </div>
                                                                </td>

                                                                <td className="px-4 py-4 w-[50px]  text-sm ">
                                                                    <div className='text-center'>
                                                                        <h4 className="text-gray-700 dark:text-gray-200">{product?.brand}</h4>
                                                                    </div>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm ">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.category}</h4>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm ">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.subCategory}</h4>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.stock}</h4>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.sold_out}</h4>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.approved ? product?.approved : "Approved"}</h4>
                                                                </td>



                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {
                                                                        product?.isActive ? (
                                                                            <div className="flex items-center mt-3">
                                                                                <Switch
                                                                                    checked={product?.isActive}

                                                                                    onClick={() => { setIsActiveModalOpen(true); setIsActive(false); setProductId(product?._id) }}
                                                                                    color="primary"
                                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                                />

                                                                            </div>
                                                                        ) : (
                                                                            <div className="flex items-center mt-3">
                                                                                <Switch
                                                                                    checked={product?.isActive}
                                                                                    onChange={() => setIsActive(true)}
                                                                                    onClick={() => { setIsActiveModalTwoOpen(true); setProductId(product?._id) }}
                                                                                    color="secondary"
                                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <div className='flex items-center justify-end'>
                                                                        <div className='w-full mt-4 flex items-center justify-center gap-2 bg-white  '>

                                                                            <button
                                                                                className="text-xl border-2 rounded-md p-1 border-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                                                                onClick={() => navigate(`/dashboard/product-view/${product._id}`)}
                                                                            >
                                                                                <AiOutlineEye className="text-blue-500 hover:text-white" />
                                                                            </button>

                                                                            <button
                                                                                className="text-xl border-2 rounded-md p-1 border-red-500 transition-colors duration-200"
                                                                                onClick={() => { setOpen(true); setCategoryId(product?._id) }}
                                                                            >
                                                                                <AiFillDelete className="text-red-500" />
                                                                            </button>

                                                                            <Link to={`/admin/dashboard/product/update/${product?._id}`}>
                                                                                <button className="text-gray-500 border-2 rounded-md p-1 border-blue-400 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" color='blue' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                                    </svg>
                                                                                </button>
                                                                            </Link>

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) : (
                                                            <tr>
                                                                <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No product found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>

                                                {
                                                    products?.length > 9 && (
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


    )
}

export default ProductReport