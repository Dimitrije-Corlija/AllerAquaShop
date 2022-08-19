import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import  CheckoutSteps  from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        navigate("/shipping");
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder");
    }
    return (
        <FormContainer>
          <CheckoutSteps  step2 step3 />
          <h1 style={{margin: '60px 0 0 0'}}>Payment Method</h1>
          <Form 
          onSubmit={submitHandler}
          className="text-center"
          style={{ width: "100%", margin: '5px 0 0 0'}}
          >
            <Form.Group>
              <Form.Label as='legend'>Select payment method</Form.Label>
              <Col>
                <Form.Check
                  style={{padding: '5px'}}
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                 <Form.Check
                  style={{padding: '5px'}}
                  type='radio'
                  label='Stripe'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check> 
              </Col>
            </Form.Group>
    
            <div style={{ padding: "10px" }}>
            <Button type="submit" variant="primary">
              Continue
          </Button>
        </div>
          </Form>
        </FormContainer>
      )
    }

export default PaymentScreen