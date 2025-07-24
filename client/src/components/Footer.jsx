import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';


const Footer = () => {
  return (
    <div className="footer bg-dark text-light py-4 mt-5 d-flex justify-content-center">
      {/* Wrapper for responsive width */}
      <div className="w-100 w-sm-50">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <h5 className='text-center'>PelagoPass</h5>
              <small className="text-muted">Your Digital Identity, Simplified.</small>
            </Col>

            <Col md={6} className="text-center text-md-end">
              <Nav className="justify-content-center justify-content-md-end">
                <Nav.Link href="#" className="text-light px-2">Privacy Policy</Nav.Link>
                <Nav.Link href="#" className="text-light px-2">Terms</Nav.Link>
                <Nav.Link href="#" className="text-light px-2">Contact</Nav.Link>
              </Nav>
            </Col>
          </Row>

          <hr className="border-secondary mt-3" />

          <Row>
            <Col className="text-center text-light">
              <small>* User must be verified in order to qualify for PelagoPlus</small><br />
              <small>&copy; 2025 Pelago. All rights reserved.</small>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
