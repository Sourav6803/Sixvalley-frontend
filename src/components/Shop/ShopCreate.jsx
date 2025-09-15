// import React, { useState } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import styles from "../../styles/styles"
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { server } from '../../server';
// import { toast } from 'react-toastify';
// import { RxAvatar } from 'react-icons/rx';
// import logo from "../Layout/Jamalpur BAZAR-logos__white.png"
// import faqBackground from "./bg.jpg";
// import backgroundImage from "./bg.jpg";
// import Loader from '../../pages/Loader';


// const ShopCreate = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [phoneNumber, setPhoneNumber] = useState("")
//     const [address, setAddress] = useState("")
//     const [zipCode, setZipCode] = useState("")
//     const [avatar, setAvatar] = useState()
//     const [visible, setVisible] = useState("")
//     const [sellerName, setSellerName] = useState("")
//     const [shopName, setShopName] = useState("")
//     const [loading, setLoading] = useState(false)

//     const handleFileinputChange = (e) => {
//         const file = e.target.files[0]
//         setAvatar(file)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const config = { headers: { "Content-Type": "multipart/form-data" } }
//         const newForm = new FormData()

//         if (avatar) {
//             newForm.append("avatar", avatar);
//         }
//         newForm.append("sellerName", sellerName)
//         newForm.append("shopName", shopName)
//         newForm.append("shopEmail", email)
//         newForm.append("password", password)
//         newForm.append("zipCode", zipCode)
//         newForm.append("address", address)
//         newForm.append("phoneNumber", phoneNumber)

//         setLoading(true)

//         try {
//             const res = await axios.post(`${server}/shop/create-shop`, newForm, config)
//             toast.success(res?.data?.message)
//             setSellerName("")
//             setShopName("")
//             setEmail("")
//             setPassword("")
//             setAvatar("")
//             setZipCode("")
//             setAddress("")
//             setPhoneNumber("")

//         } catch (err) {
//             toast.error(err?.response?.data?.message)
//         }
//         finally {
//             setLoading(false);  // Ensure loading is reset
//         }
//     }


//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl mx-auto">
//                 <div className="text-center mb-8">
//                     <img src={logo} alt="Jamalpur Bazaar" className="h-20 mx-auto bg-blue-600" />
//                     <h2 className="text-3xl font-bold text-gray-800 mt-4">Welcome to Jamalpur Bazaar!</h2>
//                     <p className="text-gray-600 mt-2">Join us today and start selling your products in our vibrant marketplace.</p>
//                 </div>

//                 <div className="relative mb-8">
//                     <img src={backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-25" />
//                     <div className="relative z-10 p-8 bg-white bg-opacity-5 rounded-lg inset-0">

//                         <form onSubmit={handleSubmit}>
//                             {
//                                 loading ? (
//                                     <div className='w-full flex items-center justify-center'>
//                                         <Loader />
//                                     </div>
//                                 ) : (
//                                     <div className="grid grid-cols-1 gap-6">

//                                         <div>
//                                             <label htmlFor='name' className='block text-sm font-medium text-gray-700'> Seller Name</label>

//                                             <div className='mt-1'>
//                                                 <input
//                                                     type='text'
//                                                     name='sellerName'
//                                                     required
//                                                     value={sellerName}
//                                                     onChange={(e) => setSellerName(e.target.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label htmlFor='name' className='block text-sm font-medium text-gray-700'> Shop Name</label>

//                                             <div className='mt-1'>
//                                                 <input
//                                                     type='text'
//                                                     name='shopName'
//                                                     required
//                                                     value={shopName}
//                                                     onChange={(e) => setShopName(e.target.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Shop Email </label>

//                                             <div className='mt-1'>
//                                                 <input
//                                                     type='email'
//                                                     name='email'
//                                                     autoComplete='email'
//                                                     required
//                                                     value={email}
//                                                     onChange={(e) => setEmail(e.target.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Seller Phone Number</label>

//                                             <div className='mt-1'>
//                                                 <input
//                                                     type='number'
//                                                     name='phone'
//                                                     required
//                                                     value={phoneNumber}
//                                                     onChange={(e) => setPhoneNumber(e.target.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />
//                                             </div>
//                                         </div>


