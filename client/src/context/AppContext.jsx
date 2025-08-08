// React
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Toast for user messages
import { toast } from 'react-toastify';

// Axios
import axios from 'axios';

// App Context creation
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [authState, setAuthState] = useState('login');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [cvData, setCVData] = useState(false);
  const [isUpdatingSettings, setisUpdatingSettings] = useState(false);

  // For getting ALL users
  const [allUsers, setAllUsers] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // FOR handling account deletion
  
  // GET audit logs, admin backend
  const getAuditLogs = async () => {
    try {
      setIsLoadingLogs(true);
      const res = await axios.get(`${backendUrl}/api/admin/audit-logs`, { withCredentials: true });
      if (res.data.success) {
        setAuditLogs(res.data.logs);
      }
    } catch (err) {
      console.error("Failed to fetch audit logs", err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // GET auth status, whether or not they're logged in
  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-Auth`, { withCredentials: true });
  
      if (data?.success) {
        setIsLoggedIn(true);
        if (data.user) {
          setUserData(data.user);
        } else {
          await getUserData();
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        setUserData(null);
      } else {
        console.error("Auth status check failed:", error);
        toast.error('Unexpected Error: ' + error.message);
      }
    }
  };

  // GET user data e.g. username, email..
  const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data', { withCredentials: true });
    if (data.success) {
      setUserData(data.userData);
    } else {
      setUserData(null);
      toast.error('Server Error: ' + data.message);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      setUserData(null);
    } else {
      toast.error(`Unexpected Error: ${error.message}`);
    }
  }
};

  // GET cvData for a particular user
  const getCVData = async (username) => {
    if (!username) {
      console.warn('Username undefined in getCVData, skipping fetch');
      return;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/api/cv/${username}`);
      // Backend returns raw CV data (not wrapped in { success: true, cvData: ... })
      if (data) {
        setCVData(data);
      } else {
        toast.error('No CV data found');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // GET all users in database, for admin backend
  const getAllUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-data`, 
        {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
    
      // If your backend wraps users in { success, users }
      if (data && data.users && Array.isArray(data.users)) {
        setAllUsers(data.users);
      } else if (Array.isArray(data)) {
        // If backend returns the array directly
        setAllUsers(data);
      } else {
        // unexpected shape — clear and show message
        setAllUsers([]);
        toast.error(data?.message || 'No users returned');
      }
    } catch (err) {
      console.error('getAllUsers error:', err);
      setAllUsers([]); // ensure it's always an array
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Update TRUE/FALSE whether the user wants their phone number visible or not
  const updateUserSetting = async (field, value) => {
    try {
      setisUpdatingSettings(true);
  
      const res = await axios.patch(
        `${backendUrl}/api/user/settings`,
        { [field]: value },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('PATCH /api/user/settings response:', res.data);
  
      if (res.data?.success) {
        // Accept either `user` or `data` depending on backend
        const updatedUser = res.data.user || res.data.data || null;
  
        if (updatedUser && typeof updatedUser === 'object') {
          setUserData(updatedUser); // <-- persist the authoritative user object
          return updatedUser;
        }
  
        // fallback: optimistic update if backend didn't return full user
        setUserData(prev => (prev ? { ...prev, [field]: value } : prev));
        return null;
      } else {
        throw new Error(res.data?.message || 'Update failed');
      }
    } catch (err) {
      console.error(`Failed to update user setting "${field}"`, err);
      throw err;
    } finally {
      setisUpdatingSettings(false);
    }
  }

  // Verify password entered to actual password to delete account
  const verifyPassword = async (password) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/verify-password`, { password });
      return res.data.valid === true;
    } catch (err) {
      console.error("Password verification failed", err);
      toast.error(error);
      return false;
    }
  };

  // DELETE the specific account
  const handleDelete = async (password) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/user/delete-account`, {
        data: { password },
        timeout: 5000,
      });
      console.log(res.data.message);
  
      // Return success first
      return true;
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error);
      return false;
    }
  };

 // run once on mount: fetch audit logs only if admin (see second effect)
useEffect(() => {
  // noop: leave empty so we don't run admin calls before auth
}, []);

// run once on mount: check auth and set loading properly
useEffect(() => {
  let mounted = true;

  const checkAuth = async () => {
    if (!mounted) return;
    try {
      setIsLoadingUser(true);
      await getAuthStatus(); // should set userData internally
    } catch (err) {
      console.error('checkAuth error', err);
      setUserData(null);
      setIsLoggedIn(false); // ✅ add this

    } finally {
      if (mounted) setIsLoadingUser(false);
    }
  };

  checkAuth();

  return () => {
    mounted = false;
  };
}, []);

// run when userData becomes available; only fetch admin stuff when user is admin
useEffect(() => {
  let mounted = true;

  const fetchAdminResources = async () => {
    if (!mounted) return;
    try {
      // Example: getAuditLogs should be gated to admin only
      if (userData?.role === 'admin') {
        await getAuditLogs();
        // you can also load other admin endpoints here
      }
    } catch (err) {
      console.error('Failed to fetch admin resources', err);
    }
  };

  // Only run fetchAdminResources when userData is set (not while loading)
  if (userData) fetchAdminResources();

  return () => {
    mounted = false;
  };
}, [userData]);

useEffect(() => {
  if (isLoggedIn === true) {
    getUserData();
  }
}, [isLoggedIn]);


  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    cvData,
    setUserData,
    getUserData,
    getCVData,
    setCVData,
    authState,
    setAuthState,
    isLoadingUser,
    setIsLoadingUser,
    allUsers,
    getAllUsers,
    setAllUsers,
    auditLogs,
    isLoadingLogs,
    updateUserSetting,
    isUpdatingSettings,
    verifyPassword,
    handleDelete
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
