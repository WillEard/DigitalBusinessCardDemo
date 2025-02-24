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

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <Container className="text-dark mx-auto row align-items-center col-lg-5 mt-5 pt-2 pb-3">
      <h1 className="text-center">Login</h1>
      <Form onSubmit={onSubmitHandler}>
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
          <Form.Text className="text-dark">
            We&apos;ll never share your password with anyone else.
          </Form.Text>
          <br />
          <Form.Text className="text-secondary">
            Forgot your password?
          </Form.Text>
        </Form.Group>
        <Button className="btn btn-md" variant="dark" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
