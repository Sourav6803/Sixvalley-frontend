import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from "../../../redux/actions/cart";
import { backend_url } from '../../../server';
import Cart from '../../Cart/Cart';

// const NewProductCard = ({ data, isEvent }) => {
//     const { cart } = useSelector((state) => state.cart);
//     const [count, setCount] = useState(1);
    
//     const dispatch = useDispatch();

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
//         <div className="flex items-center justify-between max-w-md  h-[140px] bg-white rounded-lg shadow-lg dark:bg-gray-800">
//             <div className="w-1/3 bg-cover flex item-center justify-center" >
//                 <Link to={`${isEvent === true ? `/product/${data?._id}?isEvent=true` : `/product/${data?._id}`}`}>
//                     <img src={`${data?.images && data?.images[0].url}`} alt='' className='w-full h-[100px] border-2  object-cover rounded-md' />
//                 </Link>
//             </div>

//             <div className="w-2/3 py-1 px-1 md:p-4">
//                 <h1 className="text-md font-medium text-gray-800 dark:text-white">{data?.name}</h1>

//                 <p className="mt-1 text-[12px] text-gray-600 dark:text-gray-400">{data?.description}</p>

//                 <div className="flex mt-1 item-center">
//                     <Rating value={Math.ceil(data?.ratings)} unratedColor="yellow" ratedColor="green" />
//                 </div>

//                 <div className="flex justify-between mt-1 item-center">
//                     <h1 className="text-lg font-[14px] text-gray-700 dark:text-gray-200 md:text-xl">₹{data?.afterDiscountPrice}</h1>

//                     <button onClick={() => addToCartHandler(data._id)} className="px-2 py-1 text-xs font-base text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"></button>
//                 </div>
//             </div>
//         </div>
//     )
// }

const NewProductCard = ({ data, isEvent }) => {
    const { cart } = useSelector((state) => state.cart);
    const [count, setCount] = useState(1);
    const [openCart, setOpenCart] = useState(false)
    const dispatch = useDispatch();

    const isItemInCart = cart && cart.find((i) => i._id === data._id);

    const addToCartHandler = () => {
        if (data.stock < count) {
            toast.error("Product stock limited!");
        } else {
            const cartData = { ...data, qty: count };
            dispatch(addTocart(cartData));
            toast.success("Item added to cart successfully!");
        }
    };

    return (
        <div className="flex items-center justify-between max-w-md h-[140px] bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-1/3 bg-cover flex items-center justify-center">
                <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <img src={`${data.images && data.images[0]?.url}`} alt={data.name} className="w-full h-[100px] border-2 object-cover rounded-md" />
                </Link>
            </div>

            <div className="w-2/3 py-1 px-1 md:p-4">
                <h1 className="text-md font-medium text-gray-800 dark:text-white">{data.name.length > 20 ? data.name.slice(0,19)+ '...' : data.name}</h1>
                <p className="mt-1 text-[12px] text-gray-600 dark:text-gray-400">{data.description.length > 20 ? data.description.slice(0,19)+ '...' : data.description}</p>
                <div className="flex items-center ">
                    <CustomRating value={Math.ceil(data.ratings)}  />
                </div>
                <div className="flex justify-between mt-1 items-center">
                    <h1 className="text-lg font-[14px] text-gray-700 dark:text-gray-200 md:text-xl">₹{data.afterDiscountPrice}</h1>
                    {isItemInCart ? (
                        <Link to="#" onClick={() => setOpenCart(true)}>
                            <button className="px-4 py-2 text-xs font-medium text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                                Go to Cart
                            </button>
                        </Link>
                    ) : (
                        <button onClick={addToCartHandler} className="px-4 py-2 text-xs font-medium text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>
    );
};


const CustomRating = ({ value }) => {
    const stars = [];
  
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= value ? 'yellow' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.317 7.125a1 1 0 00.95.69h7.493c.969 0 1.372 1.24.588 1.81l-6.065 4.204a1 1 0 00-.364 1.118l2.317 7.125c.3.921-.755 1.688-1.538 1.118l-6.065-4.204a1 1 0 00-1.175 0l-6.065 4.204c-.783.57-1.838-.197-1.538-1.118l2.317-7.125a1 1 0 00-.364-1.118L2.002 12.553c-.783-.57-.38-1.81.588-1.81h7.493a1 1 0 00.95-.69l2.316-7.125z"
          />
        </svg>
      );
    }
  
    return <div className="flex">{stars}</div>;
  };



export default NewProductCard