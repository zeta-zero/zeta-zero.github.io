// 岛屿数据中心 — 所有内容的单一来源
// 博客数据从 TOML 配置文件动态加载，其他内容在此维护

import { blogcfg } from './blogcfg.js'

/* ======== 从 TOML 文件加载博客数据 ======== */

// 导入所有 serialinfo.toml — 每系列一个
const serialModules = import.meta.glob('../blogs/**/serialinfo.toml', { eager: true })

// 导入所有 bloginfo.toml — 每篇文章一个
const blogModules = import.meta.glob('../blogs/**/bloginfo.toml', { eager: true })

// 解析路径: ../blogs/<seriesDir>/serialinfo.toml → seriesDir
function dirname(path) {
  return path.split('/').slice(-2, -1)[0]
}

// 解析路径: ../blogs/<seriesDir>/<blogDir>/bloginfo.toml → { seriesDir, blogDir }
function parseBlogPath(path) {
  const parts = path.split('/')
  return { seriesDir: parts[parts.length - 3], blogDir: parts[parts.length - 2] }
}

// 构建系列列表 — 合并 serialinfo.toml 数据与 blogcfg UI 配置
export const blogSeries = Object.entries(serialModules).map(([path, mod]) => {
  const { Type, Title } = mod
  const cfg = blogcfg[Type] || { hall: Title, desc: '', icon: 'others' }
  return { id: Type, name: Title, hall: cfg.hall, desc: cfg.desc }
})

// 构建文章列表 — 从所有 bloginfo.toml 提取
export const blogArticles = Object.entries(blogModules).map(([path, mod]) => {
  const { seriesDir, blogDir } = parseBlogPath(path)
  return {
    slug: `${seriesDir}/${blogDir}`,
    title: mod.title,
    series: mod.series,
  }
})

/* ======== 广场 ======== */

export const greetings = [
  { speaker: '傅达', text: '哩哈！广场的大树是岛上的中心。最近博物馆又收了新展品，有空来看看？' },
  { speaker: '狸克', text: '哦！这不是我们最棒的岛民代表吗？工坊的配方卡片翻新了，哩～' },
  { speaker: '傅珂', text: '今晚的星星特别亮呢...知识就像星星，一颗一颗连起来就成了星座～' },
]

export const recentUpdates = [
  { year: '2025', text: '从零开始设计 RTOS — 系列完结', cardColor: 'yellow' },
  { year: '2025', text: 'BLE Mesh 技术笔记更新', cardColor: 'teal' },
  { year: '2025', text: '滤波算法合集新增', cardColor: 'pink' },
]

/* ======== 小屋 ======== */

export const aboutData = {
  description: '一位在嵌入式世界游荡了十年的开发者。白天在寄存器和中断向量表之间穿梭，晚上偶尔写写博客，记录那些「啊哈！」瞬间。',
  quote: '「十年嵌入式经验，至今仍在问这个寄存器为什么叫这个名字。」',
  selfIntro: '主要活动于嵌入式 MCU 领域，擅长从裸机到 RTOS 的全栈嵌入式开发。偶尔涉足 C# 桌面开发、Python 脚本和 Web 前端。热爱将复杂的技术概念用简单的话讲清楚——这也是这个博客存在的意义。',
  email: 'zeta.zero@outlook.com',
  skillsTags: ['C/C++', 'STM32', 'NRF52', 'ESP32', 'BLE', 'FreeRTOS', 'C#/WPF', 'Vue.js', 'PCB Design'],
}

/* ======== 工坊 ======== */

