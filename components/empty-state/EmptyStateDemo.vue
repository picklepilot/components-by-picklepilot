<template>
    <div
        class="flex h-[350px] flex-col items-center justify-center rounded-xl bg-zinc-100 p-6"
    >
        <EmptyState
            icon="fa-exclamation-circle"
            title="No items found"
            description="There are no items to show at this time."
            :classes="{
                container:
                    'flex flex-col items-center justify-center border-2 border-dashed border-zinc-300/60 rounded-xl p-6',
                icon: 'text-zinc-500',
            }"
        />
    </div>
</template>
<script setup lang="ts">
import EmptyState from './EmptyState.vue'
</script>
