<script setup lang="ts">
import { ref, onMounted, h, inject } from 'vue'

// 引入子组件
import Button from './components/Button/Button.vue'
import Collapes from './components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import { createMessage } from './components/Message/method'//引入可以创建Message组件的方法
// 引入约束
import type { ButtonInstance } from './components/Button/types'
import type { Instances } from './components/Alert/types'// 这个是Alert中的types中引入的约束
// import type { Options } from '@popperjs/core'
// 这个是导入的Tooltip组件向外暴露的方法的约束
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'

// 进行限制buttonRef.value中的数据类型只能是ButtonInstance或者null
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)//用来绑定Tooltip组件的
const openedValue = ref(['a'])//这个是折叠板使用的变量
// 这个是组件Dropdown组件传递得下拉菜单的数据
const options: MenuOption[] = [
  { key: 1, label: h('h1', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
]
// 这个是浮层的测试数据
const trigger = ref<any>('hover')

// 当浮层开启manui模式时,就会向外暴露两个方法,此时可以将两个方法接过来
const open = () => {//开启浮层
  tooltipRef.value?.show()
}
const close = () => {//关闭浮层
  tooltipRef.value?.hide()
}

const inlineConsole = (...args: any) => {
  // console.log(...args);
}

console.log(inject('test'));

onMounted(() => {

  const instance = createMessage({ message: "hello lsy1", duration: 0, showClose: true, type: 'success' })
  createMessage({ message: "hello lsy2", duration: 2000, showClose: true, type: 'danger' })
  createMessage({ message: "hello lsy3", duration: 0, showClose: true, type: 'info' })
  createMessage({ message: "hello lsy4", duration: 0, showClose: true, type: "primary" })
  createMessage({ message: "hello lsy4", duration: 0, showClose: true, type: 'warning' })

  setTimeout(() => {
    instance.destory()
  }, 2000);
  // 输出按钮的属性
  if (buttonRef.value) {
    // console.log(buttonRef.value?.ref);
  }
})

// 这个是Alert使用的变量，进行手动调用remove方法（也就时让Alert进行隐藏）
const a = ref<null | Instances>()
setTimeout(() => {
  a.value?.remove()
  trigger.value = 'click'
}, 2000);
</script>

<template>
  <Dropdown @select="e => inlineConsole('select', e)" @visible-change="e => inlineConsole('visible change', e)"
    placement="bottom" :trigger="trigger" :menu-options="options" manual ref="tooltipRef">
    <img src="./assets/logo.svg" alt="vue logo" class="logo" width="125" height="125">
    <template #content>
      <h1>hello Tooltip</h1>
    </template>
  </Dropdown>
  <!-- Tooltip浮层组件得演示 -->
  <Tooltip content="hello world" placement="right" :trigger="trigger" :open-delay="1000" :close-delay="1000">
    <img src="./assets/logo.svg" alt="vue logo" class="logo" width="125" height="125">
    <template #content>
      <h1>hello Tooltip</h1>
    </template>
  </Tooltip>
  <Tooltip content="hello world" placement="right-start" trigger="hover">
    <img src="./assets/logo.svg" alt="vue logo" class="logo" width="125" height="125">
    <template #content>
      <h1>hello Tooltip</h1>
    </template>
  </Tooltip>
  <Button @click="open()" ref="buttonRef">开启浮层</Button>
  <Button @click="close()" plain>关闭浮层</Button><br>
  <!-- 图标演示 -->
  <Icon size="xl" class="vk-alert__close-btn" icon="arrow-up"></Icon>


  <!-- Button按钮演示 -->
  <main>
    <v-button ref="buttonRef">v-button</v-button>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br /><br />

    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />

    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />

    <Button size="large" loading>Large</Button>
    <Button size="large" icon="arrow-up">Small</Button><br /><br />

  </main>
  <!-- 折叠板演示 -->
  <Collapes v-model="openedValue" accordion>
    <Item name="a">
      <!-- 具名插槽里面的值放在具有name="title"的标签里面 -->
      <template #title>
        <h1>nice title</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </Item>
    <Item name="b" title="nice title b item b">
      <div>this is bbb test</div>
    </Item>
    <Item name="c" title="nice title cccc" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapes>

  <!-- Alert演示 -->
  <div style="max-width: 600px">

    <Alert content="aaaSSS" type="primary" :closable="false"></Alert>
    <Alert ref="a" content="aaaSSS" type="success"></Alert>
    <Alert content="aaaSSS" type="info"></Alert>
    <Alert content="aaaSSS" type="danger"></Alert>
    <Alert content="aaaSSS" type="primary" effect="dark"></Alert>
    <Alert content="aaaSSS" type="success" effect="dark"></Alert>
    <Alert content="aaaSSS" type="info" effect="dark"></Alert>
    <Alert content="aaaSSS" type="danger" effect="dark"></Alert>
  </div>


</template>

<style scoped></style>
