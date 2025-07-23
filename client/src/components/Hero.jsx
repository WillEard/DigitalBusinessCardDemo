import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/Image';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import { FaArrowTurnDown } from "react-icons/fa6";

import CVModal from './CVModal';
import '../Hero.css';// CSS file for background and styling
import '../Fonts.css'; // Import custom font styles




const Hero = () => {
  const { userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const profileUrl = `/cv/${userData?.username}`;
  const homeUrl = '/';
  const qrRef = useRef(null);

  useEffect(() => {
    getUserData();
  }, []);

  const handleDownload = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = userData.name + ' DigiQR.png';
      link.click();
    } catch (err) {
      console.error('Error generating high-res QR:', err);
    }
  };

  return (
    <div className="hero-wrapper text-white">
      <div className="hero-overlay">
        {userData ? (
          <Container className="py-5 px-5">
            <Row className="align-items-center d-none d-md-flex">
              <div className="px-4 pt-5 my-5 text-center ">
                <h1 className="display-4 fw-bold text-uppercase" style={{ fontFamily: 'Sailor Condensed' }}>{userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown /></h1>
                <Container className="col-lg-6 mx-auto">
                  <p className="lead mb-4 text-uppercase " style={{ fontFamily: 'Sailor Condensed' }}>
                    Eco-friendly, custom, qr-enabled
                  </p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <CVModal profileUrl={profileUrl} />
                    <Button variant="outline-light" size="lg" onClick={handleDownload}>Share QR</Button>

                  </div>
                </Container>
                <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
                  <div
                      ref={qrRef}
                      className="d-flex justify-content-center"
                      style={{ overflow: 'hidden', maxHeight: '30vh' }}
                    >
                      <QRCode
                        className="rounded"
                        size={256}
                        style={{ width: '100%', maxWidth: '256px', display: 'block' }}
                        value={profileUrl}
                        viewBox="0 0 256 256"
                      />
                    </div>
                </div>
              </div>
            </Row>

            {/* Mobile Layout */}
            <Row className="d-flex d-md-none text-center">
              <Col>
                <QRCode
                  className="rounded"
                  size={128}
                  style={{ maxWidth: '60%', width: '100%' }}
                  value={profileUrl}
                  viewBox="0 0 256 256"
                />
                <h1 className="display-5 fw-bold mt-4">Hey {userData.name?.split(' ')[0]},</h1>
                <p className="lead mt-2 px-3">
                  Your DigiCard is ready. Share it with a scan and stand out instantly.
                </p>
                <div className="mt-3 d-flex flex-column gap-3">
                  <Button variant="primary" size="lg" onClick={() => navigate(profileUrl)}>
                    View My Digicard
                  </Button>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Add to wallet is coming soon!</Tooltip>}>
                    <Button className="btn-dark btn-lg">Add to wallet</Button>
                  </OverlayTrigger>
                  <Button variant="secondary" size="lg">Save QR to camera roll</Button>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className="py-5 px-5 text-center">
            <Row className="align-items-center d-none d-md-flex">
              <div className="px-4 pt-5 my-5 text-center">
                <h1 className="display-4 fw-bold text-uppercase" style={{ fontFamily: 'Sailor Condensed' }}>Your digital business card, <br />reimagined</h1>
                <Container className="col-lg-6 mx-auto">
                  <p className="lead mb-4 text-uppercase " style={{ fontFamily: 'Sailor Condensed' }}>
                    Eco-friendly, custom, qr-enabled
                  </p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <Button variant="primary" size="lg" className="px-4 me-sm-3 rounded-5" onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}>
                      Create your pass
                    </Button>
                    <Button variant="secondary" size="lg" className="px-4 rounded-5">
                      see how it works
                    </Button>
                  </div>
                </Container>
                <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
                  <Container className="px-5 py-5">
                    <QRCode size={184} className="rounded" value={homeUrl} style={{ maxWidth: '50%' }} />
                  </Container>
                </div>
              </div>
            </Row>

            {/* Mobile Layout */}
            <Row className="d-md-none text-center">
              <Col>
                <QRCode size={128} className="rounded" value={homeUrl} style={{ maxWidth: '60%' }} />
                <h1 className="display-5 fw-bold mt-4">Your Digital CV. One Scan Away.</h1>
                <p className="lead mt-2 px-3">
                  Create, customize, and share your professional identity in seconds.
                  <span className="fw-bold"> Quick reaction for every interaction.</span>
                </p>
                <div className="mt-3 d-flex flex-column gap-3">
                  <Button variant="primary" size="lg">Create your digicard</Button>
                  <Button variant="outline-light" size="lg">Login</Button>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Hero;
