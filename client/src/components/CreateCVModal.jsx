import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';

import { AppContext } from '../context/AppContext';
import '../styles/Fonts.css';

export default function CreateCVModal({ show, onHide, onSave }) {
  const { backendUrl, userData } = useContext(AppContext);

  const firstInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    education: '',
    experience: '',
    skills: '',
    certifications: '',
    projects: '',
    languages: '',
    hobbies: '',
    achievements: '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      education: '',
      experience: '',
      skills: '',
      certifications: '',
      projects: '',
      languages: '',
      hobbies: '',
      achievements: '',
    });
  }, [setFormData] );

  const handleClose = useCallback(() => {
    resetForm();
    onHide();
  }, [resetForm, onHide] );

  const handleCreate = useCallback(async () => {
    try {
      await axios.post(`${backendUrl}/api/cv/${userData.username}/newCv`, formData);
      toast.success('New CV created successfully');
      resetForm();
      handleClose();
      if (onSave) onSave(); // optional callback
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, [backendUrl, userData, formData, handleClose, onSave, resetForm] );

  const fields = [
    { key: 'title', label: 'Pass Title', placeholder: 'Enter CV title' },
    { key: 'education', label: 'Education', placeholder: 'Enter Education' },
    { key: 'experience', label: 'Experience', placeholder: 'Enter Experience' },
    { key: 'skills', label: 'Skills', placeholder: 'Enter Skills' },
    { key: 'certifications', label: 'Certifications', placeholder: 'Enter Certifications' },
    { key: 'projects', label: 'Projects', placeholder: 'Enter Projects' },
    { key: 'languages', label: 'Languages', placeholder: 'Enter Languages' },
    { key: 'achievements', label: 'Personal Achievements', placeholder: 'Enter Personal Achievements' },
    { key: 'hobbies', label: 'Hobbies', placeholder: 'Enter Hobbies' },
  ];

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Pass</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field, index) => (
            <Form.Group controlId={`formCv${field.key}`} className="mb-3" key={field.key}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type="text"
                placeholder={field.placeholder}
                value={formData[field.key]}
                onChange={handleChange(field.key)}
                ref={index === 0 ? firstInputRef : null}
              />
            </Form.Group>
          ))}
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

// PropTypes after component definition
CreateCVModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func, // optional
};