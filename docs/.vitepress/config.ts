import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config

export default defineConfig({
  title: "VL Element",
  description: "A VitePress Site",

    // 仓库名作为基础路径
    base: '/vl-element/',
    // 其他配置...
  vite: {
    plugins: [
      VueMacros.vite({
        setupComponent: false,
        
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    prevNextLinks: true,
    lastUpdated: true,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/api-examples' },
      { text: '组件', link: '/components/button' },
      { text: '源码获取', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Basic 基础组件库',
        items:[
          { text: 'Button  按钮', link: '/components/button' }
        ]
      },
      {
        text: 'Form 表单组件库',
        items: [
          { text: 'Input 输入框', link: '/components/Input' },
          { text: 'Select 选择器', link: '/components/Select' },
          { text: 'Switch 开关', link: '/components/Switch' },
          { text: 'Form 表单', link: '/components/Form' }
        ]
      },
      {
        text: 'Data 数据展示',
        items: [
          { text: 'Collapse 折叠面板', link: '/components/Collapse' },
        ]
      },
      {
        text: 'Navigation 导航',
        items: [
          { text: 'Dropdown 下拉菜单 ', link: '/components/Dropdown' },
        ]
      },
      {
        text: 'Feedback  导航',
        items: [
          { text: 'Alert 提示', link: '/components/Alert' },
          { text: 'Message 消息提示', link: '/components/Message' },
          { text: 'Tooltip 文字提示', link: '/components/Tooltip' },
        ]
      }
    ],

    socialLinks: [
      { icon:'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
