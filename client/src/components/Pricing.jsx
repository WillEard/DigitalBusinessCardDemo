import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Button from 'react-bootstrap/esm/Button';
import { Container, Row, Col, Card } from 'react-bootstrap';


function PricingContainer() {
    return (
      <Container className="py-5 text-center">
        <h1 className="mb-4 display-3 fw-bold">Pricing</h1>
        <p className="lead mb-5">
          Choose the plan that fits your needs. Start for free or upgrade anytime.*
        </p>
  
        <Row className="justify-content-center">
          {/* Free Plan */}
          <Col md={5} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="py-3">
                <h4 className="my-0 fw-normal">Free</h4>
              </Card.Header>
              <Card.Body>
                <h2 className="card-title pricing-card-title">
                  £0 <small className="text-muted">/mo</small>
                </h2>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>All standard features</li>
                  <li>Update CV anytime</li>
                  <li>24/7 Support</li>
                  <li>Show number of CV viewers</li>
                </ul>
                <Button variant="outline-primary" className="w-100" disabled>
                  Free by default
                </Button>
              </Card.Body>
            </Card>
          </Col>
  
          {/* Paid Plan */}
          <Col md={5} className="mb-4">
            <Card className="h-100 border-primary shadow-sm">
              <Card.Header className="py-3 bg-primary text-white">
                <h4 className="my-0 fw-normal">DigiCard+</h4>
              </Card.Header>
              <Card.Body>
                <h2 className="card-title pricing-card-title">
                  £4.99 <small className="text-muted">/mo</small>
                </h2>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>CV Card customization</li>
                  <li>Custom QR design</li>
                  <li>24/7 Support</li>
                  <li>Show names of CV viewers</li>
                </ul>
                <Button variant="primary" className="w-100">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default PricingContainer;