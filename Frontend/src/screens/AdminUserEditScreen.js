import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { adminGetUserProfileByIdAction, adminUpdateUserProfileByIdAction, userUpdateAction } from '../actions/userAction';
import { Form, Button } from 'react-bootstrap';

const AdminUserEditScreen = ({ match, history }) => {
    const userID = match.params.id;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();


    /*User Profile Action*/
    const adminGetUserById = useSelector(state => state.adminGetUserById);
    const { loading, error, user } = adminGetUserById;

    useEffect(() => {

        if (!user.name) {
            //Getting user profie by dispatching action
            dispatch(adminGetUserProfileByIdAction(userID));


        }
        else {
            setName(user.name);
            setEmail(user.email);
            if (user && user.isAdmin) {
                setIsAdmin(true)
            }


        }

    }, [dispatch, loading, user, userID]);

    const submitHandler = (e) => {
        e.preventDefault();


        if (name !== user.name || email !== user.email || isAdmin !== user.isAdmin) {
            dispatch(adminUpdateUserProfileByIdAction(userID, { name, email, isAdmin }));
            toast.success(`User Updated`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

            /*Updating user profile and resetting admin user profile*/
            dispatch(userUpdateAction({ id: userID, name, email }));
        }

    }
    return (
        <>
            <Link className='btn btn-light my-2' to='/admin/users' style={{ textDecoration: 'underline' }}>Go Back</Link>

            <FormContainer>
                <h1> Update User</h1>
                <ToastContainer />
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
                    </Form.Group>
                    <Form.Check type='checkbox'
                        style={{ marginTop: '5px' }}
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}>

                    </Form.Check>
                    <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                        Update
                    </Button>
                </Form>


            </FormContainer>
        </>
    )
}

export default AdminUserEditScreen
