# 动物森友会风格个人岛屿 — 设计文档

## 概述

将现有个人技术博客重构为「动物森友会」风格的个人知识岛屿。访客通过 SVG 岛屿地图自由探索六个区域。保留博客内容、游戏页面和技术资产，重建所有组件、路由、样式系统。

## 核心隐喻

网站 = 一座清晨森林中的个人岛屿。知识 = 岛上的资源，技能 = 能制作的物品，博客 = 博物馆收藏。

### 设计原则

- **低调且高大上**：自然绿色系，克制但有深度的交互
- **可玩性**：探索发现的惊喜感，不只是展示信息的网站
- **零贴图**：所有装饰元素用 CSS 和 SVG 构建
- **幽默有趣**：轻幽默文字风格，专业中带调皮

---

## 视觉系统

### 配色：清晨森林

| 角色 | 色值 | 用途 |
|------|------|------|
| 主背景 | `#D4E7C5` | 页面背景、岛屿陆地 |
| 卡片 | `#BFD8AF` | 卡片、面板背景 |
| 强调色 | `#99BC85` | 按钮、链接、重点标记 |
| 浅色区 | `#E1F0DA` | 高亮区域、hover 状态 |
| 阳光 | `#FFF8D6` | 高亮、提示气泡、温暖点缀 |
| 正文 | `#5D7A4A` | 正文文字 |
| 深色 | `#3D5A2E` | 标题、强调文字 |

### 字体

系统默认字体（用户要求）。标题使用 `system-ui` 600 weight 增加友好感。

### 圆角系统

- 小圆角：8px（卡片内部元素）
- 中圆角：16px（卡片、按钮）
- 大圆角：24px（大面板、气泡）
- 胶囊：50px（按钮、标签）

---

## 六区岛屿结构

### 1. 广场大树 `🌳` — 首页/动态 (/)
- 岛屿地图入口，大树作为视觉中心
- 展示最近的博客更新（果实掉落动画）
- 随机欢迎语气泡
- 云朵漂浮、蝴蝶飞舞的全局氛围

### 2. 我的小屋 `🏠` — 关于我 (/about)
- 个人介绍（来自 SkillTree/aboutme）
- 小屋外景 → 点击进入内部
- 烟囱炊烟动画、窗户暖光呼吸
- 相框展示个人照片（保留现有 profilephoto）

### 3. 博物馆 `🏛️` — 博客收藏 (/blog)
- 博客列表以「展品」形式陈列
- 按系列（techs/rtos/ble/others）分区
- 萤火虫光点漂浮氛围
- 点击展品查看完整文章

### 4. 工坊 `🔧` — 技能卡片 (/skills)
- DIY 配方卡片墙，六大技能类别
- 正面：类别名 + 趣味描述
- 背面（翻转）：具体技能点 + 熟练度条
- 齿轮缓慢旋转背景动画
- 数据来源：SkillTree/blog.md

### 5. 露营地 `🏕️` — 项目展示 (/projects)
- 以「营火」为中心的项目展示区
- 帐篷 = 项目卡片，展开查看详情
- 营火粒子动画
- 展示自开发组件：RTOS、OTA、Button Manager 等

### 6. 沙滩 `🏖️` — 放松 (/relax)
- 海浪波纹动画
- 内含 2048 小游戏入口
- 贝壳、海星装饰（CSS 绘制）
- 轻松休闲氛围

---

## 动效系统

### 开场动画：落叶登岛
- 页面首次加载 → 暗绿背景
- SVG 大叶子从左上飘旋而入（1.5s）
- 叶子落于中央 → 扩散变换为岛屿地图（1s）
- 角色图标弹跳落地 → 随机欢迎语气泡
- 二次访问（localStorage 标记）→ 跳过动画直接显示地图

### 全局氛围动画（纯 CSS）
- 云朵：`translateX` 横向漂移，不同速度分层
- 蝴蝶：SVG path 沿贝塞尔曲线飞舞
- 草浪：岛屿边缘 `skew` + `scaleY` 微动

