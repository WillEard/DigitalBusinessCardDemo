import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Button from 'react-bootstrap/esm/Button';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Fonts.css'; // Import custom font styles
import '../ThreePoints.css'; // New CSS for background images


function ThreePointJumbo() {
    return (
        <Container fluid id="ThreePoints" className="py-5 text-center">
            <Row className="justify-content-center">
    
            <Col md={3} className="mb-4 feature-block">
                <div className="feature-icon" style={{ backgroundImage: `url('/Pelago-Favicon.svg')`, color: 'black' }}></div>
                <h1 style={{ fontFamily: 'Sailor Condensed' }}>Eco-Friendly</h1>
                <p style={{ fontFamily: 'Sailor Condensed Italic' }}>No printing, No Waste</p>
            </Col>
    
            <Col md={3} className="mb-4 feature-block">
                <div className="feature-icon" style={{ backgroundImage: `url('/Pelago-Favicon.svg')` }}></div>
                <h1 style={{ fontFamily: 'Sailor Condensed' }}>Always Up To Date</h1>
                <p style={{ fontFamily: 'Sailor Condensed Italic' }}>Update details in an instant</p>
            </Col>
    
            <Col md={3} className="mb-4 feature-block">
                <div className="feature-icon" style={{ backgroundImage: `url('/Pelago-Favicon.svg')` }}></div>
                <h1 style={{ fontFamily: 'Sailor Condensed' }}>Instant Sharing</h1>
                <p style={{ fontFamily: 'Sailor Condensed Italic' }}>Share with a tap or a scan</p>
            </Col>
    
            </Row>
      </Container>
    );
  }
  
  export default ThreePointJumbo;