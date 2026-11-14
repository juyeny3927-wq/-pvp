# 🧱 젠가 PvP

3인칭 3D 젠가 PvP. 블록 50개, 4자리 초대코드, 설치형 젠가 총/대포(자동 공격 + 직접 조종), 비밀 왕 블록, 젠가 스킨.

## 조작
WASD 이동 · Space 점프 · 좌클릭/E 설치·발사 · 우클릭/F 블록 회수 · R 회전
1 블록 · 2 총(3개) · 3 대포(6개) · 4 왕 블록 · Q 포탑 조종/해제 · T 스킨 변경

## 서버 실행 (친구와 같이 하기)
Node.js 18+ 필요.
```bash
npm install
npm start          # http://localhost:3000
```
1. 내가 `방 만들기` → 4자리 코드 확인 → 친구에게 전달
2. 친구가 같은 주소로 접속해 `코드로 입장`
- 같은 와이파이: 친구는 `http://내PC_IP:3000` 접속
- 인터넷: `npx cloudflared tunnel --url http://localhost:3000` 또는 ngrok 으로 공개 주소 생성

## 무료 호스팅 (Render 예시)
1. 이 폴더를 GitHub에 올림
2. render.com → New → Web Service → 저장소 선택
3. Build: `npm install` / Start: `npm start` → 발급된 URL을 친구와 공유

## GitHub Pages로 화면만 올리고 서버는 따로 둘 때
`https://계정.github.io/저장소/?server=wss://내서버주소` 로 접속 (서버 주소는 https면 wss://).

## GitHub에 올리기
```bash
git init -b main && git add -A && git commit -m "Jenga PvP"
git remote add origin https://github.com/계정/jenga-pvp.git
git push -u origin main
```
