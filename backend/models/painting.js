/*
  This file contains the schema for the painting model.
  The painting model is used to represent a painting in the database.
  The painting model has the following fields:
    - name: the name of the painting
    - year: the year the painting was made
    - made_at: the location the painting was made
    - size: the size of the painting
    - catalog_no: the catalog number of the painting
    - filename: the filename of the painting image
  The painting model has a toJSON method that transforms the id field from an object to a string.
*/
const mongoose = require('mongoose');

// Define the painting schema
const paintingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  made_at: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  catalog_no: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

// transform the schema to remove un-needed fields and convert the id into a string (which is set to an object by default in mongodb)
paintingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Painting', paintingSchema);
