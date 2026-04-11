// React
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Components
import CustomiseTooltip from "../components/Customise-Tooltip";
import Navbar from "../components/Navbar";

// React Bootstrap
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  OverlayTrigger,
} from "react-bootstrap";

// Images
import QRPNG from "/QR.png";

// Icons
import { IoIosInformationCircle } from "react-icons/io";

// Styles
import "../styles/Fonts.css";
import "../styles/Customise.css";

// Contexts
import { AuthContext } from "../context/AuthContext";

export const Customise = () => {
  const navigate = useNavigate();
  const { userData, isLoadingUser, backendUrl } = useContext(AuthContext);

  // Styling state
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [image, setImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");

  // Card type and content state
  const [cardType, setCardType] = useState("resume");
  const [title, setTitle] = useState("Business Title");

  // Resume data
  const [resumeData, setResumeData] = useState({
    title: "",
    education: "",
    experience: "",
    skills: "",
  });

  // Business data
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

  // Custom data
  const [customData, setCustomData] = useState({
    heading: "My Information",
    sections: [{ title: "", content: "" }],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCV, setIsLoadingCV] = useState(false);

  // Load existing CV data on mount
  useEffect(() => {
    if (userData?.username) {
      loadCVData();
    }
  }, [userData]);

  const loadCVData = async () => {
    try {
      setIsLoadingCV(true);
      const { data } = await axios.get(
        `${backendUrl}/api/cv/${userData.username}`,
        { withCredentials: true },
      );

      if (data.success && data.cv) {
        const cv = data.cv;
        setBgColor(cv.backgroundColor || "#ffffff");
        setTextColor(cv.textColor || "#000000");
        setProfilePicture(cv.profilePicture || "");
        setCardType(cv.cardType || "resume");

        if (cv.resumeData) setResumeData(cv.resumeData);
        if (cv.businessData) setBusinessData(cv.businessData);
        if (cv.customData) setCustomData(cv.customData);
      }
    } catch (error) {
      console.error("Error loading CV data:", error);
      // Not critical - just show empty form
    } finally {
      setIsLoadingCV(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allowed file types
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG and PNG images are allowed!");
      return;
    }

    // Max file size (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      toast.error("File size must be less than 2MB!");
      return;
    }

    // Validate resolution
    const img = new Image();
    img.onload = () => {
      if (img.width > 1024 || img.height > 1024) {
        toast.error("Image resolution must be 1024x1024 or smaller!");
        return;
      }
      setImage(img.src);
      setProfilePicture(img.src);
    };
    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = {
        cardType,
        backgroundColor: bgColor,
        textColor,
        profilePicture,
        resumeData: cardType === "resume" ? resumeData : {},
        businessData: cardType === "business" ? businessData : {},
        customData: cardType === "custom" ? customData : {},
      };

      const { data } = await axios.post(`${backendUrl}/api/cv/save`, payload, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Card customization saved successfully!");
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error(
        error.response?.data?.message || "Error saving customization",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      navigate("/");
    }
  }, [isLoadingUser, userData, navigate]);

  if (isLoadingCV) {
    return (
      <div className="d-flex flex-column min-vh-100 customise-wrapper text-white">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <p>Loading your card settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 customise-wrapper text-white">
      <div className="customise-overlay flex-grow-1">
        <Navbar />

        <div className="mt-5 d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <h1 className="fontNormal mb-0 text-center">Customise your pass</h1>

          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={CustomiseTooltip}
          >
            <Button
              variant="primary"
              className="p-1 d-flex align-items-center justify-content-center"
            >
              <IoIosInformationCircle size={20} />
            </Button>
          </OverlayTrigger>
        </div>

        <Container className="my-4">
          <Row className="justify-content-center gap-4">
            <hr />
            {/* Controls */}
            <Col md={4}>
              <h4 className="fontNormal">Settings</h4>
              <Form>
                {/* Card Type Selection */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Card Type</Form.Label>
                  <Form.Select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                  >
                    <option value="resume">Resume</option>
                    <option value="business">Business Information</option>
                    <option value="custom">Custom Information</option>
                  </Form.Select>
                </Form.Group>

                {/* Basic Info (always shown) */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Name</Form.Label>
                  <Form.Control type="text" value={userData?.name} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Email Address</Form.Label>
                  <Form.Control type="email" value={userData?.email} disabled />
                </Form.Group>

                {/* Resume Fields */}
                {cardType === "resume" && (
                  <>
                    <hr />
                    <h5 className="fontNormal">Resume Information</h5>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., Software Developer"
                        value={resumeData.title}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            title: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Education</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Add your education details"
                        value={resumeData.education}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            education: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Experience</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Add your work experience"
                        value={resumeData.experience}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            experience: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Skills</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Add your skills (comma-separated)"
                        value={resumeData.skills}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            skills: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </>
                )}

                {/* Business Fields */}
                {cardType === "business" && (
                  <>
                    <hr />
                    <h5 className="fontNormal">Business Information</h5>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">
                        Company Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Company Name"
                        value={businessData.companyName}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Job Title"
                        value={businessData.jobTitle}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            jobTitle: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={businessData.phone}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Website</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://example.com"
                        value={businessData.website}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            website: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Street address"
                        value={businessData.address}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            address: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Professional biography"
                        value={businessData.bio}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            bio: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Services</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Services or products offered"
                        value={businessData.services}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            services: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </>
                )}

                {/* Custom Fields */}
                {cardType === "custom" && (
                  <>
                    <hr />
                    <h5 className="fontNormal">Custom Information</h5>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Heading</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., My Information"
                        value={customData.heading}
                        onChange={(e) =>
                          setCustomData({
                            ...customData,
                            heading: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <p className="text-muted small">
                      Add custom sections with titles and content
                    </p>
                  </>
                )}

                {/* Styling */}
                <hr />
                <h5 className="fontNormal">Styling</h5>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">
                    Background Color
                  </Form.Label>
                  <Form.Control
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Text Color</Form.Label>
                  <Form.Control
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">
                    Profile Picture
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="mt-2 w-100"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </Form>
            </Col>

            {/* Preview */}
            <Col md={4}>
              <h4 className="fontNormal">Preview</h4>
              <Card
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  padding: "20px",
                  textAlign: "center",
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {profilePicture && (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <h3>{userData?.name}</h3>

                  {cardType === "resume" && (
                    <>
                      <p>
                        <strong>{resumeData.title || "Job Title"}</strong>
                      </p>
                      {resumeData.education && <p>{resumeData.education}</p>}
                    </>
                  )}

                  {cardType === "business" && (
                    <>
                      <p>
                        <strong>{businessData.companyName || "Company"}</strong>
                      </p>
                      <p>{businessData.jobTitle || "Job Title"}</p>
                      {businessData.phone && <p>📞 {businessData.phone}</p>}
                      {businessData.website && (
                        <p>
                          🌐{" "}
                          <a
                            href={businessData.website}
                            style={{ color: textColor }}
                          >
                            {businessData.website}
                          </a>
                        </p>
                      )}
                    </>
                  )}

                  {cardType === "custom" && (
                    <>
                      <h5>{customData.heading}</h5>
                      <p>Custom sections preview</p>
                    </>
                  )}
                </div>

                <img src={QRPNG} alt="QR Code" className="block w-50 mx-auto" />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
