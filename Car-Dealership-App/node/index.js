const mongoose = require("mongoose"); //bring in Mongo
const config = require("./config.js"); //bring in config

// Connect to MongoDB database
mongoose
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.user,
    pass: config.pwd,
  })
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log("error connecting to the database", err);
    process.exit();
  });

//bring in express
const express = require("express");

//create instance of express
const app = express();

//specify port
const port = process.env.PORT || 4000;

//bring in cors
const cors = require("cors");

//apply to all routes
app.use(cors());

//to parse json bodies
app.use(express.json());

//to parse url encoded bodies
app.use(express.urlencoded({ extended: true }));

//bring in routes
const jsonRoutes = require("./controllers/routes/json-routes.js");
const mongoRoutes = require("./controllers/routes/mongo-routes.js");

//add routes to app
app.use("/json", jsonRoutes);
app.use("/mongo", mongoRoutes);

//start up server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});