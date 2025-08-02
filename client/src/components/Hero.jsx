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
  const siteURL = `www.pelagopass.com`;
  const profileUrl = `${siteURL}/cv/${userData?.username}`;
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
    <div id='home' className="hero-wrapper text-white">
  <div className="hero-overlay">
    {userData ? (
      <Container className="py-5 px-5">
        <Row className="d-none d-md-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <h1 className="display-4 fw-bold text-uppercase" style={{ fontFamily: 'Sailor Condensed' }}>
              {userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown />
            </h1>

            <Container className="col-lg-6 mx-auto">
              <p className="lead mb-4 text-uppercase" style={{ fontFamily: 'Sailor Condensed' }}>
                No app, no paper, no hassle.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Button variant="primary fontCondensed" size="lg" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="primary fontCondensed" size="lg" onClick={handleDownload}>
                  Share QR
                </Button>
              </div>
            </Container>

            
            <div className="overflow-hidden" style={{ maxHeight: '30vh', position: 'absolute', left: '-9999px', top: '-9999px' }}>
              <div ref={qrRef} className="d-flex justify-content-center" style={{ overflow: 'hidden', maxHeight: '30vh' }}>
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
      <Container id="home" className="py-5 px-5 text-center">
        <Row className="d-none d-md-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <h1 className="display-3 fw-bold text-uppercase" style={{ fontFamily: 'Sailor Condensed' }}>
              Your digital business card, <br />
              reimagined
            </h1>

            <Container className="col-lg-6 mx-auto">
              <p className="lead mb-4" style={{ fontFamily: 'Sailor' }}>
                Share info instantly with a tap, no paper, no hassle.
              </p>

              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-4">
                <div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4 me-sm-3 rounded-5"
                    style={{ fontFamily: 'Sailor' }}
                    onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}
                  >
                    Create your free pass
                  </Button>
                  <p className="pt-2 fw-bold">No credit card needed.</p>
                </div>

                <div>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-4 rounded-5"
                    style={{ fontFamily: 'Sailor' }}
                    onClick={() => {
                      const el = document.getElementById('howitworks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See how it works
                  </Button>
                  <p className="pt-2 fw-bold">No wasted time.</p>
                </div>
              </div>

              <h3 style={{ fontFamily: 'Sailor Italic', marginTop: '3rem' }}>
                Trusted by 5,000+ professionals
              </h3>
              <h4 style={{ fontFamily: 'Sailor', marginTop: '0.5rem' }}>
                3,124 cards created this week
              </h4>
            </Container>
            
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
