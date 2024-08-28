<template>
    <div :class="classes.container || 'relative w-full rounded-lg'">
        <Combobox v-model="selected" immediate>
            <div class="relative">
                <div
                    :class="
                        classes.inputContainer ||
                        'relative w-full cursor-default overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-left ring-2 ring-transparent focus-within:border-indigo-500 focus-within:ring-indigo-200/60 hover:bg-zinc-50 focus:bg-white focus:shadow focus:outline-none sm:text-sm'
                    "
                >
                    <ComboboxInput
                        :class="
                            classes.inputElement ||
                            'w-full rounded-lg border-none bg-zinc-50 py-2.5 pl-3 pr-10 text-sm leading-5 text-zinc-900 focus-within:border-none'
                        "
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
                <ComboboxOptions
                    class="absolute z-10 mt-1 max-h-[400px] w-full min-w-[500px] overflow-y-auto overflow-x-hidden rounded-lg bg-white p-3 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                    <div v-if="items.length === 0 && query === ''">
                        Nothing found!
                    </div>
                </ComboboxOptions>
            </div>
        </Combobox>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = withDefaults(
    defineProps<{
        items?: any[]
        classes?: {
            container?: string[]
            inputContainer?: string[]
            inputElement?: string[]
            comboboxOptionsContainer?: string[]
        }
    }>(),
    {
        items: () => [],
        classes: () => ({
            container: ['relative w-full rounded-lg'],
            inputContainer: [
                'relative w-full cursor-default overflow-hidden border border-zinc-200 bg-zinc-50 text-left ring-2 ring-transparent focus-within:border-indigo-500 focus-within:ring-indigo-200/60 hover:bg-zinc-50 focus:bg-white focus:shadow focus:outline-none sm:text-sm',
            ],
            inputeElement: [
                'w-full border-none bg-zinc-50 py-2.5 pl-3 pr-10 text-sm leading-5 text-zinc-900 focus-within:border-none',
            ],
            comboboxOptionsContainer: [
                'absolute z-10 mt-1 max-h-[400px] w-full min-w-[500px] overflow-y-auto overflow-x-hidden rounded-lg bg-white p-3 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
            ],
        }),
    },
)

const selected = ref<any>(props.items[0])
const query = ref<string>('')
</script>
