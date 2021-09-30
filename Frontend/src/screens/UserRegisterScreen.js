import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { userRegisterAction } from '../actions/userAction';
import { Form, Button, Row, Col } from 'react-bootstrap';


const UserRegisterScreen = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
            toast.success(`User Created`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
        }
        else if (error) {
            toast.warn(`Details required`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
        }
    }, [history, userInfo, redirect, error]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password.length === 0 && email.length === 0 && name.length === 0) {
            setMessage('Enter details first')

        }
        else if ( email.length === 0 ) {
            setMessage('Enter email')

        }
        else if (name.length === 0) {
            setMessage('Enter name')

        }
        else if (password !== confirmPassword) {
            setMessage('Password did not matched')
        }
        else if (password.length === 0 && email.length !== 0 && name.length !== 0) {
            setMessage('Please enter password');

        }
        else if (password.length === 0 && email.length !== 0 && name.length !== 0 && confirmPassword.length === 0) {
            setMessage('Please enter confirm password');

        }
        else if (password.length < 6 && email.length !== 0 && name.length !== 0) {
            setMessage('Password should be greater than 5');

        }
        else if (password.length >= 6 && email.length !== 0 && name.length !== 0) {
            dispatch(userRegisterAction(name, email, password));

        }

    }
    return (
        <FormContainer>
            <h1>Create User</h1>
            <ToastContainer />
            {message ? <Message variant='danger'>{message}</Message> : ''}

            {error && <Message variant='danger'><h6>{error.response.request.status === 500 ? 'Enter data in each Field' : null}</h6></Message>}
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
                <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                    Create
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already have account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default UserRegisterScreen
