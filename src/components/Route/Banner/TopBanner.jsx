import React from 'react'
import { styled } from '@mui/material';
import Carousel from 'react-multi-carousel';



const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 100,
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 80
    }
}));

const TopBanner = () => {

     const bannerData = [
        { id: 1, url: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2023/10/31/b4109b95-e678-434d-b54b-074261528a2d1698752121691-MSB-Coupon--copy-3.jpg' },
        
    ]
    return (
        <div className='p-2 bg-white'>
            <Carousel
            
            responsive={responsive}
           
            autoPlaySpeed={4000}
            keyBoardControl={false}
            showDots={false}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                bannerData.map(image => (
                    <Image src={image.url} alt="banner" key={image.id} />
                ))
            }
        </Carousel>
        </div>
    )
}

export default TopBanner;