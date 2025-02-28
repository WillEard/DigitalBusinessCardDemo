import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Button from 'react-bootstrap/esm/Button';

const Hero = () => {
  const percentage = 66;

  const { userData, getUserData } = useContext(AppContext);

  useEffect(() => {
    getUserData();
  }, [getUserData]);


  return (
    <>
      {userData ? (
        <Container
          data-bs-theme="dark"
          className="mt-3 mb-5 p-4 shadow-4 rounded-3 bg-body-tertiary text-light"
        >
          <h2>Hey {userData ? userData.name : null}!</h2>
          <h4 className="display-6">Here is an overview for today.</h4>
          <hr />
          <Row className="m-auto">
            <Col className="col">
              <h3 className="text-center">Calories</h3>
              <CircularProgressbar
                value={'50'}
                text={`1250`}
                styles={buildStyles({
                  pathColor: `rgba(0, 0, 0, ${percentage / 100})`,
                  textColor: 'white',
                  trailColor: 'white',
                })}
              />
            </Col>
            <Col className="col col-2">
              <h3 className="text-center">Protein</h3>
              <CircularProgressbar
                value={'33'}
                text={`50g`}
                styles={buildStyles({
                  pathColor: `rgba(100, 200, 15, ${percentage / 100})`,
                  textColor: 'white',
                  trailColor: 'white',
                })}
              />
            </Col>
            <Col className="col col-2">
              <h3 className="text-center">Carbs</h3>
              <CircularProgressbar
                value={'50'}
                text={`100g`}
                styles={buildStyles({
                  pathColor: `rgba(255, 255, 0, ${percentage / 100})`,
                  textColor: 'white',
                  trailColor: 'white',
                })}
              />
            </Col>
            <Col className="col col-md-2">
              <h3 className="text-center">Fats</h3>
              <CircularProgressbar
                value={'25'}
                text={`10g`}
                styles={buildStyles({
                  pathColor: `rgba(255, 0, 0, ${percentage / 100})`,
                  textColor: 'white',
                  trailColor: 'white',
                })}
              />
            </Col>
            <Col className="col col-md-2">
              <h3 className="text-center">Water</h3>
              <CircularProgressbar
                value={'50'}
                text={`1000ml`}
                styles={buildStyles({
                  pathColor: `rgba(0, 0, 255, ${percentage / 100})`,
                  textColor: 'white',
                  trailColor: 'white',
                })}
              />
            </Col>

            <Col className="col col-md-2">
              <h3 className="text-center">Steps</h3>
              <CircularProgressbar
                value={'80'}
                text={`8000`}
                styles={buildStyles({
                  pathColor: `rgba(92, 16, 100, ${percentage / 100})`,
                  textColor: 'white',
                  trailColor: 'white',
                })}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="container text-sm-center p-5 bg-light mt-4 bg-dark text-light rounded">
          <h1>Innovate your future</h1>
          <p className="lead">The all in one app to fuel your lifestyle.</p>
          <div className="btn-group">
            <Button>Log In</Button>
            <Button className="btn-secondary">Find out more</Button>
          </div>
        </Container>
      )}
    </>
  );
};

export default Hero;