export const skillCategories = [
  { id: 'embedded', title: '嵌入式开发', icon: 'embedded', summary: '在 MCU 的世界里，我是一等一的「寄存器翻译官」。',
    skills: [
      { name: 'C/C++', level: 4, tags: ['C99/C11/C17', 'Linux Socket', '可变长数组', '原子操作'] },
      { name: 'STM32', level: 4, tags: ['F1/F4', 'CubeMX', 'TouchGFX', 'Keil', 'GCC'] },
      { name: 'NRF52832', level: 3, tags: ['BLE', 'Keil', 'SDK'] },
      { name: 'ESP32', level: 3, tags: ['IDF', 'Arduino', 'BLE Mesh', 'WiFi'] },
      { name: '外设驱动', level: 4, tags: ['UART', 'IIC', 'SPI', 'SDIO', 'USB', 'PWM', 'ADC'] },
      { name: '嵌入式库', level: 4, tags: ['FreeRTOS', 'ThreadX', 'lvgl', 'TouchGFX', 'CJson', 'Lwip'] },
    ] },
  { id: 'ble_rtos', title: '蓝牙 & RTOS', icon: 'antenna', summary: '蓝牙栈比你前任的承诺还稳定。RTOS 嘛，我自己写了一个。',
    skills: [
      { name: 'BLE', level: 4, tags: ['BlueNRG2', 'NRF52832', 'ESP32', 'GATT', 'GAP'] },
      { name: 'BLE Mesh', level: 3, tags: ['ESP32', 'Node', 'Provisioning'] },
      { name: 'FreeRTOS', level: 4, tags: ['Task', 'Queue', 'Semaphore', 'Timer'] },
      { name: 'ThreadX', level: 3, tags: ['NetX', 'FileX', 'GUIX', 'USBX', 'TraceX'] },
      { name: '自研 RTOS', level: 3, tags: ['STM32F1/F4', '任务调度', '内存管理'] },
    ] },
  { id: 'desktop', title: '桌面应用', icon: 'desktop', summary: '能用 XAML 画界面，也能用 Unity 做游戏。',
    skills: [
      { name: 'C# / .NET', level: 4, tags: ['WPF', 'UWP', 'Avalonia', 'XAML', 'DataBinding'] },
      { name: '通信功能', level: 3, tags: ['USB HID', 'BLE', 'Serial Port'] },
      { name: 'Unity3D', level: 2, tags: ['C# Script', '2D/3D'] },
    ] },
  { id: 'web', title: 'Web 开发', icon: 'web', summary: '熟练度 3/5——够用就行，至少能搭出这个岛。',
    skills: [
      { name: 'HTML/CSS/JS', level: 3, tags: ['语义化', 'Flexbox', 'Grid', 'ES6+'] },
      { name: 'Vue.js', level: 3, tags: ['Composition API', 'vue-router', 'Vite'] },
    ] },
  { id: 'scripting', title: '脚本 & 工具', icon: 'python', summary: 'Python 主要是写一次性脚本——和所有人一样。',
    skills: [
      { name: 'Python', level: 3, tags: ['脚本', '自动化', 'TensorFlow'] },
      { name: 'Lua', level: 2, tags: ['MCU 嵌入式', 'STM32'] },
      { name: 'Git', level: 3, tags: ['GitHub', 'CI/CD'] },
      { name: '加密库', level: 3, tags: ['OpenSSL', 'mbedtls', 'Libsodium'] },
    ] },
  { id: 'hardware', title: '硬件设计', icon: 'pcb', summary: '既能写代码，也能画 PCB——软硬通吃的稀有岛民。',
    skills: [
      { name: 'PCB 设计', level: 3, tags: ['Altium Designer', '立创EDA'] },
      { name: '算法', level: 2, tags: ['BP 神经网络', 'Q-Learning'] },
      { name: '文档工具', level: 4, tags: ['Markdown', 'Draw.io', 'VSCode'] },
    ] },
]

/* ======== 露营地 ======== */

export const projects = [
  { id: 'rtos', title: '自研 RTOS', icon: 'gear',
    description: '一个用于学习 RTOS 知识的玩具内核。跑在 STM32F1/F4 上，实现了任务调度、内存管理、同步机制。虽然不适用于生产环境，但写它的过程教会了我很多。',
    tags: ['STM32', 'C', 'ARM', '任务调度', 'IPC'] },
  { id: 'ota', title: 'OTA 升级系统', icon: 'antenna',
    description: '为 STM32 和 NRF52832 设计的无线固件升级系统。支持蓝牙和串口传输，含差分包算法 (Bsdiff) 和压缩 (miniLZO/QuickLZ)。',
    tags: ['STM32', 'NRF52832', 'BLE', 'BSDiff', 'LZO'] },
  { id: 'btn', title: 'Button Manager', icon: 'button',
    description: '按键管理器库——处理单击、双击、长按、组合键。在嵌入式设备上，按键是唯一的输入方式，所以这个库设计得非常健壮。',
    tags: ['C', 'Embedded', 'Event-driven'] },
  { id: 'eeprom', title: 'EEPROM Data Manager', icon: 'chip',
    description: '管理大容量 EEPROM 的数据存储系统。支持磨损均衡、数据校验和快速检索——像一个小型文件系统。',
    tags: ['C', 'EEPROM', 'Wear Leveling', 'CRC'] },
  { id: 'protocol', title: '芯片间通信协议', icon: 'link',
    description: '自定义的轻量级通信协议，用于 MCU 间、MCU 与 PC/手机间的数据传输。支持分包、校验、重传。',
    tags: ['C', 'Protocol', 'UART', 'BLE', 'USB'] },
  { id: 'web', title: '个人网站（本站）', icon: 'web',
    description: '就是你正在浏览的这个岛！Vue 3 + Vite 构建，纯 SVG 和 CSS 动画，没有用任何贴图。从零开始设计动物森友会主题。',
    tags: ['Vue.js', 'Vite', 'SVG', 'CSS Animations'] },
]

/* ======== 沙滩 ======== */

export const shellMessages = [
  '你捡到了一个贝壳！打开一看——居然是 2048 游戏的传送门！',
  '贝壳里写着：「休息是为了走更远的路」……还有一个游戏入口。',
  '这只贝壳好特别！上面刻着 "2048" 几个数字...',
]

/* ======== 统计数据 — 从实际数据动态计算 ======== */

export const islandStats = {
  blogs: blogArticles.length,
  skills: skillCategories.reduce((sum, c) => sum + c.skills.length, 0),
  projects: projects.length,
}
