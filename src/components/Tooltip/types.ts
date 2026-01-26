// 引入放入位置的参数
import type { Placement, Options } from '@popperjs/core'
// 进行配置约束（也就是调用该组件时可以进行传递的值）
export interface TooltipProps {
  content?: string;//里面的内容
  trigger?: 'hover' | 'click';//触发得方式
  placement?: Placement; //放置得位置
  manual?: boolean;//是否启用手动关闭(也就是开启之后点击空白区域不能进行关闭)
  popperOptions?: Partial<Options>; //将必选变成可选
  transition?: string;//选择动画的形式
  openDelay?: number;//打开浮层时进行的延时
  closeDelay?: number;//关闭浮层时的延时
}
// 配置事件
export interface TooltipEmits {
  // 决定显示隐藏的方法
  (e: 'visible-change', value: boolean) : void;
  (e: 'click-outside', value: boolean) : void;
}
// 关于手动打开和关闭浮层的两个方法
export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}
