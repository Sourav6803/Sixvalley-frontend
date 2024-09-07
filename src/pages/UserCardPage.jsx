import React from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import Usercard from '../components/Profile/Usercard'

const UserCardPage = () => {
    return (
        <div>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] pt-10 `}>

                <Usercard />
            </div>
        </div>
    )
}

export default UserCardPage