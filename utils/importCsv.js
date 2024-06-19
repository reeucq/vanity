/*
  This script reads the CSV file and imports the data into MongoDB.
  The script uses the csv-parser package to read the CSV file.
  The script uses the mongoose package to connect to MongoDB.
  The script uses the Painting model to insert the data into MongoDB.
  The script uses the config file to get the MongoDB URI.
  The script manually removes the BOM if it exists in the data.
  The script normalizes the fields before inserting them into MongoDB.
  The script logs the success or failure of the data insertion.
  The script closes the MongoDB connection after the data insertion.
*/

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Painting = require('../models/painting'); // Adjust the path as needed
const config = require('./config');

// Function to import CSV data
const importCsvData = async () => {
  // Connect to MongoDB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '../data/paintings-data-testing.csv')
    )
      .pipe(csv())
      .on('data', (data) => {
        // Manually remove BOM if it exists
        if (data['﻿name']) {
          data.name = data['﻿name'].trim();
        } else {
          data.name = data.name.trim();
        }

        // Normalize other fields
        data.year = parseInt(data.year.trim(), 10);
        data.made_at = data.made_at.trim();
        data.size = data.size.replace(/\n/g, ' ').trim();
        data.catalog_no = data.catalog_no.trim();
        data.filename = data.filename.trim();

        results.push(data);
      })
      .on('end', async () => {
        try {
          await Painting.deleteMany({}); // Clear current data
          await Painting.insertMany(results); // Insert the testing data
          console.log('Data successfully loaded into MongoDB');
          resolve(); // Resolve the promise once data is successfully inserted
        } catch (error) {
          console.error('Error inserting data into MongoDB', error);
          reject(error); // Reject the promise in case of error
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file', error);
        reject(error); // Reject the promise in case of CSV reading error
      });
  });
};

module.exports = importCsvData;
