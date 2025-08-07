// React
import { useState, useContext, useEffect } from 'react';

// App Context
import { AppContext } from '../context/AppContext';

// React Bootstrap
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

// Toast - user slide in messages
import { toast } from 'react-toastify';

// Axios for queries
import axios from 'axios';

const CVModal = ({ profileUrl }) => {
  const { backendUrl, userData, cvData, getCVData, isLoadingUser} = useContext(AppContext);

  // Use States
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [projects, setProjects] = useState('');
  const [languages, setLanguages] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [achievements, setAchievements] = useState('');

  const username = userData?.username; // Maybe just remove this & use userData.username

  // Open/Close Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        getCVData(username);
        setPhoneNumber(userData?.phoneNumber || '');
      }
    }, [username]);
  
    // Set CV data
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
    <>
      <Button variant="outline-light fontCondensed w-100" onClick={handleShow}>View all information</Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
        >
        <Modal.Header closeButton className="text-light bg-dark border-0" style={{ backgroundColor: '#16182d' }}>
          <Modal.Title className="w-100" >
            My Pass
            <hr className="mt-2" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-3" style={{ backgroundColor: '#E6F4EA' }}>
          <Form>
            <Row className="gy-4 gx-5">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-dark">Full Name</Form.Label>
                  <Form.Control className="p-3" type="text" value={cvData?.user?.name || ''} disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Phone Number</Form.Label>
                  <Form.Control className="p-3" type="tel" value={phoneNumber} disabled/>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Education</Form.Label>
                  <Form.Control as="textarea" onChange={e => setEducation(e.target.value)} rows={5} value={education} />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Skills</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={e => setSkills(e.target.value)}  value={skills} />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Projects</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={e => setProjects(e.target.value)}  value={projects} />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Hobbies</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={e => setHobbies(e.target.value)}  value={hobbies} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group >
                  <Form.Label className="text-dark">Email Address</Form.Label>
                  <Form.Control className="p-3" type="email" value={cvData?.user?.email || ''} disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Experience</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={e => setExperience(e.target.value)}  value={experience} />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Certifications</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={e => setCertifications(e.target.value)}  value={certifications} />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Languages</Form.Label>
                  <Form.Control as="textarea" rows={2} onChange={e => setLanguages(e.target.value)}  value={languages} />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Personal Achievements</Form.Label>
                  <Form.Control as="textarea" rows={4} onChange={e => setAchievements(e.target.value)}  value={achievements} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4 pt-2 bg-dark" style={{ backgroundColor: '#17192e' }}>
          <Button variant="secondary" className='fontCondensed' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='fontCondensed' onClick={handleSave} disabled={!userData?.username}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CVModal;
