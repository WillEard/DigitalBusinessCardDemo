// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// Icons
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

// Carousel
import PhoneCarousel from './PassCarousel';

// Styles
import '../styles/Fonts.css';
import '../styles/HowItWorks.css'; 

import Stepper, { Step } from '../assets/react-bits/Stepper'; // Stepper component



function HowItWorks() {
  return (
    <Container id="howitworks" className="text-center howitworks-section">
  <h1 className="display-3 fw-bold fontNormal mb-5">How it works</h1>

  {/* Stepper */}
  <Container className="stepper-wrapper mx-auto mb-5">
    <Stepper
      initialStep={1}
      onStepChange={(step) => console.log(step)}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
        <img
          className="img-fluid rounded mt-3"
          style={{ height: "4em", objectFit: "cover", objectPosition: "center -0px" }}
          src="/Pelago-Favicon.svg"
          alt="Custom card preview"
        />
        <h2 className="fontNormal">Design Your Card</h2>
        <p className="fontCondensed">Choose your layout, colour and contact info</p>
      </Step>
      <Step>
        <img
          className="img-fluid rounded mt-3"
          style={{ height: "4em", objectFit: "cover", objectPosition: "center -0px" }}
          src="/Pelago-Favicon.svg"
          alt="Custom card preview"
        />
        <h2 className="fontNormal">Customise it</h2>
        <p className="fontCondensed">Add logos, branding and personalised content</p>
      </Step>
      <Step>
        <img
          className="img-fluid rounded mt-3"
          style={{ height: "4em", objectFit: "cover", objectPosition: "center -0px" }}
          src="/Pelago-Favicon.svg"
          alt="Custom card preview"
        />
        <h2 className="fontNormal">Share anywhere</h2>
        <p className="fontCondensed">
          Share via QR code or add to your Apple/Android wallet
        </p>
      </Step>
      <Step>
        <img
          className="img-fluid rounded mt-3"
          style={{ height: "5em", objectFit: "cover", objectPosition: "center -0px" }}
          src="/Pelago-Favicon.svg"
          alt="Custom card preview"
        />
        <h2 className='fontNormal pb-3 pt-1'>Benefits?</h2>
        <ul className='list-unstyled text-center'>
          <li><p className='fontCondensed'>100% Environmentally friendly</p></li>
          <li><p className='fontCondensed'>Share your skills instantly</p></li>
          <li><p className='fontCondensed'>10% of subscriptions go to a charity of your choice</p></li>
        </ul>
        
        
      </Step>
    </Stepper>
  </Container>

  
</Container>
  );
}

export default HowItWorks;