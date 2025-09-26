# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue.js 기반 수학 문제 풀이 메모 어플리케이션입니다. 태블릿 뷰에 최적화되어 있으며, 터치 및 마우스 입력을 지원하는 캔버스 기반 메모 기능을 제공합니다.

## Development Commands

```bash
# 개발 서버 실행
cd math-memo-app && npm run dev

# 빌드
cd math-memo-app && npm run build

# 린트 검사
cd math-memo-app && npm run lint
```

## Architecture

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: CSS3 Variables, Flexbox Layout
- **Canvas Drawing**: HTML5 Canvas API
- **Mobile Support**: Touch Events, Responsive Design
- **Mobile App**: Capacitor (설정 완료, 백엔드 연결 후 패키징 가능)

## Project Structure

```
math-memo-app/
├── src/
│   ├── components/          # Vue 컴포넌트들
│   │   ├── Sidebar.vue     # 접이식 네비게이션 사이드바
│   │   ├── Header.vue      # 상단 헤더
│   │   ├── ProblemArea.vue # 문제 표시 영역
│   │   ├── MemoCanvas.vue  # 메모 캔버스 (그리기 기능)
│   │   └── AnswerArea.vue  # 정답 입력 영역
│   ├── assets/
│   │   └── styles/
│   │       └── global.css  # 전역 스타일 (CSS Variables 활용)
│   ├── App.vue            # 메인 앱 컴포넌트
│   └── main.js           # 앱 진입점
├── public/               # 정적 파일들
├── capacitor.config.ts   # Capacitor 모바일 앱 설정
├── vite.config.js       # Vite 빌드 도구 설정
└── package.json         # 프로젝트 의존성 및 스크립트
```