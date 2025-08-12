// React
import { useState, useEffect, useContext } from 'react';

// App Context
import { AppContext } from '../context/AppContext';

// React Bootstrap
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

// Toast - user slide in messages
import { toast } from 'react-toastify';

// Axios for queries
import axios from 'axios';

import '../styles/Fonts.css'; // Import custom font styles

const CVModal = ({ show, handleClose, cvItem  }) => {
  const { backendUrl, userData, getCVData } = useContext(AppContext);

  // Form States
  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [projects, setProjects] = useState('');
  const [languages, setLanguages] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [achievements, setAchievements] = useState('');

  // Update form when cvItem changes (modal opened with new data)
  useEffect(() => {
    if (cvItem) {
      setTitle(cvItem.title || '');
      setPhoneNumber(cvItem.phoneNumber || '');
      setEducation(cvItem.education || '');
      setExperience(cvItem.experience || '');
      setSkills(cvItem.skills || '');
      setCertifications(cvItem.certifications || '');
      setProjects(cvItem.projects || '');
      setLanguages(cvItem.languages || '');
      setHobbies(cvItem.hobbies || '');
      setAchievements(cvItem.achievements || '');
    }
  }, [cvItem]);

  // Save changes to backend
  const handleSave = async () => {
    if (!cvItem?._id) {
      toast.error('CV item is not defined');
      return;
    }

    try {
      await axios.put(`${backendUrl}/api/cv/${userData.username}/${cvItem._id}`, {
        education,
        experience,
        skills,
        certifications,
        projects,
        languages,
        hobbies,
        achievements,
        title,
      });

      toast.success('CV updated successfully');

      // Refresh CV data after saving
      if (userData?.username) {
        await getCVData(userData.username);
      }

      handleClose(); // Close modal after save
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton className="text-light bg-dark border-0" style={{ backgroundColor: '#16182d' }}>
        <Modal.Title className="w-100 fontNormal">My Pass<hr className="mt-2" /></Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-3" style={{ backgroundColor: '#E6F4EA' }}>
        <Form>
          <Row className="gy-4 gx-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-dark fontNormal">Full Name</Form.Label>
                <Form.Control className="p-3" type="text" value={userData?.name || ''} disabled />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Phone Number</Form.Label>
                <Form.Control className="p-3" type="tel" value={userData?.phoneNumber || ''} disabled />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Title</Form.Label>
                <Form.Control as="textarea" onChange={e => setTitle(e.target.value)} rows={5} value={title} />
              </Form.Group>


              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Education</Form.Label>
                <Form.Control as="textarea" onChange={e => setEducation(e.target.value)} rows={5} value={education} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Skills</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setSkills(e.target.value)} value={skills} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Projects</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setProjects(e.target.value)} value={projects} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Hobbies</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setHobbies(e.target.value)} value={hobbies} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-dark fontNormal">Email Address</Form.Label>
                <Form.Control className="p-3" type="email" value={userData?.email || ''} disabled />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Experience</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setExperience(e.target.value)} value={experience} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Certifications</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setCertifications(e.target.value)} value={certifications} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Languages</Form.Label>
                <Form.Control as="textarea" rows={2} onChange={e => setLanguages(e.target.value)} value={languages} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Personal Achievements</Form.Label>
                <Form.Control as="textarea" rows={4} onChange={e => setAchievements(e.target.value)} value={achievements} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 px-4 pb-4 pt-2 bg-dark" style={{ backgroundColor: '#17192e' }}>
        <Button variant="secondary" className='fontCondensed' onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className='fontCondensed' onClick={handleSave}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CVModal;