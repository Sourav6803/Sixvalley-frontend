import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"


const CartProduct = () => {
  const [data, setData] = useState([]);

  const { cart } = useSelector(state => state.cart)


  useEffect(() => {
    setData(cart)
  }, [cart]);

  // https://i.pinimg.com/1200x/3b/73/3d/3b733d7ff58aa5478e8b53accc9511ee.jpg

  return (
    
      data?.length && <div className={`mt-3 pb-2`} style={{ backgroundImage: "url('https://i.pinimg.com/1200x/3b/73/3d/3b733d7ff58aa5478e8b53accc9511ee.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className={`${styles.section}`}>
        <div className="  pb-1 flex justify-between">
          <div className=' mt-2'>
            <h1 className="text-white font-semibold">{cart?.length} Items in your Cart</h1>
          </div>
          <div>
            <button className={` ml-auto text-white !bg-blue-700 !w-[100px] !h-[30px] rounded-md mt-2`}>Go To Cart</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px] mb-6 border-0">
          {
            data && data.length !== 0 && (
              <>
                {data && data?.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
          }
        </div>
      </div>
    </div> 
    
  );
};

export default CartProduct;