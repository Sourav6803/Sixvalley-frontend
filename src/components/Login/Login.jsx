import React, { useEffect, useState } from 'react';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from "../../styles/styles"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Loader from '../../pages/Loader';
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState("")
    const socketId = socketIO(ENDPOINT, { transports: ["websocket"], query: { userId: localStorage.getItem('userId') || "" } });


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post(`${server}/user/login-user`, {
            email, password
        }, { withCredentials: true }).then(res => {
            toast.success("Login success")
            setLoading(false)
            const userId = res?.data?.user?._id; // Extract user ID from response
            console.log("userId", userId)
            setUserId(userId)
            // Store userId in localStorage
            localStorage.setItem('userId', userId);

            navigate("/")
            window.location.reload(true)
        }).catch(err => {
            toast.error(err?.response?.data.message)
            setLoading(false)
            //console.log(err)
        })

    }

    useEffect(() => {
        if (userId) {
            socketId.on(socketId.emit('addUser', userId))
        }
        return () => {
            socketId.disconnect();
        };

    }, [socketId, userId])


    const onLoginSuccess = async (res) => {
        const decode = jwtDecode(res.credential);
        try {
            await axios.post(`${server}/user/social-auth`, {
                name: decode.name,
                email: decode.email,
                avatar: { public_id: "", url: decode.picture }
            }, { withCredentials: true });
            toast.success("Login success");
            navigate("/");
        } catch (error) {
            toast.error(error?.response?.data.message || "Login failed");
            console.error('Login error:', error);
        }
    };

    const onLoginError = (res) => {
        console.log(res);
    }


    return (
        // <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8' style={{ backgroundImage: "url('https://www.tisdigitech.com/wp-content/uploads/2022/08/Best-eCommerce-Website-Development-Company-in-India.jpg')" }} >

        //     {
        //         loading ? (
        //             <div className='flex items-start justify-center h-screen w-full '>
        //                 <Loader />
        //             </div>
        //         ) : (
        //             <div className='mt-2 800px:mt-6  sm:mx-auto m-2 sm:w-full sm:max-w-md bg-[#efe8e8] rounded-lg'>
        //                 <div className='bg-transparent py-4 px-4 shadow sm:rounded-lg sm:px-10'>

        //                     <h2 className='mt-6 text-center text-xl font-bold text-gray-600'>
        //                         Login
        //                     </h2>

        //                     <form className='space-y-6' onSubmit={handleSubmit}>
        //                         <div>
        //                             <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email Address</label>

        //                             <div className='mt-1'>
        //                                 <input
        //                                     type='email'
        //                                     name='email'
        //                                     autoComplete='email'
        //                                     required
        //                                     value={email}
        //                                     onChange={(e) => setEmail(e.target.value)}
        //                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        //                                 />
        //                             </div>
        //                         </div>

        //                         <div>
        //                             <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Password</label>

        //                             <div className='mt-1 relative'>
        //                                 <input
        //                                     type={visible ? "text" : "password"}
        //                                     name='password'
        //                                     autoComplete='current-password'
        //                                     required
        //                                     value={password}
        //                                     onChange={(e) => setPassword(e.target.value)}
        //                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        //                                 />

        //                                 {
        //                                     visible ? (
        //                                         <AiOutlineEye
        //                                             className='absolute right-2 top-2 cursor-pointer'
        //                                             size={25}
        //                                             onClick={() => setVisible(false)}
        //                                         />
        //                                     ) : (
        //                                         <AiOutlineEyeInvisible
        //                                             className='absolute right-2 top-2 cursor-pointer'
        //                                             size={25}
        //                                             onClick={() => setVisible(true)}
        //                                         />
        //                                     )
        //                                 }
        //                             </div>
        //                         </div>

        //                         <div className={`${styles.noramlFlex} justify-between`}>
        //                             <div className={`${styles.noramlFlex}`}>
        //                                 <input
        //                                     type='checkbox'
        //                                     name='remember-me'
        //                                     id='remember-me'
        //                                     className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded'
        //                                 />
        //                                 <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>Remember me</label>
        //                             </div>
        //                             <div className='text-sm'>
        //                                 <a href='/forgot-password' className='font-medium text-blue-600 hover:text-blue-500'>Forgot Your Password?</a>
        //                             </div>
        //                         </div>

        //                         <div>
        //                             <button type='sumbit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>Submit</button>
        //                         </div>

        //                         <div className={`${styles.noramlFlex} w-full`}>
        //                             <h4>Not have any Account?</h4>
        //                             <Link to="/sign-up" className='text-blue-600 pl-2'>Sign Up</Link>
        //                         </div>

        //                         <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white ">
        //                             Or Join with me
        //                         </h5>

        //                         <div className="flex justify-center items-center text-lg mt-4">
        //                             <div className="flex justify-center items-center my-3">
        //                                 <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />

        //                                 <AiFillGithub

        //                                     size={30}
        //                                     className="cursor-pointer ml-2 dark:text-white text-black"
        //                                 />
        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         )
        //     }


        // </div>



        // <div
        //     className='min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8'
        //     style={{
        //         backgroundImage:
        //             "url('https://www.tisdigitech.com/wp-content/uploads/2022/08/Best-eCommerce-Website-Development-Company-in-India.jpg')",
        //         backgroundSize: 'cover',
        //         backgroundPosition: 'center',
        //     }}
        // >
        //     {loading ? (
        //         <div className='flex items-start justify-center h-screen w-full'>
        //             <Loader />
        //         </div>
        //     ) : (
        //         <div className='mt-2 sm:mt-6 mx-auto sm:w-full sm:max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg'>
        //             <div className='py-6 px-8 shadow-lg sm:rounded-lg sm:px-10'>
        //                 <h2 className='mt-4 text-center text-3xl font-extrabold text-gray-800'>
        //                     Welcome Back to Jamalpur Bazaar
        //                 </h2>
        //                 <p className='mt-2 text-center text-sm text-gray-600'>
        //                     Please login to continue to your account and explore amazing deals!
        //                 </p>
        //                 <form className='space-y-6' onSubmit={handleSubmit}>
        //                     <div>
        //                         <label
        //                             htmlFor='email'
        //                             className='block text-sm font-medium text-gray-700'
        //                         >
        //                             Email Address
        //                         </label>
        //                         <div className='mt-1'>
        //                             <input
        //                                 type='email'
        //                                 name='email'
        //                                 autoComplete='email'
        //                                 required
        //                                 value={email}
        //                                 onChange={(e) => setEmail(e.target.value)}
        //                                 className='appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        //                             />
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <label
        //                             htmlFor='password'
        //                             className='block text-sm font-medium text-gray-700'
        //                         >
        //                             Password
        //                         </label>
        //                         <div className='mt-1 relative'>
        //                             <input
        //                                 type={visible ? 'text' : 'password'}
        //                                 name='password'
        //                                 autoComplete='current-password'
        //                                 required
        //                                 value={password}
        //                                 onChange={(e) => setPassword(e.target.value)}
        //                                 className='appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        //                             />
        //                             {visible ? (
        //                                 <AiOutlineEye
        //                                     className='absolute right-3 top-3 cursor-pointer text-gray-500'
        //                                     size={25}
        //                                     onClick={() => setVisible(false)}
        //                                 />
        //                             ) : (
        //                                 <AiOutlineEyeInvisible
        //                                     className='absolute right-3 top-3 cursor-pointer text-gray-500'
        //                                     size={25}
        //                                     onClick={() => setVisible(true)}
        //                                 />
        //                             )}
        //                         </div>
        //                     </div>
        //                     <div className='flex justify-between items-center'>
        //                         <div className='flex items-center'>
        //                             <input
        //                                 type='checkbox'
        //                                 name='remember-me'
        //                                 id='remember-me'
        //                                 className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded'
        //                             />
        //                             <label
        //                                 htmlFor='remember-me'
        //                                 className='ml-2 block text-sm text-gray-900'
        //                             >
        //                                 Remember me
        //                             </label>
        //                         </div>
        //                         <div className='text-sm'>
        //                             <a
        //                                 href='/forgot-password'
        //                                 className='font-medium text-blue-600 hover:text-blue-500'
        //                             >
        //                                 Forgot Your Password?
        //                             </a>
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <button
        //                             type='submit'
        //                             className='group relative w-full h-[45px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        //                         >
        //                             Sign In
        //                         </button>
        //                     </div>
        //                     <div className='flex justify-center items-center'>
        //                         <h4 className='text-sm text-gray-700'>Don’t have an account?</h4>
        //                         <Link
        //                             to='/sign-up'
        //                             className='text-blue-600 hover:text-blue-700 pl-2 font-medium text-sm'
        //                         >
        //                             Sign Up
        //                         </Link>
        //                     </div>
        //                     <h5 className='text-center pt-4 text-sm text-gray-700'>
        //                         Or Join with
        //                     </h5>
        //                     <div className='flex justify-center items-center text-lg mt-4 space-x-4'>
        //                         <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
        //                         <AiFillGithub
        //                             size={30}
        //                             className='cursor-pointer text-black hover:text-gray-800'
        //                         />
        //                     </div>
        //                 </form>
        //             </div>
        //             <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
        //                 <h3 className='text-lg font-bold text-gray-800'>
        //                     Exclusive Offers for New Users!
        //                 </h3>
        //                 <p className='mt-2 text-gray-600'>
        //                     Sign up today and get an instant 20% discount on your first purchase.
        //                     Plus, enjoy free shipping on orders above $50.
        //                 </p>
        //             </div>
        //         </div>
        //     )}
        // </div>



        <div
            className='min-h-screen flex items-center justify-center py-6 sm:px-6 lg:px-8'
            style={{
                backgroundImage:
                    "url('https://www.tisdigitech.com/wp-content/uploads/2022/08/Best-eCommerce-Website-Development-Company-in-India.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {loading ? (
                <div className='flex items-center justify-center h-screen w-full'>
                    <Loader />
                </div>
            ) : (
                <div className='bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden sm:max-w-md sm:w-full'>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-b from-purple-600 to-pink-500 opacity-80'></div>
                        <div className='relative p-6'>
                            <h2 className='text-center text-4xl font-extrabold text-white'>
                                Welcome to Jamalpur Bazaar
                            </h2>
                            <p className='mt-2 text-center text-sm text-white'>
                                Sign in to continue to your account and explore amazing deals!
                            </p>
                        </div>
                    </div>
                    <div className='px-8 py-6'>
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Username
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='text'
                                        name='username'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Password
                                </label>
                                <div className='mt-1 relative'>
                                    <input
                                        type={visible ? 'text' : 'password'}
                                        name='password'
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    />
                                    {visible ? (
                                        <AiOutlineEye
                                            className='absolute right-3 top-3 cursor-pointer text-gray-500'
                                            size={25}
                                            onClick={() => setVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className='absolute right-3 top-3 cursor-pointer text-gray-500'
                                            size={25}
                                            onClick={() => setVisible(true)}
                                        />
                                    )}
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
                                    <label
                                        htmlFor='remember-me'
                                        className='ml-2 block text-sm text-gray-900'
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className='text-sm'>
                                    <a
                                        href='/forgot-password'
                                        className='font-medium text-blue-600 hover:text-blue-500'
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className='group relative w-full h-[45px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                                >
                                    Login
                                </button>
                            </div>
                            <div className='flex justify-center items-center'>
                                <h4 className='text-sm text-gray-700'>Don't have an account?</h4>
                                <Link
                                    to='/sign-up'
                                    className='text-pink-600 hover:text-pink-700 pl-2 font-medium text-sm'
                                >
                                    Create Account
                                </Link>
                            </div>
                            <h5 className='text-center pt-4 text-sm text-gray-700'>
                                Or Join with
                            </h5>
                            <div className='flex justify-center items-center text-lg mt-4 space-x-4'>
                                <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
                                
                            </div>
                        </form>
                    </div>
                    <div className='bg-gray-50 px-6 py-4'>
                        <h3 className='text-lg font-semibold text-gray-800'>
                            Exclusive Offers for New Users
                        </h3>
                        <p className='mt-2 text-gray-600'>
                            Sign up today and get an instant 20% discount on your first purchase. Enjoy free shipping on orders above $50!
                        </p>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Login