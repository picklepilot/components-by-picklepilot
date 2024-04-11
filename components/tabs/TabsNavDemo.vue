<template>
    <div class="h-full w-full rounded-lg bg-zinc-100 p-6">
        <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="pt-4">
                <TabsNav
                    :tab-classes="[
                        'data-[active=false]:hover:bg-purple-500 data-[active=false]:hover:text-white',
                    ]"
                    :tabs="tabs"
                    @clicked="onClickedTab"
                    @updated="tabs = $event"
                >
                    <template v-slot:left="tab"> {{ tab.id }} </template>
                    <template v-slot:right="tab"> {{ tab.id }} </template>
                </TabsNav>
            </div>

            <div>Tab: {{ activeTab }}</div>

            <div v-show="activeTab === 0" class="bg-white p-4">
                [Tabbed nav content 0]
            </div>
            <div v-show="activeTab === 1" class="bg-white p-4">
                [Tabbed nav content 1]
            </div>
            <div v-show="activeTab === 2" class="bg-white p-4">
                [Tabbed nav content 2]
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TabsNav, { Tab } from './TabsNav.vue'
import { computed, ref } from 'vue'

const activeTab = ref(1)

const tabs = computed(
    () =>
        [
            { id: 0, label: 'Tab 1', active: activeTab.value === 0 },
            { id: 1, label: 'Tab 2', active: activeTab.value === 1 },
            { id: 2, label: 'Tab 3', active: activeTab.value === 2 },
        ] as Tab[],
)

function onClickedTab(idx: number) {
    activeTab.value = idx
}
</script>
