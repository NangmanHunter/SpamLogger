// routes/comments.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 📌 Mongoose 모델 정의
const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// 📌 댓글 생성 라우트 (POST /comments)
router.post('/', async (req, res) => {
  try {
    const comment = new Comment({ text: req.body.text });
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: '댓글 저장 실패' });
  }
});

// 📌 댓글 목록 조회 라우트 (GET /comments)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: '댓글 조회 실패' });
  }
});

module.exports = router;
