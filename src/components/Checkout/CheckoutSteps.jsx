import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({ active }) => {

    return (
        <div className='w-full flex items-center justify-center p-2'>
            <div className="w-[100%] 800px:w-[50%] flex items-center justify-center flex-wrap ">
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${styles.cart_button} !bg-blue-700`}>
                        <span className={`${styles.cart_button_text}`}>1.Address</span>
                    </div>
                    <div className={`${active > 1 ? "w-[18px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                        : "w-[18px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                        }`} />
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 1 ? `${styles.cart_button} !bg-blue-700` : `${styles.cart_button} !bg-blue-700`}`}>
                        <span className={`${active > 1 ? `${styles.cart_button_text} !bg-blue-700` : `${styles.cart_button_text} !text-[#]`}`}>
                            2.Payment
                        </span>
                    </div>
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 3 ? "w-[18px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                        : "w-[18px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                        }`} />
                    <div className={`${active > 2 ? `${styles.cart_button} !bg-blue-700` : `${styles.cart_button} !bg-blue-700`}`}>
                        <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#fff]`}`}>
                            3.Success
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSteps