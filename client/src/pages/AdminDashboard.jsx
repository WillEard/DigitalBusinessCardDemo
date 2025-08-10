// React
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Container, Row, Col, Button, Table} from 'react-bootstrap';

// Toast
import { toast } from 'react-toastify';

// App Context
import { AppContext } from '../context/AppContext';

// Axios
import axios from 'axios';

// Navbar
import Navbar from '../components/Navbar';

// Styles
import '../styles/Dashboard.css'; // Import custom CSS for Navbar
import '../styles/Fonts.css'; // Import custom font styles

const AdminDashboard = () => {
  const { userData, getUserData, getAllUsers, allUsers, isLoadingUsers, setAllUsers, backendUrl, auditLogs, isLoadingLogs } = useContext(AppContext);
  const [deletingId, setDeletingId] = useState(null);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedRole, setEditedRole] = useState(""); // to track the dropdown selection

  const navigate = useNavigate();
  const firstName = userData?.name?.split(' ')[0] || 'User';

  // Delete function
  const handleDelete = async (id, username) => {
    if (userData?.username === username) {
      toast.error("You can't delete your own account");
      return;
    }

    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
  
    const prev = allUsers;
    try {
      setDeletingId(username);
      // optimistic update
      setAllUsers(allUsers.filter(u => u._id !== username));
      await axios.delete(`${backendUrl}/api/admin/all-data/${username}`, { withCredentials: true });
      toast.success('User Deleted', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
        console.error('Delete error:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
          toast.error(err.response.data?.message || 'Delete failed');
        } else if (err.request) {
          console.error('Request error:', err.request);
          toast.error('No response from server');
        } else {
          console.error('Error message:', err.message);
          toast.error('Delete failed: ' + err.message);
        }
        setAllUsers(prev); // revert
      }
    }

    // Edit handler for specific user
    const handleEdit = (userId, currentRole) => {
      setEditingUserId(userId);
      setEditedRole(currentRole);
    };

    // Save the new role selected by admin e.g.  user->admin
    const saveRoleChange = async (userId) => {
      const prev = allUsers; // save previous state

      try {
        // optimistic update
        setAllUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === userId ? { ...user, role: editedRole } : user
          )
        );

        // API call to update role on backend
        await axios.put(
          `${backendUrl}/api/admin/update-role/${userId}`,
          { role: editedRole },
          { withCredentials: true }
        );

        toast.success('User role updated successfully');

        setEditingUserId(null);
        setEditedRole('');
      } catch (err) {
        console.error('Role update error:', err);

        if (err.response) {
          toast.error(err.response.data?.message || 'Failed to update role');
        } else if (err.request) {
          toast.error('No response from server');
        } else {
          toast.error('Error: ' + err.message);
        }

        setAllUsers(prev); // revert state on failure
      }
    };

  // Redirect if user is NOT an admin
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

  // Get all users in database
  useEffect(() => {
    getUserData();
  }, []);

  //If userLoading hasnt loaded yet
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
            <Col xs={12} md="auto" className="d-flex gap-2">
              <Button variant="outline-light" className="fontCondensed" onClick={() => navigate('/admin-dash/#users')}>
                Users
              </Button>
              <Button variant="outline-light" className="fontCondensed" onClick={() => navigate('/admin-dash/#audit')}>
                Audit Logs
              </Button>
            </Col>
          </Row>

          {/* USERS TABLE */}
          <Row className="gy-4 align-items-start justify-content-center" id='users'>
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
                              <td>
                                {editingUserId === user._id ? (
                                  <select
                                    value={editedRole}
                                    onChange={(e) => setEditedRole(e.target.value)}
                                    onBlur={() => saveRoleChange(user._id)} // optional: save on blur
                                  >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                ) : (
                                  user.role
                                )}
                              </td>
                              <td>
                                <Button size="sm" variant="danger" style={{ marginRight: '8px' }} onClick={() => handleDelete(user._id, user.username)} aria-label={`Delete ${user.name}`}>
                                    Delete
                                </Button>
                                <Button size="sm" variant="primary" onClick={() => handleEdit(user._id, user.role)} aria-label={`Edit ${user.name}`}>
                                    Edit
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
          
          {/* AUDIT LOGS */}
          <Row className='gy-4 align-items-start justify-content-center mt-5' id='audit'>
              <Col xs={12}>
                  <h2 className="fontCondensed">Audit Logs</h2>
                  {isLoadingLogs ? (
                  <p>Loading audit logs...</p>
                  ) : auditLogs.length > 0 ? (
                  <Table striped bordered hover variant="dark" responsive>
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Timestamp</th>
                          <th>Admin Name</th>
                          <th>Admin Email</th>
                          <th>Action</th>
                          <th>Target User</th>
                          <th>Details</th>
                      </tr>
                      </thead>
                      <tbody className="align-middle">
                      {auditLogs.map((log, idx) => (
                          <tr key={log._id}>
                          <td>{idx + 1}</td>
                          <td>{new Date(log.timestamp).toLocaleString()}</td>
                          <td>{log.admin?.name || 'N/A'}</td>
                          <td>{log.admin?.email || 'N/A'}</td>
                          <td>{log.action}</td>
                          <td>{log.targetUser?.name || 'N/A'}</td>
                          <td>{log.details}</td>
                          </tr>
                      ))}
                      </tbody>
                  </Table>
                  ) : (
                  <p>No audit logs found</p>
                  )}
              </Col>
          </Row>
        </Container>
      </div>
</div>

  );
};

export default AdminDashboard;