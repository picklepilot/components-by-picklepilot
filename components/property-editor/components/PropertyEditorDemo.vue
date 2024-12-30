<template>
    <div class="w-full p-2">
        <PropertyEditorCore
            :classes="{
                button: 'h-5 w-5 flex text-[11px] items-center justify-center rounded-none border-none text-stone-400 bg-transparent hover:bg-stone-100 hover:text-stone-900',
                config: {
                    inputText: 'rounded-none px-2.5 py-1.5 text-xs',
                    inputCheckbox:
                        'size-4 rounded-none border-zinc-300 text-zinc-600 focus:ring-zinc-600',
                    inputSelect: 'rounded-none px-2.5 py-1.5 text-xs min-w-60',
                },
                icon: 'fa-solid',
                itemContainer:
                    'border-b border-zinc-300/60 justify-center data-[active=true]:bg-zinc-100',
                selectInput:
                    'bg-transparent h-full block w-full rounded-none border-none py-1 pl-1.5 pr-10 text-xs/5 ring-1 ring-transparent focus:ring-3 focus:ring-zinc-100',
                textInput:
                    'bg-transparent h-full border-transparent rounded-none text-xs px-1.5 py-1 focus-within:border focus-within:border-zinc-400 focus-within:ring-zinc-100 leading-none ',
            }"
            :mappable-property-names="['title', 'album_type', 'total_tracks']"
            :properties="demoProperties"
            @update="demoProperties = $event"
        />

        <div>{{ demoProperties }}</div>
    </div>
</template>

<script setup lang="ts">
import PropertyEditorCore from './PropertyEditorCore.vue'

const demoProperties = [
    {
        id: 'c4305b89a0fcd',
        type: 'string',
        order: 0,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Title',
    },
    {
        id: 'bb3673117da3c',
        type: 'enum',
        order: 1,
        config: {
            mapTo: '',
            options: [
                {
                    label: 'CD',
                    value: 'CD',
                },
                {
                    label: '',
                    value: 'Vinyl',
                },
                {
                    label: '',
                    value: 'Cassette',
                },
                {
                    label: '',
                    value: 'Digital',
                },
                {
                    label: '',
                    value: 'Other',
                },
            ],
        },
        helpText: '',
        attribute: 'Album Type',
    },
    {
        id: '6df5c78312757',
        type: 'number',
        order: 2,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Track Count',
    },
    {
        id: '127eb234feaa8',
        type: 'array',
        order: 3,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Artists',
    },
    {
        id: '241425b9928ba',
        type: 'date',
        order: 4,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Released',
    },
    {
        id: '5b44358df0c9c',
        type: 'string',
        order: 5,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Record Label',
    },
    {
        id: '2f4c70d0f366f',
        type: 'url',
        order: 6,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Spotify URL',
    },
    {
        id: '77c9003580287',
        type: 'array',
        order: 7,
        config: {
            mapTo: '',
        },
        helpText: '',
        attribute: 'Genres',
    },
]
</script>
