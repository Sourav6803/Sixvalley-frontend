import React, { useEffect, useState } from 'react'
import styles from '../../../styles/styles'
import { useSelector } from 'react-redux';
import Loader from "../../../pages/Loader";
import NewProductCard from '../ProductCard/NewProductCard';


const DealsOfTheDay = () => {
    const [data, setData] = useState([]);
    const { allProducts, isLoading } = useSelector(state => state?.products)


    useEffect(() => {
        const firstFour = allProducts && allProducts?.slice(3, 6)
        setData(firstFour)
    }, [allProducts])


    return (
        <div className={`mt-1  p-2 bg-white`} >
            {
                isLoading && <div className="flex justify-center"><Loader /></div>
            }
            <div className={`${styles.section} `}>
                <div className="flex items-center justify-between py-3">
                    <h1 className='font-semibold text-[18px]'>Deals of the Day</h1>
                    <h1 className='font-semibold text-[16px] text-red-500'>See All</h1>
                </div>
                <div className="grid mt-2 grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px]   mb-12 border-0">
                    {
                        data && data?.map((i, index) => <NewProductCard data={i} key={index} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default DealsOfTheDay