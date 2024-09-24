<template>
    <div class="h-[350px] overflow-auto rounded-xl bg-zinc-100 p-6">
        <div class="flex h-[900px] items-center justify-center">
            <BaseCombobox
                :display-value="(item) => item.name"
                :items="mockData"
                :model-value="{
                    id: 2,
                    name: 'Beta',
                    description:
                        'This item is the second one, often used for testing.',
                    tag: 'intermediate',
                    header: 'Common',
                }"
            >
                <template v-slot:option="{ item, selected, active }">
                    <li
                        class="relative cursor-default select-none rounded-lg py-2 pl-10 pr-4"
                        :class="{
                            'bg-zinc-100': active,
                            'text-zinc-900': !active,
                        }"
                    >
                        {{ item.name }}
                    </li>
                </template>
            </BaseCombobox>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseCombobox from './BaseCombobox.vue'

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
    {
        id: 6,
        name: 'Zeta',
        description:
            'This item represents the sixth letter of the Greek alphabet.',
        tag: 'intermediate',
        header: 'Other',
    },
    {
        id: 7,
        name: 'Eta',
        description: 'The seventh item, often used in mathematics.',
        tag: 'advanced',
        header: 'Other',
    },
    {
        id: 8,
        name: 'Theta',
        description: 'This item is associated with angles and trigonometry.',
        tag: 'expert',
        header: 'Expert',
    },
]
</script>
