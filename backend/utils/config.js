/*
    This file contains the configuration for the application.
    The configuration is used to set the port and the MongoDB URI.
*/
require('dotenv').config();

const PORT = process.env.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
  GEMINI_API_KEY
};
