import fgInput from './components/UIComponents/Inputs/formGroupInput.vue'
import fgSelect from './components/UIComponents/Inputs/formGroupSelect.vue'
import DropDown from './components/UIComponents/Dropdown.vue'
import Alert from './components/UIComponents/Alerts/Alert.vue'

const GlobalComponents = {
  install(Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('fg-select', fgSelect)
    Vue.component('drop-down', DropDown)
    Vue.component('alert', Alert)
  }
}

export default GlobalComponents
