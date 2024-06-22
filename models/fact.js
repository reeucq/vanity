/*
    This file contains schema for interesting facts about van gogh
    The facts model is used to represent a fact in the database.
    The fact schema contains the number, title, and description fields.
    The schema is transformed to remove unneeded fields and convert the id into a string.
*/
const mongoose = require("mongoose");

// Define the fact schema
const factSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// transform the schema to remove un-needed fields and convert the id into a string (which is set to an object by default in mongodb)
factSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Fact", factSchema);
