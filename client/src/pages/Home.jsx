// React
import { useState } from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import ThreePointJumbo from '../components/3Points-Jumbo';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import NavBanner from '../components/NavBanner';

const Home = () => {
  // Promotion banner
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className='ocean-background '>
      <div className='fluid'>
        {/* Navbar top of webpage */}
        <Navbar />
        {/*{showBanner && (<NavBanner onClose={() => setShowBanner(false)} />)} */}

        {/* Hero top of Homepage, Title & CTA */}
        <Hero />

        <ThreePointJumbo />

        <HowItWorks />

        <Features />

        <Testimonials />

        {/* Pricing & Subscription section */}
        <Pricing />


        {/* Footer at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
