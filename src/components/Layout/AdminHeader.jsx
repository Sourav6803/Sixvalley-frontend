// import React from 'react'
// import { AiOutlineGift } from 'react-icons/ai'
// import { BiMessageSquareDetail } from 'react-icons/bi'
// import { FiPackage, FiShoppingBag } from 'react-icons/fi'
// import { MdOutlineLocalOffer } from 'react-icons/md'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import mainLogo from "../main_logo3.jpg"


// const AdminHeader = () => {
//   const { user } = useSelector((state) => state?.user);

//   return (
//     <div className="w-full h-[80px] bg-blue-500 shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4  ">
//       <div className='border-red-800 border-2'>
//         <Link to="/">
//           <img
//             src={mainLogo}
//             alt=""
//           />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center mr-4">
//           <Link to="/dashboard-coupouns" className="800px:block hidden">
//             <AiOutlineGift
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>

//           <Link to="/dashboard-events" className="800px:block hidden">
//             <MdOutlineLocalOffer
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-products" className="800px:block hidden">
//             <FiShoppingBag
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-orders" className="800px:block hidden">
//             <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-messages" className="800px:block hidden">
//             <BiMessageSquareDetail
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <img
//             src={`${user?.avatar}`}
//             alt=""
//             className="w-[50px] h-[50px] rounded-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHeader

import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import mainLogo from "./mainlogo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { IoMdNotificationsOutline, } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { adminSubMenus } from "../../static/data";


const AdminHeader = ({ navOpen, setNavOpen }) => {
  const { admin } = useSelector((state) => state.admin);

  const [active, setActive] = useState(false)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true)
    } else {
      setActive(false)
    }
  })

  const [subMenuOpen, setSubMenuOpen] = useState(null);


  const toggleMenu = (index) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null);
    } else {
      setSubMenuOpen(index);
    }
  };


  return (

    <>
      <div className="w-full  h-[80px] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 bg-white border border-red-400">
        <div className=" flex items-center md:gap-5 gap-2">
          <div className="md:hidden">
            <GiHamburgerMenu size={30} onClick={() => setNavOpen(true)} />
          </div>
          <div className="800px:ml-10">
            <Link to="/admin/dashboard">
              <img src={mainLogo} alt="Main Logo" className="h-[50px]" />
            </Link>
          </div>


        </div>

        <div className="flex items-center">
          <div className="flex items-center md:space-x-5 space-x-2">
            <div className="flex  flex-col items-center justify-start">

              <MdOutlineAdminPanelSettings size={30} />
              <p className="text-[14px]">Admin</p>
            </div>
            <div className="relative cursor-pointer m-1">
              <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" size={35} />
              <span className="absolute -top-2 -right-1 bg-[#1f614d] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white ">
                5
              </span>
            </div>

            <Link to="/dashboard-messages" className="hidden md:block">
              <BiMessageSquareDetail color="#555" size={30} className="cursor-pointer" />
            </Link>
            <Link to={``}>
              <img
                src={admin?.avatar?.url || "placeholder.jpg"}
                alt="Admin Avatar"
                className="w-[40px] h-[40px] rounded-full object-cover border-[3px] border-[#33a466]"
              />
            </Link>
          </div>
        </div>
      </div>



      {
        navOpen && (
          <div className="fixed w-full bg-[#0000005f] z-50 h-full top-0" >
            <div className="fixed w-[60%] bg-[#382766] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className='w-full justify-between flex  bg-white items-center  '>
                <div className='relative ml-[15px]  '>
                  <img src={mainLogo} alt="logo" className="flex h-[60px]" />
                </div>

                <div className=' mr-6  rounded-md flex items-center justify-center border-2 border-gray-500 hover:border-red-500'>
                  <RxCross1 className=" cursor-pointer" size={30} onClick={() => setNavOpen(false)} />
                </div>
              </div>

              <div className={`flex items-center rounded-md m-2 bg-[#657082] mt-6  py-2 px-4`}>
                <BsSearch className={`text-white text-lg block float-left cursor-pointer mr-5}`} />
                <input type="search" placeholder="Search" className={`text-base bg-transparent w-full ml-2 text-white focus:outline-none `} />
              </div>

              <ul className="pt-2">
                {adminSubMenus.map((menu, index) => (
                  <React.Fragment key={index}>
                    <li className={`text-gray-300 text-sm flex items-center gap-x-3  cursor-pointer p-2 hover:bg-[#657082] mx-2 rounded-md ${menu?.spacing ? "mt-3" : "mt-2"}`} onClick={() => toggleMenu(index)}>
                      <span className="text-xl block float-left hover:scale-110">{menu.icon}</span>
                      <Link to={menu?.link} className={`text-[14px] font-[500] flex-1 ${!navOpen && "hidden"}`}>{menu.title}</Link>
                      {menu.subMenu && (
                        <BsChevronDown className={`${subMenuOpen === index && "rotate-180"}`} />
                      )}
                    </li>
                    {menu.subMenu && subMenuOpen === index && navOpen && (
                      <ul className="">
                        {menu.submenuItems.map((subMenuItem, subIndex) => (

                          <div className="flex items-center justify-between mx-2 hover:bg-[#657082] rounded-md duration-300 p-2">
                            <Link to={subMenuItem?.link}>
                              <li key={subIndex} className="text-gray-300 text-sm flex items-center cursor-pointer px-7">
                                {subMenuItem.title}
                              </li>
                              {subMenuItem?.notication && (
                                <div className="mr-3 flex items-center justify-center bg-red-500 text-white rounded-full w-6 h-6 text-xs">
                                  {subMenuItem.notication}
                                </div>
                              )}
                            </Link>
                          </div>

                        ))}
                      </ul>


                    )}

                    {
                      menu?.subHeading && (
                        <div className="m-2 flex items-start ">
                          <h2 className="text-[#e47a7a] ml-8 font-[500] text-[12px]">{menu?.subHeading}</h2>
                        </div>
                      )
                    }
                  </React.Fragment>
                ))}
              </ul>

              <div className="mt-10 mb-3 mx-3 rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]">
                <button className="w-fit">Logout</button>
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default AdminHeader