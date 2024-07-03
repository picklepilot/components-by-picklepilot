<template>
    <input
        type="checkbox"
        :class="m('h-4 w-4 rounded border-zinc-300/80 text-indigo-600 focus:ring-indigo-600', classes)"
        :checked="checked"
        @change="checked = !checked"
    />
</template>

<script setup lang="ts">
import { m } from '../../../utils/TextUtils'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        /**
         * Additional classes to be added to the sortable container
         *
         * @default []
         * @type {string[]}
         */
        classes?: string[]

        /**
         * The aria-labelledby attribute identifies the element (or elements) that labels the element it is applied to.
         *
         * @default ''
         * @type string
         */
        labelledBy?: string

        /**
         * The model value is a boolean flag to indicate if the checkbox is checked or not
         *
         * @default false
         * @type boolean
         */
        modelValue: boolean
    }>(),
    {
        classes: () => [],
        labelledBy: '',
        modelValue: false,
    },
)

const checked: Ref<boolean> = ref(props.modelValue)

watch(
    () => props.modelValue,
    () => {
        checked.value = props.modelValue
    },
    { immediate: true },
)

watch(
    () => checked.value,
    () => {
        emit('update:modelValue', checked.value)
    },
)
</script>
