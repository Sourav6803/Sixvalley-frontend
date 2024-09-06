import React from 'react'
import MensTshirt from "../../Assests/Add a heading.jpg"
import Trouser from "../../Assests/Untitled design (2).jpg"
import wallet from "../../Assests/Untitled design (1).jpg"
import Belt from "../../Assests/belt.jpg"

const MensFashion = () => {
  
  return (
    <div className=" py-1 ">

      <div className="text-center mb-6 p-2">
        <h2 className="text-lg font-bold">Starting ₹99 | Latest trends in men's fashion & accessories</h2>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 ">

        <div className="rounded-lg flex flex-col items-center p-1">
          <img src={MensTshirt} alt="Men's t-shirts" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold">Men's t-shirts</h3>
          <p className="text-gray-500">Starting ₹99</p>
        </div>


        <div className="  rounded-lg flex flex-col items-center p-1">
          <img src={Trouser} alt="Men's trousers" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold">Men's trousers</h3>
          <p className="text-gray-500">Starting ₹149</p>
        </div>


        <div className=" p-1 rounded-lg flex flex-col items-center ">
          <img src={wallet} alt="Men's wallets" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold">Men's wallets</h3>
          <p className="text-gray-500">Starting ₹99</p>
        </div>

        <div className=" p-1 rounded-lg flex flex-col items-center">
          <img src={Belt} alt="Men's belts" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold">Men's belts</h3>
          <p className="text-gray-500">Starting ₹99</p>
        </div>
      </div>
    </div>
  )
}

export default MensFashion