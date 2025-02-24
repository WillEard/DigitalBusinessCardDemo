import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaNutritionix } from 'react-icons/fa';

const HomeCard = () => {
  return (
    <Card style={{ width: '25rem' }}>
      <FaNutritionix
        className="text-center m-auto"
        variant="top"
        size={'100px'}
      />

      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
