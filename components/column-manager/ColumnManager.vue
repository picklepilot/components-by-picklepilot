<template>
    <div class="flex h-full space-x-6">
        <div class="h-full w-[350px] shrink-0 space-y-3 overflow-auto px-2">
            <div
                v-for="(_group, groupName, idx) in editableColumns"
                :key="`column-management-group-${idx}`"
                class="rounded-xl border border-zinc-300/80 bg-zinc-50 shadow-sm"
            >
                <h2
                    class="sticky top-0 z-20 flex items-center justify-between rounded-t-xl border-b border-zinc-300/80 bg-zinc-50 px-4 py-3"
                >
                    <span class="text-base font-semibold">{{ groupName }}</span>
                    <span v-if="groupMenuItems" class="text-sm">
                        <BaseDropdownMenu
                            :classes="{
                                menu: '',
                                menuButton:
                                    'h-7 w-7 rounded-lg flex items-center justify-center hover:bg-zinc-200',
                                menuItems: '',
                                menuItem: 'rounded-xl',
                                menuItemIcon: 'group-hover:bg-indigo-300',
                            }"
                            :items="[
                                ...groupMenuItems,
                                defaultGroupDropdownMenuItems,
                            ]"
                            :context="{ groupName }"
                        >
                            <template #trigger>
                                <i class="fa-regular fa-ellipsis-v"></i>
                            </template>
                        </BaseDropdownMenu>
                    </span>
                </h2>

                <div
                    v-if="editableColumns[groupName].length === 0"
                    class="flex flex-col items-center justify-center p-4"
                >
                    <EmptyState
                        title="No columns"
                        description="There are no columns here yet. Use the picker below to add the first column."
                        :classes="{
                            container:
                                'flex flex-col items-center justify-center border-2 border-dashed border-zinc-300/60 rounded-xl p-6',
                            icon: 'text-zinc-500',
                            description: 'text-center',
                        }"
                    />
                </div>

                <Sortable
                    :list="editableColumns[groupName]"
                    item-key="id"
                    tag="div"
                    :options="{
                        animation: 150,
                        group: 'shared-columns',
                        handle: '.drag-handle',
                        multiDrag: true,
                        selectedClass: 'selected',
                        emptyInsertThreshold: 100,
                    }"
                >
                    <template #item="{ element, index }">
                        <div
                            class="group flex w-full [&.selected]:bg-blue-100"
                            @click="onClickedListItem"
                        >
                            <slot name="drag-handle"></slot>

                            <slot name="column" :slotProps="element"></slot>

                            <div
                                class="ml-auto flex items-center space-x-1.5 p-1"
                            >
                                <button
                                    @click.prevent.stop="
                                        removeColumn(groupName, index)
                                    "
                                    class="flex h-6 w-6 items-center justify-center rounded text-xs text-zinc-400 ring-1 ring-transparent transition-all hover:bg-zinc-200 hover:text-zinc-700"
                                >
                                    <i class="fa-regular fa-minus-circle"></i>
                                </button>
                                <button
                                    @click.prevent.stop="
                                        focusedColumn =
                                            editableColumns[groupName][index]
                                    "
                                    class="flex h-6 w-6 items-center justify-center rounded text-xs text-zinc-400 ring-1 ring-transparent transition-all hover:text-zinc-700 hover:shadow-md hover:ring-zinc-200 group-hover:bg-white group-hover:shadow-sm group-hover:ring-zinc-300/80"
                                >
                                    <i class="fa-regular fa-cog"></i>
                                </button>
                            </div>
                        </div>
                    </template>
                </Sortable>

                <div
                    class="group flex items-center justify-end space-x-2 border-t border-zinc-300/80 p-2"
                >
                    <BaseTypeahead
                        :classes="dropDownClasses"
                        :default-items="defaultItems"
                        :display-property="() => ''"
                        :nullable="true"
                        :searcher="searcher"
                        placeholder="Add a column to group"
                        @update:modelValue="
                            onPickedNewColumn(groupName, $event)
                        "
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
                                        v-bind="{ item, selected, active }"
                                    />
                                </ComboboxOption>
                            </div>
                        </template>
                    </BaseTypeahead>

                    <BaseButton
                        v-if="Object.keys(editableColumns).length > 1"
                        @click="removeGroup(groupName)"
                        :classes="[
                            'text-sm flex items-center justify-center w-8 h-8 rounded-lg border-none bg-transparent hover:bg-zinc-200 text-zinc-400 group-hover:text-zinc-500 group-hover:hover:text-zinc-800',
                        ]"
                    >
                        <i class="fa-regular fa-trash"></i>
                    </BaseButton>
                </div>
            </div>

            <div class="mt-4 flex shadow-sm">
                <InputText
                    :classes="[
                        'grow focus-within:border-indigo-500 focus-within:ring-indigo-200/60 rounded-lg rounded-r-none',
                    ]"
                    id="column-attribute-display"
                    name="column-attribute-display"
                    placeholder="New group name"
                    v-model="newGroupName"
                />
                <BaseButton
                    :classes="[
                        'px-3 py-2 rounded-lg rounded-l-none shrink-0 justify-center border border-l-0 border-zinc-300/80 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900',
                        newGroupName ? 'bg-white' : 'bg-zinc-300/80',
                    ]"
                    :disabled="!newGroupName"
                    @click="addGroup()"
                >
                    Add new group
                </BaseButton>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sortable } from 'sortablejs-vue3'
