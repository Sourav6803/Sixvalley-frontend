import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'

import AllOrder from '../components/Profile/AllOrder'
import { AllOrders } from '../components/Profile/ProfileContent'

const UserAllOrder = () => {

    // const [active, setActive] = useState(1)
    return (
        <div>
            <Header />
            <div className={` flex  pt-3 `}>

                <AllOrder  />
                {/* <AllOrders /> */}
            </div>
        </div>
    )
}

export default UserAllOrder