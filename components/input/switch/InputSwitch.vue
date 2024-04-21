<template>
    <div class="flex items-center text-[13px]">
        <button
            type="button"
            :class="
                m(
                    'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-solid border-transparent bg-zinc-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 aria-checked:bg-zinc-800',
                    classes,
                )
            "
            role="switch"
            :aria-checked="checked"
            :aria-labelledby="labelledBy"
            @click="checked = !checked"
        >
            <span
                aria-hidden="true"
                :aria-checked="checked"
                :class="
                    m(
                        'pointer-events-none inline-block h-4 w-4 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out aria-checked:translate-x-4',
                    )
                "
            ></span>
        </button>
        <span
            class="ml-3 cursor-pointer"
            id="annual-billing-label"
            @click="checked = !checked"
        >
            <slot></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import { m } from '../../../utils/TextUtils'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

interface Props {
    checked: boolean
    classes?: string[]
    labelledBy: string
    modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {
    checked: false,
    classes: () => [],
    labelledBy: '',
    modelValue: false,
})

const checked: Ref<boolean> = ref(false)
const effectiveValue: Ref<boolean> = ref(props.modelValue)

watch(
    () => props.modelValue,
    () => {
        effectiveValue.value = props.modelValue
    },
    { immediate: true },
)

watch(
    () => effectiveValue.value,
    () => {
        emit('update:modelValue', effectiveValue.value)
    },
)
</script>
