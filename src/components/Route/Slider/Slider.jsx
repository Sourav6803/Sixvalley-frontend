
// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import "react-multi-carousel/lib/styles.css";
// import Countdown from 'react-countdown';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import styles from '../../../styles/styles';


// const responsive = {
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 5,
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 2,
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 2,
//     }
// };


// const Slider = () => {
//     const { allProducts } = useSelector(state => state.products)
//     const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

//     const renderer = ({ hours, minutes, seconds }) => {
//         return (
//             <div>
//                 <span className='text-[#7f7f7f] text-[12px] mx-auto w-[11/12]'>{hours} : {minutes} : {seconds} Left</span>
//             </div>
//         )
//     }

//     return (
//         <div className={`w-full bg-red-300 p-2 `}>
//             <div className='my-2 w-full bg-[#efeaea] flex rounded-md'>
//                 <p className='text-[12px] font-semibold ' style={{ padding: "15px 10px" }}>Deals Of the Day</p>
//                 <div className='flex ml-1 items-center'>
//                     <img src={timerURL} alt='' width={24} />
//                     <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
//                 </div>
//                 <button className={` m-auto text-white !bg-blue-700 !w-[100px] !h-[30px] rounded-md mt-2`}>View All</button>
//             </div>
//             <hr />

//             <div className='mt-2'>
//             {
//                 allProducts && <Carousel responsive={responsive}
//                     swipeable={false}
//                     draggable={false}
//                     centerMode={true}
//                     infinite={true}
//                     autoPlay={true}
//                     autoPlaySpeed={3000}
//                     keyBoardControl={true}
//                     showDots={false}
//                     containerClass="carousel-container"
//                     removeArrowOnDeviceType={["tablet", "mobile"]}
//                     dotListClass="custom-dot-list-style"
//                     itemClass="carousel-item-padding-10-px" >

//                     {
//                         allProducts && allProducts?.map((product, key) => (
//                             <div className='text-center border-2 rounded-md ' style={{ textAlign: "center", padding: "2px 2px" }} key={key}>

//                                 <Link to={`/product/${product?._id}`} className='rounded-md shadow-md'><img key={key} src={product?.images[0].url} alt='' style={{ width: "auto", height: "100px" }} /></Link>
//                                 <p className='font-semibold text-[14px]'>{product?.name.slice(0, 17)}...</p>
//                                 <p className='text-green-800 text-[12px]'>You will get {product.discountPercentage}% Off</p>
//                                 <p className='text-slate-600 text-[12px]'>{product?.tags}</p>

//                             </div>
//                         ))
//                     }
//                 </Carousel>
//             }
//             </div>
//         </div>
//     )

// }

// export default Slider



import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../../../styles/styles';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    }
};

const Slider = () => {
    const { allProducts } = useSelector(state => state.products);
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return (
            <div>
                <span className='text-[#7f7f7f] text-[12px] mx-auto'>{hours} : {minutes} : {seconds} Left</span>
            </div>
        )
    }

    return (
        <div className='w-full bg-white p-2'>
            <div className='my-2 w-full bg-[#efeaea] flex rounded-md p-2 items-center justify-between'>
                <p className='text-[14px] font-semibold'>Deals Of the Day</p>
                <div className='flex items-center'>
                    <img src={timerURL} alt='timer' width={24} />
                    <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                </div>
                <button className='bg-blue-700 text-white w-[100px] h-[30px] rounded-md'>View All</button>
            </div>
            <hr />

            <div className='mt-2'>
                {allProducts && 
                    <Carousel 
                        responsive={responsive}
                        swipeable={true}
                        draggable={true}
                        centerMode={false}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        keyBoardControl={true}
                        showDots={false}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-10-px"
                    >
                        {allProducts.map((product, key) => (
                            <div className='text-center  rounded-md  px-2' key={key}>
                                <Link to={`/product/${product?._id}`} className='block shadow-md rounded-md'>
                                    <img src={product?.images[0]?.url} alt={product.name} className='w-full h-[150px] object-contain' />
                                </Link>
                                <p className='font-semibold text-[14px] mt-2 '>{product?.name.slice(0, 17)}...</p>
                                {product?.dicountType === "Flat" ? <p className='text-green-600  '>Flat ₹{product.discountAmount} off</p> : <p className='text-green-600  '>{product?.discountAmount}% off</p>}
                                <p className='text-slate-600 text-[12px]'>{product?.tags}</p>
                            </div>
                        ))}
                    </Carousel>
                }
            </div>
        </div>
    )
}

export default Slider;


