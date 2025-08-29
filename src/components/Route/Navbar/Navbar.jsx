
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { serverTwo } from '../../../server';

const Navbar = () => {
    const navigate = useNavigate();
    // const { allCategory } = useSelector(state => state.category)
    const [allCategory, setAllCategory] = useState([])
    const [loading, setLoading] = useState(false); // loading state

    useEffect(() => {
        const fetchAllCategory = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${serverTwo}/category/all-main-cat`); // Adjust the API endpoint
                const data = await response.json();
                setAllCategory(data?.mainCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategory();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
      };
    

    const handleSubmit = (category) => {
        setLoading(true);

        setTimeout(() => {
            if (category?.name.trim() === "Fashion") {
                navigate(`/products/category/${category?.name}`)
            } else if (category?.name.trim() === "Electronics") {
                navigate(`/products/category/${category?.name}`)
            } else if (category?.name.trim() === "Home Appliances") {
                navigate(`/products/category/${category?.name}`)
            }
            else if (category?.name.trim() === "Grocery") {
                navigate(`/products/category/${category?.name}`)
            }
            else if (category?.name.trim() === "Furniture") {
                navigate(`/products/category/${category?.name}`)
            }
            else if (category?.name.trim() === "Paintings & Crafts") {
                navigate(`/products/category/${category?.name}`)
            }
            setLoading(false); // hide loading spinner after navigation
        }, 2000);
    };

    return (
        <div className='relative bg-[#f0ebeb] md:p-2'>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <div className="loader"></div>
                </div>

                
            )}
            <div className="flex justify-between overflow-x-auto md:py-4 px-4 md:mx-auto w-full md:max-w-[95%] bg-white rounded-md">
                {Array.isArray(allCategory) && allCategory?.map((category, index) => (
                    <div key={index} className="p-3 text-center ">
                        <img
                            src={category?.image?.url}
                            alt={category?.name}
                            className="w-[96px] h-[48px] md:w-20 md:h-10 lg:w-20 lg:h-[80px] rounded-full md:rounded-md cursor-pointer"
                            // onClick={() => handleSubmit(category)}
                            onClick={()=> handleCategoryClick(category?._id)}
                        />
                        <p className="text-sm font-semibold mt-2 text-gray-700 hover:text-blue-500">
                            {category?.name?.length > 6 ? `${category?.name?.slice(0, 5)}...` : category?.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
