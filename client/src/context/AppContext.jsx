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
  const [cvData, setCVData] = useState(false);

  
  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-Auth');
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        toast.error('Server Error 1: ' + data.message, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (error) {
      toast.error('Exception Error: ' + error.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      data.success
        ? setUserData(data.userData)
        : toast.error('Server Error: ' + data.message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
    } catch (error) {
      toast.error(error.message);
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

  

  useEffect(() => {
    getAuthStatus();
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
