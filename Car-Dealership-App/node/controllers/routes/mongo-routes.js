const express = require("express");
const router = express.Router();
const Listing = require("../../models/car.js");

router.post("/", ({ body }, res) => {
  Listing.create(body)
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/bulk", ({ body }, res) => {
  Listing.insertMany(body)
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/", (req, res) => {
  Listing.find({})
    .sort({ date: -1 })
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;