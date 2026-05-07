<script setup>
import { ref } from 'vue'

defineProps({
  project: { type: Object, required: true },
})

const expanded = ref(false)

function toggle() {
  expanded.value = !expanded.value
}

</script>

<template>
  <div class="tent-card card" :class="{ expanded }" @click="toggle">
    <!-- Tent SVG -->
    <svg
      viewBox="0 0 40 36"
      class="tent-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="20,4 2,34 38,34"
        fill="none"
        stroke="var(--c-text-heading)"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <line
        x1="20"
        y1="4"
        x2="20"
        y2="34"
        stroke="var(--c-text-heading)"
        stroke-width="1.5"
        stroke-dasharray="3 3"
      />
      <polygon
        points="20,4 2,34 20,34"
        fill="var(--c-text-heading)"
        opacity="0.08"
      />
    </svg>

    <!-- Header -->
    <div class="tent-header">
      <img :src="`/assets/icons/project-${project.icon}.svg`" class="tent-icon" width="22" height="22" alt="" />
      <h3 class="tent-title">{{ project.title }}</h3>
    </div>

    <!-- Expandable detail -->
    <transition name="tent-expand">
      <div v-if="expanded" class="tent-detail">
        <p class="tent-desc">{{ project.description }}</p>
        <div class="tent-tags">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="tag-pill"
          >{{ tag }}</span>
        </div>
      </div>
    </transition>

    <!-- Hint -->
    <div class="tent-hint">
      {{ expanded ? '▲ 点击收起' : '▼ 点击展开' }}
    </div>
  </div>
</template>

<style scoped>
.tent-card {
  padding: var(--space-lg);
  cursor: pointer;
  text-align: center;
  transition: transform var(--transition-bounce), box-shadow var(--transition-smooth);
}

.tent-card:active {
  transform: scale(0.97);
}

.tent-card.expanded {
  text-align: left;
}

/* --- Tent SVG --- */
.tent-svg {
  width: 50px;
  height: 45px;
  margin: 0 auto;
  display: block;
}

/* --- Header --- */
.tent-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin: var(--space-sm) 0;
}

.tent-icon {
  flex-shrink: 0;
}

.tent-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--c-text-heading);
  letter-spacing: 0.01em;
}

/* --- Detail --- */
.tent-detail {
  margin-top: var(--space-md);
  overflow: hidden;
}

.tent-desc {
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--c-text-body);
  margin-bottom: var(--space-md);
}

.tent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* --- Hint --- */
.tent-hint {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  margin-top: var(--space-md);
  letter-spacing: 0.02em;
  user-select: none;
}

/* --- Expand transition --- */
.tent-expand-enter-active {
  transition: max-height 0.35s ease, opacity 0.35s ease;
  max-height: 400px;
  overflow: hidden;
}

.tent-expand-leave-active {
  transition: max-height 0.25s ease, opacity 0.25s ease;
  max-height: 0;
  overflow: hidden;
}

.tent-expand-enter-from {
  max-height: 0;
  opacity: 0;
}

.tent-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.tent-expand-enter-to,
.tent-expand-leave-from {
  max-height: 400px;
  opacity: 1;
}
</style>
