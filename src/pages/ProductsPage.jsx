import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paintingSubCategoriesdata } from '../static/data';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';
import Footer from '../components/Layout/Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PaintingSubCat from '../components/Route/Navbar/PaintingSubCat';
import axios from 'axios';
import { server } from '../server';
import Loader from './Loader';



const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category")
    const { allProducts, isLoading } = useSelector(state => state?.products)
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (i) => {
        navigate(`/productsss?subCategory=${i}`)
    }


    const bannerData = [
        { id: 2, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50', shopId: "653bd40414a4f73899732e0c" },
        { id: 3, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50' },
        { id: 4, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50' }
    ]


    useEffect(() => {
        setLoader(true)
        if (categoryData === null) {
            const d = allProducts
            setData(d)
        } else {
            const d = allProducts && allProducts.filter((i) => i.category === categoryData)
            setData(d)

        }
        setLoader(false)
    }, [allProducts, categoryData])


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    return (
        <div>
            <Header activeHeading={3} />
            <div className={` !m-0 !p-0 !w-full `}>
                {
                    categoryData === 'Painting' ?
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={4000}
                            keyBoardControl={true}
                            showDots={false}
                            slidesToSlide={1}
                            containerClass="carousel-container"
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {
                                bannerData.map(image => (
                                    <img src={image.url} alt="banner" key={image.id} className='h-[160px] md:h-[180px] w-full object-cover' />
                                ))
                            }
                        </Carousel> : ''
                }

                <div className=' grid grid-cols-4 p-1 gap-[10px] md:grid-cols-6 md:gap-[25px] lg:grid-cols-8 lg:gap-[25px] xl:grid-cols-8 xl:gap-[30px] ' style={{ backgroundImage: "url('https://img.freepik.com/free-vector/happy-diwali-background-with-hanging-diya_1017-27767.jpg?size=626&ext=jpg&ga=GA1.1.154591421.1690217633&semt=ais')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
                    {
                        categoryData === 'Painting' ?
                            paintingSubCategoriesdata.map((subCat, i) => (
                                <div className='pl-2' onClick={(i) => handleSubmit(subCat.title)} >
                                    <img src={subCat.image_Url} alt='' className=' h-[50px] w-[50px] rounded-full  ' />
                                    <p className='text-[14px] text-white font-semibold'>{subCat.title}</p>
                                </div>
                            )) : ''
                    }
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
            {isLoading && <div className='flex justify-center'><Loader /></div>}
            <Footer />
        </div>
    )
}

export default ProductsPage