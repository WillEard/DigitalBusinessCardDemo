import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CVContext = createContext();

export const CVProvider = ({ children }) => {
  const { backendUrl } = useContext(AuthContext);

  const [cvData, setCVData] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);
  const [isLoadingCV, setIsLoadingCV] = useState(false);

  /**
   * Fetch CV data for a user.
   * If cvId is provided, fetch that specific CV.
   */
  const getCVData = useCallback(
    async (username, cvId = null) => {
      if (!username) return;

      setIsLoadingCV(true);
      try {
        let url = `${backendUrl}/api/cv/${username}`;
        if (cvId) url += `/${cvId}`;

        const { data } = await axios.get(url, { withCredentials: true });

        if (cvId) {
          // Single CV
          const cv = data.cv || data;
          setSelectedCV(cv);
          return cv;
        } else {
          // Multiple CVs - data.cvs is already an array
          const cvsArray = data.cvs || [];
          setCVData(cvsArray);
          return cvsArray;
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return null;
      } finally {
        setIsLoadingCV(false);
      }
    },
    [backendUrl],
  );

  /**
   * Fetch authenticated user's own CV data (for Dashboard)
   * Returns empty array if no CVs found (doesn't throw error)
   */
  const getMyCV = useCallback(async () => {
    setIsLoadingCV(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/cv/data`, {
        withCredentials: true,
      });

      const cvsArray = data.cvs || [];
      setCVData(cvsArray);
      return cvsArray;
    } catch (error) {
      // If 400+ error, set empty array instead of showing error
      if (error.response?.status >= 400) {
        setCVData([]);
        return [];
      }
      toast.error(error.response?.data?.message || error.message);
      return null;
    } finally {
      setIsLoadingCV(false);
    }
  }, [backendUrl]);

  // 🔁 Optional: clear CV data on logout or unmount
  const clearCVData = useCallback(() => {
    setCVData([]);
    setSelectedCV(null);
  }, []);

  const deleteCV = useCallback(
    async (cvId) => {
      try {
        const url = `${backendUrl}/api/cv/${cvId}`;
        const { data } = await axios.delete(url, { withCredentials: true });

        if (data.success) {
          // Remove the deleted CV from cvData
          setCVData((prev) => prev.filter((cv) => cv._id !== cvId));
          toast.success(data.message || "CV deleted successfully");
          return true;
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete CV");
        return false;
      }
    },
    [backendUrl],
  );

  const value = useMemo(
    () => ({
      cvData,
      setCVData,
      selectedCV,
      setSelectedCV,
      getCVData,
      getMyCV,
      isLoadingCV,
      clearCVData,
      deleteCV,
    }),
    [
      cvData,
      selectedCV,
      getCVData,
      getMyCV,
      isLoadingCV,
      clearCVData,
      deleteCV,
    ],
  );

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};
