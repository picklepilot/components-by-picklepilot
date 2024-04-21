<template>
    <div class="flex h-full items-center justify-center">
        <InputSwitch
            name="demo-input-switch"
            labelled-by="annual-billing-label"
            :model-value="checked"
            @update:model-value="checked = $event"
        >
            <span class="font-medium">Hit the lights!</span>
        </InputSwitch>
    </div>
</template>
<script setup lang="ts">
import InputSwitch from './InputSwitch.vue'
import { ref } from 'vue'

const checked = ref(false)
</script>
