<template>
  <span class="el-alert__title">
    <slot></slot>
  </span>
  <Icon @click="removeClick" size="sm" v-if="closable"   class="vk-alert__close-btn" icon="xmark" ></Icon>
</template>
<script setup lang="ts">
  import type { AlertProps1 } from './types'
  // inject后代组件共享公共数据，通过钥匙取出数据
import { inject } from 'vue'
  // 引入钥匙
  import { AlertContextKey } from './types'
  import Icon from '../Icon/Icon.vue'
  defineOptions({
  name: "VLAlertTitle"
})
const props=defineProps<AlertProps1>()
const AlertContext = inject(AlertContextKey)// 获取对应钥匙中的数据
function removeClick(){
  if(props.closable){
    AlertContext?.remove()
    console.log(21);
  }
}
</script>
