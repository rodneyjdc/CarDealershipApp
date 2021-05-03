// calling one of our dependencies, the 'express' package
const express = require("express");
const router = express.Router();

// calling another dependency, the user model
const Users = require("../../../models/user.js");

// GET, POST, PUT, DELETE routes for User data

// GET routes

  router.get("/api/users", (req, res) => {
    Users.find({})
      .sort({ date: -1 })
      .then((dbListing) => {
        res.json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  router.get("/api/usernames", (req, res) => {
      Users.find({}, { _id: 0 })
        .select("username")
        .sort({ date: -1 })
        .then((dbListing) => {
          finalArray = dbListing.map(function (obj) {
            return obj.username;
          });
          res.json(finalArray);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
  });

  router.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    Users.find({_id: id}, { _id: 0, __v: 0 })
      .sort({ date: -1 })
      .then((dbListing) => {
        res.json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

// ------------------------------------------------------------------------

// POST routes

  router.post("/api/users", ({ body }, res) => {
    Users.create(body)
      .then((dbListing) => {
        res.status(201).json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  });

// ------------------------------------------------------------------------

// PUT routes

  router.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Users.updateOne({_id: id}, body, { runValidators: true })
    .then(dbData => {
        res.status(200).json(dbData);
    })
    .catch(err => {
        res.status(400).json(err.message);
    })
  });
  
// DELETE routes

  router.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    Users.deleteOne({_id: id})
      .then((dbListing) => {
        res.json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
// ------------------------------------------------------------------------

  module.exports = router;