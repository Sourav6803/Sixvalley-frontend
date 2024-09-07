import React from 'react'
import MensTshirt from "../../Assests/Add a heading.jpg"
import Trouser from "../../Assests/Untitled design (2).jpg"
import wallet from "../../Assests/Untitled design (1).jpg"
import Belt from "../../Assests/belt.jpg"
import utsav from "../../Assests/utsav.jpg"

const HarDinUtsav = () => {
  return (
    <div className=" py-1 ">

      <div className=" mb-0 ">
        <img src={utsav} alt='utsav' className='w-full' />
      </div>


      <div className="grid grid-cols-3 md:grid-cols-4 gap-1 p-2">

        <div className="rounded-lg flex flex-col items-center p-1 bg-[#6D17CB]">
          <img src='https://image.made-in-china.com/202f0j00WGvYqUEFTTur/All-Season-Fashion-Leisure-Men-Jeans-Casual-Straight-Jean.webp' alt="Men's t-shirts" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold text-white">Men's Jeans</h3>
          <p className=" text-yellow-300">Starting ₹99</p>
        </div>


        <div className="rounded-lg flex flex-col items-center p-1 bg-[#6D17CB]">
          <img src="https://images.meesho.com/images/products/283008181/zz5np_512.webp" alt="Men's trousers" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold text-white">Handbags</h3>
          <p className="text-yellow-300">Starting ₹349</p>
        </div>


        <div className=" p-1 rounded-lg flex flex-col items-center bg-[#6D17CB]">
          <img src="https://img.freepik.com/free-photo/fashionforward-man-steps-out-blue-pants-fresh-white-sneakers_60438-3938.jpg" alt="Men's wallets" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold text-white">Men's Casual shoes</h3>
          <p className="text-yellow-300">Starting ₹299</p>
        </div>

        <div className=" p-1 rounded-lg flex flex-col items-center bg-[#6D17CB]">
          <img src="https://m.media-amazon.com/images/I/91zK1D0S5ML.jpg" alt="Men's belts" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold text-white">Pillow Covers</h3>
          <p className="text-yellow-300">Starting ₹149</p>
        </div>

        <div className="rounded-lg flex flex-col items-center p-1 bg-[#6D17CB]">
          <img src="https://m.media-amazon.com/images/I/91TGPmC2KWL._SX679_.jpg" alt="Men's t-shirts" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold text-white">Home Decoration</h3>
          <p className=" text-yellow-300">Starting ₹149</p>
        </div>

        <div className="rounded-lg flex flex-col items-center p-1 bg-[#6D17CB]">
          <img src="https://t3.ftcdn.net/jpg/00/63/25/12/360_F_63251258_XMxdxQWrRiv3eY4VatQY5iDwV7lrOiPm.jpg" alt="Men's t-shirts" className="w-full h-full object-cover mb-2" />
          <h3 className="text-sm font-semibold text-white">Cooking Essential</h3>
          <p className=" text-yellow-300">Starting ₹99</p>
        </div>
      </div>

      <hr className='m-3' />
    </div>
  )
}

export default HarDinUtsav