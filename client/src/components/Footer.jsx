import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <Navbar
      
      bg="dark"
      data-bs-theme="dark"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary rounded-top m-auto shadow-sm "
    >
      <Container>
        <Navbar.Brand href="/">DigiCard Prototype</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/account">Account</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
