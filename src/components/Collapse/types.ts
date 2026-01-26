import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[],
  accordion?: boolean//是否开启手风琴模式
}
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

export interface CollapseEmits {
  (e:'update:modelValue', values: NameType[]) : void;
  (e:'change', values: NameType[]) : void;
}
// 这个相当于一把钥匙，在父子通信时可以根据钥匙来获取传递的数据
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
