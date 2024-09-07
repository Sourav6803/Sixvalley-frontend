// navigation Data

import { FiInbox, FiUsers } from "react-icons/fi";

import { BiCard, BiMapPin, BiSolidOffer, BiUser } from "react-icons/bi";
// import mainLogo from "../../main_logo3.jpg";

import { IoIosNotificationsOutline } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { IoIosContact } from "react-icons/io";


import {
  MdOutlineDashboard, MdOutlineEventNote, MdOutlineStarBorder, MdOutlineStackedBarChart
} from "react-icons/md";
import { IoCartOutline, IoHomeOutline, IoDiamondOutline } from "react-icons/io5";
import { FaUsers, FaMicrophone, FaUserAstronaut, FaCcMastercard } from "react-icons/fa";
import { CiWallet, CiBank, CiDeliveryTruck } from "react-icons/ci";
import { FiBarChart } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";

import { BsHousesFill } from "react-icons/bs";
import { SlOrganization, SlNotebook } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { RiCustomerService2Fill, RiCustomerServiceFill } from "react-icons/ri";
import { AiOutlineOrderedList, AiOutlineQrcode } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";

export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 299₹",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H5.63636V24.1818H35"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M34.9982 1H11.8164V18H34.9982V1Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M11.8164 7.18164H34.9982"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: (
      <svg
        width="32"
        height="34"
        viewBox="0 0 32 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M30.7 2L29.5 10.85L20.5 9.65"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Affortable Prices",
    Description: "Get Factory direct price",
    icon: (
      <svg
        width="32"
        height="35"
        viewBox="0 0 32 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M16 28V22"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Painting",
    subTitle: "",
    image_Url:
      "https://www.shutterstock.com/shutterstock/photos/162908510/display_1500/stock-photo-color-palette-and-artistic-brush-raster-version-162908510.jpg",
  },
  {
    id: 2,
    title: "cosmetics",
    subTitle: "",
    image_Url:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
  },
  {
    id: 3,
    title: "Bottle painting",
    subTitle: "",
    image_Url:
      "https://housing.com/news/wp-content/uploads/2022/11/Bottle-painting-ideas.png",
  },
  {
    id: 4,
    title: "Cloths",
    subTitle: "",
    image_Url:
      "https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
  },
  {
    id: 5,
    title: "Potrait",
    subTitle: "",
    image_Url:
      "https://5.imimg.com/data5/SELLER/Default/2022/2/BQ/EG/JH/99206553/realistic-pencil-portrait.jpg",
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-photo/3d-render-gift-box-with-ribbon-present-package_107791-15904.jpg?size=626&ext=jpg&ga=GA1.1.154591421.1690217633&semt=ais",
  },
  {
    id: 7,
    title: "Home decoration",
    subTitle: "",
    image_Url: "https://media.istockphoto.com/id/936319628/photo/asian-golden-buddha-sign-of-peace-in-thai-temple-space-for-text.jpg?s=1024x1024&w=is&k=20&c=C9DgZ46RRAfMHgcXo063T7blmuFFDSfhmMP0f3L6ZPE=",
  },
  {
    id: 8,
    title: "Mobile",
    subTitle: "",
    image_Url:
      "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
  },
  {
    id: 9,
    title: "Music",
    subTitle: "",
    image_Url:
      "https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png",
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    image_Url:
      "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
  },
];

export const paintingSubCategoriesdata = [
  {
    id: 1,
    title: "Water Painting",
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/sunset.jpg'
  },
  {
    id: 2,
    title: "Wall Paintings",
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/Wall%20Art.jpg'
  },
  {
    id: 3,
    title: "Stll Live Drawing",
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/sprite.jpg'
  },
  {
    id: 4,
    title: 'Painted Pot',
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/sprite.jpg'
  },
  {
    id: 5,
    title: 'Canvas',
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/arclyc%20on%20canvas.jpg'
  },
  {
    id: 6,
    title: 'Charcol Art',
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/sprite.jpg'
  },
  {
    id: 7,
    title: 'Pencil Sketch',
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/msd1.jpg'
  },
  {
    id: 8,
    title: 'Pen Work',
    subTitle: '',
    image_Url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/pen.jpg'
  }
]

