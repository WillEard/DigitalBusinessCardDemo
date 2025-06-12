import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const CVModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        My CV
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control placeholder="Jon Smith" disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control placeholder="JonSmith@gmail.com" disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="XXXXX XXX XXX" disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile</Form.Label>
            <Form.Control placeholder="Experienced in XYZ" disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Employment History</Form.Label>
            <Form.Control placeholder="Job 1
            Job 2
            Job 3" disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control placeholder="Talking, Walking.." disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Education</Form.Label>
            <Form.Control placeholder="School, College, University, Course..." disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hobbies</Form.Label>
            <Form.Control placeholder="Travelling, Learning.." disabled />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CVModal;
