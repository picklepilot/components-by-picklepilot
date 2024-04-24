<template>
    <div class="flex h-full items-center justify-center">
        <div class="w-full max-w-sm space-y-1.5">
            <InputLabel for-id="demo-input-text">Demo Input Text</InputLabel>
            <InputText
                placeholder="Enter text here..."
                id="demo-input-text"
                name="demo-input-text"
                autocomplete="off"
                rows="6"
                :model-value="text"
                @blur="onBlur"
                @focus="onFocus"
                @update:model-value="text = $event"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputLabel from '../label/InputLabel.vue'
import InputText from './InputTextarea.vue'

const text = ref('')

function onBlur(evt) {
    console.log('onBlur', evt)
}

function onFocus(evt) {
    console.log('onFocus', evt)
}
</script>
