

import React, { useState, useEffect, useCallback } from 'react';
import Layout from "./icon/layout.png";
import axios from "axios";
import { server } from '../../server';
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../utils/Modal';
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { createBanner, getAllBanner } from '../../redux/actions/banner';
import { Switch } from '@mui/material';

const allBannerType = ["Header Banner","Main Banner", "Popup Banner", "Footer Banner", "Main Section Banner"];
const allResource = ["Product", "Category", "Shop", "Brand", "Event", "Personal", "Informatoonal"];

const Banner = () => {
    const { allProducts } = useSelector((state) => state?.products);
    const { allBrand } = useSelector((state) => state?.brand);
    const { Allsellers } = useSelector((state) => state?.seller);
    const { error, allCategory } = useSelector((state) => state?.category);
    const { allBanner, success } = useSelector((state) => state?.banner);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bannerId, setBannerId] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [bannerOpen, setBannerOpen] = useState(false);
    const [bannerType, setBannerType] = useState("");
    const [resourceType, setResourceType] = useState("Product");
    const [resourceValue, setResourceValue] = useState("");
    const [filterResourceValue, setFilterResourceValue] = useState(allProducts);
    const [publishedModalOpen, setPublishedModalOpen] = useState(false);
    const [publishModalOpentwo, setPublishModaltwo] = useState(false);
    const [isPublished, setIsPublished] = useState()
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        setFilterResourceValue(allProducts);
    }, [allProducts]);

    const bannerTypeChange = useCallback((e) => {
        setBannerType(e.target.value);
    }, []);

    const bannerResourceChange = useCallback((e) => {
        const selectedResourceType = e.target.value;
        setResourceType(selectedResourceType);

        let filteredResourceValue = [];
        switch (selectedResourceType) {
            case "Product":
                filteredResourceValue = allProducts;
                break;
            case "Category":
                filteredResourceValue = allCategory;
                break;
            case "Brand":
                filteredResourceValue = allBrand;
                break;
            case "Shop":
                filteredResourceValue = Allsellers;
                break;
            default:
                break;
        }
        setFilterResourceValue(filteredResourceValue);
        setResourceValue("");
    }, [allProducts, allCategory, allBrand, Allsellers]);


    const handleFileInputChange = useCallback((e) => {
        const file = e.target.files[0];
        setImage(file);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!bannerType || !resourceType || !resourceValue || !image) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const newForm = new FormData();
        newForm.append("bannerType", bannerType);
        newForm.append("resourceType", resourceType);
        newForm.append("resourceValue", resourceValue);
        if (image) {
            newForm.append("bannerImg", image);
        }

        dispatch(createBanner(newForm));
    }, [bannerType, resourceType, resourceValue, image, dispatch]);

    const handleDelete = useCallback(async (id) => {
        try {
            setIsDelete(true);
            const res = await axios.delete(`${server}/banner/delete-banner/${id}`, { withCredentials: true });

            toast.success(res.data.message || "Banner Deleted");
            setIsDelete(false);
            setOpen(false);
            setTimeout(() => window.location.reload(), 1000);
        } catch (err) {
            toast.error("Error deleting category");
            setIsDelete(false);
        }
    }, []);

    const handlePublishedUpdate = async (id) => {
        const res = await axios.put(`${server}/banner/update-banner-status/${id}`, { isPublished }, { withCredentials: true });
        if (res.data.success) {
            toast.success("Banner updated successfully!");
        }

        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    const handleUpdate = (banner) => {
        // Open the modal with banner data
        setModalData(banner);
        setIsModalOpen(true);
    };


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
            toast.success("Banner created successfully!");
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        }
    }, [error, success,]);

    useEffect(() => {
        if (success) {
            dispatch(getAllBanner())
        }
    }, [handleSubmit, handleDelete, dispatch, success])

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm === "All") {
            setSearchData(allBanner);
        } else {
            const filterBanner = allBanner.filter((banner) =>
                banner.bannerType.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchData(filterBanner);
        }
    };

    return (
        <div className='w-full p-5 bg-gray-200'>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Banner Setup</h3>
            </div>

            {bannerOpen && (
                <div className="w-full mt-2 bg-white p-3 rounded-md">
                    {isSubmitting ? (
                        <div className='w-full h-full flex items-start justify-center'><Loader /></div>
                    ) : (
                        <div className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className="p-4 rounded-md">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="bannerType" className="block text-lg font-medium text-gray-700">Banner Type *</label>
                                        <select
                                            id="bannerType"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={bannerType}
                                            onChange={bannerTypeChange}
                                            required
                                        >
                                            <option value="" disabled>Select a banner type</option>
                                            {allBannerType.map(bannerType => (
                                                <option key={bannerType} value={bannerType}>
                                                    {bannerType}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="resourceType" className="block text-lg font-medium text-gray-700">Resource Type</label>
                                        <select
                                            id="resourceType"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={resourceType}
                                            onChange={bannerResourceChange}
                                            required
                                        >
                                            {allResource.map(resource => (
                                                <option key={resource} value={resource}>
                                                    {resource}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="resourceValue" className="block text-lg font-medium text-gray-700">{resourceType}</label>
                                        <select
                                            id="resourceValue"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={resourceValue}
                                            onChange={(e) => setResourceValue(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select a {resourceType}</option>
                                            {filterResourceValue?.map(resource => (
                                                <option key={resource._id} value={resourceType === "Product" ? resource?._id : resource?.name}>
                                                    {resource?.name || resource?.brandName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fileInput" className="block text-lg font-medium text-gray-700">Upload Image *</label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={handleFileInputChange}
                                            required
                                        />
                                    </div>


                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${!bannerType || !resourceType || !resourceValue || !image ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                                            disabled={!bannerType || !resourceType || !resourceValue || !image}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Create Banner'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="flex items-center justify-center flex-col p-4 rounded-md">
                                <div className="border-3 border-dashed  p-2  overflow-hidden ">
                                    <div className='md:h-[20vh] h-[20vh] md:w-[70vh] w-[60vh] rounded-md '>
                                        {image ? (
                                            <img src={URL.createObjectURL(image)} alt="avatar" className="h-full w-full object-cover" />
                                        ) : (
                                            <img src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png" alt="User" className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                </div>

                                <div className='text-center px-3'>
                                    <p className='mx-auto'>Banner Image Ratio 3:1
                                        Banner Image ratio is not same for all sections in website. Please review the ratio before upload</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className='mt-5 flex justify-between items-center bg-white p-3 rounded-md'>
                <div className="flex items-center w-full">
                    <button onClick={() => setBannerOpen(!bannerOpen)} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <AiOutlinePlus className="mr-1" />
                        Add Banner
                    </button>
                </div>
                <div className="flex items-center w-full">
                    <form className="w-full" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search by Banner Type"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                    <button
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className='w-full mt-5 bg-white p-3 rounded-md'>
                {allBanner?.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banner Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {searchData ? searchData.map((banner, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{banner.bannerType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{banner.resourceValue}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <img src={banner.bannerImg.url} alt="Banner" className="h-10 w-10 rounded-full" />
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {
                                                banner?.isPublished ? (
                                                    <div className="flex items-center mt-3">
                                                        <Switch
                                                            checked={banner.isPublished}

                                                            onClick={() => { setPublishedModalOpen(true); setIsPublished(false); setBannerId(banner?._id) }}
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />

                                                    </div>
                                                ) : (
                                                    <div className="flex items-center mt-3">
                                                        <Switch
                                                            checked={banner.isPublished}
                                                            onChange={() => setIsPublished(true)}
                                                            onClick={() => { setPublishModaltwo(true); setBannerId(banner?._id) }}
                                                            color="secondary"
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button onClick={() => { setOpen(true); setBannerId(banner?._id) }} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    <AiFillDelete className="mr-1" />
                                                    Delete
                                                </button>
                                                <button onClick={() => handleUpdate(banner)} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                    Update
                                                </button>
                                            </div>
                                            {/*  */}
                                        </td>
                                    </tr>
                                )) : allBanner.map((banner, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{banner.bannerType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{banner.resourceValue}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <img src={banner.bannerImg.url} alt="Banner" className="h-10 w-10 rounded-full" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {
                                                banner?.isPublished ? (
                                                    <div className="flex items-center mt-3">
                                                        <Switch
                                                            checked={banner.isPublished}

                                                            onClick={() => { setPublishedModalOpen(true); setIsPublished(false); setBannerId(banner?._id) }}
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />

                                                    </div>
                                                ) : (
                                                    <div className="flex items-center mt-3">
                                                        <Switch
                                                            checked={banner.isPublished}
                                                            onChange={() => setIsPublished(true)}
                                                            onClick={() => { setPublishModaltwo(true); setBannerId(banner?._id) }}
                                                            color="secondary"
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button onClick={() => { setOpen(true); setBannerId(banner?._id) }} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    <AiFillDelete className="mr-1" />
                                                    Delete
                                                </button>
                                                <button onClick={() => handleUpdate(banner)} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                    Update
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No banners found.
                    </div>
                )}
            </div>


            <Modal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => handleDelete(bannerId)}
                title="Delete Confirmation"
                message="Are you sure you want to delete this banner?"
                isDelete={isDelete}
                buttonText="Delete"
            />

            {
                publishedModalOpen && (
                    <Modal
                        open={publishedModalOpen}
                        onClose={() => setPublishedModalOpen(false)}
                        onConfirm={() => handlePublishedUpdate(bannerId)}
                        title="Want to Turn OFF Main Banner Status"
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
                        onConfirm={() => handlePublishedUpdate(bannerId)}
                        title="Want to Turn ON Banner Status"
                        message="If turn on, this banner will be visible from the website and customer app"
                        isDelete={isDelete}
                        buttonText="Update"
                    />
                )
            }
        </div>
    );
};

export default Banner;
