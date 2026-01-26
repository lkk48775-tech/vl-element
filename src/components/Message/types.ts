import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode;//对话框中的信息
  duration?: number;//对话框经过多久关闭（如果设置为0那么对话框就是不进行关闭的一直是显示出来的）
  showClose?: boolean;//是否显示关闭按钮
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info',//进行选择对话框的样式
  onDestory: () => void;
  id: string;
  zIndex: number; //值越大的元素，越“靠近用户”，会显示在值小的元素“上面”。
  offset?: number;//可以传递每个组件对应的距离
  transitionName?: string;
}
export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}
export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>
