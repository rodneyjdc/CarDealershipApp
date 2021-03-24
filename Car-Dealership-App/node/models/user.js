const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "Enter your first name",
  },
  lastName: {
    type: String,
    required: "Enter your last name",
  },
  email: {
    type: String,
    trim: true,
    required: "Enter your email",
  },
  username: {
    type: String,
    trim: true,
    required: "Enter your username",
  },
  password: {
    type: String,
    trim: true,
    required: "Enter password",
  },
  role: {
    type: String,
    trim: true   
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
