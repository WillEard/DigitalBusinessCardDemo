// Styles
import "./styles/index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// App
import App from "./App.jsx";

// React
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

// App Context
import { AppContextProvider } from "./context/AppContext.jsx";

// Google Authentication
import { GoogleOAuthProvider } from "@react-oauth/google";

// Axios
import axios from "axios";
axios.defaults.withCredentials = true;

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
