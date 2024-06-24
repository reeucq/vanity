/*
    This file contains the logic for the quotes page.
    The quotes page contains interesting quotes about Vincent van Gogh.
    The quotes are retrieved from the database and displayed on the page.
    The quotes page is rendered using the quotes view.
*/

const quoteRouter = require("express").Router();
const Quote = require("../models/quote");

// Get all facts
quoteRouter.get("/", async (req, res) => {
  const quotes = await Quote.find({});
  res.json(quotes);
});

// Get a Random Quote
quoteRouter.get("/random", async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const quote = await Quote.findOne().skip(random);
  res.json(quote);
});

module.exports = quoteRouter;
