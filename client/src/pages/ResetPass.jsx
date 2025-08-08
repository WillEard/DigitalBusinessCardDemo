// React Bootstrap
import Container from 'react-bootstrap/esm/Container';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResetPassword from '../components/ResetPassword';

const ResetPass = () => {
  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Container>
          <Navbar />
          <ResetPassword />
          <Footer />
        </Container>
      </div>
    </div>
  );
};

export default ResetPass;
