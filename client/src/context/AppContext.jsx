import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [authState, setAuthState] = useState('login');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [cvData, setCVData] = useState(false);
   
  // For getting ALL users
  const [allUsers, setAllUsers] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);


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

  const getAllUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-data`, {
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


  
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoadingUser(true);
      await getAuthStatus();
      setIsLoadingUser(false);
    };
    checkAuth();
  }, []);

  // Fetch all users from admin endpoint once userData is loaded
  useEffect(() => {
    if (userData?.role === 'admin') {
    } else {
      setIsLoadingUser(false);
    }
  }, [userData]);

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
    setAllUsers
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
