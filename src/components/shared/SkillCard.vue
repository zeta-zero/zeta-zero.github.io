<script setup>
defineProps({
  category: { type: Object, required: true },
  flipped: { type: Boolean, default: false },
})

defineEmits(['flip'])

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
        <img :src="`/assets/icons/skill-${category.icon}.svg`" class="front-icon" width="40" height="40" alt="" />
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
          <img :src="`/assets/icons/skill-${category.icon}.svg`" class="back-icon-inline" width="20" height="20" alt="" />
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
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="n <= skill.level ? '/assets/icons/star-filled.svg' : '/assets/icons/star-empty.svg'"
                  class="star"
                  width="12"
                  height="12"
                  alt=""
                />
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

.back-icon-inline {
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

.star img {
  display: inline-block;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 3px;
}
</style>
