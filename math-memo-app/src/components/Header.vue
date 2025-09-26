<template>
  <header class="header">
    <div class="header-left">
      <!-- 메뉴 버튼 -->
      <button
        class="menu-btn icon-btn"
        @click="toggleSidebar"
        aria-label="메뉴 열기/닫기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- 현재 선택된 문제 정보 -->
      <div class="problem-info" v-if="selectedGrade && selectedCategory">
        <span class="grade-badge">{{ selectedGrade }}</span>
        <span class="category-text">{{ selectedCategory }}</span>
      </div>
      <div class="problem-info" v-else>
        <span class="placeholder-text">문제를 선택해주세요</span>
      </div>
    </div>

    <div class="header-right">
      <!-- 문제 새로고침 버튼 -->
      <button
        class="refresh-btn icon-btn"
        @click="refreshProblem"
        :disabled="!selectedGrade || !selectedCategory"
        aria-label="새 문제 받기"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 2V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 12C3 12 5 10 8 10C12 10 16 14 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M21 12C21 12 19 14 16 14C12 14 8 10 8 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 22V16H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false
    },
    selectedGrade: {
      type: String,
      default: ''
    },
    selectedCategory: {
      type: String,
      default: ''
    }
  },
  emits: ['update:sidebarOpen'],
  setup(props, { emit }) {
    // 사이드바 토글 함수
    const toggleSidebar = () => {
      emit('update:sidebarOpen', !props.sidebarOpen)
    }

    // 문제 새로고침 함수
    const refreshProblem = () => {
      // TODO: 백엔드 연결 시 새로운 문제를 요청하는 로직 구현
      console.log('새 문제 요청:', props.selectedGrade, props.selectedCategory)
    }

    return {
      toggleSidebar,
      refreshProblem
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}

.menu-btn {
  color: var(--text-primary);
  margin: 0;
  border-radius: 0;
  padding: 16px;
  width: auto;
  height: auto;
  box-shadow: none;
  border-right: 1px solid var(--border-color);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.menu-btn:hover {
  background-color: var(--background-color);
  transform: none;
  box-shadow: none;
}

.problem-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 0 8px;
}

.grade-badge {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.category-text {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
}

.placeholder-text {
  color: var(--text-secondary);
  font-size: 14px;
}

.refresh-btn {
  color: var(--text-secondary);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn:hover:not(:disabled) {
  color: var(--primary-color);
}

/* 태블릿 가로뷰 중심 반응형 */
@media (min-width: 1024px) and (orientation: landscape) {
  .header-right {
    padding: 12px 20px;
  }

  .menu-btn {
    padding: 16px 20px;
  }

  .problem-info {
    padding: 0 20px 0 8px;
  }

  .category-text {
    font-size: 15px;
  }

  .placeholder-text {
    font-size: 15px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .header-right {
    padding: 10px 16px;
  }

  .menu-btn {
    padding: 14px 16px;
  }

  .problem-info {
    padding: 0 16px 0 8px;
  }

  .category-text {
    font-size: 14px;
  }

  .placeholder-text {
    font-size: 14px;
  }
}

@media (max-width: 767px) {
  .header-right {
    padding: 8px 12px;
  }

  .menu-btn {
    padding: 12px;
  }

  .problem-info {
    padding: 0 12px 0 8px;
  }

  .category-text {
    font-size: 13px;
  }

  .placeholder-text {
    font-size: 13px;
  }
}
</style>