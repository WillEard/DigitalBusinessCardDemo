// React
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// React Bootstrap
import { Container, Row, Col, Button, Card, Nav } from "react-bootstrap";

// Components
import Navbar from "../components/Navbar";
import CVModal from "../components/CVModal";
import Footer from "../components/Footer";
import CreateCVModal from "../components/CreateCVModal";
import CustomizeCardContent from "../components/CustomizeCardContent";

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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeSection, setActiveSection] = useState("cards");

  const siteURL = `www.pelagopass.com`;
  const firstName = userData?.name?.split(" ")[0] || "User";

  const handleClose = useCallback(() => setShowModal(false), []);
  const handleAddNewCv = useCallback(
    async (newCv) => {
      setCVData((prev) => ({
        ...prev,
        cvs: [...(prev.cvs || []), newCv],
      }));
      setShowCreateModal(false);
    },
    [setCVData]
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
  }, [isLoadingUser, userData, navigate]);

  const handleCloseCreateModal = useCallback(
    () => setShowCreateModal(false),
    []
  );
  const handleOpenCreateModal = useCallback(() => setShowCreateModal(true), []);
  const handleCustomiseCard = useCallback(
    () => setActiveSection("customize"),
    []
  );

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
      <Navbar />

      <div className="dashboard-overlay flex-grow-1">
        <Container fluid className="py-3">
          <Row className="h-100 g-0">
            {/* Sidebar */}
            <Col xs={12} md={3} className="dashboard-sidebar">
              <div className="mb-4">
                <h5 className="text-light fontNormal mb-3">Welcome</h5>
                <p className="text-light fs-6 fontCondensed">{firstName}</p>
                <div className="d-flex flex-column gap-2 mb-3">
                  <span
                    className={`badge fs-6 fontCondensed ${
                      userData?.isVerified ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {userData?.isVerified ? "✓ Verified" : "⚠ Not Verified"}
                  </span>
                  <span className="badge bg-info fs-6 fontCondensed">
                    {userData?.subscriptionType}
                  </span>
                </div>
              </div>

              <Nav className="flex-column gap-2">
                <Nav.Link
                  onClick={() => setActiveSection("cards")}
                  className={`fontCondensed ${
                    activeSection === "cards" ? "active" : ""
                  }`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 8H4V4h16m0 14H4c-1.1 0-2-.9-2-2v-4h20v4c0 1.1-.9 2-2 2zm0-6H4V8h16v8z" />
                    </svg>
                    Active Cards
                  </div>
                </Nav.Link>

                <Nav.Link
                  onClick={() => setActiveSection("analytics")}
                  className={`fontCondensed ${
                    activeSection === "analytics" ? "active" : ""
                  }`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                    </svg>
                    Analytics
                  </div>
                </Nav.Link>

                {userData?.subscriptionType === "Paid" && (
                  <>
                    <div className="mt-3 pt-3 border-top border-secondary">
                      <Nav.Link
                        onClick={handleOpenCreateModal}
                        className="fontCondensed bg-success bg-opacity-25 rounded-2"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                          </svg>
                          Create New Card
                        </div>
                      </Nav.Link>
                    </div>

                    <Nav.Link
                      onClick={handleCustomiseCard}
                      className={`fontCondensed ${
                        activeSection === "customize" ? "active" : ""
                      }`}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.1.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.1-.62l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                        </svg>
                        Customize Card
                      </div>
                    </Nav.Link>
                  </>
                )}

                {userData?.subscriptionType === "Free" && (
                  <div className="mt-3 pt-3 border-top border-secondary">
                    <Button
                      variant="success"
                      className="w-100 fontCondensed rounded-2"
                      onClick={handlePayment}
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                )}

                {!userData?.isVerified && (
                  <Button
                    variant="primary"
                    className="w-100 fontCondensed rounded-2 mt-2"
                    onClick={handleVerifyEmail}
                  >
                    Verify Account
                  </Button>
                )}
              </Nav>
            </Col>

            {/* Content */}
            <Col xs={12} md={9} className="dashboard-content">
              {/* Active Cards Section */}
              {activeSection === "cards" && (
                <div className="dashboard-section">
                  <h2 className="text-light fontNormal mb-4">Active Cards</h2>
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
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                    }}
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
                </div>
              )}

              {/* Analytics Section */}
              {activeSection === "analytics" && (
                <div className="dashboard-section">
                  <h2 className="text-light fontNormal mb-4">
                    Analytics & Notifications
                  </h2>

                  <Row className="g-3">
                    <Col xs={12} md={6}>
                      <Card className="shadow-sm analytics h-100">
                        <Card.Body>
                          <h6 className="fw-semibold fs-5 fontNormal">
                            Total Scans
                          </h6>
                          <h3 className="text-primary fontNormal">132</h3>
                          <p className="text-muted fontCondensed mb-0">
                            Mon 3rd – Most Active Day
                          </p>
                          <Button variant="link" className="p-0 fontCondensed">
                            View Full Analytics
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col xs={12} md={6}>
                      <Card className="shadow-sm h-100">
                        <Card.Body>
                          <h6 className="fw-semibold fs-5 fontNormal">
                            Notifications
                          </h6>
                          <p className="mb-2 fw-normal fs-6 fontCondensed">
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

                  {userData?.subscriptionType === "Free" && (
                    <div className="mt-4 p-3 rounded-4 bg-primary bg-opacity-25 text-light text-center fontCondensed">
                      <strong className="fontCondensed">
                        Upgrade to{" "}
                        <span
                          className="text-info fontCondensed text-decoration-underline"
                          onClick={handlePayment}
                          style={{ cursor: "pointer" }}
                        >
                          Premium
                        </span>
                      </strong>{" "}
                      for detailed analytics and scan tracking
                    </div>
                  )}
                </div>
              )}

              {/* Customize Card Section */}
              {activeSection === "customize" && (
                <div className="dashboard-section">
                  <h2 className="text-light fontNormal mb-4">
                    Customize Apple Wallet Pass
                  </h2>
                  <CustomizeCardContent userData={userData} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />

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
    </div>
  );
};

export default Dashboard;
