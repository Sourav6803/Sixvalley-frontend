import React, { useCallback, useEffect, useState } from 'react'
import Layout from "./icon/layout.png";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand } from '../../redux/actions/brand';
import Loader from '../../pages/Loader';

const Brand = () => {

  const { success, error } = useSelector((state) => state?.brand);

  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  
  const handleChange = useCallback((e) => {
    const inputValue = e.target.value;
    setBrandName(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBrandLogo(file);
  };
  
  useEffect(() => {
    if (brandName && brandLogo) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [brandName, brandLogo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!brandName || !brandLogo) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const newForm = new FormData();
    newForm.append("brandName", brandName);
    if (brandLogo) {
      newForm.append("brandLogo", brandLogo);
    }

    dispatch(createBrand(newForm));
  }, [brandName, brandLogo, dispatch]);

  useEffect(() => {
    if (error) {
      setIsSubmitting(false);
      toast.error(error);
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    }
    if (success) {
      setIsSubmitting(false);
      toast.success("Category created successfully!");
      setTimeout(() => {
          window.location.reload()
      }, 1000)
    }
  }, [dispatch, error, success,]);

  return (
    <div className="md:p-6 p-1 bg-gray-200 min-h-screen">

      <div className=''>
        <div className='flex ml-3 items-center gap-2'>
          <img src={Layout} alt='layout' className='h-5' />
          <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Brand Setup</h3>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mt-3  w-full">


          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="brandName">
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                className="w-full p-2 border rounded-lg"
                placeholder="Ex: Nike"
                value={brandName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                Image (Size 1:1)
              </label>
              <input
                type="file"
                id="image"
                className="w-full p-2 border rounded-lg"
                onChange={handleImageChange}
              />

            </div>
          </form>

          <div className="flex items-center justify-center p-4 rounded-md">
            <div className="border p-2 md:h-[35vh] h-[30vh] md:w-[30vh] w-[40vh] rounded-md overflow-hidden">
              {brandLogo ? (
                <img src={URL.createObjectURL(brandLogo)} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <img src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png" alt="User" className="h-full w-full object-cover" />
              )}
            </div>
          </div>

          <div className='mt-3 flex items-center justify-center'>
            <button onClick={handleSubmit} type="submit" className={`text-white w-[20vw] bg-blue-500 hover:bg-blue-700 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && isSubmitting && "cursor-not-allowed"}`}>
              {isSubmitting ? <Loader /> : "Submit"}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="  text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>
      </div>
    </div>

  )
}

export default Brand