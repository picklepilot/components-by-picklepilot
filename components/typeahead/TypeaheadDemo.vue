<template>
    <div
        class="flex h-[550px] h-full items-start justify-center rounded-xl bg-zinc-100 p-6"
    >
        <TypeaheadBase :searcher="searcher" value-property="name">
            <template #empty>Nothing to show!</template>
        </TypeaheadBase>
    </div>
</template>
<script setup lang="ts">
import TypeaheadBase from './TypeaheadBase.vue'

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
