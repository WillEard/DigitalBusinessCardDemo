// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserCV from '../components/UserCV';

// React Bootstrap
import Container from 'react-bootstrap/esm/Container';

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
