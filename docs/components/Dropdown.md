# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法
悬停在下拉菜单上以展开更多操作。
<preview path="../demo/Dropdown/basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 触发方式
将 `trigger` 属性设置为 `click`即可， 默认为`hover`。
<preview path="../demo/Dropdown/mode.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 手动打开关闭
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。
<preview path="../demo/Dropdown/manual.vue" title="基础用法" description="Button 组件的基础用法"></preview>

# API

## Dropdown 下拉菜单



### 属性（修正后）
| 属性名 | 说明 | 类型 | 默认值 |
|--------|--------|-------------------------------------------------------------------------|--------|
| menuOptions | 菜单选项 | `MenuOption[]` | - |
| placement | Tooltip组件出现的位置 | `enum`- ` top , top-start , top-end , bottom , bottom-start , bottom-end , left left-start , left-end , right , right-start , right-end ` | bottom |
| transition | 动画名称 | `string` | `fade` |
| popper-options | popper.js 参数 | `object`请参考 `popper.js` 文档 | `{}` |
| trigger | 如何触发Tooltip | `'hover' , 'click'` | `hover` |
| open-delay | 触发后多久显示内容，单位毫秒 | `number` | `50` |
| close-delay | 延迟关闭，单位毫秒 | `number` | `50` |
| manual | 是否开启手动触发模式 | `boolean` | `false` |
| hideAfterClick | 是否在点击菜单项后隐藏菜单 | `boolean` | `true` |



### 事件
| 事件名 | 描述 | 类型 |
|--------|------|------|
| visible-change | 下拉框出现/隐藏时触发 | `(value: boolean) => void` |
| select | 点击菜单项触发的事件回调 | `(value: MenuOption) => void` |


### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | Dropdown 触发 & 引用的元素 |
| content | 自定义内容 |


### 实例
| 名称 | 说明 | 类型 |
|------|------|------|
| show | 打开下拉菜单 | `() => void` |
| hide | 关闭下拉菜单 | `() => void` |