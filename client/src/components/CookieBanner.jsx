// React
import { useEffect, useState } from "react";

// Styles
import '../styles/CookieBanner.css'; // <-- import the stylesheet
 
export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem("cookieConsent", choice);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="container rounded bottom-0 left-0 p-4 z-50 cookie-box mb-3">
      <p className="text-light mb-2">
        <strong className="fontNormal">This website uses cookies</strong>
      </p>
      <p className="text-light small mb-3">
        We use cookies to improve your experience. You can accept or reject non-essential cookies.
      </p>
      <div className="d-flex gap-2">
        <button
          onClick={() => handleConsent("accepted")}
          className="btn btn-light rounded-pill px-3"
          style={{ backgroundColor: '#c3e0e5', color: '#252a57' }}
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent("rejected")}
          className="btn btn-light rounded-pill px-3"
          style={{ backgroundColor: '#c3e0e5', color: '#252a57' }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}