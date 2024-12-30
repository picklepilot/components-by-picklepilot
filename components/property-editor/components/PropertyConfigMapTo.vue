<template>
    <div class="space-y-4">
        <div class="property-config-item">
            <InputLabel
                class="text-xs font-semibold"
                :for-id="`input-map-to-${uniqueId}`"
                >Map to</InputLabel
            >
            <div class="mt-2">
                <select
                    :name="`input-map-to-${uniqueId}`"
                    :id="`input-map-to-${uniqueId}`"
                    :class="classes.inputSelect"
                    v-model="effectiveValue"
                >
                    <option :value="''">--Pick a property--</option>
                    <option
                        v-for="property in mappablePropertyNames"
                        :value="property"
                    >
                        {{ property }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputLabel from '../../input/label/InputLabel.vue'
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
        mappablePropertyNames: string[]
        modelValue?: string
    }>(),
    {
        classes: () => ({
            inputText: '',
            inputCheckbox: '',
            inputSelect: '',
        }),
        modelValue: '',
    },
)

const uniqueId = Math.random().toString(36).substring(2, 9)

const { effectiveValue } = useInputModelValue(props)

watch(
    () => effectiveValue.value,
    (newValue: any) => emit('update:modelValue', newValue),
)
</script>
