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
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Settings = () => {
  const navigate = useNavigate();

  const { userData} = useContext(AppContext);
  return (
    <Container style={{ backgroundColor: '#D3D3D3' }}>
      <Navbar />
      <br />
      <h1 className="text-start">Account</h1>
      <Tabs
        defaultActiveKey="daily"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        {/*PROFILE TAB*/}
        <Tab eventKey="daily" title="Profile" className="fw-bold">
          <Row className="justify-content-center">
            <Col className="col-lg-3 col-sm-5">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder={userData.name} disabled />
              </Form.Group>
              
              {/*}
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
              */}
            </Col>
            <Col className='col-lg-3 col-sm-5'>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder={userData.username} disabled />
              </Form.Group>
            </Col>
            <Col className="col-lg-3 col-sm-5">
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder={userData.email} disabled />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h1>CV / Resume</h1>
          <Row className='justify-content-center p-3'>
            <Col className='col-lg-6 col-sm-8'>
              <Form>
              <Form.Group className="mb-3" controlId="FullNameControlInput">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="email" placeholder="Jon Smith" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="EmailControlInput">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="PhoneNumberControlInput">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="01234 123 456" />
              </Form.Group>
                
              <Form.Group className="mb-3" controlId="EducationControlInput">
                <Form.Label>Education</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ExperienceControlInput">
                <Form.Label>Experience</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="SkillsControlInput">
                <Form.Label>Skills</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="CerficationsControlInput">
                <Form.Label>Certifications</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ProjectsControlInput">
                <Form.Label>Projects</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
              <hr />
              <h3>Additional Personal Information</h3>
              <Form.Group className="mb-3" controlId="LanguagesControlInput">
                <Form.Label>Languages</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="HobbiesControlInput">
                <Form.Label>Hobbies</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="PersonalAchievementsControlInput">
                <Form.Label>Personal Achievements</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>

              <Button className="btn btn-primary justify-content-center" type="submit">
                  Save CV
                </Button>
             
              </Form>
            </Col>
          </Row>
        </Tab>

        {/*SECURITY TAB*/}
        <Tab eventKey="weekly" title="Security" className="fw-bold">
          <Row className="justify-content-center">
            <Col className="col-5">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Button href="/reset-pass"
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
                <Form.Control placeholder={userData.phoneNumber} disabled />
              </Form.Group>{' '}
            </Col>
            <Col className="col-5">
              <Form.Group className="mb-3">
                <Form.Label>Verification</Form.Label>
                <Form.Control
                  placeholder={userData.isVerified ? 'Verified' : 'Not Verified'}
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
