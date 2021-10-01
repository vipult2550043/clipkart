import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Products from '../Components/Products';
import Message from '../Components/Message';
import { listProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { CREATE_PRODUCT_REVIEW_RESET } from '../types/types';
import ProductCarosel from '../Components/ProductCarosel';
import { Link } from 'react-router-dom';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;


    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList); //productList is name of reducer inside combine reducers in store.js
    const { products, error, loading } = productList;


    useEffect(() => {
        dispatch(listProducts(keyword));

        /*Resetting product reviews*/
        dispatch({ type: CREATE_PRODUCT_REVIEW_RESET })

    }, [dispatch, keyword]);


    return (
        <>
            {!keyword ? <ProductCarosel></ProductCarosel> : <Link to='/' className='btn btn-dark' style={{ marginBottom: '3rem' }}>Go Back</Link>}

            {loading ? <Loader /> : productList && products.length !== 0 ? (

                <>

                    <h1>Latest Products</h1>
                    {error ? <h2>{error.message}</h2> : <Row>

                        {products.map((item) => {
                            return <Col key={item._id} sm={12} md={4} xl={3}>

                                <Products product={item}></Products>
                            </Col>
                        })}
                    </Row>}



                </>

            ) : <Message variant='danger'>No Product Available</Message>
            }



        </>
    )
}

export default HomeScreen
