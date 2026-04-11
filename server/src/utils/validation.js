// src/utils/validation.js
export const isValidEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{10,}$/;
  return regex.test(phone);
};

export const isValidUsername = (username) => {
  // Alphanumeric and underscore, 3-20 chars
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};
