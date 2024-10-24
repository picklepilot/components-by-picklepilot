<template>
    <div
        class="flex h-[550px] h-full items-start justify-center rounded-xl bg-zinc-100 p-6"
    >
        <BaseToolbar
            :classes="{
                bar: 'rounded-xl bg-white shadow-sm',
            }"
            :config="toolbarConfig"
        />
    </div>
</template>
<script setup lang="ts">
import BaseToolbar from './BaseToolbar.vue'
import type { ToolbarItemGroup } from './ToolBarItem'

const toolbarConfig: ToolbarItemGroup[] = [
    {
        children: [{ icon: 'fa-cog' }],
        position: 'left',
    },
    {
        children: [
            {
                icon: 'fa-columns',
                tooltip: 'Manage columns',
                classes: {
                    button: 'bg-blue-100',
                },
            },
            {
                icon: 'fa-filter',
                tooltip: 'Filter data',
                onClick: () => {
                    console.log('CLICKED FILTER ICON')
                },
            },
        ],
        position: 'left',
    },
    {
        children: [
            {
                icon: 'fa-table',
                tooltip: 'Tabular',
            },
            {
                icon: 'fa-grid',
                tooltip: 'Card view - dense',
            },
            {
                icon: 'fa-grid-2',
                tooltip: 'Card view - normal',
            },
            {
                icon: 'fa-square',
                tooltip: 'Card view - spacious',
            },
            {
                icon: 'fa-rectangle-wide',
                tooltip: 'Stream view',
            },
        ],
        position: 'right',
    },
    {
        children: [
            {
                icon: 'fa-pen',
                children: [
                    [
                        {
                            icon: 'fa-plus',
                            label: 'Click me',
                        },
                    ],
                ],
            },
        ],
        position: 'right',
    },
]
</script>
