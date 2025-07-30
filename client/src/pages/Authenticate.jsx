import Container from 'react-bootstrap/esm/Container';
import Navbar from '../components/Navbar';
import LoginForm from '../components/Login';
import Footer from '../components/Footer';
import { useState, useEffect, useContext } from 'react';
import SignupForm from '../components/Signup';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

import '../Authenticate.css'; // CSS file for background and styling

import { GoogleLogin, googleLogout } from '@react-oauth/google';
const backendUrl = import.meta.env.VITE_BACKEND_URL; // Adjust based on your environment

const Login = () => {
  const location = useLocation();
  const { isLoggedIn } = useContext(AppContext);
  const navAuthState = location.state?.authState;
  const [authState, setAuthState] = useState(navAuthState || 'Login');
  const navigate = useNavigate();
  const { setUserData, setIsLoggedIn } = useContext(AppContext);

  useEffect(() => {
    if (navAuthState) {
      setAuthState(navAuthState);
    }
  }, [navAuthState]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  

  // Handle Google OAuth login success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
  
    try {
      const res = await axios.post(`${backendUrl}/api/auth/google-login`, {
        token: credential,
      }, {
        withCredentials: true, // ✅ Needed to receive the secure cookie
      });
  
      const data = res.data;
  
      if (data.success) {
        console.log('User logged in:', data.user);
        setUserData(data.user);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        console.error('Google Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err.response?.data || err.message);
    }
  };
    

  

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
  <div className="login-overlay flex-grow-1">
    <Container fluid>
      <Navbar />

      

      {authState === 'SignUp' ? <SignupForm /> : <LoginForm />}
    </Container>
    <div className='w-25 mx-auto'>
      <hr />
    </div>
    <div className="d-flex flex-column align-items-center justify-content-center my-4">
      {/*
        <div className="google-login-box bg-light rounded p-3 shadow-sm text-dark">
          <p className="mb-2 text-center fw-bold">Or continue with Google</p>
          <GoogleLogin 
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log("Login failed")}
            width="100%" // Optional — adjust based on preference
          /> 
        </div>
        */}
      </div>
      

    <Footer />
  </div>
</div>
  );
};

export default Login;