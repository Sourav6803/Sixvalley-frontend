import React, { useEffect } from 'react'
import Signup from "../components/Signup/Signup"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

const SignupPage = () => {

  const {isAuthenticated} = useSelector(state=>state.user)
  const navigate = useNavigate()

  useEffect(()=>{
      if(isAuthenticated === true){
          navigate('/')
      }
  })
  return (
    <>
        <Header />
        <Signup />

        <Footer />

    </>
  )
}

export default SignupPage