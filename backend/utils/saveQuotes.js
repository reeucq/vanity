/*
    This script is used to save the quotes data to the MongoDB database.
    The script uses the mongoose package to connect to MongoDB.
    The script uses the Quote model to insert the data into MongoDB.
    The script uses the config file to get the MongoDB URI.
    The script logs the success or failure of the data insertion.
    The script closes the MongoDB connection after the data insertion.
*/
const mongoose = require("mongoose");
const Quote = require("../models/quote");
const config = require("./config");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Save new quotes
    await Quote.insertMany(quotes);
    console.log("Quotes have been saved");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
