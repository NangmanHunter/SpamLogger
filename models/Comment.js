// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now },
  text: String,
  isMine: Boolean
});

module.exports = mongoose.model('Comment', commentSchema);
