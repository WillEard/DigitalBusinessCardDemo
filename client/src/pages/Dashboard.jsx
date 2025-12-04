// React
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// React Bootstrap
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
} from "react-bootstrap";

// Components
import Navbar from "../components/Navbar";
import CVModal from "../components/CVModal";
import Footer from "../components/Footer";
import CreateCVModal from "../components/CreateCVModal";

// Styles
import "../styles/Dashboard.css";
import "../styles/Fonts.css";

// Contexts
import { AuthContext } from "../context/AuthContext";
import { CVContext } from "../context/CVContext";

const Dashboard = () => {
  const { userData, getUserData, isLoadingUser, isLoggedIn } =
    useContext(AuthContext);
  const { cvData, getCVData, setCVData } = useContext(CVContext);

  const navigate = useNavigate();

  const [selectedCv, setSelectedCv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // useStates for CreateCVModal

  const siteURL = `www.pelagopass.com`;
  const firstName = userData?.name?.split(" ")[0] || "User";

  const handleClose = useCallback(() => setShowModal(false), [setShowModal]);
  const handleAddNewCv = useCallback(
    async (newCv) => {
      setCVData((prev) => ({
        ...prev,
        cvs: [...(prev.cvs || []), newCv],
      }));
      setShowCreateModal(false);
    },
    [setCVData, setShowCreateModal]
  );

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (userData?.username) {
      getCVData(userData.username);
    }
  }, [userData, getCVData]);

  useEffect(() => {
    if (!isLoadingUser && isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoadingUser, userData]);

  const handleCloseCreateModal = useCallback(
    () => setShowCreateModal(false),
    [setShowCreateModal]
  );
  const handleOpenCreateModal = useCallback(
    () => setShowCreateModal(true),
    [setShowCreateModal]
  );
  const handleCustomiseCard = useCallback(
    () => navigate("/customise"),
    [navigate]
  );

  const handleEditCv = useCallback((cv) => {
    setSelectedCv(cv);
    setShowModal(true);
  }, []);
  const handleVerifyEmail = useCallback(
    () => navigate("/verify-email"),
    [navigate]
  );
  const handlePayment = useCallback(() => navigate("/payment"), [navigate]);

  const handleEditCvById = useCallback(
    (cvId) => {
      const cv = cvData[0].cvs.find((c) => c._id === cvId);
      setSelectedCv(cv);
      setShowModal(true);
    },
    [cvData]
  );

  return (
    <div className="d-flex flex-column min-vh-100 dashboard-wrapper text-white">
      <div className="dashboard-overlay flex-grow-1">
        <Navbar />

        <Container className="my-3 my-md-5 pb-4">
          {/* Header Section */}
          <div className="d-flex flex-column gap-3 py-2">
            <h1 className="mb-0 fw-semibold fontNormal text-light fs-3 fs-md-1">
              Welcome back, {firstName}
            </h1>

            <div className="d-flex flex-column flex-sm-row align-items-start gap-2 gap-sm-3 text-light">
              <h3
                className={`mb-0 fs-6 ${
                  userData?.isVerified ? "text-success" : "text-danger"
                } fontCondensed`}
              >
                {userData?.isVerified ? "✓ Verified" : "⚠ Not Verified"}
              </h3>

              <span className="d-none d-sm-inline text-secondary">|</span>

              <h3 className="mb-0 fs-6 fontCondensed">
                Subscription:{" "}
                <span className="text-success fontCondensed">
                  {userData?.subscriptionType}
                </span>
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap gap-2 mt-3 mt-md-4">
            {userData?.subscriptionType === "Paid" && (
              <>
                <Button
                  variant="outline-light"
                  className="fontCondensed flex-grow-1 flex-sm-grow-0"
                  onClick={handleOpenCreateModal}
                >
                  Create New Card
                </Button>
                <Button
                  variant="outline-light"
                  className="fontCondensed flex-grow-1 flex-sm-grow-0"
                  onClick={handleCustomiseCard}
                >
                  Customise Card
                </Button>
              </>
            )}

            {userData?.subscriptionType === "Free" && (
              <Button
                variant="success"
                className="fontCondensed rounded-5 flex-grow-1 flex-sm-grow-0"
                onClick={handlePayment}
              >
                Go Premium
              </Button>
            )}

            {!userData?.isVerified && (
              <Button
                variant="primary"
                className="fontCondensed rounded-5 flex-grow-1 flex-sm-grow-0"
                onClick={handleVerifyEmail}
              >
                Verify Account
              </Button>
            )}
          </div>

          {/* Modals */}
          <CVModal
            profileUrl={
              selectedCv
                ? `${siteURL}/cv/${userData?.username}/${selectedCv._id}`
                : ""
            }
            show={showModal}
            handleClose={handleClose}
            cvItem={selectedCv}
            setCVData={setCVData}
            userData={userData}
          />

          <CreateCVModal
            show={showCreateModal}
            onHide={handleCloseCreateModal}
            onSave={handleAddNewCv}
          />

          {/* Main Content */}
          <Row className="mt-4 gy-4">
            <hr className="my-3" />

            {/* Active Cards Section - Full width on mobile, 8 cols on desktop */}
            <Col xs={12} lg={8}>
              <h4 className="mb-3 fontNormal">Active Cards</h4>
              <Row className="g-3">
                {cvData &&
                Array.isArray(cvData[0]?.cvs) &&
                cvData[0].cvs.length > 0 ? (
                  cvData[0].cvs.map((cv) => {
                    const profileUrl = `${siteURL}/cv/${userData?.username}`;
                    return (
                      <Col xs={12} sm={6} key={cv._id}>
                        <Card className="p-2 p-md-3 shadow-sm border rounded-3 h-100">
                          <Card.Body>
                            <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap gap-2">
                              <div className="flex-grow-1">
                                <h5 className="mb-1 fontCondensed fs-6">
                                  {userData?.name}
                                </h5>
                                <div className="text-muted small fontCondensed">
                                  {cv.title || "No title set"}
                                </div>
                              </div>
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(
                                  profileUrl
                                )}`}
                                alt="QR"
                                className="qr-code"
                                style={{ width: "80px", height: "80px" }}
                              />
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={() =>
                                  navigate(`/cv/${userData?.username}`)
                                }
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={() => handleEditCvById(cv._id)}
                              >
                                Edit
                              </Button>
                              <Button size="sm" variant="outline-dark">
                                Share
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-dark"
                                className="d-none d-sm-inline-block"
                              >
                                Add to Wallet
                              </Button>
                              <Button size="sm" variant="outline-danger">
                                Delete
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <Col xs={12}>
                    <p className="text-light fontCondensed">No cards yet</p>
                  </Col>
                )}
              </Row>
            </Col>

            {/* Analytics & Notifications - Full width on mobile, 4 cols on desktop */}
            <Col xs={12} lg={4}>
              <h4 className="mb-1 fontNormal">Notifications / Analytics</h4>
              <Card className="mb-3 shadow-sm analytics">
                <Card.Body>
                  <h6 className="fw-semibold fs-5 fontNormal">Analytics</h6>
                  <p className="mb-0 fontCondensed">132 Total Scans</p>
                  <p className="text-muted fontCondensed">
                    Mon 3rd – Most Active Day
                  </p>
                  <Button variant="link" className="p-0 fontCondensed">
                    View Full Analytics
                  </Button>
                </Card.Body>
              </Card>

              <Card className="shadow-sm mb-3">
                <Card.Body>
                  <h6 className="fw-semibold fs-5 fontNormal">Notifications</h6>
                  <p className="mb-0 fw-normal fs-6 fontCondensed">
                    Your card was scanned 3 times today
                  </p>
                  <p className="text-muted fw-normal fs-6 fontCondensed mb-0">
                    Find out who using{" "}
                    <span className="text-info">Premium</span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Premium Upgrade Banner */}
          {userData?.subscriptionType === "Free" && (
            <div
              className="mt-4 mt-md-5 p-3 rounded-4 bg-primary bg-opacity-25 text-light text-center fontCondensed mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <strong className="fontCondensed">
                Upgrade to{" "}
                <a
                  className="text-info fontCondensed text-decoration-underline"
                  onClick={handlePayment}
                  style={{ cursor: "pointer" }}
                >
                  Premium
                </a>
              </strong>{" "}
              for more customisation, analytics and to create multiple cards
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
