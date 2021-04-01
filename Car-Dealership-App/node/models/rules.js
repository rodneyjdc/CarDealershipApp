const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ruleSchema = new Schema({
  make: {
    type: String,
    trim: true,
    required: "Enter make",
  },
  model: {
    type: String,
    required: "Choose a model",
  },
  year: {
    type: String,
    trim: true,
    required: "Enter year",
  }
});

const Rules = mongoose.model("Rules", ruleSchema);

module.exports = Rules;
