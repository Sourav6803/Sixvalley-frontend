import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from '../../server';
import { toast } from 'react-toastify';

import { FcGoogle } from "react-icons/fc";
import 'tailwindcss/tailwind.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    // const imagehandler = async (e) => {
    //     const fileReader = new FileReader();

    //     fileReader.onload = () => {
    //         if (fileReader.readyState === 2) {
    //             const avatarO = fileReader.result;
    //             setAvatar(avatarO);
    //         }
    //     };
    //     fileReader.readAsDataURL(e.target.files[0]);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const newForm = new FormData();

        newForm.append("name", name);
        newForm.append("email", email);
        newForm.append("password", password);
        if (avatar) {
            newForm.append("avatar", avatar);
        }

        console.log(newForm)



        axios.post(`${server}/user/create-user`, newForm, config)
            .then((res) => {
                toast.success(res?.data?.message);
                setName("");
                setEmail("");
                setPassword("");
                setAvatar(null);
                setIsSubmitting(false);
                navigate("/login");
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.message || "Something went wrong!";
                toast.error(errorMessage);
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center py-6 sm:px-6 lg:px-8" style={{ backgroundImage: "url('https://www.tisdigitech.com/wp-content/uploads/2022/08/Best-eCommerce-Website-Development-Company-in-India.jpg')" }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
                <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
                    Sign Up
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative">
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e?.target?.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            />
                            {
                                visible ? (
                                    <AiOutlineEye
                                        className="absolute right-3 top-3 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-3 top-3 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="block text-lg font-medium text-gray-700 mr-4">Avatar</label>
                        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                            {
                                avatar ? (
                                    <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" />
                                ) : (
                                    <RxAvatar className="h-10 w-10 text-gray-400" />
                                )
                            }
                        </span>
                        <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition duration-300">
                            <span>Upload a file</span>
                            <input type="file" name="avatar" id="file-input" accept=".jpg, .jpeg, .png" onChange={handleFileInputChange} className="sr-only" />
                        </label>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="flex justify-center items-center text-lg mt-4">
                        <h4>Already have an account?</h4>
                        <Link to="/login" className="text-blue-600 pl-2 hover:underline transition duration-300">Login</Link>
                    </div>

                   
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white ">
                        Or Join with me
                    </h5>

                    <div className="flex justify-center items-center text-lg mt-4">
                        <div className="flex justify-center items-center my-3">
                            <FcGoogle size={30} className="cursor-pointer mr-2" />
                            <AiFillGithub

                                size={30}
                                className="cursor-pointer ml-2 dark:text-white text-black"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
