<template>
    <div class="h-[550px] overflow-auto rounded-xl bg-white p-6">
        <ColumnManager
            ref="columnManager"
            :default-items="defaultItems"
            :existing-columns="existingColumns"
            :searcher="searcher"
            :onPickedColumn="(item) => item"
        >
            <template v-slot:option="{ item, selected, active }">
                <div :class="active ? 'bg-green-500' : ''">{{ item.name }}</div>
            </template>
            <template v-slot:column="{ slotProps }">
                <div>{{ slotProps.name }}</div>
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
        header: 'Other',
    },
    {
        id: 4,
        name: 'Delta',
        description: 'This item is frequently associated with change.',
        tag: 'expert',
        header: 'Expert',
    },
    {
        id: 5,
        name: 'Epsilon',
        description: 'The fifth item, often the final step in a sequence.',
        tag: 'final',
        header: 'Expert',
    },
]

async function searcher(query: string) {
    return Promise.resolve(
        defaultItems.value.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()),
        ),
    )
}
</script>
