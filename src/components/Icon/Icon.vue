<template>
  <!-- 此处的style就是传递的color值，当使用color值时就会改变icon颜色，因为本质上我们引用的别人的图标库，别人的图标库使用color属性就可以改变图标颜色 -->
  <i class="vk-icon" :class="{[`vk-icon--${type}`] : type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps"/>
  </i>
</template>
<script setup lang="ts">
import { computed } from 'vue';
// 引入过滤使用的方法
import { omit } from 'lodash-es';
// 引入类型约束
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 从自定义的ts文件总引入类型约束
import type { IconProps } from '@/components/Icon/types'

defineOptions({
  name: 'VLIcon',
  inheritAttrs: false//设置成不可透传（也就时父组件传递的数据不挂载在根元素上）
})
// 约束从父组件传递过来的数据
const props = defineProps<IconProps>()
  // 然后就是将这个里面的数据全部挂载在<font-awesome-icon>标签上
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  // 判断从父元素中是否传递的由color，如果有就返回包含父元素传递的color的对象，没有的话就返回空对象
  return props.color ? { color: props.color } : {}
})
</script>

