<template>
  <div class="app">
    <!-- 네비게이션 바 -->
    <Sidebar
      v-model:isOpen="sidebarOpen"
      @selectProblem="handleProblemSelect"
    />

    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <!-- 헤더 -->
      <Header
        v-model:sidebarOpen="sidebarOpen"
        :selectedGrade="selectedGrade"
        :selectedCategory="selectedCategory"
      />

      <!-- 가로뷰 콘텐츠 영역 -->
      <div class="content-area">
        <!-- 문제 영역 -->
        <div class="problem-section">
          <ProblemArea
            :problem="currentProblem"
            :selectedGrade="selectedGrade"
            :selectedCategory="selectedCategory"
            @openSidebar="sidebarOpen = true"
            @addImageToCanvas="handleAddImageToCanvas"
          />
        </div>

        <!-- 메모 및 정답 영역 -->
        <div class="memo-section">
          <!-- 메모 캔버스 -->
          <MemoCanvas ref="memoCanvas" />

          <!-- 정답란 -->
          <AnswerArea />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import ProblemArea from './components/ProblemArea.vue'
import MemoCanvas from './components/MemoCanvas.vue'
import AnswerArea from './components/AnswerArea.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    ProblemArea,
    MemoCanvas,
    AnswerArea
  },
  setup() {
    // 사이드바 상태
    const sidebarOpen = ref(false)

    // 선택된 문제 정보
    const selectedGrade = ref('')
    const selectedCategory = ref('')
    const currentProblem = ref(null)

    // 메모 캔버스 참조
    const memoCanvas = ref(null)

    // 문제 선택 핸들러
    const handleProblemSelect = (problemData) => {
      selectedGrade.value = problemData.grade
      selectedCategory.value = problemData.category
      currentProblem.value = problemData.problem
      sidebarOpen.value = false // 문제 선택 후 사이드바 닫기
    }

    // 이미지를 메모 캔버스에 추가하는 핸들러
    const handleAddImageToCanvas = (imageData) => {
      if (memoCanvas.value && memoCanvas.value.addOverlayImage) {
        memoCanvas.value.addOverlayImage(imageData)
      }
    }

    return {
      sidebarOpen,
      selectedGrade,
      selectedCategory,
      currentProblem,
      memoCanvas,
      handleProblemSelect,
      handleAddImageToCanvas
    }
  }
}
</script>

<style scoped>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
  overflow: hidden;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.problem-section {
  flex: none;
}

.memo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 태블릿 가로뷰 중심 최적화 */
@media (min-width: 1024px) and (orientation: landscape) {
  .main-content {
    margin-left: 0;
  }

  .app {
    height: 100vh;
    overflow: hidden;
  }

  .content-area {
    flex-direction: row;
  }

  .problem-section {
    flex: 3;
    display: flex;
    flex-direction: column;
    min-width: 0;
    border-right: 1px solid var(--border-color);
  }

  .memo-section {
    flex: 7;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .main-content {
    margin-left: 0;
  }
}

@media (max-width: 767px) {
  .main-content {
    width: 100%;
  }

  .app {
    height: 100vh;
    overflow: hidden;
  }
}
</style>