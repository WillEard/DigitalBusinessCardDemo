import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';

import { AppContext } from '../context/AppContext';
import { useContext, useEffect } from 'react';

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
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="email" placeholder={cvData?.user?.name || 'Loading...'} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="EmailControlInput">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder={cvData?.user?.email || 'Loading...'} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PhoneNumberControlInput">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="[Only display if both parties are verified]" disabled/>
              </Form.Group>
                
              <Form.Group className="mb-3" controlId="EducationControlInput">
                <Form.Label>Education</Form.Label>
                <Form.Control as="textarea" placeholder={cvData?.cv?.education || 'Loading...'} rows={5} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ExperienceControlInput">
                <Form.Label>Experience</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.experience || 'Loading...'} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="SkillsControlInput">
                <Form.Label>Skills</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.skills || 'Loading...'} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="CerficationsControlInput">
                <Form.Label>Certifications</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.certifications || 'Loading...'} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ProjectsControlInput">
                <Form.Label>Projects</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder={cvData?.cv?.projects || 'Loading...'} disabled/>
              </Form.Group>
              <hr />
              <h3>Additional Personal Information</h3>
              <Form.Group className="mb-3" controlId="LanguagesControlInput">
                <Form.Label>Languages</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder={cvData?.cv?.languages || 'Loading...'} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="HobbiesControlInput">
                <Form.Label>Hobbies</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder={cvData?.cv?.hobbies || 'Loading...'} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PersonalAchievementsControlInput">
                <Form.Label>Personal Achievements</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder={cvData?.cv?.achievements || 'Loading...'} disabled/>
              </Form.Group>

        
              </Form>
            </Col>
          </Row>
     

      
    </>
  );
};

export default CVModal;
