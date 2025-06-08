

## 매번
- 최초검사vs.매번검사
- 최초vs.매번
- 최초<<매번
- 매번>>최초

HTTP는 stateless(무상태)
클라이언트가 상태 정보를 계속 보내줘야함
서버는 매 요청마다 해당 쿠키로 사용자 확인(req.cookies.token)


이런 식으로 매번 비교는 하지만 불필요한 반복 작업은 아니고,
웹이 stateless(무상태)이기 때문에 항상 필요한 단계
- 목록 보여줄 때 쿠키 검사 매번 해야 하나요? ✅ 네. 하지만 자연스럽고 성능 부담도 거의 없습니다.

## 서버
- 클라이언트측검사vs.서버측검사
- 클라이언트검사vs.서버검사

클라이언트 vs 서버 어디서 검사하나요?	
- 둘 다 가능. 보통은 클라이언트에서 쿠키 읽어서 댓글 token과 비교함.

더 안전하게 하려면?
- 서버에서 isMine 계산해서 내려주면 클라이언트 조작 위험 줄일 수 있어요.

❌Token
- 토큰다노출
- 정보노출
- 비최적
- 비연산최적

✅isMine
- Flag형태
- 한번감싸기


즉,
- 클라이언트검사
- 서버isMine제공



isMine
- ❌DB
  - ❌Model
- ✅서버
  - 가공해서붙임.

isMine붙이기
```js
const comments = await Comment.find();

res.json(comments);
```
```js
const comments = await Comment.find().lean(); // lean()으로 plain object 반환
const result = comments.map(comment => ({
  ...comment,
  isMine: comment.token === userToken
}));

res.json(result);
```



##
token
- ❌클라이언트제공
- ✅서버에서만검사

검사지표
- ❌isMine
  - 사용자조작가능
  - ❌신뢰
  - ✅버튼만제공
- token
  - 실제서버에서판단
  - token도받아다판단
  - token도긁어다판단

즉,
- isMine
  - 형식판단
- token
  - 실질판단
두번판단


token제공
- ✅본인Token만제공
- ❌타인Token제공

혹은
- ❌본인Token도제공
- 보안상더좋음.
- Token그냥
- 뒷단에서만처리ㄱㄱ.


id↔️token
- ✅id제공
  - ✅_id
- ❌token제공
  - ❌token




## 보안강화
1. 쿠키 토큰에 서명 추가	
   1. 예: uuid.sign(secret) → 위조 불가	중간 보안
2. 토큰에 IP나 User-Agent 추가	
   1. token이 브라우저+기기 고유	
   2. 위조 어렵게
3. JWT 사용	
   1. 서버에서 위조 여부 검증 가능	
   2. 강력
4. 로그인 기반 인증	
   1. 이메일/ID 기반 로그인	
   2. 최강 보안, 단 익명 아님






## EventDelegation
DirectBinding
```js
function GetComment() {
    fetch('http://localhost:3000/comments')
        .then(res => res.json())
        .then(data => {
            let GetHtml = ``;
            data.forEach(element => {
                GetHtml += `<li>
                    <small class="IdComment" hidden>${element._id}</small>
                    <small>${element.createdAt}</small>
                    <span class="TextComment">${element.text}</span>
                    ${element.isMine ? `
                        <button class="Put">🔨</button>
                        <button class="Delete">❌</button>
                    ` : ``}
                </li>`;
            });
            GetHtml = `<ul>${GetHtml}</ul>`;
            document.getElementById('GetComment').innerHTML = GetHtml;

            // ⭐ 여기서 이벤트 리스너 다시 붙이기
            document.querySelectorAll('.Put').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const parent = this.parentElement;
                    const id = parent.querySelector('.IdComment').textContent;
                    const t = parent.querySelector('.TextComment').textContent;

                    fetch(`http://localhost:3000/comments/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text: t })
                    })
                        .then(res => res.json())
                        .then(data => {
                            GetComment();
                        });
                });
            });

            document.querySelectorAll('.Delete').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const parent = this.parentElement;
                    const id = parent.querySelector('.IdComment').textContent;

                    fetch(`http://localhost:3000/comments/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => res.json())
                        .then(data => {
                            GetComment();
                        });
                });
            });

        })
        .catch(err => console.error('실패:', err));
}
```

EventDelegation
```js
document.getElementById('GetComment').addEventListener('click', function (e) {
    if (e.target.classList.contains('Put')) {
        const parent = e.target.parentElement;
        const id = parent.querySelector('.IdComment').textContent;
        const t = parent.querySelector('.TextComment').textContent;

        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: t })
        })
            .then(res => res.json())
            .then(data => {
                GetComment();
            });
    }

    if (e.target.classList.contains('Delete')) {
        const parent = e.target.parentElement;
        const id = parent.querySelector('.IdComment').textContent;

        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                GetComment();
            });
    }
});
```