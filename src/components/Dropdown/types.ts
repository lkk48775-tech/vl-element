import type { VNode } from "vue"
// 这个组件是在Tooltip组件上进行二次开发的，在此处引入Tooltip组件上的泛型约束
import type { TooltipProps } from '../Tooltip/types'

// 使用该组件时数据类型的约束，先让他继承来自Tooltip组件的泛型约束，然后在加上自己独有的泛型约束
export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[],
  hideAfterClick?: boolean,//用来判断点击下拉框里的选项时关闭下拉框(默认为true)
}

// 每个下拉展示内容的约束
export interface MenuOption {
  label: string | VNode,//这个也就时下拉菜单上面展示的内容
  key: string | number,//独一无二的MenuOption的对应符
  //可以进行选择是否禁用,当下拉框中的选项开启这个后，开启hideAfterClick点击该选项也不会关闭下拉框
  disabled?: boolean,
  divided?: boolean,//这个是分隔符
}


// 使用该组件时事件的约束
export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void,
  (e: 'select', value: MenuOption): void
}

// 向外暴露的方法
export interface DropdownInstance {
  show: () => void,
  hide: () => void
}
