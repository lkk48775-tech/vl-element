
# Collapse 折叠面板
通过折叠面板收纳内容区域。


## 基础用法

可同时展开多个面板，面板之间不影响


<preview path="../demo/Collapse/basics.vue" title="典型表单" description="Form 典型表单"></preview>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。


<preview path="../demo/Collapse/Accordion.vue" title="典型表单" description="Form 典型表单"></preview>

## Collapse 折叠面板

## Collapse 容器 API

### 属性
| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| model-value / v-model | 当前活动面板的 name 集合 | `Array<string | number>` | `[]` |
| accordion | 是否开启风琴模式（仅能展开一个面板） | `boolean` | `false` |

### 事件
| 事件名 | 描述 | 类型 |
|--------|------|------|
| change | 切换活动面板时触发 | `(activeNames: Array<string | number>) => void` |

### 插槽
| 插槽名 | 说明 | 子标签 |
|--------|------|--------|
| default | 折叠面板的内容区域 | `Collapse Item` |

---

## Collapse Item 面板项 API

### 属性
| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 面板唯一标识（需与 Collapse 的 model-value 匹配） | `string | number` | - |
| title | 面板头部显示的标题 | `string` | - |
| disabled | 是否禁用当前面板（禁止展开/折叠） | `boolean` | `false` |

### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 面板展开后显示的内容 |
| title | 自定义面板头部的标题内容 |