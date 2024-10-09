import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const ShopLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState("")
    const navigate = useNavigate()
    const [sellerId, setSellerId] = useState("")
    const socketId = socketIO(ENDPOINT, { transports: ["websocket"], query: { userId: localStorage.getItem('sellerId') || "" } });

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await axios.post(`${server}/shop/login-shop`, {
            shopEmail: email, password:password
        }, { withCredentials: true }).then(res => {
            toast.success("Login success")
            setLoading(false)
            const seller_id = res.data?.user?._id

            setSellerId(seller_id)
            localStorage.setItem('sellerId', seller_id);
            navigate("/dashboard")
            window.location.reload(true)
        }).catch(err => {
            toast.error(err?.response?.data.message)
            setLoading(false)
            //console.log(err)
        })

    }

    useEffect(() => {
        if (sellerId) {
            socketId.on(socketId.emit('addUser', sellerId))
        }

        return () => {
            socketId.disconnect();
        };
    }, [socketId, sellerId])


    return (

        <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8'>
            {
                loading ? (
                    <div className='flex h-screen items-center justify-center w-full bg-gray-900/10'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {/* Banner Section */}
                        <div className="relative">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/001/879/540/non_2x/experience-of-buying-goods-online-with-fast-delivery-buy-now-and-shop-right-up-e-commerce-technology-illustration-concept-for-landing-page-web-ui-banner-flyer-poster-template-background-free-vector.jpg"  // Replace with an authentic banner image URL
                                alt="Seller Banner"
                                className="w-full h-60 object-cover sm:h-80 lg:h-96"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                                <h1 className="text-white text-4xl font-bold sm:text-5xl">Welcome Back, Seller!</h1>
                                <p className="text-white text-lg mt-2 sm:text-xl p-3 mx-auto">
                                    Manage your shop, track sales, and grow your business with us.
                                </p>
                            </div>
                        </div>

                        {/* Login Form Section */}
                        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                                Login To Your Shop
                            </h2>
                        </div>

                        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                                <form className='space-y-6' onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email Address</label>
                                        <div className='mt-1'>
                                            <input
                                                type='email'
                                                name='email'
                                                autoComplete='email'
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                                        <div className='mt-1 relative'>
                                            <input
                                                type={visible ? "text" : "password"}
                                                name='password'
                                                autoComplete='current-password'
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                            />
                                            {
                                                visible ? (
                                                    <AiOutlineEye
                                                        className='absolute right-2 top-2 cursor-pointer'
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        className='absolute right-2 top-2 cursor-pointer'
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                name='remember-me'
                                                id='remember-me'
                                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded'
                                            />
                                            <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>Remember me</label>
                                        </div>
                                        <div className='text-sm'>
                                            <a href='/forgot-password' className='font-medium text-blue-600 hover:text-blue-500'>Forgot Your Password?</a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type='submit'
                                            className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
                                            Submit
                                        </button>
                                    </div>

                                    <div className='flex items-center justify-center space-x-2'>
                                        <h4>Not have an Account?</h4>
                                        <Link to="/shop-create" className='text-blue-600 hover:underline'>Sign Up</Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Additional Content for Sellers */}
                        <div className="mt-12 text-center text-gray-700 sm:mx-auto sm:w-full sm:max-w-lg">
                            <h3 className="text-xl font-semibold">Why Sell with Us?</h3>
                            <p className="mt-4">
                                Join thousands of successful sellers who trust our platform to reach millions of customers
                                every day. With tools designed to make selling easy, your business is in good hands.
                            </p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <h4 className="font-medium">Track Your Sales</h4>
                                    <p className="text-sm mt-2 text-gray-600">Get real-time analytics and insights on your sales performance.</p>
                                </div>
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <h4 className="font-medium">Dedicated Support</h4>
                                    <p className="text-sm mt-2 text-gray-600">24/7 customer support to assist you at every step.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ShopLogin