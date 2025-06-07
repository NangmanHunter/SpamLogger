Postman사용

Postman 실행
POST 선택
주소 입력
- http://localhost:3000/comments
Body 탭 → raw 선택 → JSON 선택
```
{
  "text": "이건 테스트 댓글입니다."
}
```
Send 클릭!



터미널
```bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"이건 curl에서 보낸 댓글입니다.\"}"
```

js
```js
fetch('http://localhost:3000/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: '프론트엔드에서 보낸 댓글입니다.' })
})
.then(res => res.json())
.then(data => console.log('성공:', data))
.catch(err => console.error('실패:', err));
```


❌브라우저 주소창(URL 창)
- GET요청만지원
- POST, PUT, DELETE 등은 브라우저 자체에서는 클릭이나 코드로만 가능
- 브라우저URL창▶️✅GET
- 브라우저URL창▶️❌POST
- 브라우저URL창▶️❌PUT/PATCH
- 브라우저URL창▶️❌DELETE


DevTool
- Console
- fetch
```js
fetch('http://localhost:3000/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: '브라우저 콘솔에서 보낸 댓글입니다.' })
})
.then(res => res.json())
.then(data => console.log('✅ 성공:', data))
.catch(err => console.error('❌ 실패:', err));
``` 


HTML 버튼 + JS로 보내기
```html
<!DOCTYPE html>
<html>
<head>
  <title>댓글 보내기</title>
</head>
<body>
  <textarea id="text"></textarea>
  <button onclick="sendComment()">댓글 보내기</button>

  <script>
    function sendComment() {
      const text = document.getElementById('text').value;
      fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      .then(res => res.json())
      .then(data => console.log('✅ 성공:', data))
      .catch(err => console.error('❌ 실패:', err));
    }
  </script>
</body>
</html>
```