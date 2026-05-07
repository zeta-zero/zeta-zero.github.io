<script setup>
import { ref } from 'vue'
import SkillCard from '../shared/SkillCard.vue'
import { skillCategories } from '../../data/islandData.js'

const flippedCard = ref(null)

function onFlip(id) {
  flippedCard.value = flippedCard.value === id ? null : id
}

</script>

<template>
  <div class="workshop-view">
    <h1 class="view-title"><img src="/assets/icons/workshop-gear.svg" width="36" height="36" alt="" />工坊</h1>
    <p class="view-sub">DIY 配方卡片——这些都是我能「制作」的东西</p>

    <!-- Decorative gears -->
    <div class="gear-decoration">
      <svg
        viewBox="0 0 80 80"
        class="gear gear-1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 8 L44 16 L52 14 L50 22 L58 26 L53 32 L60 38 L52 40 L50 48 L57 54 L50 58 L46 52 L38 54 L36 62 L28 60 L28 52 L20 54 L16 60 L10 54 L16 48 L12 42 L20 38 L22 32 L14 28 L20 22 L28 24 L36 18 L34 10 L40 8Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linejoin="round"
        />
        <circle cx="40" cy="38" r="8" fill="none" stroke="currentColor" stroke-width="2.5" />
      </svg>
      <svg
        viewBox="0 0 60 60"
        class="gear gear-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 6 L33 12 L39 10.5 L37.5 16.5 L43.5 19.5 L39 24 L45 28.5 L39 30 L37.5 36 L43.5 40.5 L37.5 43.5 L34.5 39 L33 45 L27 43.5 L27 37.5 L21 39 L18 45 L12 40.5 L16.5 36 L12 31.5 L18 30 L19.5 24 L13.5 19.5 L19.5 16.5 L22.5 21 L24 15 L30 6Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <circle cx="30" cy="28.5" r="6" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <!-- Skill card grid -->
    <div class="skill-grid">
      <SkillCard
        v-for="cat in skillCategories"
        :key="cat.id"
        :category="cat"
        :flipped="flippedCard === cat.id"
        @flip="onFlip(cat.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.workshop-view {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-lg);
  position: relative;
  animation: fade-in-up 0.6s ease;
}

.view-title {
  font-size: 2rem;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--c-text-heading);
  margin-bottom: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.view-title img {
  display: block;
  flex-shrink: 0;
}

.view-sub {
  color: var(--c-text-muted);
  font-size: 1rem;
  margin-bottom: var(--space-lg);
}

/* Decorative gears */
.gear-decoration {
  position: absolute;
  top: 10px;
  right: 20px;
  pointer-events: none;
  opacity: 0.3;
  color: var(--c-text-muted);
}

.gear {
  width: 80px;
  height: 80px;
}

.gear-1 {
  animation: spin-slow 60s linear infinite;
}

.gear-2 {
  position: absolute;
  top: 10px;
  right: 55px;
  width: 60px;
  height: 60px;
  animation: spin-slow 45s linear infinite reverse;
}

/* Skill grid */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-md);
}
</style>
