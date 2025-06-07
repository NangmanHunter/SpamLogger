// app.js
const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const commentRoutes = require('./routes/comments');

const app = express();
app.use(express.json());
app.use(cookieParser());

// 📌 MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB 연결됨'))
.catch(err => console.error('❌ MongoDB 연결 실패:', err));

// 📌 라우터 연결
app.use('/comments', commentRoutes);


// 📌 public 폴더에 있는 정적 파일 서빙
app.use(express.static('public'));


// 서버 시작
app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});



