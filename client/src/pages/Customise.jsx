// React
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const { userData, isLoadingUser } = useContext(AuthContext);

  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [title, setTitle] = useState("Business Title");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allowed file types
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG images are allowed!");
      return;
    }

    // Max file size (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      alert("File size must be less than 2MB!");
      return;
    }

    // Optional: validate resolution (example: max 1024x1024)
    const img = new Image();
    img.onload = () => {
      if (img.width > 1024 || img.height > 1024) {
        alert("Image resolution must be 1024x1024 or smaller!");
        return;
      }
      setImage(img.src); // valid image, update state
    };
    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Redirect or warning if user not logged in (optional)
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      console.warn("Not logged in.");
      navigate("/");
    }
  }, [isLoadingUser, userData]);

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
              <h4 className="fontNormal">Information</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Name</Form.Label>
                  <Form.Control type="text" value={userData?.name} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Email Address</Form.Label>
                  <Form.Control type="text" value={userData.email} disabled />
                </Form.Group>

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

                <Button variant="primary" className="mt-2">
                  Save
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
                  display: "flex", // make card a flex container
                  flexDirection: "column", // stack children vertically
                  justifyContent: "space-between", // push content apart
                }}
              >
                <div>
                  {image && (
                    <img
                      src={image}
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
                  <p>{title}</p>
                  <p>{userData.email}</p>
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
