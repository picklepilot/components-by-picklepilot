<template>
    <div :class="m(
        'flex flex-col space-y-2'
    )">
        <div v-if="effectiveFilters.length === 0">
            No filter, yet.
        </div>
        <ul v-for="(filter, idx) in effectiveFilters" :key="`filter-${idx}`">
            <li :class="m(
                'space-y-1',
            )">
                <div class="cursor-pointer text-zinc-900 font-bold flex items-center justify-between" @click="toggleCollapseFilter(filter.attribute)">
                    <span>{{ filter.attributeDisplay }}</span>
                    <span class="px-0.5">{{ collapsedFilters.includes(filter.attribute) ? '⏴' : '⏷' }}</span>
                </div>
                <ul v-show="!collapsedFilters.includes(filter.attribute)">
                    <li v-for="(option, idx) in filter.options" :key="`value-${idx}`" class="flex items-center justify-between">
                        <span>{{ option }}</span>
                        <input type="checkbox" v-model="filter.values" :value="option" class="form-checkbox h-4 w-4 text-zinc-600 border-zinc-600 rounded focus:ring-zinc-500" />
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { emit } from 'process';
import { m } from '../../utils/TextUtils'
// import { BaseButton } from '../'
import { ref, defineProps, watch, withDefaults } from 'vue'

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