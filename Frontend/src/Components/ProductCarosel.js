import React, { useEffect } from 'react'
import { getTopProductsAction } from '../actions/productAction';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Carousel } from 'react-bootstrap';
import LoaderNew from '../Components/LoaderNew';
import Message from '../Components/Message';


const ProductCarosel = () => {
    const dispatch = useDispatch();
    const getTopProducts = useSelector(state => state.getTopProducts);
    const { loading, error, products } = getTopProducts;
    console.log(products)

    useEffect(() => {
        dispatch(getTopProductsAction())
    }, [dispatch])

    return (
        <>
            {loading ? '' : error ? <Message variant='danger'>{error}</Message> : (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map((product) => {
                        return <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid style={{objectFit:'cover',height:'25rem',width:'35rem'}}></Image>
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name} (<span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{product.price})</h2>
                                    
                                </Carousel.Caption>
                                
                            </Link>
                        </Carousel.Item>
                    })}

                </Carousel>
            )}
        </>

    )
}

export default ProductCarosel
