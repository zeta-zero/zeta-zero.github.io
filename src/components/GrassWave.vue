<script setup>
import { computed } from 'vue'

/* 8 static grass blades with irregular heights along a horizontal band */
const blades = computed(() => {
  const baseX = [80, 110, 140, 170, 200, 230, 260, 290]
  const baseY = 170
  const heights = [18, 24, 16, 28, 20, 22, 15, 26]
  const xOffsets = [-3, 2, -1, 3, -2, 1, -3, 2]

  return baseX.map((x, i) => ({
    topX: x,
    topY: baseY - heights[i],
    baseX1: x + xOffsets[i],
    baseY1: baseY,
    baseX2: x + xOffsets[i] + 4,
    baseY2: baseY,
  }))
})
</script>

<template>
  <g class="grass-layer" opacity="0.4">
    <g v-for="(blade, i) in blades" :key="i">
      <!-- Main blade line — mint accent -->
      <line
        :x1="blade.topX"
        :y1="blade.topY"
        :x2="blade.baseX1"
        :y2="blade.baseY1"
        stroke="var(--c-accent-mint)"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <!-- Secondary blade line — green, slightly offset -->
      <line
        :x1="blade.topX + 2"
        :y1="blade.topY + 2"
        :x2="blade.baseX2"
        :y2="blade.baseY2"
        stroke="var(--card-green)"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </g>
  </g>
</template>

<style scoped>
.grass-layer {
  pointer-events: none;
}
</style>
