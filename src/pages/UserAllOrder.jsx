import React  from 'react'
import Header from '../components/Layout/Header'


import AllOrder from '../components/Profile/AllOrder'


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