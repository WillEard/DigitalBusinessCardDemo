import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResetPassword from '../components/ResetPassword';

const ResetPass = () => {
  return (
    <Container>
      <Navbar />
      <ResetPassword />
      <Footer />
    </Container>
  );
};

export default ResetPass;