export const HomeAppliencesData = [
  
    {
      title: "Kitchen items",
      link: "/products?subCategory=Kitchen items",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/033/634/362/non_2x/kitchen-utensils-and-utensils-on-a-table-ai-generated-free-photo.jpg"
    },
    {
      title: "Home Furnishing",
      link: "/products?subCategory=Home Furnishing",
      imageUrl: "https://www.furnishingforum.com/assets/img/soft-furnishing.jpg"
    },
    {
      title: "Home Improvement Tools",
      link: "/products?subCategory=Home Improvement Tools",
      imageUrl: "https://cdn.vectorstock.com/i/1000v/39/58/construction-tools-with-house-vector-20073958.jpg"
    },
    {
      title: "Decor & Lighting",
      link: "/products?subCategory=Decor & Lighting",
      imageUrl: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2020/10/23183401/Optimise-2.jpg"
    },
    
  
]

export const Fashion = [
  {
    title: "Men's Fashion",
    link: "/products?subCategory=Men's fashion",
    imageUrl: "https://m.media-amazon.com/images/G/31/img21/MA2024/SS24flip/BBD/Kurta_and_Sets_978x1410._SX564_QL85_FMpng_.png"
  },
  {
    title: "Women's Fashion",
    link: "/products?subCategory=Women's Fashion",
    imageUrl: "https://m.media-amazon.com/images/G/31/img23/WA/2024/may/ss-flip/kurta/BBD/Ocassion-wear-kurtas_2._SS400_QL85_FMpng_.png"
  },
  {
    title: "Men's Footwear & Accessories",
    link: "/products?subCategory=Men's Footwear & Accessories",
    imageUrl: "https://png.pngtree.com/background/20240622/original/pngtree-assorted-mens-footwear-and-travel-outfits-with-matching-accessories-photo-picture-image_9455676.jpg"
  },
  {
    title: "Women's Footwear & Accessories",
    link: "/products?subCategory=Women's Footwear & Accessories",
    imageUrl: "https://thumbs.dreamstime.com/b/ladies-shoes-handbag-accessories-elegant-sunglass-leather-belt-display-41806121.jpg"
  },
  {
    title: "Men's Essential",
    link: "/products?subCategory=Men's Essential",
    imageUrl: "https://img.freepik.com/premium-photo/watch-watch-are-table-including-watch-sunglasses_1099577-1968.jpg?size=626&ext=jpg"
  },

  {
    title: "Women's Essential",
    link: "/products?subCategory=Women's Essential",
    imageUrl: "https://img.freepik.com/premium-photo/still-life-fashionista-womens-cosmetic-background-stylish-accessories-clothing-blogger-copying-space_1108314-312022.jpg?w=996"
  }
]

export const GroceryData = [
  {
    title: "Staples",
    link: "/products?subCategory=Staples",
    imageUrl: "https://i.pinimg.com/736x/ad/2d/bd/ad2dbdb55138c6d11ba7508a949ae53e.jpg"
  },
  {
    title: "Snakes & Beverage",
    link: "/products?subCategory=Snakes & Beverage",
    imageUrl: "https://image.cnbcfm.com/api/v1/image/103459147-20150309-8442-1118.jpg?v=1493209780"
  },
  {
    title: "Personal & Baby care",
    link: "/products?subCategory=Personal & Baby care",
    imageUrl: "https://reliefline.net/wp-content/uploads/2019/08/baby-care-kit-1.jpg"
  },
  {
    title: "Packeged Food",
    link: "/products?subCategory=Packeged Food",
    imageUrl: "https://media.gettyimages.com/id/458413277/photo/american-grocery-collection.jpg?s=612x612&w=gi&k=20&c=3hHyE2O-xsPENzm0GQ2C3jzqABEBPc66Z0ZDfggFmg4="
  },
  {
    title: "Household Care",
    link: "/products?subCategory=Household Care",
    imageUrl: "https://home2grocery.wordpress.com/wp-content/uploads/2016/12/grocery1.jpg"
  },
  
]

export const ElectronicsData = [
  {
    title: "Laptops",
    link: "/products?subCategory=Laptops",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2wABAAfzzuswZgPGUEAoxez5tQlcCHQa7wo1Q1Ctc9LNZl-VrukZgPfG7vqJxDRFe6c&usqp=CAU"
  },
  {
    title: "Headphones & Speaker",
    link: "/products?subCategory=Headphones & Speaker",
    imageUrl: "https://www.hindustantimes.com/ht-img/img/2023/10/06/550x309/Amazon_sale_2023_soundsbars_wireless_headphones_1696563407124_1696563428942.jpg"
  },
  {
    title: "Personal care appliance",
    link: "/products?subCategory=Personal care appliance",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/VG/KY/IP/101324992/jd8vhh8f-2022-01-28-16-50-10-407139-copy-500x500.png"
  },
  {
    title: "Computer Accessories",
    link: "/products?subCategory=Computer Accessories",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/11/363895594/QU/RK/IU/62569222/hp-laptop.png"
  },
  {
    title: "Cases, covers & more",
    link: "/products?subCategory=Cases, covers & more",
    imageUrl: "https://media.istockphoto.com/id/1310474222/photo/pile-of-multicolored-plastic-back-covers-for-mobile-phone-choice-of-smart-phone-protector.jpg?s=612x612&w=0&k=20&c=VfV0-KeZC-6NKJh-x69OScAy7X389AA5otrIvNU0dZU="
  },
  {
    title: "Mobile Accessories",
    link: "/products?subCategory=Mobile Accessories",
    imageUrl: "https://www.gizchina.com/wp-content/uploads/images/2023/03/mobile-phone-accessories.jpg"
  },
  {
    title: "Storage",
    link: "/products?subCategory=Storgae",
    imageUrl: "https://www.cleverfiles.com/howto/wp-content/uploads/2018/04/storage-devices.jpg"
  },
  {
    title: "Powerbank",
    link: "/products?subCategory=Powerbank",
    imageUrl: "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/07/13/128589.jpg"
  },
  {
    title: "Smart home automation",
    link: "/products?subCategory=Smart home automation",
    imageUrl: "https://d29rw3zaldax51.cloudfront.net/assets/images/automation-pdp-bundle/new-update-home-automail-m.jpg"
  },
  {
    title: "Mobile & Tablets",
    link: "/products?subCategory=Mobile & Tablets",
    imageUrl: "https://pbs.twimg.com/media/DXHwdPvVoAEoG4K.jpg"
  },
  {
    title: "Watch",
    link: "/products?subCategory=Watch",
    imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw34d84041/images/Titan/Catalog/1698KM02_1.jpg?sw=800&sh=800"
  },
  {
    title: "Camera",
    link: "/products?subCategory=Camera",
    imageUrl: "https://imgeng.jagran.com/images/2023/sep/best%20nikon%20cameras%20for%20photography%20ci1694172900406.jpg"
  },

]

export const FurnitureData = [
  {
    title: "Bed Room Furniture",
    link: "/products?subCategory=Bed Room Furniture",
    imageUrl: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2022/08/28101027/cupboard-design-with-mirrors-for-bedroom.jpg"
  },
  {
    title: "Living Room Furniture",
    link: "/products?subCategory=Living Room Furniture",
    imageUrl: "https://hemmingandwills.co.uk/cdn/shop/articles/featured_image_-_living_room_furniture_layout_1600x@2x.jpg?v=1692692232"
  },
  {
    title: "Study & Office Furniture",
    link: "/products?subCategory=Study & Office Furniture",
    imageUrl: "https://shop.gkwretail.com/cdn/shop/products/StudyTableStudyingWritingTableforHomeOffice_Bamboo_-1.jpg?v=1648379532"
  },
  {
    title: "Dining & Kitchen",
    link: "/products?subCategory=Dining & Kitchen",
    imageUrl: "https://i.pinimg.com/736x/5f/18/7e/5f187e85bdf1b403c6475b1882e23739.jpg"
  },
  {
    title: "Out Door Furniture",
    link: "/products?subCategory=Out Door Furniture",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/house-beautiful-outdoor-furniture-1630034394.jpeg"
  },
  {
    title: "Storage Furniture",
    link: "/products?subCategory=Storage Furniture",
    imageUrl: "https://www.nilkamalfurniture.com/cdn/shop/products/pebblely_48.jpg?v=1680787251&width=1080"
  },
  {
    title: "Kids Room",
    link: "/products?subCategory=Kids Room",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/1/376542683/RM/FP/HY/2103967/100929-970-500x500.jpg"
  },

]


export const CraftPaintingsData = [
  {
    title: "Paintings",
    link: "/products?subCategory=Paintings",
    imageUrl: "https://img.artpal.com/116422/4-23-4-22-8-4-13m.jpg"
  },
  {
    title: "Craft's",
    link: "/products?subCategory=Craft's",
    imageUrl: "https://therealschool.in/blog/wp-content/uploads/2021/04/Paper-crafting-fun-activity-for-kids.jpg"
  },
  {
    title: "Mixed Media Art",
    link: "/products?subCategory=Mixed Media Art",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqiU8d52ot5ZzciQh_4RIVhjn01DKZyMaQag&s"
  },
 
  

]



