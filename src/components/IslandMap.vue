<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CloudLayer from './CloudLayer.vue'
import ButterflyEffect from './ButterflyEffect.vue'
import GrassWave from './GrassWave.vue'
import IslandBuilding from './IslandBuilding.vue'
import IslandCharacter from './IslandCharacter.vue'
import IslandPath from './IslandPath.vue'

const router = useRouter()

const buildings = [
  { id: 'plaza', label: '广场大树', x: 160, y: 80, route: '/' },
  { id: 'house', label: '我的小屋', x: 60, y: 180, route: '/about' },
  { id: 'museum', label: '博物馆', x: 280, y: 160, route: '/blog' },
  { id: 'workshop', label: '工坊', x: 80, y: 300, route: '/skills' },
  { id: 'campsite', label: '露营地', x: 230, y: 300, route: '/projects' },
  { id: 'beach', label: '沙滩', x: 280, y: 400, route: '/relax' },
]

const paths = [
  { from: 'plaza', to: 'house' },
  { from: 'plaza', to: 'museum' },
  { from: 'house', to: 'workshop' },
  { from: 'museum', to: 'campsite' },
  { from: 'workshop', to: 'campsite' },
  { from: 'campsite', to: 'beach' },
]

const activeBuilding = ref(null)

function onBuildingClick(building) {
  activeBuilding.value = building.id
  setTimeout(() => {
    router.push(building.route)
    activeBuilding.value = null
  }, 400)
}
</script>

<template>
  <aside class="island-sidebar">
    <svg class="island-svg" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F0F7EE" />
          <stop offset="100%" stop-color="#C5E0B7" />
        </linearGradient>
        <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#A8D8EA" />
          <stop offset="100%" stop-color="#89C2D9" />
        </linearGradient>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#2D4A1E" flood-opacity="0.12" />
        </filter>
      </defs>

      <!-- Sky -->
      <rect width="400" height="500" fill="url(#skyGrad)" />

      <!-- Clouds -->
      <CloudLayer />

      <!-- Ocean -->
      <ellipse cx="200" cy="320" rx="230" ry="190" fill="url(#oceanGrad)" opacity="0.35" />

      <!-- Island land mass -->
      <path
        d="M80 160 Q120 80 200 70 Q290 60 340 140 Q380 220 350 340 Q320 430 200 450 Q80 430 60 340 Q40 240 80 160Z"
        fill="var(--c-bg)"
        stroke="var(--c-accent)"
        stroke-width="3"
        filter="url(#softShadow)"
      />

      <!-- Grass texture dots -->
      <g fill="var(--c-card)" opacity="0.5">
        <circle cx="100" cy="200" r="3"/>
        <circle cx="140" cy="170" r="2"/>
        <circle cx="250" cy="130" r="2.5"/>
        <circle cx="300" cy="200" r="2"/>
        <circle cx="150" cy="290" r="3"/>
        <circle cx="280" cy="320" r="2"/>
        <circle cx="200" cy="370" r="2.5"/>
        <circle cx="120" cy="360" r="2"/>
        <circle cx="320" cy="280" r="2"/>
        <circle cx="180" cy="220" r="2"/>
      </g>

      <!-- Grass waves -->
      <GrassWave />

      <!-- Paths connecting buildings -->
      <IslandPath :paths="paths" :buildings="buildings" />

      <!-- Buildings -->
      <IslandBuilding
        v-for="b in buildings"
        :key="b.id"
        :building="b"
        :active="activeBuilding === b.id"
        @click="onBuildingClick(b)"
      />

      <!-- Butterflies -->
      <ButterflyEffect />

      <!-- Player character -->
      <IslandCharacter :buildings="buildings" :active-building="activeBuilding" />
    </svg>
  </aside>
</template>

<style scoped>
.island-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  z-index: var(--z-sidebar);
  background: var(--c-bg);
  border-right: 3px solid var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.island-svg {
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
@media (max-width: 1024px) {
  .island-sidebar {
    position: relative;
    width: 100%;
    height: 280px;
    border-right: none;
    border-bottom: 3px solid var(--c-accent);
  }
}
</style>
