

import type { InjectionKey } from 'vue'

export interface AlertProps {
  content?: string,//对应的内容
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info',//选择颜色
  effect?: 'light' | 'dark',//是深色还是浅色
  closable?: boolean//字体图标是否显示
}

export interface AlertProps1 {
  closable?: boolean//字体图标是否显示

}

export interface AlertEvents {
  (e: 'close'): void
}

// 组件实例
// 有行为的组件，可以考虑暴露对应的方法
export interface Instances {
  remove: () => void;
}
export interface AlertContext {
  remove: () => void;
} // 明确有属性，没问题

// 这个相当于一把钥匙，在父子通信时可以根据钥匙来获取传递的数据
export const AlertContextKey: InjectionKey<AlertContext> = Symbol('AlertContextKey')

