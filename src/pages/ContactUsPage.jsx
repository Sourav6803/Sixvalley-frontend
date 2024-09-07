import React from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'

import AllOrder from '../components/Profile/AllOrder'
import ContactUs from '../components/Profile/ContactUs'

const ContactUsPage = () => {
  return (
    <div>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] pt-10 `}>

                <ContactUs  />
            </div>
        </div>
  )
}

export default ContactUsPage