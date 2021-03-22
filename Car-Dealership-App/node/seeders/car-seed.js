let mongoose = require("mongoose");
let Listing = require("../models/car.js");
const config = require("../config.js"); //bring in config

// Connect to MongoDB database
mongoose
  .connect(config.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
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

const listingSeed = [
  {
    name: "2021 BMW X-5",
    price: 49085,
    location: "Miami",
    seller: "James Johnson",
    image:
      "https://www.cstatic-images.com/supersized/in/v1/15416108/5UXTY5C03M9F93337/5a00d33ec4e7f967f25221b25663e38a.jpg",
  },
  {
    name: "2021 Acura TLX Technology",
    price: 44525,
    location: "Los Angeles",
    seller: "Shelly Shelson",
    image:
      "https://www.cstatic-images.com/supersized/in/v1/429408/19UUB6F40MA005192/a3a990d19b39d5326f499f16472b30ec.jpg",
  },
  {
    name: "2021 Chevrolet Silverado 2500 LTZ",
    price: 73744,
    location: "Denver",
    seller: "Henry McGiggles",
    image:
      "https://www.cstatic-images.com/supersized/in/v1/413644/1GC4YPEY8MF198041/c100548f537e70d8cbf8408aac2782f9.jpg",
  },
];

Listing.deleteMany({})
  .then(() => Listing.collection.insertMany(listingSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
