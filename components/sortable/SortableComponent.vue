<template>
    <ul ref="el" :class="[sortableClass, classes]">
        <li
            v-for="item in modelValue"
            :key="item.id"
            class="flex rounded bg-zinc-50"
        >
            <div
                class="drag-handle m-1 flex cursor-move items-center justify-center rounded bg-white p-1 text-sm text-zinc-400 shadow-sm ring-1 ring-zinc-100 transition-all hover:text-zinc-700 hover:shadow-md hover:ring-zinc-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-3 w-3"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                </svg>
            </div>

            <slot name="item" v-bind="item"></slot>
        </li>
    </ul>
</template>

<script setup lang="ts">
import Sortable, { type Options } from 'sortablejs'
// import { ref, onMounted, watch, nextTick } from 'vue'
import { ref, onMounted, watch, nextTick, isVue2 } from 'vue-demi'
// import '../../../dist/style.css'

interface Props {
    /**
     * Additional classes to be added to the sortable container
     *
     * @default []
     * @type {string[]}
     */
    classes?: string[]

    /**
     * The model value to be sorted/dragged
     * Generally expected to be an array of objects
     *
     * @default []
     * @type {Record<string, any>[]}
     */
    modelValue: Record<string, any>[]

    /**
     * The options to be passed to the sortable instance
     *
     * @default []
     * @type {Options}
     */
    options?: Sortable.Options
}

const sortableClass = ref(
    'sortable-' + (Math.random() + 1).toString(36).substring(7),
)

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<Props>(), {
    classes: () => [],
    options: () => ({
        animation: 150,
        selectedClass: 'selected',
    }),
})

function indicesParams(e: Sortable.SortableEvent): {
    domElements: HTMLElement[]
    from: number[]
    to: number[]
} {
    return {
        domElements: e.items?.length ? e.items : [e.item!],
        from: e.oldIndicies?.length
            ? e.oldIndicies.map((oldIndex) => oldIndex.index)
            : [e.oldIndex!],
        to: e.newIndicies?.length
            ? e.newIndicies.map((newIndex) => newIndex.index)
            : [e.newIndex!],
    }
}

const options = ref({})
const el = ref<HTMLElement | null>(null)
const sortable = ref<Sortable | null>(null)

function initSortable() {
    const target = document.querySelector(
        '.' + sortableClass.value,
    ) as HTMLElement
    if (target) {
        destroySortable()
        sortable.value = new Sortable(target, props.options)
    }
}

function destroySortable() {
    if (sortable.value) sortable.value.destroy()
}

watch(
    () => props.options,
    () => {
        options.value = {
            ...props.options,
            onUpdate: (e: Sortable.SortableEvent) => {
                const { domElements, from, to } = indicesParams(e)
                syncArrayElements(props.modelValue, domElements, from, to)
            },
        }

        initSortable()
    },
    { immediate: true },
)

onMounted(() => {
    initSortable()
})

function syncArrayElements<T>(
    list: Ref<T[]>,
    domElements: HTMLElement[],
    from: number[],
    to: number[],
) {
    const originalArray = [...list.value]

    // Credits: https://stackoverflow.com/a/69574526
    const swapIndex = (array: T[], from: number, to: number) =>
        from < to
            ? [
                  ...array.slice(0, from), // Chunk from beginning of array up to original position
                  ...array.slice(from + 1, to + 1), // Chunk from after original position up to new position
                  array[from], // Target element gets inserted here
                  ...array.slice(to + 1), // Chunk from after new position to end of array
              ]
            : [
                  ...array.slice(0, to),
                  array[from],
                  ...array.slice(to, from),
                  ...array.slice(from + 1),
              ]

    let newArray = originalArray
    let currentTo = to[0]
    const targetElements = from.map((idx) => list.value[idx])
    let lastMovedElement = null
    targetElements.forEach((element, idx) => {
        lastMovedElement = element
        currentTo = newArray.indexOf(lastMovedElement)
        if (currentTo === -1) currentTo = to[idx]
        const fromIndex = newArray.indexOf(element)
        newArray = swapIndex(newArray, fromIndex, currentTo)
    })

    nextTick(() => {
        // When list is ref, assign array to list.value
        list.value = newArray

        // If multiDrag is enabled, deselect all elements
        if (Sortable.MultiDrag) {
            domElements.forEach((element) => {
                Sortable.utils.deselect(element)
            })
        }

        emit('update:modelValue', list.value)
    })
}

onMounted(() => {
    // mountMultiDragPlugin()
    if (isVue2) {
        console.log('Using Vue 2')
    } else {
        console.log('Using Vue 3')
    }
})
</script>
