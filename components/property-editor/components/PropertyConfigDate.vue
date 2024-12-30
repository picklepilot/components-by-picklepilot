<template>
    <div class="space-y-4">
        <div class="property-config-item">
            <InputLabel
                class="text-xs font-semibold"
                :for-id="`input-format-${uniqueId}`"
                >Formatter</InputLabel
            >
            <div class="mt-2">
                <InputText
                    v-model="effectiveValue.format"
                    :id="`input-format-${uniqueId}`"
                    name="property-config-date-format"
                    placeholder="eg. YYYY-MM-DD"
                    :classes="[classes.inputText]"
                />
            </div>
        </div>
        <div class="property-config-item flex items-center gap-1.5">
            <InputLabel
                class="text-xs font-semibold"
                :for-id="`input-date-ago-${uniqueId}`"
                >Include time passed?</InputLabel
            >
            <InputCheckbox
                v-model="effectiveValue.fromNow"
                :id="`input-date-ago-${uniqueId}`"
                name="property-config-date-format"
                :classes="[classes.inputCheckbox]"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import InputText from '../../input/text/InputText.vue'
import InputLabel from '../../input/label/InputLabel.vue'
import InputCheckbox from '../../input/checkbox/InputCheckbox.vue'
import { useInputModelValue } from '../../input/composables'
import { watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        modelValue?: {
            format: string
            fromNow: boolean
        }
        classes?: {
            inputText: string
            inputCheckbox: string
            inputSelect: string
        }
    }>(),
    {
        modelValue: () => ({
            format: 'YYYY-MM-DD',
            fromNow: false,
        }),
        classes: () => ({
            inputText: '',
            inputCheckbox: '',
            inputSelect: '',
        }),
    },
)

const uniqueId = Math.random().toString(36).substring(2, 9)

const { effectiveValue } = useInputModelValue(props)

watch(
    () => effectiveValue.value,
    (newValue: any) => emit('update:modelValue', newValue),
)
</script>
