import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from "../../styles/styles"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';
import logo from "../Layout/Jamalpur BAZAR-logos__white.png"
import faqBackground from "./bg.jpg";
import backgroundImage from "./bg.jpg";
import Loader from '../../pages/Loader';


const ShopCreate = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [avatar, setAvatar] = useState()
    const [visible, setVisible] = useState("")
    const [sellerName, setSellerName] = useState("")
    const [shopName, setShopName] = useState("")
    const [loading, setLoading] = useState(false)


   

    const handleFileinputChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const newForm = new FormData()

        if (avatar) {
            newForm.append("avatar", avatar);
        }
        newForm.append("sellerName", sellerName)
        newForm.append("shopName", shopName)
        newForm.append("shopEmail", email)
        newForm.append("password", password)
        newForm.append("zipCode", zipCode)
        newForm.append("address", address)
        newForm.append("phoneNumber", phoneNumber)

        setLoading(true)

        try {
            const res = await axios.post(`${server}/shop/create-shop`, newForm, config)
            toast.success(res?.data?.message)
            setSellerName("")
            setShopName("")
            setEmail("")
            setPassword("")
            setAvatar("")
            setZipCode("")
            setAddress("")
            setPhoneNumber("")

        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
        finally {
            setLoading(false);  // Ensure loading is reset
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <img src={logo} alt="Jamalpur Bazaar" className="h-20 mx-auto bg-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">Welcome to Jamalpur Bazaar!</h2>
                    <p className="text-gray-600 mt-2">Join us today and start selling your products in our vibrant marketplace.</p>
                </div>

                <div className="relative mb-8">
                    <img src={backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-25" />
                    <div className="relative z-10 p-8 bg-white bg-opacity-5 rounded-lg inset-0">

                        <form onSubmit={handleSubmit}>
                            {
                                loading ? (
                                    <div className='w-full flex items-center justify-center'>
                                        <Loader />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6">

                                        <div>
                                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'> Seller Name</label>

                                            <div className='mt-1'>
                                                <input
                                                    type='text'
                                                    name='sellerName'
                                                    required
                                                    value={sellerName}
                                                    onChange={(e) => setSellerName(e.target.value)}
                                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'> Shop Name</label>

                                            <div className='mt-1'>
                                                <input
                                                    type='text'
                                                    name='shopName'
                                                    required
                                                    value={shopName}
                                                    onChange={(e) => setShopName(e.target.value)}
                                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Shop Email </label>

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
                                            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Seller Phone Number</label>

                                            <div className='mt-1'>
                                                <input
                                                    type='number'
                                                    name='phone'
                                                    required
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
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

                                        <div>
                                            <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Seller Address</label>

                                            <div className='mt-1'>
                                                <input
                                                    type='text'
                                                    name='address'
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor='zipcode' className='block text-sm font-medium text-gray-700'>Zip Code</label>

                                            <div className='mt-1'>
                                                <input
                                                    type='number'
                                                    name='zipcode'
                                                    required
                                                    value={zipCode}
                                                    onChange={(e) => setZipCode(e?.target?.value)}
                                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                />
                                            </div>
                                        </div>

                                        <div className=''>
                                            <label className='block text-sm font-medium' htmlFor='label'></label>
                                            <div className='mt-2 flex items-center'>
                                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                                    {
                                                        avatar ?
                                                            (
                                                                <img src={URL.createObjectURL(avatar)} alt='avtar' className='h-full w-full object-cover rounded-full' />
                                                            ) : (
                                                                <RxAvatar className="h-8 w-8" />
                                                            )

                                                    }

                                                </span>
                                                <label htmlFor='file-input' className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                                                    <span>Upload your shop image</span>
                                                    <input type='file' name='avatar' id='file-input' accept='.jpg, .jpeg, .png' onChange={handleFileinputChange} className='sr-only' />
                                                </label>
                                            </div>
                                        </div>

                                        <div className={`${styles.noramlFlex} justify-between`}>
                                            <div className={`${styles.noramlFlex}`}>
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
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Create Your Account
                                            </button>

                                            
                                        </div>

                                        <div className={`flex w-full`}>
                                                <h4>Already have an account?</h4>
                                                <Link to="/shop-login" className="text-blue-600 pl-2">Sign In</Link>
                                            </div>

                                    </div>
                                )
                            }

                        </form>
                    </div>
                </div>

                <div className="my-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Join Jamalpur Bazaar?</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Reach a wider audience and grow your business.</li>
                        <li>Easy-to-use tools to manage your shop and products.</li>
                        <li>Dedicated support to help you every step of the way.</li>
                        <li>Join a community of like-minded sellers.</li>
                    </ul>
                </div>

                <div className="my-8 bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">What Our Sellers Are Saying</h3>
                    <blockquote className="text-gray-600 italic">
                        "Jamalpur Bazaar has transformed our business. We've reached customers we never thought possible!"
                    </blockquote>
                    <p className="text-gray-600 mt-2 font-bold">- A Happy Seller</p>
                </div>

                <div className="relative mt-8">
                    <img src={faqBackground} alt="FAQ Background" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-25" />
                    <div className="relative z-10 p-8 bg-white bg-opacity-80 rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <details className="group">
                                <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">What do I need to get started?</summary>
                                <div className="mt-2 text-gray-600">
                                    You'll need a valid email address, a phone number, and basic details about your shop (such as name and address).
                                </div>
                            </details>

                            <details className="group">
                                <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">How long does it take to set up a shop?</summary>
                                <div className="mt-2 text-gray-600">
                                    Setting up a shop is quick and easy. You can get started in just a few minutes.
                                </div>
                            </details>

                            <details className="group">
                                <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">Is there any cost to join?</summary>
                                <div className="mt-2 text-gray-600">
                                    Joining is free! We charge a small fee on each sale you make.
                                </div>
                            </details>

                            <details className="group">
                                <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">What kind of support do you offer?</summary>
                                <div className="mt-2 text-gray-600">
                                    We offer 24/7 dedicated support to help you every step of the way.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopCreate