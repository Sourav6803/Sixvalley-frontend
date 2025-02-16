import React, { useEffect, useState } from "react";
import pendingImg from "./icon/time.png";
import confirmedImg from "./icon/shopping-bag.png";
import packagingImg from "./icon/package-box.png";
import outForDeliveryImh from "./icon/delivery-bike.png";
import delivredImg from "./icon/products.png";
import returnedImg from "./icon/cancel.png";
import rejectedImg from "./icon/rejected.png";
import cancledImg from "./icon/cancelled.png";

const OrderStatus = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const stats = [
    { title: "Pending", count: 20, color: "text-blue-400", img: pendingImg },
    {
      title: "Confirmed",
      count: 20,
      color: "text-green-400",
      img: confirmedImg,
    },
    {
      title: "Packaging",
      count: 20,
      color: "text-yellow-400",
      img: packagingImg,
    },
    {
      title: "Delivered",
      count: 20,
      color: "text-green-400",
      img: delivredImg,
    },
    {
      title: "Out For Delivery",
      count: 20,
      color: "text-blue-400",
      img: outForDeliveryImh,
    },
    { title: "Returned", count: 20, color: "text-blue-400", img: returnedImg },
    { title: "Canceled", count: 20, color: "text-red-400", img: cancledImg },
    {
      title: "Failed To Deliver",
      count: 20,
      color: "text-blue-400",
      img: rejectedImg,
    },
  ];
  return (
    <div
      className={`w-full p-2 mt-1 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border min-h-[12vh] cursor-pointer bg-slate-200 rounded-lg flex items-center justify-between p-3 hover:scale-105 transform transition-transform duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={stat.img}
                alt={stat.title}
                className="h-7 ml-3 animate-bounce"
              />
              <h2 className="text-lg font-medium">{stat.title}</h2>
            </div>
            <div className={`${stat.color} font-semibold text-xl mr-3`}>
              {stat.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
