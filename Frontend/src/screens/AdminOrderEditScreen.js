import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { Row, Form, Col, Button,Image } from 'react-bootstrap';
import { listPlacedOrderDetailsAction } from '../actions/orderAction'

const AdminOrderEditScreen = ({ match }) => {
    const orderID = match.params.id;
    const dispatch = useDispatch();
    const [delivered, setDelivered] = useState(false);
    /*Product Details List information*/
    const listPlacedOrderDetails = useSelector(state => state.listPlacedOrderDetails);
    const { ordersPlaced, loading, error } = listPlacedOrderDetails;

    useEffect(() => {
        if (ordersPlaced && ordersPlaced.length === 0) {
            //Getting order profie by dispatching action
            dispatch(listPlacedOrderDetailsAction(orderID));

        }
        else {
            if (ordersPlaced && ordersPlaced.isDelivered) {
                setDelivered(true);
            }
        }

    }, [dispatch, loading, ordersPlaced, orderID]);



    const orderUpdateHandler = (e) => {
        e.preventDefault();
        console.log(orderID,delivered);


    }
    return (
        <>
            <Link className='btn btn-light my-2' to='/admin/orders' style={{ textDecoration: 'underline' }}>Go Back</Link>
            {error ? <Message variant='danger'>{error}</Message> : ''}
            {loading ? <Loader /> : ''}
            <ToastContainer />
            <FormContainer>

                {ordersPlaced && ordersPlaced.user ? <>
                    <h2 style={{textDecoration:'underline', fontSize:'1.1rem'}}> Order Details {ordersPlaced._id}</h2>
                    <Row>                      
                    <Form.Group>
                        <Form.Label style={{ textTransform: 'capitalize' }}>Customer: {ordersPlaced.user.name}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label >Mail: <a style={{textDecoration:'none'}} href={`mailto:${ordersPlaced.user.email}`}>{ordersPlaced.user.email}</a></Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={{ textTransform: 'capitalize' }}>Address: {ordersPlaced.shippingAddress.address}, {ordersPlaced.shippingAddress.pincode}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={{ textTransform: 'capitalize' }}>City: {ordersPlaced.shippingAddress.city}</Form.Label>
                    </Form.Group>

                    {ordersPlaced.orderItems.map((item, index) => {
                        return <Form.Group key={item._id} style={{ marginBottom:'1rem' }} >

                            <Link to={`/product/${item.product}`} >
                                <Form.Label style={{ cursor: 'pointer' }}>{`${index + 1}.`} {item.name} | Qty: {item.qty}</Form.Label>
                            </Link>
                            <Col md={2}>
                                <Link to={`/product/${item.product}`}> <Image id='adminOrdersDetailImg' src={item.image} alt={item.name} fluid rounded /></Link>
                            </Col>
                        </Form.Group>
                    })}

                    <Form.Group>
                            <Form.Label >Total Price: <span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{ordersPlaced.totalPrice}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label >Paid on: {ordersPlaced.isPaid ? ordersPlaced.paidAt.slice(0, 10) : 'Not Paid'}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label >Delivered: {ordersPlaced.isDelivered ? 'Delivered' : 'Not Delivered'}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Button onClick={orderUpdateHandler} variant='primary' style={{ marginTop: '1rem' }}>
                            Update
                        </Button>
                    </Form.Group>
                    </Row>
                </> : ''}

            </FormContainer>

        </>
    )
}

export default AdminOrderEditScreen
