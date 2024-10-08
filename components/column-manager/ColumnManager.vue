<template>
    <div class="flex h-full space-x-6">
        <div class="h-full w-[350px] shrink-0 space-y-3 overflow-auto px-2">
            <div
                class="rounded-xl border border-zinc-300/80 bg-zinc-50 shadow-sm"
            >
                <Draggable
                    ref="tree"
                    v-model="editableColumns"
                    :indent="0"
                    :maxLevel="2"
                    :ondragstart="customDragImage"
                    :triggerClass="['drag-handle']"
                    :rootDroppable="rootDroppable"
                    @beforeDragStart="onBeforeDragStart"
                >
                    <template #placeholder>
                        <div
                            class="flex px-4 py-1 opacity-50 hover:bg-zinc-200/60"
                        >
                            <slot
                                name="column"
                                :slotProps="dragContext.dragNode?.data"
                            ></slot>
                        </div>
                    </template>
                    <template #default="{ node, stat }">
                        <h2
                            v-if="node.levelName === 'group'"
                            class="flex items-center justify-between rounded-t-xl bg-zinc-50 px-4 py-3"
                        >
                            <span class="text-base font-semibold">{{
                                node.text
                            }}</span>
                            <span v-if="groupMenuItems" class="text-sm">
                                <BaseDropdownMenu
                                    :classes="{
                                        menu: '',
                                        menuButton:
                                            'h-7 w-7 rounded-lg flex items-center justify-center hover:bg-zinc-200',
                                        menuItems: '',
                                        menuItem: 'rounded-xl',
                                        menuItemIcon:
                                            'group-hover:bg-indigo-300',
                                    }"
                                    :items="[
                                        ...groupMenuItems,
                                        defaultGroupDropdownMenuItems,
                                    ]"
                                    :context="{ groupName: node.text }"
                                >
                                    <template #trigger>
                                        <i class="fa-regular fa-ellipsis-v"></i>
                                    </template>
                                </BaseDropdownMenu>
                            </span>
                        </h2>

                        <div
                            v-else
                            class="drag-handle flex px-4 py-1 hover:bg-zinc-200/60"
                        >
                            <slot name="column" :slotProps="stat.data"></slot>
                        </div>
                    </template>
                </Draggable>
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
import { nextTick } from 'vue-demi'
import { BaseTree, Draggable, dragContext } from '@he-tree/vue'

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
        groupMenuItems?: any[]
        onPickedColumn: (groupName: string, column: any) => any
        searcher: (query: string) => Promise<any[]>
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
const rootDroppable = ref(true)

watch(
    () => props.existingColumns,
    (newVal) => {
        editableColumns.value = groupColumns(newVal)
        console.log('editableColumns', editableColumns.value)
    },
    { immediate: true },
)

function onBeforeDragStart(stat: any) {
    rootDroppable.value = stat.level === 1
}

function customDragImage(event: DragEvent) {
    if (event.dataTransfer) {
        var div = document.createElement('div')
        div.classList.add(
            'relative',
            'z-50',
            'px-2',
            'py-1.5',
            'rounded',
            'shadow-lg',
            'bg-white',
        )
        div.innerText = 'Dragging column: ' + dragContext.dragNode?.data?.name
        document.body.appendChild(div)
        event.dataTransfer.setDragImage(div, 10, 10)
        setTimeout(() => {
            div.remove()
        }, 100)
    }
}

/* function isNodeDroppable(targetStat: Stat<any>) {
    console.log('targetStat', targetStat)
    console.log('dragContext', dragContext.dragNode)

    const sourceLevelName = dragContext.dragNode?.data?.levelName || undefined
    const targetLevel = targetStat.level

    console.log(
        'sourceLevelName',
        sourceLevelName,
        'targetLevelName',
        targetLevel,
    )

    // Prevent dropping a column at the group level
    if (sourceLevelName === undefined && targetLevel === 1) {
        return false
    }

    return true
} */

/**
 * Handler for the remove column button click event.
 * @param {string} groupName - The group name of the column
 * @param {number} idx - The index of the column
 */
function removeColumn(groupName: string, idx: number) {
    editableColumns.value = editableColumns.value[groupName].filter(
        (_column: any, colIdx: number) => colIdx !== idx,
    )
    emit('update:existingColumns', editableColumns.value)
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
    // emit('update:existingColumns', ungroupColumns(editableColumns.value))
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

    // emit('update:existingColumns', ungroupColumns(editableColumns.value))
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
