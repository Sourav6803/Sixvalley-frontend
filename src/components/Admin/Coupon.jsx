import React, { useState, useEffect, useCallback } from 'react';
import Layout from "./icon/layout.png";
import axios from "axios";
import { server } from '../../server';
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../utils/Modal';
import { AiFillDelete } from "react-icons/ai";
import { createSubSubCategory } from '../../redux/actions/subSubCategory';

const Coupon = () => {
    const { allCategory } = useSelector((state) => state?.category);

    const { success, error } = useSelector((state) => state?.subSubCategory);
    const { allUsers } = useSelector((state) => state?.user);
    const { seller } = useSelector((state) => state.seller);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const [isDelete, setIsDelete] = useState(false);
    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const allCouponType = ["Discount on purchase", 
            "Free delivery", 
            "First Order",
            "Buy One Get One Free (BOGO)",
            "Percentage Off",
            "Amount Off",
            "Loyalty Reward",
            "Seasonal Discount",
            "Referral Discount",
            "Student Discount",
            "Bulk Purchase Discount",
            "Clearance Sale",
            "New Product Launch",
            "App-Exclusive",
            "Anniversary Sale"]
    const [couponType, setCouponType] = useState("")
    const [couponTitle, setCouponTitle] = useState("")
    const [couponCode, setCouponCode] = useState("")
    const [couponCategory, setCouponCategory] = useState("")
    const [customer, setCustomer] = useState("All")
    const [limitUser, setLimitUser] = useState("")
    const [discountType, setDiscountType] = useState("")
    const [discountAmount, setDiscountAmount] = useState(0)
    const [minPurchase, setMinPurchase] = useState(0)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [allCoupons, setAllCoupons] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [couponId, setCouponId] = useState("")

    const existingCouponCode = new Set();

    const generateCoupon = () => {
        const length = 8;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let couponCode = '';

        while (couponCode.length < length) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            couponCode += chars[randomIndex];
        }

        // Ensure uniqueness
        if (existingCouponCode.has(couponCode)) {
            return generateCoupon();
        }

        existingCouponCode.add(couponCode);
        // return sku;
        setCouponCode(couponCode)
    }

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        setStartDate(startDate);
        setEndDate(null);
        // document.getElementById("end-date").min = minEndDate.toISOString.slice(0,10);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${server}/cupon/get-coupon/${seller?._id}`, { withCredentials: true, }).then((res) => {
            setIsLoading(false);
            setAllCoupons(res.data.couponCodes);
        }).catch((error) => {
            setIsLoading(false);
        });
    }, [dispatch, seller?._id]);

    const  formatDate = (isoDate) =>{
        // Create a Date object from the ISO string
        const date = new Date(isoDate);
        
        // Extract individual date components
        const day = date.getUTCDate();
        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();
        
        // Array of month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Format the date as "DD MMM, YY"
        const formattedDate = `${day.toString().padStart(2, '0')} ${monthNames[month]}, ${year.toString().slice(-2)}`;
        
        return formattedDate;
    }

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // if (!couponType || !couponTitle || !couponCode || !couponCategory || !customer || !limitUser || !discountType || !discountAmount || !minPurchase || !startDate || !endDate) {
        //     toast.error("Please fill in all required fields.");
        //     return;
        // }

        setIsSubmitting(true);

        try {
            // dispatch(createSubSubCategory({ name, priority, mainCategory, subCategory }))
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            };
            const res = await axios.post(`${server}/cupon/create-coupon-code`, {
                couponType,
                couponTitle: couponTitle,
                couponCategory: couponCategory,
                couponCode: couponCode,
                limitForSameUser: limitUser,
                customer: customer,
                discountType: discountType,
                discountAmount: discountAmount,
                minPurchase: minPurchase,
                startDate: startDate,
                expireDate: endDate,
                shopId: seller?._id,
                sellerId: seller?._id
            }, config)

            setIsSubmitting(false);

            setCouponType("");
            setCouponTitle("");
            setCouponCode("");
            setCouponCategory("")
            setCustomer("")
            setLimitUser("")
            setDiscountType("")
            setDiscountAmount("")
            setMinPurchase("")
            setStartDate()
            setEndDate()

            console.log(res.data)


            if (res.data.success === true) {
                toast.success(res.data.message || "Coupon created successfully")

                setTimeout(() => window.location.reload(), 1000)
            }

        }
        catch (err) {
            setIsSubmitting(false);
            toast.error(err.message || "Failed to create coupon.");
        } finally {
            setIsSubmitting(false);
        }
    }, [couponType, couponTitle, couponCode, couponCategory, customer, limitUser, discountType, discountAmount, minPurchase, startDate, endDate, seller?._id]);


    const handleDelete = useCallback(async (id) => {
        try {
            setIsDelete(true)
            const res = await axios.delete(`${server}/cupon/delete-coupon/${id}`, { withCredentials: true });
            setIsDelete(false)
            toast.success(res.data.message || "Coupon Deleted");
           
            setOpen(false);
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (err) {
            toast.error("Error deleting category");
            setIsDelete(false)
        }
        finally {
            setIsSubmitting(false)
        }
    }, []);

    useEffect(() => {
        if (error) {
            setIsSubmitting(false);
            toast.error(error);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        if (success) {
            setIsSubmitting(false);
            toast.success("Sub sub-Category created successfully!");
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }, [dispatch, error, success]);


    useEffect(() => {
        if (searchTearm) {
            const filterCupon = allCoupons.filter((cupon) =>
                cupon.couponCode.toLowerCase().includes(searchTearm.toLowerCase()) ||
                cupon.couponTitle.toLowerCase().includes(searchTearm.toLowerCase())
            );
            setSearchData(filterCupon);
        } else {
            setSearchData(null);
        }
    }, [searchTearm, allCoupons]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filterCoupon = allCoupons.filter((cupon) =>
            cupon.couponCode.toLowerCase().includes(searchTearm.toLowerCase()) ||
            cupon.couponTitle.toLowerCase().includes(searchTearm.toLowerCase())
        );
        setSearchData(filterCoupon);
    };

    return (
        <div className='w-full p-2 lg:p-5 bg-gray-200'>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Coupon Setup</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
                {
                    isSubmitting ? (<div className='w-full h-full flex items-start justify-center'><Loader /></div>) : (

                        <div className="p-4 rounded-md ">
                            <form className='items-center justify-around grid grid-cols-1 lg:grid-cols-3 gap-2 '>
                                <div className="mb-4 ">
                                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Coupon Type *</label>
                                    <select
                                        id="couponType"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={couponType}
                                        onChange={(e) => setCouponType(e.target.value)}
                                    >
                                        <option value="" disabled>Select a Coupon type</option>
                                        {allCouponType?.map(couponType => (
                                            <option key={couponType} value={couponType}>
                                                {couponType}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="priority" className="block text-lg font-medium text-gray-700">Coupon Title *</label>
                                    <input
                                        type="text"
                                        name="couponTitle"
                                        autoComplete="couponTitle"
                                        placeholder='Title'

                                        value={couponTitle}
                                        onChange={(e) => setCouponTitle(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <div className='flex items-center justify-between  '>
                                        <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Coupon Code *</label>
                                        <p className='text-blue-600 cursor-pointer' onClick={generateCoupon}>Generate Coupon code</p>
                                    </div>
                                    <input
                                        type="text"
                                        name="couponCode"
                                        autoComplete="couponCode"
                                        placeholder='Coupon code'

                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Category *</label>
                                    <select
                                        id="main_category_select"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={couponCategory}
                                        onChange={(e) => setCouponCategory(e.target.value)}
                                    >
                                        <option value="" disabled>Select a Category</option>
                                        <option value="All" >All</option>
                                        {allCategory?.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Customer *</label>
                                    <select
                                        id="main_category_select"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={customer}
                                        onChange={(e) => setCustomer(e.target.value)}
                                    >
                                        <option value="" disabled>Select a customer</option>
                                        <option value="All" >All</option>
                                        {allUsers?.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Set Limit for user *</label>
                                    <input
                                        type="number"
                                        name="limitUser"
                                        autoComplete="limitUser"
                                        placeholder='Ex: 2'

                                        value={limitUser}
                                        onChange={(e) => setLimitUser(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Discount type *</label>
                                    <select
                                        id="main_category_select"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={discountType}
                                        onChange={(e) => setDiscountType(e.target.value)}
                                    >
                                        <option value="" disabled>Select a discount type</option>
                                        <option value="Amount" >Amount</option>
                                        <option value="Percent" >Percent</option>

                                    </select>
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Discount Amount {discountType === "Percent" ? "%" : "₹"}</label>
                                    <input
                                        type="number"
                                        name="discountAmount"
                                        autoComplete="discountAmount"
                                        placeholder='Ex: 500'

                                        value={discountAmount}
                                        onChange={(e) => setDiscountAmount(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Min purchase amount*</label>
                                    <input
                                        type="number"
                                        name="minPurchase"
                                        autoComplete="minPurchase"
                                        placeholder='Ex: 500'

                                        value={minPurchase}
                                        onChange={(e) => setMinPurchase(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Start date *</label>
                                    <input
                                        type="date"
                                        name="price"
                                        id="start-date"
                                        value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={handleStartDateChange}
                                        min={today}
                                        placeholder="Enter start day.."
                                    />
                                </div>

                                <div className="flex mb-4 flex-col">
                                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Expire Date*</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="start-date"
                                        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={handleEndDateChange}
                                        min={minEndDate}
                                        placeholder="Enter end date."
                                    />
                                </div>

                            </form>
                        </div>
                    )
                }
                <div className='mt-3 flex items-center justify-center'>
                    <button onClick={handleSubmit} type="submit" className={`text-white w-[20vw] bg-blue-400 hover:bg-blue-500 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && isSubmitting && "cursor-not-allowed"}`}>
                        {isSubmitting ? <Loader /> : "Submit"}
                    </button>
                </div>
            </div>

            <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md'>
                <div className='flex items-center 800px:justify-between flex-col 800px:flex-row gap-3 800px:gap-0 '>
                    <div className='flex items-center  '>
                        <div className='text-[20px] font-medium text-slate-700'>Coupons List: {allCoupons?.length}</div>
                    </div>

                    <div className='mt-2 flex items-center justify-center'>
                        <div className="w-120 bg-white  shadow-lg ">
                            <form className="flex items-center justify-center p-2">
                                <input
                                    type="text"
                                    placeholder="Search by Title and code"
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
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        #
                                                    </th>

                                                    <th scope="col" className="pl-12 pr-12 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Coupon
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Coupon Type
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Coupon Category
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Duration
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        User Limit
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Status
                                                    </th>

                                                    <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {(searchData || allCoupons)?.length > 0 ? (searchData || allCoupons).map((coupon, index) => (
                                                    <tr key={index}>
                                                        <td className="px-2 py-4 text-sm font-medium  ">
                                                            <div className='text-center'>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                                            </div>
                                                        </td>
                                                        <td className="px-4  py-2 fw-full ">
                                                            <div className="w-full flex items-center justify-center flex-col gap-x-3">
                                                                <h2 className="font-medium text-[14px] text-gray-600 dark:text-white ">{coupon?.couponTitle}</h2>
                                                                <h2 className="font-semibold text-[18px] text-gray-600 dark:text-white ">{coupon?.couponCode}</h2>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{coupon?.couponType}</h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{coupon?.couponCategory}</h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{formatDate(coupon?.startDate) } to </h4>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{formatDate(coupon?.expireDate)}</h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div>
                                                                <h4 className="text-gray-700 text-center dark:text-gray-200">Limit: {coupon?.limitForSameUser}</h4>
                                                                <h4 className="text-gray-700 text-center dark:text-gray-200">used: {coupon?.used}</h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <h4 className="text-gray-700 text-center dark:text-gray-200">{coupon?.isActive ? <span className='text-white rounded-md bg-green-700 p-1 shadow-md'>Active</span> : <span className='text-white rounded-md bg-red-700 p-1 shadow-md'>Expired</span>}</h4>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className='flex items-center justify-end'>
                                                                <div className='w-full mt-4 flex items-center justify-center gap-2 bg-white  '>
                                                                    <button
                                                                        className="text-xl border-2 rounded-md p-1 border-blue-400 transition-colors duration-200"
                                                                        onClick={() => { setOpen(true); setCouponId(coupon?._id) }}
                                                                    >
                                                                        <AiFillDelete className="text-red-500" />
                                                                    </button>

                                                                    <Link to={`/admin/dashboard/subSubCategory/${coupon?._id}`}>
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
                                                        <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No Coupon found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>

            <div className="  text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => handleDelete(couponId)}
                title="Delete Confirmation"
                message="Are you sure you want to delete this Coupon?"
                isDelete={isDelete}
                buttonText={'Delete'}
            />
        </div>
    )
}

export default Coupon