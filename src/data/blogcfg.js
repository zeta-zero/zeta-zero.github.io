// 博客系列 UI 配置 — 将 series type 映射为博物馆展厅的展示信息
// 实际博客数据 (title/slug/modtime) 从 TOML 文件动态加载
export const blogcfg = {
  ble:    { hall: '深海馆', desc: '潜入蓝牙协议栈的深水区', icon: 'ble' },
  techs:  { hall: '昆虫馆', desc: '各种技术知识的标本收集', icon: 'techs' },
  rtos:   { hall: '化石翼', desc: '从寄存器到操作系统的进化之旅', icon: 'rtos' },
  others: { hall: '艺术馆', desc: '无法归类的奇妙收藏', icon: 'others' },
  zrtp:   { hall: '档案室', desc: '运行时语言报告存档', icon: 'others' },
}
