
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const navigate = useNavigate();
    const { allCategory } = useSelector(state => state.category)
    const [loading, setLoading] = useState(false); // loading state

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
        <div className='relative'>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex justify-between overflow-x-auto px-4 mx-auto w-full bg-white">
                {Array.isArray(allCategory) && allCategory?.map((category, index) => (
                    <div key={index} className="p-3 text-center">
                        <img
                            src={category.image.url}
                            alt={category.name}
                            className="w-24 h-12 md:w-20 md:h-10 lg:w-24 lg:h-12 rounded-full cursor-pointer"
                            onClick={() => handleSubmit(category)}
                        />
                        <p className="text-sm font-semibold mt-2 text-gray-700 hover:text-blue-500">
                            {category?.name?.length > 6 ? `${category.name.slice(0, 5)}...` : category.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>






    );
};

export default Navbar;
