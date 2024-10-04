import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineGift, AiOutlineQrcode } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
// import mainLogo from "../../main_logo3.jpg";
import mainLogo from "./mainlogo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

import { BsChevronDown } from "react-icons/bs";
import {
  MdOutlineDashboard, MdOutlineEventNote, MdOutlineStarBorder
} from "react-icons/md";
import { IoCartOutline, IoHomeOutline, IoDiamondOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiInboxIn, CiWallet, CiBank } from "react-icons/ci";
import { FiBarChart } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import { format } from 'timeago.js';
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardHeader = ({ navOpen, setNavOpen }) => {
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);

  const [notficationOpen, setNotificationOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  const cancledProduct = orders?.filter((order) => order?.status === "Cancled")

  const confirmedProduct = orders?.filter((order) => order?.status !== "Confirmed")
  const completeProduct = orders?.filter((order) => order?.status === "Delivered")
  const packagingProduct = orders?.filter((order) => order?.status === "Packaging")
  const outForDeliveryProduct = orders?.filter((order) => order?.status === "Out For Delivery")
  const returnedProduct = orders?.filter((order) => order?.status === "Returned")
  const failedToDeliver = orders?.filter((order) => order?.status === "Failed To Deliver")

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
        { title: "All", notication: orders?.length, link: "/dashboard-orders" },
        { title: "Confirmed", notication: confirmedProduct?.length, link: "/dashboard/confirmed/order" },
        { title: "Packaging", notication: packagingProduct?.length, link: "/dashboard/packaging/order" },
        { title: "Out For Delivery", notication: outForDeliveryProduct?.length, link: "/dashboard/out-for-delivery/order" },
        { title: "Delivered", notication: completeProduct?.length, link: "/dashboard/delivered/order" },
        { title: "Returned", notication: returnedProduct?.length, link: "/dashboard/returned/order" },
        { title: "Failed to Deliver", notication: failedToDeliver?.length, link: "/dashboard/failedToDeliver/order" },
        { title: "Cancelled", notication: cancledProduct?.length, link: "/dashboard/cancled/order" },
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
      title: "Brands",
      icon: <MdOutlineStarBorder />,
      subMenu: true,
      submenuItems: [
        { title: "Add New", link: "/dashboard/brand" },
        // { title: "List", link: "/admin/dashboard/all-brand" },
      ]
    },
    {
      title: "Products",
      icon: <IoDiamondOutline />,
      subMenu: true,
      spacing: true,
      submenuItems: [
        { title: "Product List", link: "/dashboard-products" },
        { title: "Approved List", link: "/dashboard/approved/product" },
        { title: "Pending List", link: "/dashboard/pending/product" },
        { title: "Add Product", link: "/dashboard-create-product" },
        // { title: "Product Gallery", link: "#" },
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
      title: "Product Report",
      icon: <FiBarChart />,
      link: "/dashboard/product-report"
    },
    {
      title: "Order Report",
      icon: <LuBarChart3 />,
      link: "/dashboard/order-report"
    },
    {
      title: "Withdraw",
      icon: <CiWallet />,
      spacing: true,
      subHeader: true,
      subHeading: "BUSINESS SECTION",
      link: "/dashboard-withdraw-money"
    },
    {
      title: "Bank Information",
      icon: <CiBank />,
      link: "/dashboard/bank-information"
    },
    {
      title: "Shop Setting",
      icon: <IoHomeOutline />,
      spacing: true,
      link: "/settings"
    }
  ]


  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true)
    } else {
      setActive(false)
    }
  })

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    })
      .then(res => {
        toast.success(res.data.message)
        setTimeout(() => { navigate("/shop-login") }, 500)
        window.location.reload(true);
      })
      .catch(err => {
        toast.error(err.response.data.message)
      })

  };

  const [subMenuOpen, setSubMenuOpen] = useState(null);

  const toggleMenu = (index) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null);
    } else {
      setSubMenuOpen(index);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "screen") {
      setNavOpen(false);
    }
  };

  const handleNotificationClose = (e) => {
    if (e.target.id === "screen") {
        setNotificationOpen(false);
    }
};

  const userId = seller?._id
  useEffect(() => {
    setIsLoading(true);
    userId && axios.get(`${server}/admin/notifications/unread`, { params: { userId }, withCredentials: true, }).then((res) => {
      setIsLoading(false);
      setNotifications(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

    }).catch((error) => {
      setIsLoading(false);
    });
  }, [userId]);

  const handleNotificationChange = async (notificationId) => {
    const userId = seller?._id
    try {
      const response = await axios.put(`${server}/admin/notifications/read/${notificationId}`, { userId });

      if (response.status === 200) {
        // Update the state after successfully marking as read
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      } else {
        console.error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  const markAllAsRead = async (userId) => {
    try {
      const response = await axios.put(`${server}/admin/notifications/read-all`, { userId });

      if (response.status === 200) {
        // Assuming the backend responds with the updated count and a success message
        console.log(response.data.message);


        // Update all notifications' isRead status in the state
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, isRead: true }))
        );
      } else {
        console.error('Error marking all notifications as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const audio = useMemo(() => new Audio("http://res.cloudinary.com/dr4mnk4tw/raw/upload/v1720603600/audioTutorial/ZURQ2FE-notification.mp3"), []);

  useEffect(() => {
    const fetchNotifications = () => {
      setIsLoading(true);
      if (userId) {
        axios.get(`${server}/admin/notifications/unread`, { params: { userId }, withCredentials: true })
          .then((res) => {
            setIsLoading(false);
            setNotifications(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          })
          .catch((error) => {
            setIsLoading(false);
            console.error("Error fetching notifications:", error);
          });
      }
    };

    socketId.on("newNotification", (data) => {

      console.log("new notification recived:", data)
      fetchNotifications()
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
      // setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socketId.off("newNotification");
    };
  }, [audio, userId]);


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
              <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" size={35} />
              <span onClick={() => setNotificationOpen(!notficationOpen)} className="absolute -top-2 -right-1 bg-[#1f614d] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white ">
                {notifications?.length > 0 && (
                  <span className="absolute top-1 right-1  rounded-full w-3 h-3 text-[12px] flex items-center justify-center">
                    {notifications?.length}
                  </span>
                )}
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
            <Link to={"#"}>
              <img
                src={seller?.avatar?.url || "placeholder.jpg"}
                alt="Seller Avatar"
                className="w-[40px] h-[40px] rounded-full object-cover border-[3px] border-[#33a466]"
              />
            </Link>

            {notficationOpen && (
              <div className="absolute right-0 top-16 w-[320px] max-h-[400px] bg-white shadow-lg rounded-lg z-20 overflow-hidden border border-gray-400">
                {/* Header */}
                <div className="p-4 bg-gray-200 border-b border-gray-400 flex justify-between items-center">
                  <h5 className="text-lg font-semibold text-gray-700">Notifications</h5>
                  {
                    notifications?.length > 0 &&
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => markAllAsRead(seller?._id)}
                    >
                      Mark all as read
                    </button>
                  }
                </div>

                {/* Notification List */}
                <div id='screen' onClick={handleNotificationClose} className="overflow-y-auto max-h-[320px]">
                  {notifications.length > 0 ? (
                    notifications.map((item, index) => (
                      <div
                        className={`flex items-start p-4 border-b border-gray-200 transition duration-200 ease-in-out hover:bg-gray-50 ${item.isRead ? "bg-white" : "bg-gray-50"
                          }`}
                        key={index}
                      >
                        {/* Notification Image */}
                        <img
                          src={item?.image?.url || "/placeholder-image.png"}
                          alt={item?.title || "Notification"}
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />

                        {/* Notification Content */}
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{item?.title}</p>
                          <p className="text-xs text-gray-500">{item?.content?.length > 60 ? item?.content?.slice(0, 60) + "..." : item?.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{format(item?.createdAt)}</p>
                        </div>

                        {/* Mark as Read Button */}
                        {!item.isRead && (
                          <button
                            className="ml-3 text-xs text-blue-600 hover:underline"
                            onClick={() => handleNotificationChange(item._id)}
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>


              </div>
            )}
          </div>
        </div>
      </div>



      {
        navOpen && (
          <div className="fixed w-full bg-[#0000005f] z-50 h-full top-0" id="screen" onClick={handleClose} >
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

                          <div key={subIndex} className="flex items-center justify-between mx-2 hover:bg-[#657082] rounded-md duration-300 p-2">
                            <Link to={subMenuItem?.link}>
                              <li key={subIndex} className="text-gray-300 text-sm flex items-center cursor-pointer px-7">
                                {subMenuItem.title}
                              </li>
                            </Link>
                            {subMenuItem?.notication ? (
                              <div className={`mr-3 flex items-center justify-center
                                  ${subMenuItem.title === ("Confirmed" || "Processing" || "Shipped" || "Packaging")
                                  ? "bg-[#7a93e7]"
                                  : subMenuItem.title === ("Delivered" || "Out For Delivery" || "All")
                                    ? "bg-[#4c9c1b8d]"
                                    : subMenuItem.title === "All" ? "bg-[#4345af]" : "bg-[#fb9ba0]"
                                } text-white rounded-full w-6 h-6 text-xs`}>
                                {subMenuItem.notication}
                              </div>
                            ) : ""}

                          </div>

                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>

              <div onClick={logoutHandler} className="mt-10 mb-3 mx-1  rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]">
                <button className="w-fit" >Logout</button>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};

export default DashboardHeader;