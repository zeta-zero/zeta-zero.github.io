<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { shellMessages } from '../../data/islandData.js'

const router = useRouter()
const clickedShell = ref(false)
const shellMessage = ref('')

function clickShell() {
  shellMessage.value = shellMessages[Math.floor(Math.random() * shellMessages.length)]
  clickedShell.value = true
}

function goGame() {
  router.push('/relax/game2048')
}
</script>

<template>
  <div class="beach-view">
    <!-- Title with wave/beach SVG icon -->
    <h1 class="view-title">
      <img src="/assets/icons/icon-beach-wave.svg" class="title-icon" width="32" height="32" alt="" />
      沙滩
    </h1>
    <p class="view-sub">海浪声是最好的白噪音——休息一下</p>

    <!-- Wave container — paths extend beyond viewBox to avoid edge gaps during animation -->
    <div class="wave-container">
      <svg
        viewBox="-100 0 660 80"
        class="wave-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Wave 1: teal -->
        <path
          d="M-100,40 Q-50,22 0,40 Q50,58 100,40 Q150,22 200,40 Q250,58 300,40 Q350,22 400,40 Q450,58 500,40 Q530,22 550,40 L550,80 L-100,80 Z"
          fill="#82d5bb"
          opacity="0.45"
          class="wave wave-1"
        />
        <!-- Wave 2: sky -->
        <path
          d="M-100,46 Q-40,30 20,46 Q80,62 140,46 Q200,30 260,46 Q320,62 380,46 Q440,30 500,46 Q530,30 550,46 L550,80 L-100,80 Z"
          fill="#a4d8f0"
          opacity="0.4"
          class="wave wave-2"
        />
        <!-- Wave 3 -->
        <path
          d="M-100,52 Q-30,40 40,52 Q110,64 180,52 Q250,40 320,52 Q390,64 460,52 Q510,40 550,52 L550,80 L-100,80 Z"
          fill="#7ec8e3"
          opacity="0.3"
          class="wave wave-3"
        />
      </svg>
    </div>

    <!-- Beach area -->
    <div class="beach-area">
      <!-- Shell (clickable) -->
      <div
        class="shell"
        :class="{ clicked: clickedShell }"
        @click="clickShell"
      >
        <img src="/assets/icons/icon-beach-shell.svg" width="30" height="20" alt="" />
      </div>

      <!-- Starfish (decorative) -->
      <div class="starfish">
        <img src="/assets/icons/icon-beach-starfish.svg" width="30" height="30" alt="" />
      </div>

      <!-- Shell bubble (appears on click) -->
      <div v-if="clickedShell" class="shell-bubble">
        <p>{{ shellMessage }}</p>
        <button class="btn-3d btn-3d-teal" @click="goGame">
          进入 2048
        </button>
      </div>
    </div>

    <!-- Game 2048 entry card -->
    <div class="game-entry card card-teal" @click="goGame">
      <div class="game-icon">
        <img src="/assets/icons/icon-beach-game2048.svg" width="32" height="32" alt="" />
      </div>
      <div class="game-info">
        <h3>2048</h3>
        <p>经典数字合并游戏——看看你能不能赢</p>
      </div>
      <div class="game-arrow">
        <img src="/assets/icons/icon-beach-arrow.svg" width="16" height="16" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.beach-view {
  max-width: 650px;
  margin: 0 auto;
  padding: var(--space-lg);
  animation: fade-in-up 0.6s ease;
}

.view-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--c-text-heading);
  margin-bottom: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.title-icon {
  flex-shrink: 0;
}

.view-sub {
  color: var(--c-text-muted);
  font-size: 1rem;
  margin-bottom: 14px;
}

/* Wave container */
.wave-container {
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.wave-svg {
  width: 110%;
  height: 80px;
  display: block;
}

.wave-1 {
  animation: wave-drift 4s ease-in-out infinite;
}

.wave-2 {
  animation: wave-drift 5s ease-in-out infinite reverse;
}

.wave-3 {
  animation: wave-drift 6s ease-in-out infinite 0.5s;
}

/* Beach area */
.beach-area {
  background: linear-gradient(180deg, #FFF8D6 0%, #F5E6C8 100%);
  border-radius: 24px;
  padding: var(--space-lg);
  position: relative;
  z-index: 0;
  margin-top: -20px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-md);
}

/* Shell */
.shell {
  cursor: pointer;
  transition: transform var(--transition-bounce);
}

.shell:hover {
  transform: scale(1.3) rotate(-10deg);
}

.shell:active {
  transform: scale(1.2);
}

.shell.clicked {
  transform: scale(1.5);
}

/* Starfish */
.starfish {
  transition: transform var(--transition-bounce);
}

.starfish:hover {
  transform: rotate(15deg) scale(1.2);
  cursor: pointer;
}

/* Shell bubble */
.shell-bubble {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--card-default);
  border-radius: var(--radius-card);
  padding: 14px 18px;
  box-shadow: 0 6px 20px rgba(90, 74, 58, 0.12);
  text-align: center;
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  max-width: 280px;
  margin-bottom: var(--space-sm);
  z-index: var(--z-bubble);
  border: 1.5px solid var(--c-border-card);
}

.shell-bubble p {
  font-size: 0.9rem;
  color: var(--c-text-body);
  margin-bottom: 10px;
}

/* Game 2048 entry card */
.game-entry {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: var(--space-md) 20px;
  cursor: pointer;
}

.game-entry:active {
  transform: scale(0.98);
}

.game-entry .game-icon {
  display: flex;
  align-items: center;
}

.game-info h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--c-text-heading);
}

.game-info p {
  font-size: 0.85rem;
  color: var(--c-text-body);
  margin: 0;
}

.game-arrow {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
