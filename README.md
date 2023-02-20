## Chat App

---

## 폴더 구조

```
📦maumlab-frontend-test
 ┣ 📂main
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📜create-window.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜background.ts
 ┣ 📂renderer
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┗ 📜ChatRoomItem.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜Layout.tsx
 ┃ ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┃ ┣ 📜MenuSideBar.tsx
 ┃ ┃ ┃ ┣ 📜Textarea.tsx
 ┃ ┃ ┃ ┣ 📜TextInput.tsx
 ┃ ┃ ┃ ┗ 📜Title.tsx
 ┃ ┃ ┣ 📂groupChat
 ┃ ┃ ┃ ┗ 📜GroupChatRoomItem.tsx
 ┃ ┃ ┗ 📂message
 ┃ ┃ ┃ ┣ 📜MessageItem.tsx
 ┃ ┃ ┃ ┗ 📜MessageList.tsx
 ┃ ┣ 📂context
 ┃ ┃ ┣ 📜Auth.tsx
 ┃ ┃ ┗ 📜AuthedRoute.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useGetOnSnapShotDoc.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┣ 📂group
 ┃ ┃ ┃ ┃ ┗ 📜[uid].tsx
 ┃ ┃ ┃ ┗ 📜[uid].tsx
 ┃ ┃ ┣ 📂my
 ┃ ┃ ┃ ┗ 📜[user].tsx
 ┃ ┃ ┣ 📜chatlist.tsx
 ┃ ┃ ┣ 📜groupchatlist.tsx
 ┃ ┃ ┣ 📜home.tsx
 ┃ ┃ ┣ 📜login.tsx
 ┃ ┃ ┣ 📜signup.tsx
 ┃ ┃ ┗ 📜_app.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜globals.css
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜AuthContext.ts
 ┃ ┃ ┣ 📜ChatRoom.ts
 ┃ ┃ ┣ 📜Children.ts
 ┃ ┃ ┣ 📜Message.ts
 ┃ ┃ ┣ 📜TextInput.ts
 ┃ ┃ ┗ 📜UserInfo.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜firebase.ts
 ┃ ┃ ┗ 📜validator.ts
 ┣ 📂resources
 ┃ ┣ 📜icon.icns

```

---

## 폴더 구조 설명

- ### main

  윈도우 창 크기 설정등을 하며, next.js를 Electron 애플리케이션으로 내보내는 역할을 합니다

- ### renderer

  - **components**

    각 pages에 필요한 컴포넌트를 기능별로 분리하여 저장합니다.

    - chat - 개인 채팅방 목록
    - groupChat - 그룹 채팅방 목록
    - message - 채팅창 내 메시지
    - commom - input, textarea, title 등 자주 사용하는 컴포넌트

  - **context**

    전역으로 사용하는 사용자정보등을 Context로 분리하고 사용자 인증 여부를 확인합니다.

  - **hook**

    파이어베이스에서 실시간으로 데이터를 가져오는 코드를 custom-hook으로 분리했습니다.

  - **style**

    자주사용하는 스타일을 global.css 파일에 담아두었습니다.

  - **utils**

    파이어베이스의 데이터를 수정, 삭제하는 함수와 로그인, 회원가입에 필요한 유효성 검사 관련 함수들을 모아두었습니다.

---

## 기능

- **회원가입 / 로그인**

  파이어베이스의 인증을 이용해서 구현하였습니다. 이메일 중복, 비밀번호 6자리 이하등의 유효성 검사를 통해 로그인되면 파이어베이스 onAuthStateChanged 메서드를 이용하여 사용자 정보 변화를 감지하고 context를 이용해 사용자 정보를 전역으로 관리합니다.

- **유저 목록**

  회원가입된 유저 목록을 불러오며 외부 이미지API를 이용하여 랜덤으로 사용자에게 프로필 이미지를 제공합니다.

- **1:1채팅 / 그룹 채팅**

  유저목록에서 유저를 클릭하면 1:1대화가 가능하며 또는 유저목록 페이지에서 채팅추가버튼을 사용해 1:1채팅과 그룹채팅방을 만들 수 있습니다.

- **유저 페이지**

  자신의 이름, 이메일, 프로필등을 확인합니다.

---

## 채팅 구현 영상

![2023-01-18 17;11;07](https://user-images.githubusercontent.com/90600892/213118115-2fb62fdf-dce4-4d9c-8ae5-a623f946fee1.gif)
