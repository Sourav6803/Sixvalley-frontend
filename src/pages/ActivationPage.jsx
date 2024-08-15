import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { server } from '../server'

const ActivationPage = () => {
    const {activation_token} = useParams()
    const [error,setError] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async()=>{
                try{
                     await axios.post(`${server}/user/activation`, {
                        activation_token,

                    }).then(res=>{
                        console.log("activation",res)

                        setTimeout(()=>{
                            navigate("/")
                        },2000)
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

export default ActivationPage