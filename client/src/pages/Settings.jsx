// React Bootstrap
import { Form, Row, Col, Button, Container, Modal, Spinner } from 'react-bootstrap';

// React
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useCallback } from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Toast
import { toast } from 'react-toastify';

// App Context
import { AppContext } from '../context/AppContext';



// Styles
import '../styles/Settings.css';
import '../styles/Fonts.css'; 


const Settings = () => {
  const navigate = useNavigate();

  const { userData, setUserData, setIsLoggedIn, isLoadingUser, updateUserSetting, isUpdatingSettings, verifyPassword, handleDelete } = useContext(AppContext);
  
  // Phone number handling
  const [showPhoneNumber, setShowPhoneNumber] = useState(null);
  const [initialized, setInitialized] = useState(false)

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
      toast.error(error.message, "Incorrect password. Please try again."); // Show error toast (void to avoid promise warning)
    }
  }, [password, verifyPassword, setError, error]);

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
      navigate('/');
    } else {
      setError("Failed to delete account. Please try again.");
      toast.error(error.message, "Failed to delete account. Please try again.");
    }
  }, [handleDelete, password, navigate, setUserData, setIsLoggedIn, setError, error]);

  // Toggle phone number visibility setting
  const handlePhoneNumber = useCallback(async (e) => {
    const newValue = e.target.checked;
    setShowPhoneNumber(newValue);
    try {
      await updateUserSetting('showMobile', newValue);
    } catch (err) {
      console.error('Failed to update setting', err);
      setShowPhoneNumber(!newValue);
    }
  }, [updateUserSetting]);


  // Redirect or warning if user not logged in (optional)
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      console.warn("Not logged in.");
      navigate('/');
    }
  }, [isLoadingUser, userData]);

  useEffect(() => {
    if (userData && !initialized) {
      setShowPhoneNumber(userData?.showMobile ?? false);
      setInitialized(true);
    }
  }, [userData, initialized]);
  
  useEffect(() => {
  }, [showPhoneNumber]);

  const handlePasswordChange = useCallback((e) => {setPassword(e.target.value);}, []);
  const handleVerifyClick = useCallback(() => {handleVerifyAndConfirm();}, [handleVerifyAndConfirm]);
  const handleCloseConfirm = useCallback(() => {setShowConfirm(false);}, []);
  
  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-dark">
      <div className="login-overlay flex-grow-1">
      
        <Navbar />

        <Container className="mt-5">
          <h1 className="text-center text-light d-flex justify-content-center mb-4 fontNormal display-4">
            Account Settings
          </h1>

          {/* Row 1: Password + Mobile */}
          <Row className="justify-content-center gy-4">
            {/* Password */}
            <Col lg={6} md={12}>
              <div className="p-4 rounded bg-light text-dark shadow h-100">
                <Form.Group className="mb-1">
                  <Form.Label className="fontCondensed">Password</Form.Label>
                  <div className="d-flex">
                    <Button
                      href="/reset-pass"
                      className="bg-primary text-light px-3 fontCondensed button-border"
                    >
                      Change
                    </Button>
                    <Form.Control
                      placeholder="*******"
                      disabled
                      className="text-muted button-border"
                    />
                  </div>
                  <p className="mb-0 text-muted small">Change your account password</p>
                </Form.Group>
              </div>
            </Col>

            {/* Mobile Number */}
            <Col lg={6} md={12}>
              <div className="p-4 rounded bg-light text-dark shadow h-100">
                <Form.Group className="mb-1">
                  <Form.Label className="fontCondensed">Mobile Number</Form.Label>
                  <Form.Control
                    value={userData?.phoneNumber || ""}
                    disabled
                    className="text-muted button-border"
                  />
                  <p className="mb-0 text-muted small">Your registered mobile number</p>
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Row 2: Verification + Subscription */}
          <Row className="justify-content-center gy-4 mt-3">
            {/* Verification */}
            <Col lg={6} md={12}>
              <div className="p-4 rounded bg-light text-dark shadow h-100">
                <Form.Group className="mb-1">
                  <Form.Label className="fontCondensed">Verification</Form.Label>
                  <Form.Control
                    value={userData?.isVerified ? "Verified" : "Not Verified"}
                    disabled
                    className={`text-${userData?.isVerified ? "success" : "danger"} button-border`}
                  />
                  <p className="mb-0 text-muted small">
                    {userData?.isVerified
                      ? "Your email is verified"
                      : "Your account is not yet verified"}
                  </p>
                </Form.Group>
              </div>
            </Col>

            {/* Subscription */}
            <Col lg={6} md={12}>
              <div className="p-4 rounded bg-light text-dark shadow h-100">
                <Form.Group className="mb-1">
                  <Form.Label className="fontCondensed">Subscription</Form.Label>
                  <Form.Control
                    value={userData?.subscriptionType || "Free"}
                    disabled
                    className="text-muted button-border"
                  />
                  <p className="mb-0 text-muted small">
                    Your current subscription plan
                  </p>
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Row 3: Visibility + Delete */}
          <Row className="justify-content-center gy-4 mt-3">
            {/* Show Phone Number Toggle */}
            <Col lg={6} md={12}>
              <div className="p-4 rounded bg-light text-dark shadow h-100">
                <Form.Group className="mb-1">
                  <Form.Label className="fontCondensed">Profile Visibility</Form.Label>
                  {showPhoneNumber !== null && (
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Show my phone number to other users"
                      checked={showPhoneNumber}
                      onChange={handlePhoneNumber}
                      disabled={isUpdatingSettings}
                      className="mb-1"
                    />
                  )}
                  <p className="mb-0 text-muted small">
                    Control whether your phone number is visible to other users
                  </p>
                </Form.Group>
              </div>
            </Col>

            {/* Delete Account */}
            <Col lg={6} md={12}>
              <div className="p-4 rounded bg-light text-dark shadow border border-danger h-100">
                <Form.Group className="mb-1">
                  <Form.Label className="fontCondensed text-danger">
                    Delete Account
                  </Form.Label>
                  <div className="d-flex">
                    <Button
                      variant="danger"
                      className="bg-danger text-light px-3 fontCondensed shadow-none button-border"
                      onClick={handleVerifyClick}
                      disabled={verifying || deleting || password.trim() === ""}
                      aria-label="Delete account"
                    >
                      {verifying ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Delete"
                      )}
                    </Button>

                    <Form.Control
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter password to delete account"
                      className="text-muted button-border"
                    />
                  </div>
                  <p className="mb-0 text-muted small">
                    Permanently delete your account and all associated data
                  </p>

                  <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Account Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to permanently delete your account? This
                      action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseConfirm}
                        disabled={deleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={handleConfirmDelete}
                        disabled={deleting}
                      >
                        {deleting ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Yes, Delete"
                        )}
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Form.Group>
              </div>
            </Col>
          </Row>
      </Container>
      
      </div>
      <Footer />
    </div>
  );
};

export default Settings;