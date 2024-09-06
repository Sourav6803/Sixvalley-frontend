import React, { useState } from 'react';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { categoriesData } from "../../static/data"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowForward, IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { BiMenuAltLeft } from 'react-icons/bi';
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


    return (
        <>
            <div className={`${styles.section}  `}>
                <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between '>
                    <div>
                        <Link to="/">
                            <img src={mainLogo} alt='dd' />
                        </Link>
                    </div>

                    {/* search box */}
                    <div className='w-[50%] relative'>
                        <input className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' type='text' placeholder='Search product..' value={searchTearm} onChange={handleSearchChange} />
                        <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />

                        {
                            searchData && searchData.length !== 0 ? (
                                <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                    {searchData && searchData.map((i, index) => {

                                        return (
                                            <Link to={`/product/${i?._id}`}  key={index} >
                                                <div key={index} className='w-full flex items-start py-3' onClick={()=>handleSearch(i?._id,i?.name)} >
                                                    <img src={`${i.images[0]}`} alt='img' className='w-[40px] h-[40px] mr-[10px]' />
                                                    <h1>{i?.name}</h1>
                                                </div>

                                            </Link>
                                        )
                                    })}
                                </div>
                            ) : null
                        }
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
                                {isAuthenticated && cart?.length >=1 && <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{cart && cart?.length}</span>}
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

            <div className={` ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-blue-400  z-50 top-0 left-0 shadow-sm 800px:hidden`}  >
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
                                <div className='w-full justify-between flex pr-3 '>
                                    <div>
                                        <div className='relative mr-[15px] ' onClick={() => setOpenWishlist(true)}>
                                            <IoIosHeart size={25} className='mt-5 ml-3 ' color='red' />
                                            {isAuthenticated && wishlist?.length > 0 && <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{wishlist && wishlist?.length}</span>}
                                        </div>
                                    </div>

                                    <div>
                                        {
                                            user && <p className='mt-5 text-[16px]'>Welcome, {user?.name}</p>
                                        }
                                    </div>

                                    <RxCross1 size={25} className='mt-5 ml-4 border-2 rounded-md border-blue-500 hover:border-red-500 cursor-pointer' onClick={() => setOpen(false)} />
                                </div>

                                <div className='my-8 w-[92%] m-auto h-[40px] relative' >
                                    <input placeholder='Search Product'
                                        className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md '
                                        value={searchTearm}
                                        onChange={handleSearchChange}
                                    />

                                    {
                                        searchData && searchData?.length !== 0 ? (
                                            <div className='absolute  bg-slate-50 shadow w-full z-10 left-0 p-3'>
                                                {searchData && searchData?.map((i, index) => {
                                                    return (
                                                        <Link to={`/product/${i?._id}`} >
                                                            <div key={index} className='w-full flex items-start py-3'>
                                                                <img src={i?.images[0]?.url} alt='img' className='w-[50px]  mr-2' />
                                                                <h5>{i?.name}</h5>
                                                            </div>

                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        ) : null
                                    }
                                </div>

                                <Navbar active={activeHeading} />

                                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                    <Link to={`${isSeller ? "/dashboard" : '/shop-login'}`}>
                                        <h1 className='text-[#fff] flex items-center'>
                                            {isSeller ? "Dashboard" : "Become Seller"}  <IoIosArrowForward className='ml-1' />
                                        </h1>
                                    </Link>
                                </div>
                                <br />
                                <br />


                                <div className='flex w-full justify-center'>
                                    {
                                        isAuthenticated ? (
                                            <div>
                                                <Link to="/profile">
                                                    <img src={`${user?.avatar?.url}`} alt='' className='w-[110px] h-[110px] rounded-full border-[3px] border-[#33a466] ' />
                                                </Link>
                                            </div>
                                        ) : (
                                            <>
                                                <div className='flex items-center justify-center border border-blue-500 rounded-xl p-3 '>
                                                    <Link to="/login" className='text-[18px] pr-[10px] text-[#000000b7] '>Login /</Link>
                                                    <Link to="/sign-up" className='text-[18px]  text-[#000000b7] '>Sign Up</Link>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                
            </div>



            
           

        </>
    )
}

export default Header