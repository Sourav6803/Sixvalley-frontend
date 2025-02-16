import React from 'react'
import { HelpCircle, Youtube } from "lucide-react";

const TopSection = ({ setSingleListingOpen}) => {
  return (
    <div className="p-3 w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Upload Product</h2>
          <div className="flex items-center gap-2">
            <button className="border hidden px-4 py-2 md:flex items-center gap-2 rounded-md text-sm ">
              <Youtube size={18} /> Learn how to upload products
            </button>
            <button className="border px-4 py-2 flex items-center gap-2 text-sm rounded-md">
              <HelpCircle size={18} /> Need Help?
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Have unique products to sell? Choose from the options below
        </p>

        <div className="flex gap-4 mb-6">
          
          <button onClick={()=> setSingleListingOpen(true)} className={`px-4 py-2 text-sm rounded-md bg-blue-600 text-white `}>
            Add Single Product
          </button>
        </div>

       

        <div className="border rounded-md p-4 grid grid-cols-2 sm:grid-cols-2 gap-1 md:gap-4 sm:w-[50%] w-full">
          <div className="text-center">
            <p className="md:text-base text-sm">Total Uploads Done</p>
            <p className="text-base font-bold">47</p>
          </div>

          
          
          <div className="text-center">
            <p className="md:text-base text-sm ">Using Single Uploads</p>
            <p className="text-base font-bold">40</p>
          </div>
        </div>
      </div>
  )
}

export default TopSection