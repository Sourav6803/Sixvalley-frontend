import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/styles';
import { Link, Navigate } from 'react-router-dom';
import { categoriesData, ProfileMenu } from "../../static/data"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowForward, IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { BiMenuAltLeft, BiMicrophone, BiSearch } from 'react-icons/bi';
import { CgProfile } from "react-icons/cg"
import DropDown from "./DropDown.jsx";
import Navbar from '../Layout/Navbar.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../server';
import Cart from '../Cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx';

import Logo from "./Jamalpur BAZAR-logos__white.png"
import { IoIosHeart } from "react-icons/io";
import axios from 'axios';
import { FaChevronRight, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const Header = ({ activeHeading }) => {

    const { isAuthenticated, user } = useSelector(state => state?.user)
    const { wishlist } = useSelector(state => state.wishlist)
    const { isSeller } = useSelector(state => state.seller)
    const { isAdmin } = useSelector(state => state.admin)
    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [active, setActive] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const { allProducts } = useSelector((state) => state.products)
    const [openCart, setOpenCart] = useState(false)
    const [openWishlist, setOpenWishlist] = useState(false)
    const [open, setOpen] = useState(false)
    const { cart } = useSelector(state => state.cart)
    const [searchOpen, setSearchOpen] = useState(false)
    const [notficationOpen, setNotificationOpen] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState([])

    const admin = user?.role === "Admin"
    
    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTearm(term)
        const filterProducts = allProducts && allProducts?.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        )
        setSearchData(filterProducts)
    }

    const logoutHandler = () => {

        axios
            .get(`${server}/user/logout`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message || "Logout success");
                window.location.reload(true);
                Navigate("/login");
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            });

    };

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })

    const handleSearch = async (productId, searchName) => {


        try {
            await axios.post(`${server}/activity/logActivity`, {
                userId: user?._id,
                type: 'search',
                searchTerm: searchName,
                productId: productId
            });
        } catch (error) {
            console.error('Error logging search activity:', error);
        }

        // Perform the search logic (like API call to get products based on searchTerm)
    };

    const [isListening, setIsListening] = useState(false);

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Start listening for voice input
    const startListening = () => {
        setIsListening(true);
        recognition.start();
    };

    // Stop listening and handle the result
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSearchChange({ target: { value: transcript } }); // Set the voice input as the search term
        setIsListening(false);
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
    };

    // Stop listening on end
    recognition.onend = () => {
        setIsListening(false);
    };

    const [subMenuOpen, setSubMenuOpen] = useState(null);


    const toggleMenu = (index) => {
        if (subMenuOpen === index) {
            setSubMenuOpen(null);
        } else {
            setSubMenuOpen(index);
        }
    };

    const handleClose = (e) => {
        if (e.target.id === "screen") {
            setOpen(false);
        }
    };

    const handleCartClose = (e) => {
        if (e.target.id === "screen") {
            setOpenCart(false);
        }
    };

    const handleNotificationClose = (e) => {
        if (e.target.id === "screen") {
            setNotificationOpen(false);
        }
    };

    const handleWishlistClose = (e) => {
        if (e.target.id === "screen") {
            setOpenWishlist(false);
        }
    };


    const userId = user?._id

    useEffect(() => {
        setIsLoading(true);
        userId && axios.get(`${server}/admin/notifications/unread`, { params: { userId }, withCredentials: true, }).then((res) => {
            setIsLoading(false);
            setNotifications(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

        }).catch((error) => {
            setIsLoading(false);
        });
    }, [userId]);

    const handleNotificationChange = async (notificationId) => {
        const userId = user?._id
        try {
            const response = await axios.put(`${server}/admin/notifications/read/${notificationId}`, { userId });

            if (response.status === 200) {
                // Update the state after successfully marking as read
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notif) =>
                        notif._id === notificationId ? { ...notif, isRead: true } : notif
                    )
                );
            } else {
                console.error('Failed to mark notification as read');
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    const markAllAsRead = async (userId) => {
        try {
            const response = await axios.put(`${server}/admin/notifications/read-all`, { userId });

            if (response.status === 200) {
                // Assuming the backend responds with the updated count and a success message
                console.log(response.data.message);
                

                // Update all notifications' isRead status in the state
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notif) => ({ ...notif, isRead: true }))
                );
            } else {
                console.error('Error marking all notifications as read');
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };


    const audio = useMemo(() => new Audio("http://res.cloudinary.com/dr4mnk4tw/raw/upload/v1720603600/audioTutorial/ZURQ2FE-notification.mp3"), []);

    useEffect(() => {
        const fetchNotifications = () => {
            setIsLoading(true);
            if (userId) {
                axios.get(`${server}/admin/notifications/unread`, { params: { userId }, withCredentials: true })
                    .then((res) => {
                        setIsLoading(false);
                        setNotifications(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.error("Error fetching notifications:", error);
                    });
            }
        };

        socketId.on("newNotification", (data) => {

            console.log("new notification recived:", data)
            fetchNotifications()
            audio.play().catch((error) => {
                console.error("Error playing sound:", error);
            });
            // setNotifications((prev) => [...prev, data]);
        });

        return () => {
            socketId.off("newNotification");
        };
    }, [audio, userId]);


    return (
        <>
            <div className={`${styles.section} `}>
                <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between '>
                    <div className='bg-blue-600'>
                        <Link to="/">
                            <img
                                src={Logo}
                                alt='dd'
                                className=" items-start cursor-pointer "
                                height={35}
                                width={50} />
                        </Link>
                    </div>

                    {/* search box */}
                    <div className='w-[50%] relative'>
                        <AiOutlineSearch size={30} className='absolute left-2 top-1.5 cursor-pointer' />
                        <input className='h-[40px] w-full px-10 border-[#3957db] border-[2px] rounded-md' type='text' placeholder='Search product..' value={searchTearm} onChange={handleSearchChange} />
                        <span className={`absolute right-3 top-1.5 cursor-pointer text-gray-500 ${isListening ? 'animate-pulse' : ''}`} onClick={startListening}>
                            <BiMicrophone size={25} />
                        </span>

                        {/* Listening Animation */}
                        {isListening && (
                            <div className="flex items-center justify-center mt-2">
                                <div className="flex items-center space-x-1">
                                    <span className="text-blue-600">Listening</span>
                                    <span className="dot-animate"></span>
                                    <span className="dot-animate"></span>
                                    <span className="dot-animate"></span>
                                </div>
                            </div>
                        )}


                        {/* Search Results */}
                        {searchTearm && searchData?.length > 0 && (
                            <div className="absolute bg-slate-100 shadow max-h-60 w-full z-10 left-0 p-3 overflow-y-auto">
                                {searchData.map((i, index) => (
                                    <Link to={`/product/${i?._id}`} key={index}>
                                        <div className="w-full flex items-start py-3 " onClick={() => handleSearch(i?._id, i?.name)}>
                                            <img src={i?.images[0]?.url} alt="img" className="w-[40px] h-[40px] mr-2" />
                                            <h5>{i?.name.length > 40 ? i?.name.slice(0, 40) + "..." : i?.name}</h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={`${styles.button}`}>
                        <Link to={`${admin || isAdmin ? "/admin/dashboard" : isSeller ? "/dashboard" : '/shop-login'}`}>
                            <h1 className='text-[#fff] flex items-center'>
                                {isSeller ? "Dashboard" : admin || isAdmin ? "Admin" : "Become Seller"}  <IoIosArrowForward className='ml-1' />
                            </h1>
                        </Link>
                    </div>
                </div>

            </div>

            <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex z-50 top-0 left-0 items-center justify-between w-full  h-[70px]`} style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`} >
                    {/* Categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
                            <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
                            <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>All Categories</button>
                            <IoIosArrowDown size={20} className='absolute right-2 top-4 cursor-pointer' onClick={() => setDropDown(!dropDown)} />
                            {
                                dropDown ? (
                                    <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
                                ) : null
                            }
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>

                    <div className='flex'>

                        <div className="relative cursor-pointer m-2">
                            <IoMdNotificationsOutline className="text-3xl text-white cursor-pointer  " />
                            <span className="absolute top-0 right-0 bg-[#3bc177] rounded-full w-4 h-4 text-[12px] flex items-center justify-center text-white ">
                                5
                            </span>
                        </div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenWishlist(true)}>
                                <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%' />
                                {isAuthenticated && wishlist?.length >= 1 && <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{wishlist && wishlist?.length}</span>}
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(true)}>
                                <AiOutlineShoppingCart size={30} color='rgb(255 255 255 / 83%' />
                                {isAuthenticated && cart?.length >= 1 && <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{cart && cart?.length}</span>}
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-[15px]' >
                                {
                                    isAuthenticated ? (
                                        <Link to="/profile">
                                            <img src={`${user?.avatar?.url}`} alt='' className='w-[35px] h-[35px] rounded-full' />
                                        </Link>
                                    ) : (
                                        <Link to="/login">
                                            <CgProfile size={30} color='rgb(255 255 255 / 83%' />
                                        </Link>
                                    )
                                }
                            </div>
                        </div>

                        {/* cart popup */}
                        {
                            openCart ? (
                                <Cart setOpenCart={setOpenCart} />
                            ) : null
                        }

                        {/* wishlist popup */}
                        {
                            openWishlist ? (
                                <Wishlist setOpenWishlist={setOpenWishlist} />
                            ) : null
                        }
                    </div>
                </div>
            </div>

            {/* Mobile header */}

            <div className={` ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-blue-600  z-50 top-0 left-0 shadow-sm 800px:hidden`}  >
                <div className='w-full flex items-center justify-between ' >
                    <div className="mt-2  flex items-center  justify-center" >
                        <BiMenuAltLeft size={40} className="ml-1 text-white " onClick={() => setOpen(true)} />
                        <Link to="/">
                            <img
                                src={Logo}
                                alt=""
                                className=" items-start cursor-pointer "
                                height={30}
                                width={40}

                            />

                        </Link>
                    </div>

                    <div className=' flex items-center justify-center ' >

                        <div>
                            <div className='relative ' onClick={() => setSearchOpen(!searchOpen)} >
                                <BiSearch size={30} className='text-white ' color='white' />
                            </div>
                        </div>

                        <div>
                            <div className='relative ' onClick={() => setOpenWishlist(true)}>
                                <IoIosHeart size={30} className='text-white ' color='red' />
                                {isAuthenticated && wishlist?.length > 0 && <span className='absolute right-0 top-0 rounded-full bg-[#ffffff] w-3 h-3 top right p-0 m-0  font-mono text-[10px] leading-tight text-center'>{wishlist && wishlist?.length}</span>}
                            </div>
                        </div>
                        <div className="relative cursor-pointer " onClick={() => setNotificationOpen(!notficationOpen)}>
                            <IoMdNotificationsOutline size={30} className="text-white  cursor-pointer  " />
                            {notifications?.length > 0 && (
                                <span className="absolute top-0 right-1 bg-white rounded-full w-3 h-3 text-[10px] flex items-center justify-center">
                                    {notifications?.length}
                                </span>
                            )}
                        </div>

                        {notficationOpen && (
                            <div className="absolute right-0 top-16 w-[320px] max-h-[400px] bg-white shadow-lg rounded-lg z-20 overflow-hidden border border-gray-400">
                                {/* Header */}
                                <div className="p-4 bg-gray-200 border-b border-gray-400 flex justify-between items-center">
                                    <h5 className="text-lg font-semibold text-gray-700">Notifications</h5>
                                    {
                                        notifications?.length > 0 &&
                                        <button
                                            className="text-sm text-blue-600 hover:underline"
                                            onClick={() => markAllAsRead(user?._id)}
                                        >
                                            Mark all as read
                                        </button>
                                    }
                                </div>

                                {/* Notification List */}
                                <div id='screen' onClick={handleNotificationClose} className="overflow-y-auto max-h-[320px]">
                                    {notifications.length > 0 ? (
                                        notifications.map((item, index) => (
                                            <div
                                                className={`flex items-start p-4 border-b border-gray-200 transition duration-200 ease-in-out hover:bg-gray-50 ${item.isRead ? "bg-white" : "bg-gray-50"
                                                    }`}
                                                key={index}
                                            >
                                                {/* Notification Image */}
                                                <img
                                                    src={item?.image?.url || "/placeholder-image.png"}
                                                    alt={item?.title || "Notification"}
                                                    className="w-12 h-12 rounded-full object-cover mr-3"
                                                />

                                                {/* Notification Content */}
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-800">{item?.title}</p>
                                                    <p className="text-xs text-gray-500">{item?.content?.length > 60 ? item?.content?.slice(0,60) +"..." : item?.content }</p>
                                                    <p className="text-xs text-gray-500 mt-1">{format(item?.createdAt)}</p>
                                                </div>

                                                {/* Mark as Read Button */}
                                                {!item.isRead && (
                                                    <button
                                                        className="ml-3 text-xs text-blue-600 hover:underline"
                                                        onClick={() => handleNotificationChange(item._id)}
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            No new notifications
                                        </div>
                                    )}
                                </div>


                            </div>
                        )}

                        <div className="relative mr-[20px]" onClick={() => {setOpenCart(true); setNotificationOpen(false)}}>
                            <AiOutlineShoppingCart size={30} color='' className='text-white' />
                            {isAuthenticated && cart?.length >= 1 && <span className="absolute right-1 top-0 rounded-full bg-white w-3 h-3 top  p-0 m-0  font-mono text-[10px]  leading-tight text-center">
                                {cart && cart?.length}
                            </span>}
                        </div>
                    </div>

                    {/* cart popup */}
                    {openCart ? <Cart setOpenCart={setOpenCart} handleCartClose={handleCartClose} /> : null}

                    {/* wishlist popup */}

                    {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} handleWishlistClose={handleWishlistClose} /> : null}


                </div>



                {/* header sidebar */}
                {
                    open && (
                        <div id='screen' onClick={handleClose} className={` fixed w-full bg-[#0000005f] z-20 h-full top-0  `} >
                            <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll '>
                                <div className='w-full justify-between flex pr-3 bg-blue-500 mb-2'>

                                    <div >
                                        <Link to="/">
                                            <img
                                                src={Logo}
                                                alt=""
                                                className=" items-start cursor-pointer "
                                                height={35}
                                                width={50}

                                            />

                                        </Link>
                                    </div>

                                    <RxCross1 size={30} className='mt-3 text-white ml-4 border-2 rounded-md border-white hover:border-red-500 cursor-pointer' onClick={() => setOpen(false)} />
                                </div>

                                {/* <Navbar active={activeHeading} /> */}
                                {user &&
                                    (
                                        <div className='flex mx-4 items-center justify-between'>
                                            <div className='text-gray-700'>{user?.name}</div>
                                            <div>
                                                <img src={`${user?.avatar?.url}`} alt='' className='w-[50px] h-[50px] rounded-sm border-[3px]  ' />
                                            </div>
                                        </div>
                                    )
                                }

                                <hr className='mt-3' />

                                <ul className="pt-2">
                                    {ProfileMenu.map((menu, index) => (
                                        <React.Fragment key={index}>
                                            <li className={`text-gray-700 text-sm flex items-center gap-x-3  cursor-pointer p-2 hover:bg-[#a4c7ff] mx-2 rounded-md ${menu?.spacing ? "mt-3" : "mt-2"}`} onClick={() => toggleMenu(index)}>
                                                <span className="text-xl block float-left hover:scale-110">{menu.icon}</span>
                                                <Link to={menu?.link} className={`text-[14px] font-[500] flex-1 ${!open && "hidden"}`}>{menu.title}</Link>

                                                <FaChevronRight className="" />

                                            </li>

                                        </React.Fragment>
                                    ))}
                                </ul>


                                <button type="button" className="text-white bg-gradient-to-br mt-3 ml-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <Link to={`${isSeller ? "/dashboard" : '/shop-login'}`}>
                                        <h1 className='text-[#fff] flex items-center '>
                                            {isSeller ? "Seller Dashboard" : "Become Seller"}  <IoIosArrowForward className='ml-1' />
                                        </h1>
                                    </Link>
                                </button>

                                {isAdmin && <button type="button" className="text-white bg-gradient-to-br ml-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <Link to={`${isAdmin ? "/admin/dashboard" : '/admin-login'}`}>
                                        <h1 className='text-[#fff] flex items-center '>
                                            {isAdmin && "Admin Dashboard"}  <IoIosArrowForward className='ml-1' />
                                        </h1>
                                    </Link>
                                </button>}

                                {
                                    isAuthenticated ?
                                        (
                                            <button onClick={logoutHandler} type="button" className="text-red-700 mt-3 w-[180px] ml-4 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                Logout
                                            </button>
                                        ) :
                                        (
                                            <div className='flex items-center justify-center border border-blue-500 ml-4 w-[180px] rounded-md mb-3 py-1 '>
                                                <Link to="/login" className='text-[18px] pr-[10px] text-[#000000b7] '>Login </Link>
                                            </div>
                                        )
                                }

                                <div className='mt-5 ml-4'>
                                    <h2 className='text-xl  text-slate-700 font-semibold mb-2 '>Follow Us</h2>
                                    <div className='flex gap-4 text-gray-700'>
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                            <FaFacebook size={30} />
                                        </a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                            <FaTwitter size={30} />
                                        </a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                            <FaInstagram size={30} />
                                        </a>
                                    </div>
                                </div>



                            </div>
                        </div>
                    )
                }


            </div>


            {
                searchOpen &&
                <div className={`max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl shadow-lg md:hidden`}>
                    <div className="md:flex">
                        <div className="w-full p-1">
                            <div className="relative flex items-center justify-between bg-white rounded-lg shadow-sm border-2">
                                {/* Search Icon */}
                                <span className="absolute left-3 text-gray-500">
                                    <BiSearch />
                                </span>

                                {/* Input field */}
                                <input
                                    type="text"
                                    className="bg-white h-8 w-full pl-10 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 hover:cursor-pointer"
                                    placeholder="Search here..."
                                    value={searchTearm}
                                    onChange={handleSearchChange}
                                />

                                {/* Microphone Icon with animation */}
                                <span className={`absolute right-3 text-gray-500 ${isListening ? 'animate-pulse' : ''}`} onClick={startListening}>
                                    <BiMicrophone />
                                </span>
                            </div>

                            {/* Listening Animation */}
                            {isListening && (
                                <div className="flex items-center justify-center mt-2">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-blue-600">Listening</span>
                                        <span className="dot-animate"></span>
                                        <span className="dot-animate"></span>
                                        <span className="dot-animate"></span>
                                    </div>
                                </div>
                            )}

                            {/* Search Results */}
                            {searchTearm && searchData?.length > 0 && (
                                <div className="absolute bg-slate-100 shadow max-h-60 w-full z-10 left-0 p-3 overflow-y-auto">
                                    {searchData.map((i, index) => (
                                        <Link to={`/product/${i?._id}`} key={index}>
                                            <div className="w-full flex items-start py-3 " onClick={() => handleSearch(i?._id, i?.name)}>
                                                <img src={i?.images[0]?.url} alt="img" className="w-[40px] h-[40px] mr-2" />
                                                <h5>{i?.name.length > 40 ? i?.name.slice(0, 40) + "..." : i?.name}</h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            }

            {/* CSS for dot animation */}
            <style jsx>
                {`
                .dot-animate {
                    width: 6px;
                    height: 6px;
                    background-color: blue;
                    border-radius: 50%;
                    animation: dot-blink 1s infinite;
                }

                @keyframes dot-blink {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
                `}
            </style>

        </>

    )

}



export default Header



