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


  return (

    <>
      {loading && (
                <div className="flex justify-center items-center py-6">
                    <Loader />
                    <p className="ml-2 text-sm text-gray-500">Loading ...</p>
                </div>
            )}

      <div className="bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/illustration-burning-diya-happy-diwali-holiday-background_1035-20047.jpg?size=626&ext=jpg&ga=GA1.1.154591421.1690217633&semt=ais')" }} >
        {
          isLoading && <div className="flex justify-center"><Loader /></div>
        }
        <div className="p-2">
          <div className={`${styles.heading}`}>
            <h1 className="text-white">Top Deals</h1>
          </div>

          <div className="border-gray-800 grid grid-cols-2 gap-[3px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] border-0">
            {
              data && data.length !== 0 && (
                <>
                  {data?.map((i, index) => <ProductCard data={i} key={index} />)}
                </>
              )
            }
          </div>
        </div>
      </div>
    </>


  );
};

export default TopDeals;
