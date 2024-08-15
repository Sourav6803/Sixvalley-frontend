import React, { useState, useEffect, useCallback } from 'react';
import Layout from "./icon/layout.png";
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBrand, updateBrand } from '../../redux/actions/brand';


const UpdateBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { success, error, singleBrand,  uploadSuccess } = useSelector((state) => state.brand);

    const [brandName, setBrandName] = useState('');
  
    const [brandLogo, setBrandLogo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch category on mount
    useEffect(() => {
        if (id) {
            dispatch(getSingleBrand(id));
        }
    }, [id, dispatch]);

   

    // Update state when singleCategory is fetched
    useEffect(() => {
        if (singleBrand) {
            setBrandName(singleBrand.brandName);
            
            setBrandLogo(singleBrand.brandLogo?.url);
        }
    }, [singleBrand]);

    // Enable or disable submit button based on form validation
    useEffect(() => {
        if (brandName.length > 1 && brandLogo) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [brandName, brandLogo]);

    const handleFileInputChange = useCallback((e) => {
        const file = e.target.files[0];
        setBrandLogo(file);
    }, []);

    const handleChange = useCallback((e) => {
        const inputValue = e.target.value;
        setBrandName(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!brandName ||  !brandLogo) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const newForm = new FormData();
        newForm.append("brandName", brandName);
        
        if (brandLogo) {
            newForm.append("brandLogo", brandLogo);
        }

        dispatch(updateBrand(id, newForm));

    }, [brandName, brandLogo, dispatch, id]);

    useEffect(() => {
        if (error) {
            setIsSubmitting(false);
            toast.error(error);
        }
        if (uploadSuccess) {
            setIsSubmitting(false);
            toast.success("Brand updated successfully!");
            setTimeout(()=>{
                navigate("/admin/dashboard/all-brand")
                window.location.reload()
            },200)

            
            
            
        }
    }, [error, success, navigate, uploadSuccess]);

    

    return (
        <div className='w-full min-h-screen p-5 bg-gray-200 flex flex-col'>
            <div className='flex items-center gap-2'>
                <img src={Layout} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Brand Update</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md">
                <div className='items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="p-4 rounded-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Brand Name *</label>
                                <input
                                    type="text"
                                    name="brandName"
                                    autoComplete="brandName"
                                    required
                                    value={brandName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                />
                            </div>

                            

                            <div className="flex mt-3 flex-col">
                                <label className="block text-lg font-medium text-gray-700" htmlFor="file_input">Brand Logo *</label>
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
                            {brandLogo ? (
                                <img src={typeof brandLogo === 'string' ? brandLogo : URL.createObjectURL(brandLogo)} alt="avatar" className="h-full w-full object-cover" />
                            ) : (
                                <img src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png" alt="User" className="h-full w-full object-cover" />
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-3 flex items-center justify-center'>
                    <button onClick={handleSubmit} type="submit" className={`text-white w-[20vw] bg-blue-500 hover:bg-blue-700 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && "cursor-not-allowed"}`}>
                        {isSubmitting ? <Loader /> : "Update"}
                    </button>
                </div>
            </div>

            <div className="text-center  mt-auto text-lg font-semibold ">Jamalpur Bazar. Copyright sourav@2024</div>
        </div>
    );
};

export default UpdateBrand;