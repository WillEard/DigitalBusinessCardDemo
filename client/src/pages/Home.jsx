import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import HomeContent from '../components/HomeContent';
import { useNavigate } from 'react-router-dom';
import FAQ from '../components/FAQ';


const Home = () => {
  return (
    <div className='ocean-background'>
      <Container>
        {/* Navbar top of webpage */}
        <Navbar />

        {/* Hero top of Homepage, Title & CTA */}
        <Hero />

        {/* Selling point section, 4 tiles */}
        <HomeContent />

        {/* Pricing & Subscription section */}
        <Pricing />

        {/* FAQ section */}
        <FAQ />

        {/* Footer at bottom */}
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
