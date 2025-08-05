import { useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ProgressBar, Nav, Dropdown, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

import Navbar from '../components/Navbar';

import '../Dashboard.css'; // Import custom CSS for Navbar
import '../Fonts.css'; // Import custom font styles

const Dashboard = () => {
  const { userData, getUserData, getAllUsers, allUsers, isLoadingUsers } = useContext(AppContext);
  const navigate = useNavigate();
  const firstName = userData?.name?.split(' ')[0] || 'User';

  

  useEffect(() => {
    // Once we know who the user is
    if (userData) {
      if (userData.role !== 'admin') {
        toast.error('Not Authorised');
        navigate('/');
      } else {
        getAllUsers();
      }
    }
  }, [userData]);

  useEffect(() => {
    getUserData();
  }, []);


  if (isLoadingUsers) return <p>Loading...</p>;


  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
        <div className="login-overlay flex-grow-1">

        <Navbar />

        <Container className="my-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                <h1 className="mb-1 fw-semibold fontNormal">Admin Dashboard: Welcome back, {firstName}</h1>
            </div>
        
            <Row className="mb-4 g-2 mt-4">
                <Col xs={12} md="auto">
                    <Button variant="outline-light" className="w-100 fontCondensed">Create new admin</Button>
                </Col>
            </Row>
            <Row className="gy-4 align-items-start justify-content-center">
                <Col xs={12}>
                <h2 className='fontCondensed'>Users</h2>
                    <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Verified</th>
                        <th>Subscription Type</th>
                        <th>Role</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
  {Array.isArray(allUsers) && allUsers.length > 0 ? (
    allUsers.map((user, idx) => (
      <tr key={user._id || idx}>
        <td>{idx + 1}</td>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.verified ? "Yes" : "No"}</td>
        <td>{user.subscriptionType}</td>
        <td>{user.role}</td>
        <td>
          <Button size="sm" variant="danger" onClick={() => deleteUser(user._id)}>
            Delete
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" className="text-center">
        No users
      </td>
    </tr>
  )}
</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
      </div>
</div>

  );
};

export default Dashboard;