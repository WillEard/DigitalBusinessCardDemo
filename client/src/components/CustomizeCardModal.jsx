import { useState, useContext, useCallback } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

import "../styles/Fonts.css";
import { AuthContext } from "../context/AuthContext";

export default function CustomizeCardModal({ show, onHide }) {
  const { backendUrl, userData } = useContext(AuthContext);

  const [customization, setCustomization] = useState({
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#667eea",
    fontStyle: "modern",
    layout: "standard",
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
      toast.success("Card customization saved successfully");
      onHide();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSaving(false);
    }
  }, [backendUrl, userData, customization, onHide]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 bg-light">
        <Modal.Title className="fontNormal fw-bold">
          Customize Your Card
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4 bg-light">
        <div className="row g-3">
          {/* Color Customization */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fontCondensed fw-bold">
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
          </div>

          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fontCondensed fw-bold">
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
          </div>

          {/* Accent Color */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fontCondensed fw-bold">
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
          </div>

          {/* Font Style */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fontCondensed fw-bold">
                Font Style
              </Form.Label>
              <Form.Select
                value={customization.fontStyle}
                onChange={handleChange("fontStyle")}
                className="rounded-2"
              >
                <option value="modern">Modern</option>
                <option value="elegant">Elegant</option>
                <option value="bold">Bold</option>
                <option value="minimal">Minimal</option>
              </Form.Select>
            </Form.Group>
          </div>

          {/* Layout */}
          <div className="col-12">
            <Form.Group>
              <Form.Label className="fontCondensed fw-bold">Layout</Form.Label>
              <Form.Select
                value={customization.layout}
                onChange={handleChange("layout")}
                className="rounded-2"
              >
                <option value="standard">Standard</option>
                <option value="compact">Compact</option>
                <option value="spacious">Spacious</option>
              </Form.Select>
            </Form.Group>
          </div>

          {/* Preview */}
          <div className="col-12">
            <Form.Label className="fontCondensed fw-bold">Preview</Form.Label>
            <Card
              style={{
                backgroundColor: customization.backgroundColor,
                color: customization.textColor,
                borderColor: customization.accentColor,
                borderWidth: "2px",
              }}
              className="p-4 text-center"
            >
              <h4 className="fontNormal mb-2">
                {userData?.name || "Your Name"}
              </h4>
              <p className="mb-2">Digital Business Card</p>
              <small style={{ color: customization.accentColor }}>
                Font: {customization.fontStyle} | Layout: {customization.layout}
              </small>
            </Card>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 bg-light p-4">
        <Button
          variant="secondary"
          onClick={onHide}
          className="fontCondensed rounded-2 px-4"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaving}
          className="fontCondensed rounded-2 px-4"
        >
          {isSaving ? "Saving..." : "Save Customization"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CustomizeCardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
