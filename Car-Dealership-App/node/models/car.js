const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter type and model of car",
  },
  price: {
    type: Number,
    required: "Enter asking price",
  },
  location: {
    type: String,
    trim: true,
    required: "Enter location of car",
  },
  seller: {
    type: String,
    trim: true,
    required: "Enter name of seller",
  },
  image: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", carSchema);

module.exports = Listing;
