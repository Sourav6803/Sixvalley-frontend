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
        height: 180
    }
}));

const soumyaBanner = () => {

     const bannerData = [
        { id: 1, url: 'https://img.freepik.com/free-psd/paint-draw-banner-template_23-2148516518.jpg?w=1060&t=st=1699579658~exp=1699580258~hmac=0ac7acb8908892bb795de69e5cce903a2219cea3d374743542280ab5fe934bf7', shopId: "653d07a19576c5beb8f13ca3" },
        { id: 2, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50', shopId: "653bd40414a4f73899732e0c" },
        { id: 3, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50' },
        { id: 4, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50' }
    ]

    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            keyBoardControl={true}
            showDots={true}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                bannerData.map(image => (
                    <Image src={image.url} alt="banner" id={image?.shopId} key={image.id} />
                ))
            }
        </Carousel>
    )
}

export default soumyaBanner;