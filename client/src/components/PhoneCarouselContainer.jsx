// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// Icons
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

// Carousel
import PhoneCarousel from './PassCarousel';

// Styles
import '../styles/Fonts.css';
import '../styles/PhoneCarousel.css'; 


function HowItWorks() {
  return (
    <Container id="howitworks" className="text-center howitworks-section">
      {/* Carousel + Button */}
      <Row className="justify-content-center">
        <Col md={12} className="step-col">
          <h2 className="heading fontNormal mb-4">
            See what your card could look like in seconds!
          </h2>

          <div className="d-flex justify-content-center py-3">
            <PhoneCarousel />
          </div>

          <Button className="btn-lg rounded-5 fontCondensed mt-1">
            Start creating
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HowItWorks;