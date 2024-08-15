import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"
import Loader from "../../../pages/Loader";





const TopDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state?.products)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => {
      let percentageA = ((a.originalPrice - a.discountPrice) / a.originalPrice) * 100
      let percentageB = ((b.originalPrice - b.discountPrice) / b.originalPrice) * 100
      return percentageA - percentageB
    });

    const firstFive = sortedData && sortedData?.slice(0, 4);
    setData(firstFive);
    setLoading(false)

  }, [allProducts]);

  //  style={{backgroundImage: "url('https://media.istockphoto.com/id/1180447175/vector/rangoli-dark-red-maroon-colored-grunge-background-diwali-greeting-with-one-small-diya-at-the.jpg?s=2048x2048&w=is&k=20&c=f7wcjVwr8LK45i26-wI7TuHTVeUEylfDN36IXhqq5fM=')" , backgroundSize: "cover", backgroundRepeat: "no-repeat"}}

  return (
    <div className="mt-3 pb-3  " style={{ backgroundImage: "url('https://img.freepik.com/free-vector/illustration-burning-diya-happy-diwali-holiday-background_1035-20047.jpg?size=626&ext=jpg&ga=GA1.1.154591421.1690217633&semt=ais')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
      <div className={`${styles.section} `} >
        <div className={`${styles.heading}`}>
          <h1 className="text-white">Top Deals</h1>
        </div>

        <div className=" border-gray-800 grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]  border-0 "  >
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
    </div>
  );
};

export default TopDeals;
