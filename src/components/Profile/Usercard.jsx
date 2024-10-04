import React from 'react'

const Usercard = () => {
  return (

    <div className="border-b py-2">
      <button

        className="flex justify-between w-full text-gray-700 font-medium"
      >
        Credit / Debit / ATM Card

      </button>

      <div className="pl-4 py-2">
        <p className="text-sm text-gray-600">Add your card details</p>
        {/* Card Form */}
        <div className="mt-2">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-md">
          Add Card
        </button>
      </div>

    </div>
  )
}

export default Usercard