### 区域场景动画
- 大树：叶片 `rotate` 摇摆 + 随机落叶（JS 定时生成）
- 博物馆：萤火虫光点 `opacity` + `translate` 浮动
- 工坊：齿轮 SVG `rotate` 360° 持续旋转
- 沙滩：海浪 `translateX` 来回拍打
- 小屋：炊烟 `translateY` + `opacity` 上升淡出，窗户亮度 `pulse`

### 交互微动效
- 建筑悬停：`scale(1.05)` + `translateY(-4px)` 弹跳
- 卡片悬停：`translateY(-8px)` + 阴影加深
- 按钮悬停：膨胀 + 阴影扩散
- 页面切换：角色图标沿 SVG path 「走过小径」到目标建筑

### 彩蛋交互
- 点击大树：摇晃掉落「果实」（随机博客文章推荐）
- 点击沙滩特定位置：挖出「化石」（隐藏内容提示）
- 连续点击角色：角色跳起并说一句随机的吐槽

---

## 技能卡片数据模型

基于 `src/blogs/others/SkillTree/blog.md`：

```
技能类别:
├── 嵌入式开发 (Embedded)
│   ├── C/C++ (C99/C11/C17, Linux Socket, MCU)
│   ├── MCU 平台 (STM32 F1/F4, NRF52832, ESP32)
│   ├── 通信协议 (UART/IIC/SPI/SDIO/USB/BLE/WiFi)
│   └── 库与框架 (FreeRTOS, ThreadX, lvgl, TouchGFX, CJson, Lwip...)
├── 蓝牙 & RTOS
│   ├── BLE (BlueNRG2/NRF52832/ESP32)
│   ├── BLE Mesh (ESP32)
│   ├── FreeRTOS
│   ├── ThreadX (NetX/FileX/GUIX/USBX/TraceX)
│   └── 自研 RTOS (STM32F1/F4)
├── 桌面应用
│   ├── C# (WPF/UWP/Avalonia, XAML/DataBinding)
│   ├── Unity3D / Godot
│   └── 通信 (USB HID, BLE, Serial Port)
├── Web 开发
│   ├── HTML/CSS/JavaScript (熟练度: 3/5)
│   ├── Vue.js / Bootstrap
│   └── crypto-js
├── 脚本 & 工具
│   ├── Python
│   ├── Lua (MCU 嵌入式应用)
│   ├── Go (WebServer)
│   ├── Git / VSCode
│   └── 加密库 (OpenSSL, mbedtls, Libsodium)
└── 硬件设计
    ├── PCB 设计 (Altium Designer, 立创EDA)
    └── 算法 (BP 神经网络, Q-Learning)
```

每张技能卡片：
- **正面**：类别图标 + 名称 + 一句幽默描述 + 熟练度概览
- **背面**（3D 翻转）：具体技能标签 + 熟练度进度条 + 相关项目链接

---

## 文字风格指南

### 基调
轻幽默 — 专业中带调皮。偶尔自嘲、偶尔吐槽，但保持技术内容的可信度。

### 示例
> 「这个岛民精通 C/C++，能在 STM32 上徒手写 RTOS——虽然大部分时候只是在和指针搏斗。」
>
> 「他的蓝牙栈比你前任的承诺还稳定。」
>
> 「十年嵌入式经验，至今仍在问：这个寄存器为什么叫这个名字？」
>
> 「Python 也会，但主要用来写一次性脚本——和所有人一样。」

### 规则
- 每段介绍至少有一个「梗」
- 技术描述保持准确，幽默是调味不是主菜
- 避免网络烂梗，倾向冷幽默和自嘲
- 欢迎语每次随机从 5-6 句中选取

---

## 技术架构

### 保留
- Vue 3 + Vite 框架
- vue-router（路由重新设计）
- markdown-it 博客渲染
- vite-plugin-md + 相关构建插件
- `src/assets/`：CSS 文件、profilephoto.png
- `src/blogcfg/`：serials.md 博客配置
- `src/blogs/`：全部 28 篇 markdown 博文
- `src/pages/game/game2048/`：2048 游戏
- `package.json` 中的依赖（可能需要微调）

