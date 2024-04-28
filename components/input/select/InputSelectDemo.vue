<template>
    <div class="flex h-full items-center justify-center">
        <InputSelect :model-value="items" :focused="true" @click="onClick" @enter="onEnter">
            <template v-slot:default="{ item }">
                <div class="flex w-full items-center justify-between px-3 py-2">
                    {{ item.label }}
                </div>
            </template>
        </InputSelect>
    </div>
</template>
<script setup lang="ts">
import InputSelect from './InputSelect.vue'
import { ref } from 'vue'

const items = ref([
    { id: 0, label: 'Option One', header: 'Group One' },
    { id: 1, label: 'Option Two', header: 'Group Two' },
    { id: 2, label: 'Option Three', header: 'Group Two' },
])

function onClick(evt: any) {
    console.log('Option clicked', evt)
}

function onEnter(evt: any) {
    console.log('Enter pressed', evt)
}
</script>
