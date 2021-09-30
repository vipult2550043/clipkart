import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Image, Card, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import CheckoutSteps from '../Components/CheckoutSteps';
import { createOrderAction, removeOrderSuccess } from '../actions/orderAction';
import Loader from '../Components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET_CART_ITEM_AFTER_ORDER } from '../types/types';
import { useHistory } from 'react-router-dom'

const PlaceOrderScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    /*Fetching cart items from state*/
    const cart = useSelector(state => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;

    /*Fetching order items from state*/
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, orderInfo, success, error } = orderCreate;

    /*Fetching order details list and setting isPaid to false so that for next time we can place new order*/
    const orderDetails = useSelector(state => state.orderDetails);
    const { order: orderDetailIsPaid, } = orderDetails;

    if (orderDetails) {
        if (orderDetailIsPaid) {
            orderDetailIsPaid.isPaid = false;
        }
    }
    

    /*Creating an rounding integers function*/
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }


    /*Addding new properties to cart-->(itemPrice,itemTax) and calculation values*/
    cart.itemPrice = addDecimals(cartItems.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty);
    }, 0));

    cart.shippingPrice = addDecimals(cart.itemPrice < 1000 ? 200 : 100);
    cart.taxPrice = addDecimals(Number(0.15 * cart.itemPrice).toFixed(2));
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const placeOrderHandler = () => {
        dispatch(createOrderAction({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemPrice: cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
        dispatch({ type: RESET_CART_ITEM_AFTER_ORDER });

    }
    useEffect(() => {
        if (success) {
            toast.success(`Order placed`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
            history.push(`/orders/${orderInfo._id}`);
            dispatch(removeOrderSuccess());

        }
    }, [success]);

    return (
        <>
            {loading && <Loader></Loader>}
            {error ? <Message variant='danger'><h5>Unable to place order</h5></Message> : ''}
            <ToastContainer />
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address},{shippingAddress.city}{' '}
                                {shippingAddress.pincode},{' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method </h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items </h2>
                            {cartItems.length === 0 ? <Message variant='danger'>Your cart is empty</Message> : <>
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => {
                                        return <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image className='placedOrderImg' src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name} </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x <span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{item.price} = <span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{item.qty * item.price}
                                                </Col>



                                            </Row>
                                        </ListGroup.Item>
                                    })}
                                </ListGroup>
                            </>}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{cart.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>shipping</Col>
                                    <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' onClick={placeOrderHandler} disabled={cartItems === 0}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
