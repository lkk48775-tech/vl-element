<template>
<div
  class="vk-select"
  :class="{'is-disabled': disabled }"
  @click="toggleDropdown"
  @mouseenter="states.mouseHover = true"
  @mouseleave="states.mouseHover = false"
>
  <Tooltip
    placement="bottom-start"
    ref="tooltipRef"
    :popperOptions="popperOptions"
    @click-outside="controlDropdown(false)"
    manual
  >
      <!-- 下面得readonly是进行判断什么时候表单可以进行输入什么时候不可以进行输入 -->
    <Input
      v-model="states.inputValue"
      :disabled="disabled"
      :placeholder="filteredPlaceholder"
      ref="inputRef"
      :readonly="!filterable || !isDropdownShow"
      @input="debouceOnFilter"
      @keydown="handleKeydown"
    >
      <template #suffix>
        <Icon
          icon="circle-xmark"
          v-if="showClearIcon"
          class="vk-input__clear"
          @mousedown.prevent="NOOP"
          @click.stop="onClear"
        />

        <Icon
          v-else
          icon="angle-down"
          class="header-angle"
          :class="{ 'is-active': isDropdownShow }"
        />
      </template>
    </Input>
    <template #content>
        <!-- 这个就是在进行远程筛选时，数据没有返回得时候进行展示这个图标 -->
      <div class="vk-select__loading" v-if="states.loading"><Icon icon="spinner" spin/></div>
        <!-- 这个就是在进行远程筛选时，数据返回的是空时的展示 -->
      <div class="vk-select__nodata" v-else-if="filterable && filteredOptions.length === 0">no matching data</div>
      <ul class="vk-select__menu" v-else>
        <template v-for="(item, index) in filteredOptions" :key="index">
          <li
            class="vk-select__menu-item"
            :class="{
              'is-disabled': item.disabled,
              'is-selected': states.selectedOption?.value === item.value ,
              'is-highlighted': states.highlightIndex === index
            }"
            :id="`select-item-${item.value}`"
            @click.stop="itemSelect(item)"
          >
            <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label"/>
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
</div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'//用于判断对应得值是不是函数
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'//手动关闭和开启Tooltip的方法约束
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
// 引入封装好的组件，完成及渲染文本，又渲染复杂的类型
import RenderVnode from '../Common/RenderVnode'
// 导入Input表单的实例的泛型约束
import type { InputInstance } from '../Input/types'
// 用来查找点击的值
const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value)
  // 查找到就进行返回没找到就返回null
  return option ? option : null
}
defineOptions({
  name: 'VLSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  // 因为将这个属性设置成了可选选项，然后为了防止下面使用这个属性报错，所以提前进行设计了一个默认值
  options: () => []
})
// 使用于防抖,也就是间隔多长事件再开启下一次请求
const timeout = computed(() => props.remote ? 300 : 0)
const emits = defineEmits<SelectEmits>()
let initialOption = findOption(props.modelValue)
//下面就是为了实现当外部传递的props.modelValue改变时,initialOption也会进行改变
watch(() => props.modelValue, (newVluae) => {
  if (initialOption) {
    initialOption.value = newVluae
  } else {
    initialOption = findOption(newVluae)
  }

})
const tooltipRef = ref() as Ref<TooltipInstance>//创建的Tooltip实例
const inputRef = ref() as Ref<InputInstance>
  // 用于记录当前被选中的值
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',//Input表单上的v-model
  selectedOption: initialOption,//记录当前选中的对象
  mouseHover: false,//用于记录鼠标是否移入组件标签
  loading: false,//这个也就是远程搜索没有返回值时得动态loading
  highlightIndex: -1//在刚开始时没有进行移动,所以用-1来记录
})
const isDropdownShow = ref(false)//用来控制DropdownShow是否打开
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}
const filteredOptions = ref(props.options)
//下面就是为了实现当外部传递的props.options改变时,filteredOptions也会进行改变
watch(() => props.options, (newOptions) => {
  filteredOptions.value = newOptions
})
// 生成新的选项
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return//如果没有开启可筛选属性就直接return
  //  判断是否存在自定义存放筛选属性得数组,并且判断是否是函数
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  }//  下面这个远程搜索的方法是用户必须传入的否则是无法执行成功的
  else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {//这个是进行判断选择是不是远程搜索
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter(option => option.label.includes(searchValue))
  }
  //  这个就是为了在用户输入一次值进行上下移动后,又进行了输入然后会发现再次出来的新值,上下移动出现的高亮还在原来的位置只不过是值变了, 这样用户体验不好,所以下面的代码就是进行每一次出现新值都进行重置上下移动高亮的位置
  states.highlightIndex = -1

}
// 下面方法是在input表单上的值变化时进行调用得
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
// 创建一个onFilter的debouce版本,也就是防抖版
const debouceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)
// input表单在不进行选择属性时得默认值判断
// （这个就是为了在使用筛选选项框时，选择后点击表单然后表单属性清空了，然后再选择期间让你的默认值展示得是你没有清空前得属性）
const filteredPlaceholder = computed(() => {
  return (props.filterable && states.selectedOption && isDropdownShow.value)
  ? states.selectedOption.label : props.placeholder
})
// 处理Tooltip是否打开的方法
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter 模式
    // 之前选择过对应的值
    // 进行判断是不是filterable模式，并且以前选择过选项,如果是就将此时表单得数据清空展示默认值（虽然默认值还是这个值，但是这样更美观）
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      // 每次开启Tooltip组件显示时，都先进行一次根据当前input表单的属性进行一次筛选，防止数据渲染不正确
      // (这个也就是为了防止在使用筛选选项时因为选择过属性，下次点击显示出来的不是全部属性)
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()//调用方法使组件tooltip显示
  } else {
    tooltipRef.value.hide()
    // 这步就是为了防止在filterable模式下点击之后没有进行选择，然后失去焦点就会使用input表单变成了默认模式，而加上下面这步就可以让以前选择得值继续渲染
    // blur之后将之前的值回灌到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show//根据show值不同进行打开或者关闭组件
  emits('visible-change', show)//发送事件
}
// 用于处理在焦点放在该组件上(input组件)时,使用一些键盘按键进行一些操作
const handleKeydown = (e: KeyboardEvent) => {
  // 这个时按下回车进行打开或者关闭下拉框
  switch (e.key) {
    case 'Enter':
      // 这个也就是当前下拉框没有打开时,那么此时就进行打开
      if (!isDropdownShow.value) {
        controlDropdown(true)
      }//下面是当前下拉框打开时进行的操作
      else {
        // 这步就是判断当前是否使用键盘上下键进行选择,如果进行了选择且当前选择的值存在,那么就进行将当前的值选中
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        }//下面的也就是没有进行选择或者选择的值不存在,点击这个按钮时就将下拉框关闭
         else {
          controlDropdown(false)
        }
      }
      break

      // 这个是通过Esc键进行控制关闭下拉框(下拉框打开时才会真正的执行里面的函数)
    case 'Escape':
      // 这里只有下拉框是打开的时候才会进行调用
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
      // 这个是按下向上移动的键盘时触发的
    case 'ArrowUp':
      e.preventDefault()//阻止默认行为(也就是防止界面也跟着上下移动)
      // 这步是用于判断当前是否有数据(也就是为了防止后面的操作没有意义)
      if (filteredOptions.value.length > 0) {
        // 如果是初始状态时,进行下面的操作
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1
        } else {
          // move up
          states.highlightIndex--
        }
      }
      break

      // 这个是按下向下移动的键盘时触发的
    case 'ArrowDown':
      e.preventDefault()//阻止默认行为(也就是防止界面也跟着上下移动)
      // 这步是用于判断当前是否有数据(也就是为了防止后面的操作没有意义)
      if (filteredOptions.value.length > 0) {
        // 如果是初始状态时,进行下面的操作
        if (states.highlightIndex === -1 || states.highlightIndex === (filteredOptions.value.length - 1)) {
          states.highlightIndex = 0
        } else {
          // move up
          states.highlightIndex++
        }
      }
      break
    default:
      break;
  }
}
// 用于判断清空图标是否显示的按钮
const showClearIcon = computed(() => {
  // * hover 上去
  // * props.clearable 为 true
  // 必须要有选择过选项
  // Input 的值不能为空
  return props.clearable
    && states.mouseHover
    && states.selectedOption
    && states.inputValue.trim() !== ''
})
// 点击清空Input表单中的数据的方法
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const NOOP = () => {}
//真正控制Tooltip是否打开的方法
const toggleDropdown = () => {
  if (props.disabled) return//如果是禁用就不进行操作
  // 这个也就是根据isDropdownShow来进行判断，如果是true就变成false，反之亦然
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
// 根据点击的值进行修改input上面渲染的值
const itemSelect = (e: SelectOption) => {
  // 如果这个选项是禁止的就不进行任何返回
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  //  进行修改完后要将出来的选项框进行关闭
  controlDropdown(false)
  // 进行调用Input组件上的方法，在select表单消失以后Input表单仍具有焦点
  inputRef.value.ref.focus()
}
</script>
