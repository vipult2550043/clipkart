import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { paymentMethodAction } from '../actions/cartAction';
import CheckoutSteps from '../Components/CheckoutSteps';
import { useHistory } from 'react-router-dom'


const PaymentScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    /* Getting shipping address if already present*/
    //const cart = useSelector(state => state.cart);

    const [paymentMode, setPaymentMode] = useState('PayPal');


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(paymentMethodAction(paymentMode))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='payment'>
                    <Form.Label as='legend' style={{ margin: '5px' }}>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='Paypal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMode(e.target.value)}>

                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Phonpe or Paytm'
                            id='UPI'
                            name='paymentMethod'
                            value='Phonpe/Paytm'
                            onChange={(e) => setPaymentMode(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                    Continue
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
