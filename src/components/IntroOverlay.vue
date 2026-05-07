<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])

const phase = ref('leaf')

const greetings = [
  '哩哈！欢迎来到我的岛～',
  '哟！又是一位探险家呢～',
  '欢迎登岛！知识果实正等着被摘取～',
  '嘘……博物馆里藏着好多好东西～',
  '嘿！工坊里刚做好一批新配方，来看看？',
  '哇！你是今天第一位访客呢！',
]

const greeting = ref('')

onMounted(() => {
  greeting.value = greetings[Math.floor(Math.random() * greetings.length)]

  setTimeout(() => { phase.value = 'transform' }, 1800)
  setTimeout(() => { phase.value = 'done' }, 3200)
  setTimeout(() => { emit('done') }, 3800)
})
</script>

<template>
  <div class="intro-overlay" :class="phase">
    <!-- Phase 1 + 2: Leaf SVG -->
    <svg
      class="intro-leaf"
      :class="{ 'leaf-expand': phase === 'transform', 'leaf-hidden': phase === 'done' }"
      viewBox="0 0 120 120"
      width="120"
      height="120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Leaf blade shape -->
      <path
        d="M60 10 C30 20 5 50 15 80 C25 110 55 115 60 85 C65 115 95 110 105 80 C115 50 90 20 60 10Z"
        fill="var(--card-green)"
        stroke="var(--c-text-heading)"
        stroke-width="2"
      />
      <!-- Stem -->
      <line
        x1="60" y1="85" x2="60" y2="115"
        stroke="var(--c-text-heading)"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <!-- Branch lines -->
      <path d="M60 95 L45 105" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round" />
      <path d="M60 95 L75 105" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round" />
      <path d="M60 85 L50 100" stroke="var(--c-text-heading)" stroke-width="1.5" stroke-linecap="round" />
    </svg>

    <!-- Phase 2: Island silhouette reveal -->
    <div v-if="phase === 'transform'" class="intro-island-reveal">
      <svg
        class="island-silhouette-svg"
        viewBox="0 0 300 200"
        width="300"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Island body: rounded ellipse -->
        <ellipse cx="150" cy="130" rx="120" ry="60" fill="var(--c-text-muted)" opacity="0.25" />
        <!-- Tree: trunk + canopy -->
        <rect x="145" y="50" width="10" height="70" rx="3" fill="var(--c-text-muted)" opacity="0.25" />
        <ellipse cx="150" cy="45" rx="35" ry="30" fill="var(--c-text-muted)" opacity="0.3" />
        <ellipse cx="135" cy="55" rx="20" ry="18" fill="var(--c-text-muted)" opacity="0.22" />
        <ellipse cx="165" cy="52" rx="18" ry="16" fill="var(--c-text-muted)" opacity="0.22" />
      </svg>
    </div>

    <!-- Phase 3: Welcome greeting bubble -->
    <div v-if="phase === 'done'" class="intro-greeting">
      <div class="welcome-bubble">
        <p>{{ greeting }}</p>
        <div class="bubble-tail"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
   Overlay container
   ============================================================ */
.intro-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5a4a3a;
  font-family: var(--font-body);
  overflow: hidden;
}

/* Phase 2 background transition */
.intro-overlay.transform {
  background: var(--c-bg-page);
  transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Phase 3: transparent, passthrough */
.intro-overlay.done {
  background: transparent;
  pointer-events: none;
  transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============================================================
   Leaf SVG
   ============================================================ */
.intro-leaf {
  position: absolute;
  z-index: 2;
  animation: leaf-enter 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  will-change: transform, opacity;
}

.intro-leaf.leaf-expand {
  animation: leaf-expand-out 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.intro-leaf.leaf-hidden {
  display: none;
}

@keyframes leaf-enter {
  0% {
    transform: translate(-40vw, -40vh) rotate(-180deg) scale(0.3);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
}

@keyframes leaf-expand-out {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(3) rotate(10deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(6) rotate(15deg);
    opacity: 0;
  }
}

/* ============================================================
   Island silhouette (Phase 2)
   ============================================================ */
.intro-island-reveal {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: silhouette-fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.island-silhouette-svg {
  width: 300px;
  height: 200px;
}

@keyframes silhouette-fade-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================================
   Welcome greeting bubble (Phase 3)
   ============================================================ */
.intro-greeting {
  position: absolute;
  bottom: 25%;
  animation: bubble-bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  z-index: 3;
}

@keyframes bubble-bounce-in {
  0% {
    transform: scale(0) translateY(40px);
    opacity: 0;
  }
  50% {
    transform: scale(1.12) translateY(-10px);
    opacity: 1;
  }
  70% {
    transform: scale(0.95) translateY(5px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.welcome-bubble {
  background: var(--card-default);
  border-radius: var(--radius-organic);
  padding: var(--space-md) var(--space-lg);
  border: 2px solid var(--c-border-card);
  box-shadow: 0 4px 0 0 rgba(189, 174, 160, 0.3);
  position: relative;
  text-align: center;
}

.welcome-bubble p {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--c-text-heading);
  margin: 0;
  white-space: nowrap;
}

/* Triangular tail below the bubble */
.bubble-tail {
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 16px solid var(--c-border-card);
}

.bubble-tail::after {
  content: '';
  position: absolute;
  top: -17px;
  left: -12px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 14px solid var(--card-default);
}
</style>
