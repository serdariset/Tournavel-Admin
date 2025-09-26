import { App } from 'vue'
import {
  NButton,
  NDataTable,
  NTag,
  NColorPicker,
  NSpace,
  NSpin,
  NDrawer,
  NDrawerContent,
  NFormItem,
  NInput,
  NSwitch,
  NForm,
  NSelect,
} from 'naive-ui'

export default {
  install(app: App) {
    app.component('n-button', NButton)
    app.component('n-data-table', NDataTable)
    app.component('n-tag', NTag)
    app.component('n-color-picker', NColorPicker)
    app.component('n-space', NSpace)
    app.component('n-spin', NSpin)
    app.component('n-drawer', NDrawer)
    app.component('n-drawer-content', NDrawerContent)
    app.component('n-form-item', NFormItem)
    app.component('n-input', NInput)
    app.component('n-switch', NSwitch)
    app.component('n-form', NForm)
    app.component('n-select', NSelect)
  },
}
