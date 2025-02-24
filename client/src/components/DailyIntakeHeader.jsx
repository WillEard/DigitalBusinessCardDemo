import Container from 'react-bootstrap/Container';
import DailyIntake from './DailyProgress';

const Header = () => {
  return (
    <Container className="border rounded border-secondary">
      <DailyIntake animation="none" size="lg" />
      <hr />
    </Container>
  );
};

export default Header;
