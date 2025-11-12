// React Bootstrap
import { Button, Form, FloatingLabel, Container } from "react-bootstrap";

// React
import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Toast for user messages
import { toast } from "react-toastify";

// Contexts
import { AuthContext } from "../context/AuthContext";

// Axios
import axios from "axios";

// Styles
import "../styles/Fonts.css"; // Import custom font styles
import "../styles/Signup.css"; // Import custom styles for Signup component

// Password Strength
import zxcvbn from "zxcvbn";
import PasswordStrengthBar from "react-password-strength-bar";
import { AuthContext } from "../context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [confirmTouched, setConfirmTouched] = useState(false);

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isStrongEnough = passwordScore >= 3;
  const canSubmit = isStrongEnough && passwordsMatch;

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          username,
          email,
          password,
          phoneNumber,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
    [
      backendUrl,
      email,
      name,
      navigate,
      password,
      phoneNumber,
      setIsLoggedIn,
      getUserData,
      username,
    ]
  );

  const goToLogin = useCallback(() => {
    navigate("/Authenticate", { state: { authState: "login" } });
  }, [navigate]);
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleUsernameChange = useCallback(
    (e) => setUsername(e.target.value),
    []
  );
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePhoneNumberChange = useCallback(
    (e) => setPhoneNumber(e.target.value),
    []
  );

  const handleConfirmPasswordChange = useCallback(
    (e) => setConfirmPassword(e.target.value),
    []
  );
  const handleConfirmBlur = useCallback(() => setConfirmTouched(true), []);

  // Handlers
  const handlePasswordChange = useCallback((e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordScore(zxcvbn(value).score);
  }, []);

  return (
    //Sign Up Form
    <Container className="mx-auto col-lg-5 mt-2 mt-lg-1 pt-2 pt-lg-5 pb-3">
      <div className="mt-2 pt-2 text-center">
        <h1 className="display-4 fw-bold fontNormal mb-4">Sign Up</h1>
        <div className="d-flex justify-content-center">
          <Form onSubmit={onSubmitHandler} className="w-100 formWidth">
            <Form.Group className="mb-3" controlId="formName">
              <FloatingLabel
                controlId="formName"
                label="Name"
                className="text-dark"
              >
                <Form.Control
                  onChange={handleNameChange}
                  value={name}
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <FloatingLabel
                controlId="formUsername"
                label="Username"
                className="text-dark"
              >
                <Form.Control
                  onChange={handleUsernameChange}
                  value={username}
                  type="text"
                  placeholder="Enter username"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <FloatingLabel
                controlId="formEmail"
                label="Email address"
                className="text-dark"
              >
                <Form.Control
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <FloatingLabel
                controlId="formPhoneNumber"
                label="Phone Number"
                className="text-dark"
              >
                <Form.Control
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
                  type="tel"
                  placeholder="Enter phone number"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <FloatingLabel
                controlId="formPassword"
                label="Password"
                className="text-dark"
              >
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  required
                />
              </FloatingLabel>
              <PasswordStrengthBar password={password} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <FloatingLabel
                controlId="formConfirmPassword"
                label="Confirm Password"
                className="text-dark"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmBlur}
                  isInvalid={
                    confirmTouched &&
                    confirmPassword.length > 0 &&
                    password !== confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  Passwords do not match.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="rounded-3 btn-lg mt-5 rounded-5 fontCondensed"
              disabled={!canSubmit}
            >
              Sign Up
            </Button>

            <Form.Text className="text-secondary d-block text-center mt-3">
              <Button
                className="text-light btn-secondary fontCondensed"
                onClick={goToLogin}
                role="button"
              >
                Have an account? Login{" "}
                <span className="fontCondensed text-decoration-underline">
                  here
                </span>
              </Button>
            </Form.Text>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default SignupForm;
