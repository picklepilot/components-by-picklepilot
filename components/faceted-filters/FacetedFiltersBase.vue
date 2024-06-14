<template>
    <div :class="m(
        'w-full flex flex-col space-y-2',
        classes
    )">
        <div v-if="effectiveFilters.length === 0">
            No filter, yet.
        </div>
        <ul v-for="(filter, idx) in effectiveFilters" :key="`filter-${idx}`" class="w-full">
            <li :class="m(
                'space-y-1 w-full',
            )">
                <div class="cursor-pointer text-zinc-900 font-bold flex items-center justify-between" @click="toggleCollapseFilter(filter.attribute)">
                    <span>{{ filter.attributeDisplay }}</span>
                    <span class="px-0.5">{{ collapsedFilters.includes(filter.attribute) ? '⏴' : '⏷' }}</span>
                </div>
                <ul v-show="!collapsedFilters.includes(filter.attribute)">
                    <li v-for="(option, idx) in filter.options" :key="`value-${idx}`" class="flex items-center space-x-3">
                        <label :for="`pj-faceted-filters-input-${uniqueId}-${filter.attribute}-${idx}`" class="grow truncate">
                            {{ option }}
                        </label>
                        <input type="checkbox" v-model="filter.values" :value="option" :id="`pj-faceted-filters-input-${uniqueId}-${filter.attribute}-${idx}`" class="h-4 w-4 text-zinc-600 border-zinc-600 rounded focus:ring-zinc-500" />
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { m } from '../../utils/TextUtils'
import { ref, defineEmits, defineProps, watch, withDefaults } from 'vue'

type FacetedFilterItem = {
    attribute: string
    attributeDisplay: string
    options: any[]
    values: any[]
}

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<{
    classes?: string[]
    modelValue: FacetedFilterItem[]
}>(), {
    classes: () => []
})

const uniqueId = Math.random().toString(36).substring(2, 9)
const effectiveFilters = ref<FacetedFilterItem[]>(props.modelValue)
const collapsedFilters = ref<string[]>([])

watch(
    () => effectiveFilters.value,
    (newValue) => {
        emit('update:modelValue', newValue)
    },
    { deep: true }
)

/**
 * 
 * @param attribute 
 */
function toggleCollapseFilter(attribute: string) {
    if (collapsedFilters.value.includes(attribute)) {
        collapsedFilters.value = collapsedFilters.value.filter((attr) => attr !== attribute)
    } else {
        collapsedFilters.value.push(attribute)
    }
}
</script>