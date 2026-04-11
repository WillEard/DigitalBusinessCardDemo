// React
import { useEffect, useState, useCallback } from "react";

import { Button } from "react-bootstrap";

// Styles
import '../styles/CookieBanner.css';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = useCallback((choice) => {
    localStorage.setItem("cookieConsent", choice);
    setShowBanner(false);
  }, []);

  // Stable handlers to avoid creating new functions on every render
  const acceptCookies = useCallback(() => handleConsent("accepted"), [handleConsent]);
  const rejectCookies = useCallback(() => handleConsent("rejected"), [handleConsent]);

  if (!showBanner) return null;

  return (
    <div className="cookie-box rounded p-4">
  <p className="text-light mb-2">
    <strong className="fontNormal">This website uses cookies</strong>
  </p>
  <p className="text-light small mb-3">
    We use cookies to improve your experience. You can accept or reject non-essential cookies.
  </p>
  <div className="d-flex gap-2 justify-content-center">
    <Button
      onClick={acceptCookies}
      className="cookie-button accept"
      type="button"
    >
      Accept
    </Button>
    <Button
      onClick={rejectCookies}
      className="cookie-button reject"
      type="button"
    >
      Reject
    </Button>
  </div>
</div>
  );
}