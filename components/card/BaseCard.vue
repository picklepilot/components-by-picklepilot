<template>
    <div
        :class="
            twMerge(
                clsx(
                    'space-y-5 rounded-lg border border-zinc-100 px-4 py-5 shadow-sm sm:px-6',
                    classes,
                ),
            )
        "
    >
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

interface Props {
    classes?: string[]
}

// define props using withDefaults from vue api
withDefaults(defineProps<Props>(), {
    classes: () => [''],
})
</script>
