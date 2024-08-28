<template>
    <div
        class="flex h-[550px] h-full items-start justify-center rounded-xl bg-zinc-100 p-6"
    >
        <BaseTypeahead
            v-model="mockData[0]"
            :default-items="mockData"
            :searcher="searcher"
            value-property="name"
        >
            <template #empty>Nothing to show!</template>
            <template #options="{ filteredItems }">
                <div class="grid grid-cols-1 gap-2">
                    <ComboboxOption
                        v-for="item in filteredItems"
                        as="template"
                        :key="item.id || item._id"
                        :value="item"
                        v-slot="{ selected, active }"
                    >
                        <li
                            class="relative flex min-h-12 cursor-default select-none items-center justify-between space-x-8 rounded-lg px-3 py-1.5"
                            :class="{
                                'bg-zinc-100 text-blue-500': active,
                                'text-zinc-900': !active,
                            }"
                        >
                            <span v-html="item.name"></span>
                            <span v-if="selected" class="text-blue-500">✓</span>
                        </li>
                    </ComboboxOption>
                </div>
            </template>
        </BaseTypeahead>
    </div>
</template>
<script setup lang="ts">
import BaseTypeahead from './BaseTypeahead.vue'
import { ComboboxOption } from '@headlessui/vue'

const mockData = [
    {
        id: 1,
        name: 'Alpha',
        description: 'This is the first item in the list.',
        tag: 'beginner',
        header: 'Common',
    },
    {
        id: 2,
        name: 'Beta',
        description: 'This item is the second one, often used for testing.',
        tag: 'intermediate',
        header: 'Common',
    },
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
        query === ''
            ? mockData
            : mockData.filter((mockThing: any) => {
                  return mockThing.name
                      .toLowerCase()
                      .includes(query.toLowerCase())
              }),
    )
}
</script>