// product Data
export const productData = [
  {
    id: 1,
    category: "Computers and Laptops",
    name: "MacBook pro M2 chipset 256gb ssd 8gb ram space-gray color with apple 1 year warranty",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
    ],
    shop: {
      name: "Apple inc.",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 1099,
    discount_price: 1049,
    rating: 4,
    total_sell: 35,
    stock: 10,
  },
  {
    id: 2,
    category: "Mobile and Tablets",
    name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    discount_price: 1099,
    rating: 5,
    total_sell: 80,
    stock: 10,
    category: "Mobile & Tablets"
  },
  {
    id: 1,
    category: "Computers and Laptop",
    name: "MacBook pro M2 chipset 256gb ssd 8gb ram space gray color with apple 1 year warranty",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
    ],
    shop: {
      name: "Apple inc.",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 1099,
    discount_price: 1049,
    rating: 4,
    total_sell: 75,
    stock: 10,
    category: "Computers & Laptop"
  },
  {
    id: 4,
    category: "Others",
    name: "New Fashionable Watch for men 2023 with multiple colors",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
    ],
    shop: {
      name: "Shahriar Watch House",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
      category: "Others"
    },
    price: 100,
    discount_price: 79,
    rating: 4,
    total_sell: 12,
    stock: 10,
  },
  {
    id: 5,
    category: "Shoes",
    name: "New Trend shoes for gents with all sizes",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
      },
      {
        public_id: "test",
        url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 120,
    discount_price: 89,
    rating: 5,
    total_sell: 49,
    stock: 10,
    category: "Shoes"
  },
  {
    id: 1,
    name: "Gaming Headphone Asus with mutiple color and free delivery",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
      {
        public_id: "test",
        url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
      },
    ],
    shop: {
      name: "Asus Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 300,
    discount_price: 239,
    rating: 4.5,
    reviews: [
      {
        user: {
          // user object will be here
        },
        comment: "IT's so cool!",
        rating: 5,
      },
    ],
    total_sell: 20,
    stock: 10,
    category: "Music and Gaming"
  },
  {
    id: 4,
    name: "New Fashionable Watch for men 2023 with multiple colors",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
    ],
    shop: {
      name: "Shahriar Watch House",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 100,
    discount_price: 79,
    rating: 4,
    total_sell: 62,
    stock: 10,
  },
  {
    id: 1,
    name: "Gaming Headphone Asus with mutiple color and free delivery",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
      {
        public_id: "test",
        url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
      },
    ],
    shop: {
      name: "Asus Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 300,
    discount_price: 239,
    rating: 4.5,
    reviews: [
      {
        user: {
          // user object will be here
        },
        comment: "IT's so cool!",
        rating: 5,
      },
    ],
    total_sell: 20,
    stock: 10,
  },
  {
    id: 2,
    category: "Mobile and Tablets",
    name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    discount_price: 1099,
    rating: 5,
    total_sell: 20,
    stock: 10,
  },
  {
    id: 1,
    category: "Music and Gaming",
    name: "Gaming Headphone Asus with mutiple color and free delivery",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
      {
        public_id: "test",
        url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
      },
    ],
    shop: {
      name: "Asus Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 300,
    discount_price: 239,
    rating: 4.5,
    reviews: [
      {
        user: {
          // user object will be here
        },
        comment: "IT's so cool!",
        rating: 5,
      },
    ],
    total_sell: 20,
    stock: 10,
  },
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about"
  },
  {
    name: "Careers",
    link: "/carrers"
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Reviews",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Shipping",
  },
  {
    name: "Live chat",
  },
];

