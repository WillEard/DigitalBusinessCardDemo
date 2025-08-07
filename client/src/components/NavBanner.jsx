import '../styles/Banner.css';

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

export default Banner;