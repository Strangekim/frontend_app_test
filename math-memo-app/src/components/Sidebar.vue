<template>
  <!-- 사이드바 오버레이 (모바일) -->
  <div
    v-if="isOpen"
    class="sidebar-overlay"
    @click="closeSidebar"
  ></div>

  <!-- 사이드바 -->
  <div class="sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">문제 선택</h2>
      <button
        class="close-btn icon-btn"
        @click="closeSidebar"
        aria-label="사이드바 닫기"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="sidebar-content">
      <!-- 학년별 메뉴 -->
      <div
        v-for="grade in grades"
        :key="grade.id"
        class="grade-section"
      >
        <button
          class="grade-button"
          :class="{ 'expanded': expandedGrade === grade.id }"
          @click="toggleGrade(grade.id)"
        >
          <span class="grade-title">{{ grade.name }}</span>
          <svg
            class="chevron-icon"
            :class="{ 'rotated': expandedGrade === grade.id }"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- 카테고리 목록 -->
        <div
          class="category-list"
          :class="{ 'expanded': expandedGrade === grade.id }"
        >
          <button
            v-for="category in grade.categories"
            :key="category.id"
            class="category-button"
            @click="selectCategory(grade, category)"
          >
            <span class="category-name">{{ category.name }}</span>
            <span class="problem-count">({{ category.problemCount }}문제)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:isOpen', 'selectProblem'],
  setup(props, { emit }) {
    // 현재 펼쳐진 학년
    const expandedGrade = ref(null)

    // 학년별 문제 카테고리 데이터
    const grades = ref([
      {
        id: 'grade1',
        name: '고1',
        categories: [
          { id: 'algebra', name: '다항식', problemCount: 0 },
          { id: 'equation', name: '방정식과 부등식', problemCount: 0 },
          {
            id: 'geometry',
            name: '도형의 방정식',
            problemCount: 1,
            problems: [
              {
                id: 'geo_001',
                problem_text: "세 모서리의 길이가 x−1, x+1, 2x+1인 직육면체의 겉넓이를 구하여라. (단, x > 1)",
                choices: [
                  "8x² + 4x − 2",
                  "8x² + 6x + 2",
                  "10x² + 4x − 2",
                  "10x² + 6x + 2",
                  "12x² + 8x − 2"
                ],
                category: "입체도형 · 겉넓이 · 다항식 전개",
                difficulty_1_to_100: 38,
                image: "/images/diagram_15_1.png",
                image_alt: "직육면체 모서리 길이 도식화"
              }
            ]
          },
          { id: 'function', name: '함수', problemCount: 0 }
        ]
      },
      {
        id: 'grade2',
        name: '고2',
        categories: [
          { id: 'trigonometry', name: '삼각함수', problemCount: 0 },
          { id: 'sequence', name: '수열', problemCount: 0 },
          { id: 'limit', name: '함수의 극한과 연속', problemCount: 0 },
          { id: 'derivative', name: '다항함수의 미분법', problemCount: 0 }
        ]
      },
      {
        id: 'grade3',
        name: '고3',
        categories: [
          { id: 'integral', name: '다항함수의 적분법', problemCount: 0 },
          { id: 'probability', name: '확률', problemCount: 0 },
          { id: 'statistics', name: '통계', problemCount: 0 },
          { id: 'complex', name: '복소수와 이차곡선', problemCount: 0 }
        ]
      }
    ])

    // 사이드바 닫기
    const closeSidebar = () => {
      emit('update:isOpen', false)
    }

    // 학년 펼치기/접기 토글
    const toggleGrade = (gradeId) => {
      expandedGrade.value = expandedGrade.value === gradeId ? null : gradeId
    }

    // 카테고리 선택 및 문제 요청
    const selectCategory = (grade, category) => {
      let problem = null

      // 문제가 있는 카테고리인지 확인
      if (category.problems && category.problems.length > 0) {
        // 첫 번째 문제 선택 (나중에 랜덤 선택 가능)
        problem = category.problems[0]
      }

      const problemData = {
        grade: grade.name,
        category: category.name,
        problem: problem
      }

      emit('selectProblem', problemData)
      console.log(`문제 요청: ${grade.name} - ${category.name}`, problem ? '문제 있음' : '문제 없음')
    }

    return {
      expandedGrade,
      grades,
      closeSidebar,
      toggleGrade,
      selectCategory
    }
  }
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background: var(--surface-color);
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 300;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.sidebar.is-open {
  transform: translateX(320px);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--background-color);
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  color: var(--text-secondary);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.grade-section {
  border-bottom: 1px solid var(--border-color);
}

.grade-button {
  width: 100%;
  padding: 16px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 16px;
}

.grade-button:hover {
  background-color: var(--background-color);
}

.grade-button.expanded {
  background-color: var(--background-color);
}

.grade-title {
  font-weight: 600;
  color: var(--text-primary);
}

.chevron-icon {
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.chevron-icon.rotated {
  transform: rotate(90deg);
}

.category-list {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: var(--background-color);
}

.category-list.expanded {
  max-height: 500px;
}

.category-button {
  width: 100%;
  padding: 12px 24px 12px 32px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
}

.category-button:hover {
  background-color: var(--surface-color);
}

.category-name {
  color: var(--text-primary);
  font-weight: 500;
}

.problem-count {
  color: var(--text-secondary);
  font-size: 12px;
}

/* 태블릿 가로뷰 중심 최적화 */
@media (min-width: 1024px) and (orientation: landscape) {
  .sidebar {
    width: 320px;
    left: -320px;
  }

  .sidebar.is-open {
    transform: translateX(320px);
  }

  .sidebar-title {
    font-size: 18px;
  }

  .grade-button {
    padding: 16px;
    font-size: 16px;
  }

  .category-button {
    padding: 12px 24px 12px 32px;
    font-size: 14px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar {
    width: 300px;
    left: -300px;
  }

  .sidebar.is-open {
    transform: translateX(300px);
  }

  .sidebar-title {
    font-size: 17px;
  }

  .grade-button {
    padding: 15px;
    font-size: 15px;
  }

  .category-button {
    padding: 11px 22px 11px 30px;
    font-size: 13px;
  }
}

@media (max-width: 767px) {
  .sidebar {
    width: 280px;
    left: -280px;
  }

  .sidebar.is-open {
    transform: translateX(280px);
  }

  .sidebar-title {
    font-size: 16px;
  }

  .grade-button {
    padding: 14px 16px;
    font-size: 15px;
  }

  .category-button {
    padding: 10px 20px 10px 28px;
  }
}
</style>