<template>
    <div class="space-y-2">
        <InputLabel
            class="text-xs font-semibold"
            :for-id="`input-enum-admin-${uniqueId}`"
            >Add items for user to pick</InputLabel
        >

        <template v-if="effectiveValue.options.length">
            <div class="flex flex-col gap-1">
                <div
                    v-for="(_option, idx) in effectiveValue.options"
                    :key="`input-enum-admin-${uniqueId}-${idx}`"
                    class="flex items-center gap-1"
                >
                    <InputText
                        v-model="effectiveValue.options[idx].value"
                        :id="`input-enum-admin-${idx}`"
                        :name="`input-enum-admin-${idx}`"
                        :classes="['text-xs px-2 py-1 rounded-none']"
                        placeholder="Enter value"
                    />

                    <BaseButton
                        :classes="[
                            'shrink-0 text-xs p-1.5 flex items-center justify-center rounded-none bg-stone-100 hover:bg-stone-200/60 text-stone-600 hover:text-stone-950 border border-stone-100',
                        ]"
                        @click="effectiveValue.options.splice(idx, 1)"
                    >
                        <i
                            class="fa-regular fa-sharp fa-minus"
                            aria-disabled="true"
                        />
                    </BaseButton>

                    <BaseButton
                        v-if="idx === effectiveValue.options.length - 1"
                        :classes="[
                            'shrink-0 text-xs p-1.5 flex items-center justify-center rounded-none bg-stone-100 hover:bg-stone-200/60 text-stone-600 hover:text-stone-950 border border-stone-100',
                        ]"
                        @click="
                            effectiveValue.options.push({
                                label: '',
                                value: '',
                            })
                        "
                    >
                        <i
                            class="fa-regular fa-sharp fa-plus"
                            aria-disabled="true"
                        />
                    </BaseButton>
                </div>
            </div>
        </template>

        <template v-if="effectiveValue.options.length === 0">
            <div>
                No values specified yet. Get started by adding the first one!
                <BaseButton
                    :classes="[
                        'text-xs p-0 h-5 w-5 flex items-center justify-center',
                    ]"
                    @click="
                        effectiveValue.options.push({
                            label: '',
                            value: '',
                        })
                    "
                >
                    <i
                        class="fa-regular fa-sharp fa-plus"
                        aria-disabled="true"
                    />
                </BaseButton>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '../../button/BaseButton.vue'
import InputText from '../../input/text/InputText.vue'
import { useInputModelValue } from '../../input/composables'

import { watch } from 'vue'
import InputLabel from '../../input/label/InputLabel.vue'

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
    defineProps<{
        modelValue?: {
            mapTo: string
            options: {
                label?: string
                value: string
            }[]
        }
    }>(),
    {
        modelValue: () => {
            return {
                mapTo: '',
                options: [],
            }
        },
    },
)

const uniqueId = Math.random().toString(36).substring(2, 9)

const { effectiveValue } = useInputModelValue(props, [
    {
        mapTo: '',
        options: [],
    },
])

watch(
    () => effectiveValue.value,
    (newValue: any) =>
        emit(
            'update:modelValue',
            newValue.map((val: any) => ({
                label: val.label || val.value,
                value: val.value,
            })),
        ),
)
</script>
