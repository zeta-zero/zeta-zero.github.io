import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md';
import code from '@yankeeinlondon/code-builder'
import meta from '@yankeeinlondon/meta-builder'
import link from '@yankeeinlondon/link-builder'
import { ViteToml } from 'vite-plugin-toml'
import mdkatex from 'markdown-it-katex'
import xKatex from 'katex'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],// vue插件默认只处理.vue文件，通过该参数配置让其也处理一下.md文件
        }),
        // 为了解决 Error [ERR_PACKAGE_PATH_NOT_EXPORTED], 在package.json增加 "type": "module"
        Markdown({
            builders: [meta(), code(), link()],
            // markdownItSetup(md) {
            //     md.use(mdkatex, {
            //         katex: xKatex
            //     });
            // },
        }),
        ViteToml(),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js'
        },
    },
    base: '/',
    // pages: {
    //     relaxgame2048: {
    //       entry: 'src/pages/page1/main.js',
    //       filename: 'game2048.html',
    //       title: '2048',
    //     },
    //     // Add more pages as needed
    //   },
})
