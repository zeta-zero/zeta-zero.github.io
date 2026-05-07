<script setup>
import { ref, computed } from 'vue'
import BlogExhibit from '../shared/BlogExhibit.vue'
import { blogSeries, blogArticles } from '../../data/islandData.js'

const series = blogSeries
const articles = blogArticles

const activeSeries = ref('all')
const selectedArticle = ref(null)

const filteredArticles = computed(() => {
  if (activeSeries.value === 'all') return articles
  return articles.filter(a => a.series === activeSeries.value)
})

const activeSeriesInfo = computed(() =>
  series.find(s => s.id === activeSeries.value)
)

function selectArticle(article) {
  selectedArticle.value = article
}

function goBack() {
  selectedArticle.value = null
}

function seriesIcon(id) {
  if (id === 'ble')
    return '<svg viewBox="0 0 28 28" width="28" height="28"><circle cx="14" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="14" cy="9" r="2.5" fill="currentColor" opacity="0.5"/><path d="M14 3 L14 4.5 M14 13.5 L14 15 M8 9 L9.5 9 M18.5 9 L20 9 M10 5.5 L11 6.5 M17 11.5 L18 12.5 M18 5.5 L17 6.5 M11 11.5 L10 12.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M11 15 Q14 22 17 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  if (id === 'techs')
    return '<svg viewBox="0 0 28 28" width="28" height="28"><circle cx="14" cy="10" r="5" fill="currentColor" opacity="0.25"/><circle cx="14" cy="10" r="2" fill="currentColor"/><line x1="14" y1="15" x2="14" y2="22" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="18" x2="20" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="7" y1="7" x2="10.5" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="17.5" y1="7" x2="21" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
  if (id === 'rtos')
    return '<svg viewBox="0 0 28 28" width="28" height="28"><path d="M8 24 L8 4 L20 4 L20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="8" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="7" r="1.8" fill="currentColor" opacity="0.5"/><line x1="11" y1="24" x2="17" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  return '<svg viewBox="0 0 28 28" width="28" height="28"><rect x="3" y="3" width="22" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="9" r="3" fill="currentColor" opacity="0.35"/><path d="M5 16 L10 13 L17 18 L23 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
}

function museumTitleSvg() {
  return '<svg viewBox="0 0 36 36" width="32" height="32"><rect x="5" y="10" width="26" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="8,10 18,3 28,10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><line x1="12" y1="10" x2="12" y2="30" stroke="currentColor" stroke-width="1.2"/><line x1="24" y1="10" x2="24" y2="30" stroke="currentColor" stroke-width="1.2"/><rect x="14" y="15" width="8" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="18" cy="20" r="1.2" fill="currentColor" opacity="0.5"/></svg>'
}
</script>

<template>
  <div class="museum-view">
    <h1 class="view-title" v-html="museumTitleSvg() + ' 博物馆'"></h1>
    <p class="view-sub">知识的珍藏，按类别分区陈列</p>

    <!-- Decorative fireflies -->
    <div class="fireflies">
      <div
        v-for="i in 8"
        :key="i"
        class="firefly"
        :style="{
          left: (4 + i * 11) + '%',
          top: (3 + (i % 3) * 14) + '%',
          animationDelay: (i * 1.6) + 's',
          animationDuration: (4 + (i % 3)) + 's',
        }"
      ></div>
    </div>

    <!-- Filter buttons -->
    <div class="museum-halls">
      <button
        class="btn-3d"
        :class="{ 'btn-3d-mint': activeSeries === 'all' }"
        @click="activeSeries = 'all'; selectedArticle = null"
      >
        全部展品
      </button>
      <button
        v-for="s in series"
        :key="s.id"
        class="btn-3d"
        :class="{ 'btn-3d-mint': activeSeries === s.id }"
        @click="activeSeries = s.id; selectedArticle = null"
      >
        {{ s.hall }}
      </button>
    </div>

    <!-- Hall info card -->
    <div v-if="activeSeriesInfo" class="hall-info card">
      <h3>{{ activeSeriesInfo.hall }}</h3>
      <p>{{ activeSeriesInfo.desc }}</p>
    </div>

    <!-- Article detail view -->
    <div v-if="selectedArticle" class="article-display">
      <button class="btn-3d back-btn" @click="goBack">
        ← 回到展品列表
      </button>
      <div class="article-content card">
        <h2>{{ selectedArticle.title }}</h2>
        <BlogExhibit :slug="selectedArticle.slug" />
      </div>
    </div>

    <!-- Exhibit grid -->
    <div v-else class="exhibit-grid">
      <div
        v-for="article in filteredArticles"
        :key="article.slug"
        class="exhibit-item card"
        @click="selectArticle(article)"
      >
        <div class="exhibit-icon" v-html="seriesIcon(article.series)"></div>
        <div class="exhibit-name">{{ article.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.museum-view {
  max-width: 800px;
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

.view-title :deep(svg) {
  display: block;
  flex-shrink: 0;
  color: var(--c-text-heading);
}

.view-sub {
  color: var(--c-text-muted);
  font-size: 1rem;
  margin-bottom: var(--space-md);
}

/* Fireflies */
.fireflies {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.firefly {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--card-yellow);
  border-radius: 50%;
  box-shadow: 0 0 8px 3px rgba(247, 205, 103, 0.65);
  animation: firefly-blink 5s ease-in-out infinite;
}

/* Filter buttons */
.museum-halls {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-md);
  position: relative;
  z-index: 1;
}

/* Hall info */
.hall-info {
  padding: 14px 18px;
  margin-bottom: var(--space-md);
  text-align: center;
}

.hall-info h3 {
  color: var(--c-text-heading);
  margin-bottom: var(--space-xs);
  font-family: var(--font-display);
  font-weight: 700;
}

.hall-info p {
  font-size: 0.9rem;
  color: var(--c-text-body);
  margin: 0;
}

/* Exhibit grid */
.exhibit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
}

.exhibit-item {
  padding: 14px;
  text-align: center;
  cursor: pointer;
}

.exhibit-item:active {
  transform: scale(0.97);
}

.exhibit-icon {
  margin-bottom: var(--space-xs);
  color: var(--c-accent-mint);
}

.exhibit-icon :deep(svg) {
  display: inline-block;
}

.exhibit-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-text-heading);
}

/* Article display */
.article-display {
  animation: fade-in-up 0.4s ease;
}

.back-btn {
  margin-bottom: 12px;
}

.article-content {
  padding: var(--space-lg);
}

.article-content h2 {
  color: var(--c-text-heading);
  margin-bottom: var(--space-md);
  font-family: var(--font-display);
}
</style>
