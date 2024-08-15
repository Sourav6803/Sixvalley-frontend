import React, { useState } from 'react';
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';

import Banner from './Banner';
import DealsOfTheDay from '../DealsOfTheDay/DealsOfTheDay';

const Hero = () => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const { allProducts } = useSelector((state) => state.products);
    const { seller } = useSelector((state) => state.seller);

    const handleBannerClick = () => {
        let sellerId = "652df7bb4e3edccc4a614b6c"

        const filteredProducts = allProducts.filter(product => console.log(product));
        setFilteredProducts(filteredProducts);
    }

    return (
        <>

            <Banner />
            <Navbar />

            <DealsOfTheDay />

            <div className='p-2 bg-white'>
            <div className="relative  min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://www.jiomart.com/images/product/original/rvo4rqhlqd/dinine-craft-decorative-wall-hanging-wooden-art-decoration-item-wall-hanging-for-bedroom-and-home-decor-quotess-decor-wall-art-for-home-mdf-wall-decor-6-plates-product-images-orvo4rqhlqd-p596303561-3-202212121756.png?im=Resize=(420,420)')" }}>
                <div className="absolute  inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40">
                    <div className="w-full px-4 md:w-3/4 lg:w-2/3 xl:w-1/2">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                            Best Collection for <br /> Home Decoration
                        </h1>
                       
                        <Link to="/products">
                            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition duration-300">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                    {/* <div class="lg:max-w-lg">
                        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Best place to Decorete <br/> your <span class="text-blue-500 ">Home</span></h1>

                        <p class="mt-3 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>
                        <Link to="/products">
                        <button class="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Shop Now</button>
                        </Link>
                    </div> */}
                </div>
            </div>
            </div>


        </>
    )
}

export default Hero