// import React from 'react'
// import styles from '../../styles/styles'

// const CheckoutSteps = ({ active }) => {

//     return (
//         <div className='w-full flex items-center justify-center p-2'>
//             <div className="w-[100%] 800px:w-[50%] flex items-center justify-center flex-wrap ">
//                 <div className={`${styles.noramlFlex}`}>
//                     <div className={`${styles.cart_button} !bg-blue-700`}>
//                         <span className={`${styles.cart_button_text}`}>1.Address</span>
//                     </div>
//                     <div className={`${active > 1 ? "w-[18px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
//                         : "w-[18px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
//                         }`} />
//                 </div>

//                 <div className={`${styles.noramlFlex}`}>
//                     <div className={`${active > 1 ? `${styles.cart_button} !bg-blue-700` : `${styles.cart_button} !bg-blue-700`}`}>
//                         <span className={`${active > 1 ? `${styles.cart_button_text} !bg-blue-700` : `${styles.cart_button_text} !text-[#]`}`}>
//                             2.Payment
//                         </span>
//                     </div>
//                 </div>

//                 <div className={`${styles.noramlFlex}`}>
//                     <div className={`${active > 3 ? "w-[18px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
//                         : "w-[18px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
//                         }`} />
//                     <div className={`${active > 2 ? `${styles.cart_button} !bg-blue-700` : `${styles.cart_button} !bg-blue-700`}`}>
//                         <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#fff]`}`}>
//                             3.Success
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CheckoutSteps

import React from "react";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-50">
      <div className="flex items-center justify-between w-full max-w-4xl">
        {/* Step 1: Address */}
        <div className="flex items-center flex-1 justify-center">
          <div
            className={`${
              active >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
          >
            Address
          </div>
          <div
            className={`h-2 flex-grow mx-2 rounded-full ${
              active >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        </div>

        {/* Step 2: Payment */}
        <div className="flex items-center flex-1 justify-center">
          <div
            className={`${
              active >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
          >
            Payment
          </div>
          <div
            className={`h-2 flex-grow mx-2 rounded-full ${
              active >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        </div>

        {/* Step 3: Success */}
        <div className="flex items-center flex-1 justify-center">
          <div
            className={`${
              active >= 3 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-full font-semibold shadow-md transition duration-300`}
          >
            Success
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;


