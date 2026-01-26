import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
export interface FormItemProps {
  label: string;
  prop?: string;//定义的FormItem的类型
}
// 扩展于上面的RuleItem，比他多了一个trigger，用于控制什么时候开始验证规则
export interface FormItemRule extends RuleItem {
  trigger?: string;
}
export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}
// 添加删除子组件的验证规则方法的方法
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}
export interface ValidateStatusProp {
  state: 'init' |  'success' | 'error';
  errorMsg: string;
  loading: boolean;
}
// 用于验证的方法的约束
export interface FormItemContext {
  prop: string,
  validate: (trigger?: string) => Promise<any>,//单个表单验证时这个方法直接在input组件上进行了添加
  resetField(): void,//验证出现错误后可以调用这个方法把数据恢复最初
  clearValidate(): void,//这个是清除验证的错误信息
}
// 导出错误信息的类型约束
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}
// Form组件向外暴露方法的约束
export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void;
  clearValidate: (props?: string[]) => void;
}
// FormItem组件向外暴露的方法约束
export interface FormItemInstance {
  validateStatus: ValidateStatusProp,//向外暴露验证的状态
  validate: (trigger?: string) => Promise<any>,//单个表单验证时这个方法直接在input组件上进行了添加
  resetField(): void,//验证出现错误后可以调用这个方法把数据恢复最初
  clearValidate(): void,//这个是清除验证的错误信息

}
// 这个用于form给formitem进行传递数据
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
// 这个用于formitem的方法给form使用
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
