import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <Navbar
      fixed="bottom"
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Footer;
