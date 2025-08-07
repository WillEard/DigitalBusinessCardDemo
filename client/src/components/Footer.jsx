// React Bootstrap
import { Container, Image } from 'react-bootstrap';

// Styles
import '../styles/Fonts.css';
import '../styles/Footer.css'; // NEW: Import your features styles 

// PelagoPass Logo
import PelagoPassLogo from '../assets/PelagoPassLogo.svg';

const Footer = () => {
  return (
    <div className="footer py-5 mt-5 d-flex justify-content-center">
      {/* Wrapper for responsive width */}
      <div className="w-100 w-sm-50">
        <Container >
          <div className="container">
            <footer className="py-3 my-4 text-center">
              <Image className="footer-logo" src={PelagoPassLogo}></Image>
              <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-light">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-light">About</a></li>
              </ul>
              <p className="text-center text-light">©2025 Pelago</p>
            </footer>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
