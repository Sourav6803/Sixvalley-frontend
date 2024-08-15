import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import Loader from "../../../pages/Loader";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';



const Trending = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state?.products)
  const [loading, setLoading] = useState(false)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    }
  };

  useEffect(() => {
    setLoading(true)
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.discountPercentage - a.discountPercentage);
    const firstFive = sortedData && sortedData?.slice(0, 4);
    setData(firstFive);
    setLoading(false)
  }, [allProducts]);


  return (
    <div className={`${styles.section} `}>
      <div className='mt-5 bg-white flex'>
        <p className='text-[16px] font-semibold ' style={{ padding: "15px 10px" }}>Bachat Bazaar</p>
        <img src="https://freepngimg.com/thumb/emoji/47426-8-smiley-hd-free-transparent-image-hd-thumb.png" alt="" height={3} width={30} />
        <button className={` ml-auto text-white !bg-blue-700 !w-[100px] !h-[30px] rounded-md mt-2`}>View All</button>
      </div>
      <hr />
      {
        allProducts && <Carousel responsive={responsive}
          swipeable={false}
          draggable={false}
          centerMode={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          showDots={false}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px" >

          {
            allProducts && data?.map((product, key) => (
              <div className='text-center ' style={{ textAlign: "center", padding: "25px 15px" }} key={key}>

                <Link to={`/product/${product?._id}`}><img key={key} src={product?.images[0]} alt='' style={{ width: "auto", height: "100px" }} /></Link>
                <p className='font-semibold text-[14px]'>{product?.name.slice(0, 17)}...</p>
                <p className='text-green-800 text-[12px]'>You will get {product.discountPercentage}% Off</p>
                <p className='text-slate-600 text-[12px]'>{product?.tags}</p>

              </div>
            ))
          }
        </Carousel>
      }
    </div>
  );
};

export default Trending;
