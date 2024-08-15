import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server'

const SellerActivationPage = () => {
    const {activation_token} = useParams()
    const [error,setError] = useState(false)

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async()=>{
                try{
                     await axios.post(`${server}/shop/activation`, {
                        activation_token,

                    }).then(res=>{
                        console.log("activation",res)
                    }).catch(err=>{
                        console.log(err)
                    })
                    // console.log(res.data.message)
                }
                catch(error){
                    console.log(error?.response?.data?.message)
                    setError(true)
                }
            }
            activationEmail()
        }
    },[])

  return (
    <div style={{width: "100%", height:"100vh", display:"flex", justifyContent: "center", alignItems: "center"}}>
        {
            error ? (
                <p>Your token is expired!</p>
            ):(
                <p>Your account has been crated succesfully</p>
            )
        }
    </div>
  )
}

export default SellerActivationPage