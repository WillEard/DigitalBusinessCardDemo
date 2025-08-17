// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';



// Styles
import '../styles/Fonts.css';
import '../styles/HowItWorks.css'; 

import ScrollStack, { ScrollStackItem } from '../assets/react-bits/ScrollStack'; // ScrollStack component

function HowItWorks() {

  const cards = [
    "../../public/howitworks-img/1.png",
    "../../public/howitworks-img/2.png",
    "../../public/howitworks-img/3.png",
    "../../public/howitworks-img/4.png",
  ]
  return (
    <Container fluid id="howitworks" className="text-center howitworks-section">
      <h1 className=" display-3 fw-bold fontNormal">How it works</h1>

      <div className="" id="scroll-stack" style={{ position: 'relative', width: '100%', height: '40rem' }}>
        <ScrollStack style={{ height: '100%', overflowY: 'auto', paddingBottom: '3rem' }}  itemScale={0.04} itemDistance={80} blurAmount={1} baseScale={0.6}>
          <ScrollStackItem>
            <h1 className="step-heading fontNormal text-light fs-2">Design Your Card</h1>
            <p className="fontCondensed text-light fs-5">Choose your layout, colour and contact info</p>
            <img 
              className="img-fluid rounded w-75 mx-auto" // makes image 75% of container width
              src={cards[0]}
              alt="" 
            />
          </ScrollStackItem>

          <ScrollStackItem>
            <h2 className="step-heading fontNormal text-light">Customise it</h2>
            <p className="fontCondensed text-light">Add branding, logos and premium designs</p>
            <img 
              className="img-fluid rounded" 
              src={cards[1]}
              alt="" 
            />
          </ScrollStackItem>

          <ScrollStackItem>
            <h2 className="step-heading fontNormal text-light">Share Anywhere</h2>
            <p className="fontCondensed text-light">Send via QR code or add to your apple/android wallet</p>
            <img 
              className="img-fluid rounded" 
              src={cards[2]}
              alt="" 
            />
          </ScrollStackItem>

          <ScrollStackItem>
            <h2 className="step-heading fontNormal text-light">Done!</h2>
            <p className="fontCondensed text-light">Plus 10% of subscriptions go to a charity of your choice!</p>
            <img 
              className="img-fluid rounded" 
              src={cards[3]}
              alt="" 
            />
          </ScrollStackItem>
        </ScrollStack>
      </div>

      {/** 
      <Row className="justify-content-center">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber1 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading fontNormal" >Design Your Card</h2>
          <p className='fontCondensed'>Choose your layout, colour and contact info</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber2 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading fontNormal">Customise it</h2>
          <p className='fontCondensed'>Add branding, logos and premium designs</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="step-col">
          <div className="step-icon mt-4" aria-hidden="true">
            <RiNumber3 className="step-number" size={'96px'} />
          </div>

          <h2 className="step-heading fontNormal">share anywhere</h2>
          <p className='fontCondensed'>Send via QR code or add to your apple/android wallet</p>
        </Col>
      </Row>
      */}

    </Container>
  );
}

export default HowItWorks;