export const adminSubMenus = [
  {
    title: "DASHBOARD",
    icon: <MdOutlineDashboard />,
    subHeader: true,
    subHeading: "ORDER MANAGEMENT",
    link: "/admin/dashboard"
  },
  {
    title: "Order",
    icon: <IoCartOutline />,
    spacing: true,
    subMenu: true,
    submenuItems: [
      { title: "All", notication: 80, link: "#" },
      { title: "Pending", notication: 80, link: "#" },
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
    title: "Category Setup",
    icon: <IoDiamondOutline />,
    subMenu: true,
    spacing: true,
    submenuItems: [
      { title: "Categories", link: "/admin/dashboard/category" },
      { title: "Sub Categories", link: "/admin/dashboard/sub-category" },
      { title: "Sub Sub Categories", link: "/admin/dashboard/sub-sub-category" },
    ]
  },
  {
    title: "Brands",
    icon: <MdOutlineStarBorder />,
    subMenu: true,
    submenuItems: [
      { title: "Add New", link: "/admin/dashboard/brand" },
      { title: "List", link: "/admin/dashboard/all-brand" },
    ]
  },

  {
    title: "Product Attribute Setup",
    spacing: true,
    subHeader: true,
    icon: <FaUsers />,
    link: "/admin/dashboard/add-attribute"
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
    ]
  },

  {
    title: "Vendor Products",
    spacing: true,
    subHeader: true,
    icon: <SlOrganization />,
    subMenu: true,
    submenuItems: [
      { title: "New Product Request", link: "/admin/dashboard/new-product-request" },
      { title: "Product Update Request", link: "/admin/dashboard/update-product-request" },
      { title: "Approved Products", link: "/admin/dashboard/approved-product" },
      { title: "Denided Products", link: "/admin/dashboard/denided-product" },
    ]
  },
  {
    title: "Product gallery",
    spacing: true,
    subHeader: true,
    subHeading: "PROMOTION MANAGEMENT",
    icon: <SlNotebook />,
    link: "/admin/dashboard/product-gallery"
  },
  {
    title: "Banner Setup",
    spacing: true,
    icon: <AiOutlineQrcode />,
    link: "/admin/dashboard/banner"
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

    ]
  },
  {
    title: "Notificatios",
    spacing: true,
    icon: <IoIosNotificationsOutline />,
    subMenu: true,
    submenuItems: [
      { title: "Send notification", link: "/admin/dashboard/send-notification" },
      { title: "Push notification setup", link: "/admin/dashboard/push-notification" },
    ]
  },
  {
    title: "Annoucement",
    spacing: true,
    icon: <FaMicrophone />,
    subHeader: true,
    subHeading: "REPORT & ANALYTICS",
    link: "/admin/dashboard/annocument"
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
      { title: "Transaction Report", link: "/admin/dashboard/transaction-report" },
    ]
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
    link: "/admin/dashboard/inbox"
  },
  {
    title: "Messages",
    icon: <TiMessages />,
    spacing: true,
    link: "/admin/dashboard/message"
  },
  {
    title: "Support & Tickets",
    icon: <RiCustomerService2Fill />,
    subHeader: true,
    subHeading: "User Managment",
    spacing: true,
    link: "/admin/dashboard/help&support"
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
      { title: "Wallet Bonus Setup", link: "/admin/dashboard/wallet-bonus-setup" },
      { title: "Loyality Points", link: "/admin/dashboard/loyality-points" },
    ]
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
    ]
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
      { title: "Emergency Contact", link: "/admin/dashboard/emergency-contact" },
    ]
  },
  {
    title: "Employees",
    icon: <FaUserAstronaut />,
    spacing: true,
    subMenu: true,
    submenuItems: [
      { title: "Employee Role Setup", link: "/admin/dashboard/employee-role-setup" },
      { title: "Employee List", link: "/admin/dashboard/all-employee" },
    ]
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
    link: "/settings"
  }
]

export const colorNames = [
  "transparent",
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy"
];

export const ProfileMenu = [
  {
    title: "Home",
    icon: <MdOutlineDashboard />,
    link: "/"
  },
  {
    title: "Profile",
    icon: <BiUser/>,
    link: "/profile",
    active: 1
  },
  {
    title: "Order",
    icon: <GiShoppingBag />,
    link: "/user/order",
    active: 2
  },
  {
    title: "Saved Card",
    icon: <FaCcMastercard/>,
    link: "/user/card",
  },
  {
    title: "Saved Addresses",
    icon: <BiMapPin/>,
    link: "/user/address"
  },
  {
    title: "FAQs",
    icon: <FaQuestionCircle />,
    link: "/faq"
  },
  
  {
    title: "Contact Us",
    icon: <IoIosContact />,
    link: "/contact-us"
  },
  {
    title: "Help & Support",
    icon: <RiCustomerServiceFill />,
    link: "/"
  },
]
