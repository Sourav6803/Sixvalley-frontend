import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { AiFillHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai'
import { backend_url, server } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop, singleYoga } from "../../redux/actions/product";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from 'react-toastify';
import { addTocart } from '../../redux/actions/cart'
import Ratings from './Ratings'
import axios from 'axios'
import { TbTruckDelivery } from "react-icons/tb"
import { FaRupeeSign } from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import { TbMoneybag } from "react-icons/tb"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FaShareSquare } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoCloseOutline } from 'react-icons/io5';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import { paymentIntent } from '../../redux/actions/order'
import CheckOutForm from '../Payment/CheckOutForm'






// import { addTocart } from '../../../redux/actions/cart';


const YogaDetails = ({ data, stripePromise, clientSecret }) => {
    // console.log(data)
    const { wishlist } = useSelector(state => state?.wishlist)
    //const {singleYoga} = useSelector(state => state?.singleYoga)
    const {payment} = useSelector(state=>state?.payment)
    const { products } = useSelector(state => state?.products)
    const { user, isAuthenticated } = useSelector((state) => state.user);

    const isPurchased = user?.yoga && user?.yoga?.find((yoga) => yoga?._id === data?._id);

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const totalReviewsLength = products && products?.reduce((acc, product) => acc + product?.reviews?.length, 0)

    const totalRatings = products && products?.reduce((acc, product) => acc + product?.reviews.reduce((sum, review) => sum + review?.rating, 0), 0)
   
    const date = new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000))

    const handleOrder = () => {
        if(user){
            setOpen(true)
        }else{
            navigate("/")
        }
    }

    return (
        <div>
            <div className='z-50'style={{margin: "0 10%"}} >
                <div className='text-yellow-500 font-semibold text-sm flex flex-row items-center cursor-pointer'>
                    <FaLongArrowAltLeft size={20} className='text-yellow-600 mr-3' />
                    Back to all Monthly Courses
                </div>

                <div className='lg:flex flex-row justify-between mt-5'>
                    <div className='bg-white max-w-xl w-full shadow-lg shadow-card-cream-lg rounded-md overflow-hidden z-10 cover-image'>
                        <div className='w-full 800px:w-[50%]'>
                        {/* {
                                        data && data?.images?.length && (
                                            <Carousel showArrows={true} autoPlay infiniteLoop>
                                                {data?.images && data.images?.url.map((img, index)=> <img src={img} alt={data?.title} key={index} />)}
                                            </Carousel>
                                        )} */}
                                    
                        </div>
                    </div>


                    <div className='mt-5 lg:mt-0 sm:max-w-xs h-full w-full lg:bg-white lg:p-8 lg:rounded-md lg:shadow-card-cream-sm z-10'>
                        <h1 className='font-semibold text-xl'>{data?.title}</h1>
                        <div className='mt-5 w-full'>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>LEVEL :</p>
                                <p className='w-full'>{data?.level}</p>
                            </div>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>STYLE :</p>
                                <p className='w-full'>{data?.style}</p>
                            </div>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>DATE :</p>
                                <p className='w-full'>{data?.date}</p>
                            </div>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>TIME :</p>
                                <p className='w-full'>{data?.startTime} ({data?.duration} min)</p>
                            </div>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>FEE :</p>
                                <p className='w-full'>₹ {data?.fee} per month</p>
                            </div>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>Rating :</p>
                                <p className='w-full'>{data?.rating ? data?.rating : 0}</p>
                            </div>
                            <div className='flex flex-row justify-start text-sm mb-2'>
                                <p className='text-gray-400 tracking-wide min-w-[70px] '>STREAMS :</p>
                                <p className='w-full'>{data?.stream}</p>
                            </div>
                        </div>
                        <button type='button' className='focus:outline-none tracking-wide inline-block py-4 px-8 rounded shadow-md text-center font-semibold text-white text-sm cursor-pointer mt-4 w-full bg-gradient-to-r from-red-600 to-red-400'>
                            Book trial at ₹50
                        </button>
                        <button type='button' onClick={handleOrder} className='focus:outline-none tracking-wide inline-block py-4 px-8 rounded shadow-md text-center font-semibold text-white text-sm cursor-pointer mt-4 w-full bg-gradient-to-r from-red-600 to-red-400'>
                            {isPurchased ? "Visit Yoga" : `Join course at ₹${data?.fee}`}
                        </button>
                        <button type='button' className='focus:outline-none tracking-wide inline-block py-4 px-8 rounded shadow-md text-center font-semibold text-white text-sm cursor-pointer mt-4 w-full bg-gradient-to-r from-red-600 to-red-400'>
                            Join 3 month of 15% off.
                        </button>
                        <button type='button' className='focus:outline-none tracking-wide inline-block py-4 px-8 rounded shadow-md text-center font-semibold text-white text-sm cursor-pointer mt-4 w-full bg-gradient-to-r from-red-600 to-red-400'>
                            Join 3 month of 15% off.
                        </button>
                        <button type='button' className='w-full border border-yellow-600 mt-5 focus:outline-none tracking-wide inline-block  py-3 px-8 rounded shadow-md text-center font-semibold  text-sm cursor-pointer text-yellow-600 flex items-center justify-center '>
                            <FaShareSquare className='text-yellow-500 mr-5' size={20} />
                            Share
                        </button>
                        <button type='button' className='w-full'>
                            <button className='w-full mt-5 mb-3 focus:outline-none tracking-wide inline-block py-3 px-8 rounded shadow-md text-center font-semibold text-yellow-600 text-sm cursor-pointer  flex items-center justify-center border border-yellow-600'>
                                <SiWhatsapp size={20} className='text-green-400 mr-3' /> Message Us
                            </button>
                        </button>

                    </div>
                </div>

                <div className='max-w-xl'>
                    <div className='mt-8 sm:mt-0'>
                        <div className='pb-4'>
                            <div className='font-bold'>Yoga Class @ Morning {data?.startTime}</div>
                            <div className=''>
                                <p>
                                    <strong>All age group of people can join this class.</strong>
                                </p>
                                <br />
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-screen-lg mx-auto py-8 relative'>
                    <div>
                        <h2 className='font-semibold text-xl mb-2'>Reviews</h2>
                        <div className='px-5'>
                            Reviews carousel
                        </div>
                    </div>
                </div>

                <div className='max-w-xl'>
                    <div className='mt-10'>
                        <div className='w-full max-w-md'>
                            <h2 className='font-semibold text-xl'>About the Teacher</h2>
                            <div className='w-full'>
                                <div className='flex flex-col justify-center items-center mt-5'>
                                    <div>
                                        <div className=' rounded-full relative outline-none ]'>
                                            {/* <div className='x-ring x-glowing-ring-1'></div>
                                        <div className='x-ring x-glowing-ring-2'></div>
                                        <div className='x-ring x-glowing-ring-3'></div> */}
                                            <div className='x-ring x-glowing-ring-4 overflow-hidden w-20 h-20 rounded-full'>
                                                <img src={data?.teacher?.avatar.url} alt='teacher' className='h-full w-full object-cover' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-grow flex-col items-center'>
                                        <h2 className='text-xl font-semibold mt-5'>{data?.teacher?.name}</h2>
                                        <div className='leading-relaxed text-sm font-light text-gray-500 flex flex-row items-center mt-1'>
                                            <CiLocationOn className='mr-1' />
                                            {data?.teacher.address}
                                        </div>
                                        <p className='text-sm font-light text-gray-500 mt-1'>Teaching for {data?.teacher?.teachingYear} years.</p>
                                        <p className='text-sm font-light text-gray-500 mt-1'>{data?.teacher?.style}</p>
                                        <div className='mt-8 text-gray-500 text-sm font-light bg-white p-5 rounded-lg w-full'>{data?.teacher?.description}</div>
                                        <span className='text-yellow-600 hover:underline cursor-pointer text-y-yellow pt-4'>
                                            <div className='flex items-center'>
                                                Go to teacher page
                                                <FaLongArrowAltRight size={20} className='text-yellow-600' />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className='mt-4'></div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'></div>
                </div>

            </div>
            <>
                {
                    open && (
                        <div className='w-full h-screen bg-[#d5c54e] fixed top-0 left-0 z-50 flex items-center justify-center'>
                            <div className='w-[500px] h-[500px] bg-white round  ed-xl shadow p-3 '>
                                <div className='w-full flex justify-end'>
                                    <IoCloseOutline size={40} className='text-black cursor-pointer' onClick={() => setOpen(false)} />
                                </div>
                                <div className='w-full'>
                                    {
                                        stripePromise && clientSecret && (
                                            <Elements stripe={stripePromise} options={{clientSecret}} >
                                                <CheckOutForm setOpen={setOpen} data={data} user={user} />
                                            </Elements>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    )
}


// const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
//     const [active, setActive] = useState(1)

//     return (
//         <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded '>
//             <div className='w-full flex justify-between border-b pt-10 pb-2'>
//                 <div className='relative'>
//                     <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(1)}>Product Details</h5>
//                     {
//                         active === 1 ? (
//                             <div className={`${styles.active_indicator}`}></div>
//                         ) : null
//                     }
//                 </div>
//                 <div className='relative'>
//                     <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(2)}>Product Reviews</h5>
//                     {
//                         active === 2 ? (
//                             <div className={`${styles.active_indicator}`}></div>
//                         ) : null
//                     }
//                 </div>
//                 <div className='relative'>
//                     <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(3)}>Seller Information</h5>
//                     {
//                         active === 3 ? (
//                             <div className={`${styles.active_indicator}`}></div>
//                         ) : null
//                     }
//                 </div>
//             </div>

//             {
//                 active === 1 ? (
//                     <>
//                         <p className='py-2 text-[14px] leading-4 pb-10  '>
//                             {data?.description}
//                         </p>
//                     </>
//                 ) : null
//             }

//             {active === 2 ? (
//                 <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
//                     {data &&
//                         data?.reviews?.map((item, index) => (
//                             <div className="w-full flex my-2">
//                                 <img
//                                     src={`${item?.user.avatar}`}
//                                     alt=""
//                                     className="w-[50px] h-[50px] rounded-full"
//                                 />
//                                 <div className="pl-2 ">
//                                     <div className="w-full flex items-center">
//                                         <h1 className="font-[500] mr-3">{item?.user?.name}</h1>
//                                         <Ratings rating={data?.ratings} />
//                                     </div>
//                                     <p>{item?.comment}</p>
//                                 </div>
//                             </div>
//                         ))}

//                     <div className="w-full flex justify-center">
//                         {data && data?.reviews?.length === 0 && (
//                             <h5>No Reviews have for this product!</h5>
//                         )}
//                     </div>
//                 </div>
//             ) : null}



//             {
//                 active === 3 && (
//                     <div className='w-full block 800px:flex p-5'>
//                         <div className='w-full  800px:w-[50%]'>
//                             <Link to={`/shop/preview/${data?.shop?._id}`}>
//                                 <div className='flex items-center'>
//                                     <img src={`${data?.shop?.avatar}`} alt='' className='w-[50px] h-[50px] rounded-full ' />

//                                     <div className='pl-3'>
//                                         <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
//                                         <h5 className='pb-2 text-[15px]'>({averageRating}/5) Ratings</h5>

//                                     </div>

//                                 </div>
//                             </Link>
//                             <p className='pt-2'>
//                                 {data.shop.description}
//                             </p>
//                         </div>

//                         <div className='w-full 800px:w-[50%] mt-5 800px:flex flex-col items-end'>
//                             <div className='text-left'>
//                                 <h5 className='font-[600]'>
//                                     Joined on: <span className='font-[500]'>{data?.shop?.createdAt?.slice(0, 10)}</span>
//                                 </h5>
//                                 <h5 className='font-[600] pt-3'>
//                                     Total Products: <span className='font-[500]'>{products?.length}</span>
//                                 </h5>
//                                 <h5 className='font-[600] pt-3'>
//                                     Total Reveiws: <span className='font-[500]'>{totalReviewsLength}</span>
//                                 </h5>
//                                 <Link to="#">
//                                     <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 `}>
//                                         <h4 className='text-white'>Visit Shop</h4>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }
//         </div >
//     )
// }

export default YogaDetails
