/*
    This file contains the logic for the facts page.
    The facts page contains interesting facts about Vincent van Gogh.
    The facts are retrieved from the database and displayed on the page.
    The facts page is rendered using the facts view.
*/

const factRouter = require("express").Router();
const Fact = require("../models/fact");

// Get all facts
factRouter.get("/", async (req, res) => {
  const facts = await Fact.find({});
  res.json(facts);
});

// Get a Random Fact
factRouter.get("/random", async (req, res) => {
  const count = await Fact.countDocuments();
  const random = Math.floor(Math.random() * count);
  const fact = await Fact.findOne().skip(random);
  res.json(fact);
});

module.exports = factRouter;
