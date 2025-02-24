import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar />
      <Container className="container text-sm-center p-5 bg-light mt-4 bg-dark text-light rounded text-center">
        <h1>Error 404: Page not found</h1>
        <p>The page you were looking for does not exist.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Home
        </button>
      </Container>

      <Footer />
    </Container>
  );
};

export default NotFound;
