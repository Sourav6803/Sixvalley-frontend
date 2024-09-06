import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { server } from '../../server';
import { Link, useNavigate } from 'react-router-dom';


const KitchenDining = () => {
    const { user } = useSelector((state) => state?.user)

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

                setRecommendations(data);
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



   // const filterRecomendation = recommendations && recommendations.filter((product) => product.product?.category === "Home Appliances").slice(0, 4)
   const filterRecomendation = recommendations
   ?.filter((product) =>product.product?.category === "Home Appliances")
   .slice(-5)
   .reduce((acc, current) => {
       const x = acc.find(item => item?.product?._id === current?.product?._id);
       if (!x) {
           acc.push(current);
       }
       return acc;
   }, []);

    return (
        <>
            {
                filterRecomendation && (
                    <div className="bg-white p-1">

                        <div className="text-center mb-6 p-2">
                            <h2 className="text-lg font-bold">Continue Shopping | Deals in Living  and Dining Room</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            {filterRecomendation?.map((deal) => (
                                <div key={deal._id} className="border  rounded-lg shadow-lg p-1" onClick={(e) => navigate(`product/${deal?.product?._id}`)}>
                                    <img src={deal?.product?.images[0]?.url} alt="deal" className="w-full h-48 object-cover rounded-md mb-4" />
                                    <div className="flex justify-between  items-center">
                                        <div className=" bg-red-500  px-2 py-1 text-white rounded-md font-semibold text-xs">{deal?.product?.dicountType === "Percent" ? deal?.product?.discountAmount + "%" : "Flat ₹" + deal?.product?.discountAmount} off</div>
                                        <div className=" text-red-600  font-semibold text-xs">
                                            Limited time deal
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Link className="text-teal-600 hover:underline">
                                See all deals
                            </Link>
                        </div>

                        <hr className='mt-4 mx-auto' />

                    </div>
                )
            }
        </>
    )
}

export default KitchenDining