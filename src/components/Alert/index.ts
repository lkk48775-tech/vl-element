// 组件得入口文件
import type {App} from 'vue'
import Alert from '@/components/Alert/Alert.vue'
import AlertTitle from '@/components/Alert/AlertTitle.vue'

Alert.install=(app:App)=>{
  app.component(Alert.name!, Alert)
}
AlertTitle.install=(app:App)=>{
  app.component(AlertTitle.name!, AlertTitle)
}
export default Alert
export { AlertTitle }
export * from './types'