import { default as realSortable } from 'sortablejs'

import {
    BaseButton,
    BaseDropdownMenu,
    BaseTypeahead,
    EmptyState,
    InputText,
} from '../'

import { ComboboxOption } from '@headlessui/vue'

import { groupColumns, ungroupColumns } from './ColumnManagerUtils'

const emit = defineEmits(['update:existingColumns'])

const props = withDefaults(
    defineProps<{
        defaultItems?: any[]
        dropDownClasses?: {
            container?: string
            inputContainer?: string
            inputElement?: string
            comboboxOptionsContainer?: string
        }
        existingColumns?: any[]
        onPickedColumn: (groupName: string, column: any) => any
        searcher: (query: string) => Promise<any[]>
        groupMenuItems?: any[]
    }>(),
    {
        defaultItems: () => [],
        dropDownClasses: () => ({
            container: '',
            inputContainer: '',
            inputeElement: '',
            comboboxOptionsContainer: '',
        }),
        existingColumns: () => [],
        groupMenuItems: () => [],
    },
)

const editableColumns = ref<any>(groupColumns(props.existingColumns))
const focusedColumn = ref<any>()
const newGroupName = ref<string>('')

watch(
    () => props.existingColumns,
    (newVal) => {
        editableColumns.value = groupColumns(newVal)
    },
    { immediate: false },
)

function onClickedListItem(evt: any) {
    if (evt.currentTarget.classList.contains('selected')) {
        realSortable.utils.deselect(evt.currentTarget)
    } else {
        realSortable.utils.select(evt.currentTarget)
    }
}

/**
 * Handler for the remove column button click event.
 * @param {string} groupName - The group name of the column
 * @param {number} idx - The index of the column
 */
function removeColumn(groupName: string, idx: number) {
    editableColumns.value[groupName] = editableColumns.value[groupName].filter(
        (_column: any, colIdx: number) => colIdx !== idx,
    )
    emit('update:existingColumns', ungroupColumns(editableColumns.value))
}

/**
 * Handler for the add group button click event.
 */
function addGroup() {
    editableColumns.value = {
        ...editableColumns.value,
        [newGroupName.value]: [],
    }
}

/**
 * Handler for the remove group button click event.
 * @param {string} groupName - The group name of the column
 */
function removeGroup(groupName: string) {
    delete editableColumns.value[groupName]
    emit('update:existingColumns', ungroupColumns(editableColumns.value))
}

/**
 * Handler for the reset to default columns button click event.
 * @param {string} groupName - The group name of the column
 */
function clearAllColumns(groupName: string) {
    editableColumns.value = {
        ...editableColumns.value,
        [groupName]: [],
    }
}

/**
 * Handler for the sortable component update event.
 * @param {string} groupName - The group name of the column
 * @param {any} params - The updated column list
 *
 * @deprecated
 */
function onUpdatedList(groupName: string, params: any) {
    editableColumns.value = { ...editableColumns.value, [groupName]: params }
    emit('update:existingColumns', ungroupColumns(editableColumns.value))
}

/**
 * Handler for the column picker component update event.
 * @param {string} groupName - The group name of the column
 * @param {any} value - The selected column
 */
function onPickedNewColumn(groupName: string, value: any) {
    value.group = groupName
    editableColumns.value = {
        ...editableColumns.value,
        [groupName]: [...editableColumns.value[groupName], value],
    }

    emit('update:existingColumns', ungroupColumns(editableColumns.value))
}

const defaultGroupDropdownMenuItems = [
    {
        icon: 'fa-empty-set',
        label: 'Clear all columns',
        onClick: (context: any) => {
            clearAllColumns(context.groupName)
        },
    },
    {
        icon: 'fa-trash',
        label: 'Remove group',
        onClick: (context: any) => {
            removeGroup(context.groupName)
        },
    },
]

defineExpose({
    clearAllColumns,
    focusedColumn,
    removeGroup,
})
</script>
