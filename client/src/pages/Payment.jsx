import React, { useState } from "react";
import { FaCcPaypal } from "react-icons/fa";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Nav,
} from "react-bootstrap";

import Navbar from "../components/Navbar";
import '../Fonts.css'; // Import custom font styles
 

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment process
    setTimeout(() => {
      alert("Payment Successful!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
  <div className="login-overlay flex-grow-1">

        <Navbar />
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4 text-center mt-5 fontNormal display-4">Subscription Payment</h2>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Plan: <strong>Pelago Premium</strong></h5>
              <p className="mb-4">Amount: <strong>£4.99</strong>/month</p>

              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-3" controlId="nameOnCard">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control type="text" required placeholder="Jane Doe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" required placeholder="1234 5678 9012 3456" />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="expiry">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control type="text" required placeholder="MM/YY" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control type="password" required placeholder="123" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="billingAddress">
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Control type="text" required placeholder="123 Main St, City, Country" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-50 mx-auto justify-content-center d-flex" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
                <hr/>
                <div className="justify-content-center d-flex mb-2">Or</div>
                <div className="justify-content-center mx-auto d-flex">
                    <Button><FaCcPaypal size={'36px'}/></Button>
                </div>
                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default PaymentPage;