<template>
<div
  class="vk-input"
  :class="{
    [`vk-input--${type}`]: type,
    [`vk-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocus
  }"
>
  <!-- input -->
  <template v-if="type !== 'textarea'">
      <!-- $slots这个是用于记录用户使用插槽时传入的插槽内容 -->
    <!-- prepend slot -->
    <div v-if="$slots.prepend" class="vk-input__prepend">
      <slot name="prepend" />
    </div>
    <div class="vk-input__wrapper">
      <!-- prefix slot -->
      <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
      </span>
        <!-- type用于描述表单类型，disabled是用于描述表单是否禁用 -->
      <input
        class="vk-input__inner"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        ref="inputRef"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <!-- suffix slot -->
      <span v-if="$slots.suffix || showClear || showPasswordArea" class="vk-input__suffix" @click="keepFocus">
          <slot name="suffix"></slot>
          <!-- 清空按钮图标 -->
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="vk-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
      </span>
    </div>
    <!-- append slot -->
    <div v-if="$slots.append" class="vk-input__append">
      <slot name="append" />
    </div>
  </template>
  <!-- textarea -->
  <template v-else>
    <textarea
      class="vk-textarea__wrapper"
      v-bind="attrs"
      ref="inputRef"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :form="form"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </template>
</div>
</template>
<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick, inject } from 'vue'
import type { Ref } from 'vue'
import type { InputProps, InputEmits } from './types'
import Icon from '../Icon/Icon.vue'
import { formItemContextKey} from '../Form/types'

defineOptions({
  name: 'VLInput',
  // 禁止 Vue 自动把父组件传递的、未被组件 props 声明的属性（比如 id/ class/ placeholder 等）挂载到组件的根元素上。
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()//获得父组件传递给子组件的、未被 props 声明的所有属性 / 事件
const innerValue = ref(props.modelValue)// 响应式数据记录表单的值
const isFocus = ref(false)//用户是否选用清空图标
const passwordVisible = ref(false)//用于判断是显示密码图标还是不显示密码的图标
const inputRef = ref() as Ref<HTMLInputElement>
const formItemContext = inject(formItemContextKey,null)//通过钥匙拿到对应的方法(也就是验证方法)
// 根据传递的trigger不同进行选择进行什么样的验证
// （ 如果传递的是rules则在每次表单失去焦点时调用这个方法）
const runValidation = (trigger?: string) => {
  // 调用验证方法
  formItemContext?.validate(trigger).catch((e) => console.log(e.errors))
}
// !!是把数据转化为boolean值
// 这个返回的数据用于判断清空图标是否渲染
const showClear = computed(() =>
  props.clearable &&
  !props.disabled &&
  !!innerValue.value &&
  isFocus.value
)
//控制选择密码显示隐藏的图标的显示隐藏
const showPasswordArea = computed(() =>
  props.showPassword &&
  !props.disabled &&
  !!innerValue.value
)
// 用于切换显示密码或者隐藏密码的图标
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const NOOP = () => {}
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  // 进行规则验证（但是在这个条件下验不验证还要看用户传递的是什么时候验证，也就是在下面方法中进行判断）
  runValidation('input')
}
const handleChange = () => {
  emits('change', innerValue.value)
  // 进行规则验证（但是在这个条件下验不验证还要看用户传递的是什么时候验证，也就是在下面方法中进行判断）
  runValidation('change')
}
// 用于操控选择清空的图标的显示与隐藏的方法
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
// 组件失去焦点调用的方法
const handleBlur = (event: FocusEvent) => {
  console.log('blur triggered')
  isFocus.value = false
  emits('blur', event)
  // 进行规则验证（但是在这个条件下验不验证还要看用户传递的是什么时候验证，也就是在下面方法中进行判断）
  runValidation('blur')
}
// 点击清空图标然后将表单中的数据清空的方法
const clear = () => {
  // console.log('clear triggered')
  innerValue.value = ''
  // 发送事件进行通知父组件这个值进行改变了，让父组件也进行相应的改变
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}
// 在外部更新表单，使用watch进行监测，外部变了，内部的值也会跟着变
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
defineExpose({
  // 把对应的dom节点暴露出去
  ref: inputRef
})
</script>
