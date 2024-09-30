<template>
    <div :class="m('relative w-full rounded-lg', classes.container)">
        <Combobox v-model="activeItem" immediate :nullable="nullable">
            <div class="relative">
                <div
                    :class="
                        m(
                            'relative w-full cursor-default overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-left ring-2 ring-transparent focus-within:border-indigo-500 focus-within:ring-indigo-200/60 hover:bg-zinc-50 focus:bg-white focus:shadow focus:outline-none sm:text-sm',
                            classes.inputContainer,
                        )
                    "
                >
                    <ComboboxInput
                        :class="
                            m(
                                'w-full rounded-lg border-none bg-zinc-50 py-2.5 pl-3 pr-10 text-sm leading-5 text-zinc-900 focus-within:border-none',
                                classes.inputElement,
                            )
                        "
                        :displayValue="displayProperty"
                        @change="query = $event.target.value"
                    />
                    <ComboboxButton
                        :class="[
                            'absolute inset-y-0 right-0 flex items-center pr-2',
                        ]"
                    >
                        <ChevronUpDownIcon
                            class="h-5 w-5 text-zinc-400"
                            aria-hidden="true"
                        />
                    </ComboboxButton>
                </div>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-out"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <ComboboxOptions
                        :class="
                            m(
                                'absolute z-10 mt-1 max-h-[400px] w-full min-w-[500px] overflow-y-auto overflow-x-hidden rounded-lg bg-white p-3 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
                                classes.comboboxOptionsContainer,
                            )
                        "
                    >
                        <div v-if="filteredItems.length === 0 && query === ''">
                            <slot v-if="$slots.empty" name="empty"></slot>
                            <span v-else>No results</span>
                        </div>

                        <slot
                            v-if="$slots.options"
                            name="options"
                            v-bind="{ filteredItems }"
                        ></slot>

                        <div v-else>
                            <ComboboxOption
                                v-for="item in filteredItems"
                                :key="item[uidProperty]"
                                :value="item[valueProperty]"
                                v-slot="{ active, selected }"
                            >
                                <div
                                    class="rounded-lg p-2"
                                    :class="{
                                        'bg-blue-500 text-white': active,
                                        'bg-white text-black': !active,
                                    }"
                                >
                                    {{ item[displayProperty] }}
                                    {{ selected ? '✓' : '' }}
                                </div>
                            </ComboboxOption>
                        </div>
                    </ComboboxOptions>
                </transition>
            </div>
        </Combobox>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { m } from '../../utils/TextUtils'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        modelValue?: any
        defaultItems?: any[]
        items?: any[]
        classes?: {
            container?: string
            inputContainer?: string
            inputElement?: string
            comboboxOptionsContainer?: string
        }
        searcher?: (query: string) => Promise<any[]>
        uidProperty?: string
        valueProperty?: string
        displayProperty?: (item: any) => string
        nullable?: boolean
    }>(),
    {
        defaultItems: () => [],
        items: () => [],
        classes: () => ({
            container: '',
            inputContainer: '',
            inputeElement: '',
            comboboxOptionsContainer: '',
        }),
        displayProperty: (item: any) => item.name,
        searcher: undefined,
        uidProperty: 'id',
        valueProperty: 'value',
        modelValue: undefined,
        nullable: false,
    },
)

const filteredItems = ref<any[]>([])
const query = ref<string>('')
const activeItem = ref<any>(props.modelValue)

watch(
    () => props.modelValue,
    (value) => {
        activeItem.value = value
    },
)

watch(
    () => query.value,
    async () => {
        if (props.searcher) {
            filteredItems.value = await props.searcher(query.value)
        } else {
            filteredItems.value = []
        }
    },
    // { immediate: true }
)

watch(
    () => props.defaultItems,
    (items) => {
        filteredItems.value = items
    },
    { immediate: true },
)

watch(
    () => activeItem.value,
    (item) => {
        emit('update:modelValue', item)
    },
    { immediate: false },
)
</script>
