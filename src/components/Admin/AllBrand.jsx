import React, { useCallback, useEffect, useState } from 'react'
import Layout from "./icon/layout.png";
import axios from "axios";
import { server } from '../../server';
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import {  useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../utils/Modal';
import { AiFillDelete } from "react-icons/ai";


const AllBrand = () => {
    const { success, error, allBrand } = useSelector((state) => state?.brand);
    const [allBrands, setAllBrand] = useState([]);

    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)


    const handleDelete = useCallback(async (id) => {
        try {
            setIsDelete(true)
            const res = await axios.delete(`${server}/brand/delete-brand/${id}`, { withCredentials: true });

            toast.success(res.data.message || "Brand Deleted");
            setIsDelete(false)
            setAllBrand(allBrands.filter(cat => cat._id !== id));
            setOpen(false);
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (err) {
            toast.error("Error deleting Brand");
            setIsDelete(false)
        }
    }, [allBrands]);

    useEffect(() => {
        if (searchTearm) {
            const filterCategory = allBrands.filter((catg) =>
                catg.name.toLowerCase().includes(searchTearm.toLowerCase())
            );
            setSearchData(filterCategory);
        } else {
            setSearchData(null);
        }
    }, [searchTearm, allBrands]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filterCategory = allBrands.filter((catg) =>
            catg.name.toLowerCase().includes(searchTearm.toLowerCase())
        );
        setSearchData(filterCategory);
    };

    return (
        <div className='md:p-6 p-1 bg-gray-200 min-h-screen'>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Brand List:  {allBrand?.length}</h3>
            </div>


            <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 '>
                    <div className='flex items-center justify-center '>
                        <div className='text-[20px] font-medium text-slate-700 text-center'>Brand List {allBrand?.length}</div>
                    </div>

                    <div className='mt-2 flex items-center justify-center'>
                        <div className="w-120 bg-white  shadow-lg ">
                            <form className="flex items-center justify-center p-2">
                                <input
                                    type="text"
                                    placeholder="Search by Brand name"
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
                                                        Id
                                                    </th>

                                                    <th scope="col" className="pl-12 pr-12 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Brand Logo
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Brand Name
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Total Order
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Total Product
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Status
                                                    </th>

                                                    <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                                        <span className="sr-only">Delete</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {(searchData || allBrand)?.length > 0 ? (searchData || allBrand).map((cat, index) => (
                                                    <tr key={index}>
                                                        <td className="px-2 py-4 text-sm font-medium  ">
                                                            <div className='text-center'>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{cat._id}</h2>
                                                            </div>
                                                        </td>
                                                        <td className="px-4  py-2 w-full ">
                                                            <div className="w-full flex items-center justify-center  gap-x-3">
                                                                <img className="object-cover w-10 h-10 rounded-md" src={cat?.brandLogo?.url} alt="Imag" />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{cat?.brandName}</h4>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <h4 className="text-gray-700 text-center dark:text-gray-200">{cat?.totalOrder}</h4>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <h4 className="text-gray-700 text-center dark:text-gray-200">{cat?.totalProduct}</h4>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {/* <h4 className="text-gray-700 text-center dark:text-gray-200"> <Switch color="indigo" defaultChecked  /></h4> */}
                                                            <label className= "relative inline-flex items-center cursor-pointer">
                                                                <input type="checkbox" value="" className="sr-only peer" />
                                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">

                                                                </div>
                                                                
                                                            </label>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className='flex items-center justify-end'>
                                                                <div className='w-full mt-4 flex items-center justify-center gap-2 bg-white  '>
                                                                    <button
                                                                        className="text-xl border-2 rounded-md p-1 border-blue-400 transition-colors duration-200"
                                                                        onClick={() => { setOpen(true); setCategoryId(cat?._id) }}
                                                                    >
                                                                        <AiFillDelete className="text-red-500" />
                                                                    </button>

                                                                    <Link to={`/admin/dashboard/brand/${cat?._id}`}>
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
                                                        <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No Brand found</td>
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

            <div>
                <div className="  text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => handleDelete(categoryId)}
                title="Delete Confirmation"
                message="Are you sure you want to delete this Brand?"
                isDelete={isDelete}
            />
        </div>
    )
}

export default AllBrand