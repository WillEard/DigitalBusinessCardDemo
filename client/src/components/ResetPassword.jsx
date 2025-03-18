import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

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
    <Container className="rounded text-dark mx-auto row align-items-center col-lg-5 mt-5 pt-2 pb-3">
      <h1 className="text-center mb-1">Reset Password</h1>

      {/*Email Address Form */}

      {!isEmailSent && (
        <Form onSubmit={onSubmitEmail}>
          <h5 className="text-center mt-2">
            Enter the email address associated with your account
          </h5>
          <Form.Group className="mb-3 mt-3" controlId="formVerify">
            <FloatingLabel
              controlId="floatingInput"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>

            <Button className="btn btn-md mx-auto" variant="dark" type="submit">
              reset link
            </Button>
          </Form.Group>
        </Form>
      )}

      {/*OTP Form */}

      {!isOtpSubmitted && isEmailSent && (
        <Form onSubmit={onSubmitOtp} className="">
          <h5 className="text-center mt-2">
            Enter the 6-digit code sent to your email address
          </h5>
          <Form.Group className="mb-3" controlId="formVerify">
            <FloatingLabel
              controlId="floatingInput"
              label="OTP"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </FloatingLabel>
            <Button className="btn btn-md mx-auto" variant="dark" type="submit">
              Verify
            </Button>
          </Form.Group>
        </Form>
      )}

      {/*New Password Form */}

      {isOtpSubmitted && isEmailSent && (
        <Form onSubmit={onSubmitNewPassword} className="">
          <h5 className="text-center mt-2">Enter your new password</h5>
          <Form.Group className="mb-3" controlId="formVerify">
            <FloatingLabel
              controlId="floatingInput"
              label="New Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <Button className="btn btn-md mx-auto" variant="dark" type="submit">
              Reset Password
            </Button>
          </Form.Group>
        </Form>
      )}
    </Container>
  );
};

export default ResetPassword;
