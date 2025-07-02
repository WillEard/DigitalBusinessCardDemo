import Button from 'react-bootstrap/esm/Button';
import { Container, Row, Col, Card, Image, Accordion } from 'react-bootstrap';

const HomeContent = () => {
    return (
        <Container id="faq" className="py-1 px-4 ">
           <h1 className="mb-4 display-3 fw-bold text-center">FAQ</h1>
        <Accordion className='border border-dark rounded'>
          <Accordion.Item eventKey="0" >
            <Accordion.Header className="custom-header" >Query #1</Accordion.Header>
            <Accordion.Body >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="custom-header">Query #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    );
  }

export default HomeContent