import React, { useState } from "react";
import { AiOutlineGift, AiOutlineQrcode } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
// import mainLogo from "../../main_logo3.jpg";
import mainLogo from "./mainlogo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

import { BsChevronDown } from "react-icons/bs";
import {
  MdOutlineDashboard, MdOutlineEventNote, MdOutlineStarBorder, MdOutlineStackedBarChart
} from "react-icons/md";
import { IoCartOutline, IoHomeOutline, IoDiamondOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiInboxIn, CiWallet, CiBank } from "react-icons/ci";
import { FiBarChart } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";

const Menus = [
  {
    title: "DASHBOARD",
    icon: <MdOutlineDashboard />,
    subHeader: true,
    subHeading: "ORDER MANAGEMENT",
    link: "/dashboard"
  },
  {
    title: "Order",
    icon: <IoCartOutline />,
    spacing: true,
    subMenu: true,
    submenuItems: [
      { title: "All", notication: 80, link: "#" },
      { title: "Confirmed", notication: 40, link: "#" },
      { title: "Packaging", notication: 17, link: "#" },
      { title: "Out For Delivery", notication: 10, link: "#" },
      { title: "Delivered", notication: 5, link: "#" },
      { title: "Returned", notication: 8, link: "#" },
      { title: "Failed to Deliver", notication: 8, link: "#" },
      { title: "Cancelled", notication: 16, link: "#" },
    ]
  },
  {
    title: "Refund Request",
    icon: <MdOutlineEventNote />,
    subMenu: true,
    subHeader: true,
    subHeading: "PRODUCT MANAGEMENT",
    submenuItems: [
      { title: "Pending", notication: 8, link: "#" },
      { title: "Approved", notication: 12, link: "/dashboard-orders" },
      { title: "Refunded", notication: 47, link: "/dashboard-refunds" },
      { title: "Rejected", notication: 23, link: "#" },
    ]
  },
  {
    title: "Products",
    icon: <IoDiamondOutline />,
    subMenu: true,
    spacing: true,
    submenuItems: [
      { title: "Product List", link: "/dashboard-products" },
      { title: "Approved List", link: "#" },
      { title: "Add Product", link: "/dashboard-create-product" },
      { title: "Product Gallery", link: "#" },
    ]
  },
  {
    title: "Product Reviews",
    icon: <MdOutlineStarBorder />,
    link: "#"
  },
  {
    title: "Banner Setup",
    spacing: true,
    icon: <AiOutlineQrcode />,
    link: "/dashboard-banner"
  },
  {
    title: "Coupon",
    spacing: true,
    subHeader: true,
    subHeading: "PROMOTION MANAGEMENT",
    icon: <FaUsers />,
    link: "/dashboard-coupouns"
  },
  {
    title: "Inbox",
    spacing: true,
    subHeader: true,
    subHeading: "HELP & SUPPORT",
    icon: <CiInboxIn />,
    link: "/dashboard-messages"
  },
  {
    title: "Transaction Report",
    icon: <MdOutlineStackedBarChart />,
    subHeader: true,
    subHeading: "REPORT & ANALYTICS",
    spacing: true
  },
  {
    title: "Product Report",
    icon: <FiBarChart />,
  },
  {
    title: "Order Report",
    icon: <LuBarChart3 />,
  },
  {
    title: "Withdraw",
    icon: <CiWallet />,
    spacing: true,
    subHeader: true,
    subHeading: "BUSINESS SECTION",
  },
  {
    title: "Bank Information",
    icon: <CiBank />,
  },
  {
    title: "Shop Setting",
    icon: <IoHomeOutline />,
    spacing: true,
    link: "/settings"
  }
]

