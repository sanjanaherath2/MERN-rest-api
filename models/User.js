const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require('shortid');

// Create Schema
const UserSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title:{
    type: String,
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);