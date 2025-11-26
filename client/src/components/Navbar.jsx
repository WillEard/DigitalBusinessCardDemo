// React
import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// React Bootstrap
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";

// Contexts
import { AuthContext } from "../context/AuthContext";

// Images
import logo from "../assets/Pelago-Header-Logo-white.svg";

// Styles
import "../styles/Navbar.css"; // Import custom CSS for Navbar
import "../styles/Fonts.css"; // Import custom font styles

const Navigation = () => {
  const navigate = useNavigate(); // Navigation

  const { userData, logout, sendVerifyOTP } = useContext(AuthContext);

  const [scrolled, setScrolled] = useState(false); // New state to track scroll position

  // useEffect for scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50); // change 50 to whatever threshold you want
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scrolling or navigating to homepage
  const handleScrollOrNavigate = useCallback(
    (e, hash) => {
      e.preventDefault();

      if (window.location.pathname === "/") {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/" + (hash ? `#${hash}` : ""));
      }
    },
    [navigate]
  );

  // callBack Handlers for navigation links
  const handleHomeClick = useCallback(
    (e) => handleScrollOrNavigate(e, "home"),
    [handleScrollOrNavigate]
  );
  const handleHowItWorksClick = useCallback(
    (e) => handleScrollOrNavigate(e, "howitworks"),
    [handleScrollOrNavigate]
  );
  const handleFeaturesClick = useCallback(
    (e) => handleScrollOrNavigate(e, "features"),
    [handleScrollOrNavigate]
  );
  const handleTestimonialsClick = useCallback(
    (e) => handleScrollOrNavigate(e, "testimonials"),
    [handleScrollOrNavigate]
  );
  const handlePricingClick = useCallback(
    (e) => handleScrollOrNavigate(e, "pricing"),
    [handleScrollOrNavigate]
  );

  const handleSignUpClick = useCallback(
    () => navigate("/Authenticate", { state: { authState: "SignUp" } }),
    [navigate]
  );
  const handleLoginClick = useCallback(
    () => navigate("/Authenticate", { state: { authState: "Login" } }),
    [navigate]
  );

  return (
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      collapseOnSelect
      expand="lg"
      className={`floating-navbar rounded-bottom m-auto shadow-lg bg-body-tertiary design ${
        scrolled ? "navbar-scrolled" : "navbar-top"
      }`}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center logohover">
          <Image src={logo} className="logohover navbrand" alt="Pelago Logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="border border-light"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center mx-auto d-none d-md-flex">
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

          {/* Mobile Navigation */}
          <Nav className="d-flex d-md-none justify-content-between">
            <Nav.Item>
              <Nav.Link
                href="#home"
                onClick={handleHomeClick}
                className="text-light fontCondensed text-center"
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/#howitworks"
                onClick={handleHowItWorksClick}
                className="text-light fontCondensed text-center"
              >
                How it works
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/#features"
                onClick={handleFeaturesClick}
                className="text-light fontCondensed text-center"
              >
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/#testimonials"
                onClick={handleTestimonialsClick}
                className="text-light fontCondensed text-center"
              >
                Testimonials
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/#pricing"
                onClick={handlePricingClick}
                className="text-light fontCondensed text-center"
              >
                Pricing
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Account Menu (Desktop) */}
          <Nav className="d-none d-md-flex">
            {userData ? (
              <>
                <NavDropdown
                  title={
                    <span className="text-white fontCondensed">Account</span>
                  }
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item href="/dashboard" className="fontCondensed">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/account" className="fontCondensed">
                    Account
                  </NavDropdown.Item>
                  {!userData.isVerified ? (
                    <NavDropdown.Item
                      onClick={sendVerifyOTP}
                      className="fontCondensed"
                    >
                      Verify Account
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item disabled className="fontCondensed">
                      Verified
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={logout}
                    eventKey={2}
                    className="fw-bold fontCondensed"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link
                  href="/account"
                  className="fw-bold border rounded border-light text-light"
                >
                  {userData.name[0].toUpperCase()}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={handleSignUpClick}
                  className="fw-bold text-light rounded signup mx-1 fontCondensed sign-up bg-primary"
                >
                  Sign Up
                </Nav.Link>
                <Nav.Link
                  onClick={handleLoginClick}
                  className="fw-bold text-light login rounded fontCondensed "
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Account Menu (Mobile) */}
          <Nav className="d-flex d-md-none">
            {userData ? (
              <>
                <hr />
                <Nav.Item>
                  <Nav.Link
                    href="/dashboard"
                    className="fontCondensed text-center text-light"
                  >
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/account"
                    className="fontCondensed text-center text-light"
                  >
                    Account
                  </Nav.Link>
                </Nav.Item>
                {!userData.isVerified ? (
                  <Nav.Item>
                    <Nav.Link
                      onClick={sendVerifyOTP}
                      className="fontCondensed text-center text-light"
                    >
                      Verify Account
                    </Nav.Link>
                  </Nav.Item>
                ) : (
                  <Nav.Item>
                    <Nav.Link
                      disabled
                      className="fontCondensed text-center text-light"
                    >
                      Verified
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link
                    onClick={logout}
                    className="fw-bold fontCondensed text-center text-light"
                  >
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link
                    onClick={handleSignUpClick}
                    className="fw-bold text-light rounded signup fontCondensed text-center bg-primary"
                  >
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={handleLoginClick}
                    className="fw-bold text-light login rounded fontCondensed text-center"
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
