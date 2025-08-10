// React & Routing
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AppContext
import { AppContext } from '../context/AppContext';

// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// QR and Utility
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

import { animate, stagger, text } from 'animejs';


// Icons
import { FaArrowTurnDown } from 'react-icons/fa6';

// Styles
import '../styles/Hero.css';
import '../styles/Fonts.css';

const Hero = () => {
  const { userData, getUserData, isLoggedIn, isLoadingUser } = useContext(AppContext);

  const navigate = useNavigate();
  const qrRef = useRef(null);

  const siteURL = 'www.pelagopass.com';
  const profileUrl = `${siteURL}/cv/${userData?.username}`;
  

  useEffect(() => {
    if (!isLoadingUser && isLoggedIn) {
      getUserData();
    }
  }, [isLoadingUser, isLoggedIn]);

  const handleDownload = async () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) {
      console.error('SVG not found');
      return;
    }
  
    const width = svg.getAttribute('width') || svg.clientWidth;
    const height = svg.getAttribute('height') || svg.clientHeight;
  
    if (!width || !height || width === '0' || height === '0') {
      console.error('SVG has zero width or height, cannot convert to PNG');
      return;
    }
  
    // Serialize SVG XML
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
  
    // Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
  
    // Create an image to load the SVG string
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
  
      // Get PNG data URL and download
      const pngDataUrl = canvas.toDataURL('image/png');
      downloadImage(pngDataUrl, `${userData.name}.png`);
    };
  
    img.onerror = (err) => {
      console.error('Error loading SVG image', err);
    };
  
    img.src = url;
  };

  function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename || 'download.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const renderQRHidden = () => (
    <div
    ref={qrRef}
    style={{
      position: 'absolute',  // remove from normal flow
      width: 256,
      height: 256,
      overflow: 'hidden',
      left: '-9999px',       // move off-screen
      top: 'auto',
      opacity: 0             // optional extra invisibility
    }}
  >
    <QRCode
      size={256}
      value={profileUrl}
      viewBox="0 0 256 256"
    />
  </div>
  );

  // Smooth boat drift animation
  let lastY = 0;
  let lastRot = 0;

  // Function to animate the boat drift
  function smoothBoatDrift() {
    const newY = (Math.random() * 0.4 - 0.2);  // -0.2rem to 0.2rem
    const newRot = (-0.5 + Math.random() * 0.2); // -0.5° to -0.3°

    animate('.ml6', {
      keyframes: [
        { translateX: '-0.3rem', translateY: lastY + 'rem', rotate: lastRot + 'deg', duration: 3000, easing: 'easeInOutSine' },
        { translateX: '0.3rem', translateY: newY + 'rem', rotate: (-newRot) + 'deg', duration: 3000, easing: 'easeInOutSine' },
        { translateX: '-0.3rem', translateY: lastY + 'rem', rotate: lastRot + 'deg', duration: 3000, easing: 'easeInOutSine' },
      ],
      duration: 9000,
      easing: 'easeInOutSine',
      loop: true,
      complete: () => {
        lastY = newY;
        lastRot = -newRot;
      }
    });
  }

  // Start the animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      smoothBoatDrift();
    }, 100); // delay 100ms, adjust if needed
  
    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <div id="home" className="hero-wrapper text-white">
      <div className="hero-overlay">
        <Container className="py-5 px-4">
          {userData ? (
            <>
              {/* Desktop */}
              <Row className="d-none d-md-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Col className="text-center ml6">

                  <h1 className="display-4 fw-bold text-uppercase fontNormal">
                    {userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown />
                  </h1>
                  
                  <Container className="col-lg-6 mx-auto">
                    <p className="lead mb-4 text-uppercase fontCondensed">
                      <span className='fw-bold fontCondensed'>Tap. Share. Done.</span> All without the hassle.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                      <Button variant="primary" className='fontCondensed rounded-5' size="lg" onClick={() => navigate('/dashboard')}>
                        View Dashboard
                      </Button>
                      <Button variant="primary" className='fontCondensed rounded-5' size="lg" onClick={handleDownload}>
                        Share my QR
                      </Button>
                    </div>
                  </Container>
                  {renderQRHidden()}
                </Col>
              </Row>

              {/* Mobile */}
              <Row className="d-md-none justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
                <Col>
                  <h1 className="fw-bold text-uppercase mb-4 fontNormal" style={{fontSize: '3rem' }}>
                    {userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown />
                  </h1>
                  <Container style={{ maxWidth: '600px' }}>
                    <p className="lead mb-4 text-uppercase fontCondensed" style={{fontSize: '1.2rem' }}>
                      No app, no paper, no hassle.
                    </p>
                    <div className="d-grid gap-3 mb-5">
                      <Button variant="primary fontCondensed" size="lg" className="w-100" onClick={() => navigate('/dashboard')}>
                        Dashboard
                      </Button>
                      <Button variant="primary fontCondensed" size="lg" className="w-100" onClick={handleDownload}>
                        Share QR
                      </Button>
                    </div>
                  </Container>
                  {renderQRHidden()}
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Desktop */}
              <Row className="d-none d-md-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Col className="text-center">
                  <h1 className="display-3 fw-bold text-uppercase fontNormal">
                    Your digital business card, <br /> reimagined
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
                    <div>
                      <h3 className="fontCondensed mt-5">Trusted by professionals worldwide</h3>
                      <hr />
                      <h4 className="fontCondensed mt-2">3,000+ cards created this year</h4>
                    </div>

                  </Container>
                </Col>
              </Row>

              {/* Mobile */}
              <Row className="d-md-none justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
                <Col>
                  <h1 className="fw-bold text-uppercase mb-4 fontNormal" style={{fontSize: '3em' }}>
                    Your digital business card, <br /> reimagined
                  </h1>
                  <Container style={{ maxWidth: '600px' }}>
                    <p className="lead mb-4 fontCondensed" style={{fontSize: '1.5rem' }}>
                      Share info instantly with a tap, no paper, no hassle.
                    </p>
                    <div className="d-grid gap-3 mb-4">
                      <Button
                        variant="primary"
                        size="lg"
                        className="rounded-5 w-100 fontNormal"
                        onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}
                      >
                        Create your free pass
                      </Button>
                      <p className="fw-bold mb-0 fontCondensed" style={{fontSize: '1rem' }}>No credit card needed.</p>

                      <Button
                        variant="secondary"
                        size="lg"
                        className="rounded-5 w-100 fontNormal"
                        onClick={() => {
                          const el = document.getElementById('howitworks');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        See how it works
                      </Button>
                      <p className="pt-2 fw-bold mb-0 fontCondensed" style={{fontSize: '1rem' }}>No wasted time.</p>
                    </div>
                    <div className="mt-5">
                      <h4 style={{ fontFamily: 'Sailor Italic' }}>Trusted by 5,000+ professionals</h4>
                      <h5 style={{ fontFamily: 'Sailor' }}>3,124 cards created this week</h5>
                    </div>
                  </Container>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Hero;