import { useParams, Link } from "react-router-dom";
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
        console.log("UserCV - Fetched data:", data);

        if (cvId) {
          // Single CV was requested
          if (data && typeof data === "object") {
            setSelectedCV(data);
            setCvs([data]);
          } else {
            setSelectedCV(null);
            setCvs([]);
          }
        } else {
          // Multiple CVs - data is already an array
          if (Array.isArray(data) && data.length > 0) {
            setCvs(data);
            setSelectedCV(data[0]);
          } else {
            setSelectedCV(null);
            setCvs([]);
          }
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

  const renderResumeCV = (cv) => (
    <div className="border rounded p-4 shadow-sm bg-dark">
      <h2 className="mb-4 pb-3 text-center fontNormal border-bottom border-secondary">
        {cv.title}
      </h2>

      <Row className="g-4">
        {cvFields.map((field) => (
          <Col xs={12} lg={6} key={field.key}>
            <div className="mb-3">
              <h5 className="fontCondensed text-info mb-2">{field.label}</h5>
              <p
                className="fontCondensed text-white mb-0"
                style={{ lineHeight: "1.6" }}
              >
                {cv[field.key] || "N/A"}
              </p>
            </div>
          </Col>
        ))}

        {cv.customFields && cv.customFields.length > 0 && (
          <>
            {cv.customFields.map((field, idx) => (
              <Col xs={12} lg={6} key={idx}>
                <div className="mb-3">
                  <h5 className="fontCondensed text-info mb-2">
                    {field.fieldName}
                  </h5>
                  <p
                    className="fontCondensed text-white mb-0"
                    style={{ lineHeight: "1.6" }}
                  >
                    {field.fieldValue || "N/A"}
                  </p>
                </div>
              </Col>
            ))}
          </>
        )}
      </Row>

      <div className="mt-4 pt-3 d-flex justify-content-center border-top border-secondary">
        <Button className="fontCondensed rounded-5 px-4">
          Add to contacts
        </Button>
      </div>
    </div>
  );

  const renderBusinessCV = (cv) => (
    <div className="border rounded p-4 shadow-sm bg-dark">
      <h2 className="mb-4 pb-3 text-center fontNormal border-bottom border-secondary">
        {cv.businessData?.companyName || "Business Card"}
      </h2>

      <Row className="g-4">
        <Col xs={12} lg={6}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Job Title</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.jobTitle || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Company</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.companyName || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Email</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.email || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Phone</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.phone || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Website</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.website || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Address</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.address || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Bio</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.bio || "N/A"}
            </p>
          </div>
        </Col>
        <Col xs={12}>
          <div className="mb-3">
            <h5 className="fontCondensed text-info mb-2">Services</h5>
            <p className="fontCondensed text-white mb-0">
              {cv.businessData?.services || "N/A"}
            </p>
          </div>
        </Col>

        {cv.customFields && cv.customFields.length > 0 && (
          <>
            {cv.customFields.map((field, idx) => (
              <Col xs={12} lg={6} key={idx}>
                <div className="mb-3">
                  <h5 className="fontCondensed text-info mb-2">
                    {field.fieldName}
                  </h5>
                  <p className="fontCondensed text-white mb-0">
                    {field.fieldValue || "N/A"}
                  </p>
                </div>
              </Col>
            ))}
          </>
        )}
      </Row>

      <div className="mt-4 pt-3 d-flex justify-content-center border-top border-secondary">
        <Button className="fontCondensed rounded-5 px-4">
          Add to contacts
        </Button>
      </div>
    </div>
  );

  const renderCustomCV = (cv) => (
    <div className="border rounded p-4 shadow-sm bg-dark">
      <h2 className="mb-4 pb-3 text-center fontNormal border-bottom border-secondary">
        {cv.customData?.heading || "Custom Card"}
      </h2>

      <Row className="g-4">
        {cv.customData?.sections && cv.customData.sections.length > 0 ? (
          cv.customData.sections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section, idx) => (
              <Col xs={12} key={idx}>
                <div className="mb-3">
                  <h5 className="fontCondensed text-info mb-2">
                    {section.title}
                  </h5>
                  <p
                    className="fontCondensed text-white mb-0"
                    style={{ lineHeight: "1.6" }}
                  >
                    {section.content || "N/A"}
                  </p>
                </div>
              </Col>
            ))
        ) : (
          <Col xs={12}>
            <p className="fontCondensed text-muted">No sections added</p>
          </Col>
        )}

        {cv.customFields && cv.customFields.length > 0 && (
          <>
            {cv.customFields.map((field, idx) => (
              <Col xs={12} key={`custom-${idx}`}>
                <div className="mb-3">
                  <h5 className="fontCondensed text-info mb-2">
                    {field.fieldName}
                  </h5>
                  <p
                    className="fontCondensed text-white mb-0"
                    style={{ lineHeight: "1.6" }}
                  >
                    {field.fieldValue || "N/A"}
                  </p>
                </div>
              </Col>
            ))}
          </>
        )}
      </Row>

      <div className="mt-4 pt-3 d-flex justify-content-center border-top border-secondary">
        <Button className="fontCondensed rounded-5 px-4">
          Add to contacts
        </Button>
      </div>
    </div>
  );

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : cvs.length === 0 ? (
        <div className="text-center py-5">
          <h2 className="fontNormal mb-3">No cards have been created yet</h2>
          <p className="mb-4">
            Get started by <Link to="/dashboard">creating your first card</Link>
          </p>
        </div>
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
                {selectedCV.cardType === "business"
                  ? renderBusinessCV(selectedCV)
                  : selectedCV.cardType === "custom"
                    ? renderCustomCV(selectedCV)
                    : renderResumeCV(selectedCV)}
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default UserCV;
