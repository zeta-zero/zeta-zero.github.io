# 动物森友会风格个人岛屿 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有技术博客重构为动物森友会风格的 SVG 岛屿探索网站

**Architecture:** Vue 3 SPA + vue-router，SVG 岛屿地图作为主导航，六个区域视图独立渲染。CSS 变量驱动全局主题，所有装饰用 SVG/CSS 构建。保留 markdown 博客渲染管道。

**Tech Stack:** Vue 3 (Composition API), Vite, vue-router, markdown-it (via vite-plugin-md), 纯 CSS/SVG 动画

---

### Task 1: 清理旧代码

**Files:**
- Delete: `src/App.vue`, `src/main.js`, `src/style.css`
- Delete: `src/components/` 下所有 18 个文件及 4 个子目录

- [ ] **Step 1: 删除旧组件文件**

```bash
rm -f src/App.vue src/main.js src/style.css
rm -rf src/components/about-detial
rm -rf src/components/astral
rm -rf src/components/blog-detial
rm -rf src/components/home-detial
rm -f src/components/BncRect.vue src/components/HelloWorld.vue
rm -f src/components/home.vue src/components/blog.vue
rm -f src/components/relax.vue src/components/about.vue
rm -f src/components/switchover.vue
```

- [ ] **Step 2: 验证清理结果**

```bash
ls src/components/
```
预期: 空目录（或仅剩 pages 引用）

---

### Task 2: 重写全局样式系统

**Files:**
- Create: `src/style.css`

- [ ] **Step 1: 编写完整的全局 CSS 主题**

```css
/* ===== 动物森友会 · 清晨森林 配色系统 ===== */
:root {
  --c-bg: #D4E7C5;
  --c-card: #BFD8AF;
  --c-accent: #99BC85;
  --c-light: #E1F0DA;
  --c-sun: #FFF8D6;
  --c-text: #5D7A4A;
  --c-text-dark: #3D5A2E;
  --c-white: #FFFFFF;
  --c-shadow: rgba(61, 90, 46, 0.12);
  --c-shadow-strong: rgba(61, 90, 46, 0.25);

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 50px;

  --font-base: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  --transition-bounce: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  --z-sidebar: 100;
  --z-overlay: 200;
  --z-bubble: 150;
}

/* ===== 全局重置 ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-base);
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.6;
}

#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* ===== 滚动条 ===== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--c-light); }
::-webkit-scrollbar-thumb {
  background: var(--c-accent);
  border-radius: 3px;
}

/* ===== 链接 ===== */
a {
  color: var(--c-text-dark);
  text-decoration: none;
  transition: color var(--transition-smooth);
}
a:hover { color: var(--c-accent); }

/* ===== 按钮 ===== */
button, .btn {
  font-family: var(--font-base);
  background: var(--c-accent);
  color: white;
  border: 3px solid rgba(255,255,255,0.5);
  padding: 0.6em 1.4em;
  border-radius: var(--radius-pill);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-bounce);
  box-shadow: 0 4px 12px var(--c-shadow);
  user-select: none;
}
button:hover, .btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 8px 20px var(--c-shadow-strong);
}
button:active { transform: translateY(0) scale(0.98); }

/* ===== 卡片基底 ===== */
.card {
  background: var(--c-card);
  border-radius: var(--radius-md);
  border: 3px solid rgba(255,255,255,0.6);
  box-shadow: 0 6px 16px var(--c-shadow);
  transition: all var(--transition-bounce);
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px var(--c-shadow-strong);
}

/* ===== 对话气泡 ===== */
.speech-bubble {
  position: relative;
  background: var(--c-white);
  border-radius: var(--radius-lg);
  padding: 12px 18px;
  box-shadow: 0 4px 12px var(--c-shadow);
  font-size: 0.95rem;
  color: var(--c-text-dark);
}
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 24px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid var(--c-white);
}

/* ===== SVG 图标通用 ===== */
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}

/* ===== 动画关键帧 ===== */
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-12px) translateX(4px); }
  50% { transform: translateY(-6px) translateX(8px); }
  75% { transform: translateY(-16px) translateX(2px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-30px); }
}

@keyframes sway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(3deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes pulse-strong {
  0%, 100% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes wave {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-15px); }
}

@keyframes leaf-fall {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(60px) rotate(180deg); opacity: 0; }
}

@keyframes firefly {
  0%, 100% { opacity: 0.2; transform: translate(0, 0) scale(1); }
  25% { opacity: 0.9; transform: translate(15px, -20px) scale(1.3); }
  50% { opacity: 0.3; transform: translate(25px, -10px) scale(0.8); }
  75% { opacity: 0.8; transform: translate(5px, -25px) scale(1.2); }
}

@keyframes bounce-in {
  0% { transform: scale(0) translateY(40px); opacity: 0; }
  50% { transform: scale(1.15) translateY(-10px); opacity: 1; }
  70% { transform: scale(0.95) translateY(5px); }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes smoke-rise {
  0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
  100% { transform: translateY(-30px) scaleX(2); opacity: 0; }
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  :root { font-size: 14px; }
}
```

---

### Task 3: 重写 index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 替换为新的 HTML 入口**

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>哩哈！欢迎来到我的岛～</title>
  <meta name="description" content="一座清晨森林中的个人知识岛屿 — 嵌入式开发者的动物森友会" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍃</text></svg>" />
  <script type="module" src="/src/main.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

---

### Task 4: 重写 main.js

**Files:**
- Create: `src/main.js`

- [ ] **Step 1: 编写新的应用入口和路由**

```js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'

import App from './App.vue'

// 懒加载视图组件
const PlazaView = () => import('./components/views/PlazaView.vue')
const HouseView = () => import('./components/views/HouseView.vue')
const MuseumView = () => import('./components/views/MuseumView.vue')
const WorkshopView = () => import('./components/views/WorkshopView.vue')
const CampsiteView = () => import('./components/views/CampsiteView.vue')
const BeachView = () => import('./components/views/BeachView.vue')

const routes = [
  { path: '/', component: PlazaView },
  { path: '/about', component: HouseView },
  { path: '/blog', component: MuseumView },
  { path: '/skills', component: WorkshopView },
  { path: '/projects', component: CampsiteView },
  { path: '/relax', component: BeachView },
  {
    path: '/relax/game2048',
    component: () => import('./pages/game/game2048/Game2048Component.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
```

---

### Task 5: 创建 App.vue 根组件

**Files:**
- Create: `src/App.vue`

- [ ] **Step 1: 编写根组件（IntroOverlay + IslandMap + router-view）**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import IntroOverlay from './components/IntroOverlay.vue'
import IslandMap from './components/IslandMap.vue'

const router = useRouter()
const showIntro = ref(false)
const showApp = ref(false)

onMounted(() => {
  const visited = localStorage.getItem('ac_island_visited')
  if (visited) {
    showApp.value = true
  } else {
    showIntro.value = true
  }
})

function onIntroDone() {
  localStorage.setItem('ac_island_visited', '1')
  showIntro.value = false
  showApp.value = true
}
</script>

