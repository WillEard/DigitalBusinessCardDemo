import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import HomeContent from '../components/HomeContent';
import { useNavigate } from 'react-router-dom';
import ThreePointJumbo from '../components/3Points-Jumbo';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';


const Home = () => {
  return (
    <div className='ocean-background '>
      <div className='fluid'>
        {/* Navbar top of webpage */}
        <Navbar />

        {/* Hero top of Homepage, Title & CTA */}
        <Hero />

        <ThreePointJumbo />

        <HowItWorks />

        <Features />

        <Testimonials />

        {/* Selling point section, 4 tiles 
        <HomeContent />
        */}

        {/* Pricing & Subscription section */}
        <Pricing />

        {/* FAQ section */}

        {/* Footer at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
