<template>
  <div
    class="vk-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <label class="vk-form-item__label">
      <slot name="label" :label="label">
        {{label}}
      </slot>
    </label>
    <div class="vk-form-item__content">
      <slot :validate="validate"/>
      <div class="vk-form-item__error-msg" v-if="validateStatus.state === 'error'">
        {{validateStatus.errorMsg}}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, computed, reactive, provide, onMounted, onUnmounted } from 'vue'
import Schema from 'async-validator'
import { isNil } from 'lodash-es'
import { formContextKey, formItemContextKey } from './types'
import type { FormItemProps, FormValidateFailure, FormItemContext, ValidateStatusProp, FormItemInstance } from './types'
defineOptions({
  name: 'VkFormItem'
})
const props = defineProps<FormItemProps>()


//验证的状态
const validateStatus: ValidateStatusProp = reactive({
  state: 'init',//此时的状态,比如初始状态init,验证成功的状态success,验证失败的状态error
  errorMsg: '',//错误信息
  loading: false,//loading的状态
})
let initialValue: any = null
// 取出model对应的值(存入的数据)
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})
// 取出rules对应的值(对应数据的验证规则)
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})
// 按照传递的trigger进行返回需要不需要验证
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value
  // 先进行判断存不存在验证规则
  if (rules) {
    // 进行筛选处理
    return rules.filter(rule => {
      // 假如rule上面没有对应的trigger或者trigger没有传（那么这个规则是必须要进行验证的）
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}
// 用来判断是不是必选项
const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})
// 进行验证的方法
const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  // 如果返回的是数组且数组长度为0，那么就是不用进行验证（也就是验证直接通过）
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    // 拿到拥有验证规则实例化对象(后面可以拿着这个规则去跟对应的值进行验证)
    const validator = new Schema({
      // 拿到对应的规则给规则,冒号前面的数据是给规则进行命名
      [modelName]: triggeredRules
    })
    // 开始验证时将loading值设为ture
    validateStatus.loading = true
    // 拿着对应的值和规则进行验证
    return validator.validate({ [modelName]: innerValue.value })
      .then(() => {
        // 验证成功将对应的状态改为success
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
        console.log(e.errors)
        return Promise.reject(e)//返回错误信息
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}
// 清除验证的错误出现的信息
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}
// 验证错误表单中的数据恢复最初的值
const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}
// 定义一个对象里面放的有用来定义的方法
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}
// 将对应的验证方法存进去,方便其他组件使用时使用对应的钥匙取出
provide(formItemContextKey, context)

// 根据对应的钥匙取出存入的对应的数据
const formContext = inject(formContextKey)

onMounted(() => {
  // 将本组件的验证规则的方法添加到父组件的数组中，方便进行全体验证
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})
onUnmounted(() => {
  formContext?.removeField(context)
})
// 向外暴露方法和数据
defineExpose<FormItemInstance>({
  validateStatus,//向外暴露验证的状态
  validate,//单个表单验证时这个方法直接在input组件上进行了添加
  resetField,//验证出现错误后可以调用这个方法把数据恢复最初
  clearValidate//这个是清除验证的错误信息
})
</script>
