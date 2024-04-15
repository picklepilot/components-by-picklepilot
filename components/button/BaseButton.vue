<template>
    <button
        @click="$emit('click', $event)"
        :class="
            m(
                'flex rounded-md font-medium leading-none',
                disabled && 'pointer-events-none opacity-50',
                bgClasses,
                borderClasses,
                colorClasses,
                sizeClasses,
                classes,
            )
        "
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import colors from 'tailwindcss/colors'
import { computed } from 'vue'
import { m } from '../../utils/TextUtils'
import { onMounted } from 'vue-demi'

interface Props {
    classes?: string[]
    disabled?: boolean
    size?: string
    variant?: string
}

const emit = defineEmits(['click'])

const props = withDefaults(defineProps<Props>(), {
    classes: () => [''],
    disabled: false,
    size: 'md',
    variant: 'zinc',
})

const bgClasses = computed(() => {
    return {
        'bg-blue-700': props.variant === 'blue',
        'bg-green-700': props.variant === 'green',
        'bg-red-700': props.variant === 'red',
        'bg-yellow-700': props.variant === 'yellow',
        'bg-zinc-900': props.variant === 'zinc',
    }
})

const borderClasses = computed(() => {
    return {
        'border border-blue-700': props.variant === 'blue',
        'border border-green-700': props.variant === 'green',
        'border border-red-700': props.variant === 'red',
        'border border-yellow-700': props.variant === 'yellow',
        'border border-zinc-700': props.variant === 'zinc',
    }
})

const colorClasses = computed(() => {
    return {
        'text-blue-700': props.variant === 'blue',
        'text-green-700': props.variant === 'green',
        'text-red-700': props.variant === 'red',
        'text-yellow-700': props.variant === 'yellow',
        'text-white': props.variant === 'zinc',
    }
})

const sizeClasses = computed(() => {
    return {
        'px-2 py-1 text-xs': props.size === 'xs',
        'px-2.4 py-1.5 text-sm': props.size === 'sm',
        'px-3 py-2.5 text-sm': props.size === 'md',
        'px-4 py-2': props.size === 'lg',
        'px-4 py-2 text-lg': props.size === 'xl',
    }
})

onMounted(() => {
    console.log('mounted', colors)
})
</script>
