import Theme from 'vitepress/theme'
import DynamicLayout from '../components/DynamicLayout.vue'

export default {
    ...Theme,
    Layout: DynamicLayout,
}
