<template>
    <div class="flex h-full items-center justify-center space-x-5 p-5 overflow-hidden">
        <div class="w-full max-w-sm space-y-1.5">
            <FacetedFilters :model-value="filters" @update:modelValue="filters = $event" />    
        </div>
        <div class="w-full max-w-sm space-y-1.5 p-5 h-full">
            <div class="h-full bg-zinc-100 rounded-lg p-4 overflow-y-auto overflow-x-hidden">
                <pre>{{ filters }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FacetedFilters from './FacetedFiltersBase.vue'

const filters = ref([
    {
        attribute: 'category',
        attributeDisplay: 'Category',
        options: ['Electronics and awesome long text truncate me', 'Clothing', 'Books'],
        values: ['Books'],
    },
    {
        attribute: 'price',
        attributeDisplay: 'Price',
        options: [1, 2, 10, 15, 30],
        values: [10],
    }
])
</script>
