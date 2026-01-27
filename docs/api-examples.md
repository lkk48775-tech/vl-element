# 快速上手

:::tip 提示
vl-element 基于 Vue3 + Ts 仿照 Element Plus 开发的组件库，仅供学习
:::

## 安装

```bush
npm install vl-element
```

## 使用
### 全局使用
```ts
// main.ts
// 引入所有组件
import VLElement from 'vl-element'
// 引入样式
import 'vl-element/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(VLElement).mount('#app')
```

```ts
<template>
  <VLButton type="primary">我是 VLButton</VLButton>
</template>
```

## 按需导入
```ts
// main.ts
// 引入样式
import 'vl-element/dist/index.css'
```
```ts
<template>
  <VLButton type="primary">我是 VLButton</VLButton>
</template>

<script setup lang="ts">
import { VLButton } from 'vl-element'
</script>
```
## Git 提交规范（PR提交规范）

- `ci` : ci配置文件和脚本的变动;
- `chore` : 构建系统或辅助工具的变动;
- `fix` : 代码 BUG 修复;
- `feat` : 新功能;
- `perf` : 性能优化和提升;
- `refactor` : 仅仅是代码变动, 既不是修复 BUG 也不是引入新功能;
- `style` : 代码格式调整, 可能是空格、分号、缩进等等;
- `docs` : 文档变动;
- `test` : 补充缺失的测试用例或者修正现有的测试用例;
- `revert` : 回滚操作;