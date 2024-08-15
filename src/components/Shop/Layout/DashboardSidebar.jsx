import React, { useEffect } from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";


import { MdOutlineDashboard } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineStarBorder } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { CiInboxIn } from "react-icons/ci";
import { MdOutlineStackedBarChart } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";
import { CiWallet } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";


import { useState } from "react";


const Menus = [
  {
    title: "DASHBOARD",
    icon: <MdOutlineDashboard />,
    subHeader: true,
    subHeading: "ORDER MANAGMENT",
  },
  {
    title: "Order",
    icon: <IoCartOutline />,

    spacing: true,
    subMenu: true,
    submenuItems: [
      { title: "All" },
      { title: "Confirmed" },
      { title: "Packaging" },
      { title: "Out For Delivery" },
      { title: "Delivred" },
      { title: "Returned" },
      { title: "Failed to Delivery" },
      { title: "Cancled" },

    ]
  },
  {
    title: "Refund Request",
    icon: <MdOutlineEventNote />,
    subMenu: true,
    subHeader: true,
    subHeading: "PRODUCT MANAGMENT",
    submenuItems: [
      { title: "Pending" },
      { title: "Approved" },
      { title: "Refunded" },
      { title: "Rejected" },
    ]
  },
  {
    title: "Products",
    icon: <IoDiamondOutline />,
    subMenu: true,
    spacing: true,

    submenuItems: [
      { title: "Product List" },
      { title: "Approved List" },
      { title: "Add Product" },
      { title: "Product Gallery" },
    ]
  },
  {
    title: "Products Review",
    icon: <MdOutlineStarBorder />,

  },
  {
    title: "Cupon",
    spacing: true,
    subHeader: true,
    subHeading: "PROMOTION MANAGMENT",
    icon: <FaUsers />,
  },
  {
    title: "Inbox",
    spacing: true,
    subHeader: true,
    subHeading: "HELP & SUPPORT",
    icon: <CiInboxIn />,
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
    title: "order Report",
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
    spacing: true
  }

]

const DashboardSideBar = ({ active }) => {
  const [open, setOpen] = useState(true)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [searchTearm, setSearchTearm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const collapsed = () => {
    setOpen(!open)
  }

  const toggleMenu = (index) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null);
    } else {
      setSubMenuOpen(index);
    }
  };

  useEffect(() => {
    if (searchTearm) {
      const filterMenu = Menus.filter((menu) =>
        menu.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
        (menu.subMenu && menu.submenuItems.some(subMenuItem =>
          subMenuItem.title.toLowerCase().includes(searchTearm.toLowerCase())
        ))
      );
      setSearchData(filterMenu);
    } else {
      setSearchData(null);
    }
  }, [searchTearm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterMenu = Menus.filter((menu) =>
      menu.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
      (menu.subMenu && menu.submenuItems.some(subMenuItem =>
        subMenuItem.title.toLowerCase().includes(searchTearm.toLowerCase())
      ))
    );
    setSearchData(filterMenu);
  };

  const menusToDisplay = searchData || Menus;


  return (


    <section className={`bg-[#2a2589]  max-sm:hidden 1000px:block max-h-screen p-5 pt-8 sticky top-0 left-0 ${open ? "w-72" : "w-20"} duration-300 overflow-y-scroll overflow-x-hidden`}>
      <BsArrowLeftShort className={`bg-white text-[#16162e] text-2xl rounded-full  absolute -right-3 top-5 border border-[#461b85] cursor-pointer ${!open && "rotate-180"}`} onClick={collapsed} />

      <div className={`flex items-center rounded-md bg-[#657082] mt-6 px-4 py-2  ${!open ? "px-2.5" : "px-4"}`}>
        <input
          type="search"
          placeholder="Search"
          className={`text-base border-blue-500 bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}
          value={searchTearm}
          onChange={(e) => setSearchTearm(e.target.value)}
        />
        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`} onClick={handleSearch} />
      </div>

      <ul className="pt-2">
        {
          menusToDisplay.map((menu, index) => (
            <>
              <li className={`text-gray-300 text-sm flex items-center gap-x-4  cursor-pointer p-2 hover:bg-[#657082] rounded-md ${menu?.spacing ? "mt-3" : "mt-2"}`} onClick={() => toggleMenu(index)}>
                <Link to={menu?.link} className="text-2xl block float-left hover:scale-110">{menu.icon}</Link>
                {/* <span className="text-2xl block float-left">{menu.icon}</span> */}
                <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.title}</span>
                {
                  menu.subMenu && (
                    <BsChevronDown className={`${subMenuOpen === index && "rotate-180"}`} onClick={() => setSubMenuOpen(!subMenuOpen)} />
                  )
                }

              </li>

              {
                menu.subMenu && subMenuOpen === index && open && (
                  <ul>
                    {menu.submenuItems.map((subMenuItem, subIndex) => (
                      <div className="flex items-center justify-between hover:bg-[#657082] rounded-md duration-300" key={subIndex}>
                        <Link to={subMenuItem?.link}>
                          <li className={`text-gray-300 text-sm font-medium flex items-center cursor-pointer p-2   px-7 `}>
                            {subMenuItem.title}
                          </li>
                        </Link>
                        {subMenuItem?.notication && <div className="mr-3 flex items-center justify-center bg-red-400 text-white rounded-full w-6 h-6 text-xs ">{subMenuItem?.notication}</div>}
                      </div>
                    ))}
                  </ul>
                )
              }

              {menu?.subHeading && (
                <div className={`m-2 flex items-start `}>
                  <h2 className={`text-[#e47a7a] ml-8 font-[500] text-[12px] ${!open && "hidden"}`}>{menu?.subHeading}</h2>
                </div>
              )}

            </>
          ))
        }
      </ul>
      
      <div className="mt-10 mb-3 mx-3 rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]">
        <button className="w-fit">Logout</button>
      </div>
    </section>
  );
};

export default DashboardSideBar;



// <div className="w-full h-full  bg-white shadow-sm  sticky top-0 left-0 ">
//   {/* single item */}
//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard" className="w-full flex items-center">
//       <RxDashboard
//         size={30}
//         color={`${active === 1 ? "crimson" : "#555"}`}

//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Dashboard
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-orders" className="w-full flex items-center">
//       <FiShoppingBag
//         size={30}
//         color={`${active === 2 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         All Orders
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-products" className="w-full flex items-center">
//       <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         All Products
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link
//       to="/dashboard-create-product"
//       className="w-full flex items-center"
//     >
//       <AiOutlineFolderAdd
//         size={30}
//         color={`${active === 4 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Create Product
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-events" className="w-full flex items-center">
//       <MdOutlineLocalOffer
//         size={30}
//         color={`${active === 5 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         All Events
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-create-event" className="w-full flex items-center">
//       <VscNewFile
//         size={30}
//         color={`${active === 6 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Create Event
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link
//       to="/dashboard-withdraw-money"
//       className="w-full flex items-center"
//     >
//       <CiMoneyBill
//         size={30}
//         color={`${active === 7 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Withdraw Money
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-messages" className="w-full flex items-center">
//       <BiMessageSquareDetail
//         size={30}
//         color={`${active === 8 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Shop Inbox
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-coupouns" className="w-full flex items-center">
//       <AiOutlineGift
//         size={30}
//         color={`${active === 9 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 9 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Discount Codes
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/dashboard-refunds" className="w-full flex items-center">
//       <HiOutlineReceiptRefund
//         size={30}
//         color={`${active === 10 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 10 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Refunds
//       </h5>
//     </Link>
//   </div>

//   <div className="w-full flex items-center p-4">
//     <Link to="/settings" className="w-full flex items-center">
//       <CiSettings
//         size={30}
//         color={`${active === 11 ? "crimson" : "#555"}`}
//       />
//       <h5
//         className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 11 ? "text-[crimson]" : "text-[#555]"
//           }`}
//       >
//         Settings
//       </h5>
//     </Link>
//   </div>
// </div>