
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../server';

const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [countdown, setCountdown] = useState(5); // Initialize countdown to 5 seconds
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    await axios.post(`${server}/user/activation`, { activation_token })
                        .then(res => {
                            console.log("activation", res);

                            const interval = setInterval(() => {
                                setCountdown(prev => {
                                    if (prev === 1) {
                                        clearInterval(interval);
                                        navigate("/login");
                                    }
                                    return prev - 1;
                                });
                            }, 1000);
                        }).catch(err => {
                            console.log(err);
                            setError(true);
                        });
                } catch (error) {
                    console.log(error?.response?.data?.message);
                    setError(true);
                }
            };
            activationEmail();
        }
    }, [activation_token, navigate]);

    return (
        <div 
            className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center"
            style={{ 
                backgroundImage: 'url(https://example.com/your-ecommerce-background.jpg)', // Replace with a valid URL to your background image
                backgroundColor: '#f5f5f5'  // Fallback color in case the image doesn't load
            }}
        >
            <div className="max-w-lg p-6 bg-white rounded-lg shadow-md bg-opacity-90">
                {
                    error ? (
                        <div className="text-red-500 text-center">
                            <p className="text-2xl font-semibold">Token Expired!</p>
                            <p className="mt-2">Unfortunately, your activation token has expired. Please request a new activation email.</p>
                        </div>
                    ) : (
                        <div className="text-green-500 text-center">
                            <p className="text-2xl font-semibold">Account Activated!</p>
                            <p className="mt-4 text-lg">Thank you for joining <span className="font-bold text-blue-500">Jamalpur Bazaar</span>.</p>
                            <p className="mt-2 text-gray-600">Your account has been successfully created and activated. We are thrilled to have you on board!</p>
                            <p className="mt-4 text-lg">You will be redirected to the homepage in <span className="font-bold">{countdown}</span> seconds...</p>
                        </div>
                    )
                }
            </div>
            <div className="mt-8 text-center bg-white bg-opacity-90 p-4 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800">Welcome to Jamalpur Bazaar</h2>
                <p className="mt-4 text-gray-600 max-w-lg">
                    Discover a wide range of products and exclusive deals at Jamalpur Bazaar. Whether you're shopping for daily essentials or something special, we've got you covered. Start exploring and enjoy a seamless shopping experience!
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Explore Jamalpur Bazaar
                </button>
            </div>
        </div>
    );
};

export default ActivationPage;
