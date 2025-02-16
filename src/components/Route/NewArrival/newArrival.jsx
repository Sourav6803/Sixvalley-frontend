import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"
import Loader from "../../../pages/Loader";
import Marquee from "react-fast-marquee";




const NewArrival = () => {
  const [data, setData] = useState([]);

  const { allProducts, isLoading } = useSelector((state) => state?.products)
  const { allBrand } = useSelector((state) => state?.brand)

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const firstFive = sortedData && sortedData?.slice(0, 6);
    setData(firstFive);
  }, [allProducts]);



  return (
    <>

      <div className="relative overflow-hidden h-[80px]">
        <Marquee
          speed={20}
          gradient={false}
          pauseOnHover={true}
        >
          {
            allBrand?.map((brand) => (
              <div key={brand?._id} className="flex items-center justify-center flex-col mb-10 space-y-8 py-2 gap-2">
                <div className="w-16 h-16  overflow-hidden bg-white p-2 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <img
                    src={brand?.brandLogo?.url}
                    alt={brand?.brandName}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Add text or additional content here if needed */}
              </div>
            ))
          }
        </Marquee>
      </div>
      <div className="mt-3 pb-1" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/pastel-color-gradient-abstract-background_608068-581.jpg?w=996')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        <div className={`${styles.section}`}>

          <div className={`${styles.heading}`}>
            <h1>New Arrivals</h1>
          </div>
          <div className="grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-1 border-0">
            {
              data && data.length !== 0 && (
                <>
                  {data && data?.map((i, index) => <ProductCard data={i} key={index} />)}
                </>
              )
            }
          </div>
          {isLoading && <div className="flex justify-center"><Loader /></div>}
        </div>
      </div>
    </>
  );
};

export default NewArrival;