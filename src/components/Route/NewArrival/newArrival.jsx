import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"
import Loader from "../../../pages/Loader";






const NewArrival = () => {
  const [data, setData] = useState([]);
 
  const { allProducts, isLoading } = useSelector((state) => state?.products)
  
//   useEffect(()=>{
//     const fetchData = async() => {
//         const response = await axios.get(`${server}/product/get-all-products`)
//         const data = await response.json()
//         console.log(data)
//     }
//     fetchData()
//   },[])
  

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) );

    const firstFive = sortedData && sortedData?.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);



  return (
    <div className="mt-3 pb-1" style={{backgroundImage: "url('https://img.freepik.com/premium-photo/pastel-color-gradient-abstract-background_608068-581.jpg?w=996')" , backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
      <div className={`${styles.section}`}>
      
        <div className={`${styles.heading}`}>
          <h1>New Arrivals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
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
  );
};

export default NewArrival;