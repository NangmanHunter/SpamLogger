// routes/comments.js
const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const Comment = require('../models/Comment');



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

    const userToken = req.cookies.userToken;
    console.log("TokenCookie👉", userToken);

    const comments = await Comment.find().lean(); // lean()으로 plain object 반환
    const result = comments.map(comment => ({
      ...comment,
      isMine: comment.token === userToken
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: '댓글 조회 실패' });
  }
});

module.exports = router;






// 📌 댓글 수정 (PUT /comments/:id)
router.put('/:id', async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) return res.status(403).json({ error: '권한 없음' });

    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: '댓글 없음' });

    if (comment.token !== token) {
      return res.status(403).json({ error: '본인의 댓글만 수정할 수 있습니다' });
    }

    comment.text = req.body.text;
    const updated = await comment.save();
    res.json(updated);
  } catch (err) {
    console.error('댓글 수정 오류:', err);
    res.status(500).json({ error: '댓글 수정 실패' });
  }
});






// 📌 댓글 삭제 (DELETE /comments/:id)
router.delete('/:id', async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) return res.status(403).json({ error: '권한 없음' });

    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: '댓글 없음' });

    if (comment.token !== token) {
      return res.status(403).json({ error: '본인의 댓글만 삭제할 수 있습니다' });
    }

    await comment.deleteOne();
    res.json({ message: '댓글 삭제 완료' });
  } catch (err) {
    console.error('댓글 삭제 오류:', err);
    res.status(500).json({ error: '댓글 삭제 실패' });
  }
});