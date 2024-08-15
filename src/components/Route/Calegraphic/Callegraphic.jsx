import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"
import Loader from "../../../pages/Loader";
import Countdown from 'react-countdown';
// import images from "./imggg.jpg"
// import bestDeal from "./bestdeal.png"


const Callegraphic = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state?.products)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    const birhdayGift = allProducts && allProducts?.filter(product => product.tags === 'Callegraphic Art')
    
    setData(birhdayGift);
    setLoading(false)
  }, [allProducts]);




  return (
//mt-3 pb-2
// {`${styles.section}`}
    <div className={`flex justify-between ml-auto mr-auto w-full lg:mt-0 lg:ml-0 overflow-y-auto`} >
      {
        loading ? <div className="flex  justify-center "> <Loader /></div> :
          <div className='p-[12px 8px] text-center'>
            <div className={`${styles.heading} flex justify-center items-center  `}>
               <h5 className="mr-3" >Callegraphic Name </h5>
               {/* <img src={bestDeal} alt="" width={130} height={100} className="mr-3"/> */}
              {/* <Countdown date={Date.now() + 5.04e+7} renderer={renderer}  className="ml-3"/> */}
            </div>
            <div className="flex justify-between overflow-x-auto ">
              {
                data && data.length !== 0 && (
                  <>
                    {data && data?.map((i, index) => <ProductCard data={i} key={index} />)}
                  </>
                )
              }
            </div>
            {
              isLoading && <div className="flex justify-center"><Loader /></div>
            }
          </div>
      }
    </div>

  );
};

export default Callegraphic;





