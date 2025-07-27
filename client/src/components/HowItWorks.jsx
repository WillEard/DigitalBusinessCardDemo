import { Container, Row, Col, Button } from 'react-bootstrap';
import '../Fonts.css';
import '../HowItWorks.css'; // Import the CSS file you just created
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import { RiPassValidFill } from "react-icons/ri";
import PhoneCarousel from './PassCarousel';


function HowItWorks() {
  return (
    <Container id="pricing" className="text-center howitworks-section">
      <h1
        className="mb-5 display-3 fw-bold"
        style={{ fontFamily: 'Sailor' }}
      >
        How it works
      </h1>

      <Row className="justify-content-center">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber1 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading" style={{ fontFamily: 'Sailor Condensed' }}>Design Your Card</h2>
          <p style={{ fontFamily: 'Sailor Italic' }}>Choose your layout, colour and contact info</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber2 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading" style={{ fontFamily: 'Sailor Condensed' }}>Customise it</h2>
          <p style={{ fontFamily: 'Sailor Italic' }}>Add branding, logos and premium designs</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber3 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading" style={{ fontFamily: 'Sailor Condensed' }}>share anywhere</h2>
          <p style={{ fontFamily: 'Sailor Italic' }}>Send via QR code or add to your apple/android wallet</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={12} className="step-col">
          <h2 className="step-heading" style={{ fontFamily: 'Sailor Condensed' }}>See what your card could look like in seconds!</h2>
          {/* Phone Carousel Centered */}
          <div className="d-flex justify-content-center py-4">
            <PhoneCarousel />
          </div> <br />

            <Button className='btn-lg rounded-5' style={{ fontFamily: 'Sailor' }}>Start creating</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HowItWorks;