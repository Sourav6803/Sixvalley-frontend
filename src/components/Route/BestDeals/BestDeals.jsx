
import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from 'react-countdown';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loader from "../../../pages/Loader";
import { server } from "../../../server";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard/ProductCard";

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
    items: 1,
  },
};

const BestDeals = () => {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${server}/flashDeal/get-all-flashDeal`)
      .then(res => {
        const deals = res.data?.data || [];
        const activeDeal = deals.find(deal => deal.publish === true);
        setDeal(activeDeal);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="flex items-center justify-center bg-[#1455ac] space-x-1 p-3 rounded-md">
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xl md:text-xl font-bold rounded-md py-1 px-1.5 bg-blue-200">{days}</span>
        <span className="text-[10px] sm:text-sm text-white font-medium mt-1">Days</span>
      </div>
      <span className="text-2xl sm:text-4xl md:text-5xl font-bold mt-[-25px] text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xl md:text-xl font-bold rounded-md py-1 px-1.5 bg-blue-200">{hours}</span>
        <span className="text-[10px] sm:text-sm text-white font-medium mt-1">Hrs</span>
      </div>
      <span className="text-2xl sm:text-4xl md:text-5xl font-bold mt-[-25px] text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xl md:text-xl font-bold rounded-md py-1 px-1.5 bg-blue-200">{minutes}</span>
        <span className="text-[10px] sm:text-sm text-white font-medium mt-1">Min</span>
      </div>
      <span className="text-2xl sm:text-4xl md:text-5xl font-bold mt-[-25px] text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xl md:text-xl font-bold rounded-md py-1 px-1.5 bg-blue-200">{seconds}</span>
        <span className="text-[10px] sm:text-sm text-white font-medium mt-1">Sec</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="flex justify-center mt-10">
        <p>No active deals available.</p>
      </div>
    );
  }

  return (
    <div className="mt-1 bg-[#dbd8d8] bg-cover bg-no-repeat p-2">
      <div className="w-full p-2 flex  md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left md:mb-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold  md:mb-0 md:mr-4 text-blue-700">{deal?.name}</h2>
          <p className="text-[12px] sm:text-base text-gray-700">Hurry Up! The offer is limited. Grab it while it lasts</p>
        </div>
        <div>
          <Countdown date={new Date(deal.expireDate).getTime()} renderer={renderer} />
        </div>
      </div>
      <Carousel 
        responsive={responsive}
        swipeable={true}
        draggable={true}
        centerMode={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-10-px"
      >
        {deal.products.map((product, key) => (
          <div className='text-center' style={{ padding: "2px 2px" }} key={key}>
            <ProductCard data={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BestDeals;