//                                         <div>
//                                             <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>

//                                             <div className='mt-1 relative'>
//                                                 <input
//                                                     type={visible ? "text" : "password"}
//                                                     name='password'
//                                                     autoComplete='current-password'
//                                                     required
//                                                     value={password}
//                                                     onChange={(e) => setPassword(e.target.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />

//                                                 {
//                                                     visible ? (
//                                                         <AiOutlineEye
//                                                             className='absolute right-2 top-2 cursor-pointer'
//                                                             size={25}
//                                                             onClick={() => setVisible(false)}
//                                                         />
//                                                     ) : (
//                                                         <AiOutlineEyeInvisible
//                                                             className='absolute right-2 top-2 cursor-pointer'
//                                                             size={25}
//                                                             onClick={() => setVisible(true)}
//                                                         />
//                                                     )
//                                                 }
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Seller Address</label>

//                                             <div className='mt-1'>
//                                                 <input
//                                                     type='text'
//                                                     name='address'
//                                                     required
//                                                     value={address}
//                                                     onChange={(e) => setAddress(e.target.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label htmlFor='zipcode' className='block text-sm font-medium text-gray-700'>Zip Code</label>

//                                             <div className='mt-1'>
//                                                 <input
//                                                     type='number'
//                                                     name='zipcode'
//                                                     required
//                                                     value={zipCode}
//                                                     onChange={(e) => setZipCode(e?.target?.value)}
//                                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className=''>
//                                             <label className='block text-sm font-medium' htmlFor='label'></label>
//                                             <div className='mt-2 flex items-center'>
//                                                 <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
//                                                     {
//                                                         avatar ?
//                                                             (
//                                                                 <img src={URL.createObjectURL(avatar)} alt='avtar' className='h-full w-full object-cover rounded-full' />
//                                                             ) : (
//                                                                 <RxAvatar className="h-8 w-8" />
//                                                             )

//                                                     }

//                                                 </span>
//                                                 <label htmlFor='file-input' className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
//                                                     <span>Upload your shop image</span>
//                                                     <input type='file' name='avatar' id='file-input' accept='.jpg, .jpeg, .png' onChange={handleFileinputChange} className='sr-only' />
//                                                 </label>
//                                             </div>
//                                         </div>

//                                         <div className={`${styles.noramlFlex} justify-between`}>
//                                             <div className={`${styles.noramlFlex}`}>
//                                                 <input
//                                                     type='checkbox'
//                                                     name='remember-me'
//                                                     id='remember-me'
//                                                     className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded'
//                                                 />
//                                                 <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>Remember me</label>
//                                             </div>
//                                             <div className='text-sm'>
//                                                 <a href='/forgot-password' className='font-medium text-blue-600 hover:text-blue-500'>Forgot Your Password?</a>
//                                             </div>
//                                         </div>


//                                         <div>
//                                             <button
//                                                 type="submit"
//                                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                             >
//                                                 Create Your Account
//                                             </button>

                                            
//                                         </div>

//                                         <div className={`flex w-full`}>
//                                                 <h4>Already have an account?</h4>
//                                                 <Link to="/shop-login" className="text-blue-600 pl-2">Sign In</Link>
//                                             </div>

//                                     </div>
//                                 )
//                             }

//                         </form>
//                     </div>
//                 </div>

//                 <div className="my-8">
//                     <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Join Jamalpur Bazaar?</h3>
//                     <ul className="list-disc list-inside text-gray-600 space-y-2">
//                         <li>Reach a wider audience and grow your business.</li>
//                         <li>Easy-to-use tools to manage your shop and products.</li>
//                         <li>Dedicated support to help you every step of the way.</li>
//                         <li>Join a community of like-minded sellers.</li>
//                     </ul>
//                 </div>

//                 <div className="my-8 bg-gray-100 p-6 rounded-lg">
//                     <h3 className="text-2xl font-bold text-gray-800 mb-4">What Our Sellers Are Saying</h3>
//                     <blockquote className="text-gray-600 italic">
//                         "Jamalpur Bazaar has transformed our business. We've reached customers we never thought possible!"
//                     </blockquote>
//                     <p className="text-gray-600 mt-2 font-bold">- A Happy Seller</p>
//                 </div>

