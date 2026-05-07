<script setup>
import SpeechBubble from '../shared/SpeechBubble.vue'
import { aboutData } from '../../data/islandData.js'
</script>

<template>
  <div class="house-view">
    <h1 class="view-title">
      <svg class="title-icon" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
        <path
          d="M2 14 L16 4 L30 14"
          fill="none"
          stroke="var(--c-text-heading)"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="6" y="14" width="20" height="15" rx="2"
          fill="var(--card-yellow)"
          stroke="var(--c-text-heading)"
          stroke-width="2"
        />
        <rect
          x="13" y="20" width="6" height="9" rx="2"
          fill="#8B4513"
        />
        <circle cx="17" cy="25" r="1.2" fill="var(--card-yellow)" />
      </svg>
      我的小屋
    </h1>
    <p class="view-sub">一位嵌入式岛民的温馨小窝</p>

    <!-- Section 1: About -->
    <div class="about-section card">
      <h2 class="section-heading">
        <svg viewBox="0 0 20 20" width="20" height="20" class="section-icon" aria-hidden="true">
          <circle cx="10" cy="6" r="4" fill="var(--card-yellow)" stroke="var(--c-text-heading)" stroke-width="1.5" />
          <ellipse cx="10" cy="15" rx="7" ry="4" fill="var(--card-default)" stroke="var(--c-text-heading)" stroke-width="1.5" />
        </svg>
        关于这位岛民
      </h2>
      <p class="about-desc">{{ aboutData.description }}</p>
      <div class="skills-tags">
        <span v-for="tag in aboutData.skillsTags" :key="tag" class="tag-pill">{{ tag }}</span>
      </div>
      <p class="about-quote">{{ aboutData.quote }}</p>
    </div>

    <!-- Section 2: Photo -->
    <div class="about-section card">
      <h2 class="section-heading">
        <svg viewBox="0 0 20 20" width="20" height="20" class="section-icon" aria-hidden="true">
          <rect x="2" y="3" width="16" height="14" rx="2" fill="var(--card-yellow)" stroke="var(--c-text-heading)" stroke-width="1.5" />
          <circle cx="7" cy="8" r="2" fill="var(--c-accent-mint)" opacity="0.5" />
          <path d="M5 15 L8 11 L11 13 L15 8" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        岛民照片
      </h2>
      <div class="photo-frame">
        <img src="/src/assets/imgs/profilephoto.png" alt="岛民照片" />
      </div>
    </div>

    <!-- Section 3: Self-intro -->
    <div class="about-section card">
      <h2 class="section-heading">
        <svg viewBox="0 0 20 20" width="20" height="20" class="section-icon" aria-hidden="true">
          <path
            d="M3 4 L8 4 L10 2 L12 4 L17 4 L17 16 L3 16 Z"
            fill="none"
            stroke="var(--c-text-heading)"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <line x1="7" y1="8" x2="13" y2="8" stroke="var(--c-accent-mint)" stroke-width="1" stroke-linecap="round" />
          <line x1="7" y1="11" x2="13" y2="11" stroke="var(--c-accent-mint)" stroke-width="1" stroke-linecap="round" />
          <line x1="7" y1="14" x2="10" y2="14" stroke="var(--c-accent-mint)" stroke-width="1" stroke-linecap="round" />
        </svg>
        岛民自述
      </h2>
      <p class="about-desc">{{ aboutData.selfIntro }}</p>
      <p class="email-line">
        <svg viewBox="0 0 16 16" width="16" height="16" class="email-icon" aria-hidden="true">
          <rect x="1" y="3" width="14" height="10" rx="2" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.5" />
          <path d="M1 4 L8 9 L15 4" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ aboutData.email }}
      </p>
    </div>

    <SpeechBubble
      speaker="岛民"
      text="哩哈～欢迎来我家做客！虽然有点乱，但每个角落都有故事。"
      class="house-bubble"
    />
  </div>
</template>

<style scoped>
/* ---------- Layout ---------- */
.house-view {
  max-width: 650px;
  margin: 0 auto;
  padding: var(--space-lg);
  animation: fade-in-up 0.6s ease both;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.view-title {
  font-size: 2rem;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--c-text-heading);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.title-icon {
  flex-shrink: 0;
}

.view-sub {
  font-size: 1rem;
  color: var(--c-text-muted);
}

.about-section {
  padding: var(--space-lg);
}

.section-heading {
  font-size: 1.15rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--c-text-heading);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 12px;
}

.section-icon {
  flex-shrink: 0;
}

.about-desc {
  margin-bottom: var(--space-sm);
  line-height: 1.7;
  color: var(--c-text-body);
}

/* Skills tags */
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: var(--space-sm);
}

/* Quote */
.about-quote {
  font-style: italic;
  color: var(--c-accent-mint);
  margin-top: var(--space-xs);
  font-size: 0.95rem;
}

/* Photo frame */
.photo-frame {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 8px solid var(--c-border-card);
  box-shadow: 0 4px 0 0 rgba(189, 174, 160, 0.3);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Email */
.email-line {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--c-accent-mint);
  font-weight: 600;
}

.email-icon {
  flex-shrink: 0;
}

/* Speech bubble at bottom */
.house-bubble {
  margin-top: var(--space-sm);
}
</style>
