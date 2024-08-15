import React, { useState, useEffect, useCallback } from 'react';
import Layout from "./icon/layout.png";
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleSubSubCategories, updateSubSubCategory } from '../../redux/actions/subSubCategory';


const UpdateSubSubCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {success, singleSubSubCategory, subSubCategoryUploadSuccess, error} = useSelector((state)=> state.subSubCategory)

    const [name, setName] = useState('');
    
    const [priority, setPriority] = useState(0);
    const [mainCategory, setMainCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch category on mount
    useEffect(() => {
        if (id) {
            dispatch(getSingleSubSubCategories(id));
        }
    }, [id, dispatch]);

    // Update state when singleCategory is fetched
    useEffect(() => {
        if (singleSubSubCategory) {
            setName(singleSubSubCategory?.name);
            setPriority(singleSubSubCategory?.priority);
            setMainCategory(singleSubSubCategory?.mainCategory);
            setSubCategory(singleSubSubCategory?.subCategory)
        }
    }, [singleSubSubCategory]);

 

    // Enable or disable submit button based on form validation
    useEffect(() => {
        if (name.length > 1 && priority && mainCategory) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, priority, mainCategory]);

    

    const handleChange = useCallback((e) => {
        const inputValue = e.target.value;
        setName(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!name || !priority ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        dispatch(updateSubSubCategory(id, {name, priority}));
    }, [name,priority, dispatch, id]);

    useEffect(() => {
        if (error) {
            setIsSubmitting(false);
            toast.error(error);
        }
        if (subSubCategoryUploadSuccess) {
            setIsSubmitting(false);
            toast.success("Sub sub-Category updated successfully!");
            setTimeout(()=>{
                navigate("/admin/dashboard/sub-sub-category")
                window.location.reload()
            },1000)
        }
    }, [error , success,navigate, subSubCategoryUploadSuccess]);

    

    return (
        <div className='w-full h-screen p-5 bg-gray-200    '>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Sub Sub-Category Update</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md">
                <div className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="p-4 rounded-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Sub Sub-Category Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={handleChange}
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

                            <div className="flex mt-3 flex-col">
                                <label className="block text-lg font-medium text-gray-700" htmlFor="file_input">Main Category (Not Changeable)</label>
                                <input
                                        type="text"
                                        name="mainCategory"
                                        autoComplete="mainCategory"
                                        required
                                        value={mainCategory}
                                        
                                        
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                            </div>

                            <div className="flex mt-3 flex-col">
                                <label className="block text-lg font-medium text-gray-700" htmlFor="file_input">Subcategory Category (Not Changeable)</label>
                                <input
                                        type="text"
                                        name="mainCategory"
                                        autoComplete="mainCategory"
                                        required
                                        value={subCategory}
                                        
                                        
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                            </div>
                        </form>
                    </div>

                    
                </div>

                <div className='mt-3 flex items-center justify-center'>
                    <button onClick={handleSubmit} type="submit" className={`text-white w-[20vw] bg-blue-400 hover:bg-blue-500 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && "cursor-not-allowed"}`}>
                        {isSubmitting ? <Loader /> : "Submit"}
                    </button>
                </div>
            </div>

            <div className="  text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>
        </div>
    );
}

export default UpdateSubSubCategory;