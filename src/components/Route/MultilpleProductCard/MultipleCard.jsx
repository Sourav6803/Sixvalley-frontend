import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"
import { backend_url } from '../../../server';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from 'react-toastify';
import { addTocart } from '../../../redux/actions/cart';
import Ratings from '../../Products/Ratings';


const ProductCard = ({ data, isEvent }) => {
    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)
    const { wishlist } = useSelector(state => state?.wishlist)
    const { cart } = useSelector(state => state?.cart)
    const [count, setCount] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

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

    const discountPercentage = Math.ceil(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)



    return (
        <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
            <div className='flex justify-end'></div>

            <Link to={`${isEvent === true ? `/product/${data?._id}?isEvent=true` : `/product/${data?._id}`}`}>
                <img src={`${backend_url}${data?.images[0]}` ? `${backend_url}${data?.images[0]}` : ""} alt='' className='w-full h-[170px] object-contain' />
            </Link>
            <Link to={`/shop/preview/${data.shop._id}`}>
                <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
            </Link>
            <Link to={`/product/${data?._id}`}>
                <h4 className='pb-3 font-[500]'>
                    {data?.name?.length > 40 ? data.name.slice(0, 20) + "..." : data.name}
                </h4>

                <div className='flex'>
                    <Ratings rating={data?.ratings} />
                </div>

                <div className='py-2 flex items-center justify-between'>
                    <div className='flex'>
                        <h5 className={`${styles.productDiscountPrice}`}>
                            ₹{data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
                        </h5>
                        <h4 className={`${styles.price}`}>
                            ₹{data.originalPrice ? data.originalPrice : null}
                        </h4>
                    </div>
                    <span className='font-[600] text-[17px] text-[#267c3d]'>
                        {data.sold_out} sold
                    </span>

                </div>
                <div className='mb-3 text-green-700'>
                    <h5> {discountPercentage}% off</h5>
                </div>
            </Link>

            {/* Side option */}
            <div className=''>
                {
                    click ? (
                        <AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5' color={click ? "red" : "#333"} onClick={() => removeFromWishlistHandler(data)} title='Remove from wishlist' />
                    ) : (
                        <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5' color={click ? "red" : "#333"} onClick={() => addToWishlistHandler(data)} title='Add to wishlist' />
                    )
                }

                <AiOutlineEye size={22} className='cursor-pointer absolute right-2 top-14' color="#333" onClick={() => setOpen(!open)} title='Quick View' />
                <AiOutlineShoppingCart size={25} className='cursor-pointer absolute right-2 top-24' color="#444" onClick={() => addToCartHandler(data?._id)} title='Add to cart' />

                {
                    open ? (
                        <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
                    ) : ""
                }
            </div>



        </div>
    )
}

export default ProductCard