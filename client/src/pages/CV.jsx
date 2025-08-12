// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserCV from '../components/UserCV';

// React Bootstrap
import Container from 'react-bootstrap/esm/Container';

const CV = () => {
  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Navbar />

        <UserCV />

        
      </div>
      <Footer />
    </div>
  );
};

export default CV;
