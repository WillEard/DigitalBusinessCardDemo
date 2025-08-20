// React Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

import { useState, useLayoutEffect, useRef, useCallback, } from 'react';

// Styles
import '../styles/Fonts.css';
import '../styles/HowItWorks.css'; 

import ScrollStack, { ScrollStackItem } from '../assets/react-bits/ScrollStack'; // ScrollStack component

function HowItWorks() {

  const cards = [
    "/howitworks-img/1.png",
    "/howitworks-img/2.png",
    "/howitworks-img/3.png",
    "howitworks-img/4.png",
  ]

  const scrollerRef = useRef(null);
  const [fadeLast, setFadeLast] = useState(false);

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollBottom = scroller.scrollTop + scroller.clientHeight;
    const scrollHeight = scroller.scrollHeight;

    // If scrolled to the bottom
    if (scrollBottom >= scrollHeight) {
      setFadeLast(true);
    }
  };
  
  return (
    <Container fluid id="howitworks" className="text-center howitworks-section">
      <h1 className=" display-3 fw-bold fontNormal">How it works</h1>

      <ScrollStack
        style={{ position: 'relative', width: '100%', height: '40rem', overflowY: 'auto' }}
        itemScale={0.04}
        itemDistance={80}
        blurAmount={5}
        baseScale={0.6}
        fadeOutOnComplete={fadeLast}
        fadeOutDelay={200}
        fadeOutDuration={500}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        <ScrollStackItem style={{ padding: 0, margin: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
          <h2 className="fontNormal display-5">Design Your Card</h2>
          <h3 className="fontCondensed">Choose your layout, colour and contact info</h3>
          <img
            src={cards[0]}
            alt="Card Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <hr />
        </ScrollStackItem>

        <ScrollStackItem style={{ padding: 0, margin: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
          <h2 className="fontNormal display-5">Customise it</h2>
          <h3 className="fontCondensed">Add branding, logos and premium designs</h3>
          <img
            src={cards[1]}
            alt="Card Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <hr />
        </ScrollStackItem>

        <ScrollStackItem style={{ padding: 0, margin: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
          <h2 className="fontNormal display-5">Share Anywhere</h2>
          <h3 className="fontCondensed">Send via QR code or add to your apple/android wallet</h3>
          <img
            src={cards[2]}
            alt="Card Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <hr />
        </ScrollStackItem>

        {!fadeLast && (
          <div className={`fade-collapse ${fadeLast ? 'hide' : ''}`}>
            <ScrollStackItem style={{ padding: 0, margin: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
              <h2 className="fontNormal display-5">Done!</h2>
              <h3 className="fontCondensed">Plus 10% of subscriptions go to a charity of your choice!</h3>
              <img
                src={cards[3]}
                alt="Card Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </ScrollStackItem>
          </div>
        )}

      </ScrollStack>

      

    </Container>
  );
}

export default HowItWorks;