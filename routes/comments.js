// routes/comments.js
const express = require('express');
const router = express.Router();



const { v4: uuidv4 } = require('uuid');

// 📌 Mongoose 모델 정의
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now },
  text: String
});

const Comment = mongoose.model('Comment', commentSchema);

// 📌 댓글 생성 라우트 (POST /comments)
router.post('/', async (req, res) => {
  try {
    let token = req.cookies.userToken;
    if (!token) {
        token = uuidv4(); 
        res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // 1년 저장
    }

    const comment = new Comment({ 
      text: req.body.text,
      token: token
    });


    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('댓글 저장 오류:', err); // ✅ 에러 로깅도 추가
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
