import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import HomeContent from '../components/HomeContent';
import { useNavigate } from 'react-router-dom';
import PricingContainer from '../components/Pricing';


const Home = () => {
  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Container>
        {/* Navbar top of webpage */}
        <Navbar />

        {/* Hero top of Homepage, Title & CTA */}
        <Hero />

        {/* Selling point section, 4 tiles */}
        <HomeContent />

        {/* Pricing & Subscription section */}
        <Pricing />

        {/* Footer at bottom */}
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
