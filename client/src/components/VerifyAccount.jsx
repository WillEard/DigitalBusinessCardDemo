import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';

const EmailVerification = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const [otp, setOTP] = useState('');

  const sendVerifyOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-verify-otp'
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        backendUrl + '/api/auth/verify-account',
        {
          otp,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isVerified && navigate('/');
  }, [isLoggedIn, userData]);

  return (
    <Container className="rounded text-dark mx-auto row align-items-center col-lg-6 mt-5 pt-2 pb-3">
      <h1 className="text-center mb-1">Verify Email</h1>
      <p className="text-center mt-2">
        Enter the 6-digit code sent to the email associated with your account.{' '}
        <br />
        <span className="fw-bold">Not sent?</span> Click to send another. It
        will expire after 15 minutes.
      </p>
      <Container className="mb-3 mx-auto text-center">
        <Button
          variant="primary"
          className="btn btn-md mx-auto"
          onClick={sendVerifyOTP}
        >
          Send Code
        </Button>
      </Container>

      <Form className="" onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formVerify">
          <FloatingLabel controlId="floatingInput" label="OTP" className="mb-3">
            <Form.Control
              type="number"
              placeholder="OTP"
              maxLength="1"
              required
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </FloatingLabel>
          <Button className="btn btn-md mx-auto" variant="dark" type="submit">
            Verify
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default EmailVerification;
