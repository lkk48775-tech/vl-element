import { defineComponent } from 'vue'
// 向外暴露一个组件可以解决复杂数据的渲染
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})

export default RenderVnode