//                 <div className="relative mt-8">
//                     <img src={faqBackground} alt="FAQ Background" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-25" />
//                     <div className="relative z-10 p-8 bg-white bg-opacity-80 rounded-lg">
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
//                         <div className="space-y-4">
//                             <details className="group">
//                                 <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">What do I need to get started?</summary>
//                                 <div className="mt-2 text-gray-600">
//                                     You'll need a valid email address, a phone number, and basic details about your shop (such as name and address).
//                                 </div>
//                             </details>

//                             <details className="group">
//                                 <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">How long does it take to set up a shop?</summary>
//                                 <div className="mt-2 text-gray-600">
//                                     Setting up a shop is quick and easy. You can get started in just a few minutes.
//                                 </div>
//                             </details>

//                             <details className="group">
//                                 <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">Is there any cost to join?</summary>
//                                 <div className="mt-2 text-gray-600">
//                                     Joining is free! We charge a small fee on each sale you make.
//                                 </div>
//                             </details>

//                             <details className="group">
//                                 <summary className="font-medium text-gray-700 cursor-pointer group-open:text-blue-600">What kind of support do you offer?</summary>
//                                 <div className="mt-2 text-gray-600">
//                                     We offer 24/7 dedicated support to help you every step of the way.
//                                 </div>
//                             </details>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ShopCreate 

import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';
import { FiCheckCircle, FiUsers, FiTrendingUp, FiClock, FiHelpCircle } from 'react-icons/fi';
import logo from "../Layout/Jamalpur BAZAR-logos__white.png";
import Loader from '../../pages/Loader';

