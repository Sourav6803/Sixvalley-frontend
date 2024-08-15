

// import { Typography, Box, styled } from '@mui/material'; 
// import { categoriesData } from '../../../static/data';
// import { useNavigate } from 'react-router-dom';
 
//  const navData = [
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', text: 'Top Offers' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', text: 'Grocery' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', text: 'Mobile' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', text: 'Fashion' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', text: 'Electronics' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100', text: 'Home' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', text: 'Appliances' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', text: 'Travel' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', text: 'Beauty, Toys & More' }
// ];


// const Component = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'space-between',
//     //margin: '55px 130px 0 130px !important',
//     overflowX: 'overlay',
    
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: 'full',
//     [theme.breakpoints.down('lg')]: {
//         marginTop: ' !important',
//         marginLeft: '0 !important'
//     }
// }))

// const Container = styled(Box)`
//     padding: 12px 8px;
//     text-align: center
// `

// const Text = styled(Typography)`
//     font-size: 14px;
//     font-weight: 600;
//     font-family: inherit;
// `;

// const Image = styled('img')(({ theme }) => ({
    
//     justifyContent: 'space-between',
    
//     overflowX: 'overlay',
//     [theme.breakpoints.down('lg')]: {
//         width: '90px',
//         height: '50px'
//     }
// }))



// const Navbar = () => {
//     const navigate = useNavigate()

//     const handleSubmit = (i) => {
//         navigate(`/products?category=${i.title}`)
//     }
//     return (
//         <Component>
//             {
//                 categoriesData.map((temp, index )=> (
                    
//                     <Container key={index}>
//                         <Image src={temp.image_Url} className='rounded-full' style={{  width: 90 , height: 45 }}  alt=''  key={index}  onClick={() => handleSubmit(temp)}/>
//                         <Text>{temp.title.length > 6 ? temp.title.slice(0,5) : temp.title}..</Text>
//                     </Container>
                    
//                 ))
//             }
//         </Component>
//     )
// }

// export default Navbar;















// import { Typography, Box, styled } from '@mui/material'; 
// import { useNavigate } from 'react-router-dom';
// import { categoriesData } from '../../../static/data'; // Ensure the correct path to your data file

// const navData = [
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', text: 'Top Offers' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', text: 'Grocery' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', text: 'Mobile' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', text: 'Fashion' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', text: 'Electronics' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100', text: 'Home' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', text: 'Appliances' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', text: 'Travel' },
//     { url: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', text: 'Beauty, Toys & More' }
// ];

// const Component = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'space-between',
//     overflowX: 'auto',
//     padding: '0 16px',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: '100%',
//     [theme.breakpoints.down('lg')]: {
//         marginTop: '0 !important',
//         marginLeft: '0 !important'
//     }
// }));

// const Container = styled(Box)`
//     padding: 12px 8px;
//     text-align: center;
// `;

// const Text = styled(Typography)`
//     font-size: 14px;
//     font-weight: 600;
//     font-family: inherit;
// `;

// const Image = styled('img')(({ theme }) => ({
//     width: 90,
//     height: 45,
//     borderRadius: '50%',
//     cursor: 'pointer',
//     [theme.breakpoints.down('lg')]: {
//         width: '60px',
//         height: '30px'
//     }
// }));

// const Navbar = () => {
//     const navigate = useNavigate();

//     const handleSubmit = (category) => {
//         navigate(`/products?category=${category.title}`);
//     };

//     return (
//         <Component>
//             {categoriesData.map((category, index) => (
//                 <Container key={index}>
//                     <Image 
//                         src={category.image_Url} 
//                         alt={category.title} 
//                         onClick={() => handleSubmit(category)} 
//                     />
//                     <Text>{category.title.length > 6 ? `${category.title.slice(0, 5)}...` : category.title}</Text>
//                 </Container>
//             ))}
//         </Component>
//     );
// };

// export default Navbar;


















import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../../static/data'; // Ensure the correct path to your data file
import { useSelector } from 'react-redux';


const Navbar = () => {
    const navigate = useNavigate();
    const {allCategory} = useSelector(state=>state.category)
    

    const handleSubmit = (category) => {
        navigate(`/products?category=${category.name}`);
    };

    return (
        <div className="flex justify-between overflow-x-auto px-4 mx-auto w-full bg-white">
            {Array.isArray(allCategory) && allCategory?.map((category, index) => (
                <div key={index} className="p-3 text-center">
                    <img 
                        src={category.image.url} 
                        alt={category.name} 
                        className="w-24 h-12 md:w-20 md:h-10 lg:w-24 lg:h-12 rounded-full cursor-pointer" 
                        onClick={() => handleSubmit(category)}
                    />
                    <p className="text-sm font-semibold">
                        {category?.name?.length > 6 ? `${category.name.slice(0, 5)}...` : category.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Navbar;
