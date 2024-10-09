import React from 'react';

import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../Navbar/Navbar';
// import BannerImg from "./upto50ff.jpg"
import Banner from './Banner';
import DealsOfTheDay from '../DealsOfTheDay/DealsOfTheDay';

const Hero = () => {

    return (
        <>

            <Banner />
            <Navbar />
            <DealsOfTheDay />

            

            <div className='p-2 bg-white'>
                <div className="relative  min-h-[30vh] md:min-h-[60vh] object-cover bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/interior-decoration-inspired-by-mexican-folklore_23-2150711393.jpg?t=st=1724422510~exp=1724426110~hmac=827598890083c0d31bafd44c4be7d5b6d1b0fb7e2d3484ec728fa17fdad43190&w=996')" }} >
                    <div className="absolute  inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40">
                        <div className="w-full px-4 md:w-3/4 lg:w-2/3 xl:w-1/2">
                            <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#ead1d1] leading-tight mb-4">
                                Best Collection for <br /> Home Decoration
                            </h1>

                            <Link to="/products">
                                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition duration-300">
                                    Shop Now
                                </button>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>


        </>
    )
}

export default Hero