const ShopCreate = () => {
    const [formData, setFormData] = useState({
        shopEmail: "",
        password: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        sellerName: "",
        shopName: ""
    });
    const [avatar, setAvatar] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return;
        }
        setAvatar(file);
    };

    const nextStep = () => {
        if (currentStep === 1 && (!formData.sellerName || !formData.shopName)) {
            toast.error("Please fill in all required fields");
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!acceptedTerms) {
            toast.error("Please accept the terms and conditions");
            return;
        }

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const newForm = new FormData();

        if (avatar) {
            newForm.append("avatar", avatar);
        }
        
        Object.keys(formData).forEach(key => {
            newForm.append(key, formData[key]);
        });

        setLoading(true);

        try {
            const res = await axios.post(`${server}/shop/create-shop`, newForm, config);
            toast.success(res?.data?.message);
            
            // Reset form
            setFormData({
                shopEmail: "",
                password: "",
                phoneNumber: "",
                address: "",
                zipCode: "",
                sellerName: "",
                shopName: ""
            });
            setAvatar(null);
            setCurrentStep(1);
            
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <FiUsers className="w-6 h-6" />,
            title: "Wide Audience Reach",
            description: "Connect with thousands of potential customers"
        },
        {
            icon: <FiTrendingUp className="w-6 h-6" />,
            title: "Business Growth",
            description: "Tools to help your business expand rapidly"
        },
        {
            icon: <FiClock className="w-6 h-6" />,
            title: "24/7 Support",
            description: "Round-the-clock assistance for your business"
        }
    ];

    const faqs = [
        {
            question: "What do I need to get started?",
            answer: "Basic business information, contact details, and valid identification documents."
        },
        {
            question: "How long does approval take?",
            answer: "Typically 24-48 hours after submitting all required documents."
        },
        {
            question: "Are there any hidden fees?",
            answer: "No hidden fees. Transparent commission structure with clear pricing."
        },
        {
            question: "What support is available?",
            answer: "Dedicated account manager, 24/7 chat support, and comprehensive documentation."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img 
                            src={logo} 
                            alt="Jamalpur Bazaar" 
                            className="h-16 w-auto"
                        />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Start Selling on Jamalpur Bazaar
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of successful sellers and grow your business with our powerful platform
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Progress Bar */}
                            <div className="bg-gray-100 px-6 py-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Step {currentStep} of 3
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {currentStep === 1 && "Basic Information"}
                                        {currentStep === 2 && "Contact Details"}
                                        {currentStep === 3 && "Account Setup"}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(currentStep / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">
                                {loading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <Loader />
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {/* Step 1: Basic Information */}
                                        {currentStep === 1 && (
                                            <div className="space-y-6">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                                    Tell us about your business
                                                </h2>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Seller Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="sellerName"
                                                            required
                                                            value={formData.sellerName}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                            placeholder="Your full name"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Shop Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="shopName"
                                                            required
                                                            value={formData.shopName}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                            placeholder="Your business name"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Shop Image
                                                    </label>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="relative">
                                                            {avatar ? (
                                                                <img 
                                                                    src={URL.createObjectURL(avatar)} 
                                                                    alt="Avatar" 
                                                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                                                    <RxAvatar className="w-8 h-8 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                                            <AiOutlineUpload className="w-5 h-5 mr-2 text-gray-600" />
                                                            <span className="text-sm font-medium">Upload Image</span>
                                                            <input 
                                                                type="file" 
                                                                accept=".jpg,.jpeg,.png" 
                                                                onChange={handleFileInputChange} 
                                                                className="hidden" 
                                                            />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Max 5MB. JPG, PNG formats only.
                                                    </p>
                                                </div>

                                                <div className="flex justify-end pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Contact Details */}
                                        {currentStep === 2 && (
                                            <div className="space-y-6">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                                    Contact Information
                                                </h2>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="shopEmail"
                                                        required
                                                        value={formData.shopEmail}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                        placeholder="business@email.com"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Phone Number *
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phoneNumber"
                                                            required
                                                            maxLength={'10'}
                                                            value={formData.phoneNumber}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                            placeholder="+91 1234567890"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            ZIP Code *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="zipCode"
                                                            required
                                                            value={formData.zipCode}
                                                            maxLength={'6'}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                            placeholder="123456"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Full Address *
                                                    </label>
                                                    <textarea
                                                        name="address"
                                                        required
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        rows={3}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                        placeholder="Complete business address"
                                                    />
                                                </div>

                                                <div className="flex justify-between pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={prevStep}
                                                        className="px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Account Setup */}
                                        {currentStep === 3 && (
                                            <div className="space-y-6">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                                    Create Your Account
                                                </h2>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Password *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={visible ? "text" : "password"}
                                                            name="password"
                                                            required
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                                                            placeholder="Create a strong password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setVisible(!visible)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        >
                                                            {visible ? (
                                                                <AiOutlineEyeInvisible className="w-5 h-5" />
                                                            ) : (
                                                                <AiOutlineEye className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Minimum 8 characters with letters and numbers
                                                    </p>
                                                </div>

                                                <div className="flex items-start space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        id="terms"
                                                        checked={acceptedTerms}
                                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                                        I agree to the{' '}
                                                        <a href="/terms" className="text-blue-600 hover:underline">
                                                            Terms of Service
                                                        </a>{' '}
                                                        and{' '}
                                                        <a href="/privacy" className="text-blue-600 hover:underline">
                                                            Privacy Policy
                                                        </a>
                                                    </label>
                                                </div>

                                                <div className="flex justify-between pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={prevStep}
                                                        className="px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={!acceptedTerms}
                                                        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        Create Account
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                )}

                                <div className="mt-6 text-center">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/shop-login" className="text-blue-600 font-medium hover:underline">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Features & Benefits */}
                    <div className="space-y-6">
                        {/* Features Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Jamalpur Bazaar?</h3>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                                            <p className="text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Our Community</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span>Active Sellers</span>
                                    <span className="font-bold">10,000+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Monthly Visitors</span>
                                    <span className="font-bold">2M+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Success Rate</span>
                                    <span className="font-bold">95%</span>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <FiHelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <details key={index} className="group">
                                        <summary className="flex items-center justify-between cursor-pointer text-gray-700 font-medium group-open:text-blue-600">
                                            {faq.question}
                                            <span className="text-lg">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-gray-600 pl-4">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCreate;