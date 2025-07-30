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
import '../Fonts.css'; // Import custom font styles

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
    <Container className="mx-auto col-lg-5 mt-5 pt-5 pb-3">
  <div className="mt-5 pt-4 text-center">
    <h1 className="text-light mb-4" style={{ fontFamily: 'Sailor' }}>Login</h1>

    <div className="d-flex justify-content-center">
      <Form
        onSubmit={onSubmitHandler}
        className="w-100"
        style={{ maxWidth: '400px' }}
      >
        <Form.Group className="mb-3" controlId="formEmail">
          <FloatingLabel controlId="formEmail" label="Email address" className='text-dark'>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <FloatingLabel controlId="formPassword" label="Password" className='text-dark'>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FloatingLabel>
          <Form.Text className="text-light d-block text-start mt-2 text-center" style={{ fontFamily: 'Sailor Condensed' }}>
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" className="rounded-3 btn-lg mt-3" style={{ fontFamily: 'Sailor' }}>
          Login
        </Button>

        <Form.Text className="d-block text-center mt-3">
          <a className="text-light text-decoration-none" onClick={handleStateChange} role="button" style={{ fontFamily: 'Sailor Condensed' }}>
            New? Create an account here
          </a>
        </Form.Text>
      </Form>
    </div>
  </div>
</Container>
  );
};

export default LoginForm;
