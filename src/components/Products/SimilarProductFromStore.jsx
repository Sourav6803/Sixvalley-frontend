import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import Loader from "../../pages/Loader";


const SimilarProductFromStore = ({ data }) => {

    const [loading, setLoading] = useState(false)
    const { seller } = useSelector((state) => state?.seller);
    const [productData, setProductData] = useState()
    const storeId = data?.shopId
    let shopName;

    const sameseller = seller?._id === storeId

    if (sameseller === true) {
        shopName = seller?.shopName
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/product/get-all-products-shop/${storeId}`);
                const filteredProducts = response?.data?.products?.filter((product) =>
                    product.category === data?.category ||
                    product.subCategory === data?.subCategory

                );
                setProductData(filteredProducts);
            } catch (error) {
                console.error("Error fetching products from the store:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (storeId) {
            fetchProducts();
        }
    }, [storeId, data?.category, data?.subCategory]);


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        }
    };


    return (
        <div className={`${styles.section} `}>
            <div className='mt-5 bg-white flex'>
                <p className='text-[16px] font-semibold text-slate-700 ' style={{ padding: "15px 10px" }}>Similar product from {shopName}</p>


            </div>
            <hr />
            {
                loading ? (
                    <div className="flex items-center justify-center"> <Loader /></div>
                ) : (
                    productData?.length > 0 ?
                        <Carousel responsive={responsive}
                            swipeable={true}
                            draggable={false}
                            centerMode={true}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}
                            showDots={false}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px" >

                            {
                                productData && productData?.map((product, key) => (
                                    <div className='text-center ' style={{ textAlign: "center", padding: "25px 15px" }} key={key}>

                                        <Link to={`/product/${product?._id}`}><img key={key} src={product?.images[0].url} alt='' style={{ width: "auto", height: "100px" }} /></Link>
                                        <p className='font-semibold text-[14px]'>{product?.name.slice(0, 17)}...</p>
                                        <p className='text-green-800 text-[12px]'>You will get {product.discountPercentage}% Off</p>
                                        <p className='text-slate-600 text-[12px]'>{product?.tags}</p>

                                    </div>
                                ))
                            }
                        </Carousel> :
                        productData?.length > 0 ?
                            (
                                <Carousel responsive={responsive}
                                    swipeable={true}
                                    draggable={false}
                                    centerMode={true}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={3000}
                                    keyBoardControl={true}
                                    showDots={false}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px" >

                                    {
                                        productData && productData?.map((product, key) => (
                                            <div className='text-center ' style={{ textAlign: "center", padding: "25px 15px" }} key={key}>

                                                <Link to={`/product/${product?._id}`}><img key={key} src={product?.images[0].url} alt='' style={{ width: "auto", height: "100px" }} /></Link>
                                                <p className='font-semibold text-[14px]'>{product?.name.slice(0, 17)}...</p>
                                                <p className='text-green-800 text-[12px]'>You will get {product.discountPercentage}% Off</p>
                                                <p className='text-slate-600 text-[12px]'>{product?.tags}</p>

                                            </div>
                                        ))
                                    }
                                </Carousel>) : (
                                <p className="text-center py-5 text-gray-500">No similar products found</p>
                            )
                )

            }
        </div>
    );
};

export default SimilarProductFromStore;
