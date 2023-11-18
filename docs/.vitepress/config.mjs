import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "blogs",
  description: "blogs",
  srcDir: 'blogs',
  themeConfig: {
    sidebar: [
      '/',
      './others/'  // 添加你的文章路径
    ]
  }
})
