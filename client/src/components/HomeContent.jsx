import Button from 'react-bootstrap/esm/Button';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

import '../HomeContent.css'; // New CSS for HomeContent styling

const HomeContent = () => {
    return (
      <div className="home-section-bg">
        <div className="bg-image-overlay">
        <Container className="py-1 px-4 text-dark"> 

        {/* Panel 1: Text Left, Image Right */}
        <Row className="align-items-center py-5 px-5 rounded-top-3 mb-5 top-fade mt-5"> 
          <Col md={6} className="text-center text-md-start text-light">
            <h2 className="fw-bold">Instantly Professional</h2>
            <p className="lead">
            Access anyone’s professional story in seconds—just scan their QR.
            No more digging through files or emails. One scan shows you skills, experience, and qualifications in a clean, mobile-friendly format.
            </p>
          </Col>
          <Col md={6}>
            <div
              className="bg-secondary mx-auto text-center d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: '100%', height: '250px', borderRadius: '15px' }}
            >
              <Image
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"
                alt="Security"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Col>
        </Row>
  
        {/* Panel 2: Image Left, Text Right */}
        <Row className="align-items-center py-5 px-5 flex-md-row-reverse mb-5">
          <Col md={6} className="text-center text-md-start text-light">
            <h2 className="fw-bold">Smart Networking</h2>
            <p className="lead">
            Turn every connection into an opportunity.
            Perfect for events, conferences, hiring fairs, or remote teams—instantly exchange and review professional info without paper or clunky apps.
            </p>
          </Col>
          <Col md={6}>
            <div
              className="bg-secondary mx-auto text-center d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: '100%', height: '250px', borderRadius: '15px' }}
            >
              <Image
                src="https://images.pexels.com/photos/6146705/pexels-photo-6146705.jpeg"
                alt="Security"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Panel 3: Text Left, Image Right */}
        <Row className="align-items-center py-5 px-5 mb-5">
          <Col md={6} className="text-center text-md-start text-light">
            <h2 className="fw-bold">Secure & Privacy-Focused</h2>
            <p className="lead">
            You control who sees what. Set visibility preferences and share only what matters with the click of a button.
            </p>
          </Col>
          <Col md={6}>
            <div
              className="bg-secondary mx-auto text-center d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: '100%', height: '250px', borderRadius: '15px' }}
            >
              <Image
                src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg"
                alt="Security"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Panel 4: Image Left, Text Right */}
        <Row className="align-items-center py-5 px-5 flex-md-row-reverse rounded-bottom-3 mb-5" >
          <Col md={6} className="text-center text-md-start text-light">
            <h2 className="fw-bold">Effortless Setup & Customization</h2>
            <p className="lead">
            Your résumé, reimagined for the digital age.
Update & customize your profile anytime. What you share is always current, relevant, and designed to impress. 
Sign up, fill out your info, and get a unique QR instantly; ready to network, hire, or be hired.
            </p>
          </Col>
          <Col md={6}>
            <div
              className="bg-secondary mx-auto text-center d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: '100%', height: '250px', borderRadius: '15px' }}
            >
              <Image
                src="https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg"
                alt="Security"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
    );
  }

export default HomeContent