// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); // ✅ 추가
const commentRoutes = require('./routes/comments');

const app = express();
app.use(express.json());
app.use(cookieParser());

// 📌 MongoDB 메모리 서버로 연결
async function startServer() {
  try {
    const mongod = await MongoMemoryServer.create(); // ✅ 메모리 서버 생성
    const uri = mongod.getUri(); // ✅ 연결 URI 가져오기

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Memory MongoDB 연결됨:', uri);

    // 📌 라우터 및 정적 파일 설정
    app.use('/comments', commentRoutes);
    app.use(express.static('public'));

    // 📌 서버 시작
    app.listen(3000, () => {
      console.log('🚀 서버 실행 중: http://localhost:3000');
    });

  } catch (err) {
    console.error('❌ 메모리 MongoDB 연결 실패:', err);
  }
}

startServer();