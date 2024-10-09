
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { server } from '../../server';
import { useNavigate } from 'react-router-dom';
import Loader from '../../pages/Loader';

const RecentClicked = () => {
    const { user } = useSelector((state) => state?.user)
    const { allProducts } = useSelector((state) => state?.products)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true); // Set loading state to true when starting the fetch
            setError(null); // Reset error state before fetching

            try {
                const response = await axios.get(`${server}/activity/recommendations/${user?._id}`);
                const { data } = response; // Destructure response to get data
                const sortedRecommendations = data.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
                setRecommendations(sortedRecommendations);
            } catch (err) {
                console.error("Failed to fetch recommendations:", err.message);
                setError('Failed to load recommendations.'); // Set error state if there's an issue
            } finally {
                setIsLoading(false); // Set loading state to false once fetching is done
            }
        };

        if (user?._id) { // Ensure user ID is present before fetching
            fetchRecommendations();
        }
    }, [user?._id]);

    const navigate = useNavigate()

    // const filterRecomendation = recommendations && recommendations.filter((product) => product.type === "search")
    const filterRecomendation = recommendations
        ?.filter((product) => product.type === "click") // Filter search-type recommendations
        .reduce((acc, current) => {
            const x = acc.find(item => item?.product?._id === current?.product?._id);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);



    return (
        <div className="py-4">
            <div className="mb-4 px-4">
                <h2 className="text-xl text-gray-700 font-bold">Recent Clicked Products</h2>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-6">
                    <Loader />
                    <p className="ml-2 text-sm text-gray-500">Loading recommendations...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex justify-center items-center py-6">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Horizontal scrollable section */}
            <div className="flex gap-4 overflow-x-auto whitespace-nowrap px-4 py-2">
                {filterRecomendation.length > 0 ? (
                    filterRecomendation.map((product) => (
                        <div
                            key={product?._id}
                            className="rounded-lg flex flex-col items-center min-w-[150px] p-2 shadow-md bg-white hover:shadow-lg transition-shadow"
                            onClick={() => navigate(`/product/${product?.product?._id}`)}
                        >
                            {/* Fixed image size */}
                            <img
                                src={product?.product?.images[0].url}
                                alt={product?.product?.category}
                                className="w-[150px] h-[150px] object-cover mb-2 rounded-lg"
                            />
                            <h3 className="text-sm font-semibold text-center text-gray-700 truncate">
                                {product?.product?.category}
                            </h3>
                            <p className="text-sm text-gray-500 truncate text-center p-1">
                                {product?.product?.subCategory?.length >15 ? product?.product?.subCategory.slice(0,15)+"..." : product?.product?.subCategory}
                            </p>
                            <p className="text-sm text-gray-600 font-medium">Starting ₹99</p>
                        </div>
                    ))
                ) : (
                    allProducts?.slice(10, 14).map((product) => (
                        <div
                            key={product?._id}
                            className="rounded-lg flex flex-col items-center min-w-[150px] p-2 shadow-md bg-white hover:shadow-lg transition-shadow"
                            onClick={() => navigate(`/product/${product?.product?._id}`)}
                        >
                            {/* Fixed image size */}
                            <img
                                src={product?.product?.images[0].url}
                                alt={product?.product?.category}
                                className="w-[150px] h-[150px] object-cover mb-2 rounded-lg"
                            />
                            <h3 className="text-sm font-semibold text-center text-gray-700 truncate">
                                {product?.product?.category}
                            </h3>
                            <p className="text-sm text-gray-500 truncate  text-center">
                                {product?.product?.subCategory}
                            </p>
                            <p className="text-sm text-gray-600 font-medium">Starting ₹99</p>
                        </div>
                    ))
                )}
            </div>
        </div>


    )
}

export default RecentClicked;














