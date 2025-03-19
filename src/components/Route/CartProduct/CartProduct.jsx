// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/styles";
// import ProductCard from "../ProductCard/ProductCard.jsx"


// const CartProduct = () => {
//   const [data, setData] = useState([]);

//   const { cart } = useSelector(state => state.cart)


//   useEffect(() => {
//     setData(cart)
//   }, [cart]);

//   return (

//     data?.length && <div className={`mt-3 pb-2`} style={{ backgroundImage: "url('https://i.pinimg.com/1200x/3b/73/3d/3b733d7ff58aa5478e8b53accc9511ee.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
//       <div className={`${styles.section}`}>
//         <div className="  pb-1 flex justify-between">
//           <div className=' mt-2'>
//             <h1 className="text-white font-semibold">{cart?.length} Items in your Cart</h1>
//           </div>
//           <div>
//             <button className={` ml-auto text-white !bg-blue-700 !w-[100px] !h-[30px] rounded-md mt-2`}>Go To Cart</button>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-[10px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px] mb-6 border-0">
//           {
//             data && data.length !== 0 && (
//               <>
//                 {data && data?.map((i, index) => <ProductCard data={i} key={index} />)}
//               </>
//             )
//           }
//         </div>
//       </div>
//     </div>

//   );
// };

// export default CartProduct;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useNavigate } from "react-router-dom";

const CartProduct = () => {
  const [data, setData] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    setData(cart);
  }, [cart]);

  return (
    data?.length > 0 && (
      <div 
        className="mt-3 pb-6 bg-gradient-to-b from-blue-900 via-gray-900 to-black"
      >
        <div className={`${styles.section} px-2 md:px-8 lg:px-12`}>
          {/* Header */}
          <div className="pb-4 flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-white text-xl font-semibold">
              🛒 {cart?.length} Items in Your Cart
            </h1>
            <button
              className="mt-3 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-md"
              
            >
              Go to Cart →
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data?.map((item, index) => (
              <ProductCard data={item} key={index} />
            ))}
          </div>

          {/* Empty State (If somehow empty) */}
          {data.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-300 text-lg">Your cart is empty! 🛒</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default CartProduct;
