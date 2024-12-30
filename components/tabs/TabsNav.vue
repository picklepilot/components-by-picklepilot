<template>
    <div :class="clsx('relative z-10 mx-auto', classes)">
        <div>Widths: {{ width }} - {{ tabsTotalWidth }}</div>

        <div class="flex space-x-1.5">
            <SortableComponent
                ref="sortableRef"
                :classes="
                    ['flex space-x-0.5', classic && 'px-6'].filter(Boolean)
                "
                :model-value="tabs"
                @update:modelValue="onUpdateOrder"
            >
                <template v-slot:item="tab">
                    <a
                        href="#"
                        @click.prevent="$emit('clicked', tab.id)"
                        :class="
                            m(
                                'pj-tab flex cursor-pointer items-center rounded-t border-x border-t px-2 py-1.5 text-sm font-medium leading-none transition-all',
                                classic
                                    ? 'px-3 py-2 text-sm font-medium leading-none transition-all data-[active=false]:relative data-[active=false]:border-transparent data-[active=true]:border-zinc-200 data-[active=true]:bg-white data-[active=false]:hover:bg-zinc-900/5'
                                    : 'flex cursor-pointer items-center rounded border-0 px-3 py-2.5 text-sm font-medium leading-none transition-all hover:no-underline data-[active=false]:relative data-[active=true]:bg-white data-[active=false]:text-zinc-500 data-[active=true]:shadow-sm data-[active=false]:hover:bg-zinc-900/5 data-[active=false]:hover:text-zinc-800',
                                tab.classes || '',
                                tabClasses,
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

            <BaseDropdownMenu
                ref="dropdownRef"
                :classes="{
                    menu: '',
                    menuButton: 'rounded-lg px-3.5 py-2.5 hover:bg-zinc-200',
                    menuItems: '!min-w-[300px] p-0',
                    menuItem: '',
                }"
                :items="effectiveTabs.toSpliced(showTabsCount)"
                :allowed-placements="['bottom-end']"
            >
                <template #trigger>
                    <span
                        class="inline-flex shrink-0 items-center justify-center space-x-1.5"
                    >
                        <span>Open me</span>
                        <i
                            class="fa-regular fa-angle-down h-5 w-5 text-zinc-400"
                            aria-hidden="true"
                        />
                    </span>
                </template>
            </BaseDropdownMenu>
        </div>

        <hr
            v-if="classic && !disabled.includes('border')"
            class="-mt-px border-gray-300"
        />
    </div>
</template>

<script setup lang="ts">
import { clsx } from 'clsx'
import { computed, onMounted, ref, watch } from 'vue'
import { twMerge } from 'tailwind-merge'
import { type Tab } from './Tab'
import SortableComponent from '../sortable/SortableComponent.vue'
import { useElementSize } from '@vueuse/core'
import { m } from '../../utils/TextUtils'
import BaseDropdownMenu from '../dropdown-menu/BaseDropdownMenu.vue'

// define props using withDefaults from vue api
const props = withDefaults(
    defineProps<{
        classes?: string[]
        classic?: boolean
        disabled?: string[]
        tabClasses?: string[]
        tabs: Tab[]
    }>(),
    {
        classic: false,
        classes: () => [],
        disabled: () => [],
        tabClasses: () => [],
    },
)

const emit = defineEmits(['clicked', 'update'])

const effectiveTabs = ref(props.tabs)
const sortableRef = ref()
const { width } = useElementSize(sortableRef)
const tabsTotalWidth = ref(0)
const showTabsCount = ref(effectiveTabs.value.length)
const dropdownRef = ref()

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

const tabsSplit = computed(() => {})
const collapsedTabs = ref<number[]>([])

function adapt() {
    tabsTotalWidth.value = Array.from(
        document.querySelectorAll('.pj-tab'),
    ).reduce((acc, tab) => acc + tab.clientWidth, 0)

    const allTabs = document.querySelectorAll('.pj-tab')
    let cutoffWidth = dropdownRef.value.offsetWidth
    collapsedTabs.value = []

    allTabs.forEach((item, i) => {
        if (width.value >= cutoffWidth + item.offsetWidth) {
            cutoffWidth += item.offsetWidth
        } else {
            // item.classList.add('--hidden')
            collapsedTabs.value.push(i)
        }
    })

    console.log('TabsNav:adapt()', collapsedTabs.value)

    if (tabsTotalWidth.value > width.value - 100) {
        console.log('SHOULD ADAPT')
    }

    showTabsCount.value = Math.floor((width.value - 100) / tabsTotalWidth.value)

    /* console.log(
        'TabsNav:adapt()',
        (width.value - 100) / tabsTotalWidth.value,
        tabsTotalWidth.value,
    ) */
}

watch(
    () => width.value,
    () => {
        adapt()
    },
)

onMounted(() => {
    adapt()
})
</script>
