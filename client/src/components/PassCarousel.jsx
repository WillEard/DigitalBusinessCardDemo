// React Bootstrap
import { Carousel } from 'react-bootstrap';

// React
import { useRef, useCallback } from 'react';

// Styles
import '../styles/PhoneCarousel.css'; // Import custom CSS for the carousel

const PhoneCarousel = () => {
    const carouselRef = useRef(null);

    const passes = [
      "/carousel/1.png",
      "/carousel/2.png",
      "/carousel/3.png",
      "/carousel/4.png",
    ];

  const handlePrev = useCallback(() => {
    carouselRef.current?.prev();
  }, [] );

  const handleNext = useCallback(() => {
    carouselRef.current?.next();
  }, []);

  return (
    <div className="phone-carousel-wrapper">
      {/* External Controls */}
      <button className="carousel-nav left" onClick={handlePrev}>
        ‹
      </button>
      <div className="phone-frame-container">
        <div className="phone-outline">
          <Carousel
            fade
            controls={false}
            indicators={false}
            interval={3000}
            ref={carouselRef}
          >
            {passes.map((src, idx) => (
              <Carousel.Item key={idx}>
                <img src={src} alt={`Slide ${idx + 1}`} className="carousel-img" />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <button className="carousel-nav right" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default PhoneCarousel;