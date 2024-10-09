import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import ProfileContent from '../components/Profile/ProfileContent'


const ProfilePage = () => {
    const [active] = useState(1)
  return (
    <div>
        <Header />
        <div className={`w-full h-full flex bg-[#f5f5f5] py-2 `}>
            <ProfileContent active={active} />
        </div>
    </div>
  )
}

export default ProfilePage