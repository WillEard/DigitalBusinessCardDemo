import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <>
      <Container>
        <Navbar />

        {/* Only show if user is authenticated*/}
        <Hero />

        <Footer />
      </Container>
    </>
  );
};

export default Home;
