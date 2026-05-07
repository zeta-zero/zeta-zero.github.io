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

</script>

<template>
  <div class="museum-view">
    <h1 class="view-title"><img src="/assets/icons/museum-building.svg" width="32" height="32" alt="" />博物馆</h1>
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
        <img :src="`/assets/icons/series-${article.series}.svg`" @error="$event.target.src='/assets/icons/series-default.svg'" class="exhibit-icon" width="28" height="28" alt="" />
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

.view-title img {
  display: block;
  flex-shrink: 0;
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
