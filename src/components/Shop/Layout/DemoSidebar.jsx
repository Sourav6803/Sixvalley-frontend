import React, { useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import {
    MdOutlineDashboard, MdOutlineEventNote, MdOutlineStarBorder, MdOutlineStackedBarChart
} from "react-icons/md";
import { IoCartOutline, IoHomeOutline, IoDiamondOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiInboxIn, CiWallet, CiBank } from "react-icons/ci";
import { FiBarChart } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

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

const DemoSideBar = ({ active }) => {
    const [open, setOpen] = useState(true);
    const [subMenuOpen, setSubMenuOpen] = useState(null);

    const navigate = useNavigate()

    const toggleMenu = (index) => {
        if (subMenuOpen === index) {
            setSubMenuOpen(null);
        } else {
            setSubMenuOpen(index);
        }
    };

    return (
        <section className={`bg-[#2a2589]  max-sm:hidden 1000px:block max-h-screen p-5 pt-8 sticky top-0 left-0 ${open ? "w-72" : "w-20"} duration-300 overflow-y-scroll`} >
            <BsArrowLeftShort className={`bg-white text-[#16162e] text-2xl rounded-full absolute -right-3 top-5 border border-[#461b85] cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

            <div className={`flex items-center rounded-md bg-[#657082] mt-6 px-4 py-2  ${!open ? "px-2.5" : "px-4"}`}>
                <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`} />
                <input type="search" placeholder="Search" className={`text-base border-blue-500 bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`} />
            </div>

            <ul className="pt-2 " key={""}>
                {Menus.map((menu, index) => (
                    <React.Fragment key={index}>
                        <li className={`text-gray-300 text-sm flex items-center gap-x-4  cursor-pointer p-2 hover:bg-[#657082] rounded-md ${menu?.spacing ? "mt-3" : "mt-2"}`} onClick={() => toggleMenu(index)}>
                            <Link to={menu?.link} className="text-2xl block float-left hover:scale-110">{menu.icon}</Link>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`} onClick={() => navigate("/dashboard-coupouns")}>{menu.title}</span>
                            {menu.subMenu && (
                                <BsChevronDown className={`${subMenuOpen === index && "rotate-180"}`} />
                            )}


                        </li>
                        {menu.subMenu && subMenuOpen === index && open && (
                            <ul className="">
                                {menu.submenuItems.map((subMenuItem, subIndex) => (

                                    <div className="flex items-center justify-between hover:bg-[#657082] rounded-md duration-300">
                                        <li key={subIndex} className={`text-gray-300 text-sm flex items-center cursor-pointer p-2  px-7 `}>
                                            {subMenuItem.title}
                                        </li>
                                        {subMenuItem?.notication && <div className="mr-3 flex items-center justify-center bg-red-500 text-white rounded-full w-6 h-6 text-xs ">{subMenuItem?.notication}</div>}
                                    </div>

                                ))}
                            </ul>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </section>
    );
};

export default DemoSideBar;
