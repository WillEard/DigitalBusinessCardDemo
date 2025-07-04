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
    <Container className="rounded text-dark mx-auto row align-items-center col-lg-5 mt-5 pt-2 pb-3">
      <h1 className="text-center">Sign Up</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formName">
          <FloatingLabel controlId="formName" label="Name" className="mb-3">
            {' '}
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
          <FloatingLabel controlId="formUsername" label="Username" className="mb-3">
            {' '}
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
          <FloatingLabel
            controlId="formEmail"
            label="Email address"
            className="mb-3"
          >
            {' '}
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
          <FloatingLabel
            controlId="formPhoneNumber"
            label="Phone Number"
            className="mb-3"
          >
            {' '}
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              type="number"
              placeholder="Enter phone number"
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <FloatingLabel
            controlId="formPassword"
            label="Password"
            className="mb-1"
          >
            {' '}
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              required
            />
          </FloatingLabel>
          <Form.Text className="text-dark">
            <p>We&apos;ll never share your password with anyone else.</p>
          </Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3 text-center"
          controlId="formConfirmPassword"
        >
          <FloatingLabel
            controlId="formConfirmPassword"
            label="Confirm Password"
            className="mb-1"
          >
            {' '}
            <Form.Control
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Button className="btn mt-1" variant="dark" type="submit">
          Sign Up
        </Button>{' '}
        <br />
        <Form.Text className="text-secondary">
          <a className="" onClick={handleStateChange}>
            Have an account? Login here
          </a>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignupForm;
