import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import UserCV from '../components/UserCV';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CV = () => {
  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Container>
        <Navbar />

        <UserCV />

        <Footer />
      </Container>
    </div>
  );
};

export default CV;
