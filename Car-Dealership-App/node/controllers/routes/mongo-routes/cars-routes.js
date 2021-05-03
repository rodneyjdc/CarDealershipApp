// calling in our 'express' dependency
const express = require("express");
const router = express.Router();

// calling in the Car model 
const Cars = require("../../../models/car.js");

// GET, POST, PUT, DELETE routes for Cars data
router.get("/api/cars", (req, res) => {
    Cars.find({})
      // .sort({ date: -1 })
      .then((dbListing) => {
        res.json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

router.post("/api/cars", ({ body }, res) => {
    Cars.create(body)
      .then((dbListing) => {
        res.json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
router.post("/bulk", ({ body }, res) => {
    Cars.insertMany(body)
      .then((dbListing) => {
        res.json(dbListing);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

router.put("/api/cars/:id", (request, response) => {
    Cars.updateOne(request.body)
        .then(dbData => {
            response.json(dbData);
        })
        .catch(err => {
            response.status(400).json(err);
        })
});

router.delete("/api/cars/:id", (req, res) => {
    const { id } = req.params;
    Cars.deleteOne({_id: id})
        .then(dbData => {
            res.json(dbData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});


module.exports = router;