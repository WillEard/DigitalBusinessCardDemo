import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/Pelago-Header-Logo-white.svg';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Navbar.css'; // Import custom CSS for Navbar
import '../Fonts.css'; // Import custom font styles


const Navigation = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

  // New state to track scroll position
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50); // change 50 to whatever threshold you want
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sendVerifyOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');

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
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      className={`floating-navbar rounded-bottom m-auto shadow-lg ${
        scrolled ? 'navbar-scrolled' : 'navbar-top'
      }`}
      style={{
        backdropFilter: 'blur(4px)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center logohover">
          <Image
            src={logo}
            className='logohover'
            alt="Pelago Logo"
            style={{ width: 120, height: 40, marginRight: 10 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-primary">
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center mx-auto">
            <li className="nav-item">
              <a className="nav-link active text-light navelement" aria-current="page" href="#hero" style={{ fontFamily: 'Sailor Condensed' }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-light navelement" aria-current="page" href="/#howitworks" style={{ fontFamily: 'Sailor Condensed' }}>
                How it works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-light navelement" aria-current="page" href="/#features" style={{ fontFamily: 'Sailor Condensed' }}>
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-light navelement" aria-current="page" href="/#testimonials" style={{ fontFamily: 'Sailor Condensed' }}>
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-light navelement" aria-current="page" href="/#pricing" style={{ fontFamily: 'Sailor Condensed' }}>
                Pricing
              </a>
            </li>
          </Nav>
          <Nav>
            {userData ? (
              <>
                <NavDropdown title={<span style={{ color: 'white' }}>Account</span>} id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                  {!userData.isVerified ? (
                    <NavDropdown.Item onClick={sendVerifyOTP}>Verify Account</NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item disabled>Verified</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} eventKey={2} className="fw-bold">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/account" className="fw-bold border rounded border-light text-light">
                  {userData.name[0].toUpperCase()}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() =>
                    navigate('/Authenticate', { state: { authState: 'SignUp' } })
                  }
                  className="fw-bold bg-primary text-white rounded signup mx-1" style={{ fontFamily: 'Sailor Condensed' }}
                >
                  Sign Up
                </Nav.Link>
                <Nav.Link
                  onClick={() =>
                    navigate('/Authenticate', { state: { authState: 'Login' } })
                  }
                  className="fw-bold text-light login rounded" style={{ fontFamily: 'Sailor Condensed' }}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;