
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


const SubSubCategory = () => {

    const { allCategory } = useSelector((state) => state?.category);
    const { allSubCategory } = useSelector((state) => state?.subCategory);
    const { success, error, isLoading, allSubSubCategory } = useSelector((state) => state?.subSubCategory);


    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [priority, setPriority] = useState();
    const [mainCategory, setMainCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    useEffect(() => {
        setAllCategories(allCategory);
    }, [allCategory]);


    useEffect(() => {
        setAllSubCategories(allSubCategory);
    }, [allSubCategory]);

    const handleFileInputChange = useCallback((e) => {
        const file = e.target.files[0];
        setImage(file);
    }, []);


    useEffect(() => {
        if (name.length > 1 && priority && mainCategory && subCategory && image) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, priority, mainCategory, subCategory, image]);

    const handleCategoryChange = useCallback((e) => {
        const selectedMainCategory = e.target.value;
        setMainCategory(selectedMainCategory);
        const filteredSubCategories = allSubCategory.filter(subCat => subCat.mainCategory === selectedMainCategory);
        setFilteredSubCategories(filteredSubCategories);
    }, [setMainCategory, allSubCategory]);

    const handleSubCategoryChange = useCallback((e) => {
        setSubCategory(e.target.value);
    }, [setSubCategory]);

    const handleChange = useCallback((e) => {
        const inputValue = e.target.value;
        setName(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!name || !priority || !mainCategory || !subCategory || !image) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const newForm = new FormData();
        newForm.append("name", name);
        newForm.append("priority", priority);
        newForm.append("mainCategory", mainCategory);
        newForm.append("subCategory", subCategory);
        if (image) {
            newForm.append("image", image);
        }

        try {
            dispatch(createSubSubCategory(newForm))
            setIsSubmitting(false);
            setName("");
            setPriority();
            setMainCategory("");
            setSubCategory("")
            setImage(null)
        }
        catch (err) {
            setIsSubmitting(false);
            toast.error(err.message || "Failed to create category.");
        } finally {
            setIsSubmitting(false);
        }
    }, [name, priority, mainCategory, subCategory, dispatch, image]);


    const handleDelete = useCallback(async (id) => {
        try {
            setIsDelete(true)
            const res = await axios.delete(`${server}/subSubCategory/delete-subSubCategory/${id}`, { withCredentials: true });
            setIsDelete(false)
            toast.success(res.data.message || "Sub sub-Category Deleted");
            setAllCategories(allSubSubCategory.filter(cat => cat._id !== id));
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
    }, [allSubSubCategory]);

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
            const filterCategory = allSubSubCategory.filter((catg) =>
                catg.name.toLowerCase().includes(searchTearm.toLowerCase())
            );
            setSearchData(filterCategory);
        } else {
            setSearchData(null);
        }
    }, [searchTearm, allSubSubCategory]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filterCategory = allSubSubCategory.filter((catg) =>
            catg.name.toLowerCase().includes(searchTearm.toLowerCase())
        );
        setSearchData(filterCategory);
    };


    return (
        <div className='w-full p-2 md:p-5 bg-gray-200'>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Sub Sub Category Setup</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
                {
                    isLoading ? (<div className='w-full h-full flex items-start justify-center'><Loader /></div>) : (
                        <div className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className="p-4 rounded-md ">
                                <form className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-2 '>
                                    <div className="mb-4 ">
                                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Sub Sub-Category Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            required
                                            value={name}
                                            onChange={handleChange}
                                            placeholder='Enter Sub sub-category name*'
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="priority" className="block text-lg font-medium text-gray-700">Priority</label>
                                        <input
                                            type="number"
                                            name="priority"
                                            autoComplete="priority"
                                            placeholder='Please select 1 to 10'
                                            min={1}
                                            max={10}
                                            required
                                            value={priority}
                                            onChange={(e) => setPriority(Number(e.target.value))}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                        />
                                    </div>

                                    <div className="flex mb-4 flex-col">
                                        <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Main category *</label>
                                        <select
                                            id="main_category_select"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={mainCategory}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="" disabled>Select a category</option>
                                            {allCategory?.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex mb-4 flex-col">
                                        <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Sub category *</label>
                                        <select
                                            id="main_category_select"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={subCategory}
                                            onChange={handleSubCategoryChange}
                                        >
                                            <option value="" disabled>Select a sub category</option>
                                            {filteredSubCategories?.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex mt-3 flex-col">
                                        <label className="block text-lg font-medium text-gray-700" htmlFor="file_input">Category Logo *</label>
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
                                <div className="border p-2 md:h-[45vh] h-[30vh] md:w-[45vh] w-[40vh] rounded-md overflow-hidden">
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
                        {isSubmitting ? <Loader /> : "Submit"}
                    </button>
                </div>
            </div>

            <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md'>
                <div className='flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0'>
                    <div className='flex items-center  '>
                        <div className='text-[20px] font-medium text-slate-700'>Sub Sub-Category List: {allSubSubCategory?.length}</div>
                    </div>

                    <div className='mt-2 flex items-center justify-center'>
                        <div className="w-120 bg-white  shadow-lg ">
                            <form className="flex items-center justify-center p-2">
                                <input
                                    type="text"
                                    placeholder="Search by Subcategory name"
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
                                                        Sub Sub-Category Name
                                                    </th>

                                                    <th scope="col" className="pl-12 pr-12 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Logo
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Main Category
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Sub Category
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Priority
                                                    </th>

                                                    <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                                        <span className="sr-only">Delete</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {(searchData || allSubSubCategory)?.length > 0 ? (searchData || allSubSubCategory).map((cat, index) => (
                                                    <tr key={index}>
                                                        <td className="px-2 py-4 text-sm font-medium  ">
                                                            <div className='text-center'>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{index+1}</h2>
                                                            </div>
                                                        </td>
                                                        <td className="px-4  py-2 fw-full ">
                                                            <div className="w-full flex items-center justify-center  gap-x-3">
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{cat?.name}</h2>
                                                            </div>
                                                        </td>

                                                        <td className="px-4  py-2 fw-full ">
                                                            <div className="w-full flex items-center justify-center  gap-x-3">
                                                                <img className="object-cover w-10 h-10 rounded-full" src={cat?.image?.url} alt="Imag" />
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{cat?.mainCategory}</h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm ">
                                                            <div className='text-center'>
                                                                <h4 className="text-gray-700 dark:text-gray-200">{cat?.subCategory}</h4>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <h4 className="text-gray-700 text-center dark:text-gray-200">{cat?.priority}</h4>
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

                                                                    <Link to={`/admin/dashboard/subSubCategory/${cat?._id}`}>
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
                                                        <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No categories found</td>
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
                onConfirm={() => handleDelete(categoryId)}
                title="Delete Confirmation"
                buttonText={"Yes! Sure"}
                message="Are you sure you want to delete this sub category?"
                isDelete={isDelete}
            />
        </div>
    );
};

export default SubSubCategory;