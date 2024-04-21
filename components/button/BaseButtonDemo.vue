<template>
    <div class="flex h-full items-center justify-center">
        <div class="space-y-4">
            <div class="space-y-1.5">
                <div class="text-xs font-semibold">
                    Default size, processing (using default processing spinner)
                </div>
                <BaseButton variant="zinc" :stop="800" processing>
                    My Button
                </BaseButton>
            </div>

            <div class="space-y-1.5">
                <div class="text-xs font-semibold">
                    Small size, processing (using default processing spinner)
                </div>
                <BaseButton size="sm" processing>
                    My Button
                    <template #processing>
                        <span class="block animate-spin">🔄</span>
                    </template>
                </BaseButton>
            </div>

            <div class="space-y-1.5">
                <div class="text-xs font-semibold">Disabled</div>
                <BaseButton disabled> My Button (disabled) </BaseButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>
