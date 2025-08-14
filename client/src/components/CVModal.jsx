// React
import { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

// App Context
import { AppContext } from '../context/AppContext';

// React Bootstrap
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

// Toast - user slide in messages
import { toast } from 'react-toastify';

// Axios for queries
import axios from 'axios';

import '../styles/Fonts.css'; // Import custom font styles
import '../styles/CVModal.css'; // Import custom styles for CV Modal

const fields = [
  { label: 'Title', key: 'title', rows: 5 },
  { label: 'Education', key: 'education', rows: 5 },
  { label: 'Skills', key: 'skills', rows: 5 },
  { label: 'Projects', key: 'projects', rows: 5 },
  { label: 'Hobbies', key: 'hobbies', rows: 3 },
  { label: 'Experience', key: 'experience', rows: 5 },
  { label: 'Certifications', key: 'certifications', rows: 5 },
  { label: 'Languages', key: 'languages', rows: 2 },
  { label: 'Personal Achievements', key: 'achievements', rows: 4 },
];

const CVModal = ({ show, handleClose, cvItem  }) => {

  const { backendUrl, userData, getCVData } = useContext(AppContext);

  // Form States
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

  const handleChange = useCallback(
    (key) => (e) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    },
    [setFormData]
  );
  

  // Update form when cvItem changes (modal opened with new data)
  useEffect(() => {
    if (cvItem) {
      setFormData({
        title: cvItem.title || '',
        education: cvItem.education || '',
        experience: cvItem.experience || '',
        skills: cvItem.skills || '',
        certifications: cvItem.certifications || '',
        projects: cvItem.projects || '',
        languages: cvItem.languages || '',
        hobbies: cvItem.hobbies || '',
        achievements: cvItem.achievements || '',
      });
    }
  }, [cvItem]);

  // Save changes to backend
  const handleSave = useCallback(async () => {
    if (!cvItem?._id) {
      toast.error('CV item is not defined');
      return;
    }

    try {
      await axios.put(`${backendUrl}/api/cv/${userData.username}/${cvItem._id}`, formData
      );

      toast.success('CV updated successfully');

      // Refresh CV data after saving
      if (userData?.username) {
        await getCVData(userData.username);
      }

      handleClose(); // Close modal after save
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  }, [backendUrl, cvItem, formData, userData, getCVData, handleClose]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton className="text-light bg-dark border-0">
        <Modal.Title className="w-100 fontNormal">
          My Pass
          <hr className="mt-2" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-3 backgroundColour" >
        <Form>
          <Row className="gy-4 gx-5">
            <Col md={6}>
              {/* User info */}
              <Form.Group>
                <Form.Label className="text-dark fontNormal">Full Name</Form.Label>
                <Form.Control className="p-3" type="text" value={userData?.name || ''} disabled />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-dark mt-3 fontNormal">Phone Number</Form.Label>
                <Form.Control className="p-3" type="tel" value={userData?.phoneNumber || ''} disabled />
              </Form.Group>

              {/* Editable fields */}
              {fields.map((field) => (
                <Form.Group key={field.key}>
                  <Form.Label className="text-dark mt-3 fontNormal">{field.label}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={field.rows}
                    value={formData[field.key]}
                    onChange={handleChange(field.key)}
                  />
                </Form.Group>
              ))}
            </Col>

            <Col md={6}>
              {/* User email */}
              <Form.Group>
                <Form.Label className="text-dark fontNormal">Email Address</Form.Label>
                <Form.Control className="p-3" type="email" value={userData?.email || ''} disabled />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 px-4 pb-4 pt-2 bg-dark">
        <Button variant="secondary" className="fontCondensed" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="fontCondensed" onClick={handleSave}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CVModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  cvItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    phoneNumber: PropTypes.string,
    education: PropTypes.string,
    experience: PropTypes.string,
    skills: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    certifications: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    projects: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    languages: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    hobbies: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    achievements: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }),
};

export default CVModal;