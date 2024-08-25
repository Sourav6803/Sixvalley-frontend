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
import { Rating, ThinStar } from '@smastrom/react-rating'
import Loader from "../../pages/Loader"

import '@smastrom/react-rating/style.css'
import insurence from "../../Assests/insurance.png"


const ProductDetails = ({ data }) => {
    const { wishlist } = useSelector(state => state?.wishlist)
    const { products } = useSelector(state => state?.products)
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { cart } = useSelector(state => state?.cart)
    const [click, setClick] = useState(false)
    const [count, setCount] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [invalidCombo, setInvalidCombo] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [currentVariant, setCurrentVariant] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allCoupons, setAllCoupons] = useState([]);
    const [loadingCouponCode, setLoadingCouponCode] = useState(null);


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedDate = `${day.toString().padStart(2, '0')} ${monthNames[month]}, ${year.toString().slice(-2)}`;
        return formattedDate;
    }

    useEffect(() => {
        const fetchCoupons = async () => {
            setLoadingCouponCode(null);
            try {
                const res = await axios.get(`${server}/cupon/active`, { withCredentials: true });
                setAllCoupons(res.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoupons();
    }, [user?._id]);


    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: 'green',
        inactiveFillColor: '#fbf1a9'
    }

    useEffect(() => {
        dispatch(getAllProductsShop(data && data?.shop?._id))
        if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [data, wishlist, dispatch])

    // Extract unique attribute keys
    const attributeKeys = (data?.variants || []).reduce((keys, variant) => {
        variant.attributes.forEach(attr => {
            if (!keys.includes(attr.key)) {
                keys.push(attr.key);
            }
        });
        return keys;
    }, []);

    useEffect(() => {
        // Update current variant and check combo validity
        const matchingVariant = data?.variants.find(variant =>
            variant.attributes.every(attr => selectedAttributes[attr.key] === attr.value)
        );
        if (matchingVariant) {
            setCurrentVariant(matchingVariant);
            setInvalidCombo(false);
        } else {
            setCurrentVariant(null);
            setInvalidCombo(true);
        }
    }, [selectedAttributes, data]);

    const handleAttributeChange = (key, value) => {
        const updatedAttributes = { ...selectedAttributes, [key]: value };
        setSelectedAttributes(updatedAttributes);

        // Find the matching variant based on the selected attributes
        const matchingVariant = data.variants.find(variant =>
            variant.attributes.every(attr => updatedAttributes[attr.key] === attr.value)
        );

        setCurrentVariant(matchingVariant || null);
    };

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        // Check if a variant is selected
        if (currentVariant) {
            // Create the cart item with the selected variant details
            const cartData = {
                ...currentVariant,
                data, // Include current variant details
                qty: count, // Include quantity
            };

            // Check if the item already exists in the cart
            const isItemExists = cart && cart.find((item) => item._id === id && item.selectedAttributes === selectedAttributes);
            if (isItemExists) {
                toast.error("Item with the selected variant is already in the cart!");
            } else {
                if (data.stock < count) {
                    toast.error("Product stock limited!");
                } else {
                    dispatch(addTocart(cartData));
                    toast.success("Item added to cart successfully!");
                }
            }
        } else {
            // Handle the case where no variant is selected
            const isItemExists = cart && cart.find((item) => item._id === id);
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

    const date = new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000))

    return (
        <div className='bg-white '>

            {
                isLoading ? (<div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>) : (
                    <>
                        {
                            data ? (
                                <div className={`${styles.section} w-[100%] 80px:w-[80%] `}>
                                    <div className='w-full py-0'>
                                        <div className='block w-full 800px:flex'>
                                            <div className='w-full p-2  rounded-md 800px:w-[50%] '>
                                                {
                                                    data && data?.images?.length && (
                                                        <Carousel showArrows={true} autoPlay infiniteLoop>
                                                            {
                                                                currentVariant?.images?.length ? (
                                                                currentVariant.images.map((img, index) => 
                                                                <div key={index} className="relative h-[55vh] md:h-[80vh] w-full ">
                                                                    <img
                                                                        src={img.url}
                                                                        alt={data?.title}
                                                                        className="  h-full w-full object-cover"
                                                                    />
                                                                </div>)
                                                            ) : (
                                                                data.images.map((img, index) => 
                                                                <div key={index} className="relative h-[55vh]  w-full">
                                                                    <img
                                                                        src={img.url}
                                                                        alt={data?.title}
                                                                        className=" object-cover h-full w-full"
                                                                    />
                                                                </div>)
                                                            )}
                                                        </Carousel>


                                                    )
                                                }

                                            </div>

                                            <div className='w-full 800px:w-[50%] ml-1 p-3'>
                                                {/* <h1 className={`${styles.productTitle} mt-3 !text-[18px] !text-slate-700`}>{data.name } ({currentVariant && currentVariant?.Size} {currentVariant && currentVariant?.Color}) </h1> */}
                                                <h1 className={`${styles.productTitle} mt-3 !text-[18px] !text-slate-700`}>
                                                    {data.name}
                                                    {currentVariant ? ` (${currentVariant.attributes.map(attr => `${attr.key}: ${attr.value}`).join(', ')})` : ''}
                                                </h1>

                                                <h1 className={`${styles.productTitle} mt-2 !text-[13px] !font-normal !text-slate-600`}>{data.description}</h1>

                                                <h3 className={`${styles.shop_name} pb-1 pt-1 `}>
                                                    <span className='!text-slate-700 font-medium '>Seller:</span> <Link to={`/shop/preview/${data?.shop._id}`}>{data?.shop?.name}</Link>

                                                </h3>

                                                <div className='flex items-center gap-3 '>
                                                    <Rating itemStyles={myStyles} className='h-[30px] w-[30px] text-green-500' style={{ maxWidth: 100 }} readOnly value={Math.ceil(data.ratings)} />
                                                    <p className='text-[14px] font-semibold text-blue-500'>( {data?.reviews?.length} ratings)</p>
                                                </div>

                                                {
                                                    data?.customize ? <h2 className='text-slate-700'>(Customizabe as per Customer request)</h2> : ""
                                                }


                                                {/* <p className='mt-3'>{data?.description}</p> */}
                                                <div className='flex pt-1'>

                                                    <h4 className={`${styles.productDiscountPrice} mt-1`}>₹{currentVariant?.afterDiscountPrice ? currentVariant?.afterDiscountPrice : data?.afterDiscountPrice}</h4>
                                                    <h3 className={`${styles.price} !mt-1 `}>
                                                        ₹{currentVariant?.originalPrice || data?.originalPrice}
                                                    </h3>

                                                    {data?.dicountType === "Flat" ? <p className='mt-1 ml-3 font-bold text-green-800'>Flat ₹{data.discountAmount} off</p> : <p className='mt-1 ml-3 font-bold text-green-800'>{data?.discountAmount}% off</p>}
                                                </div>

                                                <div className='mt-2'>

                                                    {attributeKeys.map(key => (
                                                        <div key={key} className="mb-4">
                                                            <label className="block text-lg text-slate-600 font-semibold mb-2">Select {key}:</label>
                                                            <div className="flex gap-2">
                                                                {[...new Set(data?.variants.map(variant => variant.attributes.find(attr => attr.key === key)?.value))]
                                                                    .filter(Boolean)
                                                                    .map(value => (
                                                                        <button
                                                                            key={value}
                                                                            onClick={() => handleAttributeChange(key, value)}
                                                                            className={`py-1 px-3 rounded-md ${selectedAttributes[key] === value
                                                                                ? 'bg-gray-300 border-black border-2'
                                                                                : 'bg-gray-100 border-gray-300 border'
                                                                                } cursor-pointer flex items-center justify-center`}
                                                                        >
                                                                            {key === 'Color' ? (
                                                                                <span
                                                                                    className="w-5 h-5 !rounded-full"
                                                                                    style={{ backgroundColor: value }}
                                                                                />
                                                                            ) : (
                                                                                value
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {invalidCombo && (
                                                    <div className="mt-4 text-red-500">
                                                        <p>Selected combination is not available.</p>
                                                    </div>
                                                )}

                                                <div className='flex items-center mt-2 justify-between pr-3'>
                                                    <div>
                                                        <button className='bg-gradient-to-r from-teal-500 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={decreamentCount}>-</button>
                                                        <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[10px]'>{count}</span>
                                                        <button className='bg-gradient-to-r from-teal-500 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={increamentCount}>+</button>
                                                    </div>
                                                </div>

                                                {/* coupon */}
                                                <div className=' py-2 mt-1'>
                                                    <div className='text-slate-700 font-medium text-base'>
                                                        <h1>Offers for you</h1>
                                                    </div>



                                                    <div className="bg-[#e7e7e8] mt-2 p-2 border rounded-md">
                                                        {allCoupons && allCoupons
                                                            .filter(coupon => {
                                                                const eligibleItems = cart.filter(
                                                                    item => coupon.couponCategory === "All" || item.category === coupon.couponCategory
                                                                );

                                                                const eligiblePrice = eligibleItems.reduce(
                                                                    (acc, item) => acc + item.qty * item.afterDiscountPrice,
                                                                    0
                                                                );

                                                                return eligiblePrice >= coupon.minPurchase; // Filter out non-eligible coupons
                                                            })
                                                            .map((coupon, index) => {
                                                                const handleCopy = () => {
                                                                    navigator.clipboard.writeText(coupon.couponCode)
                                                                        .then(() => {
                                                                            toast.success(`Coupon code ${coupon.couponCode} copied to clipboard!`);
                                                                        })
                                                                        .catch(err => {
                                                                            toast.error('Failed to copy text: ', err);
                                                                        });
                                                                }; // Check if this coupon is applied

                                                                return (
                                                                    <div key={index} className="mb-2">
                                                                        <h3 className="text-sm font-semibold text-gray-500">
                                                                            Extra ₹{coupon?.discountAmount} Off on orders above ₹{coupon?.minPurchase}
                                                                        </h3>

                                                                        <p className="text-sm text-gray-600">
                                                                            Expires on {formatDate(coupon?.expireDate)}
                                                                        </p>
                                                                        {coupon.couponType === 'First Order' && (
                                                                            <p className="text-sm text-green-700 italic">First time only</p>
                                                                        )}

                                                                        {coupon?.couponCategory !== "All" && (
                                                                            <p className="text-sm text-green-700 italic">This coupon only valid for {coupon?.couponCategory}</p>
                                                                        )}

                                                                        <div className="flex justify-between items-center mt-2">
                                                                            <div className="bg-green-100 border border-dashed border-gray-700 px-2 py-1 font-bold rounded-md">
                                                                                {coupon.couponCode}
                                                                            </div>

                                                                            <div className="flex justify-between items-center mt-2">


                                                                                <div
                                                                                    className="border px-2 py-0.5 rounded-md text-blue-600 cursor-pointer border-blue-600"
                                                                                    onClick={handleCopy}
                                                                                >
                                                                                    Tap to Copy
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                );
                                                            })}
                                                    </div>

                                                </div>

                                                <div className='py-2 mt-1'>
                                                    <div className='text-slate-700 font-medium text-base'>
                                                        Return & Exchange Policy
                                                    </div>

                                                    <div className='text-slate-600 font-[450] mt-2 text-[12px]'>
                                                        <p className='leading-[14px]'>This product is eligable for returns and size reolacement. Plese initiate return/replacement from the "My Orders" section in the app within 7 days of delivery. Please ensure the product is in its original condition with all tags attached.</p>
                                                    </div>

                                                </div>

                                                <div className="py-2 mt-1">
                                                    {/* Product title */}
                                                    <div className="text-slate-700 font-medium text-base">Product Details</div>

                                                    {/* Product description */}
                                                    <div className="text-slate-600 font-[450] mt-2 text-[12px]">
                                                        {data?.description}
                                                    </div>

                                                    <h1 className='text-slate-700 font-medium text-base'>Highlights</h1>

                                                    {/* Product other details */}
                                                    {data?.otherDetails && (
                                                        <div className="text-slate-600 font-[450] mt-2 text-[12px]">
                                                            {data.otherDetails.map((detail, index) => (
                                                                <div key={index}>
                                                                    <span className="font-semibold text-[14px]">{detail.key}:</span> {detail.value}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className='flex'>
                                                    {
                                                        click ? <div className={`${styles.button} !bg-white !border-2 !border-red-500 !mt-3  !rounded !h-11 flex items-center`} onClick={() => removeFromWishlistHandler(data)} title='Remove from wishlist' >
                                                            <span className='text-[#070707] flex items-center'> <AiFillHeart size={20} color={click ? "red" : "#333"} className='mr-3' /> WISHLIST </span>
                                                        </div> :
                                                            <div className={`${styles.button} !bg-white !border-2 !border-red-500  !mt-3  !rounded !h-11 flex items-center`} onClick={() => addToWishlistHandler(data)} title='Add to wishlist' >
                                                                <span className='text-[#070707] flex items-center'> <AiFillHeart size={20} color={click ? "red" : "#333"} className='mr-3' /> WISHLIST </span>
                                                            </div>
                                                    }

                                                    {isAuthenticated ?
                                                        <div className={`${styles.button} !mt-3 !rounded !h-11 flex items-center ml-3`} onClick={() => addToCartHandler(data?._id)}>
                                                            <span className='text-[#fff] flex items-center'>Add to Cart <AiOutlineShoppingCart className='ml-1' /></span>
                                                        </div> :
                                                        <div className={`${styles.button} !mt-3 !rounded !h-11 flex items-center ml-3`} onClick={() => toast.info("You need to log in to add items to the cart.")} >
                                                            <span className='text-[#fff] flex items-center'>Add to Cart <AiOutlineShoppingCart className='ml-1' /></span>
                                                        </div>
                                                    }
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
                                                    <p className='text-slate-700'>Expected Delivery Date {date.toDateString()}</p>
                                                </div>

                                                <div className=' mt-3 flex mr-3'>
                                                    <CiLocationOn size={20} />
                                                    <p className='ml-3 text-slate-700'> Deliver to {user?.name} - {user?.addresses[0]?.address1} {user?.addresses[0]?.zipCode}</p>
                                                </div>

                                                <div className='mt-3 flex'>
                                                    <TbMoneybag size={20} className='mr-3 text-yellow-600' />
                                                    <p className='text-slate-700'>Pay On Delivery Available</p>
                                                </div>

                                                <div className='mt-3 flex  item-center gap-3 text-slate-700'>
                                                    <div className='flex items-center'>
                                                        <img src={insurence} alt='' height={60} width={30} />

                                                    </div>

                                                    <div className='text-slate-600 mt-1  '>
                                                        <p>100% Original Products</p>
                                                        <p>With Assured Brand Warrenty</p>
                                                    </div>
                                                </div>

                                                <div className='flex items-center pt-8'>
                                                    <img src={`${data?.shop?.avatar}`} alt='' className='w-[50px] h-[50px] rounded-full mr-2 ' />
                                                    <div className='pr-8 text-slate-700'>
                                                        <Link to={`/shop/preview/${data?.shop._id}`}>
                                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                                {data?.shop?.name}
                                                            </h3>
                                                        </Link>

                                                        <h5 className='pb-3 text-[15px] text-slate-700'>({averageRating}/5)Ratings</h5>
                                                    </div>
                                                    <Link to={`/shop/preview/${data?.shop._id}`} >
                                                        <div className={`${styles.button} text-slate-700 bg-[#6443d1] !mt-4 !rounded h-11`} onClick={handleMessageSubmit}>
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
                    </>
                )
            }

        </div>
    )
}


const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
    const [active, setActive] = useState(1)

    return (
        <div>
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
        </div>

    )
}

export default ProductDetails










