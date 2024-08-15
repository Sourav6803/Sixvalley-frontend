import { Typography, Box, styled } from '@mui/material'; 
import { categoriesData, paintingSubCategoriesdata } from '../../../static/data';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '55px 130px 0 130px !important',
    overflowX: 'overlay',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '91.6667%',
    [theme.breakpoints.down('lg')]: {
        marginTop: '15px  !important',
        marginLeft: '0 !important'
    }
}))

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center
`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;

const Image = styled('img')(({ theme }) => ({
    
    justifyContent: 'space-between',
    
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        width: '90px',
        height: '50px'
    }
}))



const PaintingSubCat = () => {
    const navigate = useNavigate()
    const handleSubmit = async(i) => {
        await axios.get(`${server}/product/getProductBySubCAtegory`)
        navigate(`/products?category=Painting?subCtegory=${i.title}`)
    }
    return (
        <Component>
            {
                paintingSubCategoriesdata.map((temp, index )=> (
                    
                    <Container key={index}>
                        <Image src={temp.image_Url} style={{  width: 64 , height: 64 }}  alt=''  key={index}  onClick={() => handleSubmit(temp)}/>
                        <Text>{temp.title}</Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default PaintingSubCat;