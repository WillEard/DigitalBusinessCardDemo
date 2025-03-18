import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Container>
        <Navbar />

        <Hero />

        <Footer />
      </Container>
    </div>
  );
};

export default Home;
