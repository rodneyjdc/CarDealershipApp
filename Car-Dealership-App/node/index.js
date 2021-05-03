// const mongoose = require("mongoose"); //bring in Mongo
const config = require("./config.js"); //bring in config
const db = require("./data/dbConnect.js");

// Connect to MongoDB database
// mongoose.connect('mongodb://localhost:27017/mycardealership', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true})
// .then(() => {
//   console.log("successfully connected to the database");
// })
// .catch((err) => {
//   console.log("error connecting to the database", err);
//   process.exit();
// });

//bring in express
const express = require("express");

//create instance of express
const app = express();

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
// const mongoRoutes = require("./controllers/routes/mongo-routes.js");
const mongoUsersRoute = require("./controllers/routes/mongo-routes/users-routes.js");
const mongoCarsRoute = require("./controllers/routes/mongo-routes/cars-routes.js");

//add routes to app
app.use("/json", jsonRoutes);
// app.use("/mongo", mongoRoutes);
app.use("/mongo", mongoUsersRoute);
app.use("/mongo", mongoCarsRoute);

//specify port
const port = 5000;

// Connect to MongoDB database
db.connect()
  .then(() => {
    if (!(process.env.NODE_ENV === 'test')) {
      console.log("successfully connected to the database");
    }
    //start up server
    app.listen(port, () => {
      if (!(process.env.NODE_ENV === 'test')) {
        console.log(`listening at http://localhost:${port}`);
      }
    });
  })
  .catch((err) => {
    if (!(process.env.NODE_ENV === 'test')) {
      console.log("error connecting to the database", err);
    }
    process.exit();
  });

module.exports = app;