const DashboardHeader = ({ navOpen, setNavOpen }) => {
  const { seller } = useSelector((state) => state.seller);

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
      <div className="w-full h-[80px] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 bg-white">
        <div className=" flex items-center gap-1">
          <div className=" 800px:hidden">
            <GiHamburgerMenu size={35} onClick={() => setNavOpen(true)} />
          </div>
          <div className="800px:ml-10">
            <Link to="/dashboard">
              <img src={mainLogo} alt="Main Logo" className="h-[60px]" />
            </Link>
          </div>


        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-5">
            <div className="relative cursor-pointer m-1">
              <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" size={35}/>
              <span className="absolute -top-2 -right-1 bg-[#1f614d] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white ">
                5
              </span>
            </div>
            <Link to="/dashboard/coupons" className="hidden md:block">
              <AiOutlineGift color="#555" size={30} className="cursor-pointer" />
            </Link>
            <Link to="/dashboard-events" className="hidden md:block">
              <MdOutlineLocalOffer color="#555" size={30} className="cursor-pointer" />
            </Link>
            <Link to="/dashboard-products" className="hidden md:block">
              <FiShoppingBag color="#555" size={30} className="cursor-pointer" />
            </Link>
            <Link to="/dashboard-orders" className="hidden md:block">
              <FiPackage color="#555" size={30} className="cursor-pointer" />
            </Link>
            <Link to="/dashboard-messages" className="hidden md:block">
              <BiMessageSquareDetail color="#555" size={30} className="cursor-pointer" />
            </Link>
            <Link to={`/shop/${seller?._id}`}>
              <img
                src={seller?.avatar || "placeholder.jpg"}
                alt="Seller Avatar"
                className="w-[40px] h-[40px] rounded-full object-cover border-[3px] border-[#33a466]"
              />
            </Link>
          </div>
        </div>
      </div>



      {
        navOpen && (
          <div className="fixed w-full bg-[#0000005f] z-50 h-full top-0" >
            <div className="fixed w-[60%] bg-[#150b31] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className='w-full justify-between flex  bg-white items-center '>
                <div className='relative ml-[5px]  '>
                  <img src={mainLogo} alt="logo" className="h-[60px]" />
                </div>

                <div className=' mr-1  rounded-md flex items-center justify-center border-2 border-gray-500 hover:border-red-500'>
                  <RxCross1 className=" cursor-pointer" size={30} onClick={() => setNavOpen(false)} />
                </div>
              </div>

              <div className={`flex items-center rounded-md m-2 bg-[#657082] mt-6  py-2 px-4`}>
                <BsSearch className={`text-white text-lg block float-left cursor-pointer mr-5}`} />
                <input type="search" placeholder="Search" className={`text-base bg-transparent w-full ml-2 text-white focus:outline-none `} />
              </div>

              <ul className="pt-2">
                {Menus.map((menu, index) => (
                  <React.Fragment key={index}>
                    <li className={`text-gray-300 text-sm flex items-center gap-x-4  cursor-pointer p-2 hover:bg-[#657082] mx-2 rounded-md ${menu?.spacing ? "mt-3" : "mt-2"}`} onClick={() => toggleMenu(index)}>
                      <span className="text-2xl block float-left hover:scale-110">{menu.icon}</span>
                      <Link to={menu?.link} className={`text-base font-medium flex-1 ${!navOpen && "hidden"}`}>{menu.title}</Link>
                      {menu.subMenu && (
                        <BsChevronDown className={`${subMenuOpen === index && "rotate-180"}`} />
                      )}
                    </li>
                    {menu.subMenu && subMenuOpen === index && navOpen && (
                      <ul className="">
                        {menu.submenuItems.map((subMenuItem, subIndex) => (

                          <div className="flex items-center justify-between mx-2 hover:bg-[#657082] rounded-md duration-300 p-2">
                            <li key={subIndex} className="text-gray-300 text-sm flex items-center cursor-pointer px-7">
                              {subMenuItem.title}
                            </li>
                            {subMenuItem?.notication && (
                              <div className="mr-3 flex items-center justify-center bg-red-500 text-white rounded-full w-6 h-6 text-xs">
                                {subMenuItem.notication}
                              </div>
                            )}
                          </div>

                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>

              <div className="mt-10 mb-3  rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]">
                <button className="w-fit">Logout</button>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};

export default DashboardHeader;