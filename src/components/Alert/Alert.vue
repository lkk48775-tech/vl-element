<template>
<transition name="slide" v-on="transitionEvents">
    <div v-if="isShow" class="vk-alert" :class="{ [`vk-alert--${type}`]: type, [`is-${effect}`]: effect }">
      <div class="vk-alert__content">
        <AlertTitle :closable="closable">
          {{ content }}
        </AlertTitle>
      </div>
    </div>
</transition>
</template>
<script setup lang="ts">
import type  { AlertProps } from './types'
import {  provide, ref } from 'vue'
import { AlertContextKey } from './types'
import AlertTitle from './AlertTitle.vue';
 withDefaults(defineProps<AlertProps>(),{closable:true})
defineOptions({
  name:"VKAlert"
})
 const isShow=ref(true)
function remove(){
isShow.value=false
}
// 将数据进行存入，在父子孙等组件中只有通过对应的钥匙才能获得该数据
provide(AlertContextKey, {
remove
})

// 动画对象,(折叠板展开时的动画和折叠板关闭时的动画)
const transitionEvents = {
  // --- 进入（显示）---
  beforeEnter(el: HTMLElement) {
    el.style.opacity = '0'
  },
  enter(el: HTMLElement) {
    // 确保浏览器已应用初始状态
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease'
      el.style.opacity = '1'
    })
  },
  afterEnter(el: HTMLElement) {
    el.style.opacity = ''; el.style.transition = ''
  },

  // --- 离开（消失）---
  beforeLeave(el: HTMLElement) {
    el.style.opacity = '1'
  },
  leave(el: HTMLElement) {
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease'
      el.style.opacity = '0'
    })
  },
  afterLeave(el: HTMLElement) {
    el.style.opacity = ''; el.style.transition = ''
  }
}
defineExpose({
  remove
})
</script>

<style scoped>

</style>
