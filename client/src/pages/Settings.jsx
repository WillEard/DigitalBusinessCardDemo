// React Bootstrap
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Modal,
  Spinner,
  Card,
} from "react-bootstrap";

// React
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useCallback } from "react";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Toast
import { toast } from "react-toastify";

// Styles
import "../styles/Settings.css";
import "../styles/Fonts.css";

// Contexts
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

const Settings = () => {
  const navigate = useNavigate();

  const {
    updateUserSetting,
    isUpdatingSettings,
    verifyPassword,
    handleDelete,
  } = useContext(UserContext);

  const { userData, setUserData, setIsLoggedIn, isLoadingUser } =
    useContext(AuthContext);

  // Phone number handling
  const [showPhoneNumber, setShowPhoneNumber] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Delete Handling
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  // Sync checkbox state from userData when available
  useEffect(() => {
    if (userData) {
      setShowPhoneNumber(userData.showMobile);
    }
  }, [userData]);

  //  If password matches, show modal to confirm deletion
  const handleVerifyAndConfirm = useCallback(async () => {
    setError("");
    setVerifying(true);
    const isValid = await verifyPassword(password);
    setVerifying(false);

    if (isValid) {
      setShowConfirm(true);
    } else {
      setError("Incorrect password. Please try again.");
      toast.error("Incorrect password. Please try again.");
    }
  }, [password, verifyPassword]);

  // If password matches, call handleDelete and delete the account
  const handleConfirmDelete = useCallback(async () => {
    setDeleting(true);
    const success = await handleDelete(password);
    setDeleting(false);

    if (success) {
      setShowConfirm(false);
      setPassword("");
      setUserData(null);
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setError("Failed to delete account. Please try again.");
      toast.error("Failed to delete account. Please try again.");
    }
  }, [handleDelete, password, navigate, setUserData, setIsLoggedIn]);

  // Toggle phone number visibility setting
  const handlePhoneNumber = useCallback(
    async (e) => {
      const newValue = e.target.checked;
      setShowPhoneNumber(newValue);
      try {
        await updateUserSetting("showMobile", newValue);
        //toast.success("Privacy settings updated");
      } catch (err) {
        console.error("Failed to update setting", err);
        setShowPhoneNumber(!newValue);
        toast.error("Failed to update setting");
      }
    },
    [updateUserSetting]
  );

  // Redirect or warning if user not logged in
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      console.warn("Not logged in.");
      navigate("/");
    }
  }, [isLoadingUser, userData, navigate]);

  useEffect(() => {
    if (userData && !initialized) {
      setShowPhoneNumber(userData?.showMobile ?? false);
      setInitialized(true);
    }
  }, [userData, initialized]);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    setError("");
  }, []);

  const handleVerifyClick = useCallback(() => {
    handleVerifyAndConfirm();
  }, [handleVerifyAndConfirm]);

  const handleCloseConfirm = useCallback(() => {
    setShowConfirm(false);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 settings-wrapper text-dark">
      <Navbar />

      <div className="settings-overlay flex-grow-1">
        <Container className="py-5" style={{ maxWidth: "1200px" }}>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-light fontNormal display-4 mb-2">
              Account Settings
            </h1>
            <p className="text-light opacity-75 fontCondensed">
              Manage your account preferences and security
            </p>
          </div>

          {/* Account Information Section */}
          <div className="mb-4">
            <h3 className="text-light fontCondensed mb-3 ps-2">
              Account Information
            </h3>
            <Row className="g-4">
              {/* Password */}
              <Col lg={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-primary"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fontCondensed mb-0">Password</h5>
                        <small className="text-muted">
                          Secure your account
                        </small>
                      </div>
                    </div>
                    <Button
                      href="/reset-pass"
                      className="w-100 bg-primary border-0 fontCondensed py-2"
                    >
                      Change Password
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Mobile Number */}
              <Col lg={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-success"
                        >
                          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fontCondensed mb-0">Mobile Number</h5>
                        <small className="text-muted">
                          Contact information
                        </small>
                      </div>
                    </div>
                    <Form.Control
                      value={userData?.phoneNumber || "Not provided"}
                      disabled
                      className="border-0 fw-bold"
                    />
                  </Card.Body>
                </Card>
              </Col>

              {/* Next Payment */}
              <Col lg={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-info"
                        >
                          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fontCondensed mb-0">Next Payment</h5>
                        <small className="text-muted">Billing cycle</small>
                      </div>
                    </div>
                    <Form.Control
                      type="date"
                      value={
                        userData?.nextPaymentDate
                          ? new Date(userData.nextPaymentDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      disabled
                      className="fw-bold border-0"
                    />
                  </Card.Body>
                </Card>
              </Col>

              {/* Subscription */}
              <Col lg={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-warning"
                        >
                          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9h7V2.99c3.72 1.15 6.47 4.82 7 8.94h-7v1.06z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fontCondensed mb-0">
                          Subscription Plan
                        </h5>
                        <small className="text-muted">Current plan</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-bold text-light fs-5 bg-dark rounded px-3 py-2">
                        {userData?.subscriptionType || "Free Plan"}
                      </span>
                      {userData?.subscriptionType !== "Paid" && (
                        <Button
                          size="md"
                          variant="primary"
                          className="fontCondensed"
                        >
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Privacy & Security Section */}
          <div className="mb-4">
            <h3 className="text-light fontCondensed mb-3 ps-2">
              Privacy & Security
            </h3>
            <Row className="g-4">
              {/* Verification */}
              <Col lg={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div
                          className={`bg-${
                            userData?.isVerified ? "success" : "danger"
                          } bg-opacity-10 rounded-circle p-2 me-3`}
                        >
                          <svg
                            width="24"
                            height="24"
                            fill="currentColor"
                            className={`text-${
                              userData?.isVerified ? "success" : "danger"
                            }`}
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="fontCondensed mb-0">
                            Verification Status
                          </h5>
                          <small className="text-muted">
                            Email verification
                          </small>
                        </div>
                      </div>
                      <span
                        className={`badge bg-${
                          userData?.isVerified ? "success" : "danger"
                        } px-4 py-3 fs-6`}
                      >
                        {userData?.isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Profile Visibility */}
              <Col lg={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-secondary"
                        >
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fontCondensed mb-0">
                          Profile Visibility
                        </h5>
                        <small className="text-muted">
                          Control who can see your info
                        </small>
                      </div>
                    </div>
                    {showPhoneNumber !== null && (
                      <Form.Check
                        type="switch"
                        id="phone-visibility-switch"
                        label="Show my phone number to other users"
                        checked={showPhoneNumber}
                        onChange={handlePhoneNumber}
                        disabled={isUpdatingSettings}
                        className="mt-2"
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Danger Zone */}
          <div className="mb-5 deletion">
            <h3 className="text-danger fontCondensed mb-3 ps-2">
              Terminate Account
            </h3>
            <Card className="shadow-sm border-danger">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start mb-3">
                  <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-3 mt-1">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="text-danger"
                    >
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fontCondensed text-danger mb-1">
                      Delete Account
                    </h5>
                    <p className="text-muted small mb-3">
                      Once you delete your account, there is no going back. All
                      data associated with your account will be permanently
                      removed. Please be certain.
                    </p>
                    <div className="d-flex gap-2 flex-wrap">
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password to confirm"
                        className="flex-grow-1"
                        style={{ maxWidth: "400px" }}
                      />
                      <Button
                        variant="danger"
                        onClick={handleVerifyClick}
                        disabled={
                          verifying || deleting || password.trim() === ""
                        }
                        className="fontCondensed px-4"
                      >
                        {verifying ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Delete Account"
                        )}
                      </Button>
                    </div>
                    {error && (
                      <small className="text-danger d-block mt-2">
                        {error}
                      </small>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Confirmation Modal */}
          <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="fontCondensed">
                Confirm Account Deletion
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
              <div className="text-center mb-3">
                <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <svg
                    width="48"
                    height="48"
                    fill="currentColor"
                    className="text-danger"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>
              </div>
              <p className="text-center mb-0">
                Are you sure you want to permanently delete your account? All
                your data will be lost and this action cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                variant="light"
                onClick={handleCloseConfirm}
                disabled={deleting}
                className="fontCondensed"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="fontCondensed"
              >
                {deleting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete My Account"
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
