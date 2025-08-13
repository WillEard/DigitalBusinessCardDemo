// Components
import EmailVerification from '../components/VerifyAccount';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VerifyEmail = () => {
  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay d-flex flex-column flex-grow-1">
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
