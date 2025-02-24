import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navigation = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

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
        <Navbar.Brand href="/">Fitness App</Navbar.Brand>
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
            <NavDropdown title="More" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/fitness-plus">
                Fitness Friend+
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {userData ? (
                <NavDropdown.Item
                  onClick={() => navigate('/logout')}
                  eventKey={2}
                  className="fw-bold"
                >
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  onClick={() => navigate('/Authenticate')}
                  eventKey={2}
                  className="fw-bold"
                >
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
            {userData ? (
              <Nav.Link href="/profile" className="fw-bold">
                {userData.name}
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
