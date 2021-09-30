import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { shippingAddressAction } from '../actions/cartAction';
import { Form, Button } from 'react-bootstrap';
import Message from '../Components/Message';
import CheckoutSteps from '../Components/CheckoutSteps';
import { useHistory } from 'react-router-dom'


const ShippingScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    /* Getting shipping address if already present*/
    const userShippingAddresss = useSelector(state => state.cart);
    const { shippingAddress } = userShippingAddresss;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [pincode, setPincode] = useState(shippingAddress.pincode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [message, setMessage] = useState(null);





    const submitHandler = (e) => {
        e.preventDefault();
        if (address.length === 0 || city.length === 0 || pincode.length === 0 || country.length === 0) {
            setMessage('Fill All details first')
        } else if (address.length !== 0 && city.length !== 0 && pincode.length !== 0 && country.length !== 0) {

            dispatch(shippingAddressAction({ address, city, pincode, country }))
            history.push('/payment')
        }

    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h1>Shipping Address</h1>
            {message ? <Message variant='danger'>{message}</Message> : ''}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label >Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label >City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='pincode'>
                    <Form.Label >Pincode</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter pincode'
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label >Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                    Proceed to payment
                </Button>
            </Form>

        </FormContainer>
    )
}

export default ShippingScreen
