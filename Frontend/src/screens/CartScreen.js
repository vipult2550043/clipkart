import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form, Card } from 'react-bootstrap';
import Message from '../Components/Message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_PRODUCT_REVIEW_RESET } from '../types/types';

const CartScreen = ({ match, location, history }) => {
    const productID = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty));

            /*Resetting product reviews*/
            dispatch({ type: CREATE_PRODUCT_REVIEW_RESET })
        }
    }, [dispatch, productID, qty]);

    const removeFromCartHandler = (id, name) => {
        toast.error(`Removed item: ${name}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
        })
        dispatch(removeFromCart(id));
       
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')

    }
    return (
        <Row>
            <ToastContainer />
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message variant='danger'>Cart is Empty<Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>

                        {cartItems.map((item) => {
                            return <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image id='cartImg' src={item.image} alt={item.name} fluid rounded></Image>

                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((item) => {
                                                return <option key={item + 1} value={item + 1} style={{ color: 'black' }}>
                                                    {item + 1}

                                                </option>
                                            })}

                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product, item.name)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            <span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row >
    )
}

export default CartScreen
