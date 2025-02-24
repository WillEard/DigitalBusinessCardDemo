import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import LoginForm from '../components/Login';
import Footer from '../components/Footer';
import { useState } from 'react';
import SignupForm from '../components/Signup';
import { Navigate } from 'react-router-dom';

const Login = () => {
  // Login / Sign Up / logged in
  const [state, setState] = useState('Log In');

  return (
    <Container>
      <Navbar />
      <>{state === 'Logged In' ? <Navigate to="/" /> : null}</>
      <div>{state === 'Sign Up' ? <SignupForm /> : <LoginForm />}</div>
      <Footer />
    </Container>
  );
};

export default Login;
