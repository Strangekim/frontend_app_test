# 수학 메모 어플

Vue.js를 활용한 태블릿 최적화 수학 문제 풀이 및 메모 어플리케이션입니다.

## 주요 기능

- 📚 학년별(고1, 고2, 고3) 문제 분류
- 📝 카테고리별 문제 선택
- ✍️ 터치 및 마우스 지원 메모 캔버스
- 🎨 다양한 색상과 펜 굵기 지원
- ↩️ 실행 취소/다시 실행 기능
- 🧹 지우개 도구
- 📱 태블릿 뷰 반응형 디자인
- 🎯 정답 입력 및 제출 기능

## 개발 환경

- Vue.js 3
- Vite
- HTML5 Canvas API

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/
│   ├── Sidebar.vue        # 네비게이션 사이드바
│   ├── Header.vue         # 헤더 컴포넌트
│   ├── ProblemArea.vue    # 문제 표시 영역
│   ├── MemoCanvas.vue     # 메모 캔버스
│   └── AnswerArea.vue     # 정답 입력 영역
├── assets/
│   └── styles/
│       └── global.css     # 전역 스타일
├── App.vue               # 메인 앱 컴포넌트
└── main.js              # 앱 진입점
```

## 향후 개발 계획

- 백엔드 API 연결
- 문제 데이터 관리
- 사용자 답안 검증 로직
- Capacitor를 통한 모바일 앱 패키징

## 기술 스택

- **Frontend**: Vue.js 3, HTML5 Canvas
- **Build Tool**: Vite
- **Styling**: CSS3, CSS Variables
- **Mobile**: 터치 이벤트 지원, 반응형 디자인