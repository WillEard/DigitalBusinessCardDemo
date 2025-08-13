// React
import { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';

// App Context
import { AppContext } from '../context/AppContext';

// Images
import logo from '../assets/Pelago-Header-Logo-white.svg';

// Styles
import '../styles/Navbar.css'; // Import custom CSS for Navbar
import '../styles/Fonts.css'; // Import custom font styles


const Navigation = () => {
  const navigate = useNavigate(); // Navigation

  const { userData, logout, sendVerifyOTP } = useContext(AppContext); // App Context

  const [scrolled, setScrolled] = useState(false); // New state to track scroll position

  // useEffect for scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50); // change 50 to whatever threshold you want
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrolling or navigating to homepage
  const handleScrollOrNavigate = useCallback((e, hash) => {
    e.preventDefault();
  
    if (window.location.pathname === '/') {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + (hash ? `#${hash}` : ''));
    }
  }, [navigate]);

  // Handlers for navigation links
  const handleHomeClick = useCallback((e) => handleScrollOrNavigate(e, 'home'), [handleScrollOrNavigate]);
  const handleHowItWorksClick = useCallback((e) => handleScrollOrNavigate(e, 'howitworks'), [handleScrollOrNavigate]);
  const handleFeaturesClick = useCallback((e) => handleScrollOrNavigate(e, 'features'), [handleScrollOrNavigate]);
  const handleTestimonialsClick = useCallback((e) => handleScrollOrNavigate(e, 'testimonials'), [handleScrollOrNavigate]);
  const handlePricingClick = useCallback((e) => handleScrollOrNavigate(e, 'pricing'), [handleScrollOrNavigate]);

  const handleSignUpClick = useCallback(() => navigate('/Authenticate', { state: { authState: 'SignUp' } }),[navigate]);
  const handleLoginClick = useCallback(() => navigate('/Authenticate', { state: { authState: 'Login' } }),[navigate]);


  return (
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      collapseOnSelect
      expand="lg"
      className={`floating-navbar rounded-bottom m-auto shadow-lg bg-body-tertiary ${
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
        <Navbar.Toggle aria-controls="navbarScroll" className='border border-light'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center mx-auto">
            <li className="nav-item">
              <a
              href="#home"
              onClick={handleHomeClick}
              className="nav-link active text-light navelement fontCondensed"
              aria-current="page"
            >
              Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#howitworks"
                onClick={handleHowItWorksClick}
                className="nav-link active text-light navelement fontCondensed"
                aria-current="page"
              >
                How it works
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#features"
                onClick={handleFeaturesClick}
                className="nav-link active text-light navelement fontCondensed"
                aria-current="page"
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#testimonials"
                onClick={handleTestimonialsClick}
                className="nav-link active text-light navelement fontCondensed"
                aria-current="page"
              >
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#pricing"
                onClick={handlePricingClick}
                className="nav-link active text-light navelement fontCondensed"
                aria-current="page"
              >
                Pricing
              </a>
            </li>
          </Nav>
          <Nav>
            {userData ? (
              <>
                <NavDropdown title={<span style={{ color: 'white' }} className='fontCondensed'>Account</span>} id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/dashboard" className='fontCondensed'>Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/account" className='fontCondensed'>Account</NavDropdown.Item>
                  {!userData.isVerified ? (
                    <NavDropdown.Item onClick={sendVerifyOTP} className='fontCondensed'>Verify Account</NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item disabled className='fontCondensed'>Verified</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} eventKey={2} className="fw-bold fontCondensed">
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
                  onClick={handleSignUpClick}
                  className="fw-bold text-dark rounded signup mx-1 fontCondensed" style={{ backgroundColor: '#b4d4ed' }}
                >
                  Sign Up
                </Nav.Link>
                <Nav.Link
                  onClick={handleLoginClick}
                  className="fw-bold text-light login rounded fontCondensed"
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