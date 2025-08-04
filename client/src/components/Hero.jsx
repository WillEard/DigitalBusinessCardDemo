// React & Routing
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../context/AppContext';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// QR and Utility
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { FaArrowTurnDown } from 'react-icons/fa6';

// Styles
import '../Hero.css';
import '../Fonts.css';

const Hero = () => {
  const { userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const qrRef = useRef(null);

  const siteURL = 'www.pelagopass.com';
  const profileUrl = `${siteURL}/cv/${userData?.username}`;
  const homeUrl = '/';

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
      link.download = `${userData.name} DigiQR.png`;
      link.click();
    } catch (err) {
      console.error('Error generating high-res QR:', err);
    }
  };

  const renderQRHidden = () => (
    <div
      className="position-absolute"
      style={{ left: '-9999px', top: '-9999px', height: 0, width: 0, overflow: 'hidden' }}
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
  );

  return (
    <div id="home" className="hero-wrapper text-white">
      <div className="hero-overlay">
        <Container className="py-5 px-4">
          {userData ? (
            <>
              {/* Desktop */}
              <Row className="d-none d-md-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Col className="text-center">
                  <h1 className="display-4 fw-bold text-uppercase fontNormal">
                    {userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown />
                  </h1>
                  <Container className="col-lg-6 mx-auto">
                    <p className="lead mb-4 text-uppercase fontCondensed">
                      <span className='fw-bold fontCondensed'>Tap. Share. Done.</span> All without the hassle.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                      <Button variant="primary fontCondensed" size="lg" onClick={() => navigate('/dashboard')}>
                        View Dashboard
                      </Button>
                      <Button variant="primary fontCondensed" size="lg" onClick={handleDownload}>
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
                    <h3 className="fontCondensed mt-5">Trusted by 5,000+ professionals</h3>
                    <h4 className="fontCondensed mt-2">3,124 cards created this week</h4>
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