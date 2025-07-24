import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import LoginForm from '../components/Login';
import Footer from '../components/Footer';
import { useState, useEffect, useContext } from 'react';
import SignupForm from '../components/Signup';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../Authenticate.css'; // CSS file for background and styling

const Login = () => {
  const location = useLocation();
  const { isLoggedIn } = useContext(AppContext);
  const navAuthState = location.state?.authState;
  const [authState, setAuthState] = useState(navAuthState || 'Login');

  useEffect(() => {
    if (navAuthState) {
      setAuthState(navAuthState);
    }
  }, [navAuthState]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Container fluid>
          <Navbar />

          {authState === 'SignUp' ? <SignupForm /> : <LoginForm />}
        </Container>
      </div>

      
    </div>
  );
};

export default Login;