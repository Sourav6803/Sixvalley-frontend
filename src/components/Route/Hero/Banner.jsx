import { styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import { useHistory, useNavigate } from 'react-router-dom';


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
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        height: 180,
    },
    loading: 'lazy' // Add lazy loading
}));

const Banner = () => {

    const { allBanner } = useSelector(state => state.banner)
    const mainbanner = allBanner?.filter(banner => banner?.bannerType === "Main Banner")

    const navigate = useNavigate();

    const handleBannerClick = (banner) => {
        console.log(banner.resourceValue)
        switch (banner.resourceType) {
            case 'Product':
                navigate(`/product/${banner.resourceValue}`);
                break;
            case 'Category':
                navigate(`/category/${banner.resourceValue}`);
                break;
            case 'Shop':
                navigate(`/shop/${banner.resourceValue}`);
                break;
            case 'Brand':
                navigate(`/brand/${banner.resourceValue}`);
                break;
            case 'URL':
                window.location.href = banner.resourceValue;
                break;
            default:
                break;
        }
    };


    return (
        <div className='p-2 bg-white'>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                keyBoardControl={true}
                showDots={true}
                slidesToSlide={1}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    Array.isArray(mainbanner) && mainbanner?.map(banner => (
                        <div key={banner?._id} onClick={() => handleBannerClick(banner)} style={{ cursor: 'pointer' }}>
                            <Image
                                src={banner?.bannerImg.url}
                                alt="banner"
                                id={banner?._id}
                            />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default Banner;