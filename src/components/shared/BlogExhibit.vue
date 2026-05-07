<script setup>
import { ref, watch } from 'vue'

// 预注册所有博客 — Vite 在构建时解析全部匹配的 blog.md
const blogModules = import.meta.glob('../../blogs/**/blog.md')

const props = defineProps({
  slug: { type: String, required: true },
})

const blogContent = ref(null)
const loading = ref(true)
const error = ref('')

async function loadBlog() {
  loading.value = true
  error.value = ''
  blogContent.value = null
  try {
    const key = `../../blogs/${props.slug}/blog.md`
    const loader = blogModules[key]
    if (!loader) throw new Error(`Blog not found: ${props.slug}`)
    const module = await loader()
    blogContent.value = module.default
  } catch (e) {
    error.value = '展品正在修复中，请稍后再来...'
    console.error('Blog load error:', props.slug, e)
  } finally {
    loading.value = false
  }
}

watch(() => props.slug, loadBlog, { immediate: true })
</script>

<template>
  <div class="blog-exhibit">
    <!-- Skeleton loading -->
    <div v-if="loading" class="skeleton-state">
      <div class="skeleton skeleton-title"></div>
      <div
        v-for="i in 5"
        :key="i"
        class="skeleton skeleton-text"
        :style="{ width: (100 - i * 8) + '%' }"
      ></div>
      <p class="loading-text">正在搬运展品...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        class="error-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="var(--c-text-muted)"
          stroke-width="2"
        />
        <line
          x1="12"
          y1="8"
          x2="12"
          y2="13"
          stroke="var(--c-text-muted)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle
          cx="12"
          cy="16.5"
          r="1.2"
          fill="var(--c-text-muted)"
        />
      </svg>
      <p class="error-msg">{{ error }}</p>
    </div>

    <!-- Content render -->
    <transition name="content-fade">
      <div v-if="!loading && !error" class="blog-render">
        <component :is="blogContent" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.blog-exhibit {
  min-height: 200px;
}

/* --- Skeleton --- */
.skeleton-state {
  padding: var(--space-lg);
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--c-bg-content) 25%,
    #e8e0cc 50%,
    var(--c-bg-content) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

.skeleton-title {
  height: 28px;
  width: 60%;
  margin-bottom: var(--space-lg);
}

.skeleton-text {
  height: 14px;
  margin-bottom: var(--space-md);
}

.loading-text {
  text-align: center;
  color: var(--c-text-muted);
  font-size: 0.85rem;
  margin-top: var(--space-md);
  letter-spacing: 0.02em;
}

/* --- Error --- */
.error-state {
  text-align: center;
  padding: 40px var(--space-xl);
}

.error-icon {
  display: block;
  margin: 0 auto 10px;
}

.error-msg {
  color: var(--c-text-muted);
  font-size: 0.9rem;
}

/* --- Rendered content --- */
.blog-render {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--c-text-body);
}

.blog-render :deep(h1),
.blog-render :deep(h2) {
  color: var(--c-text-heading);
  font-family: var(--font-display);
  font-weight: 800;
  margin-top: var(--space-xl);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.01em;
}

.blog-render :deep(h3) {
  color: var(--c-accent-mint);
  font-family: var(--font-display);
  font-weight: 700;
  margin-top: var(--space-lg);
  margin-bottom: var(--space-xs);
}

.blog-render :deep(h4) {
  color: var(--c-text-heading);
  font-family: var(--font-display);
  font-weight: 700;
  margin-top: var(--space-md);
}

.blog-render :deep(code) {
  background: var(--c-bg-content);
  color: var(--c-text-heading);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  font-size: 0.88em;
  font-family: 'Fira Code', 'Consolas', monospace;
}

.blog-render :deep(pre) {
  background: #3d3a35;
  color: #e8e0cc;
  padding: var(--space-lg);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: var(--space-md) 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.blog-render :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}

.blog-render :deep(p) {
  margin-bottom: 10px;
}

.blog-render :deep(img) {
  max-width: 100%;
  border-radius: var(--radius-sm);
}

.blog-render :deep(blockquote) {
  border-left: 4px solid var(--c-accent-mint);
  padding-left: var(--space-md);
  margin: var(--space-md) 0;
  color: var(--c-text-muted);
}

.blog-render :deep(a) {
  color: var(--c-accent-mint);
  text-decoration: underline;
}

/* --- Transition --- */
.content-fade-enter-active {
  transition: opacity 0.4s ease;
}

.content-fade-leave-active {
  transition: opacity 0.2s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}

/* --- Keyframes --- */
@keyframes skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