<template>
  <IntroOverlay v-if="showIntro" @done="onIntroDone" />
  <div v-if="showApp" class="app-shell">
    <IslandMap />
    <main class="view-container">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.app-shell {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.view-container {
  flex: 1;
  padding: 24px;
  margin-left: 320px; /* SVG 地图宽度 */
  min-height: 100vh;
  animation: fade-in-up 0.5s ease;
}

@media (max-width: 1024px) {
  .view-container {
    margin-left: 0;
    padding-top: 300px; /* 移动端地图在上方 */
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
```

---

### Task 6: 创建对话气泡组件

**Files:**
- Create: `src/components/shared/SpeechBubble.vue`

- [ ] **Step 1: 编写通用对话气泡**

```vue
<script setup>
defineProps({
  text: { type: String, required: true },
  speaker: { type: String, default: '' },
  autoHide: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="bubble-wrap" @click="autoHide && emit('close')">
    <div v-if="speaker" class="bubble-speaker">{{ speaker }}</div>
    <div class="bubble-body">
      <p>{{ text }}</p>
      <div class="bubble-tail"></div>
    </div>
  </div>
</template>

<style scoped>
.bubble-wrap {
  position: relative;
  cursor: pointer;
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  max-width: 280px;
}
.bubble-speaker {
  font-size: 0.8rem;
  color: var(--c-accent);
  font-weight: 700;
  margin-bottom: 4px;
  padding-left: 8px;
}
.bubble-body {
  position: relative;
  background: var(--c-white);
  border-radius: var(--radius-lg);
  padding: 14px 18px;
  box-shadow: 0 6px 20px var(--c-shadow);
  border: 2px solid var(--c-light);
}
.bubble-body p {
  font-size: 0.95rem;
  color: var(--c-text-dark);
  line-height: 1.5;
}
.bubble-tail {
  position: absolute;
  bottom: -8px;
  left: 24px;
  width: 16px;
  height: 16px;
  background: var(--c-white);
  border-right: 2px solid var(--c-light);
  border-bottom: 2px solid var(--c-light);
  transform: rotate(45deg);
}
</style>
```

---

### Task 7: 创建 IntroOverlay — 落叶开场动画

**Files:**
- Create: `src/components/IntroOverlay.vue`

- [ ] **Step 1: 编写落叶登岛开场动画组件**

```vue
<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])
const phase = ref('leaf') // leaf | transform | done

const greetings = [
  '哩哈！欢迎来到我的岛～',
  '哟！又是一位探险家呢～',
  '欢迎登岛！知识果实正等着被摘取～',
  '嘘……博物馆里藏着好多好东西～',
  '嘿！工坊里刚做好一批新配方，来看看？',
  '哇！你是今天第一位访客呢！',
]

const greeting = ref('')

onMounted(() => {
  greeting.value = greetings[Math.floor(Math.random() * greetings.length)]

  // 阶段1: 叶子飘入 (0-1.8s)
  setTimeout(() => { phase.value = 'transform' }, 1800)
  // 阶段2: 叶子展开 + 弹跳 (1.8-3.2s)
  setTimeout(() => { phase.value = 'done' }, 3200)
  // 完成
  setTimeout(() => { emit('done') }, 3600)
})
</script>

<template>
  <div class="intro-overlay" :class="phase">
    <!-- 叶子 SVG -->
    <svg
      class="intro-leaf"
      :class="{ 'leaf-landed': phase !== 'leaf' }"
      viewBox="0 0 120 120"
      width="120" height="120"
    >
      <!-- 动森风格叶子形状 -->
      <path
        d="M60 10 C30 20 5 50 15 80 C25 110 55 115 60 85 C65 115 95 110 105 80 C115 50 90 20 60 10Z"
        fill="#99BC85"
        stroke="#5D7A4A"
        stroke-width="2"
      />
      <line x1="60" y1="85" x2="60" y2="115" stroke="#5D7A4A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 95 L45 105" stroke="#5D7A4A" stroke-width="2" stroke-linecap="round"/>
      <path d="M60 95 L75 105" stroke="#5D7A4A" stroke-width="2" stroke-linecap="round"/>
      <path d="M60 85 L50 100" stroke="#5D7A4A" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

    <!-- 变换为岛屿地图 -->
    <div v-if="phase === 'transform'" class="intro-island-reveal">
      <div class="island-silhouette"></div>
    </div>

    <!-- 欢迎气泡 -->
    <div v-if="phase === 'done'" class="intro-greeting">
      <div class="bubble">
        <p>{{ greeting }}</p>
        <div class="bubble-tail"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3D5A2E;
  transition: background 0.8s ease;
}
.intro-overlay.transform {
  background: var(--c-bg);
}
.intro-overlay.done {
  background: transparent;
  pointer-events: none;
}

.intro-leaf {
  position: absolute;
  animation: leaf-enter 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  z-index: 2;
}
.intro-leaf.leaf-landed {
  animation: leaf-expand 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes leaf-enter {
  0% {
    transform: translate(-40vw, -40vh) rotate(-180deg) scale(0.3);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
}

@keyframes leaf-expand {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(3) rotate(10deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(6) rotate(15deg);
    opacity: 0;
  }
}

.intro-island-reveal {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in-up 0.6s 0.2s both;
}

.island-silhouette {
  width: 300px;
  height: 200px;
  background: var(--c-accent);
  border-radius: 50% 50% 45% 45%;
  position: relative;
  opacity: 0.3;
}
.island-silhouette::before {
  content: '';
  position: absolute;
  top: -30px;
  left: 100px;
  width: 80px;
  height: 60px;
  background: var(--c-accent);
  border-radius: 50%;
}

.intro-greeting {
  position: absolute;
  bottom: 25%;
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.bubble {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px 24px;
  box-shadow: 0 8px 24px var(--c-shadow-strong);
  position: relative;
}
.bubble p {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--c-text-dark);
}
.bubble-tail {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid white;
}
</style>
```

---

### Task 8: 创建 IslandMap — SVG 岛屿地图

**Files:**
- Create: `src/components/IslandMap.vue`

- [ ] **Step 1: 编写 SVG 岛屿地图核心组件**

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CloudLayer from './CloudLayer.vue'
import ButterflyEffect from './ButterflyEffect.vue'
import GrassWave from './GrassWave.vue'
import IslandBuilding from './IslandBuilding.vue'
import IslandCharacter from './IslandCharacter.vue'
import IslandPath from './IslandPath.vue'

const router = useRouter()

const buildings = [
  { id: 'plaza', label: '广场大树', icon: '🌳', x: 160, y: 80, route: '/' },
  { id: 'house', label: '我的小屋', icon: '🏠', x: 60, y: 180, route: '/about' },
  { id: 'museum', label: '博物馆', icon: '🏛️', x: 280, y: 160, route: '/blog' },
  { id: 'workshop', label: '工坊', icon: '🔧', x: 80, y: 300, route: '/skills' },
  { id: 'campsite', label: '露营地', icon: '🏕️', x: 230, y: 300, route: '/projects' },
  { id: 'beach', label: '沙滩', icon: '🏖️', x: 280, y: 380, route: '/relax' },
]

// 小径路径数据
const paths = [
  { from: 'plaza', to: 'house' },
  { from: 'plaza', to: 'museum' },
  { from: 'house', to: 'workshop' },
  { from: 'museum', to: 'campsite' },
  { from: 'workshop', to: 'campsite' },
  { from: 'campsite', to: 'beach' },
]

const activeBuilding = ref(null)

function onBuildingClick(building) {
  activeBuilding.value = building.id
  setTimeout(() => {
    router.push(building.route)
    activeBuilding.value = null
  }, 400)
}
</script>

<template>
  <aside class="island-sidebar">
    <svg
      class="island-svg"
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 天空背景 -->
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E1F0DA" />
          <stop offset="100%" stop-color="#BFD8AF" />
        </linearGradient>
        <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#A8D8EA" />
          <stop offset="100%" stop-color="#89C2D9" />
        </linearGradient>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#3D5A2E" flood-opacity="0.15" />
        </filter>
      </defs>

      <!-- 天空 -->
      <rect width="400" height="480" fill="url(#skyGrad)" rx="0" />

      <!-- 云层 -->
      <CloudLayer />

      <!-- 海洋（岛屿周围的水） -->
      <ellipse cx="200" cy="300" rx="220" ry="180" fill="url(#oceanGrad)" opacity="0.4" />

      <!-- 岛屿陆地 -->
      <path
        d="M80 160 Q120 80 200 70 Q290 60 340 140 Q380 220 350 320 Q320 400 200 420 Q80 400 60 320 Q40 240 80 160Z"
        fill="#D4E7C5"
        stroke="#99BC85"
        stroke-width="3"
        filter="url(#softShadow)"
      />

      <!-- 草地纹理点 -->
      <g fill="#BFD8AF" opacity="0.6">
        <circle cx="100" cy="200" r="3"/><circle cx="140" cy="170" r="2"/>
        <circle cx="250" cy="130" r="2.5"/><circle cx="300" cy="180" r="2"/>
        <circle cx="150" cy="280" r="3"/><circle cx="280" cy="300" r="2"/>
        <circle cx="200" cy="350" r="2.5"/><circle cx="120" cy="350" r="2"/>
      </g>

      <!-- 草浪装饰 -->
      <GrassWave />

      <!-- 小径 -->
      <IslandPath :paths="paths" :buildings="buildings" />

      <!-- 建筑 -->
      <IslandBuilding
        v-for="b in buildings"
        :key="b.id"
        :building="b"
        :active="activeBuilding === b.id"
        @click="onBuildingClick(b)"
      />

      <!-- 蝴蝶 -->
      <ButterflyEffect />

      <!-- 角色图标 -->
      <IslandCharacter :buildings="buildings" :active-building="activeBuilding" />
    </svg>
  </aside>
</template>

<style scoped>
.island-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  z-index: var(--z-sidebar);
  background: var(--c-bg);
  border-right: 3px solid var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.island-svg {
  width: 100%;
  height: 100%;
  max-height: 100vh;
}

@media (max-width: 1024px) {
  .island-sidebar {
    position: relative;
    width: 100%;
    height: 280px;
    border-right: none;
    border-bottom: 3px solid var(--c-accent);
  }
}
</style>
```

---

### Task 9: 创建 IslandBuilding — 可交互建筑

**Files:**
- Create: `src/components/IslandBuilding.vue`

- [ ] **Step 1: 编写 SVG 建筑组件**

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  building: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

defineEmits(['click'])

// SVG 建筑形状定义
const shapes = {
  plaza: 'M-20,0 L-20,-35 L0,-55 L20,-35 L20,0 Z',
  house: 'M-18,0 L-18,-25 L-22,-25 L0,-45 L22,-25 L18,-25 L18,0 Z',
  museum: 'M-22,0 L-22,-30 L-12,-40 L0,-30 L12,-40 L22,-30 L22,0 Z',
  workshop: 'M-16,0 L-16,-20 L-10,-28 L0,-18 L10,-28 L16,-20 L16,0 Z',
  campsite: 'M-20,0 L-20,-15 L0,-35 L20,-15 L20,0 Z',
  beach: 'M-16,0 L-16,-18 L-8,-28 L8,-28 L16,-18 L16,0 Z',
}

const shape = computed(() => shapes[props.building.id] || shapes.plaza)
</script>

<template>
  <g
    class="building-group"
    :class="{ active }"
    :transform="`translate(${building.x}, ${building.y})`"
    @click="$emit('click')"
  >
    <!-- 建筑阴影 -->
    <path
      :d="shape"
      fill="#5D7A4A"
      opacity="0.15"
      transform="translate(3, 3)"
    />
    <!-- 建筑主体 -->
    <path
      :d="shape"
      fill="var(--c-white)"
      stroke="var(--c-text-dark)"
      stroke-width="2"
      stroke-linejoin="round"
      class="building-body"
    />
    <!-- 建筑标签 -->
    <text
      y="8"
      text-anchor="middle"
      font-size="16"
      class="building-icon"
    >{{ building.icon }}</text>
    <text
      y="24"
      text-anchor="middle"
      font-size="9"
      fill="var(--c-text-dark)"
      font-weight="600"
      class="building-label"
    >{{ building.label }}</text>
  </g>
</template>

<style scoped>
.building-group {
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center center;
}
.building-group:hover {
  transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.1) translateY(-4px);
}
.building-group.active {
  transform: scale(1.15) translateY(-6px);
}
.building-body {
  transition: fill 0.3s ease;
}
.building-group:hover .building-body {
  fill: var(--c-sun);
}
.building-icon {
  pointer-events: none;
}
.building-label {
  pointer-events: none;
  font-family: var(--font-base);
}
</style>
```

---

### Task 10: 创建 IslandPath — 小径连接线

**Files:**
- Create: `src/components/IslandPath.vue`

- [ ] **Step 1: 编写 SVG 小径组件**

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  paths: { type: Array, required: true },
  buildings: { type: Array, required: true },
})

const buildingMap = computed(() => {
  const map = {}
  props.buildings.forEach(b => { map[b.id] = b })
  return map
})

function pathD(fromId, toId) {
  const f = buildingMap.value[fromId]
  const t = buildingMap.value[toId]
  if (!f || !t) return ''
  const midX = (f.x + t.x) / 2
  const midY = (f.y + t.y) / 2
  return `M${f.x},${f.y} Q${midX},${midY} ${t.x},${t.y}`
}
</script>

<template>
  <g class="paths-group">
    <!-- 小径底色 -->
    <path
      v-for="(p, i) in paths"
      :key="i"
      :d="pathD(p.from, p.to)"
      fill="none"
      stroke="#FFF8D6"
      stroke-width="12"
      stroke-linecap="round"
      opacity="0.5"
    />
    <!-- 小径虚线纹理 -->
    <path
      v-for="(p, i) in paths"
      :key="'dash-' + i"
      :d="pathD(p.from, p.to)"
      fill="none"
      stroke="#99BC85"
      stroke-width="2"
      stroke-dasharray="6 10"
      stroke-linecap="round"
      opacity="0.6"
    />
  </g>
</template>

<style scoped>
.paths-group {
  pointer-events: none;
}
</style>
```

---

### Task 11: 创建 IslandCharacter — 玩家角色

**Files:**
- Create: `src/components/IslandCharacter.vue`

- [ ] **Step 1: 编写SVG角色图标组件**

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  buildings: { type: Array, required: true },
  activeBuilding: { type: String, default: null },
})

const charPos = ref({ x: 160, y: 80 })

const bubbles = [
  '这个地方不错！',
  '今天岛上天气真好～',
  '嗯...去哪逛逛呢？',
  '工坊有新配方了！',
  '博物馆好像有新展品...',
]

const showBubble = ref(false)
const bubbleText = ref('')

function randomBubble() {
  bubbleText.value = bubbles[Math.floor(Math.random() * bubbles.length)]
  showBubble.value = true
  setTimeout(() => { showBubble.value = false }, 2500)
}

watch(() => props.activeBuilding, (bid) => {
  if (bid) {
    const b = props.buildings.find(b => b.id === bid)
    if (b) {
      charPos.value = { x: b.x + 18, y: b.y + 30 }
    }
  }
})
</script>

<template>
  <g
    class="character-group"
    :transform="`translate(${charPos.x}, ${charPos.y})`"
    @click="randomBubble"
  >
    <!-- 角色身体 -->
    <circle r="8" fill="#FFF8D6" stroke="#5D7A4A" stroke-width="2" />
    <!-- 帽子 -->
    <ellipse cx="0" cy="-7" rx="9" ry="4" fill="#99BC85" stroke="#5D7A4A" stroke-width="1.5" />

    <!-- 气泡 -->
    <g v-if="showBubble" class="char-bubble" transform="translate(14, -30)">
      <rect
        x="0" y="0"
        :width="bubbleText.length * 8 + 16"
        height="22"
        rx="8"
        fill="white"
        stroke="#5D7A4A"
        stroke-width="1.5"
      />
      <text
        :x="bubbleText.length * 4 + 8"
        y="15"
        text-anchor="middle"
        font-size="9"
        fill="#3D5A2E"
        font-family="var(--font-base)"
      >{{ bubbleText }}</text>
      <polygon points="8,22 12,28 16,22" fill="white" stroke="#5D7A4A" stroke-width="1.5" />
    </g>
  </g>
</template>

<style scoped>
.character-group {
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.character-group:active {
  transform: scale(1.2);
}
.char-bubble {
  animation: fade-in-up 0.3s ease;
}
</style>
```

---

### Task 12: 创建 CloudLayer — 浮动云层

**Files:**
- Create: `src/components/CloudLayer.vue`

- [ ] **Step 1: 编写 SVG 云朵组件**

```vue
<template>
  <g class="cloud-layer">
    <!-- 云 1 -->
    <g class="cloud" style="animation: float-slow 12s ease-in-out infinite;">
      <ellipse cx="60" cy="40" rx="30" ry="12" fill="white" opacity="0.6" />
      <ellipse cx="50" cy="35" rx="20" ry="14" fill="white" opacity="0.7" />
      <ellipse cx="75" cy="36" rx="18" ry="10" fill="white" opacity="0.7" />
    </g>
    <!-- 云 2 -->
    <g class="cloud" style="animation: float-slow 16s ease-in-out infinite reverse;">
      <ellipse cx="300" cy="25" rx="24" ry="10" fill="white" opacity="0.5" />
      <ellipse cx="290" cy="20" rx="18" ry="12" fill="white" opacity="0.6" />
      <ellipse cx="315" cy="22" rx="14" ry="8" fill="white" opacity="0.6" />
    </g>
    <!-- 云 3 -->
    <g class="cloud" style="animation: float-slow 14s ease-in-out infinite; animation-delay: -3s;">
      <ellipse cx="180" cy="55" rx="22" ry="9" fill="white" opacity="0.4" />
      <ellipse cx="170" cy="50" rx="16" ry="11" fill="white" opacity="0.5" />
      <ellipse cx="192" cy="52" rx="12" ry="7" fill="white" opacity="0.5" />
    </g>
  </g>
</template>

<style scoped>
.cloud-layer {
  pointer-events: none;
}
</style>
```

---

### Task 13: 创建 ButterflyEffect — 蝴蝶飞舞

**Files:**
- Create: `src/components/ButterflyEffect.vue`

- [ ] **Step 1: 编写 SVG 蝴蝶飞舞动画**

```vue
<template>
  <g class="butterfly-layer">
    <!-- 蝴蝶 1 -->
    <g>
      <animateMotion
        dur="18s" repeatCount="indefinite"
        path="M50,100 C100,50 150,150 200,100 C250,50 300,120 280,160 C260,200 200,180 150,200 C100,220 30,150 50,100Z"
      />
      <!-- 蝴蝶翅膀 -->
      <g transform="scale(0.5)">
        <ellipse cx="-4" cy="0" rx="6" ry="4" fill="#99BC85" opacity="0.8" transform="rotate(-20)" />
        <ellipse cx="4" cy="0" rx="6" ry="4" fill="#99BC85" opacity="0.8" transform="rotate(20)" />
        <ellipse cx="0" cy="0" rx="1.5" ry="3" fill="#5D7A4A" />
      </g>
    </g>
    <!-- 蝴蝶 2 -->
    <g>
      <animateMotion
        dur="22s" repeatCount="indefinite"
        path="M300,300 C250,250 200,350 150,280 C100,220 180,180 220,200 C260,220 320,280 300,300Z"
      />
      <g transform="scale(0.4)">
        <ellipse cx="-4" cy="0" rx="6" ry="4" fill="#FFF8D6" opacity="0.8" transform="rotate(-20)" />
        <ellipse cx="4" cy="0" rx="6" ry="4" fill="#FFF8D6" opacity="0.8" transform="rotate(20)" />
        <ellipse cx="0" cy="0" rx="1.5" ry="3" fill="#5D7A4A" />
      </g>
    </g>
  </g>
</template>

<style scoped>
.butterfly-layer {
  pointer-events: none;
}
</style>
```

---

### Task 14: 创建 GrassWave — 草浪效果

**Files:**
- Create: `src/components/GrassWave.vue`

- [ ] **Step 1: 编写 SVG 草浪装饰**

```vue
<template>
  <g class="grass-layer" opacity="0.5">
    <!-- 草丛线条 -->
    <g v-for="i in 12" :key="i" :style="{
      animation: `sway ${2 + i * 0.3}s ease-in-out infinite`,
      animationDelay: `${-i * 0.5}s`
    }">
      <line
        :x1="30 + i * 28"
        :y1="140 + Math.sin(i * 1.2) * 15"
        :x2="28 + i * 28"
        :y2="120 + Math.sin(i * 1.2) * 15"
        stroke="#99BC85"
        stroke-width="2"
        stroke-linecap="round"
        transform-origin="bottom"
      />
      <line
        :x1="34 + i * 28"
        :y1="140 + Math.sin(i * 1.2) * 15"
        :x2="36 + i * 28"
        :y2="118 + Math.sin(i * 1.2) * 15"
        stroke="#BFD8AF"
        stroke-width="1.5"
        stroke-linecap="round"
        transform-origin="bottom"
      />
    </g>
  </g>
</template>

<style scoped>
.grass-layer {
  pointer-events: none;
}
</style>
```

---

### Task 15: 创建 PlazaView — 广场大树首页

**Files:**
- Create: `src/components/views/PlazaView.vue`

- [ ] **Step 1: 编写广场大树视图**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import SpeechBubble from '../shared/SpeechBubble.vue'

const greetings = [
  { speaker: '傅达', text: '哩哈！广场的大树是岛上的中心。最近博物馆又收了新展品，有空来看看？' },
  { speaker: '狸克', text: '哦！这不是我们最棒的岛民代表吗？工坊的配方卡片翻新了，哩～' },
  { speaker: '傅珂', text: '今晚的星星特别亮呢...知识就像星星，一颗一颗连起来就成了星座～' },
]

const greeting = ref(greetings[0])
const leaves = ref([])
let leafTimer = null

onMounted(() => {
  greeting.value = greetings[Math.floor(Math.random() * greetings.length)]
  // 随机落叶
  leafTimer = setInterval(() => {
    if (leaves.value.length < 6) {
      leaves.value.push({
        id: Date.now(),
        x: Math.random() * 200 + 50,
        delay: Math.random() * 2,
      })
    }
  }, 3000)
  // 清理旧落叶
  setInterval(() => {
    if (leaves.value.length > 5) {
      leaves.value.splice(0, 1)
    }
  }, 5000)
})
</script>

<template>
  <div class="plaza-view">
    <h1 class="view-title">广场大树</h1>
    <p class="view-sub">岛上最古老的树，见证了所有知识的生长。</p>

    <!-- SVG 大树 -->
    <div class="tree-container">
      <svg viewBox="0 0 200 220" class="tree-svg">
        <!-- 树干 -->
        <rect x="92" y="100" width="16" height="80" rx="8" fill="#8B7355" />
        <!-- 树冠层叠 -->
        <g class="tree-crown">
          <ellipse cx="100" cy="70" rx="55" ry="45" fill="#99BC85" class="crown-1" />
          <ellipse cx="75" cy="85" rx="40" ry="35" fill="#BFD8AF" class="crown-2" />
          <ellipse cx="125" cy="80" rx="42" ry="38" fill="#D4E7C5" class="crown-3" />
          <ellipse cx="100" cy="50" rx="35" ry="28" fill="#E1F0DA" class="crown-4" />
        </g>
        <!-- 果实 -->
        <circle cx="80" cy="60" r="5" fill="#FFB5BA" class="fruit" />
        <circle cx="115" cy="55" r="5" fill="#FFCA3A" class="fruit" />
        <circle cx="90" cy="90" r="4" fill="#FFB5BA" class="fruit" />
      </svg>
    </div>

    <!-- 落叶 -->
    <div v-for="leaf in leaves" :key="leaf.id" class="falling-leaf" :style="{
      left: leaf.x + 'px',
      animationDelay: leaf.delay + 's',
    }">
      <svg viewBox="0 0 20 20" width="16" height="16">
        <path d="M10 2 C5 5 2 12 4 16 C6 20 10 18 10 14 C10 18 14 20 16 16 C18 12 15 5 10 2Z" fill="#99BC85" />
      </svg>
    </div>

    <SpeechBubble
      v-if="greeting"
      :text="greeting.text"
      :speaker="greeting.speaker"
      class="plaza-bubble"
    />

    <!-- 最近更新 -->
    <div class="recent-updates">
      <h2>🍎 最近的果实</h2>
      <div class="update-cards">
        <div class="update-card card">
          <span class="update-date">2024</span>
          <span>从零开始设计 RTOS — 系列完结</span>
        </div>
        <div class="update-card card">
          <span class="update-date">2024</span>
          <span>BLE Mesh 技术笔记更新</span>
        </div>
        <div class="update-card card">
          <span class="update-date">2024</span>
          <span>滤波算法合集新增</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plaza-view {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  animation: fade-in-up 0.6s ease;
}
.view-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--c-text-dark);
  margin-bottom: 4px;
}
.view-sub {
  color: var(--c-accent);
  font-size: 1rem;
  margin-bottom: 20px;
}

.tree-container {
  position: relative;
  width: 200px;
  height: 220px;
  margin: 0 auto 20px;
}
.tree-svg {
  width: 100%;
  height: 100%;
}
.tree-crown > * {
  transform-origin: 100px 70px;
}
.crown-1 { animation: sway 4s ease-in-out infinite; }
.crown-2 { animation: sway 4.5s ease-in-out infinite 0.5s; }
.crown-3 { animation: sway 3.8s ease-in-out infinite 0.8s; }
.crown-4 { animation: sway 4.2s ease-in-out infinite 1.2s; }
.fruit { animation: pulse 3s ease-in-out infinite; }

.falling-leaf {
  position: absolute;
  top: 140px;
  animation: leaf-fall 3s ease-in forwards;
  pointer-events: none;
}

.plaza-bubble {
  margin: 20px auto;
}

.recent-updates h2 {
  font-size: 1.2rem;
  color: var(--c-text-dark);
  margin-bottom: 12px;
}
.update-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.update-card {
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
}
.update-date {
  font-weight: 700;
  color: var(--c-accent);
  font-size: 0.85rem;
  white-space: nowrap;
}
</style>
```

---

### Task 16: 创建 HouseView — 我的小屋

**Files:**
- Create: `src/components/views/HouseView.vue`

- [ ] **Step 1: 编写小屋关于页面**

```vue
<script setup>
import { ref } from 'vue'
import SpeechBubble from '../shared/SpeechBubble.vue'

const showDetail = ref(false)
const revealText = ref('（点击门进去看看...）')

function enter() {
  showDetail.value = true
  revealText.value = ''
}
</script>

<template>
  <div class="house-view" :class="{ entered: showDetail }">
    <h1 class="view-title">🏠 我的小屋</h1>
    <p class="view-sub">一位嵌入式岛民的温馨小窝</p>

    <!-- SVG 小屋外景 -->
    <div v-if="!showDetail" class="house-exterior" @click="enter">
      <svg viewBox="0 0 180 160" class="house-svg">
        <!-- 烟囱 -->
        <rect x="130" y="18" width="14" height="30" fill="#8B7355" rx="3" />
        <!-- 炊烟 -->
        <circle cx="137" cy="12" r="5" fill="white" opacity="0.6" class="smoke smoke-1" />
        <circle cx="140" cy="4" r="6" fill="white" opacity="0.4" class="smoke smoke-2" />
        <circle cx="135" cy="-6" r="7" fill="white" opacity="0.25" class="smoke smoke-3" />
        <!-- 屋顶 -->
        <polygon points="10,60 90,10 170,60" fill="#8B4513" stroke="#5D7A4A" stroke-width="2" />
        <!-- 墙壁 -->
        <rect x="25" y="60" width="130" height="80" fill="#FFF8D6" stroke="#5D7A4A" stroke-width="2" rx="4" />
        <!-- 门 -->
        <rect x="70" y="90" width="40" height="50" fill="#8B4513" stroke="#5D7A4A" stroke-width="2" rx="4" class="door" />
        <circle cx="102" cy="115" r="2.5" fill="#FFCA3A" />
        <!-- 窗户 -->
        <rect x="35" y="75" width="24" height="20" fill="#A2D2FF" stroke="#5D7A4A" stroke-width="2" rx="3" class="window" />
        <rect x="121" y="75" width="24" height="20" fill="#A2D2FF" stroke="#5D7A4A" stroke-width="2" rx="3" class="window" />
        <!-- 窗户十字 -->
        <line x1="47" y1="75" x2="47" y2="95" stroke="#5D7A4A" stroke-width="1" />
        <line x1="35" y1="85" x2="59" y2="85" stroke="#5D7A4A" stroke-width="1" />
        <line x1="133" y1="75" x2="133" y2="95" stroke="#5D7A4A" stroke-width="1" />
        <line x1="121" y1="85" x2="145" y2="85" stroke="#5D7A4A" stroke-width="1" />
      </svg>
      <p class="hint-text">{{ revealText }}</p>
    </div>

    <!-- 内部详情 -->
    <div v-else class="house-interior">
      <div class="about-section card">
        <h2>👤 关于这位岛民</h2>
        <p>
          一位在嵌入式世界游荡了十年的开发者。白天在寄存器和中断向量表之间穿梭，
          晚上偶尔写写博客，记录那些「啊哈！」瞬间。
        </p>
        <p>
          <strong>技能标签：</strong>C/C++ · STM32 · NRF52 · ESP32 · BLE · FreeRTOS ·
          C#/WPF · Vue.js · PCB Design
        </p>
        <p style="font-style:italic;color:var(--c-accent)">
          「十年嵌入式经验，至今仍在问这个寄存器为什么叫这个名字。」
        </p>
      </div>

      <div class="about-section card">
        <h2>📸 岛民照片</h2>
        <div class="photo-frame">
          <img src="/src/assets/imgs/profilephoto.png" alt="岛民照片" />
        </div>
      </div>

      <div class="about-section card">
        <h2>📝 岛民自述</h2>
        <p>主要活动于嵌入式 MCU 领域，擅长从裸机到 RTOS 的全栈嵌入式开发。</p>
        <p>偶尔涉足 C# 桌面开发、Python 脚本和 Web 前端。</p>
        <p>热爱将复杂的技术概念用简单的话讲清楚——这也是这个博客存在的意义。</p>
        <p>联系邮箱：zeta.zero@outlook.com</p>
      </div>

      <SpeechBubble
        speaker="岛民"
        text="哩哈～欢迎来我家做客！虽然有点乱，但每个角落都有故事。"
        class="house-bubble"
      />
    </div>
  </div>
</template>

<style scoped>
.house-view {
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  animation: fade-in-up 0.6s ease;
}
.view-title { font-size: 2rem; font-weight: 700; color: var(--c-text-dark); margin-bottom: 4px; }
.view-sub { color: var(--c-accent); font-size: 1rem; margin-bottom: 24px; }

.house-exterior {
  cursor: pointer;
  text-align: center;
  transition: transform var(--transition-bounce);
}
.house-exterior:hover { transform: scale(1.05); }
.house-svg { width: 180px; height: 160px; margin: 0 auto; display: block; }
.hint-text { color: var(--c-accent); font-size: 0.9rem; margin-top: 8px; animation: pulse 2s ease-in-out infinite; }

.smoke { animation: smoke-rise 2s ease-out infinite; }
.smoke-2 { animation-delay: 0.6s; }
.smoke-3 { animation-delay: 1.2s; }
.window { animation: pulse 3s ease-in-out infinite; }
.door { transition: fill 0.3s ease; }
.house-exterior:hover .door { fill: #A0522D; }

.house-interior {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-section {
  padding: 20px;
}
.about-section h2 {
  color: var(--c-text-dark);
  font-size: 1.15rem;
  margin-bottom: 10px;
}
.about-section p {
  margin-bottom: 8px;
  line-height: 1.7;
}

.photo-frame {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--c-accent);
  margin: 0 auto;
}
.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.house-bubble { margin-top: 8px; }
</style>
```

---

### Task 17: 创建 MuseumView — 博物馆博客

**Files:**
- Create: `src/components/views/MuseumView.vue`

- [ ] **Step 1: 编写博物馆博客视图**

```vue
<script setup>
import { ref, computed, shallowRef } from 'vue'
import BlogExhibit from '../shared/BlogExhibit.vue'

// 博客系列和文章索引
const series = [
  {
    id: 'techs',
    name: '零碎的技术合集',
    hall: '昆虫馆',
    description: '各种技术知识的标本收集——从编译器到滤波算法',
  },
  {
    id: 'rtos',
    name: '从零开始设计RTOS',
    hall: '化石翼',
    description: '一段从寄存器到操作系统的进化之旅',
  },
  {
    id: 'ble',
    name: '蓝牙系列',
    hall: '深海馆',
    description: '潜入蓝牙协议栈的深水区',
  },
  {
    id: 'others',
    name: '综合',
    hall: '艺术馆',
    description: '无法归类的奇妙收藏',
  },
]

const articles = ref([
  { slug: 'bluetooth/BLE', title: 'BLE 基础', series: 'ble' },
  { slug: 'bluetooth/BLEMesh1', title: 'BLE Mesh (一)', series: 'ble' },
  { slug: 'bluetooth/BLESourceIndex', title: 'BLE 源码索引', series: 'ble' },
  { slug: 'bluetooth/BLETechology', title: 'BLE 技术详解', series: 'ble' },
  { slug: 'bluetooth/CShareBLEapi', title: 'C# BLE API', series: 'ble' },
  { slug: 'piecemeal_techs/AC5ToAC6', title: 'AC5 到 AC6 迁移', series: 'techs' },
  { slug: 'piecemeal_techs/BtnManager', title: '按钮管理器', series: 'techs' },
  { slug: 'piecemeal_techs/Command', title: '命令行技巧', series: 'techs' },
  { slug: 'piecemeal_techs/DataBase', title: '数据库笔记', series: 'techs' },
  { slug: 'piecemeal_techs/EDEcrypt', title: 'EDE 加密', series: 'techs' },
  { slug: 'piecemeal_techs/Electronic', title: '电子基础', series: 'techs' },
  { slug: 'piecemeal_techs/FilteringAlgorithm', title: '滤波算法', series: 'techs' },
  { slug: 'piecemeal_techs/GCC Compiler', title: 'GCC 编译器', series: 'techs' },
  { slug: 'piecemeal_techs/GithubCommand', title: 'GitHub 命令', series: 'techs' },
  { slug: 'piecemeal_techs/LuaInMcu', title: 'MCU 中的 Lua', series: 'techs' },
  { slug: 'piecemeal_techs/Net', title: '网络基础', series: 'techs' },
  { slug: 'piecemeal_techs/NRF52Des', title: 'NRF52 设计', series: 'techs' },
  { slug: 'piecemeal_techs/stm32Debug', title: 'STM32 调试', series: 'techs' },
  { slug: 'piecemeal_techs/Tensorflow_Net', title: 'TensorFlow 网络', series: 'techs' },
  { slug: 'piecemeal_techs/USB', title: 'USB 协议', series: 'techs' },
  { slug: 'others/OfficeProblem', title: '办公问题', series: 'others' },
  { slug: 'others/ProjectEXP', title: '项目经验', series: 'others' },
  { slug: 'others/SkillTree', title: '技能树', series: 'others' },
  { slug: 'runtimeprogram/rule', title: '运行时规则', series: 'others' },
  { slug: 'z_rtos/zRTOS0', title: 'RTOS 0: 概述', series: 'rtos' },
  { slug: 'z_rtos/zRtOS1', title: 'RTOS 1: 任务调度', series: 'rtos' },
  { slug: 'z_rtos/zRtOS2', title: 'RTOS 2: 内存管理', series: 'rtos' },
  { slug: 'z_rtos/zRTOS3', title: 'RTOS 3: 同步机制', series: 'rtos' },
  { slug: 'z_rtos/zRTOS4', title: 'RTOS 4: 移植', series: 'rtos' },
])

const activeSeries = ref('all')
const selectedArticle = ref(null)

const filteredArticles = computed(() => {
  if (activeSeries.value === 'all') return articles.value
  return articles.value.filter(a => a.series === activeSeries.value)
})

const activeSeriesInfo = computed(() => {
  return series.find(s => s.id === activeSeries.value)
})

function selectArticle(article) {
  selectedArticle.value = article
}

function goBack() {
  selectedArticle.value = null
}
</script>

<template>
  <div class="museum-view">
    <h1 class="view-title">🏛️ 博物馆</h1>
    <p class="view-sub">知识的珍藏，按类别分区陈列</p>

    <!-- SVG 萤火虫氛围 -->
    <div class="fireflies">
      <div v-for="i in 8" :key="i" class="firefly" :style="{
        left: (10 + i * 10) + '%',
        top: (5 + (i % 3) * 12) + '%',
        animationDelay: (i * 0.8) + 's',
        animationDuration: (3 + i * 0.5) + 's',
      }"></div>
    </div>

    <!-- 展厅选择标签 -->
    <div class="museum-halls">
      <button
        v-for="s in series"
        :key="s.id"
        :class="{ active: activeSeries === s.id }"
        @click="activeSeries = s.id; selectedArticle = null"
      >
        {{ s.hall }}
      </button>
      <button :class="{ active: activeSeries === 'all' }" @click="activeSeries = 'all'; selectedArticle = null">
        全部展品
      </button>
    </div>

    <!-- 展厅描述 -->
    <div v-if="activeSeriesInfo" class="hall-info card">
      <h3>{{ activeSeriesInfo.hall }}</h3>
      <p>{{ activeSeriesInfo.description }}</p>
    </div>

    <!-- 文章详情 -->
    <div v-if="selectedArticle" class="article-display">
      <button class="back-btn" @click="goBack">← 回到展品列表</button>
      <div class="article-content card">
        <h2>{{ selectedArticle.title }}</h2>
        <div class="blog-render-area">
          <BlogExhibit :slug="selectedArticle.slug" />
        </div>
      </div>
    </div>

    <!-- 展品列表 -->
    <div v-else class="exhibit-grid">
      <div
        v-for="article in filteredArticles"
        :key="article.slug"
        class="exhibit-item card"
        @click="selectArticle(article)"
      >
        <div class="exhibit-icon">
          {{ article.series === 'ble' ? '📡' :
             article.series === 'rtos' ? '⚙️' :
             article.series === 'techs' ? '🔬' : '🖼️' }}
        </div>
        <div class="exhibit-name">{{ article.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.museum-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  animation: fade-in-up 0.6s ease;
}
.view-title { font-size: 2rem; font-weight: 700; color: var(--c-text-dark); margin-bottom: 4px; }
.view-sub { color: var(--c-accent); font-size: 1rem; margin-bottom: 20px; }

/* 萤火虫 */
.fireflies { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.firefly {
  position: absolute;
  width: 6px; height: 6px;
  background: #FFF8D6;
  border-radius: 50%;
  box-shadow: 0 0 8px 2px rgba(255, 248, 214, 0.8);
  animation: firefly 3s ease-in-out infinite;
}

/* 展厅标签 */
.museum-halls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.museum-halls button {
  font-size: 0.85rem;
  background: var(--c-white);
  color: var(--c-text);
  border-color: var(--c-light);
}
.museum-halls button.active {
  background: var(--c-accent);
  color: white;
}

.hall-info {
  padding: 14px 18px;
  margin-bottom: 16px;
  text-align: center;
}
.hall-info h3 { color: var(--c-text-dark); margin-bottom: 4px; }
.hall-info p { font-size: 0.9rem; }

/* 展品网格 */
.exhibit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}
.exhibit-item {
  padding: 16px;
  text-align: center;
  cursor: pointer;
}
.exhibit-icon { font-size: 1.8rem; margin-bottom: 6px; }
.exhibit-name { font-size: 0.85rem; font-weight: 600; color: var(--c-text-dark); }

/* 文章详情 */
.article-display {
  animation: fade-in-up 0.4s ease;
}
.back-btn {
  background: transparent;
  color: var(--c-accent);
  border: none;
  font-size: 0.9rem;
  padding: 0;
  box-shadow: none;
  margin-bottom: 12px;
}
.back-btn:hover { transform: none; box-shadow: none; color: var(--c-text-dark); }
.article-content { padding: 24px; }
.article-content h2 { color: var(--c-text-dark); margin-bottom: 16px; }
</style>
```

---

### Task 18: 创建 WorkshopView — 工坊技能卡片

**Files:**
- Create: `src/components/views/WorkshopView.vue`

- [ ] **Step 1: 编写工坊技能视图**

```vue
<script setup>
import { ref } from 'vue'
import SkillCard from '../shared/SkillCard.vue'

const skillCategories = [
  {
    id: 'embedded',
    title: '嵌入式开发',
    icon: '🔌',
    summary: '在 MCU 的世界里，我是一等一的「寄存器翻译官」。',
    skills: [
      { name: 'C/C++', level: 4, tags: ['C99/C11/C17', 'Linux Socket', '可变长数组', '原子操作'] },
      { name: 'STM32', level: 4, tags: ['F1/F4', 'CubeMX', 'TouchGFX', 'Keil', 'GCC'] },
      { name: 'NRF52832', level: 3, tags: ['BLE', 'Keil', 'SDK'] },
      { name: 'ESP32', level: 3, tags: ['IDF', 'Arduino', 'BLE Mesh', 'WiFi'] },
      { name: '通信协议', level: 4, tags: ['UART', 'IIC', 'SPI', 'SDIO', 'USB', 'PWM', 'ADC'] },
      { name: '嵌入式库', level: 4, tags: ['FreeRTOS', 'ThreadX', 'lvgl', 'TouchGFX', 'CJson', 'Lwip'] },
    ],
  },
  {
    id: 'ble_rtos',
    title: '蓝牙 & RTOS',
    icon: '📡',
    summary: '蓝牙栈比你前任的承诺还稳定。RTOS 嘛，我自己写了一个——用来学习的。',
    skills: [
      { name: 'BLE', level: 4, tags: ['BlueNRG2', 'NRF52832', 'ESP32', 'GATT', 'GAP'] },
      { name: 'BLE Mesh', level: 3, tags: ['ESP32', 'Node', 'Provisioning'] },
      { name: 'FreeRTOS', level: 4, tags: ['Task', 'Queue', 'Semaphore', 'Timer', 'Event Groups'] },
      { name: 'ThreadX', level: 3, tags: ['NetX', 'FileX', 'GUIX', 'USBX', 'TraceX'] },
      { name: '自研 RTOS', level: 3, tags: ['STM32F1/F4', '任务调度', '内存管理', '同步机制'] },
    ],
  },
  {
    id: 'desktop',
    title: '桌面应用',
    icon: '🖥️',
    summary: '能用 XAML 画界面，也能用 Unity 做游戏——桌面端的手艺人。',
    skills: [
      { name: 'C# / .NET', level: 4, tags: ['WPF', 'UWP', 'Avalonia', 'XAML', 'DataBinding'] },
      { name: '通信功能', level: 3, tags: ['USB HID', 'BLE', 'Serial Port', 'Internet'] },
      { name: 'Unity3D', level: 2, tags: ['C# Script', '2D/3D'] },
    ],
  },
  {
    id: 'web',
    title: 'Web 开发',
    icon: '🌐',
    summary: '熟练度 3/5——够用就行，至少能搭出你现在看到的这个岛。',
    skills: [
      { name: 'HTML/CSS/JS', level: 3, tags: ['语义化', 'Flexbox', 'Grid', 'ES6+'] },
      { name: 'Vue.js', level: 3, tags: ['Composition API', 'vue-router', 'Vite'] },
      { name: 'Bootstrap', level: 2, tags: ['Grid System', 'Components'] },
    ],
  },
  {
    id: 'scripting',
    title: '脚本 & 工具',
    icon: '🐍',
    summary: 'Python 主要是写一次性脚本——和所有人一样。Lua 在 MCU 里跑，挺酷的。',
    skills: [
      { name: 'Python', level: 3, tags: ['脚本', '自动化', 'TensorFlow'] },
      { name: 'Lua', level: 2, tags: ['MCU 嵌入式', 'STM32'] },
      { name: 'Go', level: 1, tags: ['WebServer'] },
      { name: 'Git', level: 3, tags: ['GitHub', 'CI/CD'] },
      { name: '加密库', level: 3, tags: ['OpenSSL', 'mbedtls', 'Libsodium', 'crypto-js'] },
    ],
  },
  {
    id: 'hardware',
    title: '硬件设计',
    icon: '📐',
    summary: '既能写代码，也能画 PCB——软硬通吃的稀有岛民。',
    skills: [
      { name: 'PCB 设计', level: 3, tags: ['Altium Designer', '立创EDA'] },
      { name: '算法', level: 2, tags: ['BP 神经网络', 'Q-Learning', '滤波算法'] },
      { name: '文档工具', level: 4, tags: ['Markdown', 'Draw.io', 'VSCode', 'Markmap'] },
    ],
  },
]

const flippedCard = ref(null)

function onFlip(id) {
  flippedCard.value = flippedCard.value === id ? null : id
}
</script>

<template>
  <div class="workshop-view">
    <h1 class="view-title">🔧 工坊</h1>
    <p class="view-sub">DIY 配方卡片——这些都是我能「制作」的东西</p>

    <!-- SVG 齿轮装饰 -->
    <div class="gear-decoration">
      <svg viewBox="0 0 80 80" class="gear gear-1">
        <path d="M40 8 L44 16 L52 14 L50 22 L58 26 L53 32 L60 38 L52 40 L50 48 L57 54 L50 58 L46 52 L38 54 L36 62 L28 60 L28 52 L20 54 L16 60 L10 54 L16 48 L12 42 L20 38 L22 32 L14 28 L20 22 L28 24 L36 18 L34 10 L40 8Z"
          fill="none" stroke="#99BC85" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="40" cy="38" r="8" fill="none" stroke="#99BC85" stroke-width="2.5" />
      </svg>
      <svg viewBox="0 0 60 60" class="gear gear-2">
        <path d="M30 6 L33 12 L39 10.5 L37.5 16.5 L43.5 19.5 L39 24 L45 28.5 L39 30 L37.5 36 L43.5 40.5 L37.5 43.5 L34.5 39 L33 45 L27 43.5 L27 37.5 L21 39 L18 45 L12 40.5 L16.5 36 L12 31.5 L18 30 L19.5 24 L13.5 19.5 L19.5 16.5 L22.5 21 L24 15 L30 6Z"
          fill="none" stroke="#BFD8AF" stroke-width="2" stroke-linejoin="round" />
        <circle cx="30" cy="28.5" r="6" fill="none" stroke="#BFD8AF" stroke-width="2" />
      </svg>
    </div>

    <!-- 技能卡片墙 -->
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
  padding: 20px;
  position: relative;
  animation: fade-in-up 0.6s ease;
}
.view-title { font-size: 2rem; font-weight: 700; color: var(--c-text-dark); margin-bottom: 4px; }
.view-sub { color: var(--c-accent); font-size: 1rem; margin-bottom: 24px; }

/* 齿轮装饰 */
.gear-decoration {
  position: absolute;
  top: 10px;
  right: 20px;
  pointer-events: none;
  opacity: 0.4;
}
.gear { width: 80px; height: 80px; }
.gear-1 { animation: spin-slow 20s linear infinite; }
.gear-2 {
  position: absolute;
  top: 10px;
  right: 55px;
  width: 60px;
  height: 60px;
  animation: spin-slow 15s linear infinite reverse;
}

/* 卡片网格 */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
</style>
```

---

### Task 19: 创建 SkillCard — 3D 翻转技能卡片

**Files:**
- Create: `src/components/shared/SkillCard.vue`

- [ ] **Step 1: 编写 3D 翻转技能卡片**

```vue
<script setup>
defineProps({
  category: { type: Object, required: true },
  flipped: { type: Boolean, default: false },
})

defineEmits(['flip'])
</script>

<template>
  <div class="skill-card-3d" :class="{ flipped }" @click="$emit('flip')">
    <div class="card-inner">
      <!-- 正面 -->
      <div class="card-front">
        <div class="front-icon">{{ category.icon }}</div>
        <h3 class="front-title">{{ category.title }}</h3>
        <p class="front-summary">{{ category.summary }}</p>
        <div class="front-hint">点击翻转查看技能 →</div>
      </div>
      <!-- 背面 -->
      <div class="card-back">
        <h3 class="back-title">{{ category.icon }} {{ category.title }}</h3>
        <div class="skill-list">
          <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= skill.level }">★</span>
              </span>
            </div>
            <div class="skill-tags">
              <span v-for="tag in skill.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
        <div class="back-hint">点击翻回 ←</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-card-3d {
  perspective: 800px;
  height: 300px;
  cursor: pointer;
}
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius-md);
  border: 3px solid rgba(255,255,255,0.6);
  padding: 18px;
  overflow: hidden;
}

.card-front {
  background: var(--c-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 6px 16px var(--c-shadow);
}
.front-icon { font-size: 2.5rem; margin-bottom: 8px; }
.front-title { font-size: 1.1rem; color: var(--c-text-dark); margin-bottom: 8px; }
.front-summary { font-size: 0.85rem; color: var(--c-text); line-height: 1.5; }
.front-hint {
  position: absolute;
  bottom: 10px;
  font-size: 0.75rem;
  color: var(--c-accent);
  animation: pulse 2s ease-in-out infinite;
}

.card-back {
  background: var(--c-light);
  transform: rotateY(180deg);
  box-shadow: 0 6px 16px var(--c-shadow);
  overflow-y: auto;
}
.back-title { font-size: 1rem; color: var(--c-text-dark); margin-bottom: 10px; }
.skill-list { display: flex; flex-direction: column; gap: 8px; }
.skill-item { font-size: 0.82rem; }
.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.skill-name { font-weight: 600; color: var(--c-text-dark); }
.star { color: #ddd; font-size: 0.7rem; }
.star.filled { color: #FFCA3A; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 3px; }
.tag {
  background: var(--c-white);
  color: var(--c-accent);
  padding: 1px 7px;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 500;
}
.back-hint {
  text-align: center;
  font-size: 0.75rem;
  color: var(--c-accent);
  margin-top: 8px;
}
</style>
```

---

### Task 20: 创建 CampsiteView — 露营地项目展示

**Files:**
- Create: `src/components/views/CampsiteView.vue`

- [ ] **Step 1: 编写露营地项目视图**

```vue
<script setup>
import ProjectTent from '../shared/ProjectTent.vue'

const projects = [
  {
    id: 'rtos',
    title: '自研 RTOS',
    icon: '⚙️',
    description: '一个用于学习 RTOS 知识的玩具内核。跑在 STM32F1/F4 上，实现了任务调度、内存管理、同步机制。虽然不适用于生产环境，但写它的过程教会了我很多。',
    tags: ['STM32', 'C', 'ARM', '任务调度', 'IPC'],
  },
  {
    id: 'ota',
    title: 'OTA 升级系统',
    icon: '📡',
    description: '为 STM32 和 NRF52832 设计的无线固件升级系统。支持蓝牙和串口传输，含差分包算法 (Bsdiff) 和压缩 (miniLZO/QuickLZ)。',
    tags: ['STM32', 'NRF52832', 'BLE', 'BSDiff', 'LZO'],
  },
  {
    id: 'btn',
    title: 'Button Manager',
    icon: '🔘',
    description: '按键管理器库——处理单击、双击、长按、组合键。在嵌入式设备上，按键是唯一的输入方式，所以这个库设计得非常健壮。',
    tags: ['C', 'Embedded', 'Event-driven'],
  },
  {
    id: 'eeprom',
    title: 'EEPROM Data Manager',
    icon: '💾',
    description: '管理大容量 EEPROM 的数据存储系统。支持磨损均衡、数据校验和快速检索——像一个小型文件系统。',
    tags: ['C', 'EEPROM', 'Wear Leveling', 'CRC'],
  },
  {
    id: 'protocol',
    title: '芯片间通信协议',
    icon: '🔗',
    description: '自定义的轻量级通信协议，用于 MCU 间、MCU 与 PC/手机间的数据传输。支持分包、校验、重传。',
    tags: ['C', 'Protocol', 'UART', 'BLE', 'USB'],
  },
  {
    id: 'web',
    title: '个人网站（本站）',
    icon: '🏝️',
    description: '就是你正在浏览的这个岛！Vue 3 + Vite 构建，纯 SVG 和 CSS 动画，没有用任何贴图。从零开始设计动物森友会主题。',
    tags: ['Vue.js', 'Vite', 'SVG', 'CSS Animations'],
  },
]
</script>

<template>
  <div class="campsite-view">
    <h1 class="view-title">🏕️ 露营地</h1>
    <p class="view-sub">围着营火，看看岛民都做过哪些项目</p>

    <!-- SVG 营火 -->
    <div class="campfire-container">
      <svg viewBox="0 0 100 80" class="campfire-svg">
        <!-- 木柴 -->
        <line x1="30" y1="65" x2="65" y2="55" stroke="#8B7355" stroke-width="5" stroke-linecap="round" />
        <line x1="35" y1="60" x2="70" y2="68" stroke="#8B4513" stroke-width="4.5" stroke-linecap="round" />
        <line x1="25" y1="62" x2="50" y2="70" stroke="#A0522D" stroke-width="4" stroke-linecap="round" />
        <!-- 火焰 -->
        <ellipse cx="48" cy="42" rx="15" ry="20" fill="#FFCA3A" opacity="0.7" class="flame flame-1" />
        <ellipse cx="48" cy="35" rx="10" ry="16" fill="#FFB347" opacity="0.8" class="flame flame-2" />
        <ellipse cx="48" cy="30" rx="6" ry="10" fill="#FF8C00" opacity="0.6" class="flame flame-3" />
        <!-- 火星粒子 -->
        <circle cx="45" cy="20" r="2" fill="#FFCA3A" opacity="0.8" class="spark spark-1" />
        <circle cx="52" cy="15" r="1.5" fill="#FFB347" opacity="0.7" class="spark spark-2" />
        <circle cx="40" cy="18" r="1.5" fill="#FF8C00" opacity="0.6" class="spark spark-3" />
      </svg>
    </div>

    <!-- 项目帐篷 -->
    <div class="project-grid">
      <ProjectTent v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<style scoped>
.campsite-view {
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
  animation: fade-in-up 0.6s ease;
}
.view-title { font-size: 2rem; font-weight: 700; color: var(--c-text-dark); margin-bottom: 4px; }
.view-sub { color: var(--c-accent); font-size: 1rem; margin-bottom: 16px; }

.campfire-container {
  text-align: center;
  margin-bottom: 20px;
}
.campfire-svg { width: 100px; height: 80px; }

.flame-1 { animation: pulse 1.5s ease-in-out infinite; transform-origin: 48px 42px; }
.flame-2 { animation: pulse 1s ease-in-out infinite 0.2s; transform-origin: 48px 35px; }
.flame-3 { animation: pulse 0.8s ease-in-out infinite 0.4s; transform-origin: 48px 30px; }

.spark { animation: smoke-rise 1.5s ease-out infinite; }
.spark-2 { animation-delay: 0.5s; }
.spark-3 { animation-delay: 1s; }

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
}
</style>
```

---

### Task 21: 创建 ProjectTent — 项目帐篷卡片

**Files:**
- Create: `src/components/shared/ProjectTent.vue`

- [ ] **Step 1: 编写帐篷卡片组件**

```vue
<script setup>
import { ref } from 'vue'

defineProps({
  project: { type: Object, required: true },
})

const expanded = ref(false)
</script>

<template>
  <div class="tent-card card" :class="{ expanded }" @click="expanded = !expanded">
    <!-- SVG 帐篷图标 -->
    <svg viewBox="0 0 40 36" class="tent-svg">
      <polygon points="20,4 2,34 38,34" fill="none" stroke="#5D7A4A" stroke-width="2.5" stroke-linejoin="round" />
      <line x1="20" y1="4" x2="20" y2="34" stroke="#5D7A4A" stroke-width="1.5" stroke-dasharray="3 3" />
      <polygon points="20,4 2,34 20,34" fill="#E1F0DA" opacity="0.5" />
    </svg>

    <div class="tent-header">
      <span class="tent-icon">{{ project.icon }}</span>
      <h3>{{ project.title }}</h3>
    </div>

    <transition name="expand">
      <div v-if="expanded" class="tent-detail">
        <p>{{ project.description }}</p>
        <div class="tent-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </transition>

    <div class="tent-hint">{{ expanded ? '点击收起 ▲' : '点击展开 ▼' }}</div>
  </div>
</template>

<style scoped>
.tent-card {
  padding: 16px;
  cursor: pointer;
  text-align: center;
}
.tent-card.expanded {
  text-align: left;
}

.tent-svg {
  width: 40px;
  height: 36px;
  margin: 0 auto;
  display: block;
}

.tent-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;
}
.tent-header h3 { font-size: 1rem; color: var(--c-text-dark); }
.tent-icon { font-size: 1.2rem; }

.tent-detail {
  margin-top: 10px;
}
.tent-detail p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--c-text);
  margin-bottom: 10px;
}
.tent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tag {
  background: var(--c-light);
  color: var(--c-accent);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 500;
}

.tent-hint {
  font-size: 0.75rem;
  color: var(--c-accent);
  margin-top: 8px;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
```

---

### Task 22: 创建 BeachView — 沙滩放松

**Files:**
- Create: `src/components/views/BeachView.vue`

- [ ] **Step 1: 编写沙滩放松视图**

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const clickedShell = ref(false)
const shellMessage = ref('')

const shellMessages = [
  '你捡到了一个贝壳！打开一看——居然是 2048 游戏的传送门！',
  '贝壳里写着：/"休息是为了走更远的路/"……还有一个游戏入口。',
  '这只贝壳好特别！上面刻着 /"2048/" 几个数字...',
]

function clickShell() {
  shellMessage.value = shellMessages[Math.floor(Math.random() * shellMessages.length)]
  clickedShell.value = true
}

function goGame() {
  router.push('/relax/game2048')
}
</script>

<template>
  <div class="beach-view">
    <h1 class="view-title">🏖️ 沙滩</h1>
    <p class="view-sub">海浪声是最好的白噪音——休息一下</p>

    <!-- SVG 海浪 -->
    <div class="wave-container">
      <svg viewBox="0 0 400 80" class="wave-svg">
        <!-- 海浪层叠 -->
        <path d="M0,40 Q50,20 100,40 Q150,60 200,40 Q250,20 300,40 Q350,60 400,40 L400,80 L0,80 Z"
          fill="#A8D8EA" opacity="0.5" class="wave wave-1" />
        <path d="M0,45 Q60,30 120,45 Q180,60 240,45 Q300,30 360,45 Q380,50 400,45 L400,80 L0,80 Z"
          fill="#89C2D9" opacity="0.4" class="wave wave-2" />
        <path d="M0,50 Q70,38 140,50 Q210,62 280,50 Q350,38 400,50 L400,80 L0,80 Z"
          fill="#7BB3C7" opacity="0.3" class="wave wave-3" />
      </svg>
    </div>

    <!-- 沙滩区域 -->
    <div class="beach-area">
      <!-- 贝壳 -->
      <div class="shell" :class="{ clicked: clickedShell }" @click="clickShell">
        <svg viewBox="0 0 30 20" width="30" height="20">
          <path d="M2,10 Q8,2 15,8 Q22,2 28,10 Q22,18 15,12 Q8,18 2,10Z"
            fill="#FFF8D6" stroke="#BFD8AF" stroke-width="1.5" />
          <line x1="8" y1="10" x2="22" y2="10" stroke="#BFD8AF" stroke-width="0.5" />
        </svg>
      </div>

      <!-- 海星 -->
      <div class="starfish">
        <svg viewBox="0 0 30 30" width="30" height="30">
          <polygon points="15,2 19,11 28,11 21,17 24,26 15,20 6,26 9,17 2,11 11,11"
            fill="#FFB5BA" stroke="#FFB5BA" stroke-width="1" opacity="0.6" />
        </svg>
      </div>

      <!-- 贝壳提示气泡 -->
      <div v-if="clickedShell" class="shell-bubble">
        <p>{{ shellMessage }}</p>
        <button @click="goGame">进入 2048 游戏 🎮</button>
      </div>
    </div>

    <!-- 2048 游戏入口卡片 -->
    <div class="game-entry card" @click="goGame">
      <div class="game-icon">🎮</div>
      <div class="game-info">
        <h3>2048</h3>
        <p>经典数字合并游戏——看看你能不能赢</p>
      </div>
      <div class="game-arrow">→</div>
    </div>
  </div>
</template>

<style scoped>
.beach-view {
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  animation: fade-in-up 0.6s ease;
}
.view-title { font-size: 2rem; font-weight: 700; color: var(--c-text-dark); margin-bottom: 4px; }
.view-sub { color: var(--c-accent); font-size: 1rem; margin-bottom: 16px; }

.wave-container { margin-bottom: 16px; }
.wave-svg { width: 100%; height: 80px; display: block; }

.wave-1 { animation: wave 4s ease-in-out infinite; }
.wave-2 { animation: wave 5s ease-in-out infinite reverse; }
.wave-3 { animation: wave 6s ease-in-out infinite 0.5s; }

.beach-area {
  background: linear-gradient(180deg, #FFF8D6 0%, #F5E6C8 100%);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: relative;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.shell {
  cursor: pointer;
  transition: transform var(--transition-bounce);
}
.shell:hover { transform: scale(1.3) rotate(-10deg); }
.shell.clicked { transform: scale(1.5); }

.starfish { transition: transform var(--transition-bounce); cursor: default; }
.starfish:hover { transform: rotate(15deg) scale(1.2); }

.shell-bubble {
  position: absolute;
  bottom: 100%;
  background: white;
  padding: 14px 18px;
  border-radius: var(--radius-lg);
  box-shadow: 0 6px 20px var(--c-shadow-strong);
  text-align: center;
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  max-width: 280px;
}
.shell-bubble p { font-size: 0.9rem; margin-bottom: 10px; color: var(--c-text-dark); }
.shell-bubble button { font-size: 0.85rem; }

.game-entry {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  cursor: pointer;
}
.game-icon { font-size: 2rem; }
.game-info h3 { font-size: 1.05rem; color: var(--c-text-dark); }
.game-info p { font-size: 0.85rem; color: var(--c-text); }
.game-arrow { margin-left: auto; font-size: 1.3rem; color: var(--c-accent); }
</style>
```

---

### Task 23: 创建 BlogExhibit — 博客内容渲染器

**Files:**
- Create: `src/components/shared/BlogExhibit.vue`

- [ ] **Step 1: 编写动态博客渲染组件**

```vue
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  slug: { type: String, required: true },
})

