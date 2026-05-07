<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  buildings: { type: Array, required: true },
  activeBuilding: { type: String, default: null },
})

/* Start at plaza (+ offset) or fallback (160, 60) */
const plaza = computed(() => props.buildings.find(b => b.id === 'plaza'))

const charPos = ref({ x: 160, y: 60 })

/* Initialize position from plaza building if available */
if (plaza.value) {
  charPos.value = { x: plaza.value.x + 22, y: plaza.value.y + 20 }
}

const bubbles = [
  '这地方不错！',
  '今天岛上天气真好～',
  '嗯...去哪逛逛呢？',
  '工坊有新配方了！',
  '博物馆好像有新展品...',
]

const showBubble = ref(false)
const bubbleText = ref('')

function randomBubble() {
  bubbleText.value = bubbles[Math.floor(Math.random() * bubbles.length)]
  showBubble.value = true
  setTimeout(() => { showBubble.value = false }, 2500)
}

/* Move character near active building */
watch(() => props.activeBuilding, (bid) => {
  if (bid) {
    const b = props.buildings.find(b => b.id === bid)
    if (b) {
      charPos.value = { x: b.x + 22, y: b.y + 20 }
    }
  } else {
    /* Return to plaza */
    if (plaza.value) {
      charPos.value = { x: plaza.value.x + 22, y: plaza.value.y + 20 }
    }
  }
})

/* Bubble width roughly proportional to text length (CJK chars ~7px each at font-size 8) */
const bubbleWidth = computed(() => bubbleText.value.length * 7.5 + 18)
</script>

<template>
  <!-- Outer group: positional translation with smooth CSS transition -->
  <g
    class="character-position"
    :style="{ transform: `translate(${charPos.x}px, ${charPos.y}px)` }"
  >
    <!-- Inner group: hover scale target -->
    <g class="character-hitbox" @click="randomBubble">
      <!-- Hat — card-green fill -->
      <ellipse cx="0" cy="-7" rx="8" ry="3.5" fill="var(--card-green)" stroke="var(--c-text-heading)" stroke-width="1.5" />

      <!-- Body — card-yellow fill, heading-color stroke -->
      <circle cx="0" cy="0" r="7" fill="var(--card-yellow)" stroke="var(--c-text-heading)" stroke-width="2" />

      <!-- Speech bubble -->
      <g v-if="showBubble" class="bubble-group" transform="translate(14, -28)">
        <rect
          :x="0"
          y="0"
          :width="bubbleWidth"
          height="20"
          rx="7"
          fill="var(--c-bg-warm)"
          stroke="var(--c-text-muted)"
          stroke-width="1.2"
        />
        <text
          :x="bubbleWidth / 2"
          y="14"
          text-anchor="middle"
          font-size="8"
          fill="var(--c-text-heading)"
          font-family="var(--font-body)"
        >{{ bubbleText }}</text>
        <!-- Triangular tail -->
        <polygon points="6,20 10,28 14,20" fill="var(--c-bg-warm)" stroke="var(--c-text-muted)" stroke-width="1.2" />
      </g>
    </g>
  </g>
</template>

<style scoped>
.character-position {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.character-hitbox {
  cursor: pointer;
  transform-origin: 0 0;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.character-hitbox:hover {
  transform: scale(1.15);
}

.bubble-group {
  animation: bubble-pop 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bubble-pop {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
