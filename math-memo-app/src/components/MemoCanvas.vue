<template>
  <div class="memo-canvas-container">
    <!-- 도구 모음 -->
    <div class="toolbar">
      <div class="toolbar-section">
        <!-- 그리기 도구 -->
        <button
          class="tool-btn icon-btn"
          :class="{ active: currentTool === 'pen' }"
          @click="setTool('pen')"
          aria-label="펜 도구"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5C19 5.53043 18.7893 6.03914 18.4142 6.41421L10.5 14.3L7.70711 11.5071C7.31658 11.1166 7.31658 10.4834 7.70711 10.0929L15.5858 2.20711C15.9609 1.83204 16.4696 1.62132 17 1.62132C17.5304 1.62132 18.0391 1.83204 18.4142 2.20711L21.7929 5.58579C22.1834 5.97631 22.1834 6.60948 21.7929 7L14.3 14.5L12 21L6.2 15.2C5.4 14.4 5.4 13.1 6.2 12.3L14.1 4.4C14.5 4 15 3.8 15.5 3.8C16 3.8 16.5 4 16.9 4.4L17 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          class="tool-btn icon-btn"
          :class="{ active: currentTool === 'eraser' }"
          @click="setTool('eraser')"
          aria-label="지우개"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20H8L2.6 14.6C2.4 14.4 2.4 14.1 2.6 13.9L8.9 7.6C9.1 7.4 9.4 7.4 9.6 7.6L16.4 14.4C16.6 14.6 16.6 14.9 16.4 15.1L11 20.5H20V20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          class="tool-btn icon-btn"
          :class="{ active: currentTool === 'hand' }"
          @click="setTool('hand')"
          aria-label="손도구"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 11V6C18 5.46957 17.7893 4.96086 17.4142 4.58579C17.0391 4.21071 16.5304 4 16 4C15.4696 4 14.9609 4.21071 14.5858 4.58579C14.2107 4.96086 14 5.46957 14 6V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 7V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 7V4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 10V16C6 17.0609 6.42143 18.0783 7.17157 18.8284C7.92172 19.5786 8.93913 20 10 20H16C17.0609 20 18.0783 19.5786 18.8284 18.8284C19.5786 18.0783 20 17.0609 20 16V11C20 10.4696 19.7893 9.96086 19.4142 9.58579C19.0391 9.21071 18.5304 9 18 9C17.4696 9 16.9609 9.21071 16.5858 9.58579C16.2107 9.96086 16 10.4696 16 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- 선 굵기 -->
        <div class="stroke-width-control">
          <label class="control-label">굵기</label>
          <input
            type="range"
            v-model="strokeWidth"
            min="1"
            max="20"
            class="stroke-slider"
            @input="updateStrokeWidth"
          />
          <span class="stroke-value">{{ strokeWidth }}</span>
        </div>
      </div>

      <div class="toolbar-section">
        <!-- 색상 팔레트 -->
        <div class="color-palette">
          <div class="color-grid">
            <button
              v-for="color in colors"
              :key="color"
              class="color-btn"
              :class="{ active: currentColor === color }"
              :style="{ backgroundColor: color }"
              @click="setColor(color)"
              :aria-label="`색상: ${color}`"
            ></button>
          </div>

          <!-- 커스텀 색상 선택기 -->
          <div class="custom-color">
            <input
              type="color"
              v-model="customColor"
              @change="setColor(customColor)"
              class="color-picker"
              aria-label="커스텀 색상"
            />
          </div>
        </div>
      </div>

      <div class="toolbar-section">
        <!-- 확대/축소 -->
        <button
          class="action-btn icon-btn"
          @click="zoomIn"
          aria-label="확대"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <button
          class="action-btn icon-btn"
          @click="zoomOut"
          aria-label="축소"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

      </div>

      <div class="toolbar-section">
        <!-- 실행 취소/다시 실행 -->
        <button
          class="action-btn icon-btn"
          @click="undo"
          :disabled="!canUndo"
          aria-label="실행 취소"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7V3H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 13C21 17.9706 16.9706 22 12 22C8.6863 22 5.81726 20.2404 4.23891 17.6011" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.05115 6.39892C4.62949 3.75965 7.49854 2 11 2C15.9706 2 20 6.02944 20 11V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          class="action-btn icon-btn"
          @click="redo"
          :disabled="!canRedo"
          aria-label="다시 실행"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7V3H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 11C3 6.02944 7.02944 2 12 2C15.3137 2 18.1827 3.75965 19.7611 6.39892" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.9489 17.6011C19.3705 20.2404 16.5015 22 13 22C8.02944 22 4 17.9706 4 13V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- 전체 지우기 -->
        <button
          class="action-btn icon-btn clear-all"
          @click="clearAll"
          aria-label="전체 지우기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2"/>
            <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-section">
        <!-- 데이터 수집 상태 -->
        <div class="data-collection-info">
          <div class="data-stats">
            <span class="stat-item">
              <span class="stat-label">스트로크:</span>
              <span class="stat-value">{{ sessionData.strokes.length }}</span>
            </span>
            <span class="stat-item">
              <span class="stat-label">이벤트:</span>
              <span class="stat-value">{{ sessionData.events.length }}</span>
            </span>
          </div>
          <div class="capabilities">
            <span class="capability" :class="{ active: sessionData.capabilities.pressure }">압력</span>
            <span class="capability" :class="{ active: sessionData.capabilities.tilt }">기울기</span>
            <span class="capability" :class="{ active: sessionData.capabilities.twist }">비틀기</span>
          </div>
        </div>

        <!-- JSON 다운로드 버튼 -->
        <button
          class="action-btn download-btn"
          @click="downloadSessionData"
          aria-label="JSON 데이터 다운로드"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="download-text">JSON 다운로드</span>
        </button>
      </div>
    </div>

    <!-- 캔버스 영역 -->
    <div class="canvas-container" ref="canvasContainer" :class="{ 'eraser-cursor': currentTool === 'eraser' }" :style="eraserCursorStyle">
      <!-- 가이드 라인 -->
      <div class="guide-lines">
        <!-- 수평선들 -->
        <div
          v-for="i in horizontalLines"
          :key="'h' + i"
          class="guide-line horizontal"
          :style="{ top: (i * 40) + 'px' }"
        ></div>

        <!-- 수직선들 -->
        <div
          v-for="i in verticalLines"
          :key="'v' + i"
          class="guide-line vertical"
          :style="{ left: (i * 40) + 'px' }"
        ></div>
      </div>

      <!-- 정답 영역 표시 -->
      <div class="answer-zone">
        <div class="answer-zone-header">
          <span class="answer-zone-label">정답</span>
        </div>
        <div class="answer-zone-content">
          <span class="answer-zone-placeholder">여기에 최종 답안을 작성하세요</span>
        </div>
      </div>

      <canvas
        ref="canvas"
        class="memo-canvas"
        :data-tool="currentTool"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="startDrawing"
        @mousemove="handleMouseMove"
        @mouseup="stopDrawing"
      ></canvas>

      <!-- 캔버스 안내 텍스트 -->
      <div v-if="!hasDrawn" class="canvas-guide">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5C19 5.53043 18.7893 6.03914 18.4142 6.41421L10.5 14.3L7.70711 11.5071C7.31658 11.1166 7.31658 10.4834 7.70711 10.0929L15.5858 2.20711C15.9609 1.83204 16.4696 1.62132 17 1.62132C17.5304 1.62132 18.0391 1.83204 18.4142 2.20711L21.7929 5.58579C22.1834 5.97631 22.1834 6.60948 21.7929 7L14.3 14.5L12 21L6.2 15.2C5.4 14.4 5.4 13.1 6.2 12.3L14.1 4.4C14.5 4 15 3.8 15.5 3.8C16 3.8 16.5 4 16.9 4.4L17 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>여기서 자유롭게 메모하고 계산해보세요</p>
        <p class="guide-subtitle">손글씨나 도형을 그려서 문제를 풀어보세요</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'

