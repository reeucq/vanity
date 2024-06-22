/*
  This file contains the routes for the paintings API.
  The routes are mounted on /api/paintings.
  The routes are used to get all paintings, search paintings, filter paintings, and get a single painting.
  The routes are used to interact with the Painting model.
*/
const paintingRouter = require("express").Router();
const Painting = require("../models/painting");

// Get all paintings
paintingRouter.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const paintings = await Painting.find({})
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Painting.countDocuments({});
  res.json({ total, paintings });
});

// Search paintings
paintingRouter.get("/search", async (req, res) => {
  const { query } = req.query;
  const paintings = await Painting.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { catalog_no: { $regex: query, $options: "i" } },
      { made_at: { $regex: query, $options: "i" } },
    ],
  });
  res.json(paintings);
});

// Filter paintings
paintingRouter.get("/filter", async (req, res) => {
  const { location, year } = req.query;
  let filter = {};

  if (location) {
    filter.made_at = { $regex: location, $options: "i" };
  }

  if (year) {
    filter.year = parseInt(year, 10);
  }

  const paintings = await Painting.find(filter);
  res.json(paintings);
});

// Sort Paintings
paintingRouter.get("/sort", async (req, res) => {
  const { sort_by = "name", order = "asc" } = req.query;
  const sortOrder = order === "asc" ? 1 : -1;
  const paintings = await Painting.find({}).sort({
    [sort_by]: sortOrder,
  });
  res.json(paintings);
});

// Get Locations with Count
paintingRouter.get("/locations", async (req, res) => {
  const locationsWithCount = await Painting.aggregate([
    {
      $group: {
        _id: "$made_at",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by year in ascending order
    },
    {
      $project: {
        _id: 0,
        location: "$_id",
        count: 1,
      },
    },
  ]);

  res.json(locationsWithCount);
});

// Get Years with Count
paintingRouter.get("/years", async (req, res) => {
  const yearsWithCount = await Painting.aggregate([
    {
      $group: {
        _id: "$year",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by year in ascending order
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        count: 1,
      },
    },
  ]);

  res.json(yearsWithCount);
});

// Get a single painting
paintingRouter.get("/:id", async (req, res) => {
  const painting = await Painting.findById(req.params.id);
  if (painting) {
    res.json(painting);
  } else {
    res.status(404).end();
  }
});

module.exports = paintingRouter;
