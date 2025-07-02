import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/DigiCardLogo.jpg'
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navigation = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const sendVerifyOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-verify-otp'
      );

      if (data.success) {
        navigate('/verify-email');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Navbar
      sticky="top"
      bg="dark"
      data-bs-theme="dark"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary rounded-bottom m-auto shadow-sm "
    >
      <Container>
        <Navbar.Brand href="/">DigiCard Logo Here</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bg-primary'>
          <span className="navbar-toggler-icon" /> </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center mx-auto text-light">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#pricing">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#howitworks">How it works</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#faq">FAQ</a>
            </li>

          </Nav>
          <Nav>
            {userData ? (
              <>
                <NavDropdown title="Account" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                
                  {!userData.isVerified ? (
                    <NavDropdown.Item onClick={sendVerifyOTP}>
                      Verify Account
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item disabled>Verified</NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={logout}
                    eventKey={2}
                    className="fw-bold"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link
                  href="/account"
                  className="fw-bold border rounded border-light"
                >
                  {userData.name[0].toUpperCase()}
                </Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link onClick={() => navigate('/Authenticate', { state: { authState: 'SignUp' } })} className="fw-bold bg-primary text-white rounded">
                Sign Up
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/Authenticate', { state: { authState: 'Login' } })} className="fw-bold">
                Login
              </Nav.Link></>
              
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
