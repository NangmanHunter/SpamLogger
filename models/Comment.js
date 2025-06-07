// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  ip: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
  token: String
});

module.exports = mongoose.model('Comment', commentSchema);
