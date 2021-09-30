import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, createProductReviewAction } from '../actions/productAction';
import Message from '../Components/Message';
import Loader from '../Components/Loader';


const ProductScreen = ({ match, history }) => { //Destructing from props we get match,history ..etc
    const productID = match.params.id;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    /*Getting user info*/
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    /*Getting product Details from store*/
    const productDetails = useSelector(state => state.productDetails);
    const { product, error, loading } = productDetails;

    /*Getting Product Review from store*/
    const createProductReview = useSelector(state => state.createProductReview);
    const { success: productReviewSuccess, error: productReviewError, loading: productReviewLoading } = createProductReview;

    useEffect(() => {
        /*Scrolling page to top when page load*/
        window.scrollTo(0, 0);
        dispatch(detailsProduct(productID));
    }, [dispatch, productID, productReviewLoading]);

    /*Handler*/
    const addToCartHandler = () => {
        history.push(`/cart/${productID}?qty=${qty}`)

    }
    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        if (rating && comment) {
            dispatch(createProductReviewAction(productID, { rating, comment }))
            setRating(0);
            setComment('');
        }

    }
    return (
        <>
            {loading ? <Loader></Loader> : error ? <h2>{error}</h2> : <>
                <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
                <Row>

                    <Col md={6}>
                        <Image id='productDetailScreen' src={product.image} alt={product.name} fluid ></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating}
                                    text={`${product.numReviews} reviews`}></Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price:${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description:{product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>
                                            <span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{product.price}
                                        </strong>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty </Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => { setQty(e.target.value) }}>

                                                {[...Array(product.countInStock).keys()].map((item) => {
                                                    return <option key={item + 1} value={item + 1} style={{ color: 'black' }}>
                                                        {item + 1}
                                                    </option>
                                                })}


                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className='btn-block' type='button'
                                    disabled={product.countInStock === 0 ? true : false}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row style={{ marginTop: '6rem' }}>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {productReviewSuccess && <Message variant='success'>Review Submitted</Message>}
                        {product.reviews.length === 0 && <Message variant='danger'>No Review</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => {
                                return <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong> <strong>{review.createdAt.slice(0, 10)}</strong>

                                    <Rating value={review.rating}></Rating>
                                    <p>{review.comment}</p>

                                </ListGroup.Item>
                            })}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {productReviewError && <Message variant='danger'>Product Already Reviewed</Message>}
                                {userInfo ? (
                                    <Form onSubmit={reviewSubmitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}>

                                                <option value=''>Select..</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Button style={{ marginTop: '1rem' }} type='submit' variant='primary'>
                                            Submit
                                        </Button>
                                    </Form>
                                ) : <Message>Please <Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}> sign in </Link> to write a review</Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>}

        </>
    )
}

export default ProductScreen
