<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <!-- spin属性可以让对应的图标旋转起来 -->
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 此处导入的是上方代码的类型约束，所以需要加上type
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'
//重新定义组件的名字

defineOptions({
  name: 'VLButton'
})


// 设置由父组件穿过来的元素的类型
// defineProps<ButtonProps>()
// 给由父组件进行传递的值设置默认值(也就是没传的时候按这个默认值来运行),这个也就是设置NativeType的默认值为button
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

// 这一步就是把button的DOM向外暴露
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<style scoped>

</style>
