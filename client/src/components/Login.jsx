import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/esm/Container';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData, setAuthState } =
    useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleStateChange = () => {
    setAuthState('Sign Up'); // Send new state to the context
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/api/auth/login', {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/');
        toast.success('Logged in!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.error(data.message, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <Container className="text-dark mx-auto row align-items-center justify-content-center col-lg-5 mt-5 pt-2 pb-3 ">
      <h1 className="text-center text-light">Login</h1>
      <Form onSubmit={onSubmitHandler} className='col-xxl-4 col-xl-6 col-lg-10 col-md-8 col-sm-8 col-xs-12'>
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
              placeholder="Enter email"
              required
            />
          </FloatingLabel>
          <Form.Text className="text-light fw-bold">
            We&apos;ll never share your password with anyone else.
          </Form.Text>
          <br />

          <Button className="btn btn-md mt-2 mb-2" variant="primary" type="submit">
            Login
          </Button>
          <br />
          <Form.Text>
            <a className="text-light fw-bold" onClick={handleStateChange}>
              New? Create an account here
            </a>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LoginForm;
