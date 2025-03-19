
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart, toggleCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import emptyCart from "../../Assests/empty-cart.png"
import insurence from "../../Assests/insurance.png"


const Cart = () => {
    const { cart } = useSelector((state) => state?.cart);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const handleToggleCart = () => {
        dispatch(toggleCart()); // Dispatch the action to toggle the cart state
      };
    
    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    };

    const shipping = cart?.reduce((acc, item) => acc + item?.shippingCost, 0);

    const totalOriginalPrice = cart?.reduce(
    (acc, item) =>
        acc +
        item?.qty * (item?.currentVariant?.originalPrice ?? item?.originalPrice),
    0
    );

    const totalPrice = cart?.reduce(
      (acc, item) =>
        acc +
        item?.qty *
          (item?.currentVariant?.afterDiscountPrice ??
            item?.afterDiscountPrice),
      0
    );

    const totalDiscountPrice = cart?.reduce(
      (acc, item) =>
        acc +
        item?.qty *
          ((item?.currentVariant?.originalPrice ?? item?.originalPrice) -
            (item?.currentVariant?.afterDiscountPrice ??
              item?.afterDiscountPrice)),
      0
    );

    let fixedDeliveryCharge = shipping;
    const totalCartPrice = totalPrice + fixedDeliveryCharge;

    const quantityChangeHandler = (data) => {
      setLoading(true);
      dispatch(addTocart(data));
      setLoading(false);
    };

    return (
        <div id="screen" onClick={handleToggleCart} className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-[1000]">
            {
                !loading && <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">

                    {cart && cart.length === 0 ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <div className="flex w-full place-content-between pt-5 pr-5 fixed top-3 right-3">
                                <div>
                                    <h3>Cart</h3>
                                </div>
                                <div className="border border-blue-600 rounded-md px-2 py-1 hover:border-2">
                                    <RxCross1
                                        size={25}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent bubbling
                                            handleToggleCart();
                                          }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h5 className="flex justify-center text-xl font-bold">Your Cart is empty!</h5>
                                <img src={emptyCart} alt="" />
                                <Link to='/products'><button className={` flex items-center justify-center  text-white !bg-blue-700  rounded-md py-1 whitespace-nowrap px-3`}>Shop Products</button></Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className="flex w-full justify-between pt-5 px-5">
                                    <div className={`${styles.noramlFlex} `}>
                                        <IoBagHandleOutline size={25} />
                                        <h5 className="pl-2 text-[20px] font-[500]">
                                            {cart && cart?.length} items
                                        </h5>
                                    </div>
                                    <RxCross1
                                        size={25}
                                        className="border border-blue-600 rounded-md px-2 py-1 hover:border-2"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent bubbling
                                            handleToggleCart();
                                          }}
                                    />
                                </div>
                                {/* Item length */}


                                {/* cart Single Items */}
                                <br />
                                <div className="w-full border-t">
                                    {cart &&
                                        cart?.map((i, index) => (
                                            <CartSingle
                                                key={index}
                                                data={i}
                                                quantityChangeHandler={quantityChangeHandler}
                                                removeFromCartHandler={removeFromCartHandler}
                                            />
                                        ))}
                                </div>
                            </div>



                            <div className="px-5 mb-3">
                                {/* checkout buttons */}
                                <div className="p-1 mb-3">
                                    <div className="pl-1 mb-2">
                                        <h1 className="text-slate-700 text-xl font-medium">Price Details</h1>
                                    </div>

                                    <div className="px-1  flex items-center justify-between">
                                        <p className="text-slate-700 font-medium">Price ({cart?.length})</p>
                                        <p className="text-slate-700 font-medium">₹{totalOriginalPrice}</p>
                                    </div>

                                    <div className="px-1  flex items-center justify-between">
                                        <p className="text-slate-700 font-medium">Discount</p>
                                        <p className="text-green-700 font-medium">-₹{totalDiscountPrice}</p>
                                    </div>

                                    <div className="px-1  flex items-center justify-between">
                                        <p className="text-slate-600 font-medium whitespace-nowrap">Delivery charges</p>
                                        <h1 className="text-slate-600 font-medium flex items-center justify-center gap-1 ">
                                            {/* <span className="line-through" > ₹{cart?.length * 40}</span> */}
                                            {fixedDeliveryCharge === 0 ? (<p className="text-green-700 text-sm whitespace-nowrap">Free delivery</p>) : "₹"+ fixedDeliveryCharge}
                                        </h1>
                                    </div>

                                    <hr className="mt-2" />

                                    <div className="px-1  flex items-center justify-between">
                                        <p className="text-slate-00 font-medium">Total Amount</p>
                                        <p className="text-slate-900 font-medium">₹{totalCartPrice}</p>
                                    </div>

                                    <div className="px-1  flex items-center justify-between">
                                        <p className="text-green-700 font-medium">You will save ₹{totalDiscountPrice} on this order.</p>

                                    </div>

                                    <div className=" flex items-center justify-center mt-5 gap-2">
                                        <div className='flex items-center '>
                                            <img src={insurence} alt='' height={60} width={30} />

                                        </div>

                                        <div className='text-slate-600 mt-1  '>
                                            <p>100% Original Products</p>
                                            <p>With Assured Brand Warrenty</p>
                                        </div>
                                    </div>

                                </div>
                                <Link to="/checkout">
                                    <div
                                        className={`h-[45px]  flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                                    >
                                        <h1 className="text-[#fff] text-[18px] font-[600]">
                                            Checkout Now (₹{totalCartPrice})
                                        </h1>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}

                    {
                        loading && <h2>Loading...</h2>
                    }
                </div>
            }
        </div>
    );
};


const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
    const [value, setValue] = useState(data?.qty);
    
    const variant = data?.currentVariant ?? data; // Use currentVariant if available
    const totalPrice = variant?.afterDiscountPrice * value;

    const increment = () => {
        if (variant?.stock <= value) {
            toast.error("Product stock limited!");
        } else {
            setValue(value + 1);
            quantityChangeHandler({ ...data, qty: value + 1 });
        }
    };

    const decrement = () => {
        if (value > 1) {
            setValue(value - 1);
            quantityChangeHandler({ ...data, qty: value - 1 });
        }
    };

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <img
                    src={variant?.images?.[0]?.url ?? data?.images?.[0]?.url}
                    alt=""
                    className="w-[70px] h-min ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data?.name?.length >= 21 ? data?.name?.slice(0, 20) + "... " : data?.name}</h1>

                    

                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                        ₹{variant?.afterDiscountPrice} * {value}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 mt-2  p-2 rounded-md">
                        {/* Final Price */}
                        <h4 className="font-semiold text-base text-red-600">
                            ₹{totalPrice}
                        </h4>

                        {/* Original Price with Strike-through */}
                        <h3 className="text-gray-500 line-through text-md">
                            ₹{variant?.originalPrice}
                        </h3>

                        {/* Discount Label */}
                        {variant?.discountType === "Flat" ? (
                            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                                Flat ₹{variant?.discountAmount} off
                            </span>
                        ) : (
                            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                                {variant?.discountAmount}% off
                            </span>
                        )}
                    </div>


                    {/* ✅ Show Variant Attributes Correctly */}
                    {variant?.attributes?.length > 0 && (
                        <div className="mt-2">
                        
                            <div className=" p-1 mt-1">
                                {variant.attributes.map((attr, index) => (
                                    <div key={index} className="flex gap-x-5 pb-1 ">
                                        <span className="text-gray-700 font-medium">{attr.key}:</span>
                                        <span className="text-gray-900">{attr.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="flex items-center justify-center gap-x-10 mt-2">
                <div className="flex items-center justify-center">
                    <div
                        className="bg-[#e44343] border border-[#e4434373] rounded-md w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
                        onClick={increment}
                    >
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className="pl-[10px] pr-[10px]">{value}</span>
                    <div
                        className="bg-[#a7abb14f] rounded-md w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={decrement}
                    >
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>

                <div
                    className="px-3 border bg-red-500 rounded-md flex items-center justify-center text-white cursor-pointer"
                    onClick={() => removeFromCartHandler(data)}
                >
                    Remove
                </div>
            </div>
        </div>
    );
};




export default Cart;
