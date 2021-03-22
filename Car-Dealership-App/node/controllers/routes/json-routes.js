const express = require("express");
const router = express.Router();
const { readWrite } = require("../../utils/helpers.js");
const { add, upd, del } = require("../queries/json-queries.js");
const filePath = "../data/cars.json";

router.get("/cars", (req, res) => {
  console.log("getting");
  readWrite(filePath, null).then((js) => {
    console.log(js);
    res.json(js);
  });
});

router.post("/", (req, res) => {
  readWrite(filePath, add, req.body).then((js) => {
    console.log(js);
    res.json(js);
  });
});

router.put("/", (req, res) => {
  readWrite(filePath, upd, req.body).then((js) => {
    console.log(js);
    res.json(js);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  readWrite(filePath, del, id).then((js) => {
    console.log(js);
    res.json(js);
  });
});

module.exports = router;