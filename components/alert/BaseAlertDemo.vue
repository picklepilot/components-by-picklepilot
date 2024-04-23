<template>
    <div class="flex h-full flex-col items-center justify-center space-y-6">
        <div class="max-w-lg space-y-6">
            <BaseAlert
                v-if="showFirstAlert"
                variant="info"
                dismissable
                @close="showFirstAlert = false"
            >
                <template #icon>🤔 </template>
                <template #title>Alert for attention</template>
                <template #body>
                    <p>
                        This is an alert message. You can use it to draw
                        attention to important information.
                    </p>
                </template>
            </BaseAlert>
            <BaseAlert
                v-if="showSecondAlert"
                variant="error"
                dismissable
                @close="showSecondAlert = false"
            >
                <template #icon>⚠️ </template>
                <template #title>Error alert</template>
                <template #body>
                    <p>
                        This is a bad alert message. You can use it to draw
                        attention to importantly bad information.
                    </p>
                </template>
            </BaseAlert>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseAlert from './BaseAlert.vue'
const showFirstAlert = ref(true)
const showSecondAlert = ref(true)
</script>
