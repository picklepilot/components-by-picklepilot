<template>
    <div :class="clsx('relative z-10 mx-auto', classes)">
        <SortableComponent
            :classes="['flex space-x-0.5', classic && 'px-6']"
            :model-value="tabs"
            @update:model-value="onUpdateOrder"
        >
            <template v-slot:item="tab">
                <a
                    href="#"
                    @click.prevent="$emit('clicked', tab.id)"
                    :class="
                        twMerge(
                            clsx(
                                'flex cursor-pointer items-center rounded-t border-x border-t px-2 py-1.5 text-sm font-medium leading-none transition-all',
                                classic
                                    ? 'px-3 py-2 text-sm font-medium leading-none transition-all data-[active=false]:relative data-[active=false]:border-transparent data-[active=true]:border-zinc-200 data-[active=true]:bg-white data-[active=false]:hover:bg-zinc-900/5'
                                    : 'flex cursor-pointer items-center rounded border-0 px-3 py-2.5 text-sm font-medium leading-none transition-all data-[active=false]:relative data-[active=true]:bg-white data-[active=true]:shadow-sm data-[active=false]:hover:bg-zinc-900/5 data-[active=false]:text-zinc-500 data-[active=false]:hover:text-zinc-800 hover:no-underline',
                                tab.classes || '',
                                tabClasses,
                            ),
                        )
                    "
                    :data-active="tab.active.toString()"
                >
                    <slot name="left" v-bind="tab"></slot>
                    <span v-html="tab.label" />
                    <slot name="right" v-bind="tab"></slot>
                </a>
            </template>
        </SortableComponent>
        <hr v-if="classic" class="-mt-px border-gray-300" />
    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import SortableComponent from '../sortable/SortableComponent.vue'
import { ref, watch } from 'vue'

export interface Tab {
    idx?: number
    id: number
    label: string
    active: boolean
    disabled: boolean
    classes?: string[]
}

interface Props {
    classes?: string[]
    classic?: boolean
    tabClasses?: string[]
    tabs: Tab[]
}

// define props using withDefaults from vue api
const props = withDefaults(defineProps<Props>(), {
    classic: false,
    classes: () => [],
    tabClasses: () => [],
})

const emit = defineEmits(['clicked', 'update'])

const effectiveTabs = ref(props.tabs)

watch(
    () => props.tabs,
    (newTabs) => {
        effectiveTabs.value = newTabs
    },
)

function onUpdateOrder(newTabs: Tab[]) {
    effectiveTabs.value = newTabs
    emit('update', newTabs)
}
</script>
