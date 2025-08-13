// Styles
import '../styles/Banner.css';

import PropTypes from 'prop-types';

const Banner = ({ message = "Use code 'Conserve' for 5% off your first month", onClose }) => {
  return (
    <div className="alert-banner text-center text-white px-3 py-2 d-flex justify-content-center align-items-center">
      <span>{message}</span>
      {onClose && (
        <button className="btn btn-sm btn-light ms-3 py-0 px-2" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

Banner.propTypes = {
  message: PropTypes.string,        // message should be a string
  onClose: PropTypes.func,          // onClose should be a function if provided
};

Banner.defaultProps = {
  message: "Use code 'Conserve' for 5% off your first month", // default message
  onClose: null,                   // default to null if no onClose function is provided
};

export default Banner;