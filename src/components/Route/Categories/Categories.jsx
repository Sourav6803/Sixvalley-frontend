import React from 'react'
import styles from '../../../styles/styles'
import { brandingData, categoriesData } from '../../../static/data'
import { useNavigate } from 'react-router-dom'



const Categories = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className={` bg-red-200 p-2 !border-spacing-8 sm:block `}>
                <div className={`branding flex justify-between  w-full shadow-sm bg-white p-2 rounded-md`}>
                    {
                        brandingData && brandingData.map((i, index) => (
                            <div className='flex items-start flex-wrap overflow-hidden' key={index}>
                                <div className='flex pl-5 h-10 w-10 '>
                                    {i.icon}
                                </div>
                                <div className='px-1 overflow-hidden text-'>
                                    <p className='font-bold text-[10px] md:text-base '>
                                        {i.title}
                                    </p>
                                   
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id='categories'>
                <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                    {
                        categoriesData && categoriesData.map((i) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category=${i.title}`)
                            }

                            return (
                                <div className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden" key={i.id} onClick={() => handleSubmit(i)}>
                                    <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                                    <img src={i.image_Url} className="w-[120px] object-cover" alt="" />
                                </div>
                            )
                        })
                    }
                </div>
            </div> */}


            {/* <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id='categories'>
                <div className="grid grid-cols-5 gap-[5px] md:grid-cols-4 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                    {
                        categoriesData && categoriesData.map((i) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category=${i.title}`)
                            }

                            return (
                                <div className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden" key={i.id} onClick={() => handleSubmit(i)}>
                                    <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                                    <img src={i.image_Url} className="w-[120px] object-cover" alt="" />
                                </div>
                            )
                        })
                    }
                </div>
            </div> */}


        </>
    )
}

export default Categories
