import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

import "../styles/Fonts.css";
import "../styles/UserCV.css";

import { CVContext } from "../context/CVContext";

const UserCV = () => {
  const { username, cvId } = useParams();
  const { getCVData } = useContext(CVContext);

  const [loading, setLoading] = useState(true);
  const [cvs, setCvs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);

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
            const selected =
              firstItem.cvs.find((cv) => cv._id === cvId) || null;
            setSelectedCV(selected);
            setCvs(firstItem.cvs || []);
          } else {
            // No specific CV requested, show all and select first
            setCvs(firstItem.cvs || []);
            setSelectedCV(
              firstItem.cvs && firstItem.cvs.length > 0
                ? firstItem.cvs[0]
                : null
            );
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
  }, [username, cvId, getCVData]);

  const handleSelectCV = useCallback((cv) => {
    setSelectedCV(cv);
  }, []);

  const cvFields = [
    { label: "Education", key: "education" },
    { label: "Experience", key: "experience" },
    { label: "Skills", key: "skills" },
    { label: "Certifications", key: "certifications" },
    { label: "Projects", key: "projects" },
    { label: "Languages", key: "languages" },
    { label: "Hobbies", key: "hobbies" },
    { label: "Achievements", key: "achievements" },
  ];

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : cvs.length === 0 ? (
        <h2 className="text-center fontNormal">No CV&apos;s were found</h2>
      ) : (
        <>
          {cvs.length > 1 && (
            <Row className="justify-content-center mb-4">
              <Col xs={12} md={10} lg={8}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="primary"
                    className="w-100 text-truncate fontCondensed rounded-5"
                  >
                    {selectedCV?.title || "Select a CV"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {cvs.map((cv) => (
                      <Dropdown.Item
                        key={cv._id}
                        onClick={() => handleSelectCV(cv)}
                      >
                        {cv.title || `CV ${cv._id}`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          )}

          {selectedCV && (
            <Row className="justify-content-center">
              <Col xs={12} md={11} lg={10} xl={9}>
                <div className="border rounded p-4 shadow-sm bg-dark">
                  <h2 className="mb-4 pb-3 text-center fontNormal border-bottom border-secondary">
                    {selectedCV.title}
                  </h2>

                  <Row className="g-4">
                    {cvFields.map((field) => (
                      <Col xs={12} lg={6} key={field.key}>
                        <div className="mb-3">
                          <h5 className="fontCondensed text-info mb-2">
                            {field.label}
                          </h5>
                          <p
                            className="fontCondensed text-white mb-0"
                            style={{ lineHeight: "1.6" }}
                          >
                            {selectedCV[field.key] || "N/A"}
                          </p>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <div className="mt-4 pt-3 d-flex justify-content-center border-top border-secondary">
                    <Button className="fontCondensed rounded-5 px-4">
                      Add to contacts
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default UserCV;
