// React Bootstrap
import Container from "react-bootstrap/esm/Container";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// React
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

// Styles
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100 notfound-wrapper text-white">
      <div className="notfound-overlay d-flex flex-column flex-grow-1">
        <Navbar />
        <Container className="container text-sm-center p-5 bg-light mt-4 bg-light text-dark rounded text-center rounded">
          <h1 className="fontNormal">Error 404: Page not found</h1>
          <p className="fontCondensed">
            The page you were looking for does not exist.
          </p>
          <button
            onClick={handleGoHome}
            className="btn btn-primary btn-md rounded-pill fontCondensed"
          >
            Home
          </button>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
