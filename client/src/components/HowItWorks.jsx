// React Bootstrap
import { Container } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";

// Styles
import "../styles/Fonts.css";
import "../styles/HowItWorks.css";

import ScrollStack, { ScrollStackItem } from "../assets/react-bits/ScrollStack";

const HowItWorks = () => {
  const cards = [
    "/howitworks-img/1.png",
    "/howitworks-img/2.png",
    "/howitworks-img/3.png",
    "/howitworks-img/4.png",
  ];

  const scrollerRef = useRef(null);
  const [fadeLast, setFadeLast] = useState(false);
  const [hideLastElement, setHideLastElement] = useState(false);

  const handleScroll = (e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollBottom = scroller.scrollTop + scroller.clientHeight;
    const scrollHeight = scroller.scrollHeight;

    // If scrolled to the bottom
    if (scrollBottom >= scrollHeight - 50) {
      setFadeLast(true);
    }
  };

  // Hide last element after fade animation completes
  useEffect(() => {
    if (fadeLast) {
      const timer = setTimeout(() => {
        setHideLastElement(true);
      }, 700); // 200ms delay + 500ms duration = 700ms total
      return () => clearTimeout(timer);
    }
  }, [fadeLast]);

  return (
    <Container fluid id="howitworks" className="text-center howitworks-section">
      <h1 className="display-3 fw-bold fontNormal mb-5">How it works</h1>

      <ScrollStack
        ref={scrollerRef}
        onScroll={handleScroll}
        style={{
          position: "relative",
          width: "100%",
          height: "40rem",
          overflowY: "auto",
          margin: "0 auto",
          maxWidth: "800px",
          borderRadius: "1rem",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        }}
        itemScale={0.04}
        itemDistance={80}
        blurAmount={5}
        baseScale={0.6}
        fadeOutOnComplete={fadeLast}
        fadeOutDelay={200}
        fadeOutDuration={500}
      >
        <ScrollStackItem
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <h2 className="fontNormal display-5">Design Your Card</h2>
          <h3 className="fontCondensed">
            Choose your layout, colour and contact info
          </h3>
          <img
            src={cards[0]}
            alt="Design Your Card"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <hr />
        </ScrollStackItem>

        <ScrollStackItem
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <h2 className="fontNormal display-5">Customise it</h2>
          <h3 className="fontCondensed">
            Add branding, logos and premium designs
          </h3>
          <img
            src={cards[1]}
            alt="Customise your card"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <hr />
        </ScrollStackItem>

        <ScrollStackItem
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <h2 className="fontNormal display-5">Share Anywhere</h2>
          <h3 className="fontCondensed">
            Send via QR code or add to your apple/android wallet
          </h3>
          <img
            src={cards[2]}
            alt="Share your card"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <hr />
        </ScrollStackItem>

        {!hideLastElement && (
          <ScrollStackItem
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <h2 className="fontNormal display-5">Done!</h2>
            <h3 className="fontCondensed">
              Plus 10% of subscriptions go to a charity of your choice!
            </h3>
            <img
              src={cards[3]}
              alt="Done"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </ScrollStackItem>
        )}
      </ScrollStack>

      <p className="fontCondensed text-muted mt-4 mb-0">
        Scroll inside the card area ↑
      </p>
    </Container>
  );
};

export default HowItWorks;
