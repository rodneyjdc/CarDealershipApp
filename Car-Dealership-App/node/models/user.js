const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const validator = require("validator");

const Schema = mongoose.Schema;

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Name should contain alpha-numeric characters only',
  }),
]

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Email is not in correct format.'
  }),
]

var usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 15],
    message: 'Userame should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Username should contain alpha-numeric characters only',
  }),
]

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First name is required",
    validate: nameValidator
  },
  lastName: {
    type: String, 
    required: "Last name is required",
    validate: nameValidator
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    validate: emailValidator
  },
  username: {
    type: String,
    trim: true,
    required: "Username is required",
    validate: usernameValidator
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required",
    validate: [(val) => validator.isStrongPassword(val),
                  `Password must at least be 8 chars long, at least have 1 lowercase, at least have 1 uppercase, at least have 1 number, at least have 1 symbol`]
  },
  role: {
    type: String,
    trim: true,
    required: "Role is required"   
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
