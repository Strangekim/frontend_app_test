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
          <button
            v-for="color in colors"
            :key="color"
            class="color-btn"
            :class="{ active: currentColor === color }"
            :style="{ backgroundColor: color }"
            @click="setColor(color)"
            :aria-label="`색상: ${color}`"
          ></button>

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

        <button
          class="action-btn icon-btn"
          @click="resetZoom"
          aria-label="확대/축소 초기화"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12S5 4 12 4S23 12 23 12 19 20 12 20 1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
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
    </div>

    <!-- 캔버스 영역 -->
    <div class="canvas-container" ref="canvasContainer">
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
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="handleTouchEnd"
        @touchcancel.prevent="handleTouchEnd"
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
import { ref, onMounted, nextTick, watch } from 'vue'

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

    // 현재 도구 및 설정
    const currentTool = ref('pen')
    const currentColor = ref('#000000')
    const customColor = ref('#000000')
    const strokeWidth = ref(3)

    // 색상 팔레트
    const colors = ref([
      '#000000', '#ffffff', '#ff0000', '#00ff00',
      '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
      '#ff8000', '#8000ff', '#008080', '#800080'
    ])

    // 히스토리 관리
    const history = ref([])
    const historyStep = ref(0)

    // 가이드 라인 계산
    const horizontalLines = ref([])
    const verticalLines = ref([])

    // 캔버스 컨텍스트
    let ctx = null
    let rect = null

    // 이전 좌표
    let lastX = 0
    let lastY = 0

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

    // 오버레이 이미지 그리기
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

      ctx.drawImage(
        overlayImage.value,
        overlayImagePosition.value.x,
        overlayImagePosition.value.y,
        overlayImageSize.value.width,
        overlayImageSize.value.height
      )
    }

    // 좌표 계산 (마우스/터치)
    const getCoordinates = (event) => {
      const canvasEl = canvas.value
      const rect = canvasEl.getBoundingClientRect()

      let clientX, clientY

      if (event.touches) {
        // 터치 이벤트
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      } else {
        // 마우스 이벤트
        clientX = event.clientX
        clientY = event.clientY
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      }
    }

    // 이미지 영역 체크
    const isPointInImage = (x, y) => {
      if (!overlayImage.value) return false

      return (
        x >= overlayImagePosition.value.x &&
        x <= overlayImagePosition.value.x + overlayImageSize.value.width &&
        y >= overlayImagePosition.value.y &&
        y <= overlayImagePosition.value.y + overlayImageSize.value.height
      )
    }

    // 그리기 시작
    const startDrawing = (event) => {
      if (!ctx) return

      const coords = getCoordinates(event)

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
      } else {
        // 그리기 모드
        isDrawing.value = true
        hasDrawn.value = true

        lastX = coords.x
        lastY = coords.y

        ctx.globalCompositeOperation = currentTool.value === 'eraser' ? 'destination-out' : 'source-over'
        ctx.strokeStyle = currentTool.value === 'eraser' ? 'rgba(0,0,0,1)' : currentColor.value
        ctx.lineWidth = strokeWidth.value

        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
      }
    }

    // 그리기
    const draw = (event) => {
      const coords = getCoordinates(event)

      if (currentTool.value === 'hand' && isDragging.value) {
        // 손도구 드래그
        const deltaX = coords.x - dragStart.value.x
        const deltaY = coords.y - dragStart.value.y

        if (dragTarget.value === 'image' && overlayImage.value) {
          // 이미지 이동
          overlayImagePosition.value = {
            x: overlayImagePosition.value.x + deltaX,
            y: overlayImagePosition.value.y + deltaY
          }

          // 캔버스 다시 그리기
          redrawCanvas()

          dragStart.value = coords
        } else if (dragTarget.value === 'canvas') {
          // 캔버스 패닝
          panX.value += deltaX
          panY.value += deltaY

          // 캔버스 다시 그리기
          redrawCanvas()

          dragStart.value = coords
        }
      } else if (isDrawing.value && ctx) {
        // 일반 그리기
        ctx.lineTo(coords.x, coords.y)
        ctx.stroke()

        lastX = coords.x
        lastY = coords.y
      }
    }

    // 그리기 종료
    const stopDrawing = () => {
      if (isDrawing.value) {
        isDrawing.value = false
        saveToHistory()
      }

      // 드래그 상태 종료
      isDragging.value = false
      isImageDragging.value = false
      dragTarget.value = null
    }

    // 캔버스 다시 그리기
    const redrawCanvas = () => {
      if (!ctx || !canvas.value) return

      // 캔버스 클리어
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
      ctx.restore()

      // 변환 적용
      ctx.save()
      ctx.scale(zoom.value, zoom.value)
      ctx.translate(panX.value, panY.value)

      // 기존 드로잉 복원 (히스토리에서)
      if (history.value.length > 0) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)

          // 오버레이 이미지 그리기
          if (overlayImage.value) {
            drawOverlayImage()
          }

          ctx.restore()
        }
        img.src = history.value[historyStep.value] || history.value[history.value.length - 1]
      } else {
        // 오버레이 이미지만 그리기
        if (overlayImage.value) {
          drawOverlayImage()
        }
        ctx.restore()
      }
    }

    // 터치 이벤트 핸들러
    const handleTouchStart = (event) => {
      startDrawing(event)
    }

    const handleTouchMove = (event) => {
      draw(event)
    }

    const handleTouchEnd = (event) => {
      stopDrawing()
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
      // 실시간 선 굵기 업데이트는 다음 그리기부터 적용됨
    }

    // 히스토리 관리
    const saveToHistory = () => {
      if (!canvas.value) return

      const imageData = canvas.value.toDataURL()

      // 현재 단계 이후의 히스토리 제거
      history.value = history.value.slice(0, historyStep.value + 1)

      // 새 상태 추가
      history.value.push(imageData)
      historyStep.value = history.value.length - 1

      // 히스토리 크기 제한 (메모리 관리)
      if (history.value.length > 20) {
        history.value.shift()
        historyStep.value--
      }
    }

    const restoreFromHistory = (step) => {
      if (!ctx || !history.value[step]) return

      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
        ctx.drawImage(img, 0, 0)

        // 오버레이 이미지가 있으면 다시 그리기
        if (overlayImage.value) {
          drawOverlayImage()
        }
      }
      img.src = history.value[step]

      historyStep.value = step
    }

    // 실행 취소/다시 실행
    const canUndo = ref(false)
    const canRedo = ref(false)

    const undo = () => {
      if (historyStep.value > 0) {
        restoreFromHistory(historyStep.value - 1)
      }
    }

    const redo = () => {
      if (historyStep.value < history.value.length - 1) {
        restoreFromHistory(historyStep.value + 1)
      }
    }

    // 전체 지우기
    const clearAll = () => {
      if (!ctx || !canvas.value) return

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

        // 캔버스 클리어하고 오버레이 이미지 그리기
        if (ctx && canvas.value) {
          ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
          drawOverlayImage()
          hasDrawn.value = true
          saveToHistory()
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

      // 현재 캔버스 내용 저장
      const imageData = canvas.value.toDataURL()

      // 캔버스 크기 재조정 (initCanvas에서 이미 오버레이 이미지를 그리므로 중복 방지)
      nextTick(() => {
        const savedOverlayImage = overlayImage.value
        const savedOverlayImageData = overlayImageData.value

        // 임시로 오버레이 이미지 제거
        overlayImage.value = null
        overlayImageData.value = null

        initCanvas()

        // 내용 복원
        if (hasDrawn.value) {
          const img = new Image()
          img.onload = () => {
            ctx.drawImage(img, 0, 0)

            // 오버레이 이미지 복원
            overlayImage.value = savedOverlayImage
            overlayImageData.value = savedOverlayImageData

            if (overlayImage.value) {
              drawOverlayImage()
            }
          }
          img.src = imageData
        } else {
          // 오버레이 이미지만 복원
          overlayImage.value = savedOverlayImage
          overlayImageData.value = savedOverlayImageData
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
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
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
      redrawCanvas
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
  gap: 3px;
}

.color-btn {
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.color-btn.active {
  border-color: var(--primary-color);
  transform: scale(1.15);
  box-shadow: 0 2px 4px rgba(217, 119, 6, 0.3);
}

.color-btn:hover {
  transform: scale(1.08);
}

.custom-color {
  position: relative;
}

.color-picker {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
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

  .color-btn {
    width: 24px;
    height: 24px;
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

  .color-btn {
    width: 22px;
    height: 22px;
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

  .color-btn {
    width: 20px;
    height: 20px;
  }

  .stroke-width-control {
    gap: 4px;
  }

  .stroke-slider {
    width: 40px;
  }

  .color-palette {
    gap: 2px;
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