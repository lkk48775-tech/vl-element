// 存放将组件挂载在dom节点上的方法
// 功能介绍：render这个是将组件挂载在dom节点上关键，h函数可以将数据放在想要的标签上并返回
import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
// 导入ZIndex的值,也就是用来计算组件在元素在 Z 轴（垂直于屏幕的方向）上的堆叠顺序。（也就是组件到用户的距离）
import useZIndex from '../../hooks/useZIndex'
let seed = 1
// 创建该数组用来存放在页面中显示的Message组件，这样就可以根据数组进行渲染组件让组件之间存在空隙，而不是一个压着一个
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  // 当调用的组件时间到了之后会自动隐藏，这个方法是将隐藏后的组件进行移除
  const container = document.createElement('div')
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)//存在的话就进行删除
    //将组件移除
    render(null, container)
  }
  // 手动调用删除，其实就是手动的调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestroy = () => {
    // 查看手动关闭的组件是否存放在数组中(此处的id就是创建这个组件时分配的id值)
    const instance = instances.find(instance => instance.id === id)
    //  如果在的话就进行手动关闭
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),//这个是随着调用逐级递增的，目的就是为了让后一个比前一个更靠近用户
    onDestory: destory
  }
  // 创建组件，并将传递的props挂载在组件上
  const vnode = h(MessageConstructor, newProps)
  //将创建好的组件挂载在创建好的div标签的DOM上
  render(vnode, container)
  //非空断言操作符 //将div标签渲染在body上
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  // 将每个组件的信息进行总和，然后存放在数组中
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestroy//外部通过调用这个方法来实现组件的隐藏和在数组中删除组件的存放
  }
  // 存放进数组
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}
// 返回距离上个组件的距离
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  console.log('idx', id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach(instance => {
    instance.destory()
  })
}
