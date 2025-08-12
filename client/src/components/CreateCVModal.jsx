import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { toast } from 'react-toastify';

import axios from 'axios';

import { AppContext } from '../context/AppContext';
import '../styles/Fonts.css'; // Import custom font styles


export default function CreateCVModal({ show, onHide, onSave }) {

    const { backendUrl, userData } = useContext(AppContext);


    const [title, setTitle] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [certifications, setCertifications] = useState('');
    const [projects, setProjects] = useState('');
    const [languages, setLanguages] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [achievements, setAchievements] = useState('');


  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a CV title.');
      return;
    }

    onSave({
      _id: Date.now().toString(), // simple unique id
      title,
      info,
    });

    // Clear fields after save
    setTitle('');
    setInfo('');
  };

  const handleClose = () => {
    // Reset on close as well
    setTitle('');
    setEducation('');
    setExperience('');
    setSkills('');
    setCertifications('');
    setProjects('');
    setLanguages('');
    setHobbies('');
    setAchievements('');
    onHide();
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/cv/${userData.username}/newCv`, {
        title,
        education,
        experience,
        skills,
        certifications,
        projects,
        languages,
        hobbies,
        achievements,
      });
  
      toast.success('New CV created successfully');
      
      //setCVData(prev => [...prev, response.data.cv]);    // THIS IS BROKEN

        setTitle('');
        setEducation('');
        setExperience('');
        setSkills('');
        setCertifications('');
        setProjects('');
        setLanguages('');
        setHobbies('');
        setAchievements('');
  
      handleClose(); // close modal
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Pass</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Pass Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CV title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Certifications</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Certifications"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Projects</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Projects"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Languages</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Lanaguages"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Personal Achievements</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Personal Achievements"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formCvTitle" className="mb-3">
            <Form.Label>Hobbies</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Hobbies"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}