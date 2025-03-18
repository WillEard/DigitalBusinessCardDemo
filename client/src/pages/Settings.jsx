import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Navbar />
      <br />
      <h1 className="text-start">Account</h1>
      <Tabs
        defaultActiveKey="daily"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="daily" title="Profile" className="fw-bold">
          <Row className="justify-content-center">
            <Col className="col-4">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="{user.name}" disabled />
              </Form.Group>
              <Form.Label>HealthBot+ Membership</Form.Label>
              <InputGroup className="mb-3">
                <Button variant="outline-primary" id="button-addon1">
                  Change Plan
                </Button>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  disabled
                  placeholder="Free / Paid {Monthly/Yearly}"
                />
              </InputGroup>
            </Col>
            <Col className="col-4">
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder="{user.email}" disabled />
              </Form.Group>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="weekly" title="Security" className="fw-bold">
          <Row className="justify-content-center">
            <Col className="col-5">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Button
                  className="btn-md"
                  variant="outline-dark"
                  id="button-addon1"
                >
                  Change Password
                </Button>
                <Form.Control
                  placeholder="*******"
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  disabled
                />
              </InputGroup>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control placeholder="{+XX XXXX XXXXXX}" disabled />
              </Form.Group>{' '}
            </Col>
            <Col className="col-5">
              <Form.Group className="mb-3">
                <Form.Label>Verification</Form.Label>
                <Form.Control
                  placeholder="{Verified / Not Verified}"
                  disabled
                />
              </Form.Group>{' '}
              <Form.Group className="mb-3">
                <Form.Label>Delete Account</Form.Label>
                <Button className="btn btn-primary d-block">
                  Delete Account
                </Button>
              </Form.Group>{' '}
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Settings;
