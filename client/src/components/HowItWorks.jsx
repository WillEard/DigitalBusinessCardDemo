// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// Icons
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

// Carousel
import PhoneCarousel from './PassCarousel';

// Styles
import '../styles/Fonts.css';
import '../styles/HowItWorks.css'; 


function HowItWorks() {
  return (
    <Container id="howitworks" className="text-center howitworks-section">
      <h1 className="mb-5 display-3 fw-bold fontNormal">How it works</h1>

      <Row className="justify-content-center">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber1 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading fontNormal" >Design Your Card</h2>
          <p className='fontCondensed'>Choose your layout, colour and contact info</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber2 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading fontNormal">Customise it</h2>
          <p className='fontCondensed'>Add branding, logos and premium designs</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber3 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading fontNormal">share anywhere</h2>
          <p className='fontCondensed'>Send via QR code or add to your apple/android wallet</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={12} className="step-col">
          <h2 className="step-heading fontNormal">See what your card could look like in seconds!</h2>
          {/* Phone Carousel Centered */}
          <div className="d-flex justify-content-center py-4">
            <PhoneCarousel />
          </div> <br />

            <Button className='btn-lg rounded-5 fontCondensed'>Start creating</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HowItWorks;