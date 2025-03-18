import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import LoginForm from '../components/Login';
import Footer from '../components/Footer';
import { useState } from 'react';
import SignupForm from '../components/Signup';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Login = () => {
  // Login / Sign Up / logged in
  //const [state, setState] = useState('Login');

  const { authState, setAuthState, isLoggedIn } = useContext(AppContext);
  console.log(isLoggedIn);
  return (
    <Container>
      <Navbar />
      <>
        {isLoggedIn ? (
          <Navigate to="/" />
        ) : (
          <div>{authState === 'Sign Up' ? <SignupForm /> : <LoginForm />}</div>
        )}
      </>

      <Footer />
    </Container>
  );
};

export default Login;
