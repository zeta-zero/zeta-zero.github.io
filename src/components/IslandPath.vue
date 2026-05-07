<script setup>
import { computed } from 'vue'

const props = defineProps({
  paths: { type: Array, required: true },
  buildings: { type: Array, required: true },
})

/* Build a lookup map from building id → { x, y } */
const buildingMap = computed(() => {
  const map = {}
  props.buildings.forEach(b => { map[b.id] = b })
  return map
})

/**
 * Compute a quadratic bezier path d-attribute between two buildings.
 * Midpoint is slightly offset downward for organic curve.
 */
function pathD(fromId, toId) {
  const f = buildingMap.value[fromId]
  const t = buildingMap.value[toId]
  if (!f || !t) return ''
  const midX = (f.x + t.x) / 2
  const midY = (f.y + t.y) / 2 + 5
  return `M${f.x},${f.y + 5} Q${midX},${midY} ${t.x},${t.y + 5}`
}
</script>

<template>
  <g class="paths-group">
    <!-- Wide warm underlying path -->
    <path
      v-for="(p, i) in paths"
      :key="i"
      :d="pathD(p.from, p.to)"
      fill="none"
      stroke="var(--card-yellow)"
      stroke-width="10"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.4"
    />
    <!-- Dashed outline path -->
    <path
      v-for="(p, i) in paths"
      :key="'dash-' + i"
      :d="pathD(p.from, p.to)"
      fill="none"
      stroke="var(--c-text-muted)"
      stroke-width="1.5"
      stroke-dasharray="5 8"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.5"
    />
  </g>
</template>

<style scoped>
.paths-group {
  pointer-events: none;
}
</style>
