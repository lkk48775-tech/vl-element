<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
// provide后代组件共享公共数据 ，通过钥匙来进行存入数据
import { ref, provide, watch } from 'vue'
// 引入类型限制
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
// 给组件进行命名
defineOptions({
  name: "VLCollapes"
})

const props = defineProps<CollapseProps>()
// 子组件：defineEmits 声明事件 + emits() 触发事件（发数据）→ 负责 “发消息”, 向父组件触发事件、传递数据
const emits = defineEmits<CollapseEmits>()

// 记录打开的折叠面板,props.modelValue这个是父组件传递的一开始要进行打开的折叠板
const activeNames = ref<NameType[]>(props.modelValue)
// 解决异步操作造成折叠板赋值错误问题
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})
// 如果开启手风琴且展开的折叠板数量大于1那么就会报错,这个判断只在代码刚运行进行判断一次
if (props.accordion && activeNames.value.length > 1) {
  console.warn(1);
}

// 进行插入或者删除打开的折叠面板
const handleItemClick = (item: NameType) => {
  // 进行是否是手风琴模式判断
  if (props.accordion) {    // 是的话进行的操作
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {//不是的话进行的操作
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 如果存在，就进行删除，删除数组中对应的一项
      activeNames.value.splice(index, 1)
    } else {
      // 如果不存在，就进行插入
      activeNames.value.push(item)
    }
  }

  // 向父组件中触发数据
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

// 将数据进行存入，在父子孙等组件中只有通过对应的钥匙才能获得该数据
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
