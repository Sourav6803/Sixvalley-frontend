
import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { server } from '../../server';
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import { Link } from "react-router-dom";
import Modal from '../../utils/Modal';
import { AiOutlinePlus } from "react-icons/ai";
import flashDeal from "./icon/hot-deal.png"
import { Switch } from '@mui/material';

const FlashDeals = () => {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)

    const [title, setTitle] = useState()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [allFlashDeal, setAllFlashDeal] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [publishedModalOpen, setPublishedModalOpen] = useState(false);
    const [publishModalOpentwo, setPublishModaltwo] = useState(false);
    const [isPublished, setIsPublished] = useState()
    const [flashDealId, setFlashDealId] = useState("")

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${server}/flashDeal/get-all-flashDeal`, { withCredentials: true, }).then((res) => {
            setIsLoading(false);
            setAllFlashDeal(res.data.data);
        }).catch((error) => {
            setIsLoading(false);
        });
    }, []);

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        setStartDate(startDate);
        setEndDate(null);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";

    const handleFileInputChange = useCallback((e) => {
        const file = e.target.files[0];
        setImage(file);
    }, []);

    useEffect(() => {
        if (title?.length > 1 && startDate && endDate && image) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [title, startDate, endDate, image]);

    const handleChange = useCallback((e) => {
        const inputValue = e.target.value;
        setTitle(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // if (!title || !startDate || endDate ||  !image) {
        //     toast.error("Please fill in all required fields.");
        //     return;
        // }

        setIsSubmitting(true);

        const newForm = new FormData();
        newForm.append("name", title);
        newForm.append("startDate", startDate);
        newForm.append("expireDate", endDate);

        if (image) {
            newForm.append("image", image);
        }

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };


        const res = await axios.post(`${server}/flashDeal/create-flashDeal`, newForm, config);

        if (res.data) {
            setIsSubmitting(false);
            toast.success(res.data.message || "Flash deal created successfully!");
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }

    }, [title, startDate, endDate, image]);

    const formatDate = (isoDate) => {
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

    useEffect(() => {
        if (searchTearm) {
            const filterDeal = allFlashDeal.filter((deal) =>
                deal.name.toLowerCase().includes(searchTearm.toLowerCase())
            );
            setSearchData(filterDeal);
        } else {
            setSearchData(null);
        }
    }, [searchTearm, allFlashDeal]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filterDeal = allFlashDeal.filter((deal) =>
            deal.name.toLowerCase().includes(searchTearm.toLowerCase())
        );
        setSearchData(filterDeal);
    };

    const handlePublishedUpdate = async (id) => {
        const res = await axios.put(`${server}/flashDeal/update-flashdeal-publicStatus/${id}`, { publish: isPublished }, { withCredentials: true });
        if (res.data.success) {
            toast.success("Flashdeal publish status updated successfully!");
        }

        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    return (
        <div className='w-full 800px:p-5 p-2 bg-gray-200'>
            <div className='flex items-center gap-2'>
                <img src={flashDeal} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Flash Deal Setup</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md">
                {
                    isSubmitting ? (<div className='w-full h-full flex items-start justify-center'><Loader /></div>) : (
                        <div className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className="p-4 rounded-md">
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            autoComplete="title"
                                            required
                                            value={title}
                                            onChange={handleChange}
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

                                    <div className="flex mt-3 flex-col">
                                        <label className="block text-lg font-medium text-gray-700" htmlFor="file_input">Image *</label>
                                        <input
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                            id="file_input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleFileInputChange}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="flex items-center justify-center p-4 rounded-md">
                                <div className="border p-2 md:h-[40vh] h-[30vh] md:w-[30vh] w-[40vh] rounded-md overflow-hidden">
                                    {image ? (
                                        <img src={URL.createObjectURL(image)} alt="avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <img src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png" alt="User" className="h-full w-full object-cover" />
                                    )}
                                </div>
                            </div>
                        </div>

                    )
                }
                <div className='mt-3 flex items-center justify-center'>
                    <button onClick={handleSubmit} type="submit" className={`text-white w-[20vw] bg-blue-400 hover:bg-blue-500 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && isSubmitting && "cursor-not-allowed"}`}>
                        Submit
                    </button>
                </div>
            </div>

            <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 '>
                    <div className='flex items-center justify-center '>
                        <div className='text-[20px] font-medium text-slate-700 text-center'>Flash deals table {allFlashDeal?.length}</div>
                    </div>

                    <div className='mt-2 flex items-center justify-center'>
                        <div className="w-120 bg-white  shadow-lg ">
                            <form className="flex items-center justify-center p-2">
                                <input
                                    type="text"
                                    placeholder="Search by category name"
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
                                                        SL
                                                    </th>

                                                    <th scope="col" className="pl-12 pr-12 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Title
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Duration
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Status
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Active Products
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Publish
                                                    </th>

                                                    <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {(searchData || allFlashDeal)?.length > 0 ? (searchData || allFlashDeal)?.map((flashDeal, index) => (
                                                    <tr key={index}>
                                                        <td className="px-2 py-4 text-sm font-medium  ">
                                                            <div className='text-center'>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                                            </div>
                                                        </td>
                                                        <td className="px-4  py-2 fw-full ">
                                                            <div className='text-center'>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{flashDeal.name}</h2>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{formatDate(flashDeal?.startDate)} to {formatDate(flashDeal?.expireDate)} </h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {flashDeal?.status === "Active" ? (
                                                                <div className='p-1 rounded-md border bg-green-100 border-blue-400 '>
                                                                    <h4 className=" text-center font-normal text-green-600 ">{flashDeal?.status}</h4>
                                                                </div>
                                                            ) :
                                                                (
                                                                    <div className='p-1 rounded-md border-red-300 bg-red-100'>
                                                                        <h4 className=" text-center font-normal text-red-600 ">{flashDeal?.status}</h4>
                                                                    </div>
                                                                )
                                                            }

                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <h4 className="text-gray-700 text-center dark:text-gray-200">{flashDeal?.products?.length}</h4>
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {
                                                                flashDeal?.publish ? (
                                                                    <div className="flex items-center mt-3">
                                                                        <Switch
                                                                            checked={flashDeal.publish}

                                                                            onClick={() => { setPublishedModalOpen(true); setIsPublished(false); setFlashDealId(flashDeal?._id) }}
                                                                            color="primary"
                                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                                        />

                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center mt-3">
                                                                        <Switch
                                                                            checked={flashDeal.publish}
                                                                            onChange={() => setIsPublished(true)}
                                                                            onClick={() => { setPublishModaltwo(true); setFlashDealId(flashDeal?._id) }}
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

                                                                    <Link to={`/admin/dashboard/flash-deal/add-product/${flashDeal._id}`}>
                                                                        <div className='px-2 cursor-pointer py-1.5 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-md border hover:shadow-md border-blue-600 flex items-center justify-center' >
                                                                            <AiOutlinePlus className='mr-2 hover:text-white font-medium text-blue-400' />
                                                                            <p className='text-blue-400 hover:text-white font-medium'>Add Product</p>
                                                                        </div>
                                                                    </Link>

                                                                    <Link to={`/admin/dashboard/category/${flashDeal?._id}`}>
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
                                                        <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No Deals found</td>
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

            {
                publishedModalOpen && (
                    <Modal
                        open={publishedModalOpen}
                        onClose={() => setPublishedModalOpen(false)}
                        onConfirm={() => handlePublishedUpdate(flashDealId)}
                        title="Want to Turn OFF Flashdeal Publish Status"
                        message="If disabled this banner will be hidden from the website and customer app"
                        isDelete={isDelete}
                        buttonText="Update"
                    />
                )
            }

            {
                publishModalOpentwo && (
                    <Modal
                        open={publishModalOpentwo}
                        onClose={() => setPublishModaltwo(false)}
                        onConfirm={() => handlePublishedUpdate(flashDealId)}
                        title="Want to Turn ON Flashdeal Publish Status"
                        message="If turn on, this banner will be visible from the website and customer app"
                        isDelete={isDelete}
                        buttonText="Update"
                    />
                )
            }

        </div>
    );
};

export default FlashDeals;