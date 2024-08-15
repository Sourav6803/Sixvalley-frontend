import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles.js'
import ProductCard from '../../components/Route/ProductCard/ProductCard.jsx'
import { useSelector } from 'react-redux';
import Loader from "../../pages/Loader";
import Header from '../Layout/Header.jsx';
import Footer from '../Layout/Footer.jsx';




const Birthday = () => {
    const [data, setData] = useState([]);
    const { allProducts, isLoading } = useSelector(state => state?.products)


    useEffect(() => {
        const birhdayGift = allProducts && allProducts?.filter(product => product.tags === 'Birthday gift')
        
        setData(birhdayGift)
    }, [allProducts])

    //https://www.shutterstock.com/shutterstock/photos/2233932341/display_1500/stock-vector-blurred-gradient-background-abstract-color-mix-blending-saturated-purple-neon-shades-modern-2233932341.jpg

    return (
        <>
            <Header />
            <div className={`mt-3 pb-0.5`} style={{ backgroundImage: "url('https://www.shutterstock.com/shutterstock/photos/2233932341/display_1500/stock-vector-blurred-gradient-background-abstract-color-mix-blending-saturated-purple-neon-shades-modern-2233932341.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <div className={`${styles.section} `}>
                    <div className={`${styles.heading}`}>
                        <h1 className='text-white'>Birthday Gifts</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                        {
                            data && data?.map((i, index) => <ProductCard data={i} key={index} />)
                        }
                    </div>
                    {
                        isLoading && <div className="flex justify-center"><Loader /></div>
                    }
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Birthday