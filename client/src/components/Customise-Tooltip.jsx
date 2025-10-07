import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const CustomiseTooltip = (
  <Popover id="popover-basic">
    <Popover.Header as="h3" className='fw-bold'>Premium Customiser</Popover.Header>
    <Popover.Body>
      This will be what other users see when they scan your card.
    </Popover.Body>
  </Popover>
);

export default CustomiseTooltip;