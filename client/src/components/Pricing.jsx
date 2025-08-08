// React
import { useContext, useEffect } from 'react';

// App Context
import { AppContext } from '../context/AppContext';

// React Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Styles
import '../styles/Fonts.css';
import '../styles/Pricing.css'; // Import your pricing styles

// Icons
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function PricingContainer() {
    return (
      <Container fluid id="pricing" className="pricing py-5 ">
        <h1 className="mb-4 pricing-heading text-center display-3">Pricing</h1>
       
        <Row className="justify-content-center ">
          {/* Free Plan */}
          <Col md={4} className="mb-4 ">
            <Card className="h-100 shadow-sm free-plan text-center rounded-5">
              <Card.Header className="py-3">
                <h4 className="my-0 free-heading fontNormal">Free</h4>
              </Card.Header>
              <Card.Body className='plan-content mb-3'>
                <ul className="list-unstyled mt-3 fontCondensed" >
                  <li><FaCheck className="icon-inline"/>Create Cards</li>
                  <li><FaCheck className="icon-inline"/>QR Sharing</li>
                  <li><RxCross2 className="icon-inline"/>24/7 Support</li>
                  <li><RxCross2 className="icon-inline"/>Show number of CV viewers</li>
                </ul>
                <Button className="rounded-5 btn-lg free-button" >
                  Stay Free
                </Button>
              </Card.Body>
            </Card>
          </Col>
  
          {/* Paid Plan */}
          <Col md={6} className="mb-4 ">
            <Card className="h-100 shadow-sm paid-plan rounded-5 text-center">
              <Card.Header className="py-3">
                <h4 className="my-0 paid-heading text-center fontNormal">Paid</h4>
              </Card.Header>
              <Card.Body className="plan-content mb-3 ">
                <Row className='px-1'>
                  <Col xs={6}>
                    <ul className="list-unstyled mt-3">
                      <li><FaCheck className="icon-inline" />All Free Features</li>
                      <li><FaCheck className="icon-inline" />Premium Templates</li>
                      <li><FaCheck className="icon-inline" />Wallet Intergration</li>
                      <li><FaCheck className="icon-inline" />Advanced Branding</li>
                      <li><FaCheck className="icon-inline" />Support Ocean Conservation</li>
                    </ul>
                  </Col>
                  <Col xs={6}>
                    <ul className="list-unstyled mt-3">
                      <li><FaCheck className="icon-inline" />Export Share Reports</li>
                      <li><FaCheck className="icon-inline" />Multiple Cards</li>
                      <li><FaCheck className="icon-inline" />Contact Download</li>
                      <li><FaCheck className="icon-inline" />Team Collaboration</li>
                    </ul>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="rounded-5 btn-lg free-button mt-3">GO Premium</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default PricingContainer;