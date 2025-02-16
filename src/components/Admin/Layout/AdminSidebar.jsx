import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsHousesFill,
  BsSearch,
} from "react-icons/bs";
// import { adminSubMenus } from "../../../static/data";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersOfAdmin,
  getAllOrdersOfShop,
} from "../../../redux/actions/order";
import { getAllProductsShop } from "../../../redux/actions/product";
import { getAllSellers } from "../../../redux/actions/sellers";
import {
  MdOutlineDashboard,
  MdOutlineEventNote,
  MdOutlineStackedBarChart,
  MdOutlineStarBorder,
} from "react-icons/md";
import {
  IoCartOutline,
  IoDiamondOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaMicrophone, FaUserAstronaut, FaUsers } from "react-icons/fa";
import { SlNotebook, SlOrganization } from "react-icons/sl";
import { AiOutlineQrcode } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiBarChart, FiInbox, FiUsers } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { RiCustomerService2Fill } from "react-icons/ri";
import { CiBank, CiDeliveryTruck, CiWallet } from "react-icons/ci";

const AdminSideBar = ({ active, navOpen, setNavOpen }) => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [searchTearm, setSearchTearm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const toggleMenu = (index) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null);
    } else {
      setSubMenuOpen(index);
    }
  };

  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const { products } = useSelector((state) => state.products);

  const popularProduct = Array.isArray(products)
    ? [...products].sort((a, b) => b?.ratings - a?.ratings).slice(0, 6)
    : [];
  const topSellingProduct = Array.isArray(products)
    ? [...products].sort((a, b) => b?.sold_out - a?.sold_out).slice(0, 5)
    : [];

  const cancledProduct = orders?.filter(
    (order) => order?.status === "Canceled"
  );
  const confirmedProduct = orders?.filter(
    (order) => order?.status === "Confirmed"
  );
  const completeProduct = orders?.filter(
    (order) => order?.status === "Delivered"
  );
  const shippedProducts = orders?.filter(
    (order) => order?.status === "Shipped"
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

  const adminSubMenus = [
    {
      title: "DASHBOARD",
      icon: <MdOutlineDashboard />,
      subHeader: true,
      subHeading: "ORDER MANAGEMENT",
      link: "/admin/dashboard",
    },
    {
      title: "Order",
      icon: <IoCartOutline />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        { title: "All", notication: orders?.length, link: "#" },
        { title: "Pending", notication: 4, link: "#" },
        { title: "Confirmed", notication: confirmedProduct?.length, link: "#" },
        { title: "Packaging", notication: packagingProduct?.length, link: "#" },
        {
          title: "Out For Delivery",
          notication: outForDeliveryProduct?.length,
          link: "#",
        },
        { title: "Delivered", notication: completeProduct?.length, link: "#" },
        { title: "Returned", notication: returnedProduct?.length, link: "#" },
        {
          title: "Failed to Deliver",
          notication: failedToDeliver?.length,
          link: "#",
        },
        { title: "Cancelled", notication: cancledProduct?.length, link: "#" },
      ],
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
      ],
    },
    {
      title: "Category Setup",
      icon: <IoDiamondOutline />,
      subMenu: true,
      spacing: true,
      submenuItems: [
        { title: "Categories", link: "/admin/dashboard/category" },
        { title: "Sub Categories", link: "/admin/dashboard/sub-category" },
        {
          title: "Sub Sub Categories",
          link: "/admin/dashboard/sub-sub-category",
        },
      ],
    },
    {
      title: "Brands",
      icon: <MdOutlineStarBorder />,
      subMenu: true,
      submenuItems: [
        { title: "Add New", link: "/admin/dashboard/brand" },
        { title: "List", link: "/admin/dashboard/all-brand" },
      ],
    },

    {
      title: "Product Attribute Setup",
      spacing: true,
      subHeader: true,
      icon: <FaUsers />,
      link: "/admin/dashboard/add-attribute",
    },
    {
      title: "In-house Product",
      spacing: true,
      subHeader: true,
      icon: <BsHousesFill />,
      subMenu: true,
      submenuItems: [
        { title: "Product List", link: "/admin/dashboard/all-product" },
        { title: "Add product", link: "/admin/dashboard/add-product" },
        { title: "Bulk Import", link: "/admin/dashboard/bulk-import" },
      ],
    },

    {
      title: "Vendor Products",
      spacing: true,
      subHeader: true,
      icon: <SlOrganization />,
      subMenu: true,
      submenuItems: [
        {
          title: "New Product Request",
          link: "/admin/dashboard/product/pending",
        },
        {
          title: "Product Update Request",
          link: "/admin/dashboard/update-product-request",
        },
        {
          title: "Approved Products",
          link: "/admin/dashboard/approved-product",
        },
        { title: "Denided Products", link: "/admin/dashboard/denided-product" },
      ],
    },
    {
      title: "Product gallery",
      spacing: true,
      subHeader: true,
      subHeading: "PROMOTION MANAGEMENT",
      icon: <SlNotebook />,
      link: "/admin/dashboard/product-gallery",
    },
    {
      title: "Banner Setup",
      spacing: true,
      icon: <AiOutlineQrcode />,
      link: "/admin/dashboard/banner",
    },
    {
      title: "Offers & Deals",
      spacing: true,
      icon: <BiSolidOffer />,
      subMenu: true,
      submenuItems: [
        { title: "Coupon", link: "/admin/dashboard/coupon" },
        { title: "Flash Deal", link: "/admin/dashboard/flash-deal" },
        { title: "Featured Deal", link: "/admin/dashboard/featured-deal" },
        { title: "Deal Of the Day", link: "/admin/dashboard/deal-of-the-day" },
        { title: "Event", link: "/admin/dashboard/event" },
      ],
    },
    {
      title: "Notificatios",
      spacing: true,
      icon: <IoIosNotificationsOutline />,
      subMenu: true,
      submenuItems: [
        {
          title: "Send notification",
          link: "/admin/dashboard/send-notification",
        },
        {
          title: "Push notification setup",
          link: "/admin/dashboard/push-notification",
        },
      ],
    },
    {
      title: "Annoucement",
      spacing: true,
      icon: <FaMicrophone />,
      subHeader: true,
      subHeading: "REPORT & ANALYTICS",
      link: "/admin/dashboard/annocument",
    },
    {
      title: "Sales & Transaction Report",
      icon: <MdOutlineStackedBarChart />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        { title: "Earnings Report", link: "/admin/dashboard/earnings-report" },
        { title: "Inhouse Sales", link: "/admin/dashboard/inhouse-sales" },
        { title: "Vendor Sales", link: "/admin/dashboard/vendor-sales" },
        {
          title: "Transaction Report",
          link: "/admin/dashboard/transaction-report",
        },
      ],
    },
    {
      title: "Product Report",
      icon: <FiBarChart />,
    },
    {
      title: "Order Report",
      icon: <LuBarChart3 />,
      subHeader: true,
      subHeading: "Help & Support",
    },
    {
      title: "Inbox",
      icon: <FiInbox />,
      spacing: true,
      link: "/admin/dashboard/inbox",
    },
    {
      title: "Messages",
      icon: <TiMessages />,
      spacing: true,
      link: "/admin/dashboard/message",
    },
    {
      title: "Support & Tickets",
      icon: <RiCustomerService2Fill />,
      subHeader: true,
      subHeading: "User Managment",
      spacing: true,
      link: "/admin/dashboard/help&support",
    },
    {
      title: "Customers",
      icon: <CiWallet />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        { title: "Customer List", link: "/admin/dashboard/all-customer" },
        { title: "Customer review", link: "/admin/dashboard/customer-review" },
        { title: "Wallet", link: "/admin/dashboard/wallet" },
        {
          title: "Wallet Bonus Setup",
          link: "/admin/dashboard/wallet-bonus-setup",
        },
        { title: "Loyality Points", link: "/admin/dashboard/loyality-points" },
      ],
    },
    {
      title: "Vendors",
      icon: <FiBarChart />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        { title: "Add new Vendor", link: "/admin/dashboard/add-vendor" },
        { title: "Vendor List", link: "/admin/dashboard/all-vendor" },
        { title: "Withdraw", link: "/admin/dashboard/vendor-withdraw" },
        { title: "Withdraw Methods", link: "/admin/dashboard/vendor-withdraw" },
      ],
    },
    {
      title: "Delivery Man",
      icon: <CiDeliveryTruck />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        { title: "Add new", link: "/admin/dashboard/add-deliveryman" },
        { title: "List", link: "/admin/dashboard/all-deliveryman" },
        { title: "Withdraw", link: "/admin/dashboard/deliveryman-withdraw" },
        {
          title: "Emergency Contact",
          link: "/admin/dashboard/emergency-contact",
        },
      ],
    },
    {
      title: "Employees",
      icon: <FaUserAstronaut />,
      spacing: true,
      subMenu: true,
      submenuItems: [
        {
          title: "Employee Role Setup",
          link: "/admin/dashboard/employee-role-setup",
        },
        { title: "Employee List", link: "/admin/dashboard/all-employee" },
      ],
    },
    {
      title: "Subscriber",
      icon: <FiUsers />,
      subHeader: true,
      subHeading: "BUSINESS SECTION",
    },

    {
      title: "Withdraw",
      icon: <CiWallet />,
      spacing: true,
    },
    {
      title: "Bank Information",
      icon: <CiBank />,
    },
    {
      title: "Shop Setting",
      icon: <IoHomeOutline />,
      spacing: true,
      link: "/settings",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller]);

  const [timeFilter, setTimeFilter] = useState(
    "?rangeType=months&rangeCount=12"
  );
  const [analyticData, setAnalyticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  useEffect(() => {
    if (searchTearm) {
      const filterMenu = adminSubMenus.filter(
        (menu) =>
          menu.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
          (menu.subMenu &&
            menu.submenuItems.some((subMenuItem) =>
              subMenuItem.title
                .toLowerCase()
                .includes(searchTearm.toLowerCase())
            ))
      );
      setSearchData(filterMenu);
    } else {
      setSearchData(null);
    }
  }, [searchTearm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterMenu = adminSubMenus.filter(
      (menu) =>
        menu.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
        (menu.subMenu &&
          menu.submenuItems.some((subMenuItem) =>
            subMenuItem.title.toLowerCase().includes(searchTearm.toLowerCase())
          ))
    );
    setSearchData(filterMenu);
  };

  const menusToDisplay = searchData || adminSubMenus;

  return (
    <section
      className={`bg-[#2a2589]  max-sm:hidden 1000px:block max-h-screen p-5 pt-8 sticky top-0 left-0 ${
        open ? "w-72" : "w-20"
      } duration-300 overflow-y-scroll overflow-x-hidden `}
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
        <input
          type="search"
          placeholder="Search"
          className={`text-base border-blue-500 bg-transparent w-full text-white focus:outline-none ${
            !open && "hidden"
          }`}
          value={searchTearm}
          onChange={(e) => setSearchTearm(e.target.value)}
        />
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            open && "mr-2"
          }`}
          onClick={handleSearch}
        />
      </div>

      <ul className="pt-2 " key={""}>
        {menusToDisplay.map((menu, index) => (
          <React.Fragment key={index}>
            <li
              className={`text-gray-300 text-sm flex items-center gap-x-4  cursor-pointer p-2 hover:bg-[#657082] rounded-md ${
                menu?.spacing ? "mt-3" : "mt-2"
              }`}
              onClick={() => toggleMenu(index)}
            >
              <Link
                to={menu?.link}
                className="text-2xl block float-left hover:scale-110"
              >
                {menu.icon}
              </Link>
              <span
                className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              >
                {menu.title}
              </span>
              {menu.subMenu && (
                <BsChevronDown
                  className={`${subMenuOpen === index && "rotate-180"}`}
                />
              )}
            </li>
            {menu.subMenu && subMenuOpen === index && open && (
              <ul className="">
                {menu.submenuItems.map((subMenuItem, subIndex) => {
                  // Define the colors for different order types
                  const getOrderColor = (orderType) => {
                    const colors = {
                      All: "bg-blue-400",
                      Confirmed: "bg-green-400",
                      Delivered: "bg-purple-400",
                      Returned: "bg-orange-400",
                      Canceled: "bg-red-400",
                    };
                    return colors[orderType] || "bg-gray-400"; // Default color
                  };
                  return (
                    <div
                      className="flex items-center justify-between hover:bg-[#657082] rounded-md duration-300"
                      key={subIndex}
                    >
                      <Link to={subMenuItem?.link}>
                        <li className="text-gray-300 text-sm font-medium flex items-center cursor-pointer p-2 px-7">
                          {subMenuItem.title}
                        </li>
                      </Link>

                      {subMenuItem?.notication > 0 && (
                        <div
                          className={`mr-3 flex items-center justify-center text-white rounded-full w-6 h-6 text-xs ${getOrderColor(
                            subMenuItem?.title
                          )}`}
                        >
                          {subMenuItem?.notication}
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            )}

            {menu?.subHeading && (
              <div className={`m-2 flex items-start `}>
                <h2
                  className={`text-[#e47a7a] ml-8 font-[500] text-[12px] ${
                    !open && "hidden"
                  }`}
                >
                  {menu?.subHeading}
                </h2>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>

      <div className="mt-10 mb-3 mx-3 rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]">
        <button className="w-fit">Logout</button>
      </div>
    </section>
  );
};

export default AdminSideBar;
