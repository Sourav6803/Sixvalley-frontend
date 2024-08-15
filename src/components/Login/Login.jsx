import React, { useEffect, useState } from 'react';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from "../../styles/styles"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backend_url, server } from '../../server';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`${server}/user/login-user`, {
            email, password
        }, { withCredentials: true }).then(res => {
            toast.success("Login success")

            navigate("/")
            window.location.reload(true)
        }).catch(err => {
            toast.error(err?.response?.data.message)
            //console.log(err)
        })

    }


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


    const checkLoginStatus = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/login/success`, { withCredentials: true });
            console.log("response", res)
            if (res.success === true) {
                toast.success('Login successful');
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };


    const googleLogin = () => {
        window.open("http://localhost:8000/auth/google/callback", "_self")
        checkLoginStatus()
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8' style={{ backgroundImage: "url('https://www.tisdigitech.com/wp-content/uploads/2022/08/Best-eCommerce-Website-Development-Company-in-India.jpg')" }} >

            <div className='mt-2 800px:mt-6  sm:mx-auto m-2 sm:w-full sm:max-w-md bg-[#efe8e8] rounded-lg'>
                <div className='bg-transparent py-4 px-4 shadow sm:rounded-lg sm:px-10'>

                    <h2 className='mt-6 text-center text-xl font-bold text-gray-600'>
                        Login
                    </h2>

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
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Password</label>

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
                            <button type='sumbit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>Submit</button>
                        </div>

                        <div className={`${styles.noramlFlex} w-full`}>
                            <h4>Not have any Account?</h4>
                            <Link to="/sign-up" className='text-blue-600 pl-2'>Sign Up</Link>
                        </div>

                        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white ">
                            Or Join with me
                        </h5>

                        <div className="flex justify-center items-center text-lg mt-4">
                            <div className="flex justify-center items-center my-3">
                                <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />

                                <AiFillGithub

                                    size={30}
                                    className="cursor-pointer ml-2 dark:text-white text-black"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Login