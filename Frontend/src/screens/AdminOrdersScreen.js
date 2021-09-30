import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { adminGetUserListAction, adminDeleteUserAction } from '../actions/userAction';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { GET_PLACED_ORDER_DETAILS_RESET } from '../types/types';
import { adminListAllOrdersAction } from '../actions/orderAction';


const AdminOrdersScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    /*Getting isAdmin from login action and redirecting if user is not admin*/
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    /*Getting All Orders from adminListAllOrders*/

    const adminListAllOrders = useSelector(state => state.adminListAllOrders);
    const { orders, loading, error } = adminListAllOrders;


    useEffect(() => {
        if (userInfo) {
            if (!userInfo.isAdmin) {
                history.push('/')
            }
            else {
                dispatch(adminListAllOrdersAction());

                /*Resetting Placed order list to empty array*/
                dispatch({ type: GET_PLACED_ORDER_DETAILS_RESET });

            }
        }

    }, [history, userInfo, dispatch])

    /*Handler*/

    return (
        <>
            <h1>Orders List</h1>
            <ToastContainer />

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return <tr key={order._id}>
                                <td style={{ textTransform: 'uppercase' }}>{order._id}</td>
                                <td><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.slice(0, 10) : 'Cash on delivery'}</td>
                                <td>{order.isDelivered ? 'Delivered': (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )} </td>
                                <td>
                                    <LinkContainer to={`/admin/order/${order._id}/edit`}>
                                        <Button className='btn-sm' variant='light'>
                                            <i className='fas fa-info-circle' ></i> Details
                                        </Button>
                                    </LinkContainer>

                                </td>

                            </tr>
                        })}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default AdminOrdersScreen
