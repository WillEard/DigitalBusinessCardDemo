import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useNavigate } from 'react-router-dom';
import { useState,useContext, useEffect } from 'react';

import { AppContext } from '../context/AppContext';

import { Toast } from 'bootstrap';
import { toast } from 'react-toastify';


import CircumIcon from "@klarr-agency/circum-icons-react"; // React


const Settings = () => {
  
  const { backendUrl, userData, cvData, getCVData, isLoadingUser} = useContext(AppContext);
  
  const username = userData?.username;

  
   // Fetch CV data when username is available
   // If userData is missing after loading finishes, redirect
  useEffect(() => {
    if (!isLoadingUser && !userData) {
      console.warn("Not logged in.");
      
    }
  }, [isLoadingUser, userData]);

  



  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Navbar />
        
        <Container className='mt-5'>
          <h1 className="text-center d-flex justify-content-center mb-2 fontNormal display-4">Account Settings</h1>
              
          <Row className="justify-content-center py-4">
            <Col xl={6} md={8} sm={10}>
              <div className="p-4 rounded bg-dark shadow">
                {/* Password + Change Button */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Password</Form.Label>
                  <div className="d-flex">
                    <Button
                      href="/reset-pass"
                      className="bg-primary text-light px-3 fontCondensed"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: '0.375rem',
                        borderBottomLeftRadius: '0.375rem'
                      }}
                    >
                      Change
                    </Button>
                    <Form.Control
                      placeholder="*******"
                      disabled
                      className="text-muted"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: '0.375rem',
                        borderBottomRightRadius: '0.375rem'
                      }}
                    />
                  </div>
                </Form.Group>

                {/* Mobile Number */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Mobile Number</Form.Label>
                  <Form.Control value={userData?.phoneNumber || ''} disabled className="text-muted" />
                </Form.Group>

                {/* Verification Status */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Verification</Form.Label>
                  <Form.Control
                    value={userData?.isVerified ? 'Verified' : 'Not Verified'}
                    disabled
                    className={`text-${userData?.isVerified ? 'success' : 'danger'}`}
                  />
                </Form.Group>

                {/* Premium Status */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Premium</Form.Label>
                  <Form.Control value={'Premium || Free'} disabled/>
                </Form.Group>

                {/* Delete Account */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-light fontCondensed">Password</Form.Label>
                  <div className="d-flex">
                    <Button
                      href="/reset-pass"
                      className="bg-danger text-light px-3 fontCondensed shadow-none"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: '0.375rem',
                        borderBottomLeftRadius: '0.375rem'
                      }}
                    >
                      Change
                    </Button>
                    <Form.Control
                      placeholder="Enter password to delete account"
                      
                      className="text-muted"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: '0.375rem',
                        borderBottomRightRadius: '0.375rem'
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Container>  
      </div>
    </div>
  );
};

export default Settings;
