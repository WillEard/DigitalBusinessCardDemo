// src/utils/otp.js
export const generateOTP = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

export const getOTPExpiry = (minutes = 15) => {
  return Date.now() + minutes * 60 * 1000;
};

export const isOTPExpired = (expiry) => {
  return expiry < Date.now();
};

export const validateOTP = (otp, storedOTP) => {
  return String(otp) === String(storedOTP);
};
