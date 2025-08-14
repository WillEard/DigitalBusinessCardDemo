// React Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Styles
import '../styles/Fonts.css';
import '../styles/Pricing.css'; // Import your pricing styles

// Icons
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

// JSX Object storing to make adding content easier
const plans = [
  {
    id: 'free',
    title: 'Free',
    features: [
      { text: 'Create Cards', included: true },
      { text: 'QR Sharing', included: true },
      { text: '24/7 Support', included: false },
      { text: 'Show number of CV viewers', included: false }
    ],
    buttonText: 'Part of free version',
    buttonClass: 'free-button disabled fontCondensed'
  },
  {
    id: 'paid',
    title: 'Paid',
    features: [
      { text: 'All Free Features', included: true },
      { text: 'Premium Templates', included: true },
      { text: 'Wallet Integration', included: true },
      { text: 'Advanced Branding', included: true },
      { text: 'Support Ocean Conservation', included: true },
      { text: 'Export Share Reports', included: true },
      { text: 'Multiple Cards', included: true },
      { text: 'Contact Download', included: true },
      { text: 'Team Collaboration', included: true }
    ],
    buttonText: 'GO Premium',
    buttonClass: 'paid-button fontCondensed'
  }
];

function PricingContainer() {
    return (
      <Container fluid id="pricing" className="pricing py-5">
  <h1 className="mb-4 pricing-heading text-center display-3">Pricing</h1>
  <Row className="justify-content-center">
    {plans.map(({ id, title, features, buttonText, buttonClass }) => (
      <Col key={id} md={id === 'free' ? 4 : 6} className="mb-4">
        <Card className={`h-100 shadow-sm ${id}-plan text-center rounded-5`}>
          <Card.Header className="py-3">
            <h4 className={`my-0 ${id}-heading fontNormal`}>{title}</h4>
          </Card.Header>
          <Card.Body className="plan-content mb-3">
            <ul className="list-unstyled mt-3 fontCondensed">
              {features.map(({ text, included }, i) => 
                <li key={i}>
                  {included ? <FaCheck className="icon-inline" aria-hidden="true" /> : <RxCross2 className="icon-inline" aria-hidden="true" />}
                  {text}
                </li>
              )}
            </ul>
            <div className="text-center">
              <Button className={`rounded-5 btn-lg ${buttonClass}`}>
                {buttonText}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
    );
  }
  
  export default PricingContainer;