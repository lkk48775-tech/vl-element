# Message 消息提示
常用于主动操作后的反馈提示


## 基础用法
悬停在下拉菜单上以展开更多操作。
<preview path="../demo/Message/basics.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 不同状态
用来显示「成功、警告、消息、错误」类的操作反馈。设置 type 字段可以定义不同的状态，默认为 info。
<preview path="../demo/Message/disfferentStates.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 可关闭的消息提示
可以添加关闭按钮。

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 showClose 设置为 true，Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。


<preview path="../demo/Message/closable.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 单独引用
```ts
import { createMessage } from 'v3-element';
```

## Message 消息提示

### Message 配置项
使用 `createMessage` 创建信息，它接受一个 `object`，以下是 `object` 中的属性列表：

| 名称 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息文字 | `string | VNode` | - |
| type | 消息类型 | `'success' , 'info' , 'warning' , 'danger'` | `info` |
| duration | 显示时间，单位为毫秒。设为 0 则不会自动关闭 | `number` | `3000` |
| showClose | 是否显示关闭按钮 | `boolean` | `false` |
| offset | 距离上一个 Message 之间的间隔 | `number` | `20` |
| transitionName | 动画名称 | `string` | `fade-up` |


### Message 方法
调用 `createMessage` 会返回当前 `Message` 的实例。如果需要手动关闭实例，可以调用它的 `destroy` 方法。

| 名称 | 描述 | 类型 |
|------|------|------|
| destroy | 关闭当前的 Message | `() => void` |