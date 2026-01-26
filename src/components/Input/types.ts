export interface InputProps {
  type?: string,//控制 input 的类型
  modelValue: string,
  size?: 'large' | 'small',//控制 input 组件的尺寸
  disabled?: boolean,//是否禁用 input：
  clearable?: boolean,//是否显示 “清空按钮”
  showPassword?: boolean,//是否显示 “密码可见切换按钮”
  placeholder?: string,//输入框为空时显示的提示文字
  readonly?: boolean,//区别于禁用态（只读可复制，禁用不可），适配 “查看不可改” 的场景
  autocomplete?: string,//控制浏览器自动补全
  autofocus?: boolean,//组件挂载后是否自动获取焦点
  form?: string,//关联指定 id 的 <form> 表单（即使 input 不在 form 内）
}

// 事件
export interface InputEmits {
  (e: 'update:modelValue', value: string): void,//用于支持v-model
  (e: 'input', value: string): void,//input 的input事件指得是值有变化就算
  (e: 'change', value: string): void,//input 的change事件指的是修改了值，并失去了focus(也就是失去了聚焦)
  (e: 'focus', value: FocusEvent): void,
  (e: 'blur', value: FocusEvent): void,
  (e: 'clear'): void,//这个是自定义的清空按钮的事件
}

// 定义导出数据的类型
export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement;
}
