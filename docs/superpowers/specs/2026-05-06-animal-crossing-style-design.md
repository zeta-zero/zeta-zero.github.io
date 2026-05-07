# 动物森友会风格网页设计规范

**日期**: 2026-05-06
**版本**: 1.0

---

## 1. 设计概述

将博客网站重新设计为动物森友会(Animal Crossing)风格，采用马卡龙色系、圆滚滚可爱元素、日落渐变背景，打造温暖治愈系的网页体验。

---

## 2. 配色方案

### 2.1 主色调 (CSS 变量)

```css
:root {
  /* 马卡龙色系 */
  --color-pink: #FFB5BA;        /* 淡粉 - 温暖基底 */
  --color-mint: #B8E0D2;         /* 薄荷绿 - 清新感 */
  --color-yellow: #FFCA3A;       /* 暖黄 - 高亮按钮 */
  --color-sky: #A2D2FF;          /* 天空蓝 - 链接进度条 */
  --color-lavender: #CDB4DB;     /* 淡紫 - 装饰标题 */

  /* 背景渐变 */
  --gradient-sunset: linear-gradient(135deg, #FFE5D9 0%, #B8E0D2 50%, #A2D2FF 100%);

  /* 文字色 */
  --color-text: #5D5D5D;         /* 暖灰 - 正文 */
  --color-text-dark: #4A4A4A;    /* 深灰 - 标题 */

  /* 功能色 */
  --color-bg: #FFF9F5;           /* 米白 - 卡片背景 */
  --color-border: #E8E8E8;       /* 浅灰 - 边框 */
}
```

### 2.2 颜色应用规则

| 元素 | 颜色 |
|------|------|
| 页面背景 | 日落渐变 |
| 卡片背景 | `--color-bg` |
| 侧边栏 | `--color-pink` |
| 博客标题栏 | `--color-mint` |
| 表格标题 | `--color-sky` |
| 关于页面标题 | `--color-lavender` |
| 导航按钮悬停 | `--color-yellow` |
| 链接 | `--color-sky` |

---

## 3. 圆角风格

```css
/* 圆角系统 */
--radius-small: 10px;    /* 小按钮/输入框 */
--radius-medium: 20px;   /* 卡片 */
--radius-large: 30px;    /* 大卡片/容器 */
--radius-pill: 50px;     /* 椭圆按钮 */
--radius-cloud: 25px 25px 35px 35px;  /* 云朵按钮 */
```

---

## 4. 侧边栏导航

### 4.1 云朵按钮样式

```css
.z-router-link {
  background-color: white;
  border-radius: 25px 25px 35px 35px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹跳效果 */
}

.z-router-link:hover {
  transform: translateY(-5px) scale(1.05);
  background-color: var(--color-yellow);
}
```

### 4.2 选中状态

```css
.router-link-exact-active {
  background-color: var(--color-pink) !important;
  color: white !important;
}
```

---

## 5. 装饰元素

### 5.1 浮动云朵

位置：页面右下角，CSS 动画缓慢飘动

```css
.floating-cloud {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 100px;
  height: 60px;
  background: white;
  border-radius: 50px;
  opacity: 0.8;
  animation: float 6s ease-in-out infinite;
}
```

### 5.2 小星星装饰

在卡片角落添加小星星 SVG

---

## 6. 组件样式

### 6.1 博客卡片

```css
.blog-item {
  background: var(--color-bg);
  border-radius: var(--radius-medium);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border: 3px solid white;
}
```

### 6.2 按钮

```css
button {
  background: var(--color-yellow);
  border-radius: var(--radius-pill);
  border: 3px solid white;
  padding: 12px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

### 6.3 进度条

动物森友会风格：在进度条两端添加小圆形装饰

---

## 7. 动画效果

### 7.1 弹跳悬停

```css
transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 7.2 云朵漂浮

```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

### 7.3 淡入效果

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 8. 字体

保持现有字体：`Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`

---

## 9. 修改文件清单

1. `src/style.css` - 全局样式/CSS变量
2. `src/assets/css/default_pc.css` - 侧边栏样式
3. `src/components/*.vue` - 各页面组件
4. `index.html` - 添加装饰元素

---

## 10. 验收标准

- [ ] 背景使用日落渐变
- [ ] 侧边栏按钮为云朵形状并可弹跳
- [ ] 所有卡片圆角化
- [ ] 马卡龙配色应用正确
- [ ] 浮动装饰元素可见
- [ ] 悬停效果平滑