import { mount } from '@vue/test-utils'
import { it, expect } from 'vitest'
import SortableComponent from '../SortableComponent.vue'

it('testing SortableComponent component props', async () => {
    const wrapper = mount(SortableComponent)
    await wrapper.setProps({
        modelValue: ['Pickle', 'Tomato', 'Onion'],
        options: {
            group: 'shared',
            animation: 150,
        },
    })
    const componentRef = wrapper.getComponent(SortableComponent)
    expect(componentRef.props().modelValue).toContain('Pickle')
    expect(componentRef.props().options).toHaveProperty('group')
})
