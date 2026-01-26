import { computed, defineComponent, Fragment, ref } from "vue";
import type { PropType } from 'vue'
import type { Placement, Options } from "@popperjs/core";
import type { MenuOption } from './types'
import type { TooltipInstance } from '../Tooltip/types'
// 引入Tooltip组件
import Tooltip from "../Tooltip/Tooltip.vue";

export default defineComponent({
  name: "VKDropdown",//组件名称设置
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    closeAfterClick: {
      type: Boolean,
      default: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  // 组件的返回
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)
    const itemClick = (e: MenuOption) => {
      if (e.disabled) {
        return
      }
      emit('select', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }
    const visibleChange = (e: boolean) => {
      emit('visible-change', e)
    }
    const options = computed(() => {
      return props.menuOptions.map(item => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="divided-placeholder"></li> : ''}
            <li
              class={{ 'vk-dropdown__item': true, 'is-disabled': item.disabled, 'is-divided': item.divided }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })
    return () => (
      <div
        class="vk-dropdown"
      >
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          ref={tooltipRef}
          onVisible-change={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),//先判断是否存在再决定是否调用
            content: () => (
              <ul class="vk-dropdown__menu">
                {options.value}
              </ul>
            )
          }}
        </Tooltip>
      </div>
    )
  }
})
