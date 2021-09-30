import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { userLoginAction } from '../actions/userAction';
import FormContainer from '../Components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'

const LoginScreen = ({ location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const userLoginSelector = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLoginSelector;
    const redirect = location.search ? location.search.split('=')[1] : '/'




    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
            // toast.success(`Login Success:`, {
            //     position: toast.POSITION.TOP_CENTER,
            //     autoClose: 2000
            // })
        }
        else if (error) {
            toast.error(`Login failed:`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            })
        }
    }, [history, userInfo, redirect, error]);

    const submitHandler = async (e) => {

        e.preventDefault();
        if (email.length !== 0 && password.length !== 0) {
            dispatch(userLoginAction(email, password));

        }
    }

    return (
        <FormContainer>
            <ToastContainer />
            <h1>Sign In</h1>
            {error && <Message variant='danger'><h6>{error ? error.response.data.message : null}</h6></Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler} >
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
                <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>

    )
}

export default LoginScreen
