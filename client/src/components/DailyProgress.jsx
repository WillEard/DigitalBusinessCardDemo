import Container from 'react-bootstrap/esm/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import IntakeModal from './IntakeModal';

const DailyProgressBar = () => {
  return (
    <Container fluid>
      <h2 className="text-center mt-1">Your progress today</h2>
      <hr />
      <h4>Water</h4>
      <ProgressBar
        className="mb-1"
        label="Water: 1000ML / 2000ML"
        variant="primary"
        now={50}
        min={1}
      />
      <IntakeModal />
      <hr />
      <h4>Protein</h4>
      <ProgressBar
        className="mb-1"
        label="Protein: 80G/150G"
        variant="success"
        now={60}
      />
      <hr />
      <h4>Carbohydrates</h4>
      <ProgressBar
        className="mb-1"
        label="Carbs: 100G/150G"
        variant="warning"
        now={66}
      />
      <hr />
      <h4>Fats</h4>
      <ProgressBar
        className="mb-1"
        label="Fat: 10G/40G"
        variant="danger"
        now={25}
      />
    </Container>
  );
};

export default DailyProgressBar;
