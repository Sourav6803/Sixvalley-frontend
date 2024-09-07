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
  

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // useEffect(() => {
  //   const fetchRecommendations = async () => {
  //     setIsLoading(true); // Set loading state to true when starting the fetch
  //     setError(null); // Reset error state before fetching

  //     try {
  //       const response = await axios.get(`${server}/activity/${user?._id}/view`);
  //       const { data } = response; // Destructure response to get data
        
  //       setRecommendations(data);
  //     } catch (err) {
  //       console.error("Failed to fetch recommendations:", err);
  //       setError('Failed to load recommendations.'); // Set error state if there's an issue
  //     } finally {
  //       setIsLoading(false); // Set loading state to false once fetching is done
  //     }
  //   };

  //   if (user?._id) { // Ensure user ID is present before fetching
  //     fetchRecommendations();
  //   }
  // }, [user?._id]);


  

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
     
      <Callegraphic />
      <Blog />
      <Footer />
    </div>
  )
}

export default HomePage