/*
    This file contains schema of quotes by van gogh
    The quote model is used to represent a quote in the database.
    The quote schema contains the number, and quote fields.
    The schema is transformed to remove unneeded fields and convert the id into a string.
*/
const mongoose = require("mongoose");

// Define the quote schema
const quoteSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  quote: { type: String, required: true },
});

// transform the schema to remove un-needed fields and convert the id into a string (which is set to an object by default in mongodb)
quoteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Quote", quoteSchema);
