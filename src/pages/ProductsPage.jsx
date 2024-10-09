import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';
import 'react-multi-carousel/lib/styles.css';
import Loader from './Loader';



const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("subCategory")
    const { allProducts, isLoading } = useSelector(state => state?.products)
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const [filterSubcategory, setFilterSubCategory] = useState([])
   
    const { allSubSubCategory } = useSelector(state => state.subSubCategory)

    const navigate = useNavigate()

    const handleSubmit = (i) => {
        navigate(`/products?subCategory=${i}`)
    }
    

    useEffect(() => {
        const filterData = allSubSubCategory && allSubSubCategory?.filter(cat => cat?.subCategory?.trim() === categoryData?.trim())
        setFilterSubCategory(filterData)
    }, [allSubSubCategory, categoryData])

    useEffect(() => {
        setLoader(true)
        if (categoryData === null) {
            const d = allProducts
            setData(d)
        } else {
            const d = allProducts && allProducts.filter((i) => i.subCategory.trim() === categoryData.trim())
            setData(d)

        }
        setLoader(false)
    }, [allProducts, categoryData])


   

    return (
        <div>
            <Header activeHeading={3} />

            {(isLoading || loader) && <div className='flex justify-center items-center h-screen'><Loader /></div>}
            <div className={` !m-0 !p-0 !w-full `}>




                <div className='grid grid-cols-5 md:grid-cols-6 justify-between overflow-x-auto px-4 mx-auto w-full bg-white'>
                    {Array.isArray(filterSubcategory) && filterSubcategory?.map((category, index) => (
                        <div key={index} className="p-3 text-center">
                            <img
                                src={category.image.url}
                                alt={category.name}
                                className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover cursor-pointer"
                                onClick={() => handleSubmit(category?.name)}
                            />
                            <p className="text-sm font-semibold">
                                {category?.name?.length > 6 ? `${category.name.slice(0, 5)}...` : category.name}
                            </p>
                        </div>
                    ))}
                </div>




                <div className='!bg-orange-300 grid grid-cols-2 p-1 gap-[10px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-6'>
                    {
                        data && data.map((i, index) => <ProductCard data={i} key={index} />)
                    }
                </div>
                {
                    data && data.length === 0 ? (
                        <h1 className='text-center w-full pb-[110px] text-[20px]'> No products found!</h1>
                    ) : null
                }
            </div>
            
            <Footer />
        </div>
    )
}

export default ProductsPage