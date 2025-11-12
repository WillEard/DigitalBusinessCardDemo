import React from "react";

// src/context/AuthContext.jsx
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // --- Functions ---
  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      if (data.success) setUserData(data.userData);
      else setUserData(null);
    } catch (error) {
      if (error.response?.status === 401) setUserData(null);
      else toast.error(`Error fetching user data: ${error.message}`);
    }
  }, [backendUrl]);

  const getAuthStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-Auth`, {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedIn(true);
        setUserData(data.user || (await getUserData()));
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, [backendUrl, getUserData]);

  const logout = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        googleLogout();
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, navigate]);

  const sendVerifyOTP = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/verify-email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, navigate]);

  // --- Effects ---
  useEffect(() => {
    (async () => {
      setIsLoadingUser(true);
      await getAuthStatus();
      setIsLoadingUser(false);
    })();
  }, [getAuthStatus]);

  // --- Memoized value (to prevent re-renders) ---
  const value = useMemo(
    () => ({
      backendUrl,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData,
      isLoadingUser,
      logout,
      sendVerifyOTP,
    }),
    [
      backendUrl,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData,
      isLoadingUser,
      logout,
      sendVerifyOTP,
    ]
  );

  // 3️⃣ Return provider wrapping children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
