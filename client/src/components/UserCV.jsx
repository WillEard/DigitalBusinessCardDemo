// React
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// React Bootstrap
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// App Context
import { AppContext } from '../context/AppContext';

// Styles
import '../styles/Fonts.css'; // Import custom font styles

const CVModal = () => {
  const { cvData, getCVData } = useContext(AppContext);
  const { userData, getUserData } = useContext(AppContext);

  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getCVData(username);
    }
    getUserData();
  }, [username]);
  
  return (
    <>
      <Container data-bs-theme="dark" className="mt-3 mb-5 p-4 shadow-4 rounded-3 bg-body-tertiary text-light d-flex justify-content-between align-items-center">
        <h2 className='text-start'>{cvData?.user?.name || 'Loading...'}</h2>
        <h3 className='text-end'>{userData?.isVerified ? 'Verified' : 'Not Verified'}</h3>
      </Container>

      <Row className='justify-content-center p-3'>
        <Col className='col-lg-6 col-sm-8'>
          <Form>
          <Form.Group className="mb-3" controlId="FullNameControlInput">
              <Form.Label className='fontCondensed'>Full Name</Form.Label>
              <Form.Control type="email" placeholder={cvData?.user?.name || 'Loading...'} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="EmailControlInput">
              <Form.Label className='fontCondensed'>Email address</Form.Label>
              <Form.Control type="email" placeholder={cvData?.user?.email || 'Loading...'} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="PhoneNumberControlInput">
              <Form.Label className='fontCondensed'>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="[Only display if both parties are verified]" disabled/>
          </Form.Group>
            
          <Form.Group className="mb-3" controlId="EducationControlInput">
            <Form.Label className='fontCondensed'>Education</Form.Label>
            <Form.Control as="textarea" placeholder={cvData?.cv?.education || 'Loading...'} rows={5} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ExperienceControlInput">
            <Form.Label className='fontCondensed'>Experience</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.experience || 'Loading...'} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="SkillsControlInput">
            <Form.Label className='fontCondensed'>Skills</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.skills || 'Loading...'} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="CerficationsControlInput">
            <Form.Label className='fontCondensed'>Certifications</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.certifications || 'Loading...'} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ProjectsControlInput">
            <Form.Label className='fontCondensed'>Projects</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.projects || 'Loading...'} disabled/>
          </Form.Group>
          <hr />
          <h3>Additional Personal Information</h3>
          <Form.Group className="mb-3" controlId="LanguagesControlInput">
            <Form.Label className='fontCondensed'>Languages</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder={cvData?.cv?.languages || 'Loading...'} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="HobbiesControlInput">
            <Form.Label className='fontCondensed'>Hobbies</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder={cvData?.cv?.hobbies || 'Loading...'} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="PersonalAchievementsControlInput">
            <Form.Label className='fontCondensed'>Personal Achievements</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder={cvData?.cv?.achievements || 'Loading...'} disabled/>
          </Form.Group>  
          </Form>
        </Col>
      </Row>  
    </>
  );
};

export default CVModal;
