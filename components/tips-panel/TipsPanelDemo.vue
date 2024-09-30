<template>
    <div
        class="tip-highlight tip-highlight-global-search relative w-[250px] rounded-lg border border-zinc-300/80 p-6"
    >
        Mock find portfolios input
    </div>
    <Teleport to="body">
        <TipsPanel
            :classes="['fixed top-0 right-0 h-full w-[400px] z-50 bg-zinc-50']"
            :tips="tips"
        ></TipsPanel>
    </Teleport>
</template>
<script setup lang="ts">
import TipsPanel from './TipsPanel.vue'

const tips = [
    {
        type: 'new',
        title: 'Global table search',
        description:
            'Use the "Find portfolios" input in the top right corner to search for portfolios by name/description.',
        target: '.tip-highlight-global-search',
    },
]
</script>
