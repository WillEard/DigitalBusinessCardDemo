import { useState, useContext, useCallback, useRef, useEffect } from "react";
import { Modal, Button, Form, Nav, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

import "../styles/Fonts.css";
import "../styles/CreateCVModal.css";
import { AuthContext } from "../context/AuthContext";

export default function CreateCVModal({ show, onHide, onSave }) {
  const { backendUrl, userData } = useContext(AuthContext);

  const firstInputRef = useRef(null);

  const [mode, setMode] = useState("resume");
  const [formData, setFormData] = useState({
    title: "",
    education: "",
    experience: "",
    skills: "",
    certifications: "",
    projects: "",
    languages: "",
    hobbies: "",
    achievements: "",
  });

  const [businessData, setBusinessData] = useState({
    companyName: "",
    jobTitle: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    bio: "",
    services: "",
  });

  const [customText, setCustomText] = useState("");
  const [customFields, setCustomFields] = useState([]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBusinessChange = (field) => (e) => {
    setBusinessData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      education: "",
      experience: "",
      skills: "",
      certifications: "",
      projects: "",
      languages: "",
      hobbies: "",
      achievements: "",
    });
    setBusinessData({
      companyName: "",
      jobTitle: "",
      phone: "",
      email: "",
      website: "",
      address: "",
      bio: "",
      services: "",
    });
    setCustomText("");
    setCustomFields([]);
    setMode("resume");
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onHide();
  }, [resetForm, onHide]);

  const handleCreate = useCallback(async () => {
    try {
      let dataToSend = {};

      if (mode === "resume") {
        dataToSend = {
          cardType: "resume",
          ...formData,
          customFields: customFields.filter((f) => f.fieldName.trim()),
        };
      } else if (mode === "business") {
        dataToSend = {
          cardType: "business",
          title: businessData.companyName || "Business Card",
          businessData: businessData,
          customFields: customFields.filter((f) => f.fieldName.trim()),
        };
      } else if (mode === "custom") {
        dataToSend = {
          cardType: "custom",
          title: formData.title || "Custom Pass",
          customData: {
            heading: formData.title || "Custom Pass",
            sections: [
              {
                title: "Content",
                content: customText,
                order: 0,
              },
            ],
          },
          customFields: customFields.filter((f) => f.fieldName.trim()),
        };
      }

      await axios.post(`${backendUrl}/api/cv/save`, dataToSend, {
        withCredentials: true,
      });
      toast.success("New Pass created successfully");
      resetForm();
      handleClose();
      if (onSave) onSave();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, [
    backendUrl,
    formData,
    businessData,
    customText,
    mode,
    handleClose,
    onSave,
    resetForm,
  ]);

  const resumeFields = [
    { key: "title", label: "Pass Title", placeholder: "Enter pass title" },
    { key: "education", label: "Education", placeholder: "Enter Education" },
    { key: "experience", label: "Experience", placeholder: "Enter Experience" },
    { key: "skills", label: "Skills", placeholder: "Enter Skills" },
    {
      key: "certifications",
      label: "Certifications",
      placeholder: "Enter Certifications",
    },
    { key: "projects", label: "Projects", placeholder: "Enter Projects" },
    { key: "languages", label: "Languages", placeholder: "Enter Languages" },
    {
      key: "achievements",
      label: "Personal Achievements",
      placeholder: "Enter Personal Achievements",
    },
    { key: "hobbies", label: "Hobbies", placeholder: "Enter Hobbies" },
  ];

  useEffect(() => {
    if (show && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      dialogClassName="create-cv-modal"
    >
      <Modal.Header closeButton className="border-0 bg-light">
        <Modal.Title className="fontNormal fw-bold">
          Create New Digital Pass
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4 bg-light">
        {/* Tab Navigation */}
        <Tab.Container activeKey={mode} onSelect={(k) => setMode(k)}>
          <Nav variant="pills" className="mb-4 gap-2">
            <Nav.Item>
              <Nav.Link
                eventKey="resume"
                className="fontCondensed rounded-pill px-4"
                style={{
                  backgroundColor: mode === "resume" ? "#667eea" : "#e9ecef",
                  color: mode === "resume" ? "white" : "#495057",
                  border: "none",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="me-2"
                  style={{ display: "inline" }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                </svg>
                Resume Format
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="business"
                className="fontCondensed rounded-pill px-4"
                style={{
                  backgroundColor: mode === "business" ? "#667eea" : "#e9ecef",
                  color: mode === "business" ? "white" : "#495057",
                  border: "none",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="me-2"
                  style={{ display: "inline" }}
                >
                  <path d="M20 8h-3V4H7v4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-3-2v2h-4V6h4z" />
                </svg>
                Business Card
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="custom"
                className="fontCondensed rounded-pill px-4"
                style={{
                  backgroundColor: mode === "custom" ? "#667eea" : "#e9ecef",
                  color: mode === "custom" ? "white" : "#495057",
                  border: "none",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="me-2"
                  style={{ display: "inline" }}
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                </svg>
                Custom Text
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Resume Tab */}
            <Tab.Pane eventKey="resume">
              <Form className="resume-form">
                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Pass Title *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={formData.title}
                    onChange={handleChange("title")}
                    ref={firstInputRef}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Education
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="University, Degree, Year..."
                    value={formData.education}
                    onChange={handleChange("education")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Experience
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Job title, Company, Duration..."
                    value={formData.experience}
                    onChange={handleChange("experience")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Skills
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Separate skills with commas"
                    value={formData.skills}
                    onChange={handleChange("skills")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Certifications
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Certificate name, issuer, date..."
                    value={formData.certifications}
                    onChange={handleChange("certifications")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Projects
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Project name, description..."
                    value={formData.projects}
                    onChange={handleChange("projects")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Languages
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., English, Spanish, French"
                    value={formData.languages}
                    onChange={handleChange("languages")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Achievements
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Awards, recognitions..."
                    value={formData.achievements}
                    onChange={handleChange("achievements")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Hobbies
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Photography, Gaming, Reading"
                    value={formData.hobbies}
                    onChange={handleChange("hobbies")}
                    className="rounded-2"
                  />
                </Form.Group>
              </Form>
            </Tab.Pane>

            {/* Business Card Tab */}
            <Tab.Pane eventKey="business">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Company Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={businessData.companyName}
                    onChange={handleBusinessChange("companyName")}
                    ref={firstInputRef}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Job Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    value={businessData.jobTitle}
                    onChange={handleBusinessChange("jobTitle")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your.email@company.com"
                    value={businessData.email}
                    onChange={handleBusinessChange("email")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Phone
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="123-456-7890"
                    value={businessData.phone}
                    onChange={handleBusinessChange("phone")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Website
                  </Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={businessData.website}
                    onChange={handleBusinessChange("website")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123 Business St, City, State"
                    value={businessData.address}
                    onChange={handleBusinessChange("address")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Brief description about your business or role"
                    value={businessData.bio}
                    onChange={handleBusinessChange("bio")}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Services
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="List your services or offerings"
                    value={businessData.services}
                    onChange={handleBusinessChange("services")}
                    className="rounded-2"
                  />
                </Form.Group>
              </Form>
            </Tab.Pane>

            {/* Custom Text Tab */}
            <Tab.Pane eventKey="custom">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fontCondensed fw-bold">
                    Pass Title *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., My Digital Pass"
                    value={formData.title}
                    onChange={handleChange("title")}
                    ref={firstInputRef}
                    className="rounded-2"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="fontCondensed fw-bold">
                    Custom Content *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Enter your custom text, bio, or any content you want to display on your digital pass..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="rounded-2"
                  />
                  <Form.Text className="text-muted fontCondensed">
                    You can format your text with line breaks and spacing
                  </Form.Text>
                </Form.Group>

                <hr />
                <h6 className="fontNormal mb-3">
                  Add Custom Fields (Optional)
                </h6>
                <p className="text-muted small mb-3">
                  Add any custom fields you want to display on your card (e.g.,
                  Languages, Certifications)
                </p>

                {customFields.map((field, index) => (
                  <div key={index} className="mb-3 p-2 border rounded bg-light">
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Field name (e.g., Languages)"
                        value={field.fieldName}
                        onChange={(e) => {
                          const updatedFields = [...customFields];
                          updatedFields[index].fieldName = e.target.value;
                          setCustomFields(updatedFields);
                        }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Field value (e.g., English, Spanish)"
                        value={field.fieldValue}
                        onChange={(e) => {
                          const updatedFields = [...customFields];
                          updatedFields[index].fieldValue = e.target.value;
                          setCustomFields(updatedFields);
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setCustomFields(
                            customFields.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setCustomFields([
                      ...customFields,
                      {
                        fieldName: "",
                        fieldValue: "",
                        order: customFields.length,
                      },
                    ]);
                  }}
                >
                  + Add Field
                </button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer className="border-0 bg-light p-4">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="fontCondensed rounded-2 px-4"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCreate}
          className="fontCondensed rounded-2 px-4"
        >
          Create Pass
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CreateCVModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};
