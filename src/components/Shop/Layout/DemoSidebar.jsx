import React, { useEffect, useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import {
  MdOutlineDashboard,
  MdOutlineEventNote,
  MdOutlineStarBorder,
  MdOutlineInventory,
} from "react-icons/md";
import {
  IoCartOutline,
  IoHomeOutline,
  IoDiamondOutline,
} from "react-icons/io5";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { CiInboxIn, CiWallet, CiBank } from "react-icons/ci";
import { FiBarChart } from "react-icons/fi";
import { LuBadgePercent, LuBarChart3 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersOfAdmin,
  getAllOrdersOfShop,
} from "../../../redux/actions/order";
import { getAllProductsShop } from "../../../redux/actions/product";
import { getAllSellers } from "../../../redux/actions/sellers";
import { AiOutlineQrcode } from "react-icons/ai";
import { LiaWalletSolid } from "react-icons/lia";
import { FcAdvertising } from "react-icons/fc";
import { VscGraph } from "react-icons/vsc";
import { server } from "../../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DemoSideBar = ({ open, setOpen }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const cancledProduct = orders?.filter(
    (order) => order?.status === "Canceled"
  );
  const confirmedProduct = orders?.filter(
    (order) => order?.status === "Confirmed"
  );
  const completeProduct = orders?.filter(
    (order) => order?.status === "Delivered"
  );

  const packagingProduct = orders?.filter(
    (order) => order?.status === "Packaging"
  );
  const outForDeliveryProduct = orders?.filter(
    (order) => order?.status === "Out for delivery"
  );
  const returnedProduct = orders?.filter(
    (order) => order?.status === "Returned"
  );
  const failedToDeliver = orders?.filter(
    (order) => order?.status === "Failed to Deliver"
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller]);

  // const [timeFilter, setTimeFilter] = useState(
  //   "?rangeType=months&rangeCount=12"
  // );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/shop-login");
        }, 500);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const Menus = [
    {
      title: "DASHBOARD",
      icon: <MdOutlineDashboard />,
      subHeader: true,
      subHeading: "ORDER MANAGEMENT",
      link: "/dashboard",
    },
    {
      title: "Order",
      icon: <IoCartOutline />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        { title: "All", notication: orders?.length, link: "/dashboard-orders" },
        {
          title: "Confirmed",
          notication: confirmedProduct?.length,
          link: "/dashboard/confirmed/order",
        },
        {
          title: "Packaging",
          notication: packagingProduct?.length,
          link: "/dashboard/packaging/order",
        },
        {
          title: "Out For Delivery",
          notication: outForDeliveryProduct?.length,
          link: "/dashboard/out-for-delivery/order",
        },
        {
          title: "Delivered",
          notication: completeProduct?.length,
          link: "/dashboard/delivered/order",
        },
        {
          title: "Returned",
          notication: returnedProduct?.length,
          link: "/dashboard/returned/order",
        },
        {
          title: "Failed to Deliver",
          notication: failedToDeliver?.length,
          link: "/dashboard/failedToDeliver/order",
        },
        {
          title: "Cancelled",
          notication: cancledProduct?.length,
          link: "/dashboard/cancled/order",
        },
      ],
    },
    {
      title: "Refund Request",
      icon: <MdOutlineEventNote />,
      subMenu: true,
      subHeader: true,
      subHeading: "PRODUCT MANAGEMENT",
      submenuItems: [
        {
          title: "Pending",
          notication: 8,
          link: "/dashboard/processing-refund/order",
        },
        { title: "Approved", notication: 12, link: "/dashboard-orders" },
        { title: "Refunded", notication: 47, link: "/dashboard-refunds" },
        { title: "Rejected", notication: 23, link: "#" },
      ],
    },
    {
      title: "Brands",
      icon: <MdOutlineStarBorder />,
      subMenu: true,
      submenuItems: [
        { title: "Add New", link: "/dashboard/brand" },
        // { title: "List", link: "/admin/dashboard/all-brand" },
      ],
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
      ],
    },
    {
      title: "Upload Product",
      icon: <FaClipboardList />,
      // notication: confirmedProduct?.length,
      link: "/dashboard/catalog/upload-catalog",
    },
    {
      title: "Inventory",
      icon: <MdOutlineInventory />,
      // notication: confirmedProduct?.length,
      link: "/dashboard/inventory",
    },
    {
      title: "Payout",
      icon: <LiaWalletSolid />,
      // notication: confirmedProduct?.length,
      link: "/dashboard/payout",
    },

    {
      title: "Banner Setup",
      spacing: true,
      icon: <AiOutlineQrcode />,
      link: "/dashboard-banner",
    },
    {
      title: "Coupon",
      spacing: true,
      subHeader: true,
      subHeading: "PROMOTION MANAGEMENT",
      icon: <FaUsers />,
      link: "/dashboard-coupouns",
    },

    {
      title: "Advertisement",
      spacing: true,
      subHeader: true,
      // subHeading: "PROMOTION MANAGEMENT",
      icon: <FcAdvertising />,
      link: "/dashboard-add-campaign",
    },
    {
      title: "Promotions",
      spacing: true,
      subHeader: true,
      // subHeading: "PROMOTION MANAGEMENT",
      icon: <LuBadgePercent />,
      link: "/dashboard/promotion",
    },
    {
      title: "Business Dashboard",
      spacing: true,
      subHeader: true,
      // subHeading: "PROMOTION MANAGEMENT",
      icon: <VscGraph />,
      link: "/shop/business-dashboard",
    },
    {
      title: "Inbox",
      spacing: true,
      subHeader: true,
      subHeading: "HELP & SUPPORT",
      icon: <CiInboxIn />,
      link: "/dashboard-messages",
    },

    {
      title: "Product Report",
      icon: <FiBarChart />,
      link: "/dashboard/product-report",
    },
    {
      title: "Order Report",
      icon: <LuBarChart3 />,
      link: "/dashboard/order-report",
    },
    {
      title: "Withdraw",
      icon: <CiWallet />,
      spacing: true,
      subHeader: true,
      subHeading: "BUSINESS SECTION",
      link: "/dashboard-withdraw-money",
    },
    {
      title: "Bank Information",
      icon: <CiBank />,
      link: "/dashboard/bank-information",
    },
    {
      title: "Shop Setting",
      icon: <IoHomeOutline />,
      spacing: true,
      link: "/shop/dashboard/settings",
    },
  ];

  const toggleMenu = (index) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null);
    } else {
      setSubMenuOpen(index);
    }
  };

  return (
    <section
      className={`bg-[#150b31] fixed z-10 max-sm:hidden 1000px:block max-h-screen p-5 pt-8 h-[calc(100vh-80px)]  top-20 left-0 ${
        open ? "w-72" : "w-20"
      } duration-300 overflow-y-scroll`}
    >
      <BsArrowLeftShort
        className={`bg-white text-[#16162e] text-2xl rounded-full absolute -right-2 top-5 border border-[#461b85] cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      <div
        className={`flex items-center rounded-md bg-[#657082] mt-6 px-4 py-2  ${
          !open ? "px-2.5" : "px-4"
        }`}
      >
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            open && "mr-2"
          }`}
        />
        <input
          type="search"
          placeholder="Search"
          className={`text-base border-blue-500 bg-transparent w-full text-white focus:outline-none ${
            !open && "hidden"
          }`}
        />
      </div>

      {/* <ul className="pt-2 " key={""}>
        {Menus.map((menu, index) => (
          <React.Fragment key={index}>
            <li
              className={`text-gray-300 text-sm flex items-center gap-x-4  cursor-pointer p-2 hover:bg-[#657082] rounded-md ${
                menu?.spacing ? "mt-3" : "mt-2" 
              } ${location.pathname === menu?.link ? "bg-[#657082]" : ""}`}
              onClick={() => toggleMenu(index)}
            >
              <span className="text-2xl block float-left hover:scale-110">
                {menu.icon}
              </span>
              <Link
                to={menu?.link}
                className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              >
                {menu.title}
              </Link>
              {menu.subMenu && (
                <BsChevronDown
                  className={`${subMenuOpen === index && "rotate-180"}`}
                />
              )}
            </li>
            {menu.subMenu && subMenuOpen === index && open && (
              <ul className="">
                {menu.submenuItems.map((subMenuItem, subIndex) => (
                  <div className="flex items-center justify-between hover:bg-[#657082] rounded-md duration-300">
                    <Link to={subMenuItem?.link}>
                      <li
                        key={subIndex}
                        className={`text-gray-300 text-sm font-semibold flex items-center cursor-pointer p-2  px-12 `}
                      >
                        {subMenuItem.title}
                      </li>
                    </Link>
                    {subMenuItem?.notication ? (
                      <div
                        className={`mr-3 flex items-center justify-center
                                  ${
                                    subMenuItem.title ===
                                    ("Confirmed" ||
                                      "Processing" ||
                                      "Shipped" ||
                                      "Packaging")
                                      ? "bg-[#7a93e7]"
                                      : subMenuItem.title ===
                                        ("Delivered" ||
                                          "Out For Delivery" ||
                                          "All")
                                      ? "bg-[#4c9c1b8d]"
                                      : subMenuItem.title === "All"
                                      ? "bg-[#4345af]"
                                      : "bg-[#fb9ba0]"
                                  } text-white rounded-full w-6 h-6 text-xs`}
                      >
                        {subMenuItem.notication}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul> */}

      <ul className="pt-2">
        {Menus.map((menu, index) => {
          const isMenuActive = location.pathname === menu.link;
          const isSubMenuActive = menu?.submenuItems?.some(
            (sub) => sub.link === location.pathname
          );

          return (
            <React.Fragment key={index}>
              {/* Main Menu Item */}
              <li
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#657082] rounded-md ${
                  menu?.spacing ? "mt-3" : "mt-2"
                } ${isMenuActive || isSubMenuActive ? "bg-[#657082]" : ""}`}
                onClick={() => toggleMenu(index)}
              >
                <span className="text-2xl block float-left hover:scale-110">
                  {menu.icon}
                </span>

                {/* If menu has link (some menus are only expandable) */}
                {menu.link ? (
                  <Link
                    to={menu.link}
                    className={`text-base font-medium flex-1 ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </Link>
                ) : (
                  <span
                    className={`text-base font-medium flex-1 ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                )}

                {/* Chevron for SubMenu */}
                {menu.subMenu && (
                  <BsChevronDown
                    className={`${
                      (subMenuOpen === index || isSubMenuActive) && "rotate-180"
                    }`}
                  />
                )}
              </li>

              {/* Sub Menu Items */}
              {menu.subMenu &&
                (subMenuOpen === index || isSubMenuActive) &&
                open && (
                  <ul>
                    {menu.submenuItems.map((subMenuItem, subIndex) => {
                      const isSubItemActive =
                        location.pathname === subMenuItem.link;

                      return (
                        <div
                          key={subIndex}
                          className="flex items-center justify-between hover:bg-[#657082] rounded-md duration-300"
                        >
                          <Link to={subMenuItem.link} className="flex-1">
                            <li
                              className={`text-gray-300 text-sm font-semibold flex items-center cursor-pointer p-2 px-12 ${
                                isSubItemActive ? "bg-[#657082]" : ""
                              }`}
                            >
                              {subMenuItem.title}
                            </li>
                          </Link>

                          {/* Notification Bubble */}
                          {subMenuItem.notication ? (
                            <div
                              className={`mr-3 flex items-center justify-center
                      ${
                        [
                          "Confirmed",
                          "Processing",
                          "Shipped",
                          "Packaging",
                        ].includes(subMenuItem.title)
                          ? "bg-[#7a93e7]"
                          : ["Delivered", "Out For Delivery"].includes(
                              subMenuItem.title
                            )
                          ? "bg-[#4c9c1b8d]"
                          : subMenuItem.title === "All"
                          ? "bg-[#4345af]"
                          : "bg-[#fb9ba0]"
                      } text-white rounded-full w-6 h-6 text-xs`}
                            >
                              {subMenuItem.notication}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </ul>
                )}
            </React.Fragment>
          );
        })}
      </ul>

      <div
        onClick={logoutHandler}
        className="mt-10 mb-3 mx-1 cursor-pointer  rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]"
      >
        <button className="w-fit">Logout</button>
      </div>
    </section>
  );
};

export default DemoSideBar;
