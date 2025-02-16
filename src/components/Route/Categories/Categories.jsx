import React from "react";

import { brandingData } from "../../../static/data";

const Categories = () => {
  return (
    <>
      <div className={` bg-red-200 p-2 !border-spacing-8 sm:block `}>
        <div
          className={`branding flex justify-between  w-full shadow-sm bg-white p-2 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className="flex items-center flex-wrap overflow-hidden"
                key={index}
              >
                <div className="flex pl-5 h-15 w-15 ">{i.icon}</div>
                <div className="px-1 overflow-hidden ">
                  <p className="text-[10px] md:text-base font-semibold text-gray-700 text-center group-hover:text-blue-600 ">
                    {i.title}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <section className="w-full p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-6">
            {brandingData &&
              brandingData.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                 
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                    {item.icon}
                  </div>

                  
                  <p className="text-sm md:text-base font-semibold text-gray-700 text-center group-hover:text-blue-600">
                    {item.title}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Categories;
