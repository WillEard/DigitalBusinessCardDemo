// React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// Styles
import '../styles/Fonts.css'; // Import custom font styles
import '../styles/ThreePoints.css'; // New CSS for background images

function ThreePointJumbo() {
    return (
        <Container fluid id="ThreePoints" className="py-5 text-center">
            <Row className="justify-content-center">
                <Col md={3} className="mb-4 feature-block">
                    <div className="feature-icon" ></div>
                    <h1 className='fontNormal'>Eco-Friendly</h1>
                    <p className='fontCondensed'>No printing, No Waste</p>
                </Col>
        
                <Col md={4} className="mb-4 feature-block">
                    <div className="feature-icon" ></div>
                    <h1 className='fontNormal'>Always Up To Date</h1>
                    <p className='fontCondensed'>Update details in an instant</p>
                </Col>
        
                <Col md={3} className="mb-4 feature-block">
                    <div className="feature-icon" ></div>
                    <h1 className='fontNormal'>Instant Sharing</h1>
                    <p className='fontCondensed'>Share with a tap or a scan</p>
                </Col>
            </Row>
      </Container>
    );
  }
  
  export default ThreePointJumbo;