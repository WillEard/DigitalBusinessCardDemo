import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Container from 'react-bootstrap/esm/Container';

const EmailVerification = () => {
  return (
    <Container className=" rounded text-dark mx-auto row align-items-center col-lg-5 mt-5 pt-2 pb-3">
      <h1 className="text-center mb-1">Verify Email</h1>
      <hr />
      <p className="text-center">
        A one time OTP code has been sent to the corresponding email, which will
        expire in 15 minutes.
      </p>
      <Form className="">
        <Form.Group className="mb-3" controlId="formVerify">
          <FloatingLabel controlId="floatingInput" label="OTP" className="mb-3">
            {' '}
            <Form.Control type="number" placeholder="OTP" min={0} max={99999} />
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
