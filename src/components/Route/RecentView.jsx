

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { server } from '../../server';
import {  useNavigate } from 'react-router-dom';

const RecentView = () => {
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
        ?.filter((product) => product.type === "search") // Filter search-type recommendations
        .reduce((acc, current) => {
            const x = acc.find(item => item?.product?._id === current?.product?._id);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);



    return (
        <div className="py-1">
            <div className="mb-2 p-2">
                <h2 className="text-lg text-slate-600 font-bold">Recent Searched Products</h2>
            </div>
 
            {/* Horizontal scrollable section */}
            <div className="flex gap-1 overflow-x-auto whitespace-nowrap p-1">
                {
                    filterRecomendation.length > 0 ? filterRecomendation.map((product) => (
                        <div key={product?._id} className="rounded-lg flex flex-col items-center min-w-[150px] p-1" onClick={(e) => navigate(`/product/${product?.product?._id}`)}>
                            {/* Fixed image size */}
                            <img
                                src={product?.product?.images[0].url}
                                alt={product?.product?.category}
                                className="w-[150px] h-[150px] object-cover mb-2"
                            />
                            <h3 className="text-sm font-semibold">{product?.product?.category}</h3>
                            <p className="text-gray-500">{product?.product?.subCategory}</p>
                            <p className="text-gray-500">Starting ₹99</p>
                        </div>
                    )) :

                        allProducts?.slice(10, 14).map((product) => (
                            <div key={product?._id} className="rounded-lg flex flex-col items-center min-w-[150px] p-1" onClick={(e) => navigate(`/product/${product?.product?._id}`)}>
                                {/* Fixed image size */}
                                <img
                                    src={product?.product?.images[0].url}
                                    alt={product?.product?.category}
                                    className="w-[150px] h-[150px] object-cover mb-2"
                                />
                                <h3 className="text-sm font-semibold">{product?.product?.category}</h3>
                                <p className="text-gray-500">{product?.product?.subCategory}</p>
                                <p className="text-gray-500">Starting ₹99</p>
                            </div>
                        ))

                }
            </div>

            <div className="flex gap-1 overflow-x-auto whitespace-nowrap p-1">
                {
                    filterRecomendation.length === 0 && filterRecomendation.map((product) => (
                        <div key={product?._id} className="rounded-lg flex flex-col items-center min-w-[150px] p-1" onClick={(e) => navigate(`/product/${product?.product?._id}`)}>
                            {/* Fixed image size */}
                            <img
                                src={product?.product?.images[0].url}
                                alt={product?.product?.category}
                                className="w-[150px] h-[150px] object-cover mb-2"
                            />
                            <h3 className="text-sm font-semibold">{product?.product?.category}</h3>
                            <p className="text-gray-500">{product?.product?.subCategory}</p>
                            <p className="text-gray-500">Starting ₹99</p>
                        </div>
                    ))
                }
            </div>

        </div>


    )
}

export default RecentView