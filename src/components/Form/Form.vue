<template>
  <form class="vk-form">
    <slot/>
  </form>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import type {  ValidateFieldsError } from 'async-validator'
import type { FormProps, FormItemContext, FormContext, FormValidateFailure, FormInstance } from './types'
import { formContextKey } from './types'
const props = defineProps<FormProps>()
defineOptions({
  name: 'VLForm'
})

const fields: FormItemContext[] = []
// 添加子组件对应的验证方法的方法
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
// 删除子组件对应的验证方法的方法
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}
// 如果不传递值得话就是恢复所有的数据为最初状态，传递值得话就是恢复对应值得最终状态
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.resetField())
}
// 如果不传递值得话就是去除所有的报错，传递值得话就是去除对应值的报错
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.clearValidate())
}
const validate = async () => {
  let validationErrors:ValidateFieldsError = {}
  // console.log('fields', fields)
  for (const field of fields) {
    try {
      await field.validate('')//传入空字符串意思就是必须进行验证
    } catch(e) {
      const error = e as FormValidateFailure
      // 将错误进行填充进去
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) return true//如果没有错误就直接返回true
  return Promise.reject(validationErrors)//如果存在错误就通过Promise进行返回
}
// 将数据进行存入，设置上特定的钥匙key，在其他组件只有通过特定的钥匙key才能拿到值
provide(formContextKey, {
  ...props,
  addField,
  removeField
})
// 向外暴露方法
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate
})
</script>
