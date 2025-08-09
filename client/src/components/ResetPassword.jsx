// React Bootstrap
import { Button, Form, FloatingLabel, Container } from 'react-bootstrap';

// React
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// App Context
import { AppContext } from '../context/AppContext';

// Toast for user messages
import { toast } from 'react-toastify';

// Axios
import axios from 'axios';

// Styles
import '../styles/Fonts.css';


const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPass, setNewPassword] = useState('');

  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  // Email form handler
  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-reset-otp',
        { email }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // OTP Form handler
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    setOtp(otp);
    setIsOtpSubmitted(true);
  };

  // New password form handler
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      console.log(email, otp, newPass);

      const { data } = await axios.post(
        backendUrl + '/api/auth/reset-password',
        { email, otp, newPass }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/Authenticate');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="rounded text-dark mx-auto col-lg-5 mt-5 pt-2 pb-3">
  <h1 className="text-center mb-1 text-light fontNormal display-4">
    Reset Password
  </h1>

  {/* Email Address Form */}
  {!isEmailSent && (
    <Form onSubmit={onSubmitEmail}>
      <p className="text-center mt-2 text-light fontCondensed">
        Enter the email address associated with your account
      </p>
      <Form.Group className="mb-3 mt-3 row justify-content-center" controlId="formEmail">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-10 col-xxl-6">
          <FloatingLabel label="Email Address" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
        </div>
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button className="btn btn-md fontCondensed rounded-5" variant="primary" type="submit">
          Reset Link
        </Button>
      </div>
    </Form>
  )}

  {/* OTP Form */}
{!isOtpSubmitted && isEmailSent && (
  <Form onSubmit={onSubmitOtp}>
    <h5 className="text-center mt-2 text-light fontCondensed">
      Enter the 6-digit code sent to your email address
    </h5>
    <Form.Group className="mb-3" controlId="formOtp">
      <div className="mx-auto col-sm-12 col-md-6 col-lg-6 col-xl-10 col-xxl-6" style={{ maxWidth: '300px' }}>
        <FloatingLabel label="OTP" className="mb-3">
          <Form.Control
            type="number"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </FloatingLabel>
      </div>
    </Form.Group>
    <div className="d-flex justify-content-center">
      <Button className="btn btn-md fontCondensed rounded-5" variant="primary" type="submit">
        Verify
      </Button>
    </div>
  </Form>
)}

{/* New Password Form */}
{isOtpSubmitted && isEmailSent && (
  <Form onSubmit={onSubmitNewPassword}>
    <h5 className="text-center mt-2 text-light fontCondensed">Enter your new password</h5>
    <Form.Group className="mb-3" controlId="formNewPassword">
      <div className="mx-auto col-sm-12 col-md-6 col-lg-6 col-xl-10 col-xxl-6" style={{ maxWidth: '300px' }}>
        <FloatingLabel label="New Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </FloatingLabel>
      </div>
    </Form.Group>
    <div className="d-flex justify-content-center">
      <Button className="btn btn-md fontCondensed rounded-5" variant="primary" type="submit">
        Reset Password
      </Button>
    </div>
  </Form>
)}
</Container>
  );
};

export default ResetPassword;
