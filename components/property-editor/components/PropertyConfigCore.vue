<template>
    <div class="space-y-4">
        <PropertyConfigMapTo
            v-if="mappablePropertyNames.length"
            v-model="effectiveValue.mapTo"
            :classes="classes"
            :mappable-property-names="mappablePropertyNames"
        />
        <component
            :is="componentMapping[type]"
            v-model="effectiveValue"
            :classes="classes"
        />
    </div>
</template>

<script setup lang="ts">
import PropertyConfigDate from './PropertyConfigDate.vue'
import PropertyConfigEnum from './PropertyConfigEnum.vue'
import PropertyConfigMapTo from './PropertyConfigMapTo.vue'
import { useInputModelValue } from '../../input/composables'
import { watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        classes?: {
            inputText: string
            inputCheckbox: string
            inputSelect: string
        }
        mappablePropertyNames?: string[]
        modelValue: any
        type: string
    }>(),
    {
        classes: () => ({
            inputText: '',
            inputCheckbox: '',
            inputSelect: '',
        }),
        mappablePropertyNames: () => [],
    },
)

const { effectiveValue } = useInputModelValue(props)

watch(
    () => effectiveValue.value,
    (newValue: any) => emit('update:modelValue', newValue),
    { deep: true },
)

const componentMapping: {
    [key: string]: any
} = {
    enum: PropertyConfigEnum,
    date: PropertyConfigDate,
}
</script>
