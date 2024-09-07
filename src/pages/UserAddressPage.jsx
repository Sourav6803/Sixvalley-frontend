import React from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import Usercard from '../components/Profile/Usercard'
import { Address } from '../components/Profile/ProfileContent'

const UserAddressPage = () => {
  return (
    <div>
            <Header />
            <div className={` flex bg-[#f5f5f5] pt-2 `}>

                <Address />
            </div>
        </div>
  )
}

export default UserAddressPage