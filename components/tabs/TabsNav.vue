<template>
    <div :class="clsx('relative z-10 mx-auto', classes)">
        <SortableComponent
            :classes="['flex space-x-0.5 px-4']"
            :model-value="tabs"
            @update:model-value="onUpdateOrder"
        >
            <template v-slot:item="tab">
                <a
                    href="#"
                    @click.prevent="$emit('clicked', tab.idx)"
                    :class="
                        clsx(
                            'flex cursor-pointer items-center rounded-t border-x border-t px-2 py-1.5 text-sm font-medium leading-none transition-all',
                            tab.active && 'border-zinc-200 bg-white',
                            !tab.active &&
                                'relative border-transparent hover:bg-zinc-900/5',
                        )
                    "
                >
                    <slot name="left" v-bind="tab"></slot>
                    <span>{{ tab.label }}</span>
                    <slot name="right" v-bind="tab"></slot>
                </a>
            </template>
        </SortableComponent>
        <hr class="-mt-px" />
    </div>
</template>

<script setup lang="ts">
import { clsx } from 'clsx'
import SortableComponent from '../sortable/SortableComponent.vue'
import { ref, watch } from 'vue'

interface Props {
    classes?: string[]
    tabs: { id: number; label: string }[]
}

// define props using withDefaults from vue api
const props = withDefaults(defineProps<Props>(), {
    classes: () => [''],
})

const emit = defineEmits(['clicked', 'update'])

const effectiveTabs = ref(props.tabs)

watch(
    () => props.tabs,
    (newTabs) => {
        effectiveTabs.value = newTabs
    },
)

function onUpdateOrder(newTabs: { id: number; label: string }[]) {
    effectiveTabs.value = newTabs
    emit('update', newTabs)
}
</script>
