import React, { useEffect, useState } from 'react';
import Header from "../components/Layout/Header"
import Hero from '../components/Route/Hero/Hero';
import Categories from '../components/Route/Categories/Categories';
import BestDeals from '../components/Route/BestDeals/BestDeals';
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct';
import Events from '../components/Events/Events';
import Sponsored from '../components/Route/Sponsored/Sponsored';
import Footer from '../components/Layout/Footer';
import NewArrival from '../components/Route/NewArrival/newArrival';
import TopDeals from '../components/Route/TopDeals/TopDeals';
import Slider from '../components/Route/Slider/Slider';
import MidSection from '../components/Route/MidSection/MidSection';
import SingleBanner from '../components/Route/Hero/SIngleBannner';
import Blog from '../components/Route/Blog/Blog';
import TopBanner from '../components/Route/Banner/TopBanner';
import CartProduct from '../components/Route/CartProduct/CartProduct';
import { useSelector } from 'react-redux';
import Trending from '../components/Route/Trending/Trending';
import Callegraphic from '../components/Route/Calegraphic/Callegraphic';
import { requestFCMToken } from '../utils/firebaseUtils';
import CookieConsent from 'react-cookie-consent';
import axios from 'axios';
import { server } from '../server';
import Cookie from '../components/Cookie';


const HomePage = () => {
  const [data, setData] = useState([])
  const { allProducts, isLoading } = useSelector((state) => state?.products)
  const categoryData = "Canvas"




  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts
      setData(d)
    } else {
      const d = allProducts && allProducts.filter((i) => i.subCategory === categoryData)
      setData(d)
    }

  }, [allProducts])



  return (
    <div>
      
      <Header activeHeading={1} />
      {/* <TopBanner /> */}
      <Hero />
      <Categories />
      {/* <Cookie /> */}

      <BestDeals />
      <SingleBanner />

      <Slider />
      <Events />
      <FeaturedProduct />
      <MidSection />
      <TopDeals />
      <Trending />
      <CartProduct />
      <NewArrival />
      <Slider data={data} />
      <Sponsored />
      <Callegraphic />
      <Blog />
      <Footer />
    </div>
  )
}

export default HomePage