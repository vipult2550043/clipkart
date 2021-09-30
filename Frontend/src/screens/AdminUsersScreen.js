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
import { ADMIN_GET_USER_BY_ID_RESET } from '../types/types';

const AdminUsersScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();


    /*Getting isAdmin from login action and redirecting if user is not admin*/
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    /*Getting userList from adminUserList*/
    const adminUserList = useSelector(state => state.adminUserList);
    const { loading, users, error } = adminUserList;

    const adminUserDelete = useSelector(state => state.adminUserDelete);
    const { loading: deleteUserLoading, user, error: deleteUserError } = adminUserDelete;

    useEffect(() => {
        if (userInfo) {
            if (!userInfo.isAdmin) {
                history.push('/')
            }
            else {
                dispatch(adminGetUserListAction());
                
                /*Resetting user profile to empty object*/
                dispatch({ type: ADMIN_GET_USER_BY_ID_RESET})
            }
        }

    }, [history, userInfo, dispatch, deleteUserLoading])

    /*Handler*/
    const deleteUserHandler = (UserId, userName) => {
        if (window.confirm('Are you sure?')) {
            dispatch(adminDeleteUserAction(UserId))
            toast.success(`User deleted ${userName}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
        }

    }
    return (
        <>
            <h1>Users</h1>
            <ToastContainer />

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>USER ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return <tr key={user._id}>
                                <td style={{ textTransform: 'uppercase' }}>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className='btn-sm' variant='light'>
                                            <i className='fas fa-edit' ></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' variant='danger' onClick={() => deleteUserHandler(user._id, user.name)}>
                                        <i className='fas fa-trash'></i>

                                    </Button>
                                </td>



                            </tr>
                        })}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default AdminUsersScreen
