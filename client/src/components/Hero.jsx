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
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center px-3">
            <h1
              className="fw-bold text-uppercase mb-4"
              style={{
                fontFamily: 'Sailor Condensed',
                fontSize: '2rem',
              }}
            >
              {userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown />
            </h1>

            <Container className="mx-auto" style={{ maxWidth: '600px' }}>
              <p
                className="lead mb-4 text-uppercase"
                style={{ fontFamily: 'Sailor Condensed', fontSize: '1.2rem' }}
              >
                No app, no paper, no hassle.
              </p>

              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Button
                  variant="primary fontCondensed"
                  size="lg"
                  className="w-100 w-sm-auto"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="primary fontCondensed"
                  size="lg"
                  className="w-100 w-sm-auto"
                  onClick={handleDownload}
                >
                  Share QR
                </Button>
              </div>
            </Container>

            {/* Hidden QR Code (off-screen for download purposes) */}
            <div
              className="position-absolute"
              style={{
                left: '-9999px',
                top: '-9999px',
                height: 0,
                width: 0,
                overflow: 'hidden',
              }}
            >
              <div ref={qrRef}>
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
      </Container>
    ) : (
      <Container id="home" className="py-5 px-5 text-center">
        <Row className="d-none d-md-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <h1 className="display-3 fw-bold text-uppercase fontNormal">
              Your digital business card, <br />
              reimagined
            </h1>

            <Container className="col-lg-6 mx-auto">
              <p className="lead mb-4 fontCondensed">
                Share info instantly with a tap, no paper, no hassle.
              </p>

              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-4">
                <div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4 me-sm-3 rounded-5 fontCondensed"
                    onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}
                  >
                    Create your free pass
                  </Button>
                  <p className="pt-2 fw-bold fontCondensed">No credit card needed.</p>
                </div>

                <div>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-4 rounded-5 fontCondensed"
                    
                    onClick={() => {
                      const el = document.getElementById('howitworks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See how it works
                  </Button>
                  <p className="pt-2 fw-bold fontCondensed">No wasted time.</p>
                </div>
              </div>

              <h3 className="fontCondensed" style={{marginTop: '3rem' }}>
                Trusted by 5,000+ professionals
              </h3>
              <br />
              <h4 className="fontCondensed" style={{marginTop: '0.5rem' }}>
                3,124 cards created this week
              </h4>
            </Container>
            
          </div>
        </Row>

        {/* Mobile Layout */}
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
  <Col xs={12}>
    <h1
      className="fw-bold text-uppercase mb-4"
      style={{ fontFamily: 'Sailor', fontSize: '3rem' }}
    >
      Your digital business card, <br />
      reimagined
    </h1>

    <Container className="px-0" style={{ maxWidth: '100%' }}>
      <p
        className="lead mb-4"
        style={{ fontFamily: 'Sailor', fontSize: '1rem' }}
      >
        Share info instantly with a tap, no paper, no hassle.
      </p>

      <div className="d-grid gap-3 mb-4">
        <div>
          <Button
            variant="primary"
            size="lg"
            className="rounded-5 w-100"
            style={{ fontFamily: 'Sailor' }}
            onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}
          >
            Create your free pass
          </Button>
          <p className="pt-2 fw-bold mb-0">No credit card needed.</p>
        </div>

        <div>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-5 w-100"
            style={{ fontFamily: 'Sailor' }}
            onClick={() => {
              const el = document.getElementById('howitworks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See how it works
          </Button>
          <p className="pt-2 fw-bold mb-0">No wasted time.</p>
        </div>
      </div>
      <div className='mt-5'>
        <h4 style={{ fontFamily: 'Sailor Italic' }}>
          Trusted by 5,000+ professionals
        </h4>
        <h5 style={{ fontFamily: 'Sailor' }}>
          3,124 cards created this week
        </h5>
      </div>
      
    </Container>
  </Col>
</Row>
      </Container>
    )}
  </div>
</div>
  );
};

export default Hero;
