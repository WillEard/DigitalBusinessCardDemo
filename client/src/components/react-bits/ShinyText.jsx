import '../../styles/react-bits/ShinyText.css';
import { Button } from 'react-bootstrap';

function ShinyButton ({ text, className = '', animationDuration = '2s', disabled = false, onClick }) {
    return (
      <Button
        className={`shiny-button ${disabled ? 'disabled' : ''} ${className}`}
        style={{ animationDuration }}
        disabled={disabled}
        onClick={onClick} // make sure this is defined
      >
        <span className="shiny-text">{text}</span>
      </Button>
    );
  }

export default ShinyButton;