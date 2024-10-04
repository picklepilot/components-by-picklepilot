<template>
    <div class="h-[800px] overflow-auto rounded-xl bg-zinc-100 p-6">
        <ColumnManager
            ref="columnManager"
            :default-items="defaultItems"
            :existing-columns="existingColumns"
            :searcher="searcher"
            :onPickedColumn="(item) => item"
            :group-menu-items="groupMenuItems"
        >
            <template v-slot:option="{ item, selected, active }">
                <div :class="active ? 'bg-green-500' : ''">{{ item.name }}</div>
            </template>
            <template v-slot:column="{ slotProps }">
                <div class="flex flex-col p-2">
                    <div>{{ slotProps.name }}</div>
                    <div class="mt-1 text-sm text-zinc-500">
                        {{ slotProps.description }}
                    </div>
                </div>
            </template>

            <template #drag-handle>
                <span
                    class="drag-handle relative top-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md leading-none hover:bg-zinc-200 group-has-[.selected]:bg-green-200"
                >
                    <i
                        class="fa-regular fa-lemon text-sm group-has-[.selected]:hidden"
                    ></i>
                </span>
            </template>

            <div v-if="columnManager" class="rounded-xl bg-zinc-100 p-8">
                {{ columnManager.focusedColumn }}
            </div>
        </ColumnManager>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ColumnManager from './ColumnManager.vue'
import Sortable, { MultiDrag } from 'sortablejs'
mountMultiDragPlugin()

const columnManager = ref()

const defaultItems = ref([
    {
        id: 1,
        name: 'Alpha',
        description: 'This is the first item in the list.',
    },
    {
        id: 2,
        name: 'Beta',
        description: 'This item is the second one, often used for testing.',
    },
    {
        id: 3,
        name: 'Gamma',
        description: 'The third item, represents an advanced concept.',
    },
    {
        id: 4,
        name: 'Delta',
        description: 'This item is frequently associated with change.',
    },
    {
        id: 5,
        name: 'Epsilon',
        description: 'The fifth item, often the final step in a sequence.',
    },
])

const existingColumns = [
    {
        id: 3,
        name: 'Gamma',
        description: 'The third item, represents an advanced concept.',
        tag: 'advanced',
        group: 'Default',
    },
    {
        id: 4,
        name: 'Delta',
        description: 'This item is frequently associated with change.',
        tag: 'expert',
        group: 'Default',
    },
    {
        id: 5,
        name: 'Epsilon',
        description: 'The fifth item, often the final step in a sequence.',
        tag: 'final',
        group: 'Default',
    },
]

const groupMenuItems = [
    [
        {
            icon: 'fa-robot',
            label: 'AI some stuff',
            onClick: (context: any) => {
                console.log('AI some stuff', context)
            },
        },
    ],
]

async function searcher(query: string) {
    return Promise.resolve(
        defaultItems.value.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()),
        ),
    )
}

function mountMultiDragPlugin() {
    if (typeof window === 'undefined') {
        return
    }

    Sortable.mount(new MultiDrag())
}
</script>
