import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Button from 'react-bootstrap/esm/Button';
import QRCode from "react-qr-code";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import CircumIcon from "@klarr-agency/circum-icons-react"; // React


const Hero = () => {
  const { userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const profileUrl = `/cv/${userData.username}`;




  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {userData ? (
      <>
      <Container data-bs-theme="dark" className="mt-3 mb-3 p-4 shadow-4 rounded-3 bg-body-tertiary text-light">
        <h2>Hey {userData.name}, </h2>
      </Container>
      <Row className="align-items-stretch">
  {/* QR Code Column */}
  <Col xs={12} md="auto" className="d-flex justify-content-center">
    <div
      data-bs-theme="dark"
      style={{
        width: 196,
        height: 196,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-body-tertiary mt-3 mb-3 p-4 shadow-4 rounded-3 text-light"
    >
      <QRCode
        size={128}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={profileUrl}
        viewBox="0 0 256 256"
      />
      
    </div>
  </Col>

  {/* Text & Button Column */}
  <Col xs={12} md className="d-flex">
    <div
      data-bs-theme="dark"
      className="w-100 mt-3 mb-3 p-4 shadow-4 rounded-3 bg-body-tertiary text-light d-flex flex-column justify-content-between"
    >
      <h3 className="fw-bold">
      <CircumIcon name="circle_chev_left"/>
      Share your Digital Business Card
      </h3>
      <div className="mt-auto">
        <Button>Copy to clipboard</Button>
      </div>
    </div>
  </Col>
</Row>
        <Container data-bs-theme="dark"
          className="mt-3 mb-5 p-4 shadow-4 rounded-3 bg-body-tertiary text-light">
          <h4 className="display-6">ToDo.</h4>

        <ListGroup className="w-75" as="ol" numbered>
            <h4>MUST WORK</h4>
            <ListGroup.Item as="li">ALL DONE</ListGroup.Item>
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
            <Button onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}>SignUp</Button>
            <Button onClick={() => navigate('/Authenticate', { state: { authState: 'Login' } })} className="btn-secondary">Login</Button>
          </div>
        </Container>
      )}
    </>
  );
};

export default Hero;
