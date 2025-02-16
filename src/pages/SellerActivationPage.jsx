import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { server } from '../server'

const SellerActivationPage = () => {
    const { activation_token } = useParams()
    const [error, setError] = useState(false)
    const [countdown, setCountdown] = useState(5); // Initialize countdown to 5 seconds
    const navigate = useNavigate();


    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    await axios.post(`${server}/shop/activation`, {
                        activation_token,

                    }).then(res => {
                        console.log("activation", res)
                        const interval = setInterval(() => {
                            setCountdown(prev => {
                                if (prev === 1) {
                                    clearInterval(interval);
                                    navigate("/");
                                }
                                return prev - 1;
                            });
                        }, 1000);
                    }).catch(err => {
                        console.log(err);
                        setError(true);
                    })
                    // console.log(res.data.message)
                }
                catch (error) {
                    console.log(error?.response?.data?.message)
                    setError(true)
                }
            }
            activationEmail()
        }
    }, [activation_token, navigate])

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
            {
                error ? (
                    <div className="text-red-500 text-center">
                        <p className="text-xl font-semibold">Your token is expired!</p>
                    </div>
                ) : (
                    <div className="text-green-500 text-center">
                        <p className="text-xl font-semibold">Your account has been created successfully!</p>
                        <p className="mt-4 text-lg">You will be redirected in <span className="font-bold">{countdown}</span> seconds...</p>
                    </div>
                )
            }
        </div>
    )
}

export default SellerActivationPage