import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; // to access backendUrl and userData

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { backendUrl, userData } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // ✅ Fetch all users (Admin only)
  const getAllUsers = useCallback(async () => {
    if (!userData || userData.role !== "admin") return;

    setIsLoadingUsers(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-data`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (data?.users && Array.isArray(data.users)) {
        setAllUsers(data.users);
      } else if (Array.isArray(data)) {
        setAllUsers(data);
      } else {
        setAllUsers([]);
        toast.error(data?.message || "No users found");
      }
    } catch (error) {
      console.error("getAllUsers error:", error);
      setAllUsers([]);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [backendUrl, userData]);

  // ✅ Fetch audit logs (Admin only)
  const getAuditLogs = useCallback(async () => {
    if (!userData || userData.role !== "admin") return;

    setIsLoadingLogs(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/audit-logs`, {
        withCredentials: true,
      });
      if (data.success && Array.isArray(data.logs)) {
        setAuditLogs(data.logs);
      } else {
        toast.error(data?.message || "No audit logs found");
      }
    } catch (error) {
      console.error("getAuditLogs error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoadingLogs(false);
    }
  }, [backendUrl, userData]);

  // ✅ Memoize context value
  const value = useMemo(
    () => ({
      allUsers,
      setAllUsers,
      isLoadingUsers,
      getAllUsers,
      auditLogs,
      isLoadingLogs,
      getAuditLogs,
    }),
    [
      allUsers,
      setAllUsers,
      isLoadingUsers,
      getAllUsers,
      auditLogs,
      isLoadingLogs,
      getAuditLogs,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
