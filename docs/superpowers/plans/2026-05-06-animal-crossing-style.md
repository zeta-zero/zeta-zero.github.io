# 动物森友会风格网页实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将博客网站转换为动物森友会风格，采用马卡龙色系、云朵按钮、日落渐变背景

**Architecture:** 修改全局CSS变量和关键样式文件，保持现有布局结构不变，只美化视觉风格

**Tech Stack:** CSS (SCSS), Vue.js, 现有Bootstrap框架

---

## 文件结构

| 文件 | 负责 |
|------|------|
| `src/style.css` | 全局CSS变量和基础样式 |
| `src/assets/css/default_pc.css` | 侧边栏导航样式 |
| `src/components/*.vue` | 各页面组件样式 |
| `index.html` | 添加装饰元素和背景 |

---

### Task 1: 更新全局CSS变量 (style.css)

**Files:**
- Modify: `src/style.css`
- Reference: `docs/superpowers/specs/2026-05-06-animal-crossing-style-design.md`

- [ ] **Step 1: 更新CSS变量**

替换整个 `:root` 块为:

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light;
  color: #5D5D5D;
  background-color: #FFF9F5;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  /* 动物森友会马卡龙色系 */
  --color-pink: #FFB5BA;
  --color-mint: #B8E0D2;
  --color-yellow: #FFCA3A;
  --color-sky: #A2D2FF;
  --color-lavender: #CDB4DB;

  /* 渐变背景 */
  --gradient-sunset: linear-gradient(135deg, #FFE5D9 0%, #B8E0D2 50%, #A2D2FF 100%);

  /* 文字色 */
  --color-text: #5D5D5D;
  --color-text-dark: #4A4A4A;

  /* 功能色 */
  --color-bg: #FFF9F5;
  --color-card-bg: #FFFFFF;
  --color-border: #E8E8E8;

  /* 圆角系统 */
  --radius-small: 10px;
  --radius-medium: 20px;
  --radius-large: 30px;
  --radius-pill: 50px;

  /* 侧边栏导航按钮颜色 */
  --z-leftbar-btn-secondry: #FFCA3A;
  --z-leftbar-btn-slected: #FFB5BA;
  --z-leftbar-btn-default: #FFFFFF;

  /* 卡片悬停 */
  --user-card-bgcolr-hover: #A2D2FF;
}
```

- [ ] **Step 2: 更新a标签样式**

替换为:
```css
a {
  font-weight: 500;
  color: var(--color-sky);
  text-decoration: none;
  transition: color 0.3s ease;
}
a:hover {
  color: var(--color-pink);
}
```

- [ ] **Step 3: 更新body样式**

```css
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: var(--gradient-sunset);
  background-attachment: fixed;
  color: var(--color-text);
}
```

- [ ] **Step 4: 更新button样式**

```css
button {
  border-radius: var(--radius-pill);
  border: 3px solid white;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--color-yellow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

- [ ] **Step 5: 删除深色模式媒体查询** (从 `@media (prefers-color-scheme: light)` 开始的部分)

---

### Task 2: 更新侧边栏样式 (default_pc.css)

**Files:**
- Modify: `src/assets/css/default_pc.css`

- [ ] **Step 1: 更新body样式**

```css
body {
  background: var(--gradient-sunset);
  background-attachment: fixed;
  --z-leftbar-btn-secondry: #FFCA3A;
  --z-leftbar-btn-slected: #FFB5BA;
}
```

- [ ] **Step 2: 更新侧边栏容器**

```css
#z-sidebar {
  z-index: 10;
  color: #fff;
  height: 100vh;
  left: 0;
  position: fixed;
  padding: 10px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
```

- [ ] **Step 3: 更新导航按钮为云朵形状**

替换 `.z-router-link` 为:
```css
.z-router-link {
  text-decoration: none;
  color: var(--color-text);
  position: relative;
  cursor: pointer;
  padding: 16px 20px;
  border-radius: 25px 25px 35px 35px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.z-router-link:hover {
  transform: translateY(-5px) scale(1.05);
  background-color: var(--color-yellow);
  color: white;
}

.z-router-link.router-link-exact-active {
  background-color: var(--color-pink);
  color: white;
}
```

- [ ] **Step 4: 更新内容区域**

```css
#z-content {
  z-index: 0;
  padding: 20px 20px 20px 100px;
  height: 100%;
  --user-card-bgcolr-hover: #A2D2FF
}
```

---

### Task 3: 更新博客页面样式 (blog.vue)

**Files:**
- Modify: `src/components/blog.vue`

- [ ] **Step 1: 更新标题栏样式**

```css
.blog-contianer .blog-item .blog-item-title {
  height: 45px;
  width: 100%;
  padding: 0px;
  padding-top: 8px;
  border-bottom: 3px solid white;
  background-color: var(--color-mint);
  font-weight: bold;
  color: white;
  border-radius: var(--radius-medium) var(--radius-medium) 0 0;
}
```

- [ ] **Step 2: 更新卡片样式**

替换 `@media screen and (min-width:800px)` 中的 `.blog-contianer .blog-item` 为:
```css
.blog-contianer .blog-item {
  border-radius: var(--radius-medium);
  padding: 0;
  padding-bottom: 20px;
  margin: 0;
  overflow: hidden;
  text-align: center;
  height: 100%;
  background: var(--color-card-bg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border: 3px solid white;
}
```

- [ ] **Step 3: 更新内容区域样式**

```css
.blog-contianer .blog-item .blog-item-content {
  height: 100%;
  overflow: auto;
  text-align: left;
  padding: 25px;
  background-color: var(--color-card-bg);
  border-radius: 0 0 var(--radius-medium) var(--radius-medium);
}
```

- [ ] **Step 4: 更新表格标题**

```css
.blog-item-content .markdown-body table thead tr th {
  background-color: var(--color-sky);
  color: white;
  border-radius: var(--radius-small);
}
```

---

### Task 4: 更新关于页面样式 (about.vue)

**Files:**
- Modify: `src/components/about.vue`

- [ ] **Step 1: 更新标题样式**

```css
.about-item-title {
  min-height: 45px;
  border-bottom: 3px solid white;
  padding-top: 8px;
  margin: 0;
  color: white;
  background-color: var(--color-lavender);
  border-radius: var(--radius-medium) var(--radius-medium) 0 0;
}
```

- [ ] **Step 2: 更新卡片阴影**

```css
box-shadow: 0 8px 16px rgba(205, 180, 219, 0.3);
```

---

### Task 5: 更新博客列表样式 (bloglist.vue)

**Files:**
- Modify: `src/components/blog-detial/bloglist.vue`

- [ ] **Step 1: 更新悬停样式**

```css
.list-group-item:hover {
  color: var(--color-yellow);
  background-color: rgba(255, 202, 58, 0.1);
  font-weight: bold;
  border-radius: var(--radius-small);
}

.list-group-item.active {
  background-color: var(--color-sky);
  color: white;
  border: 0;
  font-weight: bold;
  border-radius: var(--radius-small);
}
```

---

### Task 6: 更新首页样式 (home.vue, homeschedule.vue, BncRect.vue)

**Files:**
- Modify: `src/components/home.vue`
- Modify: `src/components/home-detial/homeschedule.vue`
- Modify: `src/components/BncRect.vue`

- [ ] **Step 1: 更新BncRect动画方块颜色**

```css
.br-item-move {
  background-color: var(--color-pink);
  box-shadow: 0 0 15px 5px rgba(255, 181, 186, 0.5);
}
```

- [ ] **Step 2: 更新homeschedule进度条容器样式**

```css
.hs-body .hs-content {
  width: 50vw;
  height: auto;
  padding: 25px;
  border: 3px solid white;
  border-radius: var(--radius-large);
  align-self: center;
  background-color: var(--color-card-bg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

---

### Task 7: 更新关于页面子组件样式

**Files:**
- Modify: `src/components/about-detial/aboutme.vue`
- Modify: `src/components/about-detial/ablutstate.vue`
- Modify: `src/components/about-detial/aboutcreating.vue`
- Modify: `src/components/about-detial/aboutfunyview.vue`

- [ ] **Step 1: 更新aboutme.vue背景色**

```css
.am-body {
  background-color: var(--color-sky);
}
```

- [ ] **Step 2: 更新ablutstate.vue背景色**

```css
.as-table {
  background-color: var(--color-pink);
}
```

---

### Task 8: 更新休闲页面样式 (relax.vue, BncRect.vue)

**Files:**
- Modify: `src/components/relax.vue`

- [ ] **Step 1: 更新卡片头部样式**

```css
.user-card-header {
  background-color: var(--color-bg);
  height: 200px;
  display: flex;
  justify-content: center;
  border-bottom: 3px solid white;
  border-radius: var(--radius-medium) var(--radius-medium) 0 0;
}
```

- [ ] **Step 2: 更新卡片的hover效果**

```css
.user-card-anima:hover {
  background-color: var(--user-card-bgcolr-hover);
  color: white;
  border-radius: 0 0 var(--radius-medium) var(--radius-medium);
}
```

---

### Task 9: 添加装饰元素到 index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 在body末尾添加浮动云朵装饰**

在 `</body>` 前添加:
```html
<!-- 浮动云朵装饰 -->
<div class="floating-decoration">
  <div class="cloud cloud-1"></div>
  <div class="cloud cloud-2"></div>
  <div class="star star-1">✦</div>
  <div class="star star-2">✦</div>
</div>
```

- [ ] **Step 2: 在style.css中添加装饰样式** (在文件末尾添加)

```css
/* 动物森友会装饰元素 */
.floating-decoration {
  position: fixed;
  pointer-events: none;
  z-index: 100;
}

.cloud {
  position: absolute;
  background: white;
  border-radius: 50px;
  opacity: 0.7;
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  background: white;
  border-radius: 50%;
}

.cloud-1 {
  width: 80px;
  height: 40px;
  bottom: 40px;
  right: 30px;
  animation: float 8s ease-in-out infinite;
}

.cloud-1::before {
  width: 40px;
  height: 40px;
  top: -20px;
  left: 15px;
}

.cloud-1::after {
  width: 30px;
  height: 30px;
  top: -15px;
  right: 15px;
}

.cloud-2 {
  width: 60px;
  height: 30px;
  bottom: 100px;
  right: 120px;
  animation: float 10s ease-in-out infinite reverse;
}

.cloud-2::before {
  width: 30px;
  height: 30px;
  top: -15px;
  left: 10px;
}

.star {
  position: absolute;
  font-size: 20px;
  color: var(--color-yellow);
  animation: twinkle 2s ease-in-out infinite;
}

.star-1 {
  top: 100px;
  left: 150px;
  animation-delay: 0s;
}

.star-2 {
  top: 200px;
  left: 200px;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-15px) translateX(5px); }
  50% { transform: translateY(-10px) translateX(10px); }
  75% { transform: translateY(-20px) translateX(5px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
```

---

## 验收检查清单

- [ ] 背景使用日落渐变
- [ ] 侧边栏按钮为云朵形状
- [ ] 按钮悬停有弹跳效果
- [ ] 所有卡片有圆角和白色边框
- [ ] 马卡龙配色正确
- [ ] 浮动装饰元素可见
- [ ] 进度条样式可爱化

---

**Plan文件:** `docs/superpowers/plans/2026-05-06-animal-crossing-style.md