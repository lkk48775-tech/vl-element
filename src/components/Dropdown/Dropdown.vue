<template>
  <div class="vk-dropdown" >
  <Tooltip
    :trigger="trigger"
    :placement="placement"
    :popper-options="popperOptions"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :manual="manual"
    @visible-change="visibleChange"
    ref="tooltipRef"
  >
      <slot></slot>
    <template #content>
      <ul class="vk-dropdown__menu">
        <template v-for="item in menuOptions" :key="item.key">
            <!-- 下面这个li是进行渲染分割符的，当你选择有分割符时才会进行渲染下面得li -->
          <li
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          />
            <!--这个li才是进行渲染数据的  -->
          <li
            class="vk-dropdown__item"
            @click="itemClick(item)"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
          >
            <RenderVnode :vNode="item.label"/>
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'//导入ref得类型得泛型约束
// 引入解决传入复杂类型不能渲染到预期得函数
import RenderVnode from '../Common/RenderVnode'
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types'
// 本组件就是基于Tooltip组件进行的二次开发，所以在此处引入Tooltip组件
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'

// 重新命名组件
defineOptions({
  name: "VKDropdown"
})
//对组件可以接收的类型进行约束
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()//对组件可以发射的事件进行约束

// 向父组件发送信息，父组件接收信息值后进行改变一些数据
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

// 点击对应的li触发不同的事件
const itemClick = (e: MenuOption) => {
  if (e.disabled) {//这个得意思也就时当点的是禁用得li时就不进行操作
    return
  }
  emits('select', e)
  // 点击后进行判断是否开启点击下拉框中的选项关闭下拉框
  if (props.hideAfterClick) {
    tooltipRef.value.hide()
  }
}

// 创建tooltip组件得实例  as Ref<TooltipInstance>的作用是ref 将来会指向一个 TooltipInstance 类型的对象，请按这个类型来检查
const tooltipRef = ref() as Ref<TooltipInstance>

// 向外暴露方法（其实本质上暴露的是Tooltip组件内部的方法）
defineExpose<DropdownInstance>({
  show() {
    tooltipRef.value?.show?.(); // ✅ 直接调用
  },
  hide() {
    tooltipRef.value?.hide?.(); // ✅ 直接调用
  }
})
</script>

