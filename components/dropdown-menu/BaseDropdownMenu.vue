<template>
    <Menu as="div" :class="m('relative inline-block text-left', classes.menu)">
        <div>
            <MenuButton :class="m('', classes.menuButton)">
                <slot name="trigger"></slot>
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                :class="
                    m(
                        'absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
                        classes.menuItems,
                    )
                "
            >
                <div
                    v-for="(group, i) in items"
                    :key="`dropdown-menu-${i}`"
                    class="px-1 py-1"
                >
                    <MenuItem
                        v-for="(item, j) in group"
                        :key="`dropdown-menu-${i}-${j}`"
                        v-slot="{ active }"
                    >
                        <button
                            :class="[
                                active
                                    ? 'bg-violet-500 text-white'
                                    : 'text-gray-900',
                                'group flex w-full items-center space-x-2 rounded-md border-none bg-transparent px-2.5 py-2.5 leading-none text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900',
                            ]"
                            @click="item.onClick"
                        >
                            <span
                                v-if="item.icon"
                                :class="
                                    m(
                                        'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900/10 leading-none group-hover:bg-indigo-400',
                                        classes.menuItemIcon,
                                    )
                                "
                            >
                                <i :class="['fa-regular', item.icon]"></i>
                            </span>
                            <span class="grow text-left">{{ item.label }}</span>
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { m } from '../../utils/TextUtils'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { type DropdownItem } from './DropdownItem'

withDefaults(
    defineProps<{
        items: DropdownItem[][]
        classes?: {
            menu?: string
            menuButton?: string
            menuItems?: string
            menuItem?: string
            menuItemIcon?: string
        }
    }>(),
    {
        classes: () => ({
            menu: '',
            menuButton: '',
            menuItems: '',
            menuItem: '',
            menuItemIcon: '',
        }),
    },
)
</script>
