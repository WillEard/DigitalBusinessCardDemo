import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import LoginForm from '../components/Login';
import Footer from '../components/Footer';
import { useState } from 'react';
import SignupForm from '../components/Signup';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Login = () => {
  // Login / Sign Up / logged in

  const location = useLocation();
  const {isLoggedIn } = useContext(AppContext);
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
    <Container>
      <Navbar />
      <>
        {isLoggedIn ? (
          <Navigate to="/" />
        ) : (
          <div>{authState === 'SignUp' ? <SignupForm /> : <LoginForm />}</div>
        )}
      </>

      <Footer />
    </Container>
  );
};

export default Login;
