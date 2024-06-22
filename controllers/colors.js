/*
    This file will contain the logic for the colors routes.
    The colors routes will allow the user to get all colors.
    The colors routes will be mounted at /colors.   
*/
const colorRouter = require("express").Router();
const Color = require("../models/color");

// Get All Colors
colorRouter.get("/", async (req, res) => {
  const colors = await Color.find({});
  res.json(colors);
});

module.exports = colorRouter;
