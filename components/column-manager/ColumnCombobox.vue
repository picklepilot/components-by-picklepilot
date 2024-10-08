<template>
    <BaseTypeahead
        :classes="dropDownClasses"
        :default-items="defaultItems"
        :display-property="(_item: any) => ''"
        :nullable="true"
        :searcher="searcher"
        placeholder="Add a column to group"
        @update:modelValue="emit('change', $event)"
    >
        <template #empty>
            <EmptyState
                icon="fa-exclamation-circle"
                title="No columns found"
                description="There are no columns to show at this time. Try a different search."
                :classes="{
                    container:
                        'flex flex-col items-center justify-center border-2 border-dashed border-zinc-300/60 rounded-xl p-6',
                    icon: 'text-zinc-500',
                }"
            />
        </template>
        <template #options="{ filteredItems }">
            <div class="grid grid-cols-1 gap-2">
                <ComboboxOption
                    v-for="item in filteredItems"
                    as="template"
                    :key="item._id"
                    :value="item"
                    v-slot="{ selected, active }"
                >
                    <slot
                        name="option"
                        :item="item"
                        :selected="selected"
                        :active="active"
                    />
                </ComboboxOption>
            </div>
        </template>
    </BaseTypeahead>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComboboxOption } from '@headlessui/vue'
import { BaseTypeahead, EmptyState } from '../'

const emit = defineEmits(['change'])

const props = withDefaults(
    defineProps<{
        defaultItems?: any[]
        dropDownClasses?: {
            container?: string
            inputContainer?: string
            inputElement?: string
            comboboxOptionsContainer?: string
        }
        enrichedAttribute?: any
        idField?: string
        modelValue?: any
        searcher?: (query: string) => Promise<any[]>
    }>(),
    {
        dropDownClasses: () => ({
            container: '',
            inputContainer: '',
            inputeElement: '',
            comboboxOptionsContainer: '',
        }),
        defaultItems: () => [],
        enrichedAttribute: undefined,
        idField: 'id',
        modelValue: undefined,
        searcher: undefined,
    },
)

const comboboxInput = ref()

defineExpose({
    comboboxInput,
})
</script>
