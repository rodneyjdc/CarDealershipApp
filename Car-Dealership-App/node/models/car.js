const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  // name: {
  //   type: String,
  //   trim: true,
  //   required: "Enter type and model of car",
  // },
  // price: {
  //   type: Number,
  //   required: "Enter asking price",
  // },
  // location: {
  //   type: String,
  //   trim: true,
  //   required: "Enter location of car",
  // },
  // seller: {
  //   type: String,
  //   trim: true,
  //   required: "Enter name of seller",
  // },
  // image: {
  //   type: String,
  //   trim: true,
  // },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
  owner: {
    type: String,
    trim: true,
    required: "Enter owner of car",
  },
  make: {
    type: String,
    trim: true,
    required: "Enter make of car",
  },
  model: {
    type: String,
    trim: true,
    required: "Enter model of car",
  },
  year: {
    type: Number,
    trim: true,
    required: "Enter year of car",
  },
  color: {
    type: String,
    trim: true,
    required: "Enter color of car",
  },
  price: {
    type: Number,
    required: "Enter asking price",
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
