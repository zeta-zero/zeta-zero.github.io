<script setup>
import SpeechBubble from '../shared/SpeechBubble.vue'
import { aboutData } from '../../data/islandData.js'
</script>

<template>
  <div class="house-view">
    <h1 class="view-title">
      <img src="/assets/icons/icon-house-title.svg" class="title-icon" width="32" height="32" alt="" />
      我的小屋
    </h1>
    <p class="view-sub">一位嵌入式岛民的温馨小窝</p>

    <!-- Section 1: About -->
    <div class="about-section card">
      <h2 class="section-heading">
        <img src="/assets/icons/icon-house-person.svg" class="section-icon" width="20" height="20" alt="" />
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
        <img src="/assets/icons/icon-house-photo.svg" class="section-icon" width="20" height="20" alt="" />
        岛民照片
      </h2>
      <div class="photo-frame">
        <img src="/src/assets/imgs/profilephoto.png" alt="岛民照片" />
      </div>
    </div>

    <!-- Section 3: Self-intro -->
    <div class="about-section card">
      <h2 class="section-heading">
        <img src="/assets/icons/icon-house-doc.svg" class="section-icon" width="20" height="20" alt="" />
        岛民自述
      </h2>
      <p class="about-desc">{{ aboutData.selfIntro }}</p>
      <p class="email-line">
        <img src="/assets/icons/icon-house-email.svg" class="email-icon" width="16" height="16" alt="" />
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
