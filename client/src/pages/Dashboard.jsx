// React
import { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Container, Row, Col, Button, Card, ProgressBar } from 'react-bootstrap';

// App Context
import { AppContext } from '../context/AppContext';

// Components
import Navbar from '../components/Navbar';
import CVModal from '../components/CVModal';
import Footer from '../components/Footer';
import CreateCVModal from '../components/CreateCVModal';

// Styles
import '../styles/Dashboard.css';
import '../styles/Fonts.css';


const Dashboard = () => {
  const { userData, getUserData, cvData, getCVData, setCVData, isLoadingUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedCv, setSelectedCv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // useStates for CreateCVModal

  const siteURL = `www.pelagopass.com`;
  const firstName = userData?.name?.split(' ')[0] || 'User';

  const handleClose = useCallback(() => setShowModal(false), [setShowModal]);
  const handleAddNewCv = useCallback(async(newCv) => {
    setCVData((prev) => ({
      ...prev,
      cvs: [...(prev.cvs || []), newCv],
    }));
    setShowCreateModal(false);
  }, [setCVData, setShowCreateModal]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (userData?.username) {
      getCVData(userData.username);
    }
  }, [userData, getCVData]);

  useEffect(() => {
    if (!isLoadingUser && !userData) {
      navigate('/');
    }
  }, [isLoadingUser, userData]);


  const handleCloseCreateModal = useCallback (() => setShowCreateModal(false), [setShowCreateModal]);
  const handleOpenCreateModal = useCallback(() => setShowCreateModal(true), [setShowCreateModal]);
  const handleCustomiseCard = useCallback(() => navigate('/customise'), [navigate]);

  const handleEditCv = useCallback((cv) => {setSelectedCv(cv);setShowModal(true);}, []);
  const handleVerifyEmail = useCallback(() => navigate('/verify-email'), [navigate]);
  const handlePayment = useCallback(() => navigate('/payment'), [navigate]);

  const handleEditCvById = useCallback((cvId) => {
    const cv = cvData[0].cvs.find(c => c._id === cvId);
    setSelectedCv(cv);
    setShowModal(true);
  }, [cvData]);



  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">

        <Navbar />

        <Container className="my-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 py-2">
            <h1 className="mb-0 fw-semibold fontNormal text-light">
              Welcome back, {firstName}
            </h1>

            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 text-light">
              <div>
                <h3 className={`mb-0 ${userData?.isVerified ? 'text-success' : 'text-danger'} fontCondensed`}>
                  {userData?.isVerified ? 'Verified' : 'Not Verified'}
                </h3>
              </div>

              <span className="d-none d-md-inline text-secondary">|</span>

              <div>
                <h3 className="mb-0 fontCondensed">
                  Subscription: <span className="text-success fontCondensed">{userData?.subscriptionType}</span>
                </h3>
              </div>
            </div>
          </div>
          
          <Row className="g-2 mt-4">
            {userData?.subscriptionType === "Paid" && (
              <div className="d-flex flex-wrap gap-2 justify-content-start mx-auto">
                <Col xs={5} md="auto">
                  <Button variant="outline-light" className="w-100 fontCondensed" onClick={handleOpenCreateModal}>
                    Create New Card
                  </Button>
                </Col>
                <Col xs={5} md="auto">
                  <Button variant="outline-light" className="w-100 fontCondensed" onClick={handleCustomiseCard}>
                    Customise Card
                  </Button>
                </Col>
              </div>
            )}

            {userData?.subscriptionType === "Free" && (
              <Col xs={12} md="auto">
                <Button
                  variant="success"
                  className="w-100 fontCondensed rounded-5"
                  onClick={handlePayment}
                >
                  Go premium
                </Button>
              </Col>
            )}

            
            <Col xs={12} md="auto">
              <CVModal
                profileUrl={selectedCv ? `${siteURL}/cv/${userData?.username}/${selectedCv._id}` : ''}
                show={showModal}
                handleClose={handleClose}  // <-- name it exactly as CVModal expects
                cvItem={selectedCv}
                setCVData={setCVData}
                userData={userData}
              />
            </Col>

            <Col xs={12} md="auto">
              <CreateCVModal
                show={showCreateModal}
                onHide={handleCloseCreateModal}
                onSave={handleAddNewCv}
              />
            </Col>

            {!userData?.isVerified && (
              <Col xs={12} md="auto">
                <Button
                  variant="primary"
                  className="w-100 fontCondensed rounded-5"
                  onClick={handleVerifyEmail}
                >
                  Verify Account
                </Button>
              </Col>
            )}
          </Row>

          <Row className="mt-2 gy-2 align-items-start justify-content-center">
          <hr />
            <Col md={8}>
              <h4 className="mb-2 fontNormal">Active Cards</h4>
              <Row className="g-4">
              {cvData && Array.isArray(cvData[0]?.cvs) && cvData[0].cvs.length > 0 ? (
  cvData[0].cvs.map((cv) => {
    const profileUrl = `${siteURL}/cv/${userData?.username}`;
    return (
      <Col md={6} key={cv._id}>
        <Card className="p-3 shadow-sm border rounded-3">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div>
                <h5 className="mb-1 fontCondensed">{userData?.name}</h5>
                <div className="text-muted small fontCondensed">
                  {cv.title || 'No title set'}
                </div>
              </div>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(profileUrl)}`}
                alt="QR"
              />
            </div>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <Button size="sm" variant="outline-dark" onClick={() => navigate(`/cv/${userData?.username}`)}>View</Button>
              <Button
                size="sm"
                variant="outline-dark"
                onClick={() => handleEditCvById(cv._id)}
              >
                Edit
              </Button>
              <Button size="sm" variant="outline-dark">Share</Button>
              <Button size="sm" variant="outline-dark">Add to Wallet</Button>
              <Button size="sm" variant="outline-danger">Delete</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  })
) : (
  <Col>
    <p className="text-light fontCondensed">No cards yet</p>
  </Col>
)}
              </Row>
            </Col>

            <Col md={4} className="align-self-start">
              <Card className="mb-3 shadow-sm analytics">
                <Card.Body>
                  <h6 className="fw-semibold fs-5 fontNormal">Analytics</h6>
                  <p className="mb-0 fontCondensed">132 Total Scans</p>
                  <p className="text-muted fontCondensed">Mon 3rd – Most Active Day</p>
                  <Button variant="link" className="p-0 fontCondensed">View Full Analytics</Button>
                </Card.Body>
              </Card>
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="fw-semibold fs-5 fontNormal">Notifications</h6>
                  <p className="mb-0 fw-normal fs-6 fontCondensed">
                    Your card was scanned 3 times today
                  </p>
                  <p className="text-muted fw-normal fs-6 fontCondensed">
                    Find out who using <span className="text-info">Premium</span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {userData?.subscriptionType === "Free" && (
            <div className="mt-5 p-3 rounded-5 bg-primary bg-opacity-25 text-light text-center fontCondensed w-50 mx-auto">
              <strong className='fontCondensed'>
                Upgrade to{' '}
                <a
                  className="text-info fontCondensed"
                  onClick={handlePayment}
                >
                  Premium
                </a>
              </strong>{' '}
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