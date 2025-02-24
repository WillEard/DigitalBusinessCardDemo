import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DailyIntakeHeader from '../components/DailyIntakeHeader';

const Intake = () => {
  return (
    <>
      <Container>
        <Navbar />
        <br />

        <Tabs
          defaultActiveKey="daily"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="daily" title="Daily">
            <DailyIntakeHeader />
          </Tab>
          <Tab eventKey="weekly" title="Weekly">
            Tab content for Profile
          </Tab>
          <Tab eventKey="longer-tab" title="Macros">
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="contact" title="Micros" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>

        <Footer />
      </Container>
    </>
  );
};

export default Intake;
