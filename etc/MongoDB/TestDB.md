
## 
mongodb-memory-server
- ```bash
  npm install mongodb-memory-server
  ```
- 메모리 상에 MongoDB 인스턴스를 실행
- 프로세스가 종료되면 → 모든 데이터가 사라짐


MongoDB Atlas (클라우드 MongoDB)
- MongoDB를 직접 설치하지 않고, 
- MongoDB Atlas에서 무료로 클라우드 MongoDB 클러스터

Docker	
- 설치 대신 Docker로 mongo 이미지를 띄우는 방법. 
- docker run -p 27017:27017 mongo

메모리
- 대체	정말 간단한 경우에는 DB 없이 메모리 배열에 저장

localStorage
- 브라우저에서는 localStorage로 대체

##
GUI
- Docker
- 로컬 Mongo

##
후보군
- Memory
- Docker


최경량
- Memory
- Memory>>Docker



## Memory방식
- ❌ 일반적인 접근 불가	외부 CLI나 GUI 툴로 접근하려면 추가 설정 필요

Docker
- 빠른 로컬 개발 & 눈으로 데이터 보기	
- Docker로 MongoDB 띄우기 🐳
- GUI로 데이터 보기	
- Docker + MongoDB Compass 연결
- 실제 MongoDB처럼 테스트	
- Docker + 초기 스크립트 실행 (init.js)