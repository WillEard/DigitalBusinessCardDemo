import React from "react";
import { AppConfigProvider } from "./AppConfigContext";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { CVProvider } from "./CVContext";
import { AdminProvider } from "./AdminContext";

/**
 * AppContextProvider — The single root provider that wraps all other contexts.
 * This replaces the old monolithic AppContext.
 */
export const AppContextProvider = ({ children }) => {
  return (
    <AppConfigProvider>
      <AuthProvider>
        <UserProvider>
          <CVProvider>
            <AdminProvider>{children}</AdminProvider>
          </CVProvider>
        </UserProvider>
      </AuthProvider>
    </AppConfigProvider>
  );
};
