<script setup>
defineProps({
  category: { type: Object, required: true },
  flipped: { type: Boolean, default: false },
})

defineEmits(['flip'])

function categorySvg(icon) {
  if (icon === 'embedded') return '<svg viewBox="0 0 40 40" width="40" height="40"><rect x="4" y="6" width="32" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="8" y="10" width="10" height="8" rx="1" fill="currentColor" opacity="0.25"/><rect x="8" y="22" width="14" height="3" rx="1" fill="currentColor" opacity="0.15"/><rect x="8" y="27" width="9" height="3" rx="1" fill="currentColor" opacity="0.15"/><circle cx="28" cy="20" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M28 16 L28 20 L32 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  if (icon === 'antenna') return '<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="20" cy="20" r="3.5" fill="currentColor" opacity="0.4"/><path d="M20 10 L20 5 M20 30 L20 35 M10 20 L5 20 M30 20 L35 20 M12.9 12.9 L9.4 9.4 M27.1 12.9 L30.6 9.4 M12.9 27.1 L9.4 30.6 M27.1 27.1 L30.6 30.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  if (icon === 'desktop') return '<svg viewBox="0 0 40 40" width="40" height="40"><rect x="5" y="6" width="30" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="10" y="9" width="20" height="11" rx="1.5" fill="currentColor" opacity="0.2"/><line x1="20" y1="24" x2="20" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="11" y1="32" x2="29" y2="32" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'
  if (icon === 'web') return '<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.2"/><ellipse cx="20" cy="20" rx="6" ry="15" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="13" x2="35" y2="13" stroke="currentColor" stroke-width="0.8" opacity="0.4"/><line x1="5" y1="27" x2="35" y2="27" stroke="currentColor" stroke-width="0.8" opacity="0.4"/></svg>'
  if (icon === 'python') return '<svg viewBox="0 0 40 40" width="40" height="40"><path d="M12 14 C12 8 17 5 21 5 C25 5 28 7 28 10 C28 13 25 14 21 14 C17 14 13 14 13 18 C13 22 15 24 18 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M28 26 C28 32 23 35 19 35 C15 35 12 33 12 30 C12 27 15 26 19 26 C23 26 27 26 27 22 C27 18 25 16 22 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="21" cy="20" r="2.5" fill="currentColor" opacity="0.5"/></svg>'
  if (icon === 'pcb') return '<svg viewBox="0 0 40 40" width="40" height="40"><rect x="5" y="5" width="30" height="30" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" stroke-width="1"/><line x1="8" y1="15" x2="32" y2="15" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="21" r="1.8" fill="currentColor" opacity="0.5"/><circle cx="20" cy="21" r="1.8" fill="currentColor" opacity="0.5"/><circle cx="28" cy="21" r="1.8" fill="currentColor" opacity="0.5"/><rect x="10" y="26" width="10" height="3" rx="1" fill="currentColor" opacity="0.2"/><rect x="24" y="25" width="8" height="4" rx="1" fill="currentColor" opacity="0.3"/></svg>'
  return '<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M20 9 L20 20 L27 23" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
}

function starSvg(filled) {
  return filled
    ? '<svg viewBox="0 0 16 16" width="12" height="12"><path d="M8 1.5 L9.8 5.7 L14.5 6.2 L11 9.3 L12 14 L8 11.5 L4 14 L5 9.3 L1.5 6.2 L6.2 5.7 Z" fill="#FFCA3A" stroke="#E5A800" stroke-width="0.5"/></svg>'
    : '<svg viewBox="0 0 16 16" width="12" height="12"><path d="M8 1.5 L9.8 5.7 L14.5 6.2 L11 9.3 L12 14 L8 11.5 L4 14 L5 9.3 L1.5 6.2 L6.2 5.7 Z" fill="#d4c9b4" stroke="#c4b896" stroke-width="0.5"/></svg>'
}

function backFaceClass(icon) {
  const map = {
    embedded: 'card-teal',
    antenna: 'card-blue',
    desktop: 'card-yellow',
    web: 'card-purple',
    python: 'card-orange',
    pcb: 'card-green',
  }
  return map[icon] || ''
}
</script>

<template>
  <div
    class="skill-card-3d"
    :class="{ flipped }"
    @click="$emit('flip')"
  >
    <div class="card-inner">
      <!-- FRONT FACE -->
      <div class="card-face card-front">
        <div class="front-icon" v-html="categorySvg(category.icon)"></div>
        <h3 class="front-title">{{ category.title }}</h3>
        <p class="front-summary">{{ category.summary }}</p>
        <span class="front-hint">点击翻转</span>
      </div>
      <!-- BACK FACE -->
      <div
        class="card-face card-back"
        :class="backFaceClass(category.icon)"
      >
        <h3 class="back-title">
          <span class="back-icon-inline" v-html="categorySvg(category.icon)"></span>
          {{ category.title }}
        </h3>
        <div class="skill-list">
          <div
            v-for="skill in category.skills"
            :key="skill.name"
            class="skill-row"
          >
            <div class="skill-head">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-stars">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="star"
                  v-html="starSvg(n <= skill.level)"
                ></span>
              </span>
            </div>
            <div class="skill-tags">
              <span
                v-for="tag in skill.tags"
                :key="tag"
                class="tag-pill"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-card-3d {
  perspective: 800px;
  height: 320px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.skill-card-3d:active .card-inner {
  transform: scale(0.97);
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius-card);
  border: 2px solid var(--c-border-card);
  padding: var(--space-lg);
  overflow: hidden;
  box-shadow: 0 4px 0 0 rgba(189, 174, 160, 0.25);
}

/* --- FRONT --- */
.card-front {
  background: var(--card-default);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-sm);
}

.front-icon {
  color: var(--c-text-heading);
}

.front-icon :deep(svg) {
  display: block;
}

.front-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--c-text-heading);
  letter-spacing: 0.01em;
}

.front-summary {
  font-size: 0.84rem;
  color: var(--c-text-body);
  line-height: 1.5;
  max-width: 220px;
}

.front-hint {
  position: absolute;
  bottom: 12px;
  font-size: 0.74rem;
  color: var(--c-text-muted);
  letter-spacing: 0.03em;
}

/* --- BACK --- */
.card-back {
  background: var(--card-default);
  transform: rotateY(180deg);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card-back.card-teal    { background: var(--card-teal); border-color: #5fa892; }
.card-back.card-blue    { background: var(--card-blue); border-color: #6b7fd8; }
.card-back.card-yellow  { background: var(--card-yellow); border-color: #d4a840; }
.card-back.card-purple  { background: var(--card-purple); border-color: #9b60d8; }
.card-back.card-orange  { background: var(--card-orange); border-color: #c97a50; }
.card-back.card-green   { background: var(--card-green); border-color: #6aa86a; }

.back-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--c-text-heading);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.back-icon-inline :deep(svg) {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
  overflow-y: auto;
}

.skill-row {
  font-size: 0.78rem;
}

.skill-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-xs);
}

.skill-name {
  font-weight: 700;
  color: var(--c-text-heading);
  white-space: nowrap;
}

.skill-stars {
  display: flex;
  gap: 1px;
  flex-shrink: 0;
}

.star :deep(svg) {
  display: inline-block;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 3px;
}
</style>
