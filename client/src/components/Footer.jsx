// React Bootstrap
import { Container, Image } from 'react-bootstrap';

// React
import { useNavigate } from 'react-router-dom';

// Styles
import '../styles/Fonts.css';
import '../styles/Footer.css'; // NEW: Import your features styles 

// PelagoPass Logo
import PelagoPassLogo from '../assets/PelagoPassLogo.svg';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollOrNavigate = (e, hash) => {
    e.preventDefault();

    if (window.location.pathname === '/') {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + (hash ? `#${hash}` : ''));
    }
  };

  return (
    <div className="footer py-5 mt-5 d-flex justify-content-center">
      <div className="w-100 w-sm-50">
        <Container>
          <div className="container">
            <footer className="py-3 my-4 text-center">
              <Image className="footer-logo" src={PelagoPassLogo} alt="Pelago Logo" />
              <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item">
                  <a
                    href="#home"
                    onClick={(e) => handleScrollOrNavigate(e, 'home')}
                    className="nav-link px-2 text-light fontCondensed"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#howitworks"
                    onClick={(e) => handleScrollOrNavigate(e, 'howitworks')}
                    className="nav-link px-2 text-light fontCondensed"
                  >
                    How it works
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#features"
                    onClick={(e) => handleScrollOrNavigate(e, 'features')}
                    className="nav-link px-2 text-light fontCondensed"
                  >
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#testimonials"
                    onClick={(e) => handleScrollOrNavigate(e, 'testimonials')}
                    className="nav-link px-2 text-light fontCondensed"
                  >
                    Testimonials
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#pricing"
                    onClick={(e) => handleScrollOrNavigate(e, 'pricing')}
                    className="nav-link px-2 text-light fontCondensed"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
              <p className="text-center text-light fontCondensed">©2025 Pelago</p>
            </footer>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
