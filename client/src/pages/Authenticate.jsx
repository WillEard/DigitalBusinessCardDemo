// React Bootstrap
import Container from "react-bootstrap/esm/Container";

// React
import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Google Authentication
import { GoogleLogin } from "@react-oauth/google";

// Components
import Navbar from "../components/Navbar";
import LoginForm from "../components/Login";
import Footer from "../components/Footer";
import SignupForm from "../components/Signup";

// Axios
import axios from "axios";

// Styles
import "../styles/Authenticate.css";

// Contexts
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const location = useLocation();

  const { isLoggedIn, setUserData, setIsLoggedIn, backendUrl } =
    useContext(AuthContext);

  const navAuthState = location.state?.authState;
  const [authState, setAuthState] = useState(navAuthState || "Login");
  const navigate = useNavigate();

  useEffect(() => {
    if (navAuthState) setAuthState(navAuthState);

    if (isLoggedIn) {
      navigate("/");
    }
  }, [navAuthState, isLoggedIn, navigate]);

  // Google login success callback
  const handleGoogleLoginSuccess = useCallback(
    async (credentialResponse) => {
      if (!credentialResponse?.credential) return;

      try {
        const res = await axios.post(
          `${backendUrl}/api/auth/google-login`,
          { token: credentialResponse.credential },
          { withCredentials: true }
        );

        const data = res.data;

        if (data.success) {
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          console.error("Google Login failed");
        }
      } catch (err) {
        console.error("Error during login:", err.response?.data || err.message);
      }
    },
    [navigate, setUserData, setIsLoggedIn]
  ); // Removed backendUrl

  // Google login error callback
  const handleGoogleLoginError = useCallback(() => {
    console.log("Login failed");
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Container fluid>
          <Navbar />
          {authState === "SignUp" ? <SignupForm /> : <LoginForm />}
        </Container>

        <div className="w-25 mx-auto">
          <hr />
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center my-4">
          <div className="google-login-box bg-light rounded p-3 shadow-sm text-dark">
            <p className="mb-2 text-center fw-bold">Or continue with Google</p>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              width="100%"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
