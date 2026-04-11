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

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { backendUrl, userData, setUserData, setIsLoggedIn } =
    useContext(AuthContext);

  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  // ✅ Update a user setting (e.g. visibility, preferences)
  const updateUserSetting = useCallback(
    async (field, value) => {
      try {
        setIsUpdatingSettings(true);
        const res = await axios.patch(
          `${backendUrl}/api/user/settings`,
          { [field]: value },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data?.success) {
          const updatedUser = res.data.user || res.data.data;
          if (updatedUser && typeof updatedUser === "object") {
            setUserData(updatedUser);
            toast.success("Settings updated");
            return updatedUser;
          }
          // fallback local update
          setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
        } else {
          throw new Error(res.data?.message || "Update failed");
        }
      } catch (err) {
        console.error(`Failed to update user setting "${field}"`, err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
      } finally {
        setIsUpdatingSettings(false);
      }
    },
    [backendUrl, setUserData]
  );

  // ✅ Verify password before sensitive actions
  const verifyPassword = useCallback(
    async (password) => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/auth/verify-password`,
          { password },
          { withCredentials: true }
        );
        return res.data.valid === true;
      } catch (err) {
        console.error("Password verification failed", err);
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Password verification failed"
        );
        return false;
      }
    },
    [backendUrl]
  );

  // ✅ Handle account deletion
  const handleDelete = useCallback(
    async (password) => {
      try {
        const res = await axios.delete(
          `${backendUrl}/api/user/delete-account`,
          {
            data: { password },
            withCredentials: true,
            timeout: 5000,
          }
        );

        if (res.data?.success) {
          setIsLoggedIn(false);
          setUserData(null);
          toast.success("Account deleted successfully");
          return true;
        } else {
          toast.error(res.data?.message || "Failed to delete account");
          return false;
        }
      } catch (error) {
        console.error("handleDelete error", error);
        toast.error(error.response?.data?.message || error.message);
        return false;
      }
    },
    [backendUrl, setUserData, setIsLoggedIn]
  );

  // ✅ (Optional) reload user data
  const reloadUserData = useCallback(async (getUserDataFn) => {
    if (!getUserDataFn) return;
    setIsLoadingUser(true);
    try {
      await getUserDataFn();
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      userData,
      setUserData,
      isLoadingUser,
      isUpdatingSettings,
      updateUserSetting,
      verifyPassword,
      handleDelete,
      reloadUserData,
    }),
    [
      userData,
      isLoadingUser,
      isUpdatingSettings,
      updateUserSetting,
      verifyPassword,
      handleDelete,
      reloadUserData,
      setUserData,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
