<template>
<div
  class="vk-tooltip"
  ref="popperContainerNode"
  v-on="outerEvents"
>
  <div
    class="vk-tooltip__trigger"
    ref="triggerNode"
    v-on="events"
  >
    <slot />
  </div>
  <Transition :name="transition">
    <div
      v-if="isOpen"
      class="vk-tooltip__popper"
      ref="popperNode"
    >
      <slot name="content">
        {{content}}
      </slot>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </Transition>
</div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
// 引入方法用于实现点击其他空白区域可以关闭浮层
import useClickOutside from '../../hooks/useClickOutside'
defineOptions({
  name: 'VLTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
// 浮层使用到的变量
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
//定义绑定在dom上的事件
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      }
    ],
    ...props.popperOptions
  }
})

const open = () => {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emits('visible-change', true)

}
const close = () => {
  closeTimes++
  console.log('close times', closeTimes)
  isOpen.value = false
  emits('visible-change', false)
}
// 下面这两个改进的是防止在短时间内多次重复触发
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
//这个是为了防止重复多次出发最终总会执行一次close
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
// 点击触发事件
const togglePopper = () => {
  if (isOpen.value) {//如果此时浮层是存在的,就进行关闭浮层
    closeFinal()
  } else {//此时浮层是不存在的,就进行打开浮层
    openFinal()
  }
}
// 实现点击其他空白区域可以关闭浮层,方法的调用
useClickOutside(popperContainerNode, () => {
  //  !props.manual当不是手动关闭时,再调用close函数成功
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  // 点击空白进行关闭
  if (isOpen.value) {
    emits('click-outside', true)
  }
})
// 进行判断事件的触发形式并分别进行处理
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
      //离开时只有不在触摸那个触发组件和因为触发出来的组件才会让出发出来的组件消失
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
// 一开始就让函数执行一次，这样就可以让事件绑定在dom上了
// 当不是手动手动关闭时在进行绑定
// 当没有开启手动调用时就执行一次attachEvents将事件进行绑定
if (!props.manual) {
  attachEvents()
}
// 2. 工具函数：清空响应式对象的所有属性
function clearEventMap(map: Record<string, () => void>) {
  Object.keys(map).forEach(key => {
    delete map[key];
  });
}
// 当用来判断是否启动手动模式的变量变化时,就会进入下面的watch中
watch(() => props.manual, (isManual) => {
  if (isManual) {
    // 清空用来保存方法的数组
    clearEventMap(events)
    clearEventMap(outerEvents)
  } else {
    attachEvents()
  }
})
// 修改trigger的值后，计算属性进行的操作,因为trigger是响应式数据所以需要通过函数回调的形式监测
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // ✅ 清空事件
    clearEventMap(events);
    clearEventMap(outerEvents)
    attachEvents()
  }
})
// watch第三个参数可以进行设置触发事件
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      // 当不进行显示时就将这个数据销毁
      popperInstance?.destroy()
    }
  }
}, { flush: 'post'})
// 当进行完成之后(也就相当于跳转页面等相似操作进行时),把绑定在一起的两个元素进行解绑
onUnmounted(() => {
  popperInstance?.destroy()
})
// 向外暴露的方法,也就时启用手动进行操控浮层时实用的方法
defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>
