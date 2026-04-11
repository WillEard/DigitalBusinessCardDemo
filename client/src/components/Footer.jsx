import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import "../styles/Fonts.css";
import "../styles/Footer.css";
import PelagoPassLogo from "/PelagoPassLogoWhite.svg";

const navLinks = [
  { label: "Home", hash: "home" },
  { label: "How it works", hash: "howitworks" },
  { label: "Features", hash: "features" },
  { label: "Testimonials", hash: "testimonials" },
  { label: "Pricing", hash: "pricing" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollOrNavigate = useCallback(
    (hash) => (e) => {
      e.preventDefault();
      if (window.location.pathname === "/") {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" + (hash ? `#${hash}` : ""));
      }
    },
    [navigate]
  );

  return (
    <Container fluid className="footer">
      <footer className=" footer py-3 my-4 text-center">
        <Image className="footer-logo" src={PelagoPassLogo} alt="Pelago Logo" />
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          {navLinks.map((link) => (
            <li className="nav-item" key={link.hash}>
              <a
                href={`#${link.hash}`}
                onClick={handleScrollOrNavigate(link.hash)}
                className="nav-link px-2 text-light fontCondensed"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-center text-light fontCondensed">©2025 Pelago</p>
      </footer>
    </Container>
  );
};

export default Footer;
