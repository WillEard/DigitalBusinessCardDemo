import { useContext, useEffect } from 'react';
import {
  Container, Row, Col, Button, Card, ProgressBar, Nav, Dropdown,
} from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../Dashboard.css'; // Import custom CSS for Navbar

import '../Fonts.css'; // Import custom font styles



const Dashboard = () => {
  const { userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const firstName = userData?.name?.split(' ')[0] || 'User';

  const cards = [
    { id: 'abc123', name: 'John Smith', title: 'Creative Director', qrCode: 'some-url' },
    { id: 'def456', name: 'Jane Doe', title: 'Product Manager', qrCode: 'another-url' },
    { id: 'ghi789', name: 'Willy Shakes', title: 'Entertainer', qrCode: 'another-url' }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
  <div className="login-overlay flex-grow-1">

      <Navbar />

      <Container className="my-5">
        <h1 className="mb-1 fw-semibold fontNormal">Welcome back, {firstName}</h1>
        <p className="mb-3 text-light fontCondensed" >70% complete</p>
        <ProgressBar now={70} className="mb-4" variant="info" />

        <Row className="mb-4">
          <Col md="auto" className="mb-2">
            <Button variant="outline-light fontCondensed">Create New Card</Button>
          </Col>
          <Col md="auto" className="mb-2">
            <Button variant="outline-light fontCondensed">Edit Existing Card</Button>
          </Col>
          <Col md="auto" className="mb-2">
            <Button variant="outline-light fontCondensed">Add to Apple Wallet</Button>
          </Col>
          <Col md="auto" className="mb-2">
            <Button variant="outline-light fontCondensed">View all information</Button>
          </Col>
        </Row>

        <Row className="gy-4 align-items-start justify-content-center">
  <Col md={8}>
    <h4 className="mb-2 fontNormal">Active Cards</h4> {/* reduced margin-bottom */}
    <Row className="g-4">
      {cards.map((card) => (
        <Col md={6} key={card.id}>
          <Card className="p-3 shadow-sm border rounded-3">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div>
                  <h5 className="mb-1 fontCondensed">{card.name}</h5>
                  <div className="text-muted small fontCondensed">{card.title}</div>
                </div>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=sample"
                  alt="QR"
                />
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Button size="sm" variant="outline-dark" style={{ fontFamily: 'Sailor Condensed' }}>View</Button>
                <Button size="sm" variant="outline-dark" style={{ fontFamily: 'Sailor Condensed' }}>Edit</Button>
                <Button size="sm" variant="outline-dark" style={{ fontFamily: 'Sailor Condensed' }}>Share</Button>
                <Button size="sm" variant="outline-dark" style={{ fontFamily: 'Sailor Condensed' }}>Add to Wallet</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Col>

  <Col md={4} className="align-self-start">
    <Card className="mb-3 shadow-sm analytics">
      <Card.Body className=''>
        <h6 className="fw-semibold fs-5" style={{ fontFamily: 'Sailor' }}>Analytics</h6>
        <p className="mb-0 fontCondensed">132 Total Scans</p>
        <p className="text-muted fontCondensed">Mon 3rd – Most Active Day</p>
        <Button variant="link" className="p-0 fontCondensed">View Full Analytics</Button>
      </Card.Body>
    </Card>
    <Card className="shadow-sm">
      <Card.Body>
        <h6 className="fw-semibold fs-5" style={{ fontFamily: 'Sailor' }}>Notifications</h6>
        <p className="mb-0 fw-normal fs-6" style={{ fontFamily: 'Sailor Condensed' }}>Your card was scanned 3 times today</p>
        <p className='text-muted fw-normal fs-6' style={{ fontFamily: 'Sailor Condensed' }}>Find out who using <span className="text-info" style={{ fontFamily: 'Sailor Condensed' }}>Premium</span></p>
      </Card.Body>
    </Card>
  </Col>
</Row>

        <div className="mt-5 p-3 rounded bg-primary bg-opacity-75 text-light text-center" style={{ fontFamily: 'Sailor Condensed' }}>
          <strong style={{ fontFamily: 'Sailor Condensed' }}>Upgrade to <span className="text-info" style={{ fontFamily: 'Sailor Condensed' }}>Premium</span></strong> for custom/multiple cards and deeper analytics →
        </div>
      </Container>
      </div>
</div>

  );
};

export default Dashboard;