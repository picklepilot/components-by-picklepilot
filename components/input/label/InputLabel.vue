<template>
    <label
        :for="forId"
        :class="m('block text-sm font-medium text-zinc-900', ...classes)"
    >
        <slot />
    </label>
</template>

<script setup lang="ts">
import { m } from '../../../utils/TextUtils'
import { defineProps } from 'vue'

interface Props {
    classes?: string[]
    forId: string
}

const props = withDefaults(defineProps<Props>(), {
    classes: () => [],
})
</script>
