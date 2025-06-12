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

const Hero = () => {
  const percentage = 66;

  const { userData, getUserData } = useContext(AppContext);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {userData ? (
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
                  value={"www.google.com"}
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
