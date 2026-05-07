<script setup>
import { ref } from 'vue'

defineProps({
  project: { type: Object, required: true },
})

const expanded = ref(false)

function toggle() {
  expanded.value = !expanded.value
}

function iconSvg(name) {
  if (name === 'gear') return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.4"/><path d="M10 5 L10 2.5 M10 15 L10 17.5 M5 10 L2.5 10 M15 10 L17.5 10 M6.5 6.5 L4.6 4.6 M13.5 13.5 L15.4 15.4 M6.5 13.5 L4.6 15.4 M13.5 6.5 L15.4 4.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
  if (name === 'antenna') return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.4"/><path d="M10 4 L10 1.5 M10 16 L10 18.5 M4 10 L1.5 10 M16 10 L18.5 10 M5.8 5.8 L3.8 3.8 M14.2 5.8 L16.2 3.8 M5.8 14.2 L3.8 16.2 M14.2 14.2 L16.2 16.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
  if (name === 'button') return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.4"/></svg>'
  if (name === 'chip') return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="3" y1="7" x2="17" y2="7" stroke="currentColor" stroke-width="0.8"/><line x1="3" y1="13" x2="17" y2="13" stroke="currentColor" stroke-width="0.8"/><line x1="7" y1="3" x2="7" y2="7" stroke="currentColor" stroke-width="0.8"/><line x1="13" y1="3" x2="13" y2="7" stroke="currentColor" stroke-width="0.8"/><line x1="7" y1="13" x2="7" y2="17" stroke="currentColor" stroke-width="0.8"/><line x1="13" y1="13" x2="13" y2="17" stroke="currentColor" stroke-width="0.8"/></svg>'
  if (name === 'link') return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M8 10 L12 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 12 L7 14 C5.3 15.7 2.7 15.7 1 14 C-0.7 12.3 -0.7 9.7 1 8 L3 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 8 L13 6 C14.7 4.3 17.3 4.3 19 6 C20.7 7.7 20.7 10.3 19 12 L17 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  if (name === 'web') return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="10" cy="10" rx="3" ry="8" fill="none" stroke="currentColor" stroke-width="0.8"/><line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="0.8"/></svg>'
  return '<svg viewBox="0 0 20 20" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 5 L10 10 L14 12" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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
      <span class="tent-icon" v-html="iconSvg(project.icon)"></span>
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
  color: var(--c-text-heading);
  flex-shrink: 0;
}

.tent-icon :deep(svg) {
  display: block;
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
