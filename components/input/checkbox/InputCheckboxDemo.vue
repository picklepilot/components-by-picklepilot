<template>
    <div class="flex h-full items-center justify-center space-x-5 p-5 overflow-hidden">
        <InputLabel for-id="demo-input-checkbox">Check me</InputLabel>
        <InputCheckbox id="demo-input-checkbox" :model-value="checked" @updated:modelValue="onUpdatedChecked" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputCheckbox from './InputCheckbox.vue'
import InputLabel from '../label/InputLabel.vue'


const checked = ref(true)

function onUpdatedChecked(value: boolean) {
    checked.value = value
}
</script>
