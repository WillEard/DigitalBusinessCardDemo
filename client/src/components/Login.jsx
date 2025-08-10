// React Bootstrap
import { Button, Form, FloatingLabel, Container } from 'react-bootstrap';

// React
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// App Context
import { AppContext } from '../context/AppContext';

// Axios for api calling
import axios from 'axios';

// Toast for user messages
import { Bounce, toast } from 'react-toastify';

// Styles
import '../styles/Fonts.css'; // Import custom font styles

const LoginForm = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData, setAuthState } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation state
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Validation checks
  const emailIsValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordlengthRequirement = 8
  const passwordIsValid = password.length >= passwordlengthRequirement;  // example rule: min 6 chars

   // Overall form validity
  const formIsValid = emailIsValid && passwordIsValid;

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

       // Mark fields as touched on submit to show errors if any
      setEmailTouched(true);
      setPasswordTouched(true);
      
      if (!formIsValid) return;  // Prevent submit if invalid

      const { data } = await axios.post(backendUrl + '/api/auth/login', {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/');
        toast.success('Logged in!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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

  return (
    <Container className="mx-auto col-lg-5 mt-2 mt-lg-1 pt-2 pt-lg-3 pb-3">
      <div className="mt-4 pt-4 text-center">
        <h1 className="display-4 fw-bold fontNormal mb-4">Login</h1>
        <div className="d-flex justify-content-center">
          <Form
            onSubmit={onSubmitHandler}
            className="w-100"
            style={{ maxWidth: '400px' }}
            noValidate
          >
            <Form.Group className="mb-3" controlId="formEmail">
              <FloatingLabel controlId="formEmail" label="Email address" className="text-dark">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  isInvalid={emailTouched && !emailIsValid}
                  isValid={emailTouched && emailIsValid}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <FloatingLabel controlId="formPassword" label="Password" className="text-dark">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  isInvalid={passwordTouched && !passwordIsValid}
                  isValid={passwordTouched && passwordIsValid}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least {passwordlengthRequirement} characters.
                </Form.Control.Feedback>
              </FloatingLabel>
              <Form.Text className="text-light d-block text-start mt-5 text-center fontCondensed">
                We'll never share your password with anyone else.
              </Form.Text>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="rounded-3 btn-lg mt-3 fontCondensed"
              disabled={!formIsValid} // disable if form is invalid
            >
              Login
            </Button>

            <Form.Text className="d-block text-center mt-3">
              <a
                className="text-light text-decoration-none fontCondensed"
                onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })}
                role="button"
              >
                New? Create an account <span className="fontCondensed text-decoration-underline">here</span>
              </a>
            </Form.Text>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
