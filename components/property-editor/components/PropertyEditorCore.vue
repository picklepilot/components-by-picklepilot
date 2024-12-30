<template>
    <div class="w-full">
        <SortableComponent
            v-if="editableProperties"
            :model-value="editableProperties"
            :options="{
                animation: 150,
                selectedClass: 'selected',
                handle: '.drag-handle',
                filter: '.ignore-drag',
            }"
            :classes="['']"
            @update:modelValue="onUpdateSortable"
        >
            <template #item="slotProps">
                <div
                    class="flex w-full flex-col"
                    :class="classes.itemContainer"
                    :data-active="expandedProperty === slotProps.idx"
                >
                    <div class="relative flex w-full grow">
                        <div class="w-48 shrink-0">
                            <select
                                :name="`object-management-${slotProps.id}-type`"
                                :id="`object-management-${slotProps.id}-type`"
                                :class="classes.selectInput"
                                v-model="editableProperties[slotProps.idx].type"
                            >
                                <option :value="''">--Pick a type--</option>
                                <option value="array">Text List</option>
                                <option value="boolean">Yes/No</option>
                                <option value="date">Date</option>
                                <option value="enum">Pick List</option>
                                <option value="image">Image</option>
                                <option value="number">Number</option>
                                <option value="string">Text</option>
                                <option value="things">Related Things</option>
                                <option value="url">URL</option>
                            </select>
                        </div>

                        <div class="grow">
                            <InputText
                                v-model="
                                    editableProperties[slotProps.idx].attribute
                                "
                                :classes="[classes.textInput as string]"
                                :name="`object-management-${slotProps.id}-attribute`"
                                placeholder="Property name"
                            />
                        </div>

                        <div
                            class="flex shrink-0 items-center justify-end pl-6"
                        >
                            <BaseButton
                                @click="doExpandRow(slotProps.id)"
                                :classes="[
                                    'drag-handle',
                                    classes.button as string,
                                ]"
                            >
                                <i
                                    :class="classes.icons?.drag"
                                    aria-disabled="true"
                                />
                            </BaseButton>

                            <BaseButton
                                @click="doRemoveRow(slotProps.idx)"
                                :classes="[classes.button as string]"
                            >
                                <i
                                    class="fa-trash"
                                    :class="classes.icon"
                                    aria-disabled="true"
                                />
                            </BaseButton>

                            <BaseButton
                                @click="doExpandRow(slotProps.idx)"
                                :classes="[classes.button as string]"
                            >
                                <i
                                    :class="[
                                        classes.icon,
                                        slotProps.idx === expandedProperty
                                            ? 'fa-angle-up'
                                            : 'fa-angle-down',
                                    ]"
                                    aria-disabled="true"
                                />
                            </BaseButton>
                        </div>
                    </div>
                    <div
                        v-if="expandedProperty === slotProps.idx"
                        class="flex p-3"
                    >
                        <PropertyConfig
                            v-model="
                                editableProperties[expandedProperty].config
                            "
                            :classes="classes.config"
                            :mappable-property-names="mappablePropertyNames"
                            :type="editableProperties[expandedProperty].type"
                        />
                    </div>
                </div>
            </template>
        </SortableComponent>
        <div class="mt-4 flex items-center justify-end">
            <BaseButton
                @click="doAddProperty()"
                :classes="[
                    'px-2.5 py-1.5 bg-white text-xs hover:bg-stone-100 hover:text-stone-900 border-stone-300/80 shadow-sm text-stone-600 hover:text-stone-900 rounded-none',
                ]"
            >
                Add property
            </BaseButton>
            <!--BaseButton @click="doSaveProperties()"> Save </BaseButton-->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    BaseButton,
    type EditableProperty,
    SortableComponent,
} from '../../index'
import InputText from '../../input/text/InputText.vue'
import PropertyConfig from './PropertyConfigCore.vue'

const emit = defineEmits(['update'])
const props = withDefaults(
    defineProps<{
        classes?: {
            button?: string
            icon?: string
            itemContainer?: string
            selectInput?: string
            textInput?: string
            config: {
                inputText: string
                inputCheckbox: string
                inputSelect: string
            }
        }
        properties: any
        mappablePropertyNames?: string[]
    }>(),
    {
        classes: () => ({
            button: 'h-5 w-5 flex text-[11px] items-center justify-center rounded-none border-none text-stone-400 bg-transparent hover:bg-stone-100 hover:text-stone-900',
            config: {
                inputText: '',
                inputCheckbox: '',
                inputSelect: '',
            },
            icon: 'fa-solid',
            itemContainer: '',
            selectInput: '',
            textInput: '',
        }),
        mappablePropertyNames: () => [],
    },
)

const editableProperties = ref(decorateProperties(props.properties))
const expandedProperty = ref<number>(-1)

watch(
    () => props.properties,
    (newValue: any) =>
        (editableProperties.value = decorateProperties(newValue)),
)

watch(
    () => editableProperties.value,
    () => emit('update', editableProperties.value),
    { deep: true },
)

function decorateProperties(properties: EditableProperty[]) {
    return properties.map((property: any, idx: number) => {
        return {
            attribute: property.attribute || '',
            config: property.config || {
                mapTo: '',
            },
            helpText: property.helpText || '',
            id: property.id || Math.random().toString(16).slice(2),
            order: property.order || idx,
            type: property.type || '',
        }
    })
}

function doAddProperty() {
    editableProperties.value.push({
        attribute: '',
        config: {
            mapTo: '',
        },
        helpText: '',
        id: Math.random().toString(16).slice(2),
        order: editableProperties.value.length,
        type: '',
    })
}

function doExpandRow(id: string) {
    if (expandedProperty.value === id) {
        expandedProperty.value = ''
    } else {
        expandedProperty.value = id
    }
}

function onUpdateSortable(params: any) {
    editableProperties.value = params.map((property: any, idx: number) => {
        return {
            ...property,
            order: idx,
        }
    })

    console.log('UPDATED SORTABLE', editableProperties.value)
}

function doRemoveRow(idx: number) {
    editableProperties.value.splice(idx, 1)
}
</script>
