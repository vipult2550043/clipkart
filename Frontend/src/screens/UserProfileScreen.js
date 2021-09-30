import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { GET_PLACED_ORDER_DETAILS_RESET } from '../types/types';
import { getUserProfileAction, userUpdateAction } from '../actions/userAction';
import { Form, Button, Row, Col, Table, Card, Image, ListGroup } from 'react-bootstrap';
import { listAllUserOrdersAction, listPlacedOrderDetailsAction } from '../actions/orderAction';

const UserProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [changePassword, setChangePassword] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory()



    /*Getting tokens from login action*/
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    /*User Profile Action*/
    const userProfile = useSelector(state => state.userProfile);
    const { loading, error, user } = userProfile;

    /*List All Orders by User from listAllUserOrder*/
    const listPlacedOrderDetails = useSelector(state => state.listPlacedOrderDetails);
    const { loading: loadingPlacedOrder, error: errorPlacedOrder, ordersPlaced } = listPlacedOrderDetails;

    /*List Order details of user*/
    const listAllUserOrder = useSelector(state => state.listAllUserOrder);
    const { loading: loadingOrderList, error: errorOrderList, ordersList } = listAllUserOrder;

    // console.log(listPlacedOrderDetails.ordersPlaced ? (Object.keys(ordersPlaced).length === 0 ? 'not present' : ordersPlaced.orderItems[0].name) : ('...'))


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else if (error) {
            toast.warn(`Fill Correct details`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
        }
        else {
            if (!user.name) {
                //Getting user profie by dispatcing action
                dispatch(getUserProfileAction('profile'));
                dispatch(listAllUserOrdersAction())

            }
            else {
                dispatch({ type: GET_PLACED_ORDER_DETAILS_RESET })
                dispatch(listAllUserOrdersAction())
                setName(user.name);
                setEmail(user.email);

            }
        }


    }, [dispatch, history, userInfo, error, user]);

    const submitHandler = (e) => {
        e.preventDefault();


        if (password.length !== 0 && password.length < 6) {
            setMessage('Password min length is 6');

        }
        if (password !== confirmPassword) {
            setMessage('Password did not matched');
        }
        else if (name !== user.name || email !== user.email) {
            dispatch(userUpdateAction({ id: user._id, name, email, password }));
            toast.success(`User Updated`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
            setMessage(null)
            setChangePassword(false);
            setPassword('');
            setConfirmPassword('');

        } else if (password.length > 5 && password === confirmPassword) {
            dispatch(userUpdateAction({ id: user._id, name, email, password }));
            toast.success(`User Updated`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
            setMessage(null)
            setChangePassword(false);
            setPassword('');
            setConfirmPassword('');
        }


    }

    /*Order Details*/
    const placedOrderDetailsHandler = (id) => {
        dispatch(listPlacedOrderDetailsAction(id))

    }

    return (
        <Row>
            <Col md={4}>

                <h2>Profile</h2>
                <ToastContainer />
                {message ? <Message variant='danger'>{message}</Message> : ''}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label >Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label >Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                        {changePassword ? <>
                            <Form.Group controlId='password'>
                                <Form.Label >Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='confirm password'>
                                <Form.Label >Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Re-Enter password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </> : <label className="changePassword" style={{ marginTop: '10px' }}
                            onClick={() => setChangePassword(!changePassword)} >Change password
                            <link ></link>
                        </label>
                        }

                    </Form.Group>



                    <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
                {listAllUserOrder.ordersList ? (Object.keys(ordersList).length === 0 ? <Message variant='danger'>You dont have any orders</Message> : <>


                    {loadingOrderList ? <Loader /> : errorOrderList ? <Message variant='danger'>{errorOrderList}</Message> : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>PLACED ON</th>
                                    <th>TOTAL PRICE</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map(order => {
                                    return (
                                        <tr key={order._id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => placedOrderDetailsHandler(order._id)}>

                                            <td style={{ textTransform: 'uppercase' }}>{order._id} </td>
                                            <td>{order.createdAt.slice(0, 10)} </td>
                                            <td><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{order.totalPrice} </td>
                                            <td>{order.isPaid ? order.paidAt.slice(0, 10) : (
                                                'Cash On Delivery'
                                            )} </td>
                                            <td>{order.isDelivered ? order.paidAt.slice(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}>

                                                </i>
                                            )} </td>

                                        </tr>

                                    )
                                })}
                            </tbody>


                        </Table>
                    )}
                </>) : (<Loader />)}


                {listPlacedOrderDetails.ordersPlaced ? (Object.keys(ordersPlaced).length === 0 ? '' : <>

                    {ordersPlaced.orderItems && ordersPlaced.orderItems.map(item => {
                        return <Row key={item._id} style={{ marginTop: '10px' }} >


                            <Col md={3} style={{ borderRadius: '2px' }} >
                                <Card className='userOrderDetail'>
                                    <Link to={`/product/${item.product}`}>
                                        <Image src={item.image} alt={item.name} fluid rounded style={{ width: '15rem', height: '9.9rem', objectFit: 'fit'}}/>
                                    </Link>
                                </Card>
                            </Col>

                            <Col md={4} style={{ marginLeft: '-1.4rem', backgroundColor: '#3e3f40', borderRadius: '5px' }} >
                                <Card >
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <p><Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name} </Link></p>
                                            <p><strong>Qty: </strong>{item.qty} </p>
                                            <p><strong>Price: </strong><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{item.price}</p>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>

                        </Row>
                    })}

                </>) : <Loader />}

            </Col>

        </Row>

    )
}

export default UserProfileScreen

