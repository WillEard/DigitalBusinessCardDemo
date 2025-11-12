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
          // Multiple CVs (ensure array format)
          const cvsArray = Array.isArray(data) ? data : [data];
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
    [backendUrl]
  );

  // 🔁 Optional: clear CV data on logout or unmount
  const clearCVData = useCallback(() => {
    setCVData([]);
    setSelectedCV(null);
  }, []);

  const value = useMemo(
    () => ({
      cvData,
      setCVData,
      selectedCV,
      setSelectedCV,
      getCVData,
      isLoadingCV,
      clearCVData,
    }),
    [cvData, selectedCV, getCVData, isLoadingCV, clearCVData]
  );

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};
