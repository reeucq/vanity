/*
    This file contains the schema for the color data. It defines the year and colors fields.
    The schema is transformed to remove unneeded fields and convert the id into a string.
*/
const mongoose = require("mongoose");

// Define the color schema
const colorSchema = new mongoose.Schema({
  year: Number,
  colors: [String],
});

// transform the schema to remove un-needed fields and convert the id into a string (which is set to an object by default in mongodb)
colorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Color", colorSchema);
