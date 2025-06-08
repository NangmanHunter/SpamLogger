
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

