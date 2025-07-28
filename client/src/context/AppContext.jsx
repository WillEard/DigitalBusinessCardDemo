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
  const [userData, setUserData] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [cvData, setCVData] = useState(false);

  
  const getAuthStatus = async () => {
    try {
      axios.defaults.withCredentials = true;
  
      const { data } = await axios.get(`${backendUrl}/api/auth/is-Auth`);
  
      if (data?.success && data?.user) {
        setIsLoggedIn(true);
        setUserData(data.user); // If backend sends user here
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
    axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data');
    if (data.success) {
      setUserData(data.userData);
    } else {
      setUserData(null);
      toast.error('Server Error: ' + data.message);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      setUserData(null);
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error(`Unexpected Error: ${error.message}`);
    }
  }
};

  const getCVData = async (username) => {
    axios.defaults.withCredentials = true;
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

  
  useEffect(() => {
    setIsLoadingUser(true);
  
    // Always check backend auth status on mount, refresh userData from backend
    getAuthStatus()
      .then((response) => {
        if (response?.data?.user) {
          setUserData(response.data.user);
          setIsLoggedIn(true);
        } else {
          setUserData(null);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error("Error checking auth status:", err);
        setUserData(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, []);

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
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
