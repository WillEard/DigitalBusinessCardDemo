import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


const CVModal = ({ profileUrl }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  return (
    <>
      <Button
        className="border-0 shadow-none"
        style={{ backgroundColor: "#4CAF50" }}
        size="lg"
        onClick={handleShow}
      >
        View Digicard
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
        
      >
        <Modal.Header closeButton className="text-light border-0" style={{ backgroundColor: '#126782' }}>
          <Modal.Title className="w-100" >
            My DigiCard
            <hr className="mt-2" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-3" style={{ backgroundColor: '#E6F4EA' }}>
          <Form>
            <Row className="gy-4 gx-5">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-dark">Full Name</Form.Label>
                  <Form.Control className="p-3" placeholder="Jon Smith" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Phone Number</Form.Label>
                  <Form.Control className="p-3" placeholder="123-456-7890" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Education</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="University of XYZ" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Skills</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="JavaScript, React" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Projects</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="MyPortfolio.com" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Hobbies</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="Gaming, Hiking" disabled />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-dark">Email Address</Form.Label>
                  <Form.Control className="p-3" placeholder="JonSmith@gmail.com" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Experience</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="2 years at XYZ" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Certifications</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="AWS, PMP" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Languages</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="English, Spanish" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-dark mt-3">Personal Achievements</Form.Label>
                  <Form.Control className="p-3" as="textarea" rows={2} placeholder="Built an app used by 10K+ users" disabled />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4 pt-2" style={{ backgroundColor: '#126782' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => navigate(profileUrl.profileUrl)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CVModal;
