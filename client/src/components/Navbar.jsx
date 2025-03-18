import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        <Navbar.Brand href="/">Health Bot </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/intake">Intake</Nav.Link>
            <Nav.Link href="/meals">Meals</Nav.Link>
            <Nav.Link href="/nutrition">Nutrition</Nav.Link>
            <Nav.Link href="/workouts">Workouts</Nav.Link>
          </Nav>
          <Nav>
            {userData ? (
              <>
                <NavDropdown title="Account" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Item href="/fitness-plus">
                    Fitness Friend+
                  </NavDropdown.Item>
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
                  href="/profile"
                  className="fw-bold border rounded border-light"
                >
                  {userData.name[0].toUpperCase()}
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/Authenticate" className="fw-bold">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
