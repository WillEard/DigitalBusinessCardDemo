import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Fonts.css';
import '../styles/Testimonials.css';

function Testimonials() {
  return (
    <div id='testimonials' className="testimonials-section">
    <Container fluid  id="pricing" >
      <h1 className="display-3 testimonial-heading">Testimonials</h1>

      <Row className="justify-content-center mb-3">
        <Col md={3}>
          <p className="testimonial-quote">
            "I love that I never have to print business cards again!" – Lewis
          </p>
        </Col>

        <Col md={3}>
          <p className="testimonial-quote">
            "The data I can collect from my team at events is just invaluable!" – Jessica
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-3 py-3">
        <Col md={3}>
          <p className="testimonial-quote">
            "The Apple Wallet feature saves so much time! No more scrambling for cards" – Jack
          </p>
        </Col>

        <Col md={3}>
          <p className="testimonial-quote">
            "I get so many compliments on my Pelagopass! #TooEasy" – Nina
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={3}>
          <p className="testimonial-quote">
            "Stylish, simple, saves time AND the planet" – Will
          </p>
        </Col>

        <Col md={3}>
          <p className="testimonial-quote">
            "I loved the easy setup, getting my own brand on my card and showing the world in minutes!" – Courtney
          </p>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Testimonials;