import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/esm/Container';
import { Toast } from 'bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData, setAuthState } =
    useContext(AppContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body className="danger">{data.message}</Toast.Body>
        </Toast>;
      }
    } catch (error) {
      console.error(error);

      <Toast>
        <Toast.Header>
          <strong className="me-auto">Alert</strong>
        </Toast.Header>
        <Toast.Body className="danger">{error.message}</Toast.Body>
      </Toast>;
    }
  };

  return (
    //Sign Up Form
    <Container className="mx-auto col-lg-5 mt-5 pt-5 pb-3">
  <div className="mt-5 pt-4 text-center">
    <h1 className="mb-4" style={{ fontFamily: 'Sailor' }}>Sign Up</h1>

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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              required
            />
          </FloatingLabel>
          <Form.Text className="text-light d-block text-start mt-1" style={{ fontFamily: 'Sailor Condensed' }}>
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <FloatingLabel controlId="formConfirmPassword" label="Confirm Password" className="text-dark">
            <Form.Control
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Button type="submit" variant="primary" className="rounded-3 btn-lg mt-3" style={{ fontFamily: 'Sailor' }}>
          Sign Up
        </Button>

        <Form.Text className="text-secondary d-block text-center mt-3">
        <a className="text-light text-decoration-none" onClick={() =>
                    navigate('/Authenticate', { state: { authState: 'login' } })
                  } role="button" style={{ fontFamily: 'Sailor Condensed' }}>
            Have an account? Login here
          </a>
        </Form.Text>
      </Form>
    </div>
  </div>
</Container>
  );
};

export default SignupForm;
