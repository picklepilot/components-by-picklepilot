<template>
    <div class="flex h-full items-center justify-center">
        <div class="space-y-4">
            <div class="space-y-1.5">
                <div class="text-xs font-semibold">Default</div>
                <BaseBadge :bordered="true"> default </BaseBadge>
            </div>
            <div class="space-y-1.5">
                <div class="text-xs font-semibold">Green</div>
                <BaseBadge
                    :classes="['bg-green-50 text-green-600']"
                    :bordered="true"
                >
                    success
                </BaseBadge>
            </div>
            <div class="space-y-1.5">
                <div class="text-xs font-semibold">Indigo</div>
                <BaseBadge
                    :classes="['bg-indigo-50 text-indigo-700']"
                    :bordered="true"
                >
                    whatever
                </BaseBadge>
            </div>
            <div class="space-y-1.5">
                <div class="text-xs font-semibold">Red</div>
                <BaseBadge
                    :classes="['bg-red-50 text-red-700']"
                    :bordered="true"
                >
                    danger
                </BaseBadge>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseBadge from './BaseBadge.vue'
</script>
