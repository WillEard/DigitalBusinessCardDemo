// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResetPassword from "../components/ResetPassword";

import "../styles/Reset-pass.css"; // CSS file for background and styling

const ResetPass = () => {
  return (
    <div className="d-flex flex-column min-vh-100 resetpass-wrapper text-white">
      <div className="resetpass-overlay d-flex flex-column flex-grow-1">
        <Navbar />
        <div className="flex-grow-1 d-flex flex-column justify-content-center">
          <ResetPassword />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ResetPass;
