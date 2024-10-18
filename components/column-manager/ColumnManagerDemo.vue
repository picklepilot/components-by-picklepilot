<template>
    <div class="h-[800px] overflow-auto rounded-xl bg-zinc-100 p-6">
        <ColumnManager
            ref="columnManager"
            :classes="{
                groupContainer:
                    'bg-white rounded-none first:rounded-t-xl last:rounded-b-xl border-t-0 border-x-0 border-b border-zinc-200',
                groupHeader:
                    'rounded-none py-1.5 pr-1.5 pl-2 border-b border-zinc-200',
                groupsContainer:
                    'space-y-0 rounded-t-xl rounded-b-xl overflow-hidden border border-zinc-300/80 p-0 h-auto',
                newGroupContainer: 'p-2 shadow-none',
            }"
            :drop-down-classes="{
                comboboxOptionsContainer: 'z-[51]',
            }"
            :default-items="defaultItems"
            :existing-columns="existingColumns"
            :searcher="searcher"
            :onPickedColumn="(item) => item"
            :group-configuration="groupConfiguration"
            :group-menu-items="groupMenuItems"
            @update:existingColumns="onUpdatedColumns"
        >
            <template v-slot:option="{ item, selected, active }">
                <div :class="active ? 'bg-green-500' : ''">{{ item.name }}</div>
            </template>

            <template v-slot:column="{ slotProps }">
                <div class="ml-2 grow self-center truncate">
                    {{ slotProps.name }}
                </div>
            </template>

            <template #drag-handle>
                <span
                    class="drag-handle relative top-1 ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md leading-none hover:bg-zinc-200 group-has-[.selected]:bg-green-200"
                >
                    <i
                        class="fa-regular fa-lemon text-sm group-has-[.selected]:hidden"
                    ></i>
                </span>
            </template>

            <div v-if="columnManager" class="rounded-xl bg-zinc-100 p-8">
                <pre>{{ updatedColumns }}</pre>
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

const groupConfiguration = ref({
    Default: {
        color: '#f97316',
    },
    'Second Group': {
        color: '#f97316',
    },
})

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
        description: 'The fifth item, never the final step in a sequence.',
    },
    {
        id: 6,
        name: 'Pickles',
        description: 'The sixth item, often the final step in a sequence.',
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
        group: 'Second Group',
    },
    {
        id: 6,
        name: 'Default',
        description: 'The sixth item, often the final step in a sequence.',
        group: 'Second Group',
    },

    {
        id: 7,
        name: 'One more column',
        description: 'The sixth item, often the final step in a sequence.',
        group: 'Second Group',
    },

    {
        id: 8,
        name: 'This one has a longer name to truncate',
        description: 'The sixth item, often the final step in a sequence.',
        group: 'Second Group',
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

const updatedColumns = ref(existingColumns)
function onUpdatedColumns(columns: any) {
    console.log('Updated columns:', columns)
    updatedColumns.value = columns
}

function mountMultiDragPlugin() {
    if (typeof window === 'undefined') {
        return
    }

    Sortable.mount(new MultiDrag())
}
</script>
