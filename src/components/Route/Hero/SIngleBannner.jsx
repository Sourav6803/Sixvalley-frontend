
import React from 'react';

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
    height: 280,
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 80
    }
}));

const SingleBanner = () => {

    const bannerData = [
        { id: 1, url: 'https://storiesflistgv2.blob.core.windows.net/stories/2021/05/FKSfooterbanner_new__.jpg' },

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

export default SingleBanner;