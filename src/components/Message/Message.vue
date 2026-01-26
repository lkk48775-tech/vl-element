<template>
<Transition
  :name="transitionName"
  @after-leave="destroyComponent"
  @enter="updateHeight"
>
<div
  class="vk-message"
  v-show="visible"
  :class="{
    [`vk-message--${type}`]: type,
    'is-close': showClose
  }"
  role="alert"
  ref="messageRef"
  :style="cssStyle"
  @mouseenter="clearTimer"
  @mouseleave="startTimer"
>
  <div class="vk-message__content">
    <slot>
      <RenderVnode :vNode="message" v-if="message" />
    </slot>
  </div>
  <div class="vk-message__close" v-if="showClose">
    <Icon @click.stop="visible = false" icon="xmark"/>
  </div>
</div>
</Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import type { MessageProps } from './types'
import RenderVnode from '../Common/RenderVnode'//使用这个可以支持复杂数据渲染
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'//导入添加键盘关闭的方法
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})
// 操作组件显示隐藏的数据
const visible = ref(false)
// 定义组件实例
const messageRef = ref<HTMLDivElement>()

// 计算偏移高度
// 这个 div 的高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value)
// 样式计算
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))
//记录定时器的属性这个也就是用于鼠标放在组件上时关闭定时器
let timer: any
// 根据定时器进行判断组件的显示和隐藏
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
// 鼠标放在Message时组件不会消失，也就是把此时的定时器关闭（鼠标离开时再进行开启）
function clearTimer() {
  clearTimeout(timer)
}
// 组件挂载再dom后执行
onMounted(async () => {
  visible.value = true
  startTimer()//组件挂在完毕后就进行判断渲染时间
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
// 下面方法的回调函数
function keydown(e: Event) {
  const event = e as KeyboardEvent//进行类型断言，将类型断言为KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false//这个也就是当你按下的键盘是ESC键时会把Message组件都关闭
  }
}
// 第一个参数是添加的位置，第二个是添加的是什么时间（此处键盘按下），第三个是回调函数
useEventListener(document, 'keydown', keydown)
// 下面也就是当数据不在页面显示时就将组件移除（不在页面显示也就）
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestory()
//   }
// })
// 动画调用的方法，当动画执行完之后将这个组件从数组中删除
function destroyComponent () {
  props.onDestory()
}
// 动画上的方法一开始计算Message组件的高度
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible//用于手动删除组件（也就是让组件消失）
})
</script>
