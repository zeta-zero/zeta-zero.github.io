<script setup>
import { computed } from 'vue'

const props = defineProps({
  building: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

defineEmits(['click'])

const shapes = {
  plaza: 'M-20,0 L-20,-35 L0,-55 L20,-35 L20,0 Z',
  house: 'M-18,0 L-18,-25 L-22,-25 L0,-45 L22,-25 L18,-25 L18,0 Z',
  museum: 'M-22,0 L-22,-30 L-12,-40 L0,-30 L12,-40 L22,-30 L22,0 Z',
  workshop: 'M-16,0 L-16,-20 L-10,-28 L0,-18 L10,-28 L16,-20 L16,0 Z',
  campsite: 'M-20,0 L-20,-15 L0,-35 L20,-15 L20,0 Z',
  beach: 'M-16,0 L-16,-18 L-8,-28 L8,-28 L16,-18 L16,0 Z',
}

const shape = computed(() => shapes[props.building.id] || shapes.plaza)
</script>

<template>
  <g :transform="`translate(${building.x}, ${building.y})`">
    <g
      class="building-group"
      :class="{ active }"
      @click="$emit('click')"
    >
      <!-- Drop shadow -->
      <path :d="shape" fill="#5a4a3a" opacity="0.1" transform="translate(2, 2)" />

      <!-- Active glow ring -->
      <path
        v-if="active"
        :d="shape"
        fill="var(--card-yellow)"
        stroke="#FFCA3A"
        stroke-width="3"
        stroke-dasharray="6 4"
        opacity="0.8"
        filter="url(#activeGlow)"
        class="active-glow-ring"
      />

      <!-- Building body -->
      <path
        :d="shape"
        fill="var(--c-bg-content)"
        stroke="var(--c-text-heading)"
        stroke-width="2"
        stroke-linejoin="round"
        class="building-body"
      />

      <!-- SVG Icons per building type -->
      <g v-if="building.id === 'plaza'" transform="translate(0, -12)" fill="none" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round">
        <line x1="0" y1="12" x2="0" y2="-2" />
        <line x1="0" y1="2" x2="-8" y2="8" />
        <line x1="0" y1="2" x2="8" y2="8" />
        <line x1="0" y1="-2" x2="-7" y2="4" />
        <line x1="0" y1="-2" x2="7" y2="4" />
        <circle cx="0" cy="-6" r="8" fill="var(--card-green)" opacity="0.5" />
      </g>

      <g v-else-if="building.id === 'house'" transform="translate(0, -10)" fill="none" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round">
        <path d="M-10,4 L0,-8 L10,4" fill="var(--card-yellow)" opacity="0.7" stroke-width="2" />
        <rect x="-7" y="4" width="14" height="8" rx="1" fill="var(--c-bg-content)" />
        <rect x="-2" y="7" width="4" height="5" rx="1" fill="var(--card-teal)" opacity="0.5" />
      </g>

      <g v-else-if="building.id === 'museum'" transform="translate(0, -10)" fill="none" stroke="var(--c-text-heading)" stroke-width="2" stroke-linejoin="round">
        <rect x="-11" y="-2" width="22" height="14" rx="2" fill="var(--c-bg-content)" />
        <line x1="-6" y1="-2" x2="-6" y2="12" />
        <line x1="6" y1="-2" x2="6" y2="12" />
        <rect x="-8" y="1" width="3" height="5" rx="1" fill="var(--card-blue)" opacity="0.5" />
        <rect x="5" y="1" width="3" height="5" rx="1" fill="var(--card-blue)" opacity="0.5" />
      </g>

      <g v-else-if="building.id === 'workshop'" transform="translate(0, -8)" fill="none" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round">
        <circle cx="0" cy="0" r="7" stroke-width="2.2" />
        <circle cx="0" cy="0" r="3" />
        <line x1="0" y1="-7" x2="0" y2="-10" />
        <line x1="5" y1="-5" x2="7.5" y2="-7.5" />
        <line x1="7" y1="0" x2="10" y2="0" />
        <line x1="5" y1="5" x2="7.5" y2="7.5" />
        <line x1="-5" y1="5" x2="-7.5" y2="7.5" />
        <line x1="-7" y1="0" x2="-10" y2="0" />
        <line x1="-5" y1="-5" x2="-7.5" y2="-7.5" />
      </g>

      <g v-else-if="building.id === 'campsite'" transform="translate(0, -8)" fill="none" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="0,-12 -12,4 12,4" fill="var(--card-yellow)" opacity="0.6" />
        <line x1="0" y1="-12" x2="0" y2="4" stroke-dasharray="3 3" opacity="0.6" />
        <polygon points="0,-12 -12,4 0,4" fill="var(--card-orange)" opacity="0.4" />
      </g>

      <g v-else-if="building.id === 'beach'" transform="translate(0, -8)" fill="none" stroke="var(--c-text-heading)" stroke-width="2" stroke-linecap="round">
        <path d="M-10,4 C-10,-8 10,-8 10,4" fill="var(--card-sky)" opacity="0.6" />
        <ellipse cx="0" cy="6" rx="12" ry="3" fill="var(--card-teal)" opacity="0.5" />
        <circle cx="0" cy="0" r="1.5" fill="var(--c-text-heading)" />
        <path d="M-6,-3 Q-3,-6 0,-3" />
        <path d="M2,-3 Q5,-7 8,-3" />
      </g>

      <!-- Building label -->
      <text y="22" text-anchor="middle" font-size="10" fill="var(--c-text-heading)" font-weight="700" font-family="var(--font-body)" class="building-label">{{ building.label }}</text>
    </g>
  </g>
</template>

<style scoped>
.building-group {
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.building-group:hover {
  transform: scale(1.12) translateY(-4px);
}
.building-group.active {
  transform: scale(1.15) translateY(-5px);
}
.building-body {
  transition: fill 0.3s ease;
}
.building-group:hover .building-body {
  fill: var(--card-yellow);
}
.building-group.active .building-body {
  fill: var(--card-yellow);
}
.active-glow-ring {
  animation: active-glow 1.5s linear infinite;
}
@keyframes active-glow {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 20; }
}
.building-label {
  pointer-events: none;
}
</style>
