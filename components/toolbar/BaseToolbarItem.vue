<template>
    <BaseButton
        v-if="!item.children"
        :classes="m(
                   'h-9 w-9 border-none flex items-center justify-center rounded-lg font-medium p-2 text-xs leading-none bg-transparent text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100',
                    item.classes?.button || '',
                )"
        :disabled="item.disabled"
        v-tooltip="{
            content: item.tooltip,
            placement: 'top',
        }"
        @click="item.onClick"
    >
        <i :class="['fa-regular', item.icon]"></i>
    </BaseButton>

    <BaseDropdownMenu
        v-else
        :classes="{
            menu: m('h-8 w-8 border-none flex items-center justify-center rounded-md font-medium p-2 text-xs leading-none bg-transparent text-zinc-700 hover:text-zinc-900 hover:bg-zinc-900/10', item.classes?.button || ''),
            menuButton: '',
            menuItems: '',
            menuItem: '',
        }"
        :items="items"
    >
        <template #trigger>
            <span
                v-if="item.icon"
                class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
            >
                <i :class="['fa-regular', item.icon]"></i>
            </span>
        </template>
    </BaseDropdownMenu>
</template>

<script setup lang="ts">
import BaseButton from '../button/BaseButton.vue'
import BaseDropdownMenu from '../dropdown-menu/BaseDropdownMenu.vue'
import type { ToolbarItem } from './ToolBarItem'
import type { DropdownItem } from '../dropdown-menu/DropdownItem'
import { computed } from 'vue'
import { m } from '../../utils/TextUtils'

const props = withDefaults(
    defineProps<{
        item: ToolbarItem
    }>(),
    {},
)

const items = computed<DropdownItem[][]>(() => props.item.children || [])
</script>
