import React, { useState, useEffect, useCallback } from 'react';
import Layout from "./icon/layout.png";
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleCategories, updateCategory  } from '../../redux/actions/category';


const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { success, error, singleCategory,updateCategory: update, uploadSuccess } = useSelector((state) => state.category);

    const [name, setName] = useState('');
    const [priroity, setPriority] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch category on mount
    useEffect(() => {
        if (id) {
            dispatch(getSingleCategories(id));
        }
    }, [id, dispatch]);

    // Update state when singleCategory is fetched
    useEffect(() => {
        if (singleCategory) {
            setName(singleCategory.name);
            setPriority(singleCategory.priroity);
            setImage(singleCategory.image?.url);
        }
    }, [singleCategory]);

    // Enable or disable submit button based on form validation
    useEffect(() => {
        if (name.length > 1 && priroity && image) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, priroity, image]);

    const handleFileInputChange = useCallback((e) => {
        const file = e.target.files[0];
        setImage(file);
    }, []);

    const handleChange = useCallback((e) => {
        const inputValue = e.target.value;
        setName(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!name || !priroity || !image) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const newForm = new FormData();
        newForm.append("name", name);
        newForm.append("priroity", priroity);
        if (image) {
            newForm.append("image", image);
        }

        dispatch(updateCategory(id, newForm));

    }, [name, priroity, image, dispatch, id]);

    useEffect(() => {
        if (error) {
            setIsSubmitting(false);
            toast.error(error);
        }
        if (uploadSuccess) {
            setIsSubmitting(false);
            toast.success("Category updated successfully!");
            
        }
    }, [error, success, navigate, uploadSuccess]);

    

    return (
        <div className='w-full min-h-screen p-5 bg-gray-200 flex flex-col'>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Category Setup</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md">
                <div className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="p-4 rounded-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Category Name *</label>
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
                                    value={priroity}
                                    onChange={(e) => setPriority(Number(e.target.value))}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                />
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
                        <div className="border p-2 md:h-[40vh] h-[30vh] md:w-[30vh] w-[40vh] rounded-md overflow-hidden">
                            {image ? (
                                <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="avatar" className="h-full w-full object-cover" />
                            ) : (
                                <img src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png" alt="User" className="h-full w-full object-cover" />
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-3 flex items-center justify-center'>
                    <button onClick={handleSubmit} type="submit" className={`text-white w-[20vw] bg-blue-400 hover:bg-blue-500 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && "cursor-not-allowed"}`}>
                        {isSubmitting ? <Loader /> : "Submit"}
                    </button>
                </div>
            </div>

            <div className="text-center  mt-auto text-lg font-semibold ">Jamalpur Bazar. Copyright sourav@2024</div>
        </div>
    );
};

export default UpdateCategory;