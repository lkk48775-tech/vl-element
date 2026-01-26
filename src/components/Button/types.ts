import type { PropType } from 'vue'
// Button的样式
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// Button的大小
export type ButtonSize = 'large' | 'small'

// 添加button自带的属性
export type NativeType = 'button' | 'submit' | 'reset'
// 接口
export interface ButtonProps {
  //使用?设置成可选选项
  type?: ButtonType,//按钮样式
  size?: ButtonSize,//按钮大小
  plain?: boolean,//按钮模式
  round?: boolean,//按钮是否进行圆角
  circle?: boolean,//是否设置成圆形按钮
  disabled?: boolean,//是否禁用按钮
  nativeType?: NativeType,//这个button本身自带的type属性
  autofocus?: boolean,
  icon?: string,
  loading?: boolean,
}

// 这个和上边作用一样
// export const buttonProps={
//   type:{
//     type: String as PropType<ButtonType>
//   },
//   size:{
//     type: String as PropType<ButtonSize>
//   },
//   plain:{
//     type: Boolean
//   },
//   round:{
//     type: Boolean
//   },
//   circle:{
//     type: Boolean
//   },
//   disabled:{
//     type: Boolean
//   },

// }

// 进行定义接口,让里面有一个元素是ref类型为HTMLButtonElement
export interface ButtonInstance {
  ref: HTMLButtonElement
}
