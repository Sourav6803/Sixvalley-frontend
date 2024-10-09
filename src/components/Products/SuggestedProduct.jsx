import React, { useEffect, useState } from 'react'

import styles from '../../styles/styles'
import ProductCard from "../Route/ProductCard/ProductCard"
import { useSelector } from 'react-redux'


const SuggestedProduct = ({data}) => {
    const { allProducts } = useSelector((state) => state?.products);
    const [productData,setProductData] = useState()

    useEffect(()=>{
        const d = allProducts && allProducts?.filter((i)=> i.category === data?.category || i.name === data?.name || i.tags === data?.tags)
        setProductData(d?.slice(0,6))
    },[allProducts, data?.category, data?.name, data?.tags])
    
  return (
    <div>
        {
            data ? (
                <div className={`p-4 ${styles.section} !w-full  `} >
                    <p className={` text-[14px] font-[500] border-b mb-5 `}>
                        Suggested Products 
                    </p>
                    <div className='grid grid-cols-2  gap-[5px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-1 '>
                        {
                            productData && productData.map((i,index)=>(
                                <ProductCard data={i} key={index} />
                            ))
                        }
                    </div>
                </div>
            ): null
        }
    </div>
  )
}

export default SuggestedProduct