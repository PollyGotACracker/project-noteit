# NoteIT

- 단일 주제의 여러 핵심 키워드를 스스로 정리하고 반복 학습하는 애플리케이션
- 학습용 개인 프로젝트

## 배포 주소

- <s>`https://noteit.kro.kr`</s>
- AWS EC2, RDS

## 주요 기능

- 단어장에 주제와 세부 키워드, 이미지를 포함한 상세 설명
- 카테고리, 주제 북마크
- 타이머 설정, 단답식 퀴즈와 점수 표시
- 주제별 / 키워드별 틀린 횟수 표시
- 점수 기록 그래프 표시
- 중요도, 마감일을 포함한 투두리스트
- 사용자 지정 시각 PUSH 알림
- PWA 앱 설치

## 부가 기능

- 반응형 UI
- 비밀번호 찾기
- 페이지 프린트
- 프로필 관리
- 배경 음악
- 다크 모드
- 단어장 검색

## [Troubleshooting 목록](/documents/troubleshooting.md)

## [기타 공부 목록](/documents/note.md)

## 실행 화면

![dashboard](https://github.com/PollyGotACracker/project-noteit/assets/92136750/2bc4d462-3785-44e6-a403-abb7cdbf16d6)
![quiz](https://github.com/PollyGotACracker/project-noteit/assets/92136750/3ecb2f2c-6c8d-419d-81e0-d329af05e667)
![responsive](https://github.com/PollyGotACracker/project-noteit/assets/92136750/a80d1c60-fbbe-4c3e-b5a8-3af3e62b8c80)
![noteit](https://github.com/PollyGotACracker/project-noteit/assets/92136750/40b4158d-2c21-476f-a4d9-088c35ed726e)
![noteit-pwa](https://github.com/PollyGotACracker/project-noteit/assets/92136750/01a57cc8-0478-421e-a4d1-5e26090d6f71)

## 실행 방법

1. MySQL Workbench 에서 인스턴스 및 데이터베이스 생성
   - 인스턴스 접속 후 ctrl + enter 로 아래 쿼리 실행

```sql
CREATE DATABASE noteit;
USE noteit;
```

2. [Redis](https://redis.com/) 사이트에서 데이터베이스 생성  
   (session store 용도)
3. `.env.sample` 파일의 환경변수 설정 후 `.env` 로 파일명 변경

   - 파일 위치는 server 폴더 안에 있어야 함
   - 만약 환경변수 값에 공백이 있을 경우 따옴표로 묶을 것
   - SEQUELIZE: MySQL Workbench 인스턴스의 hostname(127.0.0.1), username, password, database
   - REDIS: Redis 데이터베이스의 url, port, password  
     url 과 port 는 endpoint 에서 : 을 기준으로 분리하여 작성(: 는 작성하지 않음)
   - SESSION 및 JWT: 임의의 문자열 지정
   - EMAIL: `email_sending.js` 를 위한 이메일 및 앱 비밀번호
   - VAPID: `web_push.js` 를 위한 vapid key 값

   ```js
   import webpush from "web-push";
   const vapidKeys = webpush.generateVAPIDKeys();
   console.log(vapidKeys.publicKey);
   console.log(vapidKeys.privateKey);
   ```

4. 만약 yarn 이 설치되지 않았을 경우 아래 명령어 실행

```bash
npm install -g yarn
yarn --version
```

5. 프로젝트 root 경로, client, server 에서 각각 `yarn install` 실행
6. 터미널 두 개를 열고 각각 프로젝트 root 경로에서 `yarn run server`, `yarn run client` 실행
