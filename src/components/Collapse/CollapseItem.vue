<template>
  <div class="vk-collapse-item" :class="{
    'is-disabled': disabled
  }">

    <div class="vk-collapse-item__header" :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      :id="`item-header-${name}`" @click="handleClick">
      <!-- 下面得意思也就是当你使用具名插槽传递值时就会把title给覆盖掉，如果没有使用具名插槽传值那么就使用title的值-->
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" size="2xs" class="header-angle"></Icon>
    </div>

    <Transition name="slide" v-on="transitionEvents">
      <div class="vk-collapse-item__wrapper" v-show="isActive">
        <div class="vk-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
// inject后代组件共享公共数据，通过钥匙取出数据
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
// 引入钥匙获取对应钥匙的值
import { collapseContextKey } from './types'
// 引入字体图标
import Icon from '../Icon/Icon.vue'
// 给组件设置名字
defineOptions({
  name: 'VLCollapseItem'
})
const props = defineProps<CollapseItemProps>()//进行限制类型,然后获取父组件进行传递的数据
const collapseContext = inject(collapseContextKey)// 获取对应钥匙中的数据
// 下面是进行判断当前折叠面板是否是打开的（computed是计算属性）
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
// 点击进行调用父组件中的方法进行选择是将当前折叠板打开还是折叠
const handleClick = () => {
  if (props.disabled) { return }//如果当前折叠板被禁止，那么不会执行下面的方法
  collapseContext?.handleItemClick(props.name)
}
// 动画对象,(折叠板展开时的动画和折叠板关闭时的动画)
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 折叠板展开时
  // 动画初始化的函数
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  //  动画进行过程中的函数
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  //  动画结束时的函数
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
   //  折叠板关闭时
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }

}
</script>
<style scoped>
.vk-collapse-item__header .header-angle {
  font-size: 25px;
}
</style>
