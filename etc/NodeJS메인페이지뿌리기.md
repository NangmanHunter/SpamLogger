
##
app.js
- ```js
  // 📌 메인 페이지 라우트 추가
  app.get('/', (req, res) => {
    res.send(`
      <html>
        <head><title>My App</title></head>
        <body>
          <h1>환영합니다!</h1>
          <p>여기는 메인 페이지입니다.</p>
        </body>
      </html>
    `);
  });
  ```

##
app.js
- ```js
  // 📌 public 폴더에 있는 정적 파일 서빙
  app.use(express.static('public'));
  ```
public/index.html
- ```html
  <!-- public/index.html -->
  <!DOCTYPE html>
  <html>
    <head><title>My App</title></head>
    <body>
      <h1>Welcome!</h1>
      <p>This is served from index.html</p>
    </body>
  </html>
  ```