export default {
  name: 'MemoCanvas',
  setup() {
    // 캔버스 관련 ref
    const canvas = ref(null)
    const canvasContainer = ref(null)

    // 그리기 상태
    const isDrawing = ref(false)
    const hasDrawn = ref(false)

    // 오버레이 이미지 상태
    const overlayImage = ref(null)
    const overlayImageData = ref(null)
    const overlayImagePosition = ref({ x: 20, y: 20 })
    const overlayImageSize = ref({ width: 0, height: 0 })

    // 캔버스 변환 상태
    const zoom = ref(1)
    const panX = ref(0)
    const panY = ref(0)

    // 손도구 상태
    const isDragging = ref(false)
    const isImageDragging = ref(false)
    const dragStart = ref({ x: 0, y: 0 })
    const dragTarget = ref(null) // 'canvas' or 'image'

    // 터치 제스처 상태
    const isTouching = ref(false)
    const touchCount = ref(0)
    const lastTouchDistance = ref(0)
    const touchCenter = ref({ x: 0, y: 0 })
    const initialZoom = ref(1)
    const initialPan = ref({ x: 0, y: 0 })

    // 현재 도구 및 설정
    const currentTool = ref('pen')
    const currentColor = ref('#000000')
    const customColor = ref('#000000')
    const strokeWidth = ref(3)

    // UUID 생성 함수 (브라우저 호환성)
    const generateUUID = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
      }
      // 폴리필: 간단한 UUID v4 생성
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }

    // 간단한 데이터 수집
    const sessionData = ref({
      sessionId: generateUUID(),
      startTime: Date.now(),
      strokes: [],
      events: [],
      capabilities: {
        pressure: false,
        tilt: false,
        twist: false
      },
      stats: {
        undoCount: 0,
        redoCount: 0
      }
    })

    // 색상 팔레트 (압축된 필수 색상만)
    const colors = ref([
      '#000000', '#ff0000', '#0000ff', '#00ff00',
      '#ffff00', '#ff8000', '#800080', '#ffffff'
    ])

    // 히스토리 관리
    const history = ref([])
    const historyStep = ref(-1)

    // 가이드 라인 계산
    const horizontalLines = ref([])
    const verticalLines = ref([])

    // 캔버스 컨텍스트
    let ctx = null
    let rect = null

    // 이전 좌표
    let lastX = 0
    let lastY = 0

    // 지우개 커서 스타일
    const eraserCursorStyle = computed(() => {
      if (currentTool.value !== 'eraser') return {}

      const size = strokeWidth.value * 2 // 실제 지우개 크기에 맞게 조정
      return {
        '--eraser-size': `${size}px`
      }
    })

    // 가이드 라인 계산
    const calculateGuideLines = () => {
      if (!canvasContainer.value) return

      const container = canvasContainer.value
      const rect = container.getBoundingClientRect()

      // 수평선 계산 (40px 간격)
      const hLines = []
      for (let i = 1; i * 40 < rect.height - 40; i++) {
        hLines.push(i)
      }
      horizontalLines.value = hLines

      // 수직선 계산 (40px 간격)
      const vLines = []
      for (let i = 1; i * 40 < rect.width - 40; i++) {
        vLines.push(i)
      }
      verticalLines.value = vLines
    }

    // 캔버스 초기화
    const initCanvas = () => {
      if (!canvas.value || !canvasContainer.value) return

      const container = canvasContainer.value
      const canvasEl = canvas.value

      // 캔버스 크기 설정 (고해상도 지원)
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()

      canvasEl.width = rect.width * devicePixelRatio
      canvasEl.height = rect.height * devicePixelRatio

      canvasEl.style.width = rect.width + 'px'
      canvasEl.style.height = rect.height + 'px'

      ctx = canvasEl.getContext('2d')
      ctx.scale(devicePixelRatio, devicePixelRatio)

      // 캔버스 스타일 설정
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.imageSmoothingEnabled = true

      // 가이드 라인 계산
      calculateGuideLines()

      // 오버레이 이미지가 있으면 다시 그리기
      if (overlayImage.value) {
        drawOverlayImage()
      }

      // 초기 히스토리 저장
      saveToHistory()
    }

    // 오버레이 이미지 그리기 (변환 없이 기본 좌표계에서)
    const drawOverlayImage = () => {
      if (!ctx || !overlayImage.value) return

      const containerRect = canvasContainer.value.getBoundingClientRect()

      // 이미지 크기가 설정되지 않은 경우 초기 크기 설정
      if (overlayImageSize.value.width === 0) {
        const maxWidth = containerRect.width * 0.3  // 캔버스 너비의 30%
        const maxHeight = containerRect.height * 0.3 // 캔버스 높이의 30%

        let drawWidth = overlayImage.value.width
        let drawHeight = overlayImage.value.height

        // 크기 조정 (비율 유지)
        if (drawWidth > maxWidth || drawHeight > maxHeight) {
          const scale = Math.min(maxWidth / drawWidth, maxHeight / drawHeight)
          drawWidth = drawWidth * scale
          drawHeight = drawHeight * scale
        }

        overlayImageSize.value = { width: drawWidth, height: drawHeight }
      }

      // 변환 적용 없이 기본 좌표계에서 그리기
      ctx.drawImage(
        overlayImage.value,
        overlayImagePosition.value.x * zoom.value + panX.value,
        overlayImagePosition.value.y * zoom.value + panY.value,
        overlayImageSize.value.width * zoom.value,
        overlayImageSize.value.height * zoom.value
      )
    }

    // 좌표 계산 (마우스/터치 이벤트)
    const getCoordinates = (event) => {
      const canvasEl = canvas.value
      const rect = canvasEl.getBoundingClientRect()

      let x, y
      if (event.touches && event.touches.length > 0) {
        // 터치 이벤트
        x = event.touches[0].clientX - rect.left
        y = event.touches[0].clientY - rect.top
      } else {
        // 마우스 이벤트
        x = event.clientX - rect.left
        y = event.clientY - rect.top
      }

      return { x, y }
    }

    // 입력 방식 감지 함수 (pen.html 로직 참고)
    const detectInputType = (event) => {
      // 1. Pointer Events가 가장 정확하므로 우선 처리
      if ('pointerType' in event && event.pointerType) {
        return event.pointerType; // 'pen' | 'touch' | 'mouse'
      }

      // 2. Touch 폴백 (iOS)
      if ('changedTouches' in event && event.changedTouches?.length) {
        const touch = event.changedTouches[0]

        // iOS WebKit: Apple Pencil이면 'stylus'가 올 수 있음
        if ('touchType' in touch && touch.touchType === 'stylus') {
          return 'pen'
        }

        // 압력이나 각도 정보가 있으면 펜
        const hasForce = typeof touch.force === 'number' && touch.force > 0.1
        const hasTilt = typeof touch.altitudeAngle === 'number' || typeof touch.azimuthAngle === 'number'
        const hasPressure = typeof touch.pressure === 'number' && touch.pressure > 0.1

        if (hasForce || hasTilt || hasPressure) {
          return 'pen'
        }

        return 'finger'
      }

      // 3. 단일 터치 이벤트 처리 (touches 배열 사용)
      if (event.type.includes('touch') && event.touches?.length) {
        // 다중 터치는 항상 손가락
        if (event.touches.length > 1) {
          return 'finger'
        }

        const touch = event.touches[0]

        // iOS WebKit 지원
        if ('touchType' in touch && touch.touchType === 'stylus') {
          return 'pen'
        }

        // 압력/각도 기반 감지
        const hasForce = typeof touch.force === 'number' && touch.force > 0.1
        const hasTilt = typeof touch.altitudeAngle === 'number' || typeof touch.azimuthAngle === 'number'

        if (hasForce || hasTilt) {
          return 'pen'
        }

        return 'finger'
      }

      // 4. Mouse 폴백
      if (event.type === 'mousedown' || event.type === 'mousemove' || event.type === 'mouseup') {
        return 'mouse'
      }

      return 'unknown'
    }

    // 이벤트에서 기본 데이터 추출
    const extractEventData = (event) => {
      const coords = getCoordinates(event)
      const timestamp = Date.now() - sessionData.value.startTime
      const inputType = detectInputType(event)

      // 포인터 이벤트에서 압력, 기울기, 비틀기 정보 추출
      let pressure = 0.5
      let tiltX = 0
      let tiltY = 0
      let twist = 0

      if (event.pressure !== undefined) {
        pressure = event.pressure
        sessionData.value.capabilities.pressure = true
      }
      if (event.tiltX !== undefined) {
        tiltX = event.tiltX
        sessionData.value.capabilities.tilt = true
      }
      if (event.tiltY !== undefined) {
        tiltY = event.tiltY
        sessionData.value.capabilities.tilt = true
      }
      if (event.twist !== undefined) {
        twist = event.twist
        sessionData.value.capabilities.twist = true
      }

      return {
        timestamp,
        x: coords.x,
        y: coords.y,
        pressure,
        tiltX,
        tiltY,
        twist,
        eventType: event.type,
        inputType,
        tool: currentTool.value,
        color: currentColor.value,
        strokeWidth: strokeWidth.value
      }
    }

    // 현재 스트로크 데이터
    let currentStroke = null

    // 터치 이벤트 유틸리티 함수들
    const getTouchDistance = (touches) => {
      if (touches.length < 2) return 0
      const touch1 = touches[0]
      const touch2 = touches[1]
      const dx = touch1.clientX - touch2.clientX
      const dy = touch1.clientY - touch2.clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const getTouchCenter = (touches) => {
      if (touches.length === 0) return { x: 0, y: 0 }
      let x = 0
      let y = 0
      for (let i = 0; i < touches.length; i++) {
        x += touches[i].clientX
        y += touches[i].clientY
      }
      const rect = canvas.value?.getBoundingClientRect()
      if (rect) {
        return {
          x: x / touches.length - rect.left,
          y: y / touches.length - rect.top
        }
      }
      return { x: x / touches.length, y: y / touches.length }
    }

    // Pointer Events 핸들러들 (우선 처리)
    const handlePointerDown = (event) => {
      if (!canvas.value) return

      event.preventDefault()
      const inputType = detectInputType(event)

      // 펜이나 마우스만 그리기 허용
      if (inputType === 'pen' || inputType === 'mouse') {
        startDrawing(event)
      } else if (inputType === 'touch') {
        // 손가락 터치는 드래그 모드
        isDragging.value = true
        const coords = getCoordinates(event)
        dragStart.value = { x: coords.x, y: coords.y }
        dragTarget.value = 'canvas'
      }
    }

    const handlePointerMove = (event) => {
      if (!canvas.value) return

      const inputType = detectInputType(event)

      if (inputType === 'pen' || inputType === 'mouse') {
        draw(event)
        updateEraserCursor(event)
      } else if (inputType === 'touch' && isDragging.value) {
        // 손가락 터치 드래그
        event.preventDefault()
        const coords = getCoordinates(event)
        const deltaX = coords.x - dragStart.value.x
        const deltaY = coords.y - dragStart.value.y

        panX.value += deltaX
        panY.value += deltaY
        redrawCanvas()
        dragStart.value = coords
      }
    }

    const handlePointerUp = (event) => {
      const inputType = detectInputType(event)

      if (inputType === 'pen' || inputType === 'mouse') {
        stopDrawing(event)
      } else if (inputType === 'touch') {
        isDragging.value = false
        dragTarget.value = null
      }
    }

    // 터치 이벤트 핸들러들 (폴백 - Pointer Events 미지원 시)
    const handleTouchStart = (event) => {
      // Pointer Events가 지원되는 경우 아무것도 하지 않음
      if ('onpointerdown' in window) return

      if (!canvas.value) return

      const touches = event.touches
      touchCount.value = touches.length

      if (touches.length === 1) {
        // 단일 터치 - 입력 타입 검사
        const inputType = detectInputType(event)
        if (inputType === 'pen') {
          startDrawing(event)
        } else {
          // 손가락 터치는 드래그 모드
          isDragging.value = true
          const coords = getCoordinates(event)
          dragStart.value = { x: coords.x, y: coords.y }
          dragTarget.value = 'canvas'
        }
      } else if (touches.length === 2) {
        // 두 손가락 터치 - 핀치 준비
        event.preventDefault()
        isTouching.value = true
        lastTouchDistance.value = getTouchDistance(touches)
        touchCenter.value = getTouchCenter(touches)
        initialZoom.value = zoom.value
        initialPan.value = { x: panX.value, y: panY.value }

        // 기존 드래잉 중단
        if (isDrawing.value) {
          stopDrawing(event)
        }
      }
    }

    const handleTouchMove = (event) => {
      // Pointer Events가 지원되는 경우 아무것도 하지 않음
      if ('onpointerdown' in window) return

      if (!canvas.value) return

      const touches = event.touches

      if (touches.length === 1 && !isTouching.value) {
        // 단일 터치 - 입력 타입 검사
        const inputType = detectInputType(event)
        if (inputType === 'pen') {
          draw(event)
        } else if (isDragging.value) {
          // 손가락 드래그
          event.preventDefault()
          const coords = getCoordinates(event)
          const deltaX = coords.x - dragStart.value.x
          const deltaY = coords.y - dragStart.value.y

          panX.value += deltaX
          panY.value += deltaY
          redrawCanvas()
          dragStart.value = coords
        }
      } else if (touches.length === 2 && isTouching.value) {
        // 두 손가락 터치 - 핀치 제스처
        event.preventDefault()

        const currentDistance = getTouchDistance(touches)
        const currentCenter = getTouchCenter(touches)

        if (lastTouchDistance.value > 0) {
          // 확대/축소 계산
          const scale = currentDistance / lastTouchDistance.value
          const newZoom = Math.max(0.2, Math.min(5, initialZoom.value * scale))

          // 확대/축소 중심점 고려한 패닝 조정
          const zoomRatio = newZoom / zoom.value
          const centerOffsetX = currentCenter.x - touchCenter.value.x
          const centerOffsetY = currentCenter.y - touchCenter.value.y

          zoom.value = newZoom
          panX.value = initialPan.value.x + centerOffsetX
          panY.value = initialPan.value.y + centerOffsetY

          redrawCanvas()
        }
      }
    }

    const handleTouchEnd = (event) => {
      // Pointer Events가 지원되는 경우 아무것도 하지 않음
      if ('onpointerdown' in window) return

      const touches = event.touches
      touchCount.value = touches.length

      if (touches.length === 0) {
        // 모든 터치 끝남
        if (isTouching.value) {
          isTouching.value = false
        } else {
          const inputType = detectInputType(event)
          if (inputType === 'pen') {
            stopDrawing(event)
          } else {
            isDragging.value = false
            dragTarget.value = null
          }
        }
      } else if (touches.length === 1 && isTouching.value) {
        // 핀치에서 단일 터치로 전환
        isTouching.value = false
        lastTouchDistance.value = 0
      }
    }


    // 이미지 영역 체크 (화면 좌표에서 직접 체크)
    const isPointInImage = (x, y) => {
      if (!overlayImage.value) return false

      // 화면에 표시된 이미지의 실제 위치와 크기
      const imageScreenX = overlayImagePosition.value.x * zoom.value + panX.value
      const imageScreenY = overlayImagePosition.value.y * zoom.value + panY.value
      const imageScreenWidth = overlayImageSize.value.width * zoom.value
      const imageScreenHeight = overlayImageSize.value.height * zoom.value

      return (
        x >= imageScreenX &&
        x <= imageScreenX + imageScreenWidth &&
        y >= imageScreenY &&
        y <= imageScreenY + imageScreenHeight
      )
    }

    // 지우개 커서 마우스 추적
    const updateEraserCursor = (event) => {
      if (currentTool.value === 'eraser' && canvasContainer.value) {
        const rect = canvasContainer.value.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        canvasContainer.value.style.setProperty('--cursor-x', x + 'px')
        canvasContainer.value.style.setProperty('--cursor-y', y + 'px')
      }
    }

    // 마우스 이동 통합 핸들러
    const handleMouseMove = (event) => {
      draw(event)
      updateEraserCursor(event)
    }

    // 그리기 시작
    const startDrawing = (event) => {
      if (!ctx) return

      event.preventDefault()
      const coords = getCoordinates(event)

      // 이벤트 데이터 수집
      const eventData = extractEventData(event)
      sessionData.value.events.push(eventData)

      // 손가락 터치인 경우 그리기 방지 (손도구 모드가 아니어도)
      if (eventData.inputType === 'finger') {
        // 손가락은 항상 드래그 모드
        isDragging.value = true
        dragStart.value = { x: coords.x, y: coords.y }
        dragTarget.value = 'canvas'
        return
      }

      if (currentTool.value === 'hand') {
        // 손도구 모드
        isDragging.value = true
        dragStart.value = { x: coords.x, y: coords.y }

        if (isPointInImage(coords.x, coords.y)) {
          // 이미지 드래그
          dragTarget.value = 'image'
          isImageDragging.value = true
        } else {
          // 캔버스 패닝
          dragTarget.value = 'canvas'
        }
      } else if (eventData.inputType === 'pen' || eventData.inputType === 'mouse') {
        // 펜이나 마우스만 그리기 가능
        isDrawing.value = true
        hasDrawn.value = true

        lastX = coords.x
        lastY = coords.y

        ctx.globalCompositeOperation = currentTool.value === 'eraser' ? 'destination-out' : 'source-over'
        ctx.strokeStyle = currentTool.value === 'eraser' ? 'rgba(0,0,0,1)' : currentColor.value
        ctx.lineWidth = strokeWidth.value

        ctx.beginPath()
        ctx.moveTo(lastX, lastY)

        // 새 스트로크 시작
        currentStroke = {
          id: generateUUID(),
          startTime: eventData.timestamp,
          tool: currentTool.value,
          color: currentColor.value,
          strokeWidth: strokeWidth.value,
          points: [eventData]
        }
      }
    }

    // 그리기
    const draw = (event) => {
      if (!isDrawing.value && !isDragging.value) return

      event.preventDefault()
      const coords = getCoordinates(event)
      const eventData = extractEventData(event)

      // 드래그 모드 (손도구 또는 손가락)
      if (isDragging.value) {
        const deltaX = coords.x - dragStart.value.x
        const deltaY = coords.y - dragStart.value.y

        if (dragTarget.value === 'image' && overlayImage.value) {
          // 이미지 이동
          overlayImagePosition.value = {
            x: overlayImagePosition.value.x + deltaX / zoom.value,
            y: overlayImagePosition.value.y + deltaY / zoom.value
          }
          redrawCanvas()
          dragStart.value = coords
        } else if (dragTarget.value === 'canvas') {
          // 캔버스 패닝
          panX.value += deltaX
          panY.value += deltaY
          redrawCanvas()
          dragStart.value = coords
        }
      } else if (isDrawing.value && ctx && (eventData.inputType === 'pen' || eventData.inputType === 'mouse')) {
        // 펜이나 마우스만 그리기 가능
        sessionData.value.events.push(eventData)

        // 현재 스트로크에 포인트 추가
        if (currentStroke) {
          currentStroke.points.push(eventData)
        }

        // 그리기
        ctx.lineTo(coords.x, coords.y)
        ctx.stroke()
        lastX = coords.x
        lastY = coords.y
      }
    }

    // 그리기 종료
    const stopDrawing = (event) => {
      if (isDrawing.value) {
        // 마지막 이벤트 데이터 수집
        const eventData = extractEventData(event)
        sessionData.value.events.push(eventData)

        // 현재 스트로크 완료
        if (currentStroke) {
          currentStroke.endTime = eventData.timestamp
          currentStroke.points.push(eventData)
          sessionData.value.strokes.push(currentStroke)
          currentStroke = null
        }

        isDrawing.value = false
        saveToHistory()
      }

      isDragging.value = false
      isImageDragging.value = false
      dragTarget.value = null
    }


    // JSON 데이터 생성
    const generateSessionData = () => {
      const now = new Date()
      const sessionDuration = Date.now() - sessionData.value.startTime

      return {
        metadata: {
          version: "1.0",
          generator: "Math Memo App",
          sessionId: sessionData.value.sessionId,
          startTime: new Date(sessionData.value.startTime).toISOString(),
          endTime: now.toISOString(),
          duration: sessionDuration,
          totalStrokes: sessionData.value.strokes.length,
          totalEvents: sessionData.value.events.length
        },
        deviceCapabilities: sessionData.value.capabilities,
        canvasData: {
          strokes: sessionData.value.strokes,
          events: sessionData.value.events
        },
        statistics: {
          ...sessionData.value.stats,
          averageStrokeLength: sessionData.value.strokes.length > 0
            ? sessionData.value.strokes.reduce((sum, stroke) => sum + stroke.points.length, 0) / sessionData.value.strokes.length
            : 0,
          sessionDuration
        }
      }
    }

    // JSON 다운로드
    const downloadSessionData = () => {
      const data = generateSessionData()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      // 더 명확한 파일명 생성
      const now = new Date()
      const dateStr = now.toISOString().split('T')[0] // YYYY-MM-DD
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-') // HH-MM-SS
      const shortId = sessionData.value.sessionId.split('-')[0] // 짧은 ID

      const a = document.createElement('a')
      a.href = url
      a.download = `math-memo-${dateStr}_${timeStr}_${shortId}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      console.log('JSON 데이터 다운로드 완료:', {
        fileName: `math-memo-${dateStr}_${timeStr}_${shortId}.json`,
        strokes: sessionData.value.strokes.length,
        events: sessionData.value.events.length,
        capabilities: sessionData.value.capabilities
      })
    }

    // 도구 설정
    const setTool = (tool) => {
      currentTool.value = tool
    }

    const setColor = (color) => {
      currentColor.value = color
      if (color !== customColor.value) {
        customColor.value = color
      }
    }

    const updateStrokeWidth = () => {
      // 스트로크 폭 변경
    }

    // 히스토리 저장
    const saveToHistory = () => {
      if (!ctx || !canvas.value) return

      // 현재 단계 이후의 히스토리 제거
      history.value = history.value.slice(0, historyStep.value + 1)

      // 현재 캔버스 상태를 이미지로 저장
      const imageData = canvas.value.toDataURL()
      history.value.push(imageData)
      historyStep.value = history.value.length - 1

      // 히스토리 크기 제한
      if (history.value.length > 50) {
        history.value.shift()
        historyStep.value--
      }
    }

    const redrawCanvas = () => {
      if (!ctx || !canvas.value) return

      // 캔버스 클리어
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

      // 현재 히스토리 단계의 이미지 복원
      if (historyStep.value >= 0 && history.value[historyStep.value]) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
          // 오버레이 이미지 다시 그리기
          if (overlayImage.value) {
            drawOverlayImage()
          }
        }
        img.src = history.value[historyStep.value]
      } else {
        // 오버레이 이미지만 그리기
        if (overlayImage.value) {
          drawOverlayImage()
        }
      }
    }

    // 실행 취소/다시 실행
    const canUndo = ref(false)
    const canRedo = ref(false)

    const undo = () => {
      if (historyStep.value > 0) {
        historyStep.value--
        redrawCanvas()
        sessionData.value.stats.undoCount++
      }
    }

    const redo = () => {
      if (historyStep.value < history.value.length - 1) {
        historyStep.value++
        redrawCanvas()
        sessionData.value.stats.redoCount++
      }
    }

    // 전체 지우기
    const clearAll = () => {
      if (!ctx || !canvas.value) return

      // 캔버스 클리어
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

      // 오버레이 이미지가 있으면 다시 그리기
      if (overlayImage.value) {
        drawOverlayImage()
      }

      hasDrawn.value = false
      saveToHistory()
    }

    // 확대/축소 기능
    const zoomIn = () => {
      zoom.value = Math.min(zoom.value * 1.2, 5)
      redrawCanvas()
    }

    const zoomOut = () => {
      zoom.value = Math.max(zoom.value / 1.2, 0.2)
      redrawCanvas()
    }

    const resetZoom = () => {
      zoom.value = 1
      panX.value = 0
      panY.value = 0
      redrawCanvas()
    }

    // 오버레이 이미지 추가 (외부에서 호출)
    const addOverlayImage = (imageData) => {
      if (!imageData || !imageData.src) return

      const img = new Image()
      img.onload = () => {
        overlayImage.value = img
        overlayImageData.value = imageData

        // 이미지 크기와 위치 초기화
        overlayImagePosition.value = { x: 20, y: 20 }
        overlayImageSize.value = { width: 0, height: 0 }

        // 오버레이 이미지만 그리기 (히스토리 저장 안 함)
        if (ctx && canvas.value) {
          drawOverlayImage()
          hasDrawn.value = true
        }
      }
      img.onerror = (error) => {
        console.error('이미지 로드 실패:', error)
      }
      img.src = imageData.src
    }


    // 히스토리 상태 업데이트
    watch([historyStep, history], () => {
      canUndo.value = historyStep.value > 0
      canRedo.value = historyStep.value < history.value.length - 1
    }, { deep: true })

    // 창 크기 변경 시 캔버스 재조정
    const handleResize = () => {
      if (!canvas.value || !canvasContainer.value) return

      // 오버레이 이미지 정보 저장
      const savedOverlayImage = overlayImage.value
      const savedOverlayImageData = overlayImageData.value
      const savedOverlayPosition = { ...overlayImagePosition.value }
      const savedOverlaySize = { ...overlayImageSize.value }

      // 현재 히스토리 저장
      const currentHistoryData = history.value[historyStep.value]

      nextTick(() => {
        // 캔버스 크기 재조정
        initCanvas()

        // 드로잉 히스토리 복원
        if (currentHistoryData && hasDrawn.value) {
          const img = new Image()
          img.onload = () => {
            ctx.drawImage(img, 0, 0)

            // 오버레이 이미지 복원
            if (savedOverlayImage) {
              overlayImage.value = savedOverlayImage
              overlayImageData.value = savedOverlayImageData
              overlayImagePosition.value = savedOverlayPosition
              overlayImageSize.value = savedOverlaySize

              drawOverlayImage()
            }
          }
          img.src = currentHistoryData
        } else if (savedOverlayImage) {
          // 드로잉이 없고 오버레이 이미지만 있는 경우
          overlayImage.value = savedOverlayImage
          overlayImageData.value = savedOverlayImageData
          overlayImagePosition.value = savedOverlayPosition
          overlayImageSize.value = savedOverlaySize

          drawOverlayImage()
        }
      })
    }

    // 컴포넌트 마운트 시 초기화
    onMounted(() => {
      nextTick(() => {
        initCanvas()
        window.addEventListener('resize', handleResize)
      })
    })

    // 컴포넌트 언마운트 시 정리
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      canvas,
      canvasContainer,
      isDrawing,
      hasDrawn,
      currentTool,
      currentColor,
      customColor,
      strokeWidth,
      colors,
      canUndo,
      canRedo,
      horizontalLines,
      verticalLines,
      startDrawing,
      draw,
      stopDrawing,
      handleMouseMove,
      setTool,
      setColor,
      updateStrokeWidth,
      undo,
      redo,
      clearAll,
      addOverlayImage,
      zoomIn,
      zoomOut,
      resetZoom,
      zoom,
      redrawCanvas,
      sessionData,
      downloadSessionData,
      generateSessionData,
      eraserCursorStyle,
      updateEraserCursor,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    }
  }
}
</script>

<style scoped>
.memo-canvas-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
}

.toolbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(255, 251, 245, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  flex-wrap: nowrap;
  gap: 8px;
  z-index: 10;
  transition: all 0.2s ease;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tool-btn {
  color: var(--text-secondary);
}

.tool-btn.active {
  background: var(--primary-color);
  color: white;
}

.stroke-width-control {
  display: flex;
  align-items: center;
  gap: 4px;
}

.control-label {
  font-size: 10px;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

.stroke-slider {
  width: 60px;
  height: 3px;
  background: var(--border-color);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.stroke-slider::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
  -webkit-appearance: none;
}

.stroke-value {
  font-size: 10px;
  color: var(--text-primary);
  font-weight: 500;
  min-width: 16px;
  text-align: center;
}

.color-palette {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 20px);
  grid-template-rows: repeat(2, 20px);
  gap: 2px;
}

.color-btn {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.color-btn.active {
  border-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 2px 4px rgba(217, 119, 6, 0.3);
}

.color-btn:hover {
  transform: scale(1.05);
}

.custom-color {
  position: relative;
}

.color-picker {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: transparent;
}

.action-btn {
  color: var(--text-secondary);
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.action-btn:hover:not(:disabled) {
  color: var(--primary-color);
}

.clear-all:hover:not(:disabled) {
  color: #dc2626;
}

.data-collection-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(217, 119, 6, 0.05);
  border: 1px solid rgba(217, 119, 6, 0.2);
  border-radius: 8px;
  font-size: 11px;
}

.data-stats {
  display: flex;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 2px;
}

.stat-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  color: var(--primary-color);
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.capabilities {
  display: flex;
  gap: 4px;
}

.capability {
  padding: 2px 4px;
  border-radius: 4px;
  background: rgba(107, 114, 128, 0.1);
  color: var(--text-secondary);
  font-size: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.capability.active {
  background: var(--primary-color);
  color: white;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.download-btn:hover {
  background: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(217, 119, 6, 0.3);
}

.download-text {
  font-size: 12px;
}

.canvas-container {
  flex: 1;
  position: relative;
  background: var(--surface-color);
  margin: 16px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

/* 지우개 커서 */
.canvas-container.eraser-cursor {
  cursor: none;
}

.canvas-container.eraser-cursor::before {
  content: '';
  position: absolute;
  pointer-events: none;
  z-index: 1000;
  border-radius: 50%;
  border: 2px solid #dc2626;
  background: rgba(220, 38, 38, 0.1);
  width: var(--eraser-size, 20px);
  height: var(--eraser-size, 20px);
  left: var(--cursor-x, -100px);
  top: var(--cursor-y, -100px);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
  opacity: 0;
}

.canvas-container.eraser-cursor:hover::before {
  opacity: 1;
}

.guide-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.guide-line {
  position: absolute;
  background: #e2e8f0;
  opacity: 0.3;
}

.guide-line.horizontal {
  width: 100%;
  height: 1px;
}

.guide-line.vertical {
  height: 100%;
  width: 1px;
}

.answer-zone {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 280px;
  height: 120px;
  border: 2px dashed var(--primary-color);
  border-radius: 8px;
  background: rgba(37, 99, 235, 0.05);
  z-index: 2;
  pointer-events: none;
}

.answer-zone-header {
  position: absolute;
  top: -12px;
  left: 8px;
  background: var(--surface-color);
  padding: 0 8px;
}

.answer-zone-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.answer-zone-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
}

.answer-zone-placeholder {
  font-size: 14px;
  color: var(--primary-color);
  opacity: 0.7;
  text-align: center;
  font-weight: 500;
}

.memo-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: none;
  z-index: 3;
}

.memo-canvas[data-tool="pen"] {
  cursor: crosshair;
}

.memo-canvas[data-tool="eraser"] {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="black" stroke-width="1" fill="none"/></svg>') 12 12, auto;
}

.memo-canvas[data-tool="hand"] {
  cursor: grab;
}

.memo-canvas[data-tool="hand"]:active {
  cursor: grabbing;
}

.canvas-guide {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--text-secondary);
  pointer-events: none;
  opacity: 0.6;
}

.canvas-guide svg {
  margin-bottom: 12px;
  opacity: 0.5;
}

.canvas-guide p {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.guide-subtitle {
  font-size: 14px !important;
  font-weight: 400 !important;
  opacity: 0.8;
}

/* 태블릿 가로뷰 우선 반응형 */
@media (min-width: 1024px) and (orientation: landscape) {
  .memo-canvas-container {
    height: 100%;
  }

  .toolbar {
    padding: 6px 12px;
    gap: 8px;
  }

  .toolbar-section {
    gap: 6px;
  }

  .tool-btn, .action-btn {
    width: 32px;
    height: 32px;
  }

  .color-grid {
    grid-template-columns: repeat(4, 18px);
    grid-template-rows: repeat(2, 18px);
    gap: 2px;
  }

  .color-btn {
    width: 18px;
    height: 18px;
  }

  .color-picker {
    width: 18px;
    height: 18px;
  }

  .stroke-slider {
    width: 60px;
  }

  .control-label {
    font-size: 10px;
  }

  .canvas-container {
    margin: 8px;
  }

  .answer-zone {
    width: 200px;
    height: 80px;
    bottom: 12px;
    right: 12px;
  }

  .answer-zone-placeholder {
    font-size: 12px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .toolbar {
    padding: 6px 12px;
    gap: 8px;
  }

  .toolbar-section {
    gap: 6px;
  }

  .tool-btn, .action-btn {
    width: 32px;
    height: 32px;
  }

  .color-grid {
    grid-template-columns: repeat(4, 17px);
    grid-template-rows: repeat(2, 17px);
    gap: 2px;
  }

  .color-btn {
    width: 17px;
    height: 17px;
  }

  .color-picker {
    width: 17px;
    height: 17px;
  }

  .stroke-slider {
    width: 50px;
  }

  .control-label {
    font-size: 10px;
  }

  .answer-zone {
    width: 240px;
    height: 100px;
    bottom: 16px;
    right: 16px;
  }

  .answer-zone-placeholder {
    font-size: 13px;
  }
}

@media (max-width: 767px) {
  .toolbar {
    padding: 6px 8px;
    gap: 4px;
    flex-wrap: wrap;
  }

  .toolbar-section {
    gap: 4px;
    flex-wrap: wrap;
  }

  .toolbar-section:first-child {
    order: 1;
  }

  .toolbar-section:last-child {
    order: 3;
  }

  .toolbar-section:nth-child(2) {
    order: 2;
    flex: 1;
    justify-content: center;
  }

  .tool-btn, .action-btn {
    width: 28px;
    height: 28px;
  }

  .color-grid {
    grid-template-columns: repeat(4, 16px);
    grid-template-rows: repeat(2, 16px);
    gap: 1px;
  }

  .color-btn {
    width: 16px;
    height: 16px;
  }

  .color-picker {
    width: 16px;
    height: 16px;
  }

  .stroke-width-control {
    gap: 4px;
  }

  .stroke-slider {
    width: 40px;
  }

  .color-palette {
    gap: 4px;
  }

  .data-collection-info {
    display: none;
  }

  .download-btn {
    padding: 6px 8px;
  }

  .download-text {
    display: none;
  }

  .canvas-container {
    margin: 8px;
  }

  .guide-line.horizontal {
    opacity: 0.15;
  }

  .guide-line.vertical {
    opacity: 0.15;
  }

  .answer-zone {
    width: 180px;
    height: 70px;
    bottom: 8px;
    right: 8px;
  }

  .answer-zone-label {
    font-size: 10px;
  }

  .answer-zone-placeholder {
    font-size: 11px;
  }

  .canvas-guide p {
    font-size: 14px;
  }

  .guide-subtitle {
    font-size: 12px !important;
  }

  .memo-canvas {
    cursor: pointer;
  }
}

/* 고해상도 디스플레이 지원 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .memo-canvas {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
}
</style>