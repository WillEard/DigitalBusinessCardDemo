// React
import { useState } from "react";

// Icons
import { FaCcPaypal } from "react-icons/fa";

// React Bootstrap
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Styles
import '../styles/Fonts.css';
import '../styles/Payment.css'; // Import custom styles for payment page
 

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    streetAddress: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: '',
    charitySelection: '',
  });

  // Validation state for fields (true = valid, false = invalid, null = untouched)
  const [validation, setValidation] = useState({
    nameOnCard: null,
    cardNumber: null,
    expiryMonth: null,
    expiryYear: null,
    cvv: null,
    streetAddress: null,
    city: null,
    postalCode: null,
    country: null,
    charitySelection: null,
  });

  // Validation functions for each field (simple examples)
  const validators = {
    nameOnCard: (val) => val.trim().length > 0,
    cardNumber: (val) => /^\d{13,19}$/.test(val.replace(/\s+/g, '')),
    expiryMonth: (val) => val !== '',
    expiryYear: (val) => val !== '',
    cvv: (val) => /^\d{3,4}$/.test(val),
    streetAddress: (val) => val.trim().length > 0,
    city: (val) => val.trim().length > 0,
    postalCode: (val) => val.trim().length > 0,
    country: (val) => val !== '',
    charitySelection: (val) => val !== '',
  };

  const [touched, setTouched] = useState({
    nameOnCard: false,
    cardNumber: false,
    expiryMonth: false,
    expiryYear: false,
    cvv: false,
    streetAddress: false,
    city: false,
    postalCode: false,
    country: false,
    charitySelection: false,
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    // Validate on change for real-time feedback
    if (validators[field]) {
      setValidation((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  
    // Run validation on blur
    if (validators[field]) {
      setValidation((prev) => ({ ...prev, [field]: validators[field](form[field]) }));
    }
  };

  // Check all required fields valid before submitting
  const isFormValid = () => {
    return Object.entries(validators).every(([field, validateFn]) => validateFn(form[field]));
  };

  
  const onSubmit = (e) => {
    e.preventDefault();
    // If form is invalid, mark all fields as touched to show errors
    if (!isFormValid()) {
      const newValidation = {};
      for (const field in validators) {
        newValidation[field] = validators[field](form[field]);
      }
      setValidation(newValidation);
      return;
    }

    // Call your payment handler
    handlePayment(form);
  };

  // After validation, handle payment logic
  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment process
    setTimeout(() => {
      alert("Payment Successful!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="d-flex flex-column min-vh-100 login-wrapper text-white">
      <div className="login-overlay flex-grow-1">
        <Navbar />
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="mb-4 text-center mt-5 fontNormal display-4">Subscription</h2>
            <Card className="mb-5">
              <Card.Body>
                <h5 className="mb-3 fontCondensed">Plan: <strong className="fontCondensed">Pelago Premium</strong></h5>
                <p className="fw-bold text-danger">10% of all subscriptions go towards an environmental charity of your choice!</p>
                <p className="mb-4">Amount: <strong>£4.99</strong>/month</p>

                <Form noValidate onSubmit={onSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="nameOnCard">
                        <Form.Label className="fontCondensed">Name on Card</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Jane Doe"
                          value={form.nameOnCard}
                          onChange={handleChange('nameOnCard')}
                          onBlur={handleBlur('nameOnCard')}
                          isInvalid={validation.nameOnCard === false}
                          isValid={validation.nameOnCard === true}
                          autoComplete="cc-name"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the name on your card.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="cardNumber">
                        <Form.Label className="fontCondensed">Card Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          pattern="\d{13,19}"
                          value={form.cardNumber}
                          onChange={handleChange('cardNumber')}
                          onBlur={handleBlur('cardNumber')}
                          isInvalid={validation.cardNumber === false}
                          isValid={validation.cardNumber === true}
                          autoComplete="cc-number"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid card number (13-19 digits).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="expiryMonth">
                        <Form.Label className="fontCondensed">Expiry Month</Form.Label>
                        <Form.Select
                          value={form.expiryMonth}
                          onChange={handleChange('expiryMonth')}
                          onBlur={handleBlur('expiryMonth')}
                          isInvalid={validation.expiryMonth === false}
                          isValid={validation.expiryMonth === true}
                          autoComplete="cc-exp-month"
                          required
                        >
                          <option value="" disabled>
                            Select month
                          </option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select expiry month.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="expiryYear">
                        <Form.Label className="fontCondensed">Expiry Year</Form.Label>
                        <Form.Select
                          value={form.expiryYear}
                          onChange={handleChange('expiryYear')}
                          onBlur={handleBlur('expiryYear')}
                          isInvalid={validation.expiryYear === false}
                          isValid={validation.expiryYear === true}
                          autoComplete="cc-exp-year"
                          required
                        >
                          <option value="" disabled>
                            Select year
                          </option>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select expiry year.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="cvv">
                        <Form.Label className="fontCondensed">CVV</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          pattern="\d{3,4}"
                          value={form.cvv}
                          onChange={handleChange('cvv')}
                          onBlur={handleBlur('cvv')}
                          isInvalid={validation.cvv === false}
                          isValid={validation.cvv === true}
                          autoComplete="cc-csc"
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please enter a valid 3 or 4 digit CVV.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4" controlId="streetAddress">
                    <Form.Label className="fontCondensed">Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="123 Main St"
                      value={form.streetAddress}
                      onChange={handleChange('streetAddress')}
                      onBlur={handleBlur('streetAddress')}
                      isInvalid={validation.streetAddress === false}
                      isValid={validation.streetAddress === true}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="apartment">
                    <Form.Label className="fontCondensed">Apartment, Suite, etc. (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apt 4B"
                      value={form.apartment}
                      onChange={handleChange('apartment')}
                      // optional, so no validation
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="city">
                        <Form.Label className="fontCondensed">City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="New York"
                          value={form.city}
                          onChange={handleChange('city')}
                          onBlur={handleBlur('city')}
                          isInvalid={validation.city === false}
                          isValid={validation.city === true}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please enter your city.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="postalCode">
                        <Form.Label className="fontCondensed">Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="10001"
                          value={form.postalCode}
                          onChange={handleChange('postalCode')}
                          onBlur={handleBlur('postalCode')}
                          isInvalid={validation.postalCode === false}
                          isValid={validation.postalCode === true}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please enter your postal code.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4" controlId="country">
                    <Form.Label className="fontCondensed">Country</Form.Label>
                    <Form.Select
                      value={form.country}
                      onChange={handleChange('country')}
                      onBlur={handleBlur('country')}
                      isInvalid={validation.country === false}
                      isValid={validation.country === true}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select country...
                      </option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      {/* Add more countries as needed */}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select your country.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-50" controlId="charitySelection">
                    <Form.Label className="fontCondensed">Charity Selection</Form.Label>
                    <Form.Select
                      value={form.charitySelection}
                      onChange={handleChange('charitySelection')}
                      onBlur={handleBlur('charitySelection')}
                      isInvalid={validation.charitySelection === false}
                      isValid={validation.charitySelection === true}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a charity...
                      </option>
                      <option value="Rainforest Alliance">Rainforest Alliance</option>
                      <option value="Environmental Defense Fund">Environmental Defense Fund</option>
                      <option value="WWF">WWF</option>
                      <option value="Greenpeace">Greenpeace</option>
                      <option value="Greenpeace">National Parks Conservation Association</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select a charity.</Form.Control.Feedback>
                  </Form.Group>

                  <Button
  variant="primary"
  type="submit"
  className="w-25 rounded-5 fontCondensed mx-auto d-flex justify-content-center"
  disabled={loading || !isFormValid()}
>
  {loading ? (
    <>
      <Spinner animation="border" size="sm" /> Processing...
    </>
  ) : (
    'Pay Now'
  )}
</Button>

                  <hr />

                  <div className="justify-content-center d-flex mb-2">Or</div>
                  <div className="justify-content-center mx-auto d-flex">
                    <Button disabled={loading}>
                      <FaCcPaypal size={'36px'} />
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
    
  );
};

export default PaymentPage;