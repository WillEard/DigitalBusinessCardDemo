// React Bootstrap
import { Button, Form, FloatingLabel, Container } from 'react-bootstrap';

// React
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Toast for user messages
import { toast } from 'react-toastify';

// App Context
import { AppContext } from '../context/AppContext';

// Axios
import axios from 'axios';

// Styles
import '../styles/Fonts.css'; // Import custom font styles

// Password Strength
import zxcvbn from 'zxcvbn';
import PasswordStrengthBar from 'react-password-strength-bar';



const SignupForm = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData, setAuthState } =useContext(AppContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleStateChange = () => {
    setAuthState('Login'); // Send new state to the context
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/api/auth/register', {
        name,
        username,
        email,
        password,
        phoneNumber
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
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
        theme: "colored"
        });
      
    }
  };

  // Handlers
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const score = zxcvbn(value).score;
    setPasswordScore(score);
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const isStrongEnough = passwordScore >= 3; // Change threshold if needed
  const canSubmit = isStrongEnough && passwordsMatch;

  return (
    //Sign Up Form
    <Container className="mx-auto col-lg-5 mt-2 mt-lg-1 pt-2 pt-lg-5 pb-3">
      <div className="mt-2 pt-2 text-center">
        <h1 className="display-4 fw-bold fontNormal mb-4">Sign Up</h1>
        <div className="d-flex justify-content-center">
          <Form onSubmit={onSubmitHandler} className="w-100" style={{ maxWidth: '400px' }}>
            <Form.Group className="mb-3" controlId="formName">
              <FloatingLabel controlId="formName" label="Name" className="text-dark">
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <FloatingLabel controlId="formUsername" label="Username" className="text-dark">
                <Form.Control
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Enter username"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <FloatingLabel controlId="formEmail" label="Email address" className="text-dark">
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <FloatingLabel controlId="formPhoneNumber" label="Phone Number" className="text-dark">
                <Form.Control
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  type="tel"
                  placeholder="Enter phone number"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <FloatingLabel controlId="formPassword" label="Password" className="text-dark">
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
              <FloatingLabel controlId="formConfirmPassword" label="Confirm Password" className="text-dark">
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  isInvalid={confirmPassword && !passwordsMatch}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Button type="submit" variant="primary" className="rounded-3 btn-lg mt-5 rounded-5 fontCondensed" disabled={!canSubmit}>
              Sign Up
            </Button>

            <Form.Text className="text-secondary d-block text-center mt-3">
            <a className="text-light text-decoration-none fontCondensed" onClick={() =>
                        navigate('/Authenticate', { state: { authState: 'login' } })
                      } role="button" >
                Have an account? Login <span className='fontCondensed text-decoration-underline'>here</span>
              </a>
            </Form.Text>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default SignupForm;
