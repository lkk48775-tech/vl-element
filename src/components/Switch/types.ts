export type SwitchValueType = boolean | string | number;
export interface SwtichProps {
  modelValue: SwitchValueType;//这个是用于记录开关的开和关的
  disabled?: boolean;//这个是是否禁用按钮
  activeText?: string;//开启时进行的提示
  inactiveText?: string;//关闭时进行的提示
  activeValue?: SwitchValueType;//开启时的对应值
  inactiveValue?: SwitchValueType;//关闭时对应的值
  name?: string;
  id?: string;
  size?: 'small' | 'large';
}

export interface SwtichEmits {
  (e: 'update:modelValue', value: SwitchValueType) : void;
  (e: 'change', value: SwitchValueType): void;
}
