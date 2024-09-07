import React, { useEffect, useState } from 'react'
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux';
import Loader from "../../../pages/Loader";


const FeaturedProduct = () => {
    const [data, setData] = useState([]);
    const {allProducts , isLoading} = useSelector(state=>state?.products)
    

    useEffect(()=>{
        const firstFour = allProducts && allProducts?.slice(0,4)
        setData(firstFour)
    },[allProducts])
    
    //https://www.shutterstock.com/shutterstock/photos/2233932341/display_1500/stock-vector-blurred-gradient-background-abstract-color-mix-blending-saturated-purple-neon-shades-modern-2233932341.jpg
    
    return (
        <div className={`mt-3 pb-0.5`} style={{ backgroundImage: "url('https://www.shutterstock.com/shutterstock/photos/2233932341/display_1500/stock-vector-blurred-gradient-background-abstract-color-mix-blending-saturated-purple-neon-shades-modern-2233932341.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div className="p-2">
                <div className='text-start ml-2 '>
                    <h1 className='text-[#e6ed55] text-2xl font-medium'>Featured Products</h1>
                </div>
                <div className="grid mt-2 grid-cols-2 gap-[4px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-0 border-0">
                    {
                        data && data?.map((i,index)=> <ProductCard data={i} key={index}/>)
                    }
                </div>
                {
              isLoading && <div className="flex justify-center"><Loader /></div>
            }
            </div>
        </div>
    )
}

export default FeaturedProduct