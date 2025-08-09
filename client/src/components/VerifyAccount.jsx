// React Bootstrap
import { Button, Form, FloatingLabel, Container } from 'react-bootstrap';

// React
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// App Context
import { AppContext } from '../context/AppContext';

// Toast for user messages
import { toast } from 'react-toastify';

// Axios
import axios from 'axios';

// Styles
import '../styles/Fonts.css';
import '../styles/Verify-email.css';

const EmailVerification = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);

  const [otp, setOTP] = useState('');

  // Endpoint to send the OTP entered by user to verify account
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

  // Verify form handler
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
    <Container className="rounded text-dark mx-auto col-lg-6 mt-5 pt-2 pb-3">
  <h1 className="text-center mb-1 text-light fontNormal display-4">Verify Email</h1>
  <p className="text-center mt-2 text-light fontCondensed">
    Enter the 6-digit code sent to the email associated with your account.
    <br />
    <span className="fw-bold">Not sent?</span> Click to send another. It will expire after 15 minutes.
  </p>

  {/* Send Code Button */}
  <div className="mb-3 text-center">
    <Button
      variant="secondary"
      className="btn btn-md rounded-5 fontCondensed"
      onClick={sendVerifyOTP}
    >
      Send Code
    </Button>
  </div>

  {/* OTP Form */}
  <Form onSubmit={onSubmitHandler}>
    <Form.Group className="mb-3" controlId="formVerify">
      <div className="mx-auto" style={{ maxWidth: '300px' }}>
        <FloatingLabel label="OTP" className="mb-3">
          <Form.Control
            type="number"
            placeholder="OTP"
            required
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </FloatingLabel>
      </div>
    </Form.Group>
    <div className="d-flex justify-content-center">
      <Button className="btn btn-md rounded-5 fontCondensed" variant="primary" type="submit">
        Verify
      </Button>
    </div>
  </Form>
</Container>
  );
};

export default EmailVerification;
