// React
import { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Toast for user messages
import { toast } from 'react-toastify';

// Axios
import axios from 'axios';

// Google Logout Authentication
import { googleLogout } from '@react-oauth/google';

import { useNavigate } from 'react-router-dom';


// App Context creation
export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const navigate = useNavigate(); 

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

  // For CVs by Id
  const [selectedCV, setSelectedCV] = useState(null);

  
   // GET user data e.g. username, email..
  const getUserData = useCallback(async () => {
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
  }, [backendUrl]);

  // GET auth status, whether or not they're logged in
  const getAuthStatus = useCallback(async () => {
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
  }, [backendUrl, getUserData]);

  // GET audit logs, admin backend
  const getAuditLogs = useCallback(async () => {
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
  }, [backendUrl]);

  

  // GET cvData for a particular user
  const getCVData = useCallback(async (username, cvId = null) => {
    if (!username) return;
  
    try {
      let url = `${backendUrl}/api/cv/${username}`;
      if (cvId) url += `/${cvId}`;
  
      const { data } = await axios.get(url);
  
      if (cvId) {
        setSelectedCV(data.cv || data);
        return data.cv || data;
      } else {
        const cvsArray = Array.isArray(data) ? data : [data];
        setCVData(cvsArray);
        return cvsArray;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, [backendUrl]);



  // GET all users in database, for admin backend
  const getAllUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-data`, 
        {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (data && data.users && Array.isArray(data.users)) {
        setAllUsers(data.users);
      } else if (Array.isArray(data)) {
        setAllUsers(data);
      } else {
        setAllUsers([]);
        toast.error(data?.message || 'No users returned');
      }
    } catch (err) {
      console.error('getAllUsers error:', err);
      setAllUsers([]);
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch users');
    } finally {
      setIsLoadingUsers(false);
    }
  }, [backendUrl]);

  // Update TRUE/FALSE whether the user wants their phone number visible or not
  const updateUserSetting = useCallback(async (field, value) => {
    try {
      setisUpdatingSettings(true);
      const res = await axios.patch(
        `${backendUrl}/api/user/settings`,
        { [field]: value },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
  
      if (res.data?.success) {
        const updatedUser = res.data.user || res.data.data || null;
        if (updatedUser && typeof updatedUser === 'object') {
          setUserData(updatedUser);
          return updatedUser;
        }
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
  }, [backendUrl]);

  // Verify password entered to actual password to delete account
  const verifyPassword = useCallback(async (password) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/verify-password`, { password });
      return res.data.valid === true;
    } catch (err) {
      console.error("Password verification failed", err);
      toast.error(err.response?.data?.message || err.message || "Password verification failed");
      return false;
    }
  }, [backendUrl]);

  // DELETE Called from users Settings page
  const handleDelete = useCallback(async (password) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/user/delete-account`, {
        data: { password },
        timeout: 5000,
      });
      setIsLoggedIn(false);
      setUserData(null);
      console.log(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.message || error);
      return false;
    }
  }, [backendUrl]);

  // Send email OTP code to verify user
  const sendVerifyOTP = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
  
      if (data.success) {
        navigate('/verify-email');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, navigate]);

  // Logout method
  const logout = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        googleLogout();
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, navigate]);

  // run once on mount: fetch audit logs only if admin (see second effect)
  useEffect(() => {
    // noop: leave empty so we don't run admin calls before auth
  }, []);

  // check auth once on mount
  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      if (!mounted) return;
      try {
        setIsLoadingUser(true);
        await getAuthStatus(); // sets userData internally
      } catch (err) {
        console.error('checkAuth error', err);
        setUserData(null);
        setIsLoggedIn(false);
      } finally {
        if (mounted) setIsLoadingUser(false);
      }
    };
    checkAuth();
    return () => { mounted = false; }
  }, [getUserData, getAuthStatus]);

  // run when userData becomes available; only fetch admin stuff when user is admin
  useEffect(() => {
    if (!userData) return;

    let mounted = true;
    const fetchAdminResources = async () => {
      if (!mounted) return;
      try {
        if (userData?.role === 'admin') {
          await getAuditLogs();
        }
      } catch (err) {
        console.error('Failed to fetch admin resources', err);
      }
    };

    fetchAdminResources();

    return () => { mounted = false; }
  }, [userData, getAuditLogs]);

  useEffect(() => {
    let mounted = true;
    if (isLoggedIn === true) {
      const fetchUser = async () => {
        if (!mounted) return;
        await getUserData();
      };
      fetchUser();
    }
    return () => { mounted = false; }
  }, [isLoggedIn, getUserData]);


  const value = useMemo(() => ({
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
    isLoadingUsers,
    setIsLoadingUser,
    allUsers,
    getAllUsers,
    setAllUsers,
    auditLogs,
    isLoadingLogs,
    updateUserSetting,
    isUpdatingSettings,
    verifyPassword,
    handleDelete,
    logout,
    sendVerifyOTP,
    selectedCV,
    setSelectedCV
  }), [
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
    isLoadingUsers,
    setIsLoadingUser,
    allUsers,
    getAllUsers,
    setAllUsers,
    auditLogs,
    isLoadingLogs,
    updateUserSetting,
    isUpdatingSettings,
    verifyPassword,
    handleDelete,
    logout,
    sendVerifyOTP,
    selectedCV,
    setSelectedCV
  ]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
