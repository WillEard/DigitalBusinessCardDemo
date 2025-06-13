import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Button from 'react-bootstrap/esm/Button';
import QRCode from "react-qr-code";
import CVModal from './CVModal';
import ListGroup from 'react-bootstrap/ListGroup';


const Hero = () => {
  const percentage = 66;

  const { userData, getUserData } = useContext(AppContext);

  const profileUrl = `/users/WillEard`;

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {userData ? (
        <>
        <Container
          data-bs-theme="dark"
          className="mt-3 mb-5 p-4 shadow-4 rounded-3 bg-body-tertiary text-light"
        >
          <h2>Hey {userData.name}, </h2>
          <h4 className="display-6">Share your QR code here.</h4>
          <hr />
          <Row className="">
            <Col className='col-12 col-md-6 col-lg-4'>
              <div style={{ height: "auto", margin: "", maxWidth: 196, width: "100%" }}>
                <QRCode
                  size={128}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={profileUrl}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </Col>
            <Col className='col-12 col-md-6 col-lg-6'>
              <CVModal/>
              <hr />
              <p>Share your QR code amongst others to show your CV & skills.</p>
            </Col>
          </Row>
        </Container>
        <Container data-bs-theme="dark"
          className="mt-3 mb-5 p-4 shadow-4 rounded-3 bg-body-tertiary text-light">
          <h4 className="display-6">ToDo.</h4>

        <ListGroup className="w-75" as="ol" numbered>
            <h4>MUST WORK</h4>
            <ListGroup.Item as="li">Rework backend to account for requesting OTHER user's data and not just logged in user.</ListGroup.Item>
            <ListGroup.Item as="li">Alter backend API endpoint to allow profile/:id requests, allows for linking to a specific users information.</ListGroup.Item>
            <ListGroup.Item as="li">Generate QR code that links directly to user / also ability to scan another users QR.</ListGroup.Item>
            <ListGroup.Item as="li">Saveable CV information.</ListGroup.Item>
            <hr />
            <h4>SHOULD WORK</h4>
            <ListGroup.Item as="li">Perfeclty Responsive with correct sizing in forms.</ListGroup.Item>
            <hr />
            <h4>COULD WORK</h4>
            <ListGroup.Item as="li">Free/Premium subscription system with added features.</ListGroup.Item>
        </ListGroup>

        </Container>
        </>
      ) : (
        <Container className="container text-sm-center p-5 bg-light mt-4 bg-dark text-light rounded">
          <h1>Join Digicard Today</h1>
          <p className="lead">The all in one app to fuel your career.</p>
          <div className="btn-group">
            <Button>SignUp</Button>
            <Button className="btn-secondary">Login</Button>
          </div>
        </Container>
      )}
    </>
  );
};

export default Hero;
