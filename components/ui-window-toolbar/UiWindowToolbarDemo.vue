<template>
    <div
        class="flex h-[500px] flex-col overflow-auto rounded-xl bg-zinc-100 p-6"
    >
        <div class="grow">
            <BaseButton
                @click="
                    openWindow(
                        'DemoComponentOne',
                        'Demo Window One',
                        'demo-window-one',
                    )
                "
                >Open window one</BaseButton
            >
        </div>
        <UiWindowToolbar
            :component-mapping="{ DemoComponentOne }"
            :windows="windows"
            @close="closeWindow"
        ></UiWindowToolbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiWindowToolbar from './UiWindowToolbar.vue'
import DemoComponentOne from './DemoComponentOne.vue'
import BaseButton from '../button/BaseButton.vue'

const windows = ref<any[]>([])

function openWindow(component: string, title: string, id: string) {
    windows.value.push({
        id,
        effectiveComponent: component,
        title,
        componentProps: {},
        width: 'calc(100vw - 40px)',
        height: 'calc(100vh - 40px)',
        top: '20px',
        left: '20px',
    })
}

function closeWindow(id: any) {
    windows.value = windows.value.filter((w) => w.id !== id)
    // windows.value = []
}
</script>
