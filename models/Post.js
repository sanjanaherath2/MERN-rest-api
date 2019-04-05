const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require('shortid');

// Create Schema
const PostSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category_id:{
    type: String,
  },
  remarks: {
    type: String,
    required: true
  },
  publish:{
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  },
  created_time:{
    type: Date,
    default: Date.now
  },
  updated_time:{
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("posts", PostSchema);