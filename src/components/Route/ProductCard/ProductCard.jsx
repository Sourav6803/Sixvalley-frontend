

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import styles from '../../../styles/styles';
// import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
// import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"
// import { useDispatch, useSelector } from 'react-redux';
// import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
// import { toast } from 'react-toastify';
// import { addTocart } from '../../../redux/actions/cart';
// import { BsFillStarFill } from 'react-icons/bs';

// const ProductCard = ({ data, isEvent }) => {
//     const [click, setClick] = useState(false)
//     const [open, setOpen] = useState(false)
//     const { wishlist } = useSelector(state => state?.wishlist)
//     const { cart } = useSelector(state => state?.cart)
//     const [count, setCount] = useState(1);
//     const dispatch = useDispatch()

//     console.log("data product card : ", data)

//     useEffect(() => {
//         if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
//             setClick(true);
//         } else {
//             setClick(false);
//         }
//     }, [wishlist, data?._id]);

//     const removeFromWishlistHandler = (data) => {
//         setClick(!click);
//         dispatch(removeFromWishlist(data));
//     };

//     const addToWishlistHandler = (data) => {
//         setClick(!click);
//         dispatch(addToWishlist(data));
//     };

//     const addToCartHandler = (id) => {
//         const isItemExists = cart && cart?.find((i) => i?._id === id);
//         if (isItemExists) {
//             toast.error("Item already in cart!");
//         } else {
//             if (data.stock < count) {
//                 toast.error("Product stock limited!");
//             } else {
//                 const cartData = { ...data, qty: count };
//                 dispatch(addTocart(cartData));
//                 toast.success("Item added to cart successfully!");
//             }
//         }
//     };

//     return (
//         <div className='w-full h-[310px] bg-white rounded-lg shadow-sm relative cursor-pointer'>
//             <div className='p-2 border rounded-md shadow-md'>
//                 <Link to={`${`/product/${data?._id}`}`}>
//                     <img src={`${data?.images && data?.images[0]?.url}`} alt='' className='w-full h-[180px] object-cover rounded-md' />
//                 </Link>
//             </div>

//             <div className='p-1'>
//                 <Link to={`/shop/preview/${data?.shop?._id}`}>
//                     <p className={`${styles.shop_name} sm:text-base font-medium`}>{data?.shop?.name}</p>
//                 </Link>
//                 <Link to={`/product/${data?._id}`}>
//                     <p className='text-[12px] sm:text-base font-semibold'>
//                         {data?.name?.length > 20 ? data?.name?.slice(0, 20) + "..." : data.name}
//                     </p>

//                     <div className='py-1 flex items-center justify-between'>
//                         <div className='flex'>
//                             <p className={`${styles.productDiscountPrice} !text-[14px]`}>
//                                 ₹{data.afterDiscountPrice}
//                             </p>
//                             <p className={`${styles.price} !text-[12px]`}>
//                                 ₹{data.originalPrice ? data.originalPrice : null}
//                             </p>
//                         </div>
//                         <span className='font-[600] text-[12px] text-[#267c3d]'>
//                             {data?.sold_out} sold
//                         </span>
//                     </div>

//                     <div className='text-green-700 flex justify-between !text-[14px] font-semibold'>
//                         <div>
//                             {data?.dicountType === "Flat" ? <p>Flat ₹{data?.discountAmount} off</p> : <p>{data?.discountAmount}% off</p>}
//                         </div>
//                         <div className='flex bg-green-600 rounded-sm'>
//                             <span className="ml-1 text-white text-xs font-semibold rounded mr-1 mt-[2px]">{data?.ratings ? data?.ratings : 3}</span>
//                             <BsFillStarFill color='white' className='mt-[2px]' />
//                         </div>
//                     </div>
//                 </Link>

//                 <div className='text-white'>
//                     {click ? (
//                         <AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5 pr-1' color={click ? "red" : "white"} onClick={() => removeFromWishlistHandler(data)} title='Remove from wishlist' />
//                     ) : (
//                         <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5 pr-1' color={click ? "red" : "white"} onClick={() => addToWishlistHandler(data)} title='Add to wishlist' />
//                     )}
//                     {/* <AiOutlineEye size={22} className='cursor-pointer absolute right-2 top-14 pr-1' color="white" onClick={() => setOpen(!open)} title='Quick View' /> */}
//                     <AiOutlineShoppingCart size={25} className='cursor-pointer absolute right-2 top-14 pr-1' color="white" onClick={() => addToCartHandler(data?._id)} title='Add to cart' />

//                     {open && <ProductDetailsCard open={open} setOpen={setOpen} data={data} />}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCard















import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { toast } from 'react-toastify';
import { addTocart } from '../../../redux/actions/cart';
import { BsFillStarFill } from 'react-icons/bs';
import Loader from '../../../pages/Loader';

const ProductCard = ({ data }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const { wishlist } = useSelector(state => state.wishlist);
    const { cart } = useSelector(state => state.cart);
    const [count] = useState(1); // Keeping it constant for now
    const dispatch = useDispatch();

    useEffect(() => {
        setClick(wishlist?.some(i => i?._id === data?._id));
    }, [wishlist, data?._id]);

    const removeFromWishlistHandler = useCallback(() => {
        setClick(prev => !prev);
        dispatch(removeFromWishlist(data));
    }, [dispatch, data]);

    const addToWishlistHandler = useCallback(() => {
        setClick(prev => !prev);
        dispatch(addToWishlist(data));
    }, [dispatch, data]);

    const addToCartHandler = useCallback(() => {
        const isItemExists = cart?.find(i => i?._id === data?._id);
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
    }, [cart, data, count, dispatch]);

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const handleProductClick = (id) => {
        setLoading(true); // Start loading spinner
        setTimeout(() => {
            navigate(`/product/${id}`); // Navigate to product details page after delay
            
            setLoading(false); // Stop loading spinner after navigation
        }, 400); // Set delay for smooth loader (adjust time as needed)
    };

    return (
        // <div className='w-full h-[310px] bg-white rounded-lg shadow-sm relative cursor-pointer'>
        //     <div className='p-2 border rounded-md shadow-md'>
        //         <Link to={`/product/${data?._id}`}>
        //             <img
        //                 src={data?.images?.[0]?.url || '/path-to-placeholder.png'}
        //                 alt={data?.name || 'Product image'}
        //                 className='w-full h-[180px] object-cover rounded-md'
        //             />
        //         </Link>
        //     </div>

        //     <div className='p-1'>
        //         <Link to={`/shop/preview/${data?.shop?._id}`}>
        //             <p className={`${styles.shop_name} sm:text-base font-medium`}>{data?.shop?.name}</p>
        //         </Link>
        //         <Link to={`/product/${data?._id}`}>
        //             <p className='text-[12px] sm:text-base font-semibold'>
        //                 {data?.name?.length > 20 ? `${data?.name.slice(0, 20)}...` : data?.name}
        //             </p>
        //             <div className='py-1 flex items-center justify-between'>
        //                 <div className='flex'>
        //                     <p className={`${styles.productDiscountPrice} !text-[14px]`}>
        //                         ₹{data?.afterDiscountPrice}
        //                     </p>
        //                     <p className={`${styles.price} !text-[12px]`}>
        //                         {data?.originalPrice && `₹${data.originalPrice}`}
        //                     </p>
        //                 </div>
        //                 <span className='font-[600] text-[12px] text-[#267c3d]'>
        //                     {data?.sold_out} sold
        //                 </span>
        //             </div>
        //             <div className='text-green-700 flex justify-between !text-[14px] font-semibold'>
        //                 <div>
        //                     {data?.dicountType === "Flat" ? (
        //                         <p>Flat ₹{data?.discountAmount} off</p>
        //                     ) : (
        //                         <p>{data?.discountAmount}% off</p>
        //                     )}
        //                 </div>
        //                 <div className='flex bg-green-600 rounded-sm'>
        //                     <span className="ml-1 text-white text-xs font-semibold rounded mr-1 mt-[2px]">{data?.ratings || 3}</span>
        //                     <BsFillStarFill color='white' className='mt-[2px]' />
        //                 </div>
        //             </div>
        //         </Link>

        //         <div className='text-white'>
        //             {click ? (
        //                 <AiFillHeart
        //                     size={22}
        //                     className='cursor-pointer absolute right-2 top-5 pr-1'
        //                     color="red"
        //                     onClick={removeFromWishlistHandler}
        //                     title='Remove from wishlist'
        //                 />
        //             ) : (
        //                 <AiOutlineHeart
        //                     size={22}
        //                     className='cursor-pointer absolute right-2 top-5 pr-1'
        //                     onClick={addToWishlistHandler}
        //                     title='Add to wishlist'
        //                 />
        //             )}
        //             <AiOutlineShoppingCart
        //                 size={25}
        //                 className='cursor-pointer absolute right-2 top-14 pr-1'
        //                 onClick={addToCartHandler}
        //                 title='Add to cart'
        //             />
        //             {open && <ProductDetailsCard open={open} setOpen={setOpen} data={data} />}
        //         </div>
        //     </div>
        // </div>


        <>
            {loading && <div className='w-full h-full min-h-screen flex items-center justify-center'> <Loader /></div>} {/* Show loading spinner when navigating */}
            <div className="w-full h-[310px] bg-white rounded-lg shadow-sm relative cursor-pointer">
                <div className="p-2 border rounded-md shadow-md">
                    <div onClick={() => handleProductClick(data?._id)}> {/* Handle click for product navigation */}
                        <img
                            src={`${data?.images && data?.images[0]?.url}`}
                            alt=""
                            className="w-full h-[180px] object-cover rounded-md"
                        />
                    </div>
                </div>

                <div className="p-1">
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <p className={`${styles.shop_name} sm:text-base font-medium`}>{data?.shop?.name}</p>
                    </Link>
                    <p className="text-[12px] sm:text-base font-semibold">
                        {data?.name?.length > 20 ? data?.name?.slice(0, 20) + '...' : data.name}
                    </p>

                    <div className="py-1 flex items-center justify-between">
                        <div className="flex">
                            <p className={`${styles.productDiscountPrice} !text-[14px]`}>₹{data.afterDiscountPrice}</p>
                            <p className={`${styles.price} !text-[12px]`}>{data.originalPrice ? data.originalPrice : null}</p>
                        </div>
                        <span className="font-[600] text-[12px] text-[#267c3d]">{data?.sold_out} sold</span>
                    </div>

                    <div className="text-green-700 flex justify-between !text-[14px] font-semibold">
                        <div>
                            {data?.dicountType === 'Flat' ? (
                                <p>Flat ₹{data?.discountAmount} off</p>
                            ) : (
                                <p>{data?.discountAmount}% off</p>
                            )}
                        </div>
                        <div className="flex bg-green-600 rounded-sm">
                            <span className="ml-1 text-white text-xs font-semibold rounded mr-1 mt-[2px]">
                                {data?.ratings ? data?.ratings : 3}
                            </span>
                            <BsFillStarFill color="white" className="mt-[2px]" />
                        </div>
                    </div>

                    <div className="text-white">
                        {click ? (
                            <AiFillHeart
                                size={22}
                                className="cursor-pointer absolute right-2 top-5 pr-1"
                                color={click ? 'red' : 'white'}
                                onClick={() => removeFromWishlistHandler(data)}
                                title="Remove from wishlist"
                            />
                        ) : (
                            <AiOutlineHeart
                                size={22}
                                className="cursor-pointer absolute right-2 top-5 pr-1"
                                color={click ? 'red' : 'white'}
                                onClick={() => addToWishlistHandler(data)}
                                title="Add to wishlist"
                            />
                        )}
                        <AiOutlineShoppingCart
                            size={25}
                            className="cursor-pointer absolute right-2 top-14 pr-1"
                            color="white"
                            onClick={() => addToCartHandler(data?._id)}
                            title="Add to cart"
                        />

                        {open && <ProductDetailsCard open={open} setOpen={setOpen} data={data} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
