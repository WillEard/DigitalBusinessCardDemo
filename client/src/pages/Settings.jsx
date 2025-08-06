import Container from 'react-bootstrap/esm/Container';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Settings = () => {
  const { userData, isLoadingUser, updateUserSetting, isUpdatingSettings } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(null);
  const [initialized, setInitialized] = useState(false)

  // Sync checkbox state from userData when available
  useEffect(() => {
    if (userData) {
      setShowPhoneNumber(userData.showMobile);
    }
  }, [userData]);

  // Handle delete account (placeholder logic)
  const handleDelete = async () => {
    if (!password.trim()) return;

    setLoading(true);
    try {
      // TODO: Replace with real delete API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Account deleted with password:", password);
      // Optionally redirect or show success message here
    } catch (error) {
      console.error("Delete failed:", error);
      // Optionally show error message here
    } finally {
      setLoading(false);
    }
  };

  // Toggle phone number visibility setting
  const handlePhoneNumber = async (e) => {
    const newValue = e.target.checked;
    setShowPhoneNumber(newValue); // optimistic update

    try {
      await updateUserSetting('showMobile', newValue); // context handles API + DB
    } catch (err) {
      console.error('Failed to update setting', err);
      setShowPhoneNumber(!newValue); // revert if failed
    }
  };


  // USE EFFECTS

  // Redirect or warning if user not logged in (optional)
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      console.warn("Not logged in.");
      // You might want to redirect here
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

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Navbar />

        <Container className="mt-5">
          <h1 className="text-center d-flex justify-content-center mb-2 fontNormal display-4">
            Account Settings
          </h1>

          <Row className="justify-content-center py-4">
            <Col xl={6} md={8} sm={10}>
              <div className="p-4 rounded bg-dark shadow">
                {/* Password + Change Button */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Password</Form.Label>
                  <div className="d-flex">
                    <Button
                      href="/reset-pass"
                      className="bg-primary text-light px-3 fontCondensed"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: '0.375rem',
                        borderBottomLeftRadius: '0.375rem',
                      }}
                    >
                      Change
                    </Button>
                    <Form.Control
                      placeholder="*******"
                      disabled
                      className="text-muted"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: '0.375rem',
                        borderBottomRightRadius: '0.375rem',
                      }}
                    />
                  </div>
                </Form.Group>

                {/* Mobile Number */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Mobile Number</Form.Label>
                  <Form.Control value={userData?.phoneNumber || ''} disabled className="text-muted" />
                </Form.Group>

                {/* Verification Status */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Verification</Form.Label>
                  <Form.Control
                    value={userData?.isVerified ? 'Verified' : 'Not Verified'}
                    disabled
                    className={`text-${userData?.isVerified ? 'success' : 'danger'}`}
                  />
                </Form.Group>

                {/* Subscription */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Subscription</Form.Label>
                  <Form.Control value={userData?.subscriptionType} disabled />
                </Form.Group>

                {/* Show Phone Number Toggle */}
                <Form.Group className="mb-4">
                {showPhoneNumber !== null && (
  <Form.Check
    type="switch"
    id="custom-switch"
    label="Show phone number to other users (verified only)"
    checked={showPhoneNumber}
    onChange={handlePhoneNumber}
    disabled={isUpdatingSettings}
  />
)}
</Form.Group>

                {/* Delete Account */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Delete Account</Form.Label>
                  <div className="d-flex">
                    <Button
                      variant="danger"
                      className="bg-danger text-light px-3 fontCondensed shadow-none"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: "0.375rem",
                        borderBottomLeftRadius: "0.375rem",
                      }}
                      onClick={handleDelete}
                      disabled={loading || password.trim() === ""}
                      aria-disabled={loading || password.trim() === ""}
                      aria-label="Delete account"
                    >
                      {loading ? (
                        <>
                          <h2
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </Button>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password to delete account"
                      className="text-muted"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: '0.375rem',
                        borderBottomRightRadius: '0.375rem',
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Settings;