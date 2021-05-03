const express = require("express");
const router = express.Router();
const Listing = require("../../../models/car.js");
const Rules = require("../../../models/rules.js");
const Users = require("../../../models/user.js");

router.post("/api/cars", ({ body }, res) => {
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

router.get("/api/cars", (req, res) => {
  Listing.find({})
    // .sort({ date: -1 })
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ++++++++++++++++
// users api

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
  /* Users.find({})
    .sort({ date: -1 })
     .then((dbListing) => {
      res.json(dbListing);
    }) 
    .then((data) => {
      console.log("data",data);
      var myData = JSON.parse(data);
      console.log("mydata", mydata);
      var resultArr = [];
      myData.forEach((item) => resultArr.push(item.userName));
      
      res.status(200).send("resultArr");
    })
    .catch((err) => {
      res.status(400).json(err);
    }); */
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

router.post("/api/users", ({ body }, res) => {
  Users.create(body)
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

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

// Acceptance Rules
router.post("/api/rules", ({ body }, res) => {
  Rules.create(body)
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/rules", (req, res) => {
  Rules.find({})
    .then((dbListing) => {
      res.json(dbListing);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
