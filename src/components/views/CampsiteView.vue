<script setup>
import ProjectTent from '../shared/ProjectTent.vue'
import { projects } from '../../data/islandData.js'
</script>

<template>
  <div class="campsite-view">
    <!-- Title with tent SVG icon -->
    <h1 class="view-title">
      <img src="/assets/icons/icon-campsite-tent.svg" class="title-icon" width="32" height="32" alt="" />
      露营地
    </h1>
    <p class="view-sub">围着营火，看看岛民都做过哪些项目</p>

    <!-- Campfire SVG -->
    <div class="campfire-container">
      <svg
        viewBox="0 0 100 80"
        class="campfire-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Log 1 -->
        <line
          x1="28" y1="64" x2="62" y2="54"
          stroke="#8B7355"
          stroke-width="5"
          stroke-linecap="round"
        />
        <!-- Log 2 -->
        <line
          x1="33" y1="58" x2="68" y2="66"
          stroke="#8B4513"
          stroke-width="4.5"
          stroke-linecap="round"
        />
        <!-- Log 3 -->
        <line
          x1="24" y1="60" x2="48" y2="68"
          stroke="#A0522D"
          stroke-width="4"
          stroke-linecap="round"
        />
        <!-- Flames — rotated 180° around center -->
        <g transform="translate(0 10) rotate(180 47 34)">
          <!-- Flame 1: large orange -->
          <ellipse
            cx="47" cy="40"
            rx="16" ry="22"
            fill="#FFB347"
            class="flame flame-1"
          />
          <!-- Flame 2: medium yellow -->
          <ellipse
            cx="47" cy="33"
            rx="11" ry="17"
            fill="#FFCA3A"
            class="flame flame-2"
          />
          <!-- Flame 3: small light yellow -->
          <ellipse
            cx="47" cy="28"
            rx="7" ry="11"
            fill="#FFF8D6"
            class="flame flame-3"
          />
        </g>
        <!-- Spark 1 -->
        <circle
          cx="44" cy="18" r="2"
          fill="#FFB347"
          class="spark spark-1"
          style="--sx: -10px; --sy: -28px"
        />
        <!-- Spark 2 -->
        <circle
          cx="51" cy="14" r="1.5"
          fill="#FFCA3A"
          class="spark spark-2"
          style="--sx: 12px; --sy: -32px"
        />
        <!-- Spark 3 -->
        <circle
          cx="39" cy="16" r="1.5"
          fill="#FFF8D6"
          class="spark spark-3"
          style="--sx: -14px; --sy: -26px"
        />
      </svg>
    </div>

    <!-- Project grid -->
    <div class="project-grid">
      <ProjectTent v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<style scoped>
.campsite-view {
  max-width: 850px;
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

/* Campfire */
.campfire-container {
  text-align: center;
  margin-bottom: 18px;
}

.campfire-svg {
  width: 100px;
  height: 80px;
}

/* Flames — use the flame-flicker keyframe from style.css */
.flame {
  transform-origin: 47px 40px;
  animation: flame-flicker 1.5s ease-in-out infinite;
}

.flame-1 {
  animation-duration: 1.5s;
  animation-delay: 0s;
}

.flame-2 {
  animation-duration: 1s;
  animation-delay: 0.2s;
}

.flame-3 {
  animation-duration: 0.8s;
  animation-delay: 0.4s;
}

/* Sparks — use spark-float keyframe with CSS custom properties */
.spark {
  animation: spark-float 1.5s ease-out infinite;
}

.spark-2 {
  animation-delay: 0.5s;
}

.spark-3 {
  animation-delay: 1s;
}

/* Project grid */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
}
</style>