const blogContent = ref(null)
const loading = ref(true)
const error = ref('')

async function loadBlog() {
  loading.value = true
  error.value = ''
  try {
    const module = await import(`../../blogs/${props.slug}/blog.md`)
    blogContent.value = module.default
  } catch (e) {
    error.value = '展品正在修复中，请稍后再来...'
    console.error('Blog load error:', e)
  } finally {
    loading.value = false
  }
}

watch(() => props.slug, loadBlog, { immediate: true })
</script>

<template>
  <div class="blog-exhibit">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>正在搬运展品...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>😢 {{ error }}</p>
    </div>
    <div v-else class="blog-render">
      <component :is="blogContent" />
    </div>
  </div>
</template>

<style scoped>
.blog-exhibit {
  min-height: 200px;
}
.loading-state, .error-state {
  text-align: center;
  padding: 40px;
  color: var(--c-accent);
}
.loading-spinner {
  width: 32px; height: 32px;
  border: 3px solid var(--c-light);
  border-top: 3px solid var(--c-accent);
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin-slow 1s linear infinite;
}
.blog-render {
  font-size: 0.95rem;
  line-height: 1.8;
}
/* 继承原有 blog 内容样式 */
.blog-render :deep(h1) { color: var(--c-text-dark); }
.blog-render :deep(h2) { color: var(--c-text-dark); margin-top: 20px; }
.blog-render :deep(h3) { color: var(--c-accent); }
.blog-render :deep(code) {
  background: var(--c-light);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
.blog-render :deep(pre) {
  background: var(--c-text-dark);
  color: #E1F0DA;
  padding: 16px;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}
.blog-render :deep(iframe) {
  width: 100%;
  border: none;
  border-radius: var(--radius-sm);
}
</style>
```

---

### Task 24: 集成验证与构建测试

**Files:**
- Check: `package.json`, `vite.config.js`, 所有新建文件

- [ ] **Step 1: 安装依赖并测试 dev server**

```bash
npm install
npm run dev
```
预期: Vite dev server 启动成功，无编译错误。

- [ ] **Step 2: 生产构建测试**

```bash
npm run build
```
预期: Build 成功，dist 目录生成。

- [ ] **Step 3: 验证路由完整性**

在浏览器中访问以下路径确认均能正常渲染：
- `/` — 广场大树 + 岛屿地图
- `/about` — 我的小屋
- `/blog` — 博物馆（展品列表和文章详情）
- `/skills` — 工坊技能卡片
- `/projects` — 露营地项目展示
- `/relax` — 沙滩 + 2048 入口
- `/relax/game2048` — 2048 游戏

- [ ] **Step 4: 验证开场动画**

清除 localStorage 后刷新首页，确认落叶开场动画播放。再次刷新确认跳过动画直接进入。

- [ ] **Step 5: 修复任何构建警告/错误**

运行 `npm run build` 并确保零错误和零关键警告。

---

## 实现顺序

```
Phase 1: Cleanup
  Task 1: 清理旧代码

Phase 2: Foundation
  Task 2: 全局样式 → Task 3: index.html → Task 4: main.js → Task 5: App.vue

Phase 3: Island Map System (可并行)
  Task 6: SpeechBubble → Task 8: IslandMap → Task 9-14: 子组件
  (子组件间无依赖，可并行)

Phase 4: Intro
  Task 7: IntroOverlay

Phase 5: Views (可并行)
  Task 15-22: 六个视图页面 + 三个共享组件
  (SkillCard, ProjectTent, BlogExhibit 分别被 WorkshopView, CampsiteView, MuseumView 依赖)

Phase 6: Integration
  Task 23: BlogExhibit → Task 24: 集成验证
```
