import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/Products/ProductDetails"
import { useParams, useSearchParams } from 'react-router-dom'
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useSelector } from 'react-redux'
import Loader from './Loader'


const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state?.products);
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [searchParams] = useSearchParams()
  const eventData = searchParams.get("isEvent")
  // console.log(eventData)


  useEffect(() => {
    const data = allProducts?.find((i) => i?._id === id)
    setData(data)
    setLoading(false)

  }, [allProducts, id])


  return (
    <div>
      {
        loading ? <Loader /> :
          (
            <div>
              <Header />
              <ProductDetails data={data} />

              <SuggestedProduct data={data} eventData={eventData} />

              <Footer />
            </div>
          )
      }
    </div>
  )
}

export default ProductDetailsPage