import Container from 'react-bootstrap/esm/Container';
import EmailVerification from '../components/VerifyAccount';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VerifyEmail = () => {
  return (
    <Container>
      <Navbar />
      <EmailVerification />

      <Footer />
    </Container>
  );
};

export default VerifyEmail;
