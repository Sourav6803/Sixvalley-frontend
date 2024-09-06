import React from 'react'
import FashionIng from "../../Assests/w-fashion.jpg"
import AccessoriesImg from "../../Assests/w-accessories.jpg"
import JewellaryImg from "../../Assests/jewellary.jpg"
import FootwearImg from "../../Assests/footwear.jpg"

const WomensFashion = () => {
  return (
    <div className=" py-1 ">

      <div className=" mb-3 p-2">
        <h2 className="text-lg text-slate-700 font-bold">Latest trends in Womemen's fashion & accessories</h2>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 ">

        <div className="rounded-lg flex flex-col items-center p-1">
          <img src={FashionIng} alt="Men's t-shirts" className="w-full h-full object-cover mb-2 rounded-sm" />
          <h3 className="text-sm font-semibold">Women's Top wear</h3>       
        </div>


        <div className="  rounded-lg flex flex-col items-center p-1">
          <img src={JewellaryImg} alt="Men's trousers" className="w-full h-full object-cover mb-2 rounded-sm" />
          <h3 className="text-sm font-semibold">Women's Jewellery</h3>
          
        </div>


        <div className=" p-1 rounded-lg flex flex-col items-center ">
          <img src={AccessoriesImg} alt="Men's wallets" className="w-full h-full object-cover mb-2 rounded-sm" />
          <h3 className="text-sm font-semibold">Women's Accessories</h3>
          
        </div>

        <div className=" p-1 rounded-lg flex flex-col items-center">
          <img src={FootwearImg} alt="Men's belts" className="w-full h-full object-cover mb-2 rounded-sm" />
          <h3 className="text-sm font-semibold">Women's Footwear</h3>
         
        </div>
      </div>
    </div>
  )
}

export default WomensFashion