<template>
    <div
        class="flex h-[550px] h-full items-start justify-center rounded-xl bg-zinc-100 p-6"
    >
        <BaseDropdownMenu
            :classes="{
                menu: '',
                menuButton: 'rounded-lg px-3.5 py-2.5 hover:bg-zinc-200',
                menuItems: '',
                menuItem: '',
            }"
            :items="items"
        >
            <template #trigger>
                <span
                    class="inline-flex shrink-0 items-center justify-center space-x-1.5"
                >
                    <span>Open me</span>
                    <ChevronUpDownIcon
                        class="h-5 w-5 text-zinc-400"
                        aria-hidden="true"
                    />
                </span>
            </template>
        </BaseDropdownMenu>
    </div>
</template>
<script setup lang="ts">
import BaseDropdownMenu from './BaseDropdownMenu.vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const items = [
    [
        {
            icon: 'fa-plus',
            label: 'Click me',
        },
        {
            icon: 'fa-xmark',
            label: 'Click me too, please',
        },
    ],
]
</script>
