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
import CartProduct from '../components/Route/CartProduct/CartProduct';
import { useSelector } from 'react-redux';
import Trending from '../components/Route/Trending/Trending';

import MensFashion from '../components/Route/MensFashion';
import DealsForYou from '../components/Route/DealsForYou';
import KitchenDining from '../components/Route/Kitchen&Dining';
import RecentView from '../components/Route/RecentView';
import WomensFashion from '../components/Route/WomensFashion';
import HarDinUtsav from '../components/Route/HarDinUtsav';


const HomePage = () => {
  const [data, setData] = useState([])
  const { allProducts } = useSelector((state) => state?.products)
  const {user} = useSelector((state) => state?.user)
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
  
      <Hero />
      <Categories />
      <HarDinUtsav />
     
      <RecentView />
      <BestDeals />
      <WomensFashion />
      <SingleBanner />
      

      <Slider />
      <Events />
      <KitchenDining />
      <MensFashion />
      <FeaturedProduct />
      <MidSection />
      <TopDeals />
      <Trending />
      <DealsForYou />
      <CartProduct />
      <NewArrival />
      <Slider data={data} />
      <Sponsored />
     
      {/* <Callegraphic />
      <Blog /> */}
      <Footer />
    </div>
  )
}

export default HomePage