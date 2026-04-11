// Components
import EmailVerification from "../components/VerifyAccount";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// styles
import "../styles/Verify-email.css"; // CSS file for background and styling

const VerifyEmail = () => {
  return (
    <div className="d-flex flex-column min-vh-100 verifyemail-wrapper text-white">
      <div className="verifyemail-overlay d-flex flex-column flex-grow-1">
        <Navbar />
        <div className="flex-grow-1 d-flex flex-column justify-content-center">
          <EmailVerification />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default VerifyEmail;
