import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useNavigate } from 'react-router-dom';
import { useState,useContext, useEffect } from 'react';

import { AppContext } from '../context/AppContext';

import { Toast } from 'bootstrap';
import { toast } from 'react-toastify';

import axios from 'axios';

import CircumIcon from "@klarr-agency/circum-icons-react"; // React


const Settings = () => {
  
  const { backendUrl, userData, cvData, getCVData, isLoadingUser} = useContext(AppContext);
  
  const username = userData?.username;

  

  const [phoneNumber, setPhoneNumber] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [projects, setProjects] = useState('');
  const [languages, setLanguages] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [achievements, setAchievements] = useState('');


   // Fetch CV data when username is available
   // If userData is missing after loading finishes, redirect
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      console.warn("Not logged in.");
      
    }
  }, [isLoadingUser, userData]);

  // Once user is available, fetch CV and phone
  useEffect(() => {
    if (username) {
      console.log('Fetching CV data for', username);
      getCVData(username);
      setPhoneNumber(userData?.phoneNumber || '');
    }
  }, [username]);


  useEffect(() => {
    if (cvData) {
      setEducation(cvData.cv.education || '');
      setExperience(cvData.cv.experience || '');
      setSkills(cvData.cv.skills || '');
      setCertifications(cvData.cv.certifications || '');
      setProjects(cvData.cv.projects || '');
      setLanguages(cvData.cv.languages || '');
      setHobbies(cvData.cv.hobbies || '');
      setAchievements(cvData.cv.achievements || '');
    }
  }, [cvData]);

  // When save button is clicked, update the CV data
  const handleSave = async () => {
    try {
      if (!username) {
        toast.error('Username is not defined');
        return;
      }

      await axios.post(`${backendUrl}/api/cv/${username}`, {
        education,
        experience,
        skills,
        certifications,
        projects,
        languages,
        hobbies,
        achievements
      });
  
      toast.success('CV updated successfully');
  
      // Optional: refresh the CV data after saving
      if (userData?.username) {
        await getCVData(userData.username);
      }
  
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  
  return (
    <Container className='bg-dark text-light'>
      <Navbar />
      <br />
      <div className="d-flex align-items-center">
        <h1 className="text-start mb-0">Account</h1>
        <CircumIcon name="user" style={{ marginLeft: '0.5rem' }} />
      </div>
      <Tabs
        defaultActiveKey="daily"
        id="justify-tab-example"
        className="mb-3 bg-primary rounded-top"
        justify

      >
        {/*PROFILE TAB*/}
        <Tab eventKey="daily" title="Profile" className="fw-bold">

          <Row className="justify-content-center">
            <Col className="col-lg-3 col-sm-5">
              <Form.Group className="mb-3">
                
                <Form.Label className='text-light'>Name</Form.Label>
                <Form.Control value={userData?.name || ''} disabled />
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
                <Form.Label className='text-light'>Username</Form.Label>
                <Form.Control value={userData?.username || ''} disabled />
              </Form.Group>
            </Col>
            <Col className="col-lg-3 col-sm-5">
              <Form.Group className="mb-3">
                <Form.Label className='text-light'>Email Address</Form.Label>
                <Form.Control value={userData?.email || ''} disabled />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <div className="d-flex align-items-center">
            <h1 className="text-start mb-0">Resume</h1>
            <CircumIcon name="file_on" style={{ marginLeft: '0.5rem' }}/>
          </div>

          <Row className='justify-content-center p-3'>
            <Col className='col-lg-6 col-sm-8'>
              <Form>
              <Form.Group className="mb-3" controlId="FullNameControlInput">
                  <Form.Label className='text-light'>Full Name</Form.Label>
                  <Form.Control type="email" value={cvData?.user?.name || ''} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="EmailControlInput">
                  <Form.Label className='text-light'>Email address</Form.Label>
                  <Form.Control type="email" value={cvData?.user?.email || ''} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PhoneNumberControlInput">
                  <Form.Label className='text-light'>Phone Number</Form.Label>
                  <Form.Control type="tel" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} />
              </Form.Group>
                
              <Form.Group className="mb-3" controlId="EducationControlInput">
                <Form.Label className='text-light'>Education</Form.Label>
                <Form.Control as="textarea" onChange={e => setEducation(e.target.value)} rows={5} value={education}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ExperienceControlInput">
                <Form.Label className='text-light'>Experience</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setExperience(e.target.value)}  value={experience} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="SkillsControlInput">
                <Form.Label className='text-light'>Skills</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setSkills(e.target.value)}  value={skills}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="CerficationsControlInput">
                <Form.Label className='text-light'>Certifications</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setCertifications(e.target.value)}  value={certifications}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ProjectsControlInput">
                <Form.Label className='text-light'>Projects</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setProjects(e.target.value)}  value={projects}/>
              </Form.Group>
              <hr />
              <h3>Additional Personal Information</h3>
              <Form.Group className="mb-3" controlId="LanguagesControlInput">
                <Form.Label className='text-light'>Languages</Form.Label>
                <Form.Control as="textarea" rows={2} onChange={e => setLanguages(e.target.value)}  value={languages}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="HobbiesControlInput">
                <Form.Label className='text-light'>Hobbies</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setHobbies(e.target.value)}  value={hobbies}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PersonalAchievementsControlInput">
                <Form.Label className='text-light'>Personal Achievements</Form.Label>
                <Form.Control as="textarea" rows={4} onChange={e => setAchievements(e.target.value)}  value={achievements}/>
              </Form.Group>

              <Button className="btn btn-primary justify-content-center" type="button"  onClick={handleSave} disabled={!userData?.username}>
                  Update CV
              </Button>
             
              </Form>
            </Col>
          </Row>
        </Tab>

        {/*SECURITY TAB*/}
        <Tab eventKey="weekly" title="Security" className="fw-bold">
          <Row className="justify-content-center">

            <Col className="col-5">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control
                  placeholder="*******"
                  disabled
                />
                <div className="mt-2">
                  <Button
                    href="/reset-pass"
                    className="bg-primary text-light"
                  >
                    Change Password
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className='text-light'>Mobile Number</Form.Label>
                <Form.Control value={userData?.phoneNumber} disabled />
              </Form.Group>{' '}
            </Col>

            <Col className="col-5">
              <Form.Group className="mb-3">
                <Form.Label className='text-light'>Verification</Form.Label>
                <Form.Control value={userData?.isVerified ? 'Verified' : 'Not Verified'} disabled />
              </Form.Group>{' '}

              <Form.Group className="mb-3">
                <Form.Label className='text-light'>Delete Account</Form.Label>
                <Form.Control placeholder="Enter account password to delete" disabled />
                <Button className="btn btn-danger d-block mt-2">Delete Account</Button>
              </Form.Group>{' '}
              
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Settings;
