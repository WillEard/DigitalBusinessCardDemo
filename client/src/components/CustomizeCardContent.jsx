import { useState, useContext, useCallback } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

import "../styles/Fonts.css";
import { AuthContext } from "../context/AuthContext";

export default function CustomizeCardContent({ userData }) {
  const { backendUrl } = useContext(AuthContext);

  const [customization, setCustomization] = useState({
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#667eea",
    logoUrl: "",
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field) => (e) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true);
      await axios.post(
        `${backendUrl}/api/cv/${userData.username}/customize`,
        customization
      );
      toast.success("Apple Wallet pass customization saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSaving(false);
    }
  }, [backendUrl, userData, customization]);

  return (
    <div>
      <Row className="g-4">
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fontCondensed fw-bold text-dark">
                Background Color
              </Form.Label>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="color"
                  value={customization.backgroundColor}
                  onChange={handleChange("backgroundColor")}
                  style={{ width: "80px", height: "40px" }}
                />
                <Form.Control
                  type="text"
                  value={customization.backgroundColor}
                  onChange={handleChange("backgroundColor")}
                  className="rounded-2"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fontCondensed fw-bold text-dark">
                Text Color
              </Form.Label>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="color"
                  value={customization.textColor}
                  onChange={handleChange("textColor")}
                  style={{ width: "80px", height: "40px" }}
                />
                <Form.Control
                  type="text"
                  value={customization.textColor}
                  onChange={handleChange("textColor")}
                  className="rounded-2"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fontCondensed fw-bold text-dark">
                Accent Color
              </Form.Label>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="color"
                  value={customization.accentColor}
                  onChange={handleChange("accentColor")}
                  style={{ width: "80px", height: "40px" }}
                />
                <Form.Control
                  type="text"
                  value={customization.accentColor}
                  onChange={handleChange("accentColor")}
                  className="rounded-2"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fontCondensed fw-bold text-dark">
                Logo URL
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/logo.png"
                value={customization.logoUrl}
                onChange={handleChange("logoUrl")}
                className="rounded-2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fontCondensed fw-bold text-dark">
                Card Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe your card..."
                value={customization.description}
                onChange={handleChange("description")}
                className="rounded-2"
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
              className="fontCondensed rounded-2 px-4 w-100"
            >
              {isSaving ? "Saving..." : "Save Customization"}
            </Button>
          </Form>
        </Col>

        <Col lg={6}>
          <Form.Label className="fontCondensed fw-bold text-dark mb-3 d-block">
            Pass Preview
          </Form.Label>
          <Card
            style={{
              backgroundColor: customization.backgroundColor,
              color: customization.textColor,
              borderColor: customization.accentColor,
              borderWidth: "2px",
              minHeight: "300px",
            }}
            className="p-4 d-flex flex-column justify-content-between"
          >
            {customization.logoUrl && (
              <img
                src={customization.logoUrl}
                alt="Logo"
                style={{ maxWidth: "100px", marginBottom: "1rem" }}
              />
            )}
            <div>
              <h4 className="fontNormal mb-2">{userData?.name || "Your Name"}</h4>
              <p className="fontCondensed mb-3">{customization.description}</p>
            </div>
            <div style={{ borderTop: `2px solid ${customization.accentColor}`, paddingTop: "1rem" }}>
              <small>Digital Business Card</small>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

CustomizeCardContent.propTypes = {
  userData: PropTypes.object.isRequired,
};
