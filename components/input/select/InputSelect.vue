<template>
    <div :id="uniqueId" class="h-full">
        <div
            v-for="(group, groupName, groupIdx) in groups"
            :key="`generic-list-item-group-${groupName}`"
        >
            <div
                :class="[
                    'generic-list-group-list-item-header sticky top-0 z-10 flex items-center bg-gray-200 px-3 py-1.5 text-base font-semibold',
                ]"
            >
                {{ groupName }} ({{ group.length }})
            </div>
            <div
                v-for="(item, i) in group"
                :key="`generic-list-item-${i}`"
                :id="`generic-list-${uniqueId}-item-${computeIdx(groupIdx, i)}`"
                :class="[
                    focusedIdx === computeIdx(groupIdx, i) && 'bg-gray-100',
                    'generic-list-group-list-item border-b border-gray-200 hover:bg-sky-50 cursor-pointer',
                ]"
                @mouseenter="focusedIdx = computeIdx(groupIdx, i)"
                @click.stop="emit('click', computeIdx(groupIdx, i))"
            >
                <slot :idx="i" :item="item"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    defineEmits,
    defineProps,
    onMounted,
    ref,
    watch,
    withDefaults,
} from 'vue'

interface Props {
    focused?: boolean
    itemHeight?: number
    modelValue: any
}

const emit = defineEmits(['click', 'enter'])

const props = withDefaults(defineProps<Props>(), {
    focused: false,
    itemHeight: 30,
})

const uniqueId = Math.random().toString(36).substring(2, 9)
const focusedIdx = ref(0)
const focusedGroupAndIdx = ref('0-0')

const groups = computed(() => {
    if (!props.modelValue) return {}
    return props.modelValue.reduce((acc, item) => {
        const key = item.header || 'Uncategorized'
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(item)
        return acc
    }, {})
})

function computeIdx(groupIdx: number, itemIdx: number) {
    return (
        Object.values(groups.value)
            .slice(0, groupIdx)
            .reduce((total, ch) => (total += ch.length), 0) + itemIdx
    )
}

watch(
    () => props.modelValue,
    () => {
        focusedIdx.value = 0
        focusedGroupAndIdx.value = '0-0'
    },
)

onMounted(() => {
    const list = document.getElementById(uniqueId)
    // const listItems = document.querySelectorAll('.generic-list-group-list-item')
    document.addEventListener('keydown', (e) => {
        // Ignore key event if the list is not focused.
        if (!props.focused) return

        e.preventDefault()

        switch (e.keyCode) {
            // Up key
            case 38:
                if (focusedIdx.value === 0) {
                    break
                } else {
                    focusedIdx.value = focusedIdx.value - 1
                }
                break

            // Down key
            case 40:
                if (focusedIdx.value === props.modelValue.length - 1) {
                    e.preventDefault()
                    e.stopPropagation()
                    break
                } else {
                    focusedIdx.value = focusedIdx.value + 1
                }
                break
        }

        const focusedElement = document.getElementById(
            `generic-list-${uniqueId}-item-${focusedIdx.value}`,
        )

        if (focusedElement && list?.parentElement) {
            focusedElement.scrollIntoView({ block: 'center' })
        }

        const ignoreKeys = ['ArrowUp', 'ArrowDown', 'Enter']
        if (props.focused && ignoreKeys.includes(e.key)) {
            e.stopPropagation()
            e.preventDefault()

            if (e.key === ' ') {
                emit('enter', focusedIdx.value)
            }

            return false
        }
    })
})
</script>
