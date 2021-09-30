import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Components/Loader';
import { Image, Card, Row, Col,ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import { getOrderDetailsAction, orderPayAction } from '../actions/orderAction';
import { PAY_ORDER_RESET } from '../types/types';

const PlacedOrderDetailScreen = ({ match }) => {

    const dispatch = useDispatch()
    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    /*Taking orderPay value from state and renaming loading to loadingPay*/
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;


    useEffect(() => {
        /*Addding paypal script and accessing clientId*/
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay) {
            /*Resettting order paid successfully*/
            dispatch({ type: PAY_ORDER_RESET })
            dispatch(getOrderDetailsAction(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [orderId, dispatch, successPay, order])

    const successPayementHandler = (paymentResult) => {
        dispatch(orderPayAction(orderId, paymentResult));

    }

    return (
        <div >

            {loading ? <Loader></Loader>
                : error
                    ? <>
                        <Message variant='danger'><h5>No orders currently</h5></Message>
                    </> :
                    <>
                        <h1 style={{ marginBottom: '20px', textDecoration: 'underline', fontSize: '1rem' }}>Order id: {order._id}</h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p><strong> Name: </strong> {order.user.name}</p>
                                        <p>
                                            <strong> Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                        </p>
                                        <p>
                                            <strong>Address: </strong>
                                            {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                                            {order.shippingAddress.pincode},{' '}
                                            {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ? <Message variant='success'><h6>Delivered</h6></Message> : <Message variant='danger'><h6>Not Delivered</h6></Message>}

                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Payment Method </h2>
                                        <p>
                                            <strong>Method: </strong>
                                            {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? <Message variant='success'><h6>Paid on {order.paidAt}</h6></Message> : <Message variant='danger'><h6>Not Paid</h6></Message>}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Order Items </h2>
                                        {order.orderItems.length === 0 ? <Message variant='danger'>Your cart is empty</Message> : <>
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => {
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
                                                <Col>{order.orderItems.length}</Col>

                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>shipping</Col>
                                                <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total</Col>
                                                <Col><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {!order.isPaid && (
                                            <ListGroup.Item>
                                                {loadingPay && <Loader />}
                                                {!sdkReady ? <Loader /> : (
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPayementHandler}>

                                                    </PayPalButton>
                                                )}
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                    </>
            }

        </div>
    )
}

export default PlacedOrderDetailScreen
