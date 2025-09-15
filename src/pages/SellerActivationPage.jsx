// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { server } from '../server'

// const SellerActivationPage = () => {
//     const { activation_token } = useParams()
//     const [error, setError] = useState(false)
//     const [countdown, setCountdown] = useState(5); // Initialize countdown to 5 seconds
//     const navigate = useNavigate();


//     useEffect(() => {
//         if (activation_token) {
//             const activationEmail = async () => {
//                 try {
//                     await axios.post(`${server}/shop/activation`, {
//                         activation_token,

//                     }).then(res => {
//                         console.log("activation", res)
//                         const interval = setInterval(() => {
//                             setCountdown(prev => {
//                                 if (prev === 1) {
//                                     clearInterval(interval);
//                                     navigate("/");
//                                 }
//                                 return prev - 1;
//                             });
//                         }, 1000);
//                     }).catch(err => {
//                         console.log(err);
//                         setError(true);
//                     })
//                     // console.log(res.data.message)
//                 }
//                 catch (error) {
//                     console.log(error?.response?.data?.message)
//                     setError(true)
//                 }
//             }
//             activationEmail()
//         }
//     }, [activation_token, navigate])

//     return (
//         <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
//             {
//                 error ? (
//                     <div className="text-red-500 text-center">
//                         <p className="text-xl font-semibold">Your token is expired!</p>
//                     </div>
//                 ) : (
//                     <div className="text-green-500 text-center">
//                         <p className="text-xl font-semibold">Your account has been created successfully!</p>
//                         <p className="mt-4 text-lg">You will be redirected in <span className="font-bold">{countdown}</span> seconds...</p>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default SellerActivationPage


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../server';
import { FiCheckCircle, FiXCircle, FiClock, FiMail } from 'react-icons/fi';

const SellerActivationPage = () => {
    const { activation_token } = useParams();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [countdown, setCountdown] = useState(5);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            const activateSeller = async () => {
                try {
                    setStatus('loading');
                    const response = await axios.post(`${server}/shop/activation`, {
                        activation_token,
                    });
                    
                    setStatus('success');
                    setMessage(response.data.message || 'Your account has been activated successfully!');
                    
                    // Start countdown for successful activation
                    const interval = setInterval(() => {
                        setCountdown(prev => {
                            if (prev <= 1) {
                                clearInterval(interval);
                                navigate('/shop-login', { 
                                    state: { 
                                        message: 'Account activated successfully! Please log in.',
                                        type: 'success'
                                    }
                                });
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);

                } catch (error) {
                    console.error('Activation error:', error);
                    setStatus('error');
                    
                    const errorMessage = error.response?.data?.message || 
                                       'Your activation token is invalid or has expired.';
                    setMessage(errorMessage);
                    
                    // Start countdown for error case
                    const interval = setInterval(() => {
                        setCountdown(prev => {
                            if (prev <= 1) {
                                clearInterval(interval);
                                navigate('/shop-signup', {
                                    state: {
                                        message: 'Please sign up again to get a new activation link.',
                                        type: 'error'
                                    }
                                });
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);
                }
            };

            activateSeller();
        }
    }, [activation_token, navigate]);

    const handleManualRedirect = () => {
        if (status === 'success') {
            navigate('/shop-login', {
                state: {
                    message: 'Account activated successfully! Please log in.',
                    type: 'success'
                }
            });
        } else {
            navigate('/shop-signup', {
                state: {
                    message: 'Please sign up again to get a new activation link.',
                    type: 'error'
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10">
                <div className="text-center">
                    {/* Header Icon */}
                    <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
                        status === 'loading' ? 'bg-blue-100' : 
                        status === 'success' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                        {status === 'loading' ? (
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        ) : status === 'success' ? (
                            <FiCheckCircle className="h-10 w-10 text-green-600" />
                        ) : (
                            <FiXCircle className="h-10 w-10 text-red-600" />
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        {status === 'loading' ? 'Activating Account' : 
                         status === 'success' ? 'Activation Successful!' : 'Activation Failed'}
                    </h2>

                    {/* Message */}
                    <p className="mt-4 text-lg text-gray-600">
                        {status === 'loading' ? (
                            'Please wait while we activate your account...'
                        ) : (
                            message
                        )}
                    </p>

                    {/* Countdown Timer */}
                    {(status === 'success' || status === 'error') && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-center space-x-2">
                                <FiClock className="h-5 w-5 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                                </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                                    style={{ width: `${(countdown / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Additional Information */}
                    {status === 'success' && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                            <h3 className="text-sm font-medium text-green-800 flex items-center">
                                <FiMail className="mr-2 h-4 w-4" />
                                What's Next?
                            </h3>
                            <p className="mt-2 text-sm text-green-700">
                                Check your email for a welcome message with tips to get started with your shop.
                            </p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                            <h3 className="text-sm font-medium text-red-800">
                                Need Help?
                            </h3>
                            <p className="mt-2 text-sm text-red-700">
                                If you continue to experience issues, please contact our support team at 
                                <a href="mailto:support@jamalpurbazaar.com" className="ml-1 text-red-900 underline">
                                    support@jamalpurbazaar.com
                                </a>
                            </p>
                        </div>
                    )}

                    {/* Manual Redirect Button */}
                    {(status === 'success' || status === 'error') && (
                        <div className="mt-6">
                            <button
                                onClick={handleManualRedirect}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    status === 'success' 
                                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                                        : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
                            >
                                {status === 'success' ? 'Go to Login' : 'Try Again'}
                            </button>
                        </div>
                    )}

                    {/* Support Information */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Having trouble? Contact our support team{' '}
                            <a href="mailto:support@jamalpurbazaar.com" className="text-blue-600 hover:text-blue-500">
                                here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerActivationPage;