import type { VNode } from 'vue'
// 选项属性
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
// 自定义模板函数
export type RenderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
//使用异步的，因为这个要是使用的话，就必须要用户自己定义，用户可能是使用的接口进行返回数据
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;
export interface SelectProps {
  // v-model
  modelValue: string;//v-model
  // 选项
  options?: SelectOption[];
  // 一些基本表单属性
  placeholder: string;//一些基本表单属性
  disabled: boolean;//一些基本表单属性
  clearable?: boolean;//可清空
  renderLabel?: RenderLabelFunc;//自定义菜单
  filterable?: boolean;//是否开启可筛选模式
  filterMethod?: CustomFilterFunc;//自定义存放筛选属性的数组
  remote?: boolean;//是否开启远程搜索（也就是用户自己提供的筛选）
  remoteMethod?: CustomFilterRemoteFunc;//远程搜索
}
// 这个是用于判断当前谁被选中的变量的约束
export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;//这个是用来记录移动到选项框哪个位置了
}

// 事件分析
export interface SelectEmits {
  (e:'change', value: string) : void;
  (e:'update:modelValue', value: string) : void;
  (e: 'visible-change', value:boolean): void;
  (e: 'clear'): void;
}
