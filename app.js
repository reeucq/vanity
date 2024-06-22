/*
  This file contains the configuration for the application.
  The configuration is used to set the port and the MongoDB URI.
*/

const config = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const paintingRouter = require("./controllers/paintings");
const factRouter = require("./controllers/facts");
const colorRouter = require("./controllers/colors");
const helmet = require("helmet");
require("express-async-errors");

// Set mongoose to not use strict mode for queries, this is to allow for querying on fields that are not defined in the schema
mongoose.set("strictQuery", false);

// MongoDB connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors()); // Enable CORS for all routes, which allows requests from any origin
app.use(helmet()); // Add security headers to responses, which helps prevent common security vulnerabilities
app.use(express.json()); // Parse incoming JSON payloads
app.use(middleware.morgan); // Log requests to the console

app.use("/api/paintings", paintingRouter); // Mount the paintingRouter on /api/paintings
app.use("/api/facts", factRouter); // Mount the factRouter on /api/facts
app.use("/api/colors", colorRouter); // Mount the colorRouter on /api/colors

app.use(middleware.unknownEndpoint); // Handle unknown endpoints
app.use(middleware.errorHandler); // Handle errors

module.exports = app;
