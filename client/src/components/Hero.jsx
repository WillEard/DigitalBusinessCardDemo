import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import { BsQrCode } from "react-icons/bs";
import { FaArrowTurnDown } from "react-icons/fa6";

import CVModal from './CVModal';

const Hero = () => {
  const { userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const profileUrl = `/cv/${userData.username}`;
  const homeUrl = '/';

  useEffect(() => {
    getUserData();
  }, []);

 { /* QR Download */}
 const qrRef = useRef(null);
 const handleDownload = async () => {
  if (!qrRef.current) return;

  try {
    const dataUrl = await toPng(qrRef.current, {
      cacheBust: true,
      pixelRatio: 3, // Higher = better resolution (try 2, 3, or 4)
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'my-high-res-qr-code.png';
    link.click();
  } catch (err) {
    console.error('Error generating high-res QR:', err);
  }
};
{/* End of QR handler */}
  

  return (
    <>
  {userData ? (
    <>
      <div id="home" className="bg-light py-5 px-5 text-dark">
        <Container >
          <Row className="align-items-center d-none d-md-flex">
            {/* Left Column */}
            <Col md={6} className="mb-4 mb-md-0">
              <h1 className="display-3 fw-bold">{userData.name?.split(' ')[0]}, ready to connect? <FaArrowTurnDown /></h1>
              

              <p className="lead mt-3">
                You’re all set. Start sharing your QR to get noticed, connect faster, and stay professional on the go.
              </p>
              <div className="d-flex gap-3 mt-4">
                
                <CVModal profileUrl={profileUrl}/>
                <Button variant="outline-secondary" size="lg" onClick={handleDownload} >
                  Share QR
                </Button>
              </div>
            </Col>

            {/* Right Column with QR and download button */}
            <Col md={6} className="text-center">
              {/* Wrapper div needed for html-to-image */}
              <div ref={qrRef} style={{ display: 'inline-block', background: 'white', padding: '16px', borderRadius: '8px' }}>
                <QRCode
                  className="rounded"
                  size={256}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={profileUrl}
                  viewBox="0 0 256 256"
                  name="userQR"
                />
              </div>
            </Col>
          </Row>

          {/* Mobile layout */}
          <Row className="d-flex d-md-none text-center">
            <Col>
              <QRCode className='rounded'
                size={128}
                style={{ height: "auto", maxWidth: "60%", width: "100%" }}
                value={profileUrl}
                viewBox="0 0 256 256"
              />
              <h1 className="display-5 fw-bold mt-4">Hey {userData.name?.split(' ')[0]},</h1>
              <p className="lead mt-2 px-3">
                Your DigiCard is ready. Share it with a scan and stand out instantly.
              </p>
              <div className="mt-3 my-auto d-flex flex-column gap-3">
                <Button variant="primary" size="lg" onClick={() => navigate(profileUrl)}>View My Digicard</Button>
                
                <OverlayTrigger placement="top"overlay={ <Tooltip id="button-tooltip">Add to wallet is coming soon!</Tooltip>}>
                  <Button type="button" className="btn btn-dark btn-lg" size="lg">Add to wallet</Button>
                </OverlayTrigger>

                <button type="button" className="btn btn-secondary btn-lg" size="lg">Save QR to camera roll</button>
                
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  ) : (
    <>
      {/* Desktop Only Section */}
<div className="bg-light py-5 px-5 text-dark d-none d-md-block">
  <Container>
    <Row className="align-items-center">
      <Col md={6} className="mb-4 mb-md-0">
        <h1 className="display-4 fw-bold">Your Digital CV. One Scan Away.</h1>
        <p className="lead mt-3">
          Create, customize, and share your professional identity in seconds.
          Make a lasting impression with a single scan. <span className='fw-bold'>Quick reaction for every interaction.</span>
        </p>
        <div className="d-flex gap-3 mt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}
          >
            Create Your DigiCard
          </Button>
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => navigate('/Authenticate', { state: { authState: 'Login' } })}
          >
            Login
          </Button>
        </div>
      </Col>
      <Col md={6} className="text-end">
        <QRCode className='rounded'
          size={128}
          style={{ height: "auto", maxWidth: "50%", width: "100%" }}
          value={homeUrl}
          viewBox="0 0 256 256"
        />
      </Col>
    </Row>
  </Container>
</div>

{/* Mobile Only Section */}
<div className="bg-light py-5 px-5 text-dark d-block d-md-none">
  <Row className="text-center">
    <Col>
      <QRCode className='rounded'
        size={128}
        style={{ height: "auto", maxWidth: "60%", width: "100%" }}
        value={profileUrl}
        viewBox="0 0 256 256"
      />
      <h1 className="display-5 fw-bold mt-4">Your Digital CV. One Scan Away.</h1>
      <p className="lead mt-2 px-3">
        Create, customize, and share your professional identity in seconds.
        Make a lasting impression with a single scan. <span className='fw-bold'>Quick reaction for every interaction.</span>
      </p>
      <div className="mt-3 my-auto d-flex flex-column gap-3">
        <Button variant="primary" size="lg">Create your digicard</Button>
        <button type="button" className="btn btn-outline-secondary btn-lg">Login</button>
      </div>
    </Col>
  </Row>
</div>
      </>
  )}
</>
  );
};

export default Hero;
