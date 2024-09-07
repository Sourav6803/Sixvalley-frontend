import React, { useState } from 'react';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { categoriesData } from "../../static/data"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowForward, IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { BiMenuAltLeft, BiMicrophone, BiSearch } from 'react-icons/bi';
import { CgProfile } from "react-icons/cg"
import DropDown from "./DropDown.jsx";
import Navbar from '../Layout/Navbar.jsx'
import { useSelector } from 'react-redux';
import { backend_url, server } from '../../server';
import Cart from '../Cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx';
import mainLogo from "../main_logo3.jpg"
import Logo from "./Jamalpur BAZAR-logos__white.png"
import { IoIosHeart } from "react-icons/io";
import axios from 'axios';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';



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

    const admin = user?.role === "Admin"

    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTearm(term)
        const filterProducts = allProducts && allProducts?.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        )
        setSearchData(filterProducts)
    }



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
                        <BiMenuAltLeft size={40} className="ml-2 text-white " onClick={() => setOpen(true)} />
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

                    <div className=' flex items-center justify-center gap-2' >

                        <div>
                            <div className='relative ' onClick={() => setOpenWishlist(true)}>
                                <IoIosHeart size={30} className='text-white ' color='red' />
                                {isAuthenticated && wishlist?.length > 0 && <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0  font-mono text-[12px] leading-tight text-center'>{wishlist && wishlist?.length}</span>}
                            </div>
                        </div>
                        <div className="relative cursor-pointer m-2">
                            <IoMdNotificationsOutline size={30} className="text-white  cursor-pointer  " />
                            <span className="absolute top-0 right-0 bg-white rounded-full w-4 h-4 text-[12px] flex items-center justify-center  ">
                                5
                            </span>
                        </div>
                        <div className="relative mr-[20px]" onClick={() => setOpenCart(true)}>
                            <AiOutlineShoppingCart size={30} color='' className='text-white' />
                            {isAuthenticated && cart?.length >= 1 && <span className="absolute right-0 top-0 rounded-full bg-white w-4 h-4 top right p-0 m-0  font-mono text-[12px]  leading-tight text-center">
                                {cart && cart?.length}
                            </span>}
                        </div>
                    </div>






                    {/* cart popup */}
                    {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                    {/* wishlist popup */}

                    {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}



                </div>



                {/* header sidebar */}
                {
                    open && (
                        <div className={` fixed w-full bg-[#0000005f] z-20 h-full top-0  `} >
                            <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll '>
                                <div className='w-full justify-between flex pr-3 bg-blue-500 mb-2'>
            
                                    <div >
                                        {/* {
                                            user && <p className='mt-5 text-[16px]'>Welcome, {user?.name}</p>
                                        } */}

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

                                <Navbar active={activeHeading} />

                                



                                {/* <div className='mt-5 ml-4'>
                                    <h2 className='text-xl font-semibold mb-2'>Categories</h2>
                                    <ul>
                                        <li><Link to="/category/electronics">Electronics</Link></li>
                                        <li><Link to="/category/fashion">Fashion</Link></li>
                                        <li><Link to="/category/home">Home</Link></li>
                                        <li><Link to="/category/sports">Sports</Link></li>
                                        <li><Link to="/category/beauty">Beauty</Link></li>
                                    </ul>
                                </div> */}

                                <div className='mt-5 ml-4 mb-2'>
                                    <h2 className='text-xl font-semibold mb-2'>Contact Us</h2>
                                    <ul>
                                        <li><Link to="/contact">Contact Page</Link></li>
                                        <li><a href="mailto:support@example.com">Email Support</a></li>
                                    </ul>
                                </div>

                                <div className='mt-5 ml-4'>
                                    <h2 className='text-xl font-semibold mb-2'>Follow Us</h2>
                                    <div className='flex gap-4'>
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

                                <div className='flex w-full items-center ml-4 mt-3'>
                                    {
                                        isAuthenticated ? (
                                            <div>
                                                <Link to="/profile">
                                                    <img src={`${user?.avatar?.url}`} alt='' className='w-[80px] h-[80px] rounded-full border-[3px] border-[#33a466] ' />
                                                </Link>
                                            </div>
                                        ) : (
                                            <>
                                                <div className='flex items-center justify-center border border-blue-500 rounded-xl p-3 '>
                                                    <Link to="/login" className='text-[18px] pr-[10px] text-[#000000b7] '>Login /</Link>

                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                    <Link to={`${isSeller ? "/dashboard" : '/shop-login'}`}>
                                        <h1 className='text-[#fff] flex items-center'>
                                            {isSeller ? "Dashboard" : "Become Seller"}  <IoIosArrowForward className='ml-1' />
                                        </h1>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>


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



