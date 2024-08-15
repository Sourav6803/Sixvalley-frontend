import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { AiFillHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai'
import { backend_url, server } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from "../../redux/actions/product";
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

// import { addTocart } from '../../../redux/actions/cart';


const ProductDetails = ({ data }) => {
    const { wishlist } = useSelector(state => state?.wishlist)
    const { products } = useSelector(state => state?.products)
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { cart } = useSelector(state => state?.cart)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)
    const [count, setCount] = useState(1)

    const navigate = useNavigate()
    const dispatch = useDispatch()

     console.log(data)



    useEffect(() => {
        dispatch(getAllProductsShop(data && data?.shop?._id))
        if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [data, wishlist])

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart?.find((i) => i?._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < count) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };

    const decreamentCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const increamentCount = () => {
        if (count <= 4) {
            setCount(count + 1)
        }
    }

    const handleMessageSubmit = async () => {
        if (isAuthenticated) {
            const groupTitle = data?.name;
            const userId = user?._id;
            const sellerId = data?.shop._id;
            await axios
                .post(`${server}/conversation/create-new-conversation`, {
                    groupTitle,
                    userId,
                    sellerId,
                })
                .then((res) => {
                    navigate(`/inbox?${res.data?.conversation._id}`);
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message);
                });
        } else {
            toast.error("Please login to create a conversation");
        }
    };

    const totalReviewsLength = products && products?.reduce((acc, product) => acc + product?.reviews?.length, 0)

    const totalRatings = products && products?.reduce((acc, product) => acc + product?.reviews.reduce((sum, review) => sum + review?.rating, 0), 0)
    const averageRating = Math.ceil(totalRatings / totalReviewsLength) || 0
    const discPercentage = Math.ceil(((data?.originalPrice - data?.discountPrice) / data?.originalPrice) * 100)
    const date = new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000))

    return (
        <div className='bg-white '>
            {
                data ? (
                    <div className={`${styles.section} w-[100%] 80px:w-[80%] `}>
                        <div className='w-full py-5'>
                            <div className='block w-full 800px:flex'>
                                <div className='w-full 800px:w-[50%] '>
                                    {/* <img src={`${data && data.images[select]}`} alt='' className='w-full h-[370px] md:h-[500px] object-cover rounded-md' />
                                    <div className='w-full flex flex-wrap ml-2'>
                                        {
                                            data && data?.images?.map((i, index) => (
                                                <div className={`${select === 0 ? "border" : "null"} cursor-pointer`} key={index}>
                                                    <img src={`${i}`} alt='' className='h-[80px] overflow-hidden rounded-md mr-3 mt-3' onClick={() => setSelect(index)} />

                                                </div>

                                            ))
                                        }
                                    </div> */}

                                    {
                                        data && data?.images?.length && (
                                            <Carousel showArrows={true} autoPlay infiniteLoop>
                                                {data?.images && data.images.map((img, index)=> <img src={img} alt={data?.title} key={index} />)}
                                            </Carousel>
                                        )
                                    }

                                </div>

                                <div className='w-full 800px:w-[50%] ml-1'>
                                    <h1 className={`${styles.productTitle} mt-3 !text-[14px]`}>{data.name}</h1>

                                    <h3 className={`${styles.shop_name} pb-1 pt-1 `}>
                                        <span className='text-black'>Seller:</span> <Link to={`/shop/preview/${data?.shop._id}`}>{data?.shop?.name}</Link>
                                    </h3>

                                    {
                                        data?.customize ? <h2>Customizabe as per user request</h2> : ""
                                    }


                                    {/* <p className='mt-3'>{data?.description}</p> */}
                                    <div className='flex pt-1'>
                                        <h4 className={`${styles.productDiscountPrice} mt-1`}>₹{data.discountPrice}</h4>
                                        <h3 className={`${styles.price} !mt-1 `}>
                                            ₹{data?.originalPrice ? data?.originalPrice : null}
                                        </h3>
                                        <h3 className='mt-1 ml-3 font-bold text-green-800'>{discPercentage ? discPercentage : data?.discountPercentage}% off</h3>
                                    </div>


                                    <div className='flex items-center mt-2 justify-between pr-3'>
                                        <div>
                                            <button className='bg-gradient-to-r from-teal-500 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={decreamentCount}>-</button>
                                            <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[9px]'>{count}</span>
                                            <button className='bg-gradient-to-r from-teal-500 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={increamentCount}>+</button>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        {/* <div className={`${styles.button} !mt-6  !rounded !h-11 flex items-center`} >
                                            <span className='text-[#fff] flex items-center'> <AiOutlineHeart size={20} color={click ? "red" : "#333"} className='mr-3'/> WISHLIST </span>
                                        </div> */}

                                        {
                                            click ? <div className={`${styles.button} !mt-3  !rounded !h-11 flex items-center`} onClick={() => removeFromWishlistHandler(data)} title='Remove from wishlist' >
                                                <span className='text-[#fff] flex items-center'> <AiFillHeart size={20} color={click ? "red" : "#333"} className='mr-3' /> WISHLIST </span>
                                            </div> :
                                                <div className={`${styles.button} !mt-3  !rounded !h-11 flex items-center`} onClick={() => addToWishlistHandler(data)} title='Add to wishlist' >
                                                    <span className='text-[#fff] flex items-center'> <AiFillHeart size={20} color={click ? "red" : "#333"} className='mr-3' /> WISHLIST </span>
                                                </div>
                                        }

                                        <div className={`${styles.button} !mt-3 !rounded !h-11 flex items-center ml-3`} onClick={() => addToCartHandler(data?._id)}>
                                            <span className='text-[#fff] flex items-center'>Add to Cart <AiOutlineShoppingCart className='ml-1' /></span>
                                        </div>
                                    </div>

                                    <div className='mt-1'>
                                        {
                                            data && data.stock <= 9 ? <p className='text-red-500 font-semibold'>Hurry Up! Only few prodcts are left</p> : ""
                                        }
                                    </div>

                                    <div className='mt-3'>
                                        <h5 className='flex'>
                                            <TbTruckDelivery size={30} className='inline-block ms-3' />
                                            {
                                                data.discountPrice >= 399 ? <p className='text-green-600  font-bold  ml-5'>FREE Delivery <span className='line-through text-black'>40</span></p> : <span className='flex mt-1 ml-3 '> <FaRupeeSign className='mt-1' /> 40</span>
                                            }
                                        </h5>
                                        
                                        
                                    </div>
                                    <div>
                                    <p>Expected Delivery Date {date.toDateString()}</p>
                                    </div>

                                    <div className=' mt-3 flex mr-3'>
                                        <CiLocationOn size={20} />
                                        <p className='ml-3'> Deliver to {user?.name} - {user?.addresses[0]?.address1} {user?.addresses[0]?.zipCode}</p>
                                    </div>

                                    <div className='mt-3 flex'>
                                        <TbMoneybag size={20} className='mr-3' />
                                        <p>Pay On Delivery Available</p>
                                    </div>

                                    <div className='mt-3'>
                                        100% Original Products
                                    </div>
                                    <p>Free shipping and Returns available on all orders!
                                            <br /> We Ship all us domestic orders within
                                            <b> 5-10 business days</b>{" "}
                                        </p>

                                    <div className='flex items-center pt-8'>
                                        <img src={`${data?.shop?.avatar}`} alt='' className='w-[50px] h-[50px] rounded-full mr-2 ' />
                                        <div className='pr-8'>
                                            <Link to={`/shop/preview/${data?.shop._id}`}>
                                                <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                    {data?.shop?.name}
                                                </h3>
                                            </Link>

                                            <h5 className='pb-3 text-[15px] '>({averageRating}/5)Ratings</h5>
                                        </div>
                                        <Link to={`/shop/preview/${data?.shop._id}`} >
                                            <div className={`${styles.button} bg-[#6443d1] !mt-4 !rounded h-11`} onClick={handleMessageSubmit}>
                                                <span className='text-white flex items-center'>Send Message <AiOutlineMessage className='ml-1' /></span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className=''>
                            <ProductDetailsInfo data={data} products={products} totalReviewsLength={totalReviewsLength} averageRating={averageRating} />
                            <br />
                            <br />
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}


const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
    const [active, setActive] = useState(1)

    return (
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded '>
            <div className='w-full flex justify-between border-b pt-10 pb-2'>
                <div className='relative'>
                    <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(1)}>Product Details</h5>
                    {
                        active === 1 ? (
                            <div className={`${styles.active_indicator}`}></div>
                        ) : null
                    }
                </div>
                <div className='relative'>
                    <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(2)}>Product Reviews</h5>
                    {
                        active === 2 ? (
                            <div className={`${styles.active_indicator}`}></div>
                        ) : null
                    }
                </div>
                <div className='relative'>
                    <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(3)}>Seller Information</h5>
                    {
                        active === 3 ? (
                            <div className={`${styles.active_indicator}`}></div>
                        ) : null
                    }
                </div>
            </div>

            {
                active === 1 ? (
                    <>
                        <p className='py-2 text-[14px] leading-4 pb-10  '>
                            {data?.description}
                        </p>
                    </>
                ) : null
            }

            {active === 2 ? (
                <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                    {data &&
                        data?.reviews?.map((item, index) => (
                            <div className="w-full flex my-2">
                                <img
                                    src={`${item?.user.avatar}`}
                                    alt=""
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                                <div className="pl-2 ">
                                    <div className="w-full flex items-center">
                                        <h1 className="font-[500] mr-3">{item?.user?.name}</h1>
                                        <Ratings rating={data?.ratings} />
                                    </div>
                                    <p>{item?.comment}</p>
                                </div>
                            </div>
                        ))}

                    <div className="w-full flex justify-center">
                        {data && data?.reviews?.length === 0 && (
                            <h5>No Reviews have for this product!</h5>
                        )}
                    </div>
                </div>
            ) : null}



            {
                active === 3 && (
                    <div className='w-full block 800px:flex p-5'>
                        <div className='w-full  800px:w-[50%]'>
                            <Link to={`/shop/preview/${data?.shop?._id}`}>
                                <div className='flex items-center'>
                                    <img src={`${data?.shop?.avatar}`} alt='' className='w-[50px] h-[50px] rounded-full ' />

                                    <div className='pl-3'>
                                        <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                                        <h5 className='pb-2 text-[15px]'>({averageRating}/5) Ratings</h5>

                                    </div>

                                </div>
                            </Link>
                            <p className='pt-2'>
                                {data.shop.description}
                            </p>
                        </div>

                        <div className='w-full 800px:w-[50%] mt-5 800px:flex flex-col items-end'>
                            <div className='text-left'>
                                <h5 className='font-[600]'>
                                    Joined on: <span className='font-[500]'>{data?.shop?.createdAt?.slice(0, 10)}</span>
                                </h5>
                                <h5 className='font-[600] pt-3'>
                                    Total Products: <span className='font-[500]'>{products?.length}</span>
                                </h5>
                                <h5 className='font-[600] pt-3'>
                                    Total Reveiws: <span className='font-[500]'>{totalReviewsLength}</span>
                                </h5>
                                <Link to="#">
                                    <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 `}>
                                        <h4 className='text-white'>Visit Shop</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default ProductDetails
