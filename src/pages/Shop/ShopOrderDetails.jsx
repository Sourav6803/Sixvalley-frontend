import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/Shop/OrderDetails";

const ShopOrderDetails = () => {
    const [navOpen, setNavOpen] = useState(false);
    return (
        <div>
            <DashboardHeader navOpen = {navOpen} setNavOpen= {setNavOpen}/>
            <OrderDetails />
            <Footer />
        </div>
    )
}

export default ShopOrderDetails