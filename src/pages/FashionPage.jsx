import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paintingSubCategoriesdata } from '../static/data';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

import Footer from '../components/Layout/Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import axios from 'axios';
import { server } from '../server';
import Loader from './Loader';
import { styled } from '@mui/material';



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

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 280,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        height: 180,
    },
    loading: 'lazy' // Add lazy loading
}));

const FashionPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category")
    const { allProducts, isLoading } = useSelector(state => state?.products)
    const { allSubSubCategory } = useSelector(state => state.subSubCategory)
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const [filterSubcategory, setFilterSubCategory] = useState([])

    const { allBanner } = useSelector(state => state.banner)
    const mainbanner = allBanner?.filter(banner => banner?.bannerType === "Main Banner" && banner?.resourceType === 'Fashion')
    console.log(mainbanner)

    const navigate = useNavigate();

    const handleBannerClick = (banner) => {
        console.log(banner.resourceValue)
        switch (banner.resourceType) {
            case 'Product':
                navigate(`/product/${banner.resourceValue}`);
                break;
            case 'Category':
                navigate(`/category/${banner.resourceValue}`);
                break;
            case 'Shop':
                navigate(`/shop/${banner.resourceValue}`);
                break;
            case 'Brand':
                navigate(`/brand/${banner.resourceValue}`);
                break;
            case 'URL':
                window.location.href = banner.resourceValue;
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        const filterData = allSubSubCategory && allSubSubCategory?.filter(cat => cat.mainCategory === "Fashion")
        setFilterSubCategory(filterData)
    }, [allSubSubCategory])



    const handleSubmit = (i) => {
        navigate(`/productsss?subCategory=${i}`)
    }


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
        {isLoading && <div className='flex items-start justify-center min-h-screen'><Loader /></div>}
            <Header activeHeading={3} />
            {/* className="flex justify-between overflow-x-auto px-4 mx-auto w-full bg-white" */}
            <div className="grid grid-cols-4 md:grid-cols-6 justify-between overflow-x-auto px-4 mx-auto w-full bg-white">
                {Array.isArray(filterSubcategory) && filterSubcategory?.map((category, index) => (
                    <div key={index} className="p-3 text-center">
                        <img
                            src={category.image.url}
                            alt={category.name}
                            className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover cursor-pointer"
                            onClick={() => handleSubmit(category)}
                        />
                        <p className="text-sm font-semibold">
                            {category?.name?.length > 6 ? `${category.name.slice(0, 5)}...` : category.name}
                        </p>
                    </div>
                ))}
            </div>

            <div className='p-2 bg-white'>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    keyBoardControl={true}
                    showDots={true}
                    slidesToSlide={1}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {
                        Array.isArray(mainbanner) && mainbanner?.map(banner => (
                            <div key={banner?._id} onClick={() => handleBannerClick(banner)} style={{ cursor: 'pointer' }}>
                                <Image
                                    src={banner?.bannerImg.url}
                                    alt="banner"
                                    id={banner?._id}
                                />
                            </div>
                        ))
                    }
                </Carousel>
            </div>


            <div className={` !m-0 !p-0 !w-full `}>
                {/* {
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
                } */}

                {/* <div className=' grid grid-cols-4 p-1 gap-[10px] md:grid-cols-6 md:gap-[25px] lg:grid-cols-8 lg:gap-[25px] xl:grid-cols-8 xl:gap-[30px] ' style={{ backgroundImage: "url('https://img.freepik.com/free-vector/happy-diwali-background-with-hanging-diya_1017-27767.jpg?size=626&ext=jpg&ga=GA1.1.154591421.1690217633&semt=ais')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
                    {
                        categoryData === 'Painting' ?
                            paintingSubCategoriesdata.map((subCat, i) => (
                                <div className='pl-2' onClick={(i) => handleSubmit(subCat.title)} >
                                    <img src={subCat.image_Url} alt='' className=' h-[50px] w-[50px] rounded-full  ' />
                                    <p className='text-[14px] text-white font-semibold'>{subCat.title}</p>
                                </div>
                            )) : ''
                    }
                </div> */}


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

export default FashionPage