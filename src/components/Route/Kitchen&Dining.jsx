import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { server } from '../../server';
import {  useNavigate } from 'react-router-dom';
import Loader from '../../pages/Loader';


const KitchenDining = () => {
    const { user } = useSelector((state) => state?.user);
    const { allProducts } = useSelector((state) => state?.products);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);


    useEffect(() => {
        const getRandomProducts = allProducts?.filter((product) => product.category === "Home Appliances").slice(0, 4)
        if (!user?._id) {
            // If the user is not logged in, show random products from allProducts
            setRecommendations(getRandomProducts);
            setIsLoading(false); // Loading is done since we’re not fetching
            return;
        }

        const fetchRecommendations = async () => {
            setIsLoading(true);
            setError(null); // Reset error

            try {
                const response = await axios.get(`${server}/activity/recommendations/${user?._id}`);
                const { data } = response;
                setRecommendations(data);
            } catch (err) {
                console.error("Failed to fetch recommendations:", err.message);
                setError('Failed to load recommendations.');
            } finally {
                setIsLoading(false);
            }
        };

        if (user?._id) {
            fetchRecommendations();
        }
    }, [user?._id, allProducts]);

    const navigate = useNavigate();

    // Filter recommendation by category and remove duplicates
    const filterRecommendation = recommendations
        ?.filter((product) => product.product?.category === "Home Appliances")
        .slice(-5)
        .reduce((acc, current) => {
            const exists = acc.find(item => item?.product?._id === current?.product?._id);
            if (!exists) {
                acc.push(current);
            }
            return acc;
        }, []);

        

    

    return (
        <div className="bg-white p-1">
            <div className="text-center mb-6 p-2">
                <h2 className="text-lg font-bold">Continue Shopping | Deals in Living and Dining Room</h2>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-6">
                    <Loader />
                    <p className="ml-2 text-sm text-gray-500">Loading deal...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex justify-center items-center py-6">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Recommendations Content */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {!isLoading && filterRecommendation?.length > 0 ? (
                    filterRecommendation.map((deal) => (
                        <div
                            key={deal._id}
                            className="border rounded-lg shadow-lg p-1 cursor-pointer"
                            onClick={() => navigate(`/product/${deal?.product?._id}`)}
                        >
                            <img
                                src={deal?.product?.images?.[0]?.url || '/placeholder-image.jpg'} // Fallback image
                                alt={deal?.product?.category || 'Product'}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <div className="flex justify-between items-center">
                                <div className="bg-red-500 px-2 py-1 text-white rounded-md font-semibold text-xs">
                                    {deal?.product?.discountType === "Percent"
                                        ? `${deal?.product?.discountAmount}%`
                                        : `Flat ₹${deal?.product?.discountAmount}`} off
                                </div>
                                <div className="text-red-600 font-semibold text-xs">
                                    Limited time deal
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !isLoading && recommendations?.length > 0 ? (
                        recommendations?.map((deal) => (
                            <div
                                key={deal._id}
                                className="border rounded-lg shadow-lg p-1 cursor-pointer"
                                onClick={() => navigate(`/product/${deal?._id}`)}
                            >
                                <img
                                    src={deal?.images?.[0]?.url || '/placeholder-image.jpg'} // Fallback image
                                    alt={deal?.category || 'Product'}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <div className="flex justify-between items-center">
                                    <div className="bg-red-500 px-2 py-1 text-white rounded-md font-semibold text-xs">
                                        {deal?.discountType === "Percent"
                                            ? `${deal?.discountAmount}%`
                                            : `Flat ₹${deal?.discountAmount}`} off
                                    </div>
                                    <div className="text-red-600 font-semibold text-xs">
                                        Limited time deal
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !isLoading && (
                            <p className="text-center text-gray-500 col-span-full">
                                No deals available in this category at the moment.
                            </p>
                        )
                    )
                )}
            </div>

            <hr className="mt-4 mx-auto" />
        </div>
    );
};

export default KitchenDining