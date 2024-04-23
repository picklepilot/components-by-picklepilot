import { App } from 'vue'

import BaseButton from './button/BaseButton.vue'
import BaseCard from './card/BaseCard.vue'
import ColorPicker from './color-picker/ColorPicker.vue'
import InputLabel from './input/label/InputLabel.vue'
import InputText from './input/text/InputText.vue'
import InputTextarea from './input/textarea/InputTextarea.vue'
import ModalComponent from './modal/ModalComponent.vue'
import SortableComponent from './sortable/SortableComponent.vue'
import TabsNav from './tabs/TabsNav.vue'

function install(app: App) {
    app.component('BaseButton', BaseButton)
    app.component('BaseCard', BaseCard)
    app.component('ColorPicker', ColorPicker)
    app.component('InputLabel', InputLabel)
    app.component('InputText', InputText)
    app.component('InputTextarea', InputTextarea)
    app.component('ModalComponent', ModalComponent)
    app.component('SortableComponent', SortableComponent)
    app.component('TabsNav', TabsNav)
}

export default { install }
