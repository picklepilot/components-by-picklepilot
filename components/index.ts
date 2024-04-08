import { App } from 'vue'

import ColorPicker from './color-picker/ColorPicker.vue'
import ModalComponent from './modal/ModalComponent.vue'
import SortableComponent from './sortable/SortableComponent.vue'

function install(app: App) {
    app.component('ColorPicker', ColorPicker)
    app.component('ModalComponent', ModalComponent)
    app.component('SortableComponent', SortableComponent)
}

import './main.css'

export default { install }