### 重建
- `src/main.js`：新的路由和组件注册
- `src/App.vue`：新的根组件
- `src/style.css`：新的全局样式系统
- `src/components/`：全部新的 Vue 组件
- `index.html`：更新 meta、title、结构
- 删除所有旧 Vue 组件（18 个文件）

### 组件树
```
App.vue
├── IntroOverlay.vue        # 落叶开场动画（首次访问）
├── IslandMap.vue           # SVG 岛屿地图（主导航）
│   ├── IslandPath.vue      # 小径路径
│   ├── IslandBuilding.vue  # 可交互建筑（×6）
│   ├── IslandCharacter.vue # 玩家角色图标
│   ├── CloudLayer.vue      # 浮动云层
│   ├── ButterflyEffect.vue # 蝴蝶飞舞
│   └── GrassWave.vue       # 草浪效果
├── views/
│   ├── PlazaView.vue       # 广场大树（首页）
│   ├── HouseView.vue       # 我的小屋（关于）
│   ├── MuseumView.vue      # 博物馆（博客）
│   ├── WorkshopView.vue    # 工坊（技能）
│   ├── CampsiteView.vue    # 露营地（项目）
│   └── BeachView.vue       # 沙滩（放松）
└── shared/
    ├── SpeechBubble.vue    # 对话气泡组件
    ├── SkillCard.vue       # 技能卡片（3D翻转）
    ├── BlogExhibit.vue     # 博客展品
    └── ProjectTent.vue     # 项目帐篷卡片
```

### 路由设计
```
/              → PlazaView（岛屿地图 + 广场）
/about         → HouseView
/blog          → MuseumView
/blog/:slug    → MuseumView（展开单篇文章）
/skills        → WorkshopView
/projects      → CampsiteView
/relax         → BeachView
/relax/game2048 → Game2048Component（保留）
```

---

## 响应式策略

- 桌面（>1024px）：完整 SVG 岛屿地图，六区可见
- 平板（768-1024px）：岛屿地图缩放，建筑图标缩小
- 手机（<768px）：地图变为纵向滚动列表，保留建筑图标和过渡动画
  - 导航改为底部「背包栏」（类似动森口袋）

---

## 性能考量

- 所有动画优先使用 CSS `transform` 和 `opacity`（GPU 加速）
- SVG 内联而非外部加载
- 无额外图片资源（除保留的 profilephoto）
- 开场动画仅在首次访问时播放（localStorage）
- 博客内容懒加载（动态 import）
- 无第三方动画库，纯 CSS + 少量 JS

---

## 浏览器兼容

- 现代浏览器（Chrome/Firefox/Safari/Edge 最近 2 个大版本）
- CSS 3D transform 用于卡片翻转
- CSS animation / @keyframes
- SVG 内联
- localStorage

---

## 文件变更清单

### 删除
- `src/App.vue`
- `src/main.js`
- `src/style.css`
- `src/components/*.vue`（全部 18 个文件）
- `src/components/about-detial/`（全部 4 个文件）
- `src/components/astral/`（全部 4 个文件）
- `src/components/blog-detial/`（全部 2 个文件）
- `src/components/home-detial/`（全部 1 个文件）

### 新增
- `src/main.js`（重写）
- `src/App.vue`（重写）
- `src/style.css`（重写）
- `src/components/IntroOverlay.vue`
- `src/components/IslandMap.vue`
- `src/components/IslandPath.vue`
- `src/components/IslandBuilding.vue`
- `src/components/IslandCharacter.vue`
- `src/components/CloudLayer.vue`
- `src/components/ButterflyEffect.vue`
- `src/components/GrassWave.vue`
- `src/components/views/PlazaView.vue`
- `src/components/views/HouseView.vue`
- `src/components/views/MuseumView.vue`
- `src/components/views/WorkshopView.vue`
- `src/components/views/CampsiteView.vue`
- `src/components/views/BeachView.vue`
- `src/components/shared/SpeechBubble.vue`
- `src/components/shared/SkillCard.vue`
- `src/components/shared/BlogExhibit.vue`
- `src/components/shared/ProjectTent.vue`

### 修改
- `index.html`：更新结构、meta、标题
