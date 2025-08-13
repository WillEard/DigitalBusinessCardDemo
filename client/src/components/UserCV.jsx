import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';

import '../styles/Fonts.css';

const UserCV = () => {
  const { username, cvId } = useParams();
  const { getCVData } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [cvs, setCvs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);

  // setSelectedCV(cvsArray[0] || null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const data = await getCVData(username, cvId);
        console.log(data);
  
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
  
          if (cvId) {
            // Find the CV matching cvId inside the cvs array
            const selected = firstItem.cvs.find(cv => cv._id === cvId) || null;
            setSelectedCV(selected);
            setCvs(firstItem.cvs || []);
          } else {
            // No specific CV requested, show all and select first
            setCvs(firstItem.cvs || []);
            setSelectedCV(firstItem.cvs && firstItem.cvs.length > 0 ? firstItem.cvs[0] : null);
          }
        } else {
          setSelectedCV(null);
          setCvs([]);
        }
      } catch (err) {
        console.error(err);
        setSelectedCV(null);
        setCvs([]);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, [username, cvId]);

  
  if (loading) return <p>Loading...</p>;
  if (!selectedCV) return <p>No CV data found.</p> 

  

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5" style={{ minHeight: '80vh' }}>
  {loading ? (
    <p>Loading...</p>
  ) : cvs.length === 0 ? (
    <h2 className='text-center fontNormal'>No CV's were found</h2>
  ) : (
    <>
      {cvs.length > 1 && (
        <Dropdown className="mb-4" style={{ minWidth: '250px' }}>
          <Dropdown.Toggle variant="secondary" className="w-100 text-truncate">
            {selectedCV?.title || 'Select a CV'}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {cvs.map(cv => (
              <Dropdown.Item key={cv._id} onClick={() => setSelectedCV(cv)}>
                {cv.title || `CV ${cv._id}`}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}

      {selectedCV && (
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6} className="border rounded p-4 shadow-sm bg-secondary">
            <h2 className="mb-3 text-center">{selectedCV.title}</h2>
            <p><strong>Education:</strong> {selectedCV.education || 'N/A'}</p>
            <p><strong>Experience:</strong> {selectedCV.experience || 'N/A'}</p>
            <p><strong>Skills:</strong> {selectedCV.skills || 'N/A'}</p>
            <p><strong>Certifications:</strong> {selectedCV.certifications || 'N/A'}</p>
            <p><strong>Projects:</strong> {selectedCV.projects || 'N/A'}</p>
            <p><strong>Languages:</strong> {selectedCV.languages || 'N/A'}</p>
            <p><strong>Hobbies:</strong> {selectedCV.hobbies || 'N/A'}</p>
            <p><strong>Achievements:</strong> {selectedCV.achievements || 'N/A'}</p>


            
            {/* Add other CV fields here */}
          </Col>
        </Row>
      )}
    </>
  )}
</Container>
  );
};

export default UserCV;