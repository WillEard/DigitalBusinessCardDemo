import { Container, Row, Col } from 'react-bootstrap';
import {
  RiFilePaperLine,
  RiGitRepositoryPrivateLine,
} from 'react-icons/ri';
import {
  BiCustomize,
} from 'react-icons/bi';
import {
  BsQrCode,
} from 'react-icons/bs';
import {
  CiWallet,
  CiMobile3,
} from 'react-icons/ci';

import '../Fonts.css';
import '../Features.css'; // NEW: Import your features styles

function Features() {
  return (
    <Container fluid id="pricing" className="features-section">
      <h1 className="features-heading">Features</h1>

      <Row className="justify-content-center mb-3">
        <Col md={3} className="step-col">
          <div className="step-icon" aria-hidden="true">
            <RiFilePaperLine className="step-number" size={'96px'} />
          </div>
          <h2 className="step-heading">Sustainable by design</h2>
          <p className="font-sailor-italic">No more paper or plastic cards</p>
        </Col>

        <Col md={3} className="step-col">
          <div className="step-icon" aria-hidden="true">
            <BiCustomize className="step-number" size={'96px'} />
          </div>
          <h2 className="step-heading">Fully customisable</h2>
          <p className="font-sailor-italic">Fonts, Logos and layouts</p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-3 py-3">
        <Col md={3} className="step-col">
          <div className="step-icon" aria-hidden="true">
            <BsQrCode className="step-number" size={'96px'} />
          </div>
          <h2 className="step-heading">Smart QR code</h2>
          <p className="font-sailor-italic">Scans to save contacts instantly</p>
        </Col>

        <Col md={3} className="step-col">
          <div className="step-icon" aria-hidden="true">
            <CiWallet className="step-number" size={'96px'} />
          </div>
          <h2 className="step-heading">Digital Wallet Ready</h2>
          <p className="font-sailor-italic">Works with iOS and Androids</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={3} className="step-col">
          <div className="step-icon" aria-hidden="true">
            <RiGitRepositoryPrivateLine className="step-number" size={'96px'} />
          </div>
          <h2 className="step-heading">Private and secure</h2>
          <p className="font-sailor-italic">You control what gets shared</p>
        </Col>

        <Col md={3} className="step-col">
          <div className="step-icon" aria-hidden="true">
            <CiMobile3 className="step-number" size={'96px'} />
          </div>
          <h2 className="step-heading">Mobile Friendly</h2>
          <p className="font-sailor-italic">Looks great on all devices</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;