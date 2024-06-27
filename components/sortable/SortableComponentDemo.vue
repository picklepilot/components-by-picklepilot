<template>
    <div class="mx-auto mb-4 h-[400px] overflow-auto rounded-lg bg-zinc-50">
        <ModalComponent :show-modal="showModal" @close="showModal = false" />

        <div v-for="(group, idx) in list" :key="group.id">
            <h2 class="sticky top-0 bg-zinc-50 p-3 text-lg font-semibold">
                {{ group.name }}
            </h2>
            <SortableComponent
                v-model="group.columns"
                :item-classes="[
                    'cursor-default px-2 pr-3 hover:bg-zinc-100 [&.selected]:bg-green-200',
                ]"
                :options="{
                    animation: 150,
                    group: 'shared-columns',
                    handle: '.drag-handle',
                    multiDrag: true,
                    selectedClass: 'selected',
                }"
                @update:modelValue="onUpdatedList(idx, $event)"
            >
                <template v-slot:item="{ name }">
                    <div class="flex w-full">
                        <div class="p-2 text-sm">
                            {{ name }}
                        </div>
                        <div class="ml-auto flex items-center p-1">
                            <button
                                @click.prevent.stop="showModal = true"
                                class="rounded bg-white p-1 text-sm text-zinc-400 shadow-sm ring-1 ring-zinc-100 transition-all hover:text-zinc-700 hover:shadow-md hover:ring-zinc-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="h-3 w-3"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </template>
            </SortableComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sortable, { MultiDrag } from 'sortablejs'
import SortableComponent from './SortableComponent.vue'
import ModalComponent from '../modal/ModalComponent.vue'
import { ref } from 'vue-demi'
mountMultiDragPlugin()

export interface Column {
    id: number
    name: string
    description: string
}

const showModal = ref(false)
const list = ref([
    {
        id: 1,
        name: 'Group One',
        columns: [
            { id: 1, name: 'Column One' },
            { id: 2, name: 'Column Two' },
            { id: 3, name: 'Column Three' },
            { id: 4, name: 'Column Four' },
            { id: 5, name: 'Column Five' },
            { id: 6, name: 'Column Six' },
            { id: 7, name: 'Column Seven' },
            { id: 8, name: 'Column Eight' },
            { id: 9, name: 'Column Nine' },
            { id: 10, name: 'Column Ten' },
        ],
    },
    {
        id: 2,
        name: 'Group Two',
        columns: [
            { id: 11, name: 'Column Eleven' },
            { id: 12, name: 'Column Twelve' },
            { id: 13, name: 'Column Thirteen' },
            { id: 14, name: 'Column Fourteen' },
            { id: 15, name: 'Column Fiveteen' },
            { id: 16, name: 'Column Sixteen' },
            { id: 17, name: 'Column Seventeen' },
            { id: 18, name: 'Column Eighteen' },
            { id: 19, name: 'Column Nineteen' },
            { id: 20, name: 'Column Tenteen' },
        ],
    },
])

function mountMultiDragPlugin() {
    if (typeof window === 'undefined') {
        return
    }

    Sortable.mount(new MultiDrag())
}

function onUpdatedList(idx: number, params: any) {
    console.log('updated list', params)
    list.value[idx].columns = params
}
</script>
