// React & Routing
import { useContext, useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AppContext
import { AppContext } from '../context/AppContext';

// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// QR and Utility
import QRCode from 'react-qr-code';


// Icons
import { FaArrowTurnDown } from 'react-icons/fa6';

import BlurText from "../assets/react-bits/BlurText";


// Styles
import '../styles/Hero.css';
import '../styles/Fonts.css';

const Hero = () => {
  const { userData, getUserData, isLoggedIn, isLoadingUser } = useContext(AppContext);

  const navigate = useNavigate();
  const qrRef = useRef(null);

  const siteURL = 'www.pelagopass.com';
  const profileUrl = useMemo(() => `${siteURL}/cv/${userData?.username}`, [userData]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    setTitle(titles[randomIndex]);
  }, []);

  

  useEffect(() => {
    if (!isLoadingUser && isLoggedIn) {
      getUserData();
    }
  }, [isLoadingUser, isLoggedIn, getUserData]);


  // Handle QR code download
  const handleDownload = useCallback(() => {
    if (!qrRef.current) return console.error('QR ref not found');
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return console.error('SVG not found');
  
    try {
      const svgString = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
  
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 256, 256);
  
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${userData?.name || 'qr'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        URL.revokeObjectURL(url);
      };
  
      img.onerror = (err) => {
        console.error('Error loading SVG as image', err);
        URL.revokeObjectURL(url);
      };
  
      img.src = url;
    } catch (err) {
      console.error('Error in handleDownload', err);
    }
  }, [qrRef, userData]);

  const qrContainerStyle = useMemo(() => ({
    position: 'absolute',
    width: 256,
    height: 256,
    overflow: 'hidden',
    left: '-9999px',
    top: 'auto',
    opacity: 0
  }), []);
  // Render QR code off-screen
  const renderQRHidden = useMemo(() => (
    <div ref={qrRef} style={qrContainerStyle}>
      <QRCode size={256} value={profileUrl} viewBox="0 0 256 256" />
    </div>
  ), [profileUrl, qrContainerStyle]);

  const handleGoDashboard = useCallback(() => {navigate('/dashboard');}, [navigate]);
  const goToSignUp = useCallback(() => {navigate('/Authenticate', { state: { authState: 'SignUp' } });}, [navigate]);
  const scrollToHowItWorks = useCallback(() => {const el = document.getElementById('howitworks');if (el) el.scrollIntoView({ behavior: 'smooth' });}, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const titles = [
    "ready to connect?",
    "welcome back",
    "its been a while"
  ]

  return (
    <div id="home" className="hero-wrapper text-white">
      <div className="hero-overlay">
        <Container className="py-5 px-4">
          
          {userData ? (
            <>
              {/* Desktop */}
              <Row className="d-none d-md-flex justify-content-center align-items-center row" >
                <Col className="text-center">
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="display-4 fw-bold text-uppercase fontNormal">
                  {userData.name?.split(' ')[0]}, {title}
                    <span className="inline-block ml-2 align-middle">
                      <FaArrowTurnDown className="text-2xl" />
                    </span>
                  </h1>
                </div>
                  
                  <Container className="col-lg-6 mx-auto">
                    <p className="lead mb-4 text-uppercase fontCondensed">
                      <span className='fw-bold fontCondensed'>Tap. Share. Done.</span> All without the hassle.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                      <Button variant="primary" className='fontCondensed rounded-5' size="lg" onClick={handleGoDashboard}>
                        View Dashboard
                      </Button>
                      <Button variant="primary" className='fontCondensed rounded-5' size="lg" onClick={handleDownload}>
                        Share my QR
                      </Button>
                    </div>
                  </Container>
                  {renderQRHidden}
                </Col>
              </Row>

              {/* Mobile */}
              <Row className="d-md-none justify-content-center align-items-center text-center row">
                <Col>
                  <h1 className="fw-bold text-uppercase mb-4 fontNormal mobile-h1-size">
                    {userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown />
                  </h1>
                  <Container className="mobile-container-width">
                    <p className="lead mb-4 text-uppercase fontCondensed mobile-p-size" >
                      No app, no paper, no hassle.
                    </p>
                    <div className="d-grid gap-3 mb-5">
                      <Button variant="primary fontCondensed" size="lg" className="w-100" onClick={handleGoDashboard}>
                        Dashboard
                      </Button>
                      <Button variant="primary fontCondensed" size="lg" className="w-100" onClick={handleDownload}>
                        Share QR
                      </Button>
                    </div>
                  </Container>
                  {renderQRHidden}
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Desktop */}
              <Row className="d-none d-md-flex justify-content-center align-items-center row">
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
                          onClick={goToSignUp}
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
                          onClick={scrollToHowItWorks}
                        >
                          See how it works
                        </Button>
                        <p className="pt-2 fw-bold fontCondensed">No wasted time.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="fontCondensed mt-5">Trusted worldwide</h4>
                      <hr />
                      <h4 className="fontCondensed mt-2">3,000+ cards created this year</h4>
                    </div>

                  </Container>
                </Col>
              </Row>

              {/* Mobile */}
              <Row className="d-md-none justify-content-center align-items-center text-center row">
                <Col>
                  <h1 className="fw-bold text-uppercase mb-4 fontNormal mobile-h1-size">
                    Your digital business card, <br /> reimagined
                  </h1>
                  <Container className='mobile-container-width'>
                    <p className="lead mb-4 fontCondensed mobile-p-size">
                      Share info instantly with a tap, no paper, no hassle.
                    </p>
                    <div className="d-grid gap-3 mb-4">
                      <Button
                        variant="primary"
                        size="lg"
                        className="rounded-5 w-100 fontNormal"
                        onClick={goToSignUp}
                      >
                        Create your free pass
                      </Button>
                      <p className="fw-bold mb-0 fontCondensed mobile-p-size">No credit card needed.</p>

                      <Button
                        variant="secondary"
                        size="lg"
                        className="rounded-5 w-100 fontNormal"
                        onClick={scrollToHowItWorks}
                      >
                        See how it works
                      </Button>
                      <p className="pt-2 fw-bold mb-0 fontCondensed mobile-p-size">No wasted time.</p>
                    </div>
                    <div className="mt-5">
                      <h4 className='fontCondensed'>Trusted by 5,000+ professionals</h4>
                      <h5 className='fontCondensed'>3,124 cards created this week</h5>
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