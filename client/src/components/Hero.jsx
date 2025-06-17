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
        <Container
          data-bs-theme="dark"
          className="mt-3 mb-5 p-4 shadow-4 rounded-3 bg-body-tertiary text-light"
        >
          <h2>Hey {userData.name}, </h2>
          <hr />
          <Row className="">
            <Col className='col-12 col-md-6 col-lg-2'>
              <div style={{ height: "auto", margin: "", maxWidth: 196, width: "100%" }}>
                <QRCode
                  size={128}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={profileUrl}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </Col>
            <Col className='col-12 col-md-6 col-lg-8'>
                <h4 className='fw-bold'>Share your QR code amongst others to show your CV & skills.</h4>
                <Button>Copy to clipboard</Button>
            </Col>
          </Row>
        </Container>